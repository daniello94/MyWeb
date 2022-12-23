const express = require('express');
const router = express.Router();
const user = require('./controller/user.controller');

router.post('/check-email-uniqueness', (req, res) => {
    const email = req.body.email
    user.email(email, (err, data) => {
        if (err) {
            return res.status(500).send(err)
        } else {
            return res.send(data)
        }
    })
});

router.post('/signup', function (req, res) {
    user.add(req.body, function (err, user) {
        if (err) {
            res.status(404);
            res.json({
                error: "User not created"
            })
        } else {
            res.json(user)
        }
    })

});

router.post('/login', function (req, res) {
    user.login(req.body, function (err, loggedUser, token = '') {
        if (err) {
            res.status(404);
            res.json({
                error: 'User not logged'
            })
        } else if (token) {
            res.json({ success: true, user: loggedUser, jwt: token })
        } else {
            res.json({ success: false, message: 'username or password do not match' })
        }
    })
});

router.delete('/delate/:id', function (req, res) {
    user.userDelate(req.params.id, function (err, data) {
        if (err) {
            res.status(404)
            res.json({
                error: "User not found"
            })
        } else {
            res.json(data)
        }
    })
});
module.exports = router