import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { jsPDF } from 'jspdf'; 
import 'jspdf-autotable'; 
import './DisplayDetails.css';

const DisplayDetails = () => {
  const [employees, setEmployees] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

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

  const handleSearch = (e) => {
    setSearchQuery(e.target.value.toLowerCase());
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    const tableColumn = ["Name", "Role", "Address", "Email", "Phone", "Basic Salary", "Total Salary"];
    const tableRows = [];

    employees.forEach(employee => {
      const employeeData = [
        employee.empName,
        employee.empRole,
        employee.empAddress,
        employee.empEmail,
        employee.empPhone,
        employee.empBasicSalary,
        employee.empTotalSalary
      ];
      tableRows.push(employeeData);
    });

    doc.autoTable({
      head: [tableColumn],
      body: tableRows,
      startY: 20,
    });

    doc.text("Employee Salary Report", 14, 15);
    doc.save("employee_report.pdf");
  };

  const filteredEmployees = employees.filter(emp =>
    emp.empName.toLowerCase().includes(searchQuery) ||
    emp.empRole.toLowerCase().includes(searchQuery)
  );

  return (
    <div className="details-container">

      <div className="header">
        <div className="header-left">
          <input
            type="text"
            placeholder="Search by name or role..."
            value={searchQuery}
            onChange={handleSearch}
            className="search-bar"
          />
        </div>
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
          {filteredEmployees.map(emp => (
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

      <div className="pdf-button-container">
        <button className="pdf-button" onClick={generatePDF}>Generate PDF Report</button>
      </div>
    </div>
  );
};

export default DisplayDetails;
