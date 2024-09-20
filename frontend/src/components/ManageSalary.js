import React, { useState, useEffect } from 'react';
import axios from 'axios'; 
import './ManageSalary.css'; 
import { FaCheckCircle } from 'react-icons/fa';

const ManageSalary = () => {
  const [employees, setEmployees] = useState([]);
  const [attendanceDays, setAttendanceDays] = useState({});
  const [roles, setRoles] = useState([]);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get('http://localhost:5000/employee/');
        setEmployees(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    const fetchRoles = async () => {
      try {
        const response = await axios.get('http://localhost:5000/employee/roles');
        setRoles(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchEmployees();
    fetchRoles();
  }, []);

  const handleUpdateAttendance = (id, attDays) => {
    setAttendanceDays({
      ...attendanceDays,
      [id]: attDays
    });
  };

  const handleSubmitAttendance = async () => {
    for (const [id, attDays] of Object.entries(attendanceDays)) {
      try {
        await axios.put(`http://localhost:5000/salary/updateSalary/${id}`, { empAttDayCount: attDays });
      } catch (error) {
        console.error(`Error updating attendance for ${id}:`, error);
      }
    }
    alert('Attendance updated successfully');
    setAttendanceDays({});
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/employee/delete/${id}`);
      setEmployees(employees.filter(emp => emp._id !== id));
      alert('Employee deleted successfully');
    } catch (error) {
      console.error(error);
    }
  };

  const handleRoleChange = async (id, newRole) => {
    try {
      await axios.put(`http://localhost:5000/employee/updateRole/${id}`, { empRole: newRole });
      setEmployees(employees.map(emp => (emp._id === id ? { ...emp, empRole: newRole } : emp)));
      alert('Role updated successfully');
    } catch (error) {
      console.error('Error updating role:', error);
    }
  };

  return (
    <div className="manage-salary-container">
      <h1>Manage Salaries</h1>
      <table className="salary-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Role</th>
            <th>Attendance Days</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map(emp => (
            <tr key={emp._id}>
              <td>{emp.empName}</td>
              <td>
                <select 
                  value={emp.empRole} 
                  onChange={(e) => handleRoleChange(emp._id, e.target.value)}
                >
                  {roles.map(role => (
                    <option key={role} value={role}>{role}</option>
                  ))}
                </select>
              </td>
              <td>
                <input 
                  type="number" 
                  placeholder="Attendance Days" 
                  onChange={(e) => handleUpdateAttendance(emp._id, e.target.value)} 
                  min="0" 
                />
                <FaCheckCircle />
              </td>
              <td>
                <button className="delete-button" onClick={() => handleDelete(emp._id)}>Remove</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button className="submit-button" onClick={handleSubmitAttendance}>add Attendance</button>
    </div>
  );
};

export default ManageSalary;
