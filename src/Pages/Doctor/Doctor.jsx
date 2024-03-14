import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import UpdateIcon from "@mui/icons-material/Update";
import Modal from "../Modal/Modal";
import {
  getDoctors,
  deleteDoctors,
  createDoctors,
  updateDoctorsAPI,
} from "../../API/doctor";
import "./Doctor.css";

function Doctor() {
  const [doctor, setDoctor] = useState([]);
  const [reload, setReload] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [updateDoctor, setUpdateDoctor] = useState({
    name: "",
    mail: "",
    address: "",
    city: "",
    phone: "",
  });
  const [newDoctor, setNewDoctor] = useState({
    name: "",
    mail: "",
    address: "",
    city: "",
    phone: "",
  });

  const [error, setError] = useState(null); // State to store error message
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);

  useEffect(() => {
    getDoctors().then((data) => {
      setDoctor(data);
      console.log(data);
    });
    setReload(false);
  }, [reload]);

  const handleDelete = (id) => {
    deleteDoctors(id)
      .then(() => {
        setReload(true);
      })
      .catch((err) => handleOperationError(err.message));
  };

  const handleNewDoctor = (event) => {
    setNewDoctor({
      ...newDoctor,
      [event.target.name]: event.target.value,
    });
  };

  const handleSearch = () => {
    if (searchTerm.trim() === "") {
      setSearchResults([]);
    } else {
      const results = doctor.filter((doctors) =>
        doctors.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setSearchResults(results);
    }
  };

  const handleCreate = () => {
    createDoctors(newDoctor)
      .then(() => {
        setReload(true);
        setNewDoctor({
          name: "",
          mail: "",
          address: "",
          city: "",
          phone: "",
        });
      })
      .catch((err) => handleOperationError(err.message));
  };
  const handleUpdateChange = (event) => {
    setUpdateDoctor({
      ...updateDoctor,
      [event.target.name]: event.target.value,
    });
  };
  const handleUpdateBtn = (doc) => {
    setUpdateDoctor({
      name: doc.name,
      mail: doc.mail,
      address: doc.address,
      city: doc.city,
      phone: doc.phone,
      id: doc.id,
    });
  };

  const handleUpdate = () => {
    updateDoctorsAPI(updateDoctor)
      .then(() => {
        setReload(true);
        setUpdateDoctor({
          name: "",
          mail: "",
          address: "",
          city: "",
          phone: "",
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
      <div className="doctor-search">
      <h1>Doktor Yönetimi</h1>
      <div className="docsearch-container">
        <input
          type="text"
          placeholder="Doktor Ara..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
        <button onClick={handleSearch} className="search-button">
          Ara
        </button>
      </div>
      </div>
      <h2>Doktor Listesi</h2>
      <div className="table-container">
        <table className="table">
          <thead>
            <tr>
              <th>Doktor İsmi</th>
              <th>Doktor Mail</th>
              <th>Doktor Adres</th>
              <th>Doktor Şehir</th>
              <th>Tel. No</th>
              <th>İşlemler</th>
            </tr>
          </thead>

          <tbody>
            {searchResults.length > 0
              ? searchResults.map((doctors) => (
                  <tr key={doctors.id}>
                    <td>{doctors.name}</td>
                    <td>{doctors.mail}</td>
                    <td>{doctors.address}</td>
                    <td>{doctors.city}</td>
                    <td>{doctors.phone}</td>
                    <div className="icon-container">
                      <DeleteIcon
                        onClick={() => handleDelete(doctors.id)}
                        style={{ color: "#850E35", marginRight: "8px" }}
                      />
                      <UpdateIcon
                        onClick={() => handleUpdateBtn(doctors)}
                        style={{ color: "#850E35" }}
                      />
                    </div>
                  </tr>
                ))
              : doctor.map((doctors) => (
                  <tr key={doctors.id}>
                    <td>{doctors.name}</td>
                    <td>{doctors.mail}</td>
                    <td>{doctors.address}</td>
                    <td>{doctors.city}</td>
                    <td>{doctors.phone}</td>
                    <div className="icon-container">
                      <DeleteIcon
                        onClick={() => handleDelete(doctors.id)}
                        style={{ color: "#850E35", marginRight: "8px" }}
                      />
                      <UpdateIcon
                        onClick={() => handleUpdateBtn(doctors)}
                        style={{ color: "#850E35" }}
                      />
                    </div>
                  </tr>
                ))}
          </tbody>
        </table>
      </div>
      <div className="operations">
        <div className="addoctor">
          <h2>Doktor Ekleme</h2>
          <input
            type="text"
            placeholder="İsim-Soy ismi"
            name="name"
            value={newDoctor.name}
            onChange={handleNewDoctor}
          />
          <input
            type="text"
            placeholder="Mail"
            name="mail"
            value={newDoctor.mail}
            onChange={handleNewDoctor}
          />
          <input
            type="text"
            placeholder="Adres"
            name="address"
            value={newDoctor.address}
            onChange={handleNewDoctor}
          />
          <input
            type="text"
            placeholder="Şehir"
            name="city"
            value={newDoctor.city}
            onChange={handleNewDoctor}
          />
          <input
            type="text"
            placeholder="Tel. No"
            name="phone"
            value={newDoctor.phone}
            onChange={handleNewDoctor}
          />
          <button onClick={handleCreate}>Ekle</button>
        </div>
        <div className="updateDoctor">
          <h2>Doktor Güncelleme</h2>
          <input
            type="text"
            placeholder="İsim-Soy ismi"
            name="name"
            onChange={handleUpdateChange}
            value={updateDoctor.name}
          />
          <input
            type="text"
            placeholder="Mail"
            name="mail"
            onChange={handleUpdateChange}
            value={updateDoctor.mail}
          />
          <input
            type="text"
            placeholder="Adres"
            name="address"
            onChange={handleUpdateChange}
            value={updateDoctor.address}
          />
          <input
            type="text"
            placeholder="Şehir"
            name="city"
            onChange={handleUpdateChange}
            value={updateDoctor.city}
          />
          <input
            type="text"
            placeholder="Tel. No"
            name="phone"
            onChange={handleUpdateChange}
            value={updateDoctor.phone}
          />
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
      <Outlet />
    </div>
  );
}

export default Doctor;
