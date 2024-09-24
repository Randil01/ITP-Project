import { Route, Routes } from "react-router-dom";
import React from "react";
import AppHeader from "./compants/header";
import AsetsHome from "./compants/AssetsHome/assetsHome";
import VehicaleAll from"./compants/AssetsHome/VehicaleAll";
import AddVehicale from "./compants/AssetsHome/AddVehicale";
import UpdateVehicale from "./compants/AssetsHome/UpdateVehicale";
import PAssetsAll from "./compants/AssetsHome/publicAssetsAll";
import AddAssets from "./compants/AssetsHome/AddAssets";
import UpdateAssets from "./compants/AssetsHome/UpdateAssets";


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
        </Routes>
      </React.Fragment>
    </div>
  );
}

export default App;
 