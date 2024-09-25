import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './ManageEmployee.css';
import UpdateEmployee from './UpdateEmployee';
import Header from "../header/header"

const ManageEmployee = () => {
  const [employees, setEmployees] = useState([]);
  const [editingId, setEditingId] = useState(null); 

  useEffect(() => {//to load data 
    axios.get('http://localhost:5000/employee/')
      .then(response => setEmployees(response.data))
      .catch(error => console.error(error)); 
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/employee/delete/${id}`);
      setEmployees(employees.filter(emp => emp._id !== id));
      alert('Employee deleted successfully');
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdate = (id) => {
    setEditingId(id);
  };

  const handleSave = (updatedEmployee) => {
    setEmployees(employees.map(emp => emp._id === editingId ? { ...emp, ...updatedEmployee } : emp));
    setEditingId(null);
  };

  const handleCancel = () => {
    setEditingId(null); 
  };

  return (
    <div>
    <Header/>
    <div className="manage-employee-container">
      <div className="header">
        <h1>Manage Employees</h1>
        <Link to="/employee">
          <button className="nav-button">Go to main</button>
        </Link>
      </div>

      <table className="employee-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Address</th>
            <th>Phone</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map(emp => (
            editingId === emp._id ? (
         
              <UpdateEmployee 
                key={emp._id}
                employee={emp}
                onSave={handleSave}
                onCancel={handleCancel}
              />
            ) : (
  
              <tr key={emp._id}>
                <td>{emp.empName}</td>
                <td>{emp.empAddress}</td>
                <td>{emp.empPhone}</td>
                <td>{emp.empEmail}</td>
                <td>
                  <button className="update-button" onClick={() => handleUpdate(emp._id)}>Update</button>
                  <button className="delete-button" onClick={() => handleDelete(emp._id)}>Delete</button>
                </td>
              </tr>
            )
          ))}
        </tbody>
      </table>
    </div>
    </div>
  );
};

export default ManageEmployee;
