const express = require('express');
const router = express.Router();
const user = require('./controller/user.controller');

router.post('/generate-token', function (req, res) {
    user.tokenReset(req, res)
})

router.post('/reset-password', function (req, res) {
    user.reset(req, res)
})

router.post('/check-email-uniqueness', function (req, res) {
    const email = req.body.email
    user.email(email, function (err, data) {
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
    user.delate(req.params.id, function (err, data) {
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
router.post('/all', function (req, res) {
    user.list(function (err, users) {
        if (err) {
            res.status(404);
            res.json({
                error: 'users not found'
            })
        } else {
            res.json(users)
        }
    })
});

router.get('/:id', function (req, res) {
    user.get(req.params.id, function (err, user) {
        if (err) {
            res.status(404);
            res.json({
                error: 'user not found'
            })
        } else {
            res.json(user)
        }
    })
});
module.exports = router