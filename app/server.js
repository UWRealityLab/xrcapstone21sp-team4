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