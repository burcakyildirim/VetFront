import  { useEffect, useState } from "react";
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
import { getByAnimalDate } from "../../API/appointment";
import { getByDoctorDate } from "../../API/appointment"; 

function Appointment() {
  const [appointment, setAppointment] = useState([]);
  const [animal, setAnimal] = useState([]);
  const [doctor, setDoctor] = useState([]);
  const [reload, setReload] = useState(true);
  const [startDate, setStartDate] = useState("");
  const [animalId, setAnimalId] = useState("");
  const [doctorId, setDoctorId] = useState("");
  const [endDate, setEndDate] = useState("");
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

  const handleAnimalSearch = () => {
    getByAnimalDate(startDate, endDate, animalId).then((data) => {
      setAppointment(data);
    })
  };
  const handleDoctorSearch = () => {
    getByDoctorDate(startDate, endDate, doctorId).then((data) => {
      setAppointment(data);
    } )
  }

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
          animal: {
            id: "",
          },
          doctor: {
            id: "",
          },
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
          animal: {
            id: "",
          },
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
      <div className="appointment-search">
        <h1>Randevu Yönetimi</h1>
        <div className="appsearch-container">
          <input
            type="number"
            placeholder="Search by animal id..."
            value={animalId}
            onChange={(e) => setAnimalId(e.target.value)}
          />
          <input
            type="datetime-local"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
          <input
            type="datetime-local"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
                    <button onClick={handleAnimalSearch} className="search-button">
            Filtrele
          </button>
        </div>
      </div>
      <div className="appointment-search">
      <h2>Randevu Listesi</h2>
      <div className="appsearch-container">
      <input
            type="number"
            placeholder="Search by doctor id..."
            value={doctorId}
            onChange={(e) => setDoctorId(e.target.value)}
          />
          <input
            type="datetime-local"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
          <input
            type="datetime-local"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
          <button onClick={handleDoctorSearch} className="search-button">
            Filtrele
          </button>
          </div>
          </div>
      <div className="table-container">
        <table className="table">
          <thead>
            <tr>
              <th>Randevu Zamanı</th>
              <th>Hayvan</th>
              <th>Hayvan ID</th>
              <th>Doktor</th>
              <th>Doktor ID</th>
              <th>İşlemler</th>
            </tr>
          </thead>

          <tbody>
            { appointment.map((appointments) => (
                  <tr key={appointments.id}>
                    <td>{appointments.dateTime}</td>
                    <td>{appointments.animal.name}</td>
                    <td>{appointments.animal.id}</td>
                    <td>{appointments.doctor.name}</td>
                    <td>{appointments.doctor.id}</td>
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
            name="dateTime"
            value={newAppointment.dateTime}
            onChange={handleNewAppointment}
          />
          <select
            value={newAppointment.animal.id}
            name="animal"
            onChange={handleNewAppointment}
          >
            <option value="" disabled={true} selected={true}>
              hayvan seciniz
            </option>
            {animal.map((animals) => {
              return <option value={animals.id}>{animals.name}</option>;
            })}
          </select>
          <select
            value={newAppointment.doctor.id}
            name="doctor"
            onChange={handleNewAppointment}
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

        <div className="updateappointment">
          <h2>Randevu Güncelleme</h2>
          <input
            type="datetime-local"
            name="dateTime"
            onChange={handleUpdateChange}
            value={updateAppointment.dateTime}
          />
          <select
            value={updateAppointment.animal.id}
            name="animal"
            onChange={handleUpdateChange}
          >
            <option value="" disabled={true} selected={true}>
              Hayvan Seçiniz
            </option>
            {animal.map((animals) => {
              return <option value={animals.id}>{animals.name}</option>;
            })}
          </select>
          <select
            value={updateAppointment.doctor.id}
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
