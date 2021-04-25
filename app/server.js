const express = require('express')
const app = express()
const path = require('path');
const fs = require('fs');
const https = require('https');

const port = 3000
const key = fs.readFileSync('./certs/key.pem');
const cert = fs.readFileSync('./certs/cert.pem');


app.use(express.static('public'));

const server = https.createServer({key: key, cert: cert }, app);
server.listen(port, () => {
    console.log(`GuitXR listening at https://localhost:${port}`)
})

/*app.get('*', function(req, res) {
    console.log('got request: '+req.headers.host+req.url);
    res.redirect('https://' + req.headers.host + req.url);

    // Or, if you don't want to automatically detect the domain name from the request header, you can hard code it:
    // res.redirect('https://example.com' + req.url);
})
app.listen(3000)*/
