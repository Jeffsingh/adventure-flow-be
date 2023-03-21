const {Configuration, OpenAIApi} = require("openai");
const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const generateResponse = async (request, timeout = 10000) => {
    console.log("Request:" + request);

    const timeoutPromise = new Promise((resolve, reject) => {
        setTimeout(() => {
            reject(new Error("Request timed out"));
        }, timeout);
    });

    const apiPromise = openai.createCompletion({
        model: "text-davinci-003",
        prompt: request,
        max_tokens: 250,
        temperature: 1,
    });
 
    const completion = await Promise.race([apiPromise, timeoutPromise]);

    const result = await completion.data.choices[0].text;
    console.log("Response - :" + result);
    return result;
}

const parseResponseArray = (response, lowercase) => {
    response = response.replace(/'/g, '"');

    if(lowercase){
        response = response.toLowerCase();
    }
    if (response.trim().startsWith('[') && response.indexOf(']', response.length - 1) !== -1) {
        return response;
    }
    let openBrIndex = response.indexOf('[');
    let closeBrIndex = response.indexOf(']');
    return response.substring(openBrIndex, closeBrIndex + 1);
}

module.exports = {generateResponse, parseResponseArray};