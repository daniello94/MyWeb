const express = require('express');
const router = express.Router();
const category = require('./controller/category.controller');

router.post('/add', function (req, res) {
    category.add(req.body, function (err, user) {
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
router.post('/all', function (req, res) {
    category.list(function (err, users) {
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
module.exports = router
