import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './DisplayDetails.css';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

const DisplayDetails = () => {
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

  return (
    <div className="details-container">

      <div className="header-buttons">
        <Link to="/addEmployee">
          <button className="nav-button">Add Employee</button>
        </Link>
        <div className="right-buttons">
          <Link to="/manageEmployee">
            <button className="nav-button">Manage Employee</button>
          </Link>
          <Link to="/manageSalary">
            <button className="nav-button">Manage Salary</button>
          </Link>
        </div>
      </div>

      <h1>Employee and Salary Details</h1>

      <table className="employee-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Role</th>
            <th>Address</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Basic Salary</th>
            <th>Total Salary</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {employees.map(emp => (
            <tr key={emp._id}>
              <td>{emp.empName}</td>
              <td>{emp.empRole}</td>
              <td>{emp.empAddress}</td>
              <td>{emp.empEmail}</td>
              <td>{emp.empPhone}</td>
              <td>{emp.empBasicSalary}</td>
              <td>{emp.empTotalSalary}</td>
              <td>
                <button className="delete-button" onClick={() => handleDelete(emp._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DisplayDetails;
