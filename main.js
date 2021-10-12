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
        var template = getTemplateHTML(title, getModTemplateHTML("", ""));
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
    } else if(pathname == "/update") {

        // 메인화면 혹은 create화면 에서 왔다면 update 기능 안되어야함.
        if(title=="Welcome" || title=="WEB - create") return;

        fs.readFile(`./data/${title}`, 'utf8', (err,data)=>{
            // queryData length가 0 이라는건 query값이 없다는것 즉 main 페이지이기 때문에 welcome으로함
            if(Object.keys(queryData).length==0) {
                title = "Welcome";
                data = "Hello Node.js";
            }
            var template = getTemplateHTML(title, getModTemplateHTML(title, data));
            response.writeHead(200);
            response.end(template);
        });
    } else if(pathname == "/delete_process") {
        
        // 메인화면 혹은 create화면 에서 왔다면 update 기능 안되어야함.
        // if(title=="Welcome" || title=="WEB - create") return;
        // delete를 get방식으로 하면 위험하니 post로 한다.
        var body = "";
        // request는 위 createServer의 arg
        request.on('data', function(data) {
            body += data;
        })
        request.on('end', function() {
            var post = qs.parse(body);
            var title = post.id;
            
            fs.unlink(`./data/${title}`, function(err) {
                if(err) {
                    return console.log(err);
                }
                console.log(`Delete ${title} file`);
                // redirect to main(/)
                response.writeHead(302, {
                    'Location': '/'
                });
                response.end();
            });
        })

    } else {
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
        <a href="/update?id=${title}">update</a> 
        <form action="delete_process" method="post">
            <input type="hidden" name="id" value="${title}">
            <input type="submit" value="delete">
        </form>
        <h2>${title}</h2>
        <p>
        ${data}
        </p>
        </body>
        </html>
        `;
}

function getModTemplateHTML(title, description) {
    
    // 업데이트 일 때는 title을 hidden 하여 수정하지 못하도록 함
    var mod = "hidden";
    if(title.length==0) mod = "text";

    return `<form action="http://localhost:3000/create_process" method="post">
            <p>
                <input type=${mod} name="title" placeholder="Title" value=${title}>
            </p>
            <p>
                <textarea name="description" placeholder="Description" rows="20" cols="80">${description}</textarea>
            </p>
            <p>
                <input type="submit">
            </p>
        </form>
    `;
}


app.listen(3000);