const {Configuration, OpenAIApi} = require("openai");
const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const generateResponse = async (request) => {
    console.log("Request:" + request);
    const completion = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: request,
        max_tokens: 250,
        temperature: 1,
    });
    const result = await completion.data.choices[0].text;
    console.log(result)
    return result;
}

module.exports = {generateResponse};