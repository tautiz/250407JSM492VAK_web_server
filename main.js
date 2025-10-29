const http = require("http");
const fs = require("fs");

const server = http.createServer((req, res) => {
    
    throw new Exception("Exception");

    
    let path = './views/';
    switch(req.url) {
        case '/':
            path += 'index.html';
            break;
        case '/about':
            path += 'about.html';
            break;
        default:
            path += '404.html';
            break;
    }

    fs.readFile(path, (err, data) => {
        if (err) {
            responseCode = 404;
        } else {
            responseCode = 200;
        }

        res.writeHead(responseCode, { 'Content-Type': 'text/html' });
        res.end(data);
    });
});

server.listen(1234, () => {
    console.log("Server running at http://localhost:1234");
});
