const Equipment = require("../models/Equipment");
const Photo = require("../models/Photo");
const fs = require('fs');
const path = require('path');

function addEquipment(data, cb) {
    let newEquipment = new Equipment(data);
    newEquipment.save(function (err, equipment) {
        if (err) {
            cb(err)
        } else {
            cb(null, equipment)
        }
    })
};

// function delateEquipment(id, cb) {
//     Equipment.deleteOne({ _id: id }, function (err, equipment) {
//         if (err) {
//             cb(err)
//         } else {
//             cb(null, equipment)
//         }
//     })
// };

async function deleteEquipment(id) {

    try {
        // Pobierz elementy z tablicy gallery, jeśli istnieje
        let gallery = [];
        const equipment = await Equipment.findOne({ _id: id });
        if (equipment.hasOwnProperty('gallery')) {
            gallery = equipment.gallery.photo;
        }
        if (!Array.isArray(gallery)) {
            throw new Error(`Zmienna gallery nie jest tablicą: ${gallery}`);
        }
        // Usuń elementy z modelu Photo, których nazwy są takie same jak elementy z tablicy gallery
        const deletedPhotos = await Photo.deleteMany({ name: { $in: gallery } });
        console.log(`Usunięto ${deletedPhotos.deletedCount} elementów z modelu Photo`);
        console.log(deletedPhotos)
    } catch (err) {
        throw err;
    }
}

function photoAdd(data, cb) {
    let newPhoto = new Photo(data[1]);

    newPhoto.save(function (err, savedPhoto) {
        if (err) {
            cb(err);
        } else {
            Equipment.updateOne(
                { _id: data[0] },
                { $push: { gallery: savedPhoto } },
                function (err, updatedEquipment) {
                    if (err) {
                        cb(err);
                    } else {
                        cb(null, updatedEquipment);
                    }
                }
            )
        }
    })
};

function photoRemove(data, cb) {
    Photo.findByIdAndDelete(data[1], function (err, deletedPhoto) {
        if (err) {
            cb(err);
        } else {
            fs.unlink('./photoService/' + deletedPhoto.photo, function (err) {
                if (err) {
                    cb(err);
                }
                Equipment.findById(data[0], function (err) {
                    if (err) {
                        cb(err);
                    } else {
                        cb(null);
                    }
                });
                Equipment.updateOne(
                    { _id: data[0], gallery: { $elemMatch: { photo: deletedPhoto.photo } } },
                    { $pull: { gallery: { photo: deletedPhoto.photo } } },
                    function (err) {
                        if (err) {
                            cb(err);
                        } else {
                            cb(null);
                        }
                    }
                );
            });
        }
    });
}

function conclusionAdd(data, cb) {
    Equipment.updateOne(
        { _id: data[0] },
        { $push: { application: data[1] } },
        function (err, conclusion) {
            if (err) {
                cb(err)
            } else {
                cb(null, conclusion)
            }
        })
};

function listEquipment(cb) {
    Equipment.find().lean().exec(function (err, clients) {
        if (err) {
            cb(err)
        } else {
            cb(null, clients)
        }
    })
};
function getEquipment(id, cb) {
    Equipment.findById(id).exec(function (err, client) {
        if (err) {
            cb(err)
        } else {
            cb(null, client)
        }
    })
};
function updateStan(id, data, cb) {
    Equipment.updateOne(
        { _id: id },
        data,
        function (err, message) {
            if (err) {
                cb(err)
            } else {
                cb(null, message)
            }
        })
};
module.exports = {
    add: addEquipment,
    delete: deleteEquipment,
    photo: photoAdd,
    application: conclusionAdd,
    list: listEquipment,
    get: getEquipment,
    update: updateStan,
    deletePhoto: photoRemove
}