const { write } = require('fs');
const http = require('http');
const fs = require('fs').promises;

const host = 'localhost';
const port = 8080;

console.log(__dirname)

function write_html_to_res(res, page_name) {
    fs.readFile(__dirname + "/" + page_name)
    .then(contents => {
        res.writeHead(200, {"Content-Type": "text/html"});
        res.end(contents);
    })
    .catch(err => {
        res.writeHead(500, {"Content-Type": "text/plain"});
        res.end(err.message);
    });
}

const requestListener = function (req, res) {
    console.log(req.url)
    switch(req.url) {
        case '/':
            write_html_to_res(res, "index.html");
            break;
        case '/contact-me':
            write_html_to_res(res, "contact-me.html");
            break;
        case '/about':
            write_html_to_res(res, "about.html");
            break;
        default:
            write_html_to_res(res, "404.html");
    }
};

const server = http.createServer(requestListener);
server.listen(port, host, () => {
    console.log(`Server is running on http://${host}:${port}`);
});