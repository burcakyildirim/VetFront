import { useEffect, useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import UpdateIcon from "@mui/icons-material/Update";
import Modal from "../Modal/Modal";
import {
  getVaccines,
  deleteVaccines,
  createVaccines,
  updateVaccinesAPI,
} from "../../API/vaccine";
import "./Vaccine.css";
import { getAnimals } from "../../API/animal";
import { getReports } from "../../API/report";
import { getFinishDate } from "../../API/vaccine";
import { getName } from "../../API/vaccine";

function Vaccine() {
  const [vaccine, setVaccine] = useState([]);
  const [animal, setAnimal] = useState([]);
  const [report, setReport] = useState([]);
  const [reload, setReload] = useState(true);
  const [initialVaccineList, setInitialVaccineList] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [animalName, setAnimalName] = useState("");
  const [newVaccine, setNewVaccine] = useState({
    name: "",
    code: "",
    startDate: "",
    finishDate: "",
    animal: "",
    report: "",
  });
  const [updateVaccine, setUpdateVaccine] = useState({
    name: "",
    code: "",
    startDate: "",
    finishDate: "",
    animal: "",
    report: "",
  });

  const [error, setError] = useState(null); // State to store error message
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);

  useEffect(() => {
    getVaccines().then((data) => {
      setVaccine(data);
      setInitialVaccineList(data);
    });
    getAnimals().then((data) => {
      setAnimal(data);
    });
    getReports().then((data) => {
      setReport(data);
    });
    setReload(false);
  }, [reload]);

  const handleDelete = (id) => {
    deleteVaccines(id)
      .then(() => {
        setReload(true);
      })
      .catch((err) => handleOperationError(err.message));
  };

  const handleIdSearch = () => {
    getName(animalName)
      .then((data) => {
        setVaccine(data);
      })
      .catch((err) => handleOperationError(err.message));
  };

  const handleDateSearch = () => {
    getFinishDate(startDate, endDate)
      .then((data) => {
        setVaccine(data);
      })
      .catch((err) => handleOperationError(err.message));
  };

  const handleUpdateBtn = (vac) => {
    setUpdateVaccine({
      name: vac.name,
      code: vac.code,
      startDate: vac.startDate,
      finishDate: vac.finishDate,
      animal: vac.animal,
      report: vac.report,
      id: vac.id,
    });
  };

  const handleNewVaccine = (event) => {
    if (event.target.name === "animal") {
      setNewVaccine({
        ...newVaccine,
        animal: {
          id: event.target.value,
        },
      });
    } else if (event.target.name === "report") {
      setNewVaccine({
        ...newVaccine,
        report: {
          id: event.target.value,
        },
      });
    } else {
      setNewVaccine({
        ...newVaccine,
        [event.target.name]: event.target.value,
      });
    }
  };

  const handleCreate = () => {
    createVaccines(newVaccine)
      .then(() => {
        setReload(true);
        setNewVaccine({
          name: "",
          code: "",
          startDate: "",
          finishDate: "",
          animal: {
            id: "",
          },
          report: {
            id: "",
          },
        });
      })
      .catch((err) => handleOperationError(err.message));
  };

  const handleUpdateChange = (event) => {
    if (event.target.name === "animal") {
      setUpdateVaccine({
        ...updateVaccine,
        animal: {
          id: event.target.value,
        },
      });
    } else if (event.target.name === "report") {
      setUpdateVaccine({
        ...updateVaccine,
        report: {
          id: event.target.value,
        },
      });
    } else {
      setUpdateVaccine({
        ...updateVaccine,
        [event.target.name]: event.target.value,
      });
    }
  };

  const handleUpdate = () => {
    updateVaccinesAPI(updateVaccine)
      .then(() => {
        setReload(true);
        setUpdateVaccine({
          name: "",
          code: "",
          startDate: "",
          finishDate: "",
          animal: {
            id: "",
          },
          report: {
            id: "",
          },
        });
      })
      .catch((err) => handleOperationError(err.message));
  };

  const handleShowAll = () => {
    setVaccine(initialVaccineList);
    setAnimalName("");
    setStartDate("");
    setEndDate("");
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
      <div className="vaccine-search">
        <div className="showAll">
          <button onClick={handleShowAll}>Tümünü Göster</button>
          <h1>Aşılar</h1>
        </div>
        <div className="vacsearch-container">
          <input
            type="text"
            placeholder="Hayvan Adı Giriniz"
            value={animalName}
            onChange={(e) => setAnimalName(e.target.value)}
          />
          <button onClick={handleIdSearch} className="search-button">
            Ara
          </button>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
          <button onClick={handleDateSearch} className="search-button">
            Filtrele
          </button>
        </div>
      </div>

      <h2>Aşı Listesi</h2>
      <div className="table-container">
        <table className="table">
          <thead>
            <tr>
              <th>Aşı İsmi</th>
              <th>Aşı Kodu</th>
              <th>Aşı Başlangıç Tarihi</th>
              <th>Aşı Bitiş Tarihi</th>
              <th>Hayvan</th>
              <th>Hayvan Id</th>
              <th>Rapor</th>
              <th>İşlemler</th>
            </tr>
          </thead>

          <tbody>
            {vaccine.map((vaccines) => (
              <tr key={vaccines.id}>
                <td>{vaccines.name}</td>
                <td>{vaccines.code}</td>
                <td>{vaccines.startDate}</td>
                <td>{vaccines.finishDate}</td>
                <td>{vaccines.animal.name}</td>
                <td>{vaccines.animal.id}</td>
                <td>{vaccines.report.title}</td>
                <div className="icon-container">
                  <DeleteIcon
                    onClick={() => handleDelete(vaccines.id)}
                    style={{ color: "#850E35", marginRight: "8px" }}
                  />
                  <UpdateIcon
                    onClick={() => handleUpdateBtn(vaccines)}
                    style={{ color: "#850E35" }}
                  />
                </div>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="operations">
        <div className="addvaccine">
          <h2>Aşı Ekleme</h2>
          <input
            type="text"
            placeholder="Aşı İsmi"
            name="name"
            value={newVaccine.name}
            onChange={handleNewVaccine}
          />
          <input
            type="text"
            placeholder="Aşı Kodu"
            name="code"
            value={newVaccine.code}
            onChange={handleNewVaccine}
          />
          <input
            type="date"
            placeholder="startDate"
            name="startDate"
            value={newVaccine.startDate}
            onChange={handleNewVaccine}
          />
          <input
            type="date"
            placeholder="finishDate"
            name="finishDate"
            value={newVaccine.finishDate}
            onChange={handleNewVaccine}
          />
          <select
            value={newVaccine.animal.id}
            name="animal"
            onChange={handleNewVaccine}
          >
            <option value="" disabled={true} selected={true}>
              Hayvan Seçiniz
            </option>
            {animal.map((animals) => {
              return <option value={animals.id}>{animals.name}</option>;
            })}
          </select>
          <select
            value={newVaccine.report.id}
            name="report"
            onChange={handleNewVaccine}
          >
            <option value="" disabled={true} selected={true}>
              Rapor Seçiniz
            </option>
            {report.map((reports) => {
              return <option value={reports.id}>{reports.title}</option>;
            })}
          </select>
          <button onClick={handleCreate}>Ekle</button>
        </div>

        <div className="updatevaccines">
          <h2>Aşı Güncelleme</h2>
          <input
            type="text"
            placeholder="Aşı İsmi"
            name="name"
            onChange={handleUpdateChange}
            value={updateVaccine.name}
          />
          <input
            type="text"
            placeholder="Aşı Kodu"
            name="code"
            onChange={handleUpdateChange}
            value={updateVaccine.code}
          />
          <input
            type="date"
            placeholder="startDate"
            name="startDate"
            onChange={handleUpdateChange}
            value={updateVaccine.startDate}
          />
          <input
            type="date"
            placeholder="finishDate"
            name="finishDate"
            onChange={handleUpdateChange}
            value={updateVaccine.finishDate}
          />
          <select
            value={updateVaccine.animal.id}
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
            value={updateVaccine.report.id}
            name="report"
            onChange={handleUpdateChange}
          >
            <option value="" disabled={true} selected={true}>
              Rapor Seçiniz
            </option>
            {report.map((reports) => {
              return <option value={reports.id}>{reports.title}</option>;
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

export default Vaccine;
