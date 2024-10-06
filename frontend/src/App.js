import { Route, Routes, Navigate } from "react-router-dom";
import React from "react";
import { useAuth } from './context/AuthContext'; // Adjust the path as needed
import Home from "./components/Home/home";
import AppHeader from "./components/header/header";
import AsetsHome from "./components/AssetsHome/assetsHome";
import VehicaleAll from "./components/AssetsHome/VehicaleAll";
import AddVehicale from "./components/AssetsHome/AddVehicale";
import UpdateVehicale from "./components/AssetsHome/UpdateVehicale";
import PAssetsAll from "./components/AssetsHome/publicAssetsAll";
import AddAssets from "./components/AssetsHome/AddAssets";
import UpdateAssets from "./components/AssetsHome/UpdateAssets";
import AddEmployee from "./components/employee/AddEmployee";
import ManageEmployee from "./components/employee/ManageEmployee";
import ManageSalary from "./components/employee/ManageSalary";
import DisplayDetails from "./components/employee/DisplayDetails";
import Menu from './components/Street mangment/Menu';
import Add from './components/Street mangment/Add';
import Issues from './components/Street mangment/Issues';
import ManageIssue from './components/Street mangment/ManageIssue';
import IssueNotification from './components/Street mangment/IssueNotification';
import FeedbackForm from "./components/feedback/FeedbackForm";
import FeedbackList from "./components/feedback/FeedbackList";
import AdminFeedbackView from "./components/Admin/Feedback/AdminFeedbackView";
import ItemDetails from './components/wastemanagement/Itemdetails';
import Product from './components/wastemanagement/product';
import UpdateItem from './components/wastemanagement/UpdateItem';
import ItemRepoart from './components/wastemanagement/ItemRepoart';
import AdminLogin from './components/Admin/AdminLogin/AdminLogin';
import AdminDashboard from './components/Admin/AdminLogin/AdminDashboard';
import Chatbot from "./components/Chatbot";
import Login from './components/login';
import ProtectedRoute from "./protectedRoute";

function App() {
  const { isAdminLoggedIn } = useAuth(); // Get the authentication state
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
  
  return (
    <div className="App">
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/app" element={<AppHeader />} />
          <Route path="/login" element={<Login />} />
          <Route path="/assetsHome" element={<ProtectedRoute element={<AsetsHome />} isAuthenticated={isAuthenticated}/>}/>
          <Route path="/vehicaleall" element={<ProtectedRoute element={<VehicaleAll />} isAuthenticated={isAuthenticated}/>}/>
          <Route path="/AddVehicale" element={<ProtectedRoute element={<AddVehicale />} isAuthenticated={isAuthenticated}/>}/>
          <Route path="/VehicaleUpdate/:id" element={<ProtectedRoute element={<UpdateVehicale />} isAuthenticated={isAuthenticated}/>}/>
          <Route path="/pAssetsAll" element={<ProtectedRoute element={<PAssetsAll />} isAuthenticated={isAuthenticated}/>}/>
          <Route path="/addAssets" element={<ProtectedRoute element={<AddAssets />} isAuthenticated={isAuthenticated}/>}/>
          <Route path="/updateAssets/:id" element={<ProtectedRoute element={<UpdateAssets />} isAuthenticated={isAuthenticated}/>}/>
          
          {/* Employee routes */}
          <Route path="/employee" element={<ProtectedRoute element={<DisplayDetails />} isAuthenticated={isAuthenticated}/>}/>
          <Route path="/addEmployee" element={<ProtectedRoute element={<AddEmployee />} isAuthenticated={isAuthenticated}/>}/>
          <Route path="/manageEmployee" element={<ProtectedRoute element={<ManageEmployee />} isAuthenticated={isAuthenticated}/>}/>
          <Route path="/manageSalary" element={<ProtectedRoute element={<ManageSalary />} isAuthenticated={isAuthenticated}/>}/>

          {/* Feedback routes */}
          <Route path='/feedbackform' element={<FeedbackForm />} />
          <Route path='/feedbacklist' element={<FeedbackList />} />
          <Route path='/AdminFeedbackView' element={<AdminFeedbackView />} />

          {/* Street management routes */}
          <Route path="/street" element={<ProtectedRoute element={<Menu />} isAuthenticated={isAuthenticated}/>}/>
          <Route path="/add" element={<ProtectedRoute element={<Add />} isAuthenticated={isAuthenticated}/>}/>
          <Route path="/issues" element={<ProtectedRoute element={<Issues />} isAuthenticated={isAuthenticated}/>}/>
          <Route path="/manage/:id" element={<ProtectedRoute element={<ManageIssue />} isAuthenticated={isAuthenticated}/>}/>
          <Route path="/notification" element={<ProtectedRoute element={<IssueNotification />} isAuthenticated={isAuthenticated}/>}/>

          {/* Waste management routes */}
          <Route path="/itemdetails" element={<ProtectedRoute element={<ItemDetails />} isAuthenticated={isAuthenticated}/>}/>
          <Route path='/add-item' element={<ProtectedRoute element={<Product />} isAuthenticated={isAuthenticated}/>}/>
          <Route path="/itemupdate/:id" element={<ProtectedRoute element={<UpdateItem />} isAuthenticated={isAuthenticated}/>}/>
          <Route path="/itemrepoart" element={<ProtectedRoute element={<ItemRepoart />} isAuthenticated={isAuthenticated}/>}/>
          <Route path="/dashboard" element={<ProtectedRoute element={<ItemRepoart />} isAuthenticated={isAuthenticated}/>}/>

          {/* Admin routes */}
          <Route path="/adminLogin" element={<AdminLogin />} />
          <Route
              path="/adminDashboard"
              element={isAdminLoggedIn ? <AdminDashboard /> : <Navigate to="/adminLogin" />}
          />
        </Routes>

        {/* Place the ChatBot component here */}
        <Chatbot/> 
    </div>
  );
}

export default App;
