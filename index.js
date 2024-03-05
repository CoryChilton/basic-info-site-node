const http = require('http');
const fs = require('fs').promises;

const host = 'localhost';
const port = 8080;

console.log(__dirname)

const requestListener = function (req, res) {
    fs.readFile(__dirname + "/index.html")
    .then(contents => {
        res.writeHead(200, {"Content-Type": "text/html"});
        res.end(contents);
    })
    .catch(err => {
        res.writeHead(500, {"Content-Type": "text/plain"});
        res.end(err.message);
    });
};

const server = http.createServer(requestListener);
server.listen(port, host, () => {
    console.log(`Server is running on http://${host}:${port}`);
});