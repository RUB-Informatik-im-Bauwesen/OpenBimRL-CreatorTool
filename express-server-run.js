const cors = require('cors');
const mime = require("mime");
const express = require('express');
const path = require('path');
const fs = require("fs");
const app = express();

const port = 3000;

const appString = '/webapp';

app.use(express.json()).use(express.static(__dirname + appString)); //.use(cors);

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname + appString + '/index.html'));
});

app.get('/entries', function(req, res) {
  const folder = __dirname + "/resources/";
  const fs = require('fs');

  fs.readdir(folder, (err, files) => {
    res.send(files);
  });
});

app.post('/load', function(req, res){
    var file = __dirname + "/resources/" + req.body.file;
    var xmlFile = fs.readFileSync(file, 'utf8');

    res.setHeader('Content-disposition', 'attachment; filename=' + req.body.file);
    res.setHeader('Content-type', "text/xml");

    res.send(xmlFile);
});
  

app.listen(port, () => {
  console.log(`Server listening on port: http://localhost:${port}`);
});