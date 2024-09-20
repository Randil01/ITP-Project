import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AddEmployee from './components/AddEmployee';
import DisplayDetails from './components/DisplayDetails';
import ManageEmployee from './components/ManageEmployee';
import ManageSalary from './components/ManageSalary';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<DisplayDetails />} />
        <Route path="/addEmployee" element={<AddEmployee />} />
        <Route path="/manageEmployee" element={<ManageEmployee />} />
        <Route path="/manageSalary" element={<ManageSalary />} />
      </Routes>
    </Router>
  );
}

export default App;

 