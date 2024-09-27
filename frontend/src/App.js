import { Route, Routes } from "react-router-dom";
import React from "react";
import AppHeader from "./compants/header/header";
import AsetsHome from "./compants/AssetsHome/assetsHome";
import VehicaleAll from"./compants/AssetsHome/VehicaleAll";
import AddVehicale from "./compants/AssetsHome/AddVehicale";
import UpdateVehicale from "./compants/AssetsHome/UpdateVehicale";
import PAssetsAll from "./compants/AssetsHome/publicAssetsAll";
import AddAssets from "./compants/AssetsHome/AddAssets";
import UpdateAssets from "./compants/AssetsHome/UpdateAssets";
import AddEmployee from "./compants/employee/AddEmployee"
import ManageEmployee from "./compants/employee/ManageEmployee"
import ManageSalary from "./compants/employee/ManageSalary"
import DisplayDetails from "./compants/employee/DisplayDetails"
import Menu from './compants/Street mangment/Menu'
import Add from './compants/Street mangment/Add'
import Issues from './compants/Street mangment/Issues'
import ManageIssue from './compants/Street mangment/ManageIssue'
import IssueNotification from './compants/Street mangment/IssueNotification'


function App() {
  return (
    <div className="App">
      <React.Fragment>
        <Routes>
          <Route path="/" element={<AppHeader/>}/>
          <Route path="/assetsHome" element={<AsetsHome/>}/>
          <Route path="/vehicaleall" element={<VehicaleAll/>}/>
          <Route path="/AddVehicale" element={<AddVehicale/>}/>
          <Route path="/VehicaleUpdate/:id" element={<UpdateVehicale/>}/>
          <Route path="/pAssetsAll" element={<PAssetsAll/>}/>
          <Route path="/addAssets" element={<AddAssets/>}/>
          <Route path="/updateAssets/:id" element={<UpdateAssets/>}/>
          
          //duvini
          <Route path="/employee" element={<DisplayDetails />} />
          <Route path="/addEmployee" element={<AddEmployee />} />
          <Route path="/manageEmployee" element={<ManageEmployee />} />
          <Route path="/manageSalary" element={<ManageSalary />} />

          //vishwa
          <Route path='/street' element={< Menu/>} />
          <Route path='/add' element={<Add />} />
          <Route path='/issues' element={<Issues />} />
          <Route path="/manage/:id" element={<ManageIssue />} />
          <Route path='/notification' element={<IssueNotification />} />
        </Routes>
      </React.Fragment>
    </div>
  );
}

export default App;
 