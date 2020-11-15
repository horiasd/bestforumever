const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session'); 
const app = express();

app.use(express.static('static'));
app.use(session({
    secret: 'secret'
}));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

require('./route/index')(app);

app.use( (err, req, res, next) => {
    res.end('Problem...')
    console.log(err);
});

app.listen(3000, function () {
    console.log('port :3000');
});