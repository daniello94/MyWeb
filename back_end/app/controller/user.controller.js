const User = require('../models/User')
const bcrypt = require('bcrypt');

function checkEmailUniqueness(email, cb) {
    User.findOne({ email: email }, (err, user) => {
        if (err) {
            return cb(err);
        }
        return cb(null, { exists: Boolean(user) })
    })
};

function addUser(data, cb) {
    let newUser = new User(data);
    newUser.save(function (err, user) {
        if (err) {
            cb(err)
        } else {
            cb(null, user)
        }
    })
};

function loginUser(data, cb) {
    User.findOne({ email: data.email }).exec(function (err, user) {
        if (err) {
            cb(err)
            return
        }
        if (!user) {
            cb(null, user)
            return
        };
        bcrypt.compare(data.password, user.password, function (err, logged) {
            if (err) {
                cb(err)
            } if (logged) {
                const token = user.generateAuthToken()
                cb(null, user, token)
            } else {
                cb(null, null)
            }
        })
    })
};

function delateUser(id, cb) {
    User.deleteOne({ _id: id }, function (err, user) {
        if (err) {
            cb(err)
        } else {
            cb(null, user)
        }
    })
};

module.exports = {
    add: addUser,
    login: loginUser,
    delate: delateUser,
    email:checkEmailUniqueness
}