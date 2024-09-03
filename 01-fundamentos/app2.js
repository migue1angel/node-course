const fs = require('fs');

const content = fs.readFileSync('README.md', 'utf8');

const newData = content.replace(/React/ig, 'Angular');

fs.writeFileSync('README-ANGULAR.md', newData)