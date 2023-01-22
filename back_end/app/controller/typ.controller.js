const Typ = require("../models/Typ");
function addCategory(data, cb) {
    let newTyp = new Typ(data);
    newTyp.save(function (err, typ) {
        if (err) {
            cb(err)
        } else {
            cb(null, typ)
        }
    })
};
function listCategory(cb) {
    Typ.find().lean().exec(function (err, typ) {
        if (err) {
            cb(err)
        } else {
            cb(null, typ)
        }
    })
};

module.exports = {
    add: addCategory,
    list: listCategory
}