import React, { useState } from 'react';
import './sidebar.css';
import { Link } from 'react-router-dom';
import { CiShoppingCart, CiBoxList } from "react-icons/ci";
import { LuLayoutDashboard } from "react-icons/lu";
import { MdOutlineVerified } from "react-icons/md";
import { LiaUserSolid } from "react-icons/lia";
import { FiMenu } from "react-icons/fi"; // Hamburger icon
import { BiCarousel } from "react-icons/bi";
import { IoMdNotifications } from "react-icons/io";
import { AiOutlineMessage } from "react-icons/ai";
import { RiDiscountPercentLine } from "react-icons/ri";




const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`sidebar ${isOpen ? 'open' : ''}`}>
      <div className="sidebar_toggle" onClick={toggleSidebar}>
        <FiMenu />
      </div>
      <Link to="/admin" className="sidebar_item" aria-label="Dashboard">
        <LuLayoutDashboard />
        <p>Dashboard</p>
      </Link>
      <Link to="addproduct" className="sidebar_item" aria-label="Add Product">
        <CiShoppingCart />
        <p>Add New Product</p>
      </Link>
      <Link to="productlist" className="sidebar_item" aria-label="Product List">
        <CiBoxList />
        <p>Manage Products</p>
      </Link>
      <Link to="orders" className="sidebar_item" aria-label="Orders">
        <MdOutlineVerified />
        <p>View Orders</p>
      </Link>
      <Link to="users" className="sidebar_item" aria-label="Users">
        <LiaUserSolid />
        <p>Manage Users</p>
      </Link>
      <Link to="carousel" className="sidebar_item" aria-label="Users">
        <BiCarousel />
        <p>Manage Carousel</p>
      </Link>
      <Link to="queries" className="sidebar_item" aria-label="Users">
        <AiOutlineMessage />
        <p>Manage Queries</p>
      </Link>
      <Link to="popup" className="sidebar_item" aria-label="Users">
        <IoMdNotifications />
        <p>Popups</p>
      </Link>
      <Link to="promocode" className="sidebar_item" aria-label="Users">
        <RiDiscountPercentLine />
        <p>Promo Codes</p>
      </Link>
    </div>
  );
};

export default Sidebar;
