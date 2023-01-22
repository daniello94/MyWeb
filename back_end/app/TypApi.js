const express = require('express');
const router = express.Router();
const typ = require('./controller/typ.controller');

router.post('/add', function (req, res) {
    typ.add(req.body, function (err, typ) {
        if (err) {
            res.status(404);
            res.json({
                error: "Typ not created"
            })
        } else {
            res.json(typ)
        }
    })

});
router.post('/all', function (req, res) {
    typ.list(function (err, type) {
        if (err) {
            res.status(404);
            res.json({
                error: 'Typ not found'
            })
        } else {
            res.json(type)
        }
    })
});
module.exports = router