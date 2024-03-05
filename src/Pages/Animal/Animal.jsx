import React, { useEffect, useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import UpdateIcon from "@mui/icons-material/Update";
import {
  getAnimals,
  deleteAnimals,
  createAnimals,
  updateAnimalsAPI,
} from "../../API/animal";
import "./Animal.css";

function Animal() {
  const [animals, setAnimals] = useState([]);
  const [reload, setReload] = useState(true);
  const [newAnimals, setNewAnimals] = useState({
    name: "",
    species: "",
    gender: "",
    colour: "",
    breed: "",
    date: "",
  });
  const [updateAnimals, setUpdateAnimals] = useState({
    name: "",
    species: "",
    gender: "",
    colour: "",
    breed: "",
    date: "",
  });

  useEffect(() => {
    getAnimals().then((data) => {
      setAnimals(data);
      console.log(data);
    });
    setReload(false);
  }, [reload]);

  const handleNewAnimal = (event) => {
    setNewAnimals({
      ...newAnimals,
      [event.target.name]: event.target.value,
    });
  };

  const handleCreate = () => {
    createAnimals(newAnimals).then(() => {
      setReload(true);
    });
    setNewAnimals({
      name: "",
      species: "",
      gender: "",
      colour: "",
      breed: "",
      date: "",
    });
  };

  const handleUpdateChange = (event) => {
    setUpdateAnimals({
      ...updateAnimals,
      [event.target.name]: event.target.value,
    });
  };

  const handleUpdate = () => {
    updateAnimalsAPI(updateAnimals).then(() => {
      setReload(true);
    });
    setUpdateAnimals({
      name: "",
      species: "",
      gender: "",
      colour: "",
      breed: "",
      date: "",
    });
  };

  const handleDelete = (id) => {
    deleteAnimals(id).then(() => {
      setReload(true);
    });
  };

  const handleUpdateBtn = (ani) => {
    setUpdateAnimals({
      name: ani.name,
      species: ani.species,
      gender: ani.gender,
      colour: ani.colour,
      breed: ani.breed,
      dateOfBirth: ani.date,
    });
  };

  return (
    <>
      <h1>Hayvan Yönetimi</h1>
      <div className="list">
        <h2>Hayvan Listesi</h2>
        {animals.map((animal) => (
          <div key={animal.id}>
            <div className="animal-table">
              <div className="row header">
                <div>Hayvan Adı</div>
                <div>Hayvan Cins</div>
                <div>Hayvan Cinsiyet</div>
                <div>Hayvan Renk</div>
                <div>Kısır Mı?</div>
                <div>Doğum Günü</div>
                <div>İşlemler</div>
              </div>
              <div className="row">
                <div>{animal.name}</div>
                <div>{animal.species}</div>
                <div>{animal.gender}</div>
                <div>{animal.colour}</div>
                <div>{animal.breed}</div>
                <div>{animal.date}</div>
                <div className="operations">
                  <span id={animal.id} onClick={() => handleDelete(animal.id)}>
                    <DeleteIcon />
                  </span>
                  <span onClick={() => handleUpdateBtn(animal)}>
                    <UpdateIcon />
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <h2>Hayvan Ekle</h2>
      <div className="add-container">
        <input
          type="text"
          placeholder="Name"
          name="name"
          value={newAnimals.name}
          onChange={handleNewAnimal}
        />
        <input
          type="text"
          placeholder="species"
          name="species"
          value={newAnimals.species}
          onChange={handleNewAnimal}
        />
        <select id="genders" name="genders">
          <option value=" "></option>
          <option value={newAnimals.gender} onChange={handleNewAnimal}>
            Female
          </option>
          <option value={newAnimals.gender} onChange={handleNewAnimal}>
            Male
          </option>
        </select>
        <input
          type="text"
          placeholder="color"
          name="color"
          value={newAnimals.color}
          onChange={handleNewAnimal}
        />
        <input
          type="text"
          placeholder="breed"
          name="breed"
          value={newAnimals.breed}
          onChange={handleNewAnimal}
        />
        <input
          type="date"
          placeholder="dateOfBirth"
          name="dateOfBirth"
          value={newAnimals.dateOfBirth}
          onChange={handleNewAnimal}
        />
        <button onClick={handleCreate}>Create</button>
      </div>
      <div>
        <h2>Hayvan Güncelle</h2>
        <input
          type="text"
          placeholder="Name"
          name="name"
          onChange={handleUpdateChange}
          value={updateAnimals.name}
        />
        <input
          type="text"
          placeholder="species"
          name="species"
          value={updateAnimals.species}
          onChange={handleUpdateChange}
        />
        <select id="genders" name="genders">
          <option value=" "></option>
          <option value={updateAnimals.gender} onChange={handleUpdateChange}>
            Female
          </option>
          <option value={updateAnimals.gender} onChange={handleUpdateChange}>
            Male
          </option>
        </select>
        <input
          type="text"
          placeholder="color"
          name="color"
          value={updateAnimals.color}
          onChange={handleUpdateChange}
        />
        <input
          type="text"
          placeholder="breed"
          name="breed"
          value={updateAnimals.breed}
          onChange={handleUpdateChange}
        />
        <input
          type="date"
          placeholder="dateOfBirth"
          name="dateOfBirth"
          value={updateAnimals.dateOfBirth}
          onChange={handleUpdateChange}
        />
        <button onClick={handleUpdate}>Update</button>
      </div>
    </>
  );
}

export default Animal;
