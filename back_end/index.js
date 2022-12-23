require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');

/* api */
const user = require('./app/userApi');

const config = {
    origin: 'http://' + process.env.DB_HOST
};

app.use(express.json());
app.use(cors());
app.use('/user', user);

app.get('/', cors(config), function (req, res) {
    res.status(219).json("Projekt serwisu")
});

app.listen(process.env.PORT, function () {
    console.log(`Beck-end witryny firmy na porcie ${process.env.PORT} działą prawidłowo`);
});