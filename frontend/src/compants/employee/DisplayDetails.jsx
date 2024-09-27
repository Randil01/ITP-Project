import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { jsPDF } from 'jspdf'; 
import 'jspdf-autotable'; 
import './DisplayDetails.css';
import Header from "../header/header"

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
//search func
  const handleSearch = (e) => {
    setSearchQuery(e.target.value.toLowerCase());
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    
    const pageWidth = doc.internal.pageSize.getWidth();
    const logoWidth = 35;  
    const logoHeight = 35; 
  
    
    const logoX = (pageWidth - logoWidth) / 2;
    
    // Add logo at the calculated x position
    const logoUrl = 'data:image/jpeg;base64,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'; 
    doc.addImage(logoUrl, 'JPEG', logoX, 0, logoWidth, logoHeight); 
  
    // Company name and heading centered
    doc.setFontSize(22);
    doc.setFont('bold');
    doc.text("Panadura Municipal Council", pageWidth / 2, 45, { align: 'center' });
    doc.setFontSize(16);
    doc.text("Employee Details Report", pageWidth / 2, 55, { align: 'center' });
  
  
    // Add generated date
    const generatedDate = new Date().toLocaleDateString();
    doc.setFontSize(12);
    doc.text(`Generated on: ${generatedDate}`, pageWidth / 2, 65, { align: 'center' });
  
    // Table columns
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
  
    // Add table
    doc.autoTable({
      head: [tableColumn],
      body: tableRows,
      startY: 80,

      headStyles: {
        fillColor: [16, 196, 43],  
        textColor: [255, 255, 255], 
        lineWidth: 0.1, 
        lineColor: [0, 0, 0],  
      },
      styles: {
        lineWidth: 0.1, 
        lineColor: [0, 0, 0],  
      },
      bodyStyles: {
        lineWidth: 0.1, 
        lineColor: [0, 0, 0],  // 
      },
      margin: { top: 10 },
      styles: { halign: 'center' }, // Center align text inside table cells
    });
  
    // Add footer for signature and date
    doc.text(`Date:${generatedDate}`, 14, doc.lastAutoTable.finalY + 20);
    doc.text("Signature: ______________________", 120, doc.lastAutoTable.finalY + 20);
  
    // Save the PDF
    doc.save("employee_report.pdf");
  };
  

  const filteredEmployees = employees.filter(emp =>
    emp.empName.toLowerCase().includes(searchQuery) ||
    emp.empRole.toLowerCase().includes(searchQuery)//search func filter 
  );

  return (
    <div>
    <Header/>
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
    </div>
  );
};

export default DisplayDetails;
