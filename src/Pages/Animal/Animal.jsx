import { useState, useEffect } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import UpdateIcon from "@mui/icons-material/Update";
import Modal from "../Modal/Modal";

import {
  getAnimals,
  deleteAnimals,
  createAnimals,
  updateAnimalsAPI,
} from "../../API/animal";
import "./Animal.css";
import { getCustomers } from "../../API/customer";
import { getByName } from "../../API/animal";
import { getByCustomerId } from "../../API/animal";

function Animal() {
  const [animal, setAnimal] = useState([]);
  const [customer, setCustomer] = useState([]);
  const [name, setName] = useState("");
  const [customerId, setCustomerId] = useState("");
  const [reload, setReload] = useState(true);
  const [newAnimal, setNewAnimal] = useState({
    name: "",
    species: "",
    breed: "",
    gender: "",
    colour: "",
    date: "",
    customer: "",
  });

  const [updateAnimal, setUpdateAnimal] = useState({
    name: "",
    species: "",
    breed: "",
    gender: "",
    colour: "",
    date: "",
    customer: "",
  });

  const [error, setError] = useState(null);
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);

  useEffect(() => {
    getAnimals().then((data) => {
      setAnimal(data);
      console.log(data);
    });
    getCustomers().then((data) => {
      setCustomer(data);
    });
    setReload(false);
  }, [reload]);

  const handleDelete = (id) => {
    deleteAnimals(id)
      .then(() => {
        setReload(true);
      })
      .catch((err) => handleOperationError(err.message));
  };

  const handleSearch = () => {
    getByName(name).then((data) => {
      setAnimal(data);
    });
  };

  const handleSearchCustomerId = () => {
    getByCustomerId(customerId).then((data) => {
      setAnimal(data);
    });
  };

  const handleUpdateBtn = (ani) => {
    setUpdateAnimal({
      name: ani.name,
      species: ani.species,
      breed: ani.breed,
      gender: ani.gender,
      colour: ani.colour,
      date: ani.date,
      customer: ani.customer,
      id: ani.id,
    });
  };

  const handleNewAnimal = (event) => {
    if (event.target.name === "customer") {
      setNewAnimal({
        ...newAnimal,
        customer: {
          id: event.target.value,
        },
      });
    } else {
      setNewAnimal({
        ...newAnimal,
        [event.target.name]: event.target.value,
      });
    }
  };

  const handleCreate = () => {
    createAnimals(newAnimal)
      .then(() => {
        setReload(true);
        setNewAnimal({
          name: "",
          species: "",
          breed: "",
          gender: "",
          colour: "",
          date: "",
          customer: {
            id: "",
          },
        });
      })
      .catch((err) => handleOperationError(err.message));
  };

  const handleUpdateChange = (event) => {
    if (event.target.name === "customer") {
      setUpdateAnimal({
        ...updateAnimal,
        customer: {
          id: event.target.value,
        },
      });
    } else {
      setUpdateAnimal({
        ...updateAnimal,
        [event.target.name]: event.target.value,
      });
    }
  };

  const handleUpdate = () => {
    updateAnimalsAPI(updateAnimal)
      .then(() => {
        setReload(true);
        setUpdateAnimal({
          name: "",
          species: "",
          breed: "",
          gender: "",
          colour: "",
          date: "",
          customer: {
            id: "",
          },
        });
      })
      .catch((err) => handleOperationError(err.message));
  };

  const handleOperationError = (errorMessage) => {
    setError(errorMessage);
    setIsErrorModalOpen(true);
  };

  const handleCloseErrorModal = () => {
    setIsErrorModalOpen(false);
    setError(null);
  };

  return (
    <div>
      <div className="animal-search">
        <h1>Hayvan Yönetimi</h1>
        <div className="ani-search">
          <input
            type="text"
            placeholder="Hayvan Ara..."
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <button onClick={handleSearch} className="search-button">
            Ara
          </button>
          <input
            type="number"
            placeholder="Müşteri ID Ara..."
            value={customerId}
            onChange={(e) => setCustomerId(e.target.value)}
          />
          <button onClick={handleSearchCustomerId} className="search-button">
            Filtrele
          </button>
        </div>
      </div>
      <h2>Hayvan Listesi</h2>
      <div className="table-container">
        <table className="table">
          <thead>
            <tr>
              <th>Hayvan İsmi</th>
              <th>Hayvan Cinsi</th>
              <th>Hayvan Cinsiyet</th>
              <th>Hayvan Renk</th>
              <th>Kısır mı?</th>
              <th>Doğum Tarihi</th>
              <th>Hayvan Sahibi</th>
              <th>Hayvan Sahibi ID</th>
              <th>İşlemler</th>
            </tr>
          </thead>

          <tbody>
            {animal.map((animals) => (
                  <tr key={animals.id}>
                    <td>{animals.name}</td>
                    <td>{animals.species}</td>
                    <td>{animals.gender}</td>
                    <td>{animals.colour}</td>
                    <td>{animals.breed}</td>
                    <td>{animals.date}</td>
                    <td>{animals.customer.name}</td>
                    <td>{animals.customer.id}</td>
                    <div className="icon-container">
                      <DeleteIcon
                        onClick={() => handleDelete(animals.id)}
                        style={{ color: "#850E35", marginRight: "8px" }}
                      />
                      <UpdateIcon
                        onClick={() => handleUpdateBtn(animals)}
                        style={{ color: "#850E35" }}
                      />
                    </div>
                  </tr>
                ))}
          </tbody>
        </table>
      </div>
      <div className="operations">
        <div className="addanimal">
          <h2>Hayvan Ekleme</h2>
          <input
            type="text"
            placeholder="İsim"
            name="name"
            value={newAnimal.name}
            onChange={handleNewAnimal}
          />
          <input
            type="text"
            placeholder="Cinsi"
            name="species"
            value={newAnimal.species}
            onChange={handleNewAnimal}
          />
          <input
            type="text"
            placeholder="Kısır Mı?"
            name="breed"
            value={newAnimal.breed}
            onChange={handleNewAnimal}
          />
          <input
            type="text"
            placeholder="Cinsiyet"
            name="gender"
            value={newAnimal.gender}
            onChange={handleNewAnimal}
          />
          <input
            type="text"
            placeholder="Renk"
            name="colour"
            value={newAnimal.colour}
            onChange={handleNewAnimal}
          />
          <input
            type="date"
            name="date"
            value={newAnimal.date}
            onChange={handleNewAnimal}
          />
          <select
            value={newAnimal.customer.id}
            name="customer"
            onChange={handleNewAnimal}
          >
            <option value="" disabled={true} selected={true}>
              Hayvan Sahibi Seçiniz
            </option>
            {customer.map((customers) => {
              return <option value={customers.id}>{customers.name}</option>;
            })}
          </select>
          <button onClick={handleCreate}>Ekle</button>
        </div>

        <div className="updateAnimal">
          <h2>Hayvan Güncelleme</h2>
          <input
            type="text"
            placeholder="İsim"
            name="name"
            onChange={handleUpdateChange}
            value={updateAnimal.name}
          />
          <input
            type="text"
            placeholder="Cinsi"
            name="species"
            onChange={handleUpdateChange}
            value={updateAnimal.species}
          />
          <input
            type="text"
            placeholder="Kısır Mı?"
            name="breed"
            onChange={handleUpdateChange}
            value={updateAnimal.breed}
          />
          <input
            type="text"
            placeholder="Cinsiyet"
            name="gender"
            onChange={handleUpdateChange}
            value={updateAnimal.gender}
          />
          <input
            type="text"
            placeholder="Renk"
            name="colour"
            onChange={handleUpdateChange}
            value={updateAnimal.colour}
          />
          <input
            type="date"
            name="date"
            onChange={handleUpdateChange}
            value={updateAnimal.date}
          />
          <select
            value={updateAnimal.customer.id}
            name="customer"
            onChange={handleUpdateChange}
          >
            <option value="" disabled={true} selected={true}>
              Hayvan Sahibi Seçiniz
            </option>
            {customer.map((customers) => {
              return <option value={customers.id}>{customers.name}</option>;
            })}
          </select>
          <button onClick={handleUpdate}>Güncelle</button>
        </div>
      </div>
      <Modal
        isOpen={isErrorModalOpen}
        onClose={handleCloseErrorModal}
        title="Error"
      >
        <p>{error}</p>
      </Modal>
    </div>
  );
}

export default Animal;
