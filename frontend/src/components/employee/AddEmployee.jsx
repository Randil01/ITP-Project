import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // For redirection
import './AddEmployee.css'; 

const AddEmployee = () => {
  const navigate = useNavigate(); 
  const [employee, setEmployee] = useState({
    empName: '',
    empAddress: '',
    empPhone: '',
    empEmail: '',
    empRole: 'assistant'
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setEmployee({
      ...employee,
      [e.target.name]: e.target.value
    });
  };

  const validatePhone = (phone) => {
    const phoneRegex = /^0\d{9}$/;
    return phoneRegex.test(phone);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

  
    if (!validatePhone(employee.empPhone)) {
      setError('Phone number must start with 0 and have 10 digits.');
      return;
    }

  
    if (!employee.empName || !employee.empAddress || !employee.empPhone || !employee.empEmail) {
      setError('All fields are required.');
      return;
    }

    try {
      await axios.post('http://localhost:5000/employee/add', employee);
      alert('Employee added successfully');
      navigate('/employee'); 
    } catch (error) {
      console.error(error);
      setError('Error adding employee.');
    }
  };

  return (
    <div className="form-container">
      <h2>Add New Employee</h2>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="empName"
          placeholder="Name"
          onChange={handleChange}
          value={employee.empName}
          required
        />
        <input
          type="text"
          name="empAddress"
          placeholder="Address"
          onChange={handleChange}
          value={employee.empAddress}
          required
        />
        <input
          type="text"
          name="empPhone"
          placeholder="Phone (e.g. 0123456789)"
          onChange={handleChange}
          value={employee.empPhone}
          required
        />
        <input
          type="email"
          name="empEmail"
          placeholder="Email"
          onChange={handleChange}
          value={employee.empEmail}
          required
        />
        <select name="empRole" onChange={handleChange} value={employee.empRole}>
          <option value="assistant">Assistant</option>
          <option value="coordinator">Coordinator</option>
          <option value="manager">Manager</option>
        </select>
        <button type="submit">Add Employee</button>
      </form>
    </div>
  );
};

export default AddEmployee;
