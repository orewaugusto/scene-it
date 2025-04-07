var express = require('express');
var app = express();
var PORT = '8080';
app.use(express.json());
app.get('/', function (req, res) {
    res.send('testing');
});
app.listen(PORT, function () {
    console.log("running on ".concat(PORT, "."));
});
