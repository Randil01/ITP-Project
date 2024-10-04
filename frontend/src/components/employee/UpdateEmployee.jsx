import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './UpdateEmployee.css'; 

const UpdateEmployee = ({ employee, onSave, onCancel }) => {
  const [empName, setEmpName] = useState(employee.empName);
  const [empAddress, setEmpAddress] = useState(employee.empAddress);
  const [empPhone, setEmpPhone] = useState(employee.empPhone);
  const [empEmail, setEmpEmail] = useState(employee.empEmail);

  const handleSave = async () => {
    try {
      const updatedEmployee = {
        empName,
        empAddress,
        empPhone,
        empEmail
      };
      await axios.put(`http://localhost:5000/employee/update/${employee._id}`, updatedEmployee);
      onSave(updatedEmployee);
      alert('Employee updated successfully');
    } catch (error) {
      console.error('Error updating employee:', error);
    }
  };

  return (
    <tr>
      <td>
        <input 
          type="text" 
          value={empName} 
          onChange={(e) => setEmpName(e.target.value)} 
        />
      </td>
      <td>
        <input 
          type="text" 
          value={empAddress} 
          onChange={(e) => setEmpAddress(e.target.value)} 
        />
      </td>
      <td>
        <input 
          type="text" 
          value={empPhone} 
          onChange={(e) => setEmpPhone(e.target.value)} 
        />
      </td>
      <td>
        <input 
          type="email" 
          value={empEmail} 
          onChange={(e) => setEmpEmail(e.target.value)} 
        />
      </td>
      <td>
        <button className="save-button" onClick={handleSave}>Save</button>
        <button className="cancel-button" onClick={onCancel}>Cancel</button>
      </td>
    </tr>
  );
};

export default UpdateEmployee;
