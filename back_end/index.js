require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');

/* api */
const user = require('./app/userApi');
const equipment = require('./app/EquipmentApi');

const config = {
    origin: 'http://' + process.env.DB_HOST
};

app.use('/photo', express.static('photoService'));

app.use(express.json());
app.use(cors());
app.use('/user', user);
app.use('/equipment', equipment)

app.get('/', cors(config), function (req, res) {
    res.status(219).json("Projekt serwisu")
});

app.listen(process.env.PORT, function () {
    console.log(`Beck-end witryny firmy na porcie ${process.env.PORT} działą prawidłowo`);
});