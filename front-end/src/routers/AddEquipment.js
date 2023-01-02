import React, { useState, useEffect } from "react";
import axios from "axios";
/* components and styles */
import Container from "../components/Container";
import styles from "../views/ListUser.module.scss";
import MainSecondHeder from "../components/MainSecoundHeder";
import MyInput from "../components/MyInput";
import Button from "../components/Button";
import Error from "../components/Error";

export default function AddEquipment() {
    const [listEquipment, setListEquipment] = useState([]);
    const [isErrorInput, setErrorInput] = useState(false);
    const [error, setError] = useState("");
    const [oneMachine, setOneMachine] = useState({
        lengthGallery: "",
        gallery: []
    });
    const [viewsMachine, setViewsMachine] = useState("close");
    const [nameMachine, setNameMachine] = useState("");
    const [model, setModel] = useState("");
    const [year, setYear] = useState("");
    const [quantity, setQuantity] = useState("");
    const [category, setCategory] = useState("");
    const [unitPriceService, setUnitPriceService] = useState("");
    const [description, setDescription] = useState("");
    const [form, setForm] = useState("");

    const equipmentList = () => {
        axios.post("http://127.0.0.1:8080/equipment/all")
            .then((res) => {
                setListEquipment(res.data)
            })
    };
    const addEquipment = () => {
        if (!nameMachine) {
            setError(<Error>To pole nie może być puste</Error>)
            setErrorInput(true)
        } else {
            axios.post("http://127.0.0.1:8080/equipment/add", { machineName: nameMachine })
                .then(() => {
                    setError(<Error isAlternative={true}>Dodałeś nowe urządzenie</Error>)
                    equipmentList();
                })
            setNameMachine("");
            setErrorInput(false)
        }
    }

    const oneEquipment = (_id) => {
        axios.get("http://127.0.0.1:8080/equipment/" + _id)
            .then((res) => {
                setOneMachine(res.data)
            })
    };

    const updateEquipment = (_id) => {
        axios.put("http://127.0.0.1:8080/equipment/update/" + _id, {
            machineName: nameMachine,
            model: model,
            year: year,
            quantity: quantity,
            category: category,
            unitPriceService: unitPriceService,
            description: description
        })
            .then(() => {
                oneEquipment(_id)
            })
    };

    const addPhoto = (_id) => {
        if (oneMachine?.lengthGallery >= 7) {
            return setError(<Error>Dodano Maźymalną ilość zdjęć</Error>)
        } else if (oneMachine?.lengthGallery >= 0) {

            const newLengthGallery = Number(oneMachine?.lengthGallery)
            const lengthGallery = (newLengthGallery + 1).toString()
            axios.put("http://127.0.0.1:8080/equipment/update/" + _id, { lengthGallery: lengthGallery })
            setError(<Error isAlternative={true}>Dodano {lengthGallery} z 7</Error>)

            const { photo } = form
            const formData = new FormData()
            formData.append("photo", photo)
            axios.put("http://127.0.0.1:8080/equipment/photo/" + _id, formData)
                .then(() =>
                    oneEquipment(_id))
        }
    }

    const renamePhoto = (namePhoto) => {
        const idPhoto = namePhoto.idPhoto
        const equipmentId = namePhoto.idEquipment

        const newLengthGallery = Number(oneMachine?.lengthGallery)
        const lengthGallery = (newLengthGallery - 1).toString()
        axios.put("http://127.0.0.1:8080/equipment/update/" + equipmentId, { lengthGallery: lengthGallery })
        setError(<Error isAlternative={true}>Zdjecie zostało usuniete</Error>)

        console.log(equipmentId);
        axios.delete("http://127.0.0.1:8080/equipment/renamePhoto/" + idPhoto, {
            data: {
                equipmentId: equipmentId,
                photoId: idPhoto
            }
        })
            .then(() => {
                oneEquipment(equipmentId)
            })
    }

    const pictureMain = (_id, namePhoto) => {
        const mainPicture = namePhoto.photo
        const idMainPicture = namePhoto.idPhoto
        axios.put("http://127.0.0.1:8080/equipment/update/" + _id, {
            mainPicture: mainPicture,
            idMainPicture: idMainPicture
        })
            .then(() => {
                oneEquipment(_id)
            })
    }

    const handlePhoto = async (e) => {
        setForm({
            ...form,
            photo: e.target.files[0],
        })
    };


    useEffect(() => {
        equipmentList()
    }, [])

    if (viewsMachine === "open") {
        return (
            <Container eightContainer={true}>
                <MainSecondHeder>{oneMachine?.machineName} {oneMachine?.model}</MainSecondHeder>
                <table>
                    <thead>
                        <tr>
                            <td colSpan="2">Dane Urządzenia</td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td> Nazwa</td>
                            {isErrorInput === false && (
                                <td>{oneMachine?.machineName}</td>
                            )}
                            {isErrorInput === true && (
                                <td>
                                    <MyInput
                                        placeholder="Nazwa usrzadzenia"
                                        value={nameMachine}
                                        onChange={(e) => { setNameMachine(e.target.value) }}
                                        type="text" />
                                </td>
                            )}

                        </tr>
                        <tr>
                            <td> Model</td>
                            {isErrorInput === false && (
                                <td>{oneMachine?.model}</td>
                            )}
                            {isErrorInput === true && (
                                <td>
                                    <MyInput
                                        placeholder="Model"
                                        value={model}
                                        onChange={(e) => { setModel(e.target.value) }}
                                        type="text" />
                                </td>
                            )}

                        </tr>
                        <tr>
                            <td> Rok Produkcji</td>
                            {isErrorInput === false && (
                                <td>{oneMachine?.year}</td>
                            )}
                            {isErrorInput === true && (
                                <td>
                                    <MyInput
                                        placeholder="Rok produkcji"
                                        value={year}
                                        onChange={(e) => { setYear(e.target.value) }}
                                        type="text" />
                                </td>
                            )}
                        </tr>
                        <tr>
                            <td colSpan="2" className={styles.thead}>Inne informacje</td>
                        </tr>
                        <tr>
                            <td>Dostępność</td>
                            {isErrorInput === false && (
                                <td>{oneMachine?.quantity}</td>
                            )}
                            {isErrorInput === true && (
                                <td>
                                    <MyInput
                                        placeholder="Stan"
                                        value={quantity}
                                        onChange={(e) => { setQuantity(e.target.value) }}
                                        type="text" />
                                </td>
                            )}
                        </tr>
                        <tr>
                            <td>Kategoria</td>
                            {isErrorInput === false && (
                                <td>{oneMachine?.category}</td>
                            )}
                            {isErrorInput === true && (
                                <td>
                                    <select onChange={(e) => setCategory(e.target.value)}>
                                        <option value={category}>{category}</option>
                                        <option value="Elektryczne">Elektryczne</option>
                                        <option value="Hydrauliczne">Hydrauliczne</option>
                                        <option value="Cięzki Sprzęt">Cięzki Sprzęt</option>
                                        <option value="Inne">Inne</option>
                                    </select>
                                </td>
                            )}
                        </tr>
                        <tr>
                            <td>Cenna za dobę</td>
                            {isErrorInput === false && (
                                <td>{oneMachine?.unitPriceService}</td>
                            )}
                            {isErrorInput === true && (
                                <td>
                                    <MyInput
                                        placeholder="Cenna"
                                        value={unitPriceService}
                                        onChange={(e) => { setUnitPriceService(e.target.value) }}
                                        type="text" />
                                </td>
                            )}
                        </tr>
                        <tr>
                            <td className={styles.thead} colSpan="2">Opis</td>
                        </tr>
                        <tr>
                            {isErrorInput === false && (
                                <td className={styles.textDescription} colSpan="2"><p>{oneMachine?.description}</p></td>
                            )}
                            {isErrorInput === true && (
                                <td colSpan="2">
                                    <textarea
                                        maxLength={900}
                                        placeholder="opis"
                                        value={description}
                                        onChange={(e) => { setDescription(e.target.value) }} />
                                </td>
                            )}
                        </tr>
                        <tr>
                            <td colSpan="2" className={styles.thead}>Galeria  {error}</td>
                        </tr>
                        <tr>
                            <td colSpan="2" >
                                <div className={styles.galleryContent}>
                                    {oneMachine?.gallery.map((photo) => {
                                        const namePhoto = {
                                            photo: photo.photo,
                                            idPhoto: photo._id,
                                            idEquipment: oneMachine._id
                                        }
                                        return (
                                            <div key={photo._id} className={styles.itemGalleryContent}>
                                                <img src={'http://localhost:8080/photo/' + photo.photo} alt="foto profil" />
                                                <div className={styles.btnContent}>
                                                    {oneMachine?.idMainPicture !== namePhoto.idPhoto && (
                                                        <Button forBtn={true} onClick={() => {
                                                            pictureMain(oneMachine?._id, namePhoto)
                                                        }}>Głównie</Button>
                                                    )}

                                                    <Button forBtn={true} onClick={() => renamePhoto(namePhoto)}>Usuń</Button>
                                                </div>
                                            </div>
                                        )
                                    })}
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td colSpan="2">
                                <input type="file" accept=".png, .jpg, .jpeg" name="photo" onChange={handlePhoto} />
                                <Button onClick={() => addPhoto(oneMachine?._id)}>Dodaj</Button>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <div className={styles.btnContent}>
                    {isErrorInput === false && (
                        <Button onClick={() => {
                            setNameMachine(oneMachine?.machineName)
                            setModel(oneMachine?.model)
                            setQuantity(oneMachine?.quantity)
                            setCategory(oneMachine?.category)
                            setQuantity(oneMachine?.quantity)
                            setYear(oneMachine?.year)
                            setUnitPriceService(oneMachine?.unitPriceService)
                            setDescription(oneMachine?.description)
                            setErrorInput(true)
                        }}>Edytuj</Button>
                    )}
                    {isErrorInput === true && (
                        <Button onClick={() => {
                            setErrorInput(false)
                            updateEquipment(oneMachine?._id)
                        }}>Zapisz</Button>
                    )}
                    {isErrorInput === true && (
                        <Button onClick={() => {
                            setErrorInput(false)
                        }}>Anuluj</Button>
                    )}

                    <Button onClick={() => {
                        setNameMachine("")
                        setModel("")
                        setYear("")
                        setErrorInput(false)
                        setViewsMachine("close")
                        equipmentList()
                        setError("")
                    }}>Wróć</Button>
                </div>
            </Container>
        )
    }
    return (
        <Container eightContainer={true}>
            <MainSecondHeder>Dodaj nowe urządzenie</MainSecondHeder>
            {error}
            <form>
                <MyInput
                    isError={isErrorInput}
                    type="text"
                    placeholder="Wpisz nazwę urządzenia"
                    value={nameMachine}
                    onChange={(e) => {
                        setNameMachine(e.target.value)
                        if (e.target.value === 0) {
                            setErrorInput(true)
                            setError(<Error>To pole nie może być puste</Error>)
                        } else {
                            setErrorInput(false)
                            setError("")
                        }
                    }} />
                <Button onClick={(e) => {
                    e.preventDefault();
                    addEquipment()
                }}>Dodaj</Button>
            </form>

            <MainSecondHeder>Lista Urządzeń</MainSecondHeder>
            <table>
                <thead>
                    <tr>
                        <td>Nazwa</td>
                        <td>Model</td>
                        <td>Ilość</td>
                        <td>Akcje</td>
                    </tr>
                </thead>
                <tbody>
                    {listEquipment.map((list) => {
                        return (
                            <tr key={list._id}>
                                <td>{list.machineName}</td>
                                <td>{list.model}</td>
                                <td>{list.quantity}</td>
                                <td><Button onClick={() => {
                                    setViewsMachine("open")
                                    oneEquipment(list._id)
                                }}>Wiecej informacji</Button></td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </Container>
    )
}