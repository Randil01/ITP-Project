import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './DisplayDetails.css'; 

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
