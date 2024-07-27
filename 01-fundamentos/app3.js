const fs = require("fs");

const content = fs.readFileSync("README.md", "utf8");

const wordCount = content.split(" ");

const reactWordCount = content.match(/react/gi).length;

console.log("Palabras:", wordCount.length);
console.log("Apariciones de react:", reactWordCount);
