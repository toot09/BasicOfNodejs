var http = require('http');
var fs = require('fs');
var url = require('url');

var app = http.createServer(function(request, response) {
    
    var _url = request.url;
    var urlParse = url.parse(_url, true);
    var queryData = urlParse.query;
    var pathname = urlParse.pathname;
    var title = queryData.id;
    
    //console.log(url.parse(_url, true));
    //console.log(fs.readdirSync('data/'));
    
    if(pathname == "/") {
        fs.readFile(`data/${title}`, 'utf8', (err,data)=>{
            // queryData length가 0 이라는건 query값이 없다는것 즉 main 페이지이기 때문에 welcome으로함
            if(Object.keys(queryData).length==0) {
                title = "Welcome";
                data = "Hello Node.js";
            }
            var template =  getTemplateHTML(title, data);
            response.writeHead(200);
            response.end(template);
        });
    } else {
        response.writeHead(404);
        response.end('Not found');
    }
});

 
function getTemplateHTML(title, data) {
        var files = fs.readdirSync('data/');
        var fileList = "";
        for(var i=0; i<files.length; i++) {
            fileList += `<li><a href="/?id=${files[i]}">${files[i]}</a></li>`
        }

        return `<!doctype html>
        <html>
        <head>
        <title>WEB1 - ${title}</title>
        <meta charset="utf-8">
        </head>
        <body>
        <h1><a href="/">WEB</a></h1>
        <ol>
            ${fileList}
        </ol>
        <h2>${title}</h2>
        <p>
        ${data}
        </p>
        </body>
        </html>
        `;
}

app.listen(3000);