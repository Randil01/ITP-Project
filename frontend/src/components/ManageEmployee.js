import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ManageEmployee.css';
import { Link } from 'react-router-dom';

const ManageEmployee = () => {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
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
    alert(`Update functionality for employee ID: ${id} will be implemented.`);
  };

  return (
    <div className="manage-employee-container">
      {/* Header with Go to Main button */}
      <div className="header">
        <h1>Manage Employees</h1>
        <Link to="/">
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
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageEmployee;
