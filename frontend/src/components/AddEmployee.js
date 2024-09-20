import React, { useState } from 'react';
import axios from 'axios';
import './AddEmployee.css'; 

const AddEmployee = () => {
  const [employee, setEmployee] = useState({
    empName: '',
    empAddress: '',
    empPhone: '',
    empEmail: '',
    empRole: 'operator'
  });

  const handleChange = (e) => {
    setEmployee({
      ...employee,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/employee/add', employee);
      alert('Employee added successfully');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="form-container">
      <h2>Add New Employee</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="empName"
          placeholder="Name"
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="empAddress"
          placeholder="Address"
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="empPhone"
          placeholder="Phone"
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="empEmail"
          placeholder="Email"
          onChange={handleChange}
          required
        />
        <select name="empRole" onChange={handleChange}>
          <option value="operator">Operator</option>
          <option value="driver">Driver</option>
          <option value="servant">Servant</option>
        </select>
        <button type="submit">Add Employee</button>
      </form>
    </div>
  );
};

export default AddEmployee;
