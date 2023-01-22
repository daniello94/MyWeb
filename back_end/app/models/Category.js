const mongoose = require('mongoose');

mongoose.connect('mongodb://' + process.env.DB_HOST + '/' + process.env.DB_NAME, { useNewUrlParser: true, useUnifiedTopology: true });

const schema = mongoose.Schema({
    category: {
        type: String,
        default: ''
    }
});
module.exports = mongoose.model('Category', schema);