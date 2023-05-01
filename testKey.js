import { config } from "dotenv";
import { Configuration, OpenAIApi } from "openai";
config();

let key = process.env.API_KEY;

const openai = new OpenAIApi(
  new Configuration({
    apiKey: key,
  })
);

openai
  .createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [{ role: "user", content: "What is 2 + 2?" }],
  })
  .then((res) => {
    console.log(res.data.choices[0].message.content);
  });
