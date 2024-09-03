const fs = require('fs');

const content = fs.readFileSync('README.md', 'utf8');

const words = content.split(" ").length;

const reactWords = content.match(/react/ig);

console.log('Palabras: ', words);
console.log('Apariciones de react: ', reactWords.length);
