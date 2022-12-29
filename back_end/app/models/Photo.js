const mongoose = require('mongoose');

mongoose.connect('mongodb://' + process.env.DB_HOST + '/' + process.env.DB_NAME, { useNewUrlParser: true, useUnifiedTopology: true });

const schema = mongoose.Schema({
    photo: {
        type: String,
        default: ''
    }

});
module.exports = mongoose.model('Photo', schema);