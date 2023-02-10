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

async function deleteEquipment(id) {
    try {
        // Pobierz elementy z tablicy gallery, jeśli istnieje
        let equipment = await Equipment.findOne({ _id: id });
        let gallery = equipment.gallery;
        // Usuń pliki z folderu photo service

        for (let photo of gallery) {
            console.log(photo, 'sds');
            Photo.findOneAndDelete({ name: photo }, function (err, deletedPhoto) {
                if (err) {
                    throw new Error(`Błąd podczas usuwania zdjęcia z bazy danych: ${err}`);
                } else {
                    if (!deletedPhoto) {
                        console.log('Nie znaleziono zdjęcia o nazwie ', photo);
                        return;
                    }
                    fs.unlink('./photoService/' + deletedPhoto.photo, function (err) {
                        if (err) {
                            throw new Error(`Błąd podczas usuwania zdjęcia z folderu photo service: ${err}`);
                        }
                    });
                }
            });
        }
        // Usuń elementy z modelu Photo, których nazwy są takie same jak elementy z tablicy gallery
        if (gallery.length > 0) {
            Photo.deleteOne({ photo: { $in: gallery } })
                .then(function () {
                    console.log('Tablica gallery jest pusta');
                })
                .catch(function (err) {
                    console.log(err);
                });
        }
        // Usuń element z modelu Equipment
        await Equipment.deleteOne({ _id: id });

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