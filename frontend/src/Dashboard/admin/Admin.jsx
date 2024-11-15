import React from 'react';
import './admin.css';
import Sidebar from '../sidebar/Sidebar.jsx';
import { Route, Routes } from 'react-router-dom';
import Addproduct from '../addproduct/Addproduct.jsx';
import Productlist from '../productlist/Productlist.jsx';
import Editproduct from '../editproduct/Editproduct.jsx';
import AdminNavbar from '../adminnavbar/AdminNavbar.jsx';
import AdminOrders from '../allorders/AdminOrders.jsx';
import AdminUsers from '../adminusers/Adminusers.jsx';
import AdminDashboard from '../adminDashboard/AdminDashboard.jsx';
import AdminCarousel from '../admincarousel/AdminCarousel.jsx';
import AdminQueries from '../adminquories/AdminQueries.jsx';
import Adminpopup from '../popup/Adminpopup.jsx';
import AdminPromoCode from '../AdminpromoCode/AdminPromoCode.jsx';


const Admin = () => {
  return (
    <>
      <div className="d-m">
        <div className="d-n">
          <AdminNavbar />
        </div>
        <div className="sm">
          <Sidebar />
          <Routes>
            <Route path="/" element={<AdminDashboard />} />
            <Route path="addproduct" element={<Addproduct />} />
            <Route path="productlist" element={<Productlist />} />
            <Route path="productlist/editproduct/:id" element={<Editproduct />} />
            <Route path='orders' element={<AdminOrders />} />
            <Route path='users' element={<AdminUsers />} />
            <Route path='carousel' element={<AdminCarousel />} />
            <Route path='queries' element={<AdminQueries/>} />
            <Route path='popup' element={<Adminpopup/>}/>
            <Route path= 'promocode' element={<AdminPromoCode/>} />
          </Routes>
        </div>
      </div>
    </>
  );
};

export default Admin;
