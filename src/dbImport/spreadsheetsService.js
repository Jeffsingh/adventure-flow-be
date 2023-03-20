const fs = require('fs');
const path = require('path');
const process = require('process');
const {authenticate} = require('@google-cloud/local-auth');
const {google} = require('googleapis');
const openaiApiService = require('../services/openaiApiService');
const SPREAD_SHEET_ID = process.env.SPREAD_SHEET_ID;
const SCOPES = ['https://www.googleapis.com/auth/spreadsheets'];
const TOKEN_PATH = path.join(process.cwd(), 'token.json');
const CREDENTIALS_PATH = path.join(process.cwd(), 'credentials.json');
const activityService = require('../services/activityService');
const itemService = require('../services/itemService');


/**
 * Reads previously authorized credentials from the save file.
 *
 * @return {Promise<OAuth2Client|null>}
 */
async function loadSavedCredentialsIfExist() {
    try {
        const content = await fs.readFileSync(TOKEN_PATH);
        const credentials = JSON.parse(content);
        return google.auth.fromJSON(credentials);
    } catch (err) {
        return null;
    }
}

/**
 * Serializes credentials to a file comptible with GoogleAUth.fromJSON.
 *
 * @param {OAuth2Client} client
 * @return {Promise<void>}
 */
async function saveCredentials(client) {
    const content = await fs.readFileSync(CREDENTIALS_PATH);
    const keys = JSON.parse(content);
    const key = keys.installed || keys.web;
    const payload = JSON.stringify({
        type: 'authorized_user',
        client_id: key.client_id,
        client_secret: key.client_secret,
        refresh_token: client.credentials.refresh_token,
    });
    await fs.writeFileSync(TOKEN_PATH, payload);
}

/**
 * Load or request or authorization to call APIs.
 *
 */
async function authorize() {
    let client = await loadSavedCredentialsIfExist();
    if (client) {
        return client;
    }
    client = await authenticate({
        scopes: SCOPES,
        keyfilePath: CREDENTIALS_PATH,
    });
    if (client.credentials) {
        await saveCredentials(client);
    }
    return client;
}

/**
 * Prints the names and majors of students in a sample spreadsheet:
 * @see https://docs.google.com/spreadsheets/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms/edit
 * @param {google.auth.OAuth2} auth The authenticated Google OAuth client.
 */
async function getRows(auth, range) {
    const sheets = google.sheets({version: 'v4', auth});
    const res = await sheets.spreadsheets.values.get({
        spreadsheetId: SPREAD_SHEET_ID,
        range: range,
    });
    const rows = res.data.values;
    if (!rows || rows.length === 0) {
        console.log('No data found.');
        return;
    }
    return rows
}

async function writeRows(auth, range, resource) {
    const sheets = google.sheets({version: 'v4', auth});
    sheets.spreadsheets.values.append(
        {
            spreadsheetId: SPREAD_SHEET_ID,
            range: range,
            valueInputOption: 'RAW',
            resource: resource,
        },
        (err, result) => {
            if (err) {
                // Handle error
                console.log(err);
            } else {
                console.log(
                    '%d cells updated on range: %s',
                    result.data.updates.updatedCells,
                    result.data.updates.updatedRange
                );
            }
        }
    );
}

const getAllActivities = async (req, res) => {
    try {
        const auth = await authorize();
        const rows = await getRows(auth, 'A:B');
        console.log(rows)
        res.send(rows);
    } catch (err) {
        res.status(500).send({
            message:
                err.message || "Error to get activities data"
        });
    }
}

const generateData = async () => {
    let values = [];
    let auth;
    try {
        auth = await authorize();
        const activities = (await getRows(auth, 'A:A')).map(activity => activity[0]);
        const activitiesRequest = "Generate a list of general(not related to the specific place) activities for random country in the world, in js array format";
        const activitiesResponse = JSON.parse(parseResponseArray(await openaiApiService.generateResponse(activitiesRequest)));
        for (let activity of activitiesResponse) {
            if (!activities.includes(activity)) {
                try {
                    const itemsRequest = "Create a list of items for trip with activity - " + activity + ", in js array format";
                    const itemsResponse = JSON.parse(parseResponseArray(await openaiApiService.generateResponse(itemsRequest)));
                    values.push([activity, itemsResponse.join(";\n")])
                } catch (err) {
                    console.log("Error to parse items response:" + err);
                }
            }

        }
    } catch (err) {
        console.log("Error to generate data:" + err);
    }
    if (values.length > 0) {
        try {
            await writeRows(auth, 'A:A', {values})
        } catch (err) {
            console.log(err);
        }
    }
    await generateData();
}


const parseResponseArray = (response) => {
    response = response.replace(/'/g, '"').toLowerCase();
    if (response.trim().startsWith('[') && response.indexOf(']', response.length - 1) !== -1) {
        return response;
    }
    let openBrIndex = response.indexOf('[');
    let closeBrIndex = response.indexOf(']');
    return response.substring(openBrIndex, closeBrIndex + 1);
}

const syncData = async (req, res) => {
    try {
        const auth = await authorize();
        const activitiesItems = await getRows(auth, 'A:B');
        for (let activityItems of activitiesItems) {
            try {
                let activity = activityItems[0];
                let items = activityItems[1].split(';\n');
                let _activity;
                if (await activityService.checkIfExists('name', activity)) {
                    _activity = await activityService.getActivityByName(activity);
                } else {
                    _activity = await activityService.createActivity({name: activity});
                }

                if (_activity) {
                    for (let item of items) {
                        let _item;
                        if (await itemService.checkIfExists('name', item.trim())) {
                            _item = await itemService.getItemByName(item.trim());
                        } else {
                            _item = await itemService.createItem({name: item});
                        }
                        if (_item) {
                            await _activity.addItem(_item);
                        } else {
                            console.log("Error to get item")
                        }
                    }
                } else {
                    console.log("Error to get activity")
                }

            } catch (err) {
                console.log("Error to parse activity - " + activityItems[0] + '\n' + err);
            }
        }
        res.send("Data successfully synced")
    } catch (err) {
        res.status(500).send({
            message:
                err.message || "Error to get sync data"
        });
    }
}

module.exports = {
    getAllActivities,
    generateData,
    syncData
}