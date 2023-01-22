const Category = require("../models/Category");
function addCategory(data, cb) {
    let newCategory = new Category(data);
    newCategory.save(function (err, category) {
        if (err) {
            cb(err)
        } else {
            cb(null, category)
        }
    })
};
function listCategory(cb) {
    Category.find().lean().exec(function (err, category) {
        if (err) {
            cb(err)
        } else {
            cb(null, category)
        }
    })
};

module.exports = {
    add: addCategory,
    list: listCategory
}