import React, { useEffect, useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import UpdateIcon from "@mui/icons-material/Update";
import {
  getCustomers,
  deleteCustomers,
  createCustomers,
  updateCustomersAPI,
} from "../../API/customer";
import "./Customer.css";

function Customer() {
  const [customer, setCustomer] = useState([]);
  const [reload, setReload] = useState(true);
  const [newCustomer, setNewCustomer] = useState({
    name: "",
    mail: "",
    address: "",
    city: "",
    phone: "",
  });

  const [updateCustomer, setUpdateCustomer] = useState({
    name: "",
    mail: "",
    address: "",
    city: "",
    phone: "",
  });

  useEffect(() => {
    getCustomers().then((data) => {
      setCustomer(data);
      console.log(data);
    });
    setReload(false);
  }, [reload]);

  const handleDelete = (id) => {
    deleteCustomers(id).then(() => {
      setReload(true);
    });
  };

  const handleNewCustomer = (event) => {
    setNewCustomer({
      ...newCustomer,
      [event.target.name]: event.target.value,
    });
  };

  const handleCreate = () => {
    createCustomers(newCustomer).then(() => {
      setReload(true);
    });
    setNewCustomer({
      name: "",
      mail: "",
      address: "",
      city: "",
      phone: "",
    });
  };

  const handleUpdateChange = (event) => {
    setUpdateCustomer({
      ...updateCustomer,
      [event.target.name]: event.target.value,
    });
  };

  const handleUpdate = () => {
    updateCustomersAPI(updateCustomer).then(() => {
      setReload(true);
    });
    setUpdateCustomer({
      name: "",
      mail: "",
      address: "",
      city: "",
      phone: "",
    });
  };

  const handleUpdateBtn = (cus) => {
    setUpdateCustomer({
      name: cus.name,
      mail: cus.mail,
      address: cus.address,
      city: cus.city,
      phone: cus.phone,
      id: cus.id,
    });
  };
  return (
    <div>
      <h1>Müşteri Yönetimi</h1>
      <h2>Müşteri Listesi</h2>
      <div className="table-container">
        <table className="table">
          <thead>
            <tr>
              <th>Müşteri İsmi</th>
              <th>Müşteri Mail</th>
              <th>Müşteri Adres</th>
              <th>Müşteri Şehir</th>
              <th>Tel. No</th>
              <th>İşlemler</th>
            </tr>
          </thead>

          <tbody>
            {customer.map((customers) => (
              <tr key={customers.id}>
                <td>{customers.name}</td>
                <td>{customers.mail}</td>
                <td>{customers.address}</td>
                <td>{customers.city}</td>
                <td>{customers.phone}</td>
                <div className="icon-container">
                  <DeleteIcon
                    onClick={() => handleDelete(customers.id)}
                    style={{ color: "#850E35", marginRight: "8px" }}
                  />
                  <UpdateIcon
                    onClick={() => handleUpdateBtn(customers)}
                    style={{ color: "#850E35" }}
                  />
                </div>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="operations">
        <div className="addcustomer">
          <h2>Müşteri Ekleme</h2>
          <input
            type="text"
            placeholder="Name"
            name="name"
            value={newCustomer.name}
            onChange={handleNewCustomer}
          />
          <input
            type="text"
            placeholder="mail"
            name="mail"
            value={newCustomer.mail}
            onChange={handleNewCustomer}
          />
          <input
            type="text"
            placeholder="address"
            name="address"
            value={newCustomer.address}
            onChange={handleNewCustomer}
          />
          <input
            type="text"
            placeholder="city"
            name="city"
            value={newCustomer.city}
            onChange={handleNewCustomer}
          />
          <input
            type="text"
            placeholder="phone"
            name="phone"
            value={newCustomer.phone}
            onChange={handleNewCustomer}
          />
          <button onClick={handleCreate}>Create</button>
        </div>

        <div className="updateCustomer">
          <h2>Müşteri Güncelleme</h2>
          <input
            type="text"
            placeholder="Name"
            name="name"
            onChange={handleUpdateChange}
            value={updateCustomer.name}
          />
          <input
            type="text"
            placeholder="mail"
            name="mail"
            onChange={handleUpdateChange}
            value={updateCustomer.mail}
          />
          <input
            type="text"
            placeholder="address"
            name="address"
            onChange={handleUpdateChange}
            value={updateCustomer.address}
          />
          <input
            type="text"
            placeholder="city"
            name="city"
            onChange={handleUpdateChange}
            value={updateCustomer.city}
          />
          <input
            type="text"
            placeholder="phone"
            name="phone"
            onChange={handleUpdateChange}
            value={updateCustomer.phone}
          />
          <button onClick={handleUpdate}>Update</button>
        </div>
      </div>
    </div>
  );
}

export default Customer;
