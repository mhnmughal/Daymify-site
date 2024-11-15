import React from 'react';
import './ordersuccess.css';
import { FaCheckCircle } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Ordersuccess = () => {
    return (
        <div className="ordersuccess">
            <div className="success-icon">
                <FaCheckCircle size={100} color="#28a745" />
            </div>
            <h2>Order Confirmed!</h2>
            <p>Your order has been successfully placed. Thank you for shopping with us!</p>
            <Link to="/account/myorders">
                <button className="view-orders-btn">View My Orders</button>
            </Link>
        </div>
    );
};

export default Ordersuccess;
