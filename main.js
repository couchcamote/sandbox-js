const express = require('express');
const path = require('path');
const router = express.Router();
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
const mongoose = require('mongoose');
const passport = require('passport');

const appconfig = require('./config/appconfig');

mongoose.connect(appconfig.database.host, { useNewUrlParser: true });
mongoose.connection.on('connected', () => {
	console.log('Connected to Mongo DB '+ appconfig.database.host);
});

const port = process.env.PORT || 8090;

const users = require('./routes/users');

app.use(passport.initialize());
app.use(passport.session());
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname,'front-end')));

app.use('/users', users);

// Main Indexs
// app.get('/',  (req, res) => {
// 	console.log("test");
// 	res.send('test response');
// });

// Start Server
app.listen(port, () => console.log('Started server on port '+ port));
