const express = require('express');
const router = express.Router();
const equipment = require("./controller/equipment.controller");

const multer = require('multer');
const { v4: uuidv4 } = require('uuid')
const path = require('path')


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'photoService')
    },
    filename: function (req, file, cb) {
        cb(null, uuidv4() + '-' + Date.now() + path.extname(file.originalname))
    }
})

const fileFilter = (req, file, cb) => {
    const allowedFileTypes = ['image/jpeg', 'image/jpg', 'image/png'];
    if (allowedFileTypes.includes(file.mimetype)) {
        cb(null, true)
    } else {
        cb(null, false)
    }
}
let upload = multer({ storage, fileFilter })

router.post('/add', function (req, res) {
    equipment.add(req.body, function (err, equipment) {
        if (err) {
            res.status(404);
            res.json({
                error: "equipment not created"
            })
        } else {
            res.json(equipment)
        }
    })

});

router.delete('/delate/:id', function (req, res) {
    equipment.delete(req.params.id, function (err, data) {
        if (err) {
            res.status(404)
            res.json({
                error: "Equipment not found"
            })
        } else {
            res.json(data)
        }
    })
});
router.put('/photo/:id', upload.single('photo'), function (req, res) {
    const photo = req.file.filename;
    const newPhoto = { photo }
    equipment.photo([req.params.id, newPhoto], function (err, photo) {
        if (err) res.send(err)
        res.json(photo)
    })
});

router.put('/application/:id', function (req, res) {
    equipment.application([req.params.id, req.body], function (err, application) {
        if (err) res.send(err)
        res.json(application)
    })
});
router.post('/all', function (req, res) {
    equipment.list(function (err, equipments) {
        if (err) {
            res.status(404);
            res.json({
                error: 'equipment not found'
            })
        } else {
            res.json(equipments)
        }
    })
});

router.get('/:id', function (req, res) {
    equipment.get(req.params.id, function (err, equipment) {
        if (err) {
            res.status(404);
            res.json({
                error: 'equipment not found'
            })
        } else {
            res.json(equipment)
        }
    })
});
router.put('/update/:id', function (req, res) {
    equipment.update(req.params.id, req.body, function (err, data) {
        if (err) {
            res.status(404);
            res.json({
                error: "not found"
            })
        } else {
            res.json(data)
        }
    })
});

router.delete('/renamePhoto/:id', function (req, res) {
    let photoId = req.params.id;
    let equipmentId = req.body.equipmentId;
    equipment.deletePhoto([equipmentId, photoId], function (err, updatedEquipment) {
        if (err) {
            res.status(500).send(err);
        } else {
            res.send(updatedEquipment);
        }
    });
});

router.delete('/:id/application', function (req, res) {
    const equipmentId = req.params.id;
    const applicationId = req.body.id;
    equipment.delateTwo([equipmentId, applicationId], function (err, updatedEquipment) {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).send(updatedEquipment);
        }
    });
});

module.exports = router
