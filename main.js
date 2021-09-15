var http = require('http');
var fs = require('fs');
var url = require('url');
var qs = require('querystring');

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
    } else if(pathname == "/create") {
        title = "WEB - create";
        var template = getTemplateHTML(title, `
        <form action="http://localhost:3000/create_process" method="post">
            <p>
                <input type="text" name="title" placeholder="Title">
            </p>
            <p>
                <textarea name="description" placeholder="Description"></textarea>
            </p>
            <p>
                <input type="submit">
            </p>
        </form>
        `);
        response.writeHead(200);
        response.end(template);
    } else if(pathname == "/create_process") {
        var body = "";
        // request는 위 createServer의 arg
        request.on('data', function(data) {
            body += data;
        })
        request.on('end', function() {
            var post = qs.parse(body);
            var title = post.title;
            var description = post.description;
            // file write
            fs.writeFile(`data/${title}`, description, 'utf8', function(err) {
                if(err) {
                    return console.log(err);
                }
                console.log(`Make ${title} file`);
            });
            // redirect to main(/)
            response.writeHead(302, {
                'Location': `/?id=${title}`
            });
            response.end();
        })
    }else {
        response.writeHead(404);
        response.end('Not found');
    }
});

 
function getTemplateHTML(title, data) {
        var files = fs.readdirSync('data/');
        var fileList = "<ol>";
        for(var i=0; i<files.length; i++) {
            fileList += `<li><a href="/?id=${files[i]}">${files[i]}</a></li>`
        }
        fileList += "</ol>";

        return `<!doctype html>
        <html>
        <head>
        <title>WEB1 - ${title}</title>
        <meta charset="utf-8">
        </head>
        <body>
        <h1><a href="/">WEB</a></h1>
        ${fileList}
        <a href="/create">create</a>
        <h2>${title}</h2>
        <p>
        ${data}
        </p>
        </body>
        </html>
        `;
}

app.listen(3000);