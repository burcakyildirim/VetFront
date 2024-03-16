import React, { useEffect, useState } from "react";
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
  const [report, setReport] = useState([]);
  const [appointment, setAppointment] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [reload, setReload] = useState(true);
  const [initialReportList, setInitialReportList] = useState([]);

  const [newReport, setNewReport] = useState({
    title: "",
    diagnosis: "",
    price: "",
    appointment: "",
  });
  const [updateReport, setUpdateReport] = useState({
    title: "",
    diagnosis: "",
    price: "",
    appointment: "",
  });
  const [error, setError] = useState(null);
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
    deleteReports(id)
      .then(() => {
        setReload(true);
      })
      .catch((err) => handleOperationError(err.message));
  };

  const handleSearch = () => {
    if (searchTerm.trim() === "") {
      setSearchResults([]);
    } else {
      const results = report.filter((reports) =>
        reports.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setSearchResults(results);
    }
  };

  const handleUpdateBtn = (rep) => {
    setUpdateReport({
      title: rep.title,
      diagnosis: rep.diagnosis,
      price: rep.price,
      appointment: rep.appointment,
      id: rep.id,
    });
  };

  const handleNewReport = (event) => {
    if (event.target.name === "appointment") {
      setNewReport({
        ...newReport,
        appointment: {
          id: event.target.value,
        },
      });
    } else {
      setNewReport({
        ...newReport,
        [event.target.name]: event.target.value,
      });
    }
  };

  const handleCreate = () => {
    createReports(newReport)
      .then(() => {
        setReload(true);
        setNewReport({
          title: "",
          diagnosis: "",
          price: "",
          appointment: {
            id: "",
          },
        });
      })
      .catch((err) => handleOperationError(err.message));
  };

  const handleUpdateChange = (event) => {
    if (event.target.name === "appointment") {
      setUpdateReport({
        ...updateReport,
        appointment: {
          id: event.target.value,
        },
      });
    } else {
      setUpdateReport({
        ...updateReport,
        [event.target.name]: event.target.value,
      });
    }
  };

  const handleUpdate = () => {
    updateReportsAPI(updateReport)
      .then(() => {
        setReload(true);
        setUpdateReport({
          title: "",
          diagnosis: "",
          price: "",
          appointment: {
            id: "",
          },
        });
      })
      .catch((err) => handleOperationError(err.message));
  };

  const handleShowAll = () => {
    setSearchTerm("");
    setSearchResults([]);
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
      <div className="report-search">
        <h1>Rapor Yönetimi</h1>
        <div className="repsearch-container">
          <input
            type="text"
            placeholder="Rapor başlığı arayın"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          <button onClick={handleSearch} className="search-button">
            Filtrele
          </button>
          <button onClick={handleShowAll}>Tümünü Göster</button>
        </div>
      </div>
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
            {searchResults.length > 0
              ? searchResults.map((reports) => (
                  <tr key={reports.id}>
                    <td>{reports.title}</td>
                    <td>{reports.diagnosis}</td>
                    <td>{reports.price}</td>
                    <td>{reports.appointment.dateTime}</td>
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
                ))
              : report.map((reports) => (
                  <tr key={reports.id}>
                    <td>{reports.title}</td>
                    <td>{reports.diagnosis}</td>
                    <td>{reports.price}</td>
                    <td>{reports.appointment.dateTime}</td>
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
            placeholder="Başlık"
            name="title"
            value={newReport.title}
            onChange={handleNewReport}
          />
          <input
            type="text"
            placeholder="Tanı"
            name="diagnosis"
            value={newReport.diagnosis}
            onChange={handleNewReport}
          />
          <input
            type="text"
            inputmode="decimal"
            placeholder="Fiyat"
            name="price"
            value={newReport.price}
            onChange={handleNewReport}
          />
          <select
            value={newReport.appointment.id}
            name="appointment"
            onChange={handleNewReport}
          >
            <option value="" disabled={true} selected={true}>
              Randevu Seçiniz
            </option>
            {appointment.map((appointments) => {
              return (
                <option value={appointments.id}>{appointments.dateTime}</option>
              );
            })}
          </select>
          <button onClick={handleCreate}>Ekle</button>
        </div>

        <div className="updatereport">
          <h2>Rapor Güncelleme</h2>
          <input
            type="text"
            placeholder="Başlık"
            name="title"
            onChange={handleUpdateChange}
            value={updateReport.title}
          />
          <input
            type="text"
            placeholder="Tanı"
            name="diagnosis"
            onChange={handleUpdateChange}
            value={updateReport.diagnosis}
          />
          <input
            type="text"
            inputmode="decimal"
            placeholder="Fiyat"
            name="price"
            value={updateReport.price}
            onChange={handleUpdateChange}
          />
          <select
            value={updateReport.appointment.id}
            name="appointment"
            onChange={handleUpdateChange}
          >
            <option value="" disabled={true} selected={true}>
              Randevu Seçiniz
            </option>
            {appointment.map((appointments) => {
              return (
                <option value={appointments.id}>{appointments.dateTime}</option>
              );
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

export default Report;
