import React, { useEffect, useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import UpdateIcon from "@mui/icons-material/Update";
import Modal from "../Modal/Modal";
import {
  getAppointments,
  deleteAppointments,
  createAppointments,
  updateAppointmentsAPI,
} from "../../API/appointment";
import "./Appointment.css";
import { getAnimals } from "../../API/animal";
import { getDoctors } from "../../API/doctor";

function Appointment() {
  const [appointment, setAppointment] = useState([]);
  const [animal, setAnimal] = useState([]);
  const [doctor, setDoctor] = useState([]);
  const [reload, setReload] = useState(true);
  const [newAppointment, setNewAppointment] = useState({
    dateTime: "",
    animal: "",
    doctor: "",
  });
  const [updateAppointment, setUpdateAppointment] = useState({
    dateTime: "",
    animal: "",
    doctor: "",
  });

  const [error, setError] = useState(null); // State to store error message
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);

  useEffect(() => {
    getAppointments().then((data) => {
      setAppointment(data);
    });
    getAnimals().then((data) => {
      setAnimal(data);
    });
    getDoctors().then((data) => {
      setDoctor(data);
    });
    setReload(false);
  }, [reload]);

  const handleDelete = (id) => {
    deleteAppointments(id)
      .then(() => {
        setReload(true);
      })
      .catch((err) => handleOperationError(err.message));
  };

  const handleUpdateBtn = (app) => {
    setUpdateAppointment({
      id: app.id,
      dateTime: app.dateTime,
      animal: app.animal,
      doctor: app.doctor,
    });
  };

  const handleNewAppointment = (event) => {
    if (event.target.name === "animal") {
      setNewAppointment({
        ...newAppointment,
        animal: {
          id: event.target.value,
        },
      });
    } else if (event.target.name === "doctor") {
      setNewAppointment({
        ...newAppointment,
        doctor: {
          id: event.target.value,
        },
      });
    } else {
      setNewAppointment({
        ...newAppointment,
        [event.target.name]: event.target.value,
      });
    }
  };

  const handleCreate = () => {
    createAppointments(newAppointment)
      .then(() => {
        setReload(true);
        setNewAppointment({
          dateTime: "",
          animal: "",
          doctor: "",
        });
      })
      .catch((err) => handleOperationError(err.message));
  };

  const handleUpdateChange = (event) => {
    if (event.target.name === "animal") {
      setUpdateAppointment({
        ...updateAppointment,
        animal: {
          id: event.target.value,
        },
      });
    } else if (event.target.name === "doctor") {
      setUpdateAppointment({
        ...updateAppointment,
        doctor: {
          id: event.target.value,
        },
      });
    } else {
      setUpdateAppointment({
        ...updateAppointment,
        [event.target.name]: event.target.value,
      });
    }
  };

  const handleUpdate = () => {
    updateAppointmentsAPI(updateAppointment)
      .then(() => {
        setReload(true);
        setUpdateAppointment({
          dateTime: "",
          animal: "",
          doctor: "",
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
      <h1>Randevu Yönetimi</h1>
      <h2>Randevu Listesi</h2>
      <div className="table-container">
        <table className="table">
          <thead>
            <tr>
              <th>Randevu Zamanı</th>
              <th>Hayvan</th>
              <th>Doktor</th>
              <th>İşlemler</th>
            </tr>
          </thead>

          <tbody>
            {appointment.map((appointments) => (
              <tr key={appointments.id}>
                <td>{appointments.dateTime}</td>
                <td>{appointments.animal.name}</td>
                <td>{appointments.doctor.name}</td>
                <div className="icon-container">
                  <DeleteIcon
                    onClick={() => handleDelete(appointments.id)}
                    style={{ color: "#850E35", marginRight: "8px" }}
                  />
                  <UpdateIcon
                    onClick={() => handleUpdateBtn(appointments)}
                    style={{ color: "#850E35" }}
                  />
                </div>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="operations">
        <div className="addappointment">
          <h2>Randevu Ekleme</h2>
          <input
            type="datetime-local"
            placeholder="dateTime"
            name="dateTime"
            value={newAppointment.dateTime}
            onChange={handleNewAppointment}
          />
          <select name="animal" onChange={handleNewAppointment}>
            <option value="" disabled={true} selected={true}>
              hayvan seciniz
            </option>
            {animal.map((animals) => {
              return <option value={animals.id}>{animals.name}</option>;
            })}
          </select>
          <select name="doctor" onChange={handleNewAppointment}>
            <option value="" disabled={true} selected={true}>
              doktor seciniz
            </option>
            {doctor.map((doctors) => {
              return <option value={doctors.id}>{doctors.name}</option>;
            })}
          </select>
          <button onClick={handleCreate}>Create</button>
        </div>

        <div className="updateappointment">
          <h2>Randevu Güncelleme</h2>
          <input
            type="datetime-local"
            placeholder="dateTime"
            name="dateTime"
            onChange={handleUpdateChange}
            value={updateAppointment.dateTime}
          />
          <select name="animal" onChange={handleUpdateChange}>
            <option value="" disabled={true} selected={true}>
              hayvan seciniz
            </option>
            {animal.map((animals) => {
              return <option value={animals.id}>{animals.name}</option>;
            })}
          </select>
          <select name="doctor" onChange={handleUpdateChange}>
            <option value="" disabled={true} selected={true}>
              doktor seciniz
            </option>
            {doctor.map((doctors) => {
              return <option value={doctors.id}>{doctors.name}</option>;
            })}
          </select>
          <button onClick={handleUpdate}>Update</button>
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

export default Appointment;
