#!/usr/bin/env node

import fs from "fs/promises";
import { Configuration, OpenAIApi } from "openai";
import readline from "readline";

async function generateComments(filePath, apiKey) {
  const openai = new OpenAIApi(
    new Configuration({
      apiKey: apiKey,
    })
  );

  const fileContent = await fs.readFile(filePath, "utf-8");

  const prompt = `Add appropriate comments to the following code. Respond with the commented code without any code block formatting.\n\n${fileContent}\n\n`;

  const res = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [{ role: "user", content: prompt }],
  });

  let response = res.data.choices[0].message.content;

  await fs.writeFile(filePath, response, "utf-8");
}

const configFilePath = "commentGPTConfig.json";

fs.readFile(configFilePath, "utf-8")
  .then((configString) => JSON.parse(configString))
  .then((config) => {
    if (config.apiKey) {
      generateComments(process.argv[2], config.apiKey)
        .then(() => console.log("Comments generated successfully."))
        .catch((error) => console.error("Error generating comments:", error))
        .finally(() => rl.close());
    } else {
      askForApiKey();
    }
  })
  .catch((error) => {
    if (error.code === "ENOENT") {
      askForApiKey();
    } else {
      console.error("Error reading configuration file:", error);
    }
  });

function askForApiKey() {
  rl.question("Please enter your OpenAI API key: ", (apiKey) => {
    const config = { apiKey: apiKey };

    fs.writeFile(configFilePath, JSON.stringify(config))
      .then(() => console.log("API key saved to configuration file."))
      .catch((error) => console.error("Error saving API key:", error))
      .finally(() => {
        generateComments(process.argv[2], apiKey)
          .then(() => console.log("Comments generated successfully."))
          .catch((error) => console.error("Error generating comments:", error))
          .finally(() => rl.close());
      });
  });
}

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
