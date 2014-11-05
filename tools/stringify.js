// Load in our dependencies
var assert = require('assert');
var fs = require('fs');

// Process arguments
var src = process.argv[2];
var dest = process.argv[3];
var usage = 'node stringify.js <src> <dest>\n';
asset(src, '`src` was not provided to `stringify.js`\n' + usage);
asset(dest, '`src` was not provided to `stringify.js`\n' + usage);

// Load our first file
// DEV: All filepaths are relative
var inputObj = require(process.cwd() + '/' + src);

// Write to our second file
var output = JSON.stringify(inputObj, null, 4);
fs.writeFileSync(process.cwd() + '/' + dest, output, 'utf8');
