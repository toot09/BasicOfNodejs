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
    if(pathname == "/") {
        fs.readFile(`data/${title}`, 'utf8', (err,data)=>{
            if(Object.keys(queryData).length==0) {
                title = "Welcome";
                data = "Hello Node.js";
            }
            var template = `
                        <!doctype html>
                        <html>
                        <head>
                        <title>WEB1 - ${title}</title>
                        <meta charset="utf-8">
                        </head>
                        <body>
                        <h1><a href="/">WEB</a></h1>
                        <ol>
                            <li><a href="/?id=HTML">HTML</a></li>
                            <li><a href="/?id=CSS">CSS</a></li>
                            <li><a href="/?id=JavaScript">JavaScript</a></li>
                        </ol>
                        <h2>${title}</h2>
                        <p>
                        ${data}
                        </p>
                        </body>
                        </html>
                        `;
            response.writeHead(200);
            response.end(template);
        });
    } else {
        response.writeHead(404);
        response.end('Not found');
    }

     
});
app.listen(3000);