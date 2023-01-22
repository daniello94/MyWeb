require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');

/* api */
const user = require('./app/userApi');
const equipment = require('./app/EquipmentApi');
const category = require('./app/CategoryApi');
const typ = require("./app/TypApi");

const config = {
    origin: 'http://' + process.env.DB_HOST
};

app.use('/photo', express.static('photoService'));

app.use(express.json());
app.use(cors());
app.use('/user', user);
app.use('/equipment', equipment)
app.use('/category', category)
app.use('/typ', typ)

app.get('/', cors(config), function (req, res) {
    res.status(219).json("Projekt serwisu")
});

app.listen(process.env.PORT, function () {
    console.log(`Beck-end witryny firmy na porcie ${process.env.PORT} działą prawidłowo`);
});