# CommentGPT
### Description
CommentGPT is a Node.js package that uses the power of GPT-3.5 to automatically generate code comments. Simply provide a file path as an argument, and CommentGPT will read the code in the file and generate comments that describe what the code does. The comments are generated in natural language and do not contain any code block formatting.

### Functionality
CommentGPT uses the OpenAI API to generate comments, so you will need an API key to use it. The package also generates a JSON file to store your API key.

### Usage
Simply install the package using `npm install commentgpt`, then use it by typing `npx commentgpt /file/path` or `npm run commentgpt /file/path`
