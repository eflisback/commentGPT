#!/usr/bin/env node

import fs from "fs/promises";
import { config } from "dotenv";
import { Configuration, OpenAIApi } from "openai";

config();

async function generateComments(filePath) {
  const apiKey = process.env.API_KEY;

  const openai = new OpenAIApi(
    new Configuration({
      apiKey: apiKey,
    })
  );

  const fileContent = await fs.readFile(filePath, "utf-8");

  const prompt = `Add appropriate comments to the following code. Respond with the commented code in a code block.\n\n${fileContent}\n\n`;

  const res = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [{ role: "user", content: prompt }],
  });

  const response = res.data.choices[0].message.content;
  const trimmedResponse = response.slice(3, -3);

  await fs.writeFile(filePath, trimmedResponse, "utf-8");
}

if (process.argv.length < 3) {
  console.error("Please provide a file path.");
  process.exit(1);
}

const filePath = process.argv[2];
generateComments(filePath)
  .then(() => console.log("Comments generated successfully."))
  .catch((error) => console.error("Error generating comments:", error));
