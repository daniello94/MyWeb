const mongoose = require('mongoose');
mongoose.connect('mongodb://' + process.env.DB_HOST + '/' + process.env.DB_NAME, { useNewUrlParser: true, useUnifiedTopology: true });
const Photo = require("./Photo").schema
const conclusion = new mongoose.Schema({
    oderStan: {
        type: String,
        default: "Oczekujący",
    },

    firstName: {
        type: String,
        default: "",
    },

    lastName: {
        type: String,
        default: "",
    },

    phoneNumber: {
        type: String,
        default: "",
    },

    numberId: {
        type: String,
        default: "",
    },

    typePerson: {
        type: String,
        default: ""
    },

    nameCompany: {
        type: String,
        default: ""
    },

    startDate: {
        type: String,
        default: ""
    },

    endDate: {
        type: String,
        default: ""
    },

}, {
    timestamps: true

});

const equipments = new mongoose.Schema({

    machineName: {
        type: String,
        default: ""
    },

    quantity: {
        type: String,
        default: "",
    },

    gallery: [Photo],

    lengthGallery: {
        type: String,
        default: "0"
    },

    year: {
        type: String,
        default: ""
    },
    mainPicture: {
        type: String,
        default: ""
    },
    idMainPicture: {
        type: String,
        default: ""
    },
    recommend: {
        type: Boolean,
        default: false
    },
    model: {
        type: String,
        default: ""
    },

    category: {
        type: String,
        default: ""
    },

    description: {
        type: String,
        default: ""
    },
    unitPriceService: {
        type: String,
        default: ""
    },

    application: [conclusion]
});
module.exports = mongoose.model("Equipment", equipments);