const express = require('express');
const app = express();
const path = require('path');

// Settings
app.set('port', process.env.PORT || 80);

// Middlewares: això fa que si rebem un json, gràcies a aquesta linia podrem entendre-ho
app.use(express.json());

// Routes
app.use(require('./routes/quadres'));

// Starting the server
app.listen(app.get('port'), () => {
  console.log(`Server on port ${app.get('port')}`);
});

// Starting the server
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});

app.use('/', express.static(path.join(__dirname, 'public')))
//app.use(express.static('public'));

