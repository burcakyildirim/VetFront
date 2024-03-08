import React, { useEffect, useState } from 'react'
import DeleteIcon from "@mui/icons-material/Delete";
import UpdateIcon from "@mui/icons-material/Update";
import Modal from "../Modal/Modal";

import {
  getReports,
  deleteReports,
  createReports,
  updateReportsAPI,
} from "../../API/report";
import "./Report.css";
import { getAppointments } from "../../API/appointment";


function Report() {
  const [report,setReport] = useState([]);
  const [appointment, setAppointment] = useState([]);
  const [reload, setReload] = useState(true);
  const [newReport, setNewReport] = useState({
    title: "",
    diagnosis: "",
    price: "",
    appointment: "",
  })
  const [updateReport, setUpdateReport] = useState({
    title: "",
    diagnosis: "",
    price: "",
    appointment: "",
  })
  const [error, setError] = useState(null); // State to store error message
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);

  useEffect(() => {
    getReports().then((data) => {
      setReport(data);
    });
    getAppointments().then((data) => {
      setAppointment(data);
    });
    setReload(false);
  }, [reload]);

  const handleDelete = (id) => {
    deleteReports(id).then(() => {
      setReload(true);
    })
    .catch((err) => handleOperationError(err.message));
  }

  const handleUpdateBtn = (rep) => {
    setUpdateReport({
      title: rep.title,
      diagnosis: rep.diagnosis,
      price: rep.price,
      appointment: rep.appointment,
      id: rep.id,
    })
  }

  const handleNewReport = (event) => {
    if(event.target.name === "appointment") {
      setNewReport({
        ...newReport,
        appointment: {
          id: event.target.value,
        }
      })
    } else {
      setNewReport({
        ...newReport,
        [event.target.name]: event.target.value,
      })
    }
  }

  const handleCreate = () => {
    createReports(newReport).then(() => {
      setReload(true);
      setNewReport({
        title: "",
        diagnosis: "",
        price: "",
        appointment: "",
      })
    })
    .catch((err) => handleOperationError(err.message));
  }

  const handleUpdateChange = (event) => {
    if(event.target.name === "appointment") {
      setUpdateReport({
        ...updateReport,
        appointment: {
          id: event.target.value,
        }
      })
    } else {
      setUpdateReport({
        ...updateReport,
        [event.target.name]: event.target.value,
      })
    }
  }

  const handleUpdate = () => {
    updateReportsAPI(updateReport).then(() => {
      setReload(true);
      setUpdateReport({
        title: "",
        diagnosis: "",
        price: "",
        appointment: "",
      })
    })
    .catch((err) => handleOperationError(err.message));
  }

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
        <h1>Rapor Yönetimi</h1>
      <h2>Rapor Listesi</h2>
      <div className="table-container">
        <table className="table">
          <thead>
            <tr>
              <th>Rapor Başlığı</th>
              <th>Tanı</th>
              <th>Fiyat</th>
              <th>Randevu</th>
              <th>İşlemler</th>
            </tr>
          </thead>

          <tbody>
            {report.map((reports) => (
              <tr key={reports.id}>
                <td>{reports.title}</td>
                <td>{reports.diagnosis}</td>
                <td>{reports.price}</td>
                <td>{reports.appointment.id}</td>
                <div className="icon-container">
                  <DeleteIcon
                    onClick={() => handleDelete(reports.id)}
                    style={{ color: "#850E35", marginRight: "8px" }}
                  />
                  <UpdateIcon
                    onClick={() => handleUpdateBtn(reports)}
                    style={{ color: "#850E35" }}
                  />
                </div>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="operations">
        <div className="addreport">
          <h2>Rapor Ekleme</h2>
          <input
            type="text"
            placeholder="title"
            name="title"
            value={newReport.title}
            onChange={handleNewReport}
          />
          <input
            type="text"
            placeholder="diagnosis"
            name="diagnosis"
            value={newReport.diagnosis}
            onChange={handleNewReport}
          />
          <input
            type="number" step="1.00"
            placeholder="price"
            name="price"
            value={newReport.price}
            onChange={handleNewReport}
          />
          <select name="appointment" onChange={handleNewReport}>
            <option value="" disabled={true} selected={true}>
              randevu seciniz
            </option>
            {appointment.map((appointments) => {
              return <option value={appointments.id}>{appointments.dateTime}</option>;
            })}
          </select>
          <button onClick={handleCreate}>Create</button>
        </div>

        <div className="updatereport">
          <h2>Rapor Güncelleme</h2>
          <input
            type="text"
            placeholder="title"
            name="title"
            onChange={handleUpdateChange}
            value={updateReport.title}
          />
          <input
            type="text"
            placeholder="diagnosis"
            name="diagnosis"
            onChange={handleUpdateChange}
            value={updateReport.diagnosis}
          />
          <input
            type="number" step="1.00"
            placeholder="price"
            name="price"
            value={updateReport.price}
            onChange={handleUpdateChange}
          />
          <select name="appointment" onChange={handleUpdateChange}>
            <option value="" disabled={true} selected={true}>
              randevu seciniz
            </option>
            {appointment.map((appointments) => {
              return <option value={appointments.id}>{appointments.dateTime}</option>;
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
  )
}

export default Report