var fs = require('fs');
fs.readFile('nodejs/sample.txt', 'utf8', (err, data)=> {
    console.log(data);
});