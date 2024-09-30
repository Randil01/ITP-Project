import { Route, Routes } from "react-router-dom";
import React from "react";
import { useNavigate } from 'react-router-dom';
import AppHeader from "./components/header/header";
import AsetsHome from "./components/AssetsHome/assetsHome";
import VehicaleAll from"./components/AssetsHome/VehicaleAll";
import AddVehicale from "./components/AssetsHome/AddVehicale";
import UpdateVehicale from "./components/AssetsHome/UpdateVehicale";
import PAssetsAll from "./components/AssetsHome/publicAssetsAll";
import AddAssets from "./components/AssetsHome/AddAssets";
import UpdateAssets from "./components/AssetsHome/UpdateAssets";
import AddEmployee from "./components/employee/AddEmployee"
import ManageEmployee from "./components/employee/ManageEmployee"
import ManageSalary from "./components/employee/ManageSalary"
import DisplayDetails from "./components/employee/DisplayDetails"
import Menu from './components/Street mangment/Menu'
import Add from './components/Street mangment/Add'
import Issues from './components/Street mangment/Issues'
import ManageIssue from './components/Street mangment/ManageIssue'
import IssueNotification from './components/Street mangment/IssueNotification'
import FeedbackForm from "./components/feedback/FeedbackForm";
import FeedbackList from "./components/feedback/FeedbackList";
import AdminFeedbackView from "./components/Admin/Feedback/AdminFeedbackView";


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

          <Route path='/feedbackform' element={<FeedbackForm />} />
          <Route path='/feedbacklist' element={<FeedbackList />} />
          <Route path='/AdminFeedbackView' element={<AdminFeedbackView />} />

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
 