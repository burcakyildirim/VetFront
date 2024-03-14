import React, { useEffect, useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import UpdateIcon from "@mui/icons-material/Update";
import Modal from "../Modal/Modal";

import {
  getAvailableDates,
  deleteAvailableDates,
  createAvailableDates,
  updateAvailableDatesAPI,
} from "../../API/availabledate";
import "./AvailableDate.css";
import { getDoctors } from "../../API/doctor";

function AvailableDate() {
  const [availableDate, setAvailableDate] = useState([]);
  const [doctor, setDoctor] = useState([]);
  const [reload, setReload] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchDate, setSearchDate] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [newAvailableDate, setNewAvailableDate] = useState({
    date: "",
    doctor: "",
  });

  const [updateAvailableDate, setUpdateAvailableDate] = useState({
    date: "",
    doctor: "",
  });

  const [error, setError] = useState(null); // State to store error message
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);

  useEffect(() => {
    getAvailableDates().then((data) => {
      setAvailableDate(data);
      console.log(data);
    });
    getDoctors().then((data) => {
      setDoctor(data);
    });
    setReload(false);
  }, [reload]);

  const handleDelete = (id) => {
    deleteAvailableDates(id)
      .then(() => {
        setReload(true);
      })
      .catch((err) => handleOperationError(err.message));
  };

  const handleSearch = () => {
    if (searchTerm.trim() === "" && searchDate.trim() === "") {
      setSearchResults([]);
    } else {
      const results = availableDate.filter(
        (availableDates) =>
          availableDates.doctor.name
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) &&
          availableDates.date.includes(searchDate)
      );
      setSearchResults(results);
    }
  };

  const handleUpdateBtn = (ava) => {
    setUpdateAvailableDate({
      date: ava.date,
      doctor: ava.doctor,
      id: ava.id,
    });
  };

  const handleNewAvailableDate = (event) => {
    if (event.target.name === "doctor") {
      setNewAvailableDate({
        ...newAvailableDate,
        doctor: {
          id: event.target.value,
        },
      });
    } else {
      setNewAvailableDate({
        ...newAvailableDate,
        [event.target.name]: event.target.value,
      });
    }
  };

  const handleCreate = () => {
    createAvailableDates(newAvailableDate)
      .then(() => {
        setReload(true);
        setNewAvailableDate({
          date: "",
          doctor: {
            id: "",
          },
        });
      })
      .catch((err) => handleOperationError(err.message));
  };

  const handleUpdateChange = (event) => {
    if (event.target.name === "doctor") {
      setUpdateAvailableDate({
        ...updateAvailableDate,
        doctor: {
          id: event.target.value,
        },
      });
    } else {
      setUpdateAvailableDate({
        ...updateAvailableDate,
        [event.target.name]: event.target.value,
      });
    }
  };

  const handleUpdate = () => {
    updateAvailableDatesAPI(updateAvailableDate)
      .then(() => {
        setReload(true);
        setUpdateAvailableDate({
          date: "",
          doctor: {
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
      <div className="available-search">
        <h1>Uygun Günler Yönetimi</h1>
        <div className="avasearch-container">
          <input
            type="text"
            placeholder="Doktor Ara"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          <input
            type="date"
            value={searchDate}
            onChange={(e) => setSearchDate(e.target.value)}
            className="search-input"
          />
          <button onClick={handleSearch} className="search-button">
            Ara
          </button>
        </div>
      </div>
      <h2>Uygun Günler Listesi</h2>
      <div className="table-container">
        <table className="table">
          <thead>
            <tr>
              <th>Uygun Günlerin Tarihi</th>
              <th>Doktor</th>
              <th>İşlemler</th>
            </tr>
          </thead>

          <tbody>
            {searchResults.length > 0
              ? searchResults.map((availableDates) => (
                  <tr key={availableDates.id}>
                    <td>{availableDates.date}</td>
                    <td>{availableDates.doctor.name}</td>
                    <div className="icon-container">
                      <DeleteIcon
                        onClick={() => handleDelete(availableDates.id)}
                        style={{ color: "#850E35", marginRight: "8px" }}
                      />
                      <UpdateIcon
                        onClick={() => handleUpdateBtn(availableDates)}
                        style={{ color: "#850E35" }}
                      />
                    </div>
                  </tr>
                ))
              : availableDate.map((availableDates) => (
                  <tr key={availableDates.id}>
                    <td>{availableDates.date}</td>
                    <td>{availableDates.doctor.name}</td>
                    <div className="icon-container">
                      <DeleteIcon
                        onClick={() => handleDelete(availableDates.id)}
                        style={{ color: "#850E35", marginRight: "8px" }}
                      />
                      <UpdateIcon
                        onClick={() => handleUpdateBtn(availableDates)}
                        style={{ color: "#850E35" }}
                      />
                    </div>
                  </tr>
                ))}
          </tbody>
        </table>
      </div>
      <div className="operations">
        <div className="addavailabledate">
          <h2>Uygun Gün Ekleme</h2>
          <input
            type="date"
            name="date"
            value={newAvailableDate.date}
            onChange={handleNewAvailableDate}
          />
          <select
            value={newAvailableDate.doctor.id}
            name="doctor"
            onChange={handleNewAvailableDate}
          >
            <option value="" disabled={true} selected={true}>
              Doktor Seçiniz
            </option>
            {doctor.map((doctors) => {
              return <option value={doctors.id}>{doctors.name}</option>;
            })}
          </select>
          <button onClick={handleCreate}>Ekle</button>
        </div>

        <div className="updateavailabledate">
          <h2>Uygun Gün Güncelleme</h2>
          <input
            type="date"
            name="date"
            onChange={handleUpdateChange}
            value={updateAvailableDate.date}
          />
          <select
            value={updateAvailableDate.doctor.id}
            name="doctor"
            onChange={handleUpdateChange}
          >
            <option value="" disabled={true} selected={true}>
              Doktor Seçiniz
            </option>
            {doctor.map((doctors) => {
              return <option value={doctors.id}>{doctors.name}</option>;
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

export default AvailableDate;
