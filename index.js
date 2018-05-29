const express = require('express');
const app = express();
const bodyParser = require('body-parser');

// connect database
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/ups');

const conn = mongoose.connection;
conn.on('error', () => {
    console.error('Connect to database failed');
    process.exit();
});
conn.once('open', () => console.log('Connect to database successfully'));


const userAPI = require('./api/user');

// middlewares setting
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// setting port
const PORT = process.env.PORT || 8899;

// routes
app.use('/user', userAPI);

app.listen(PORT, () => console.log(`Server is running on :${PORT}`));
