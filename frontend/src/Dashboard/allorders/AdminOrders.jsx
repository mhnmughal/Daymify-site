import React, { useState, useEffect, useContext, useCallback } from 'react';
import './adminorders.css';
import Orderdetails from '../orderdetails/Orderdetails';
import { LuPencilLine } from "react-icons/lu";
import { RiDeleteBin6Line } from "react-icons/ri";
import { Context } from '../../context API/Contextapi';

const AdminOrders = () => {
    const baseurl = import.meta.env.VITE_REACT_APP_BACKEND_BASEURL;
    const { fetchOrders } = useContext(Context);
    const [orders, setOrders] = useState([]);
    const [selectedOrderId, setSelectedOrderId] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [deleting, setDeleting] = useState(false);
    const [showConfirmDelete, setShowConfirmDelete] = useState(false);
    const [orderToDelete, setOrderToDelete] = useState(null);

    const loadOrders = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const ordersData = await fetchOrders();
            setOrders(ordersData);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }, [fetchOrders]);

    useEffect(() => {
        loadOrders();
    }, [loadOrders]);

    const viewOrderDetails = (id) => {
        setSelectedOrderId(id);
    };

    const closeOrderDetails = () => {
        setSelectedOrderId(null);
    };

    const confirmDeleteOrder = (id) => {
        console.log("here is the id",id);
        setOrderToDelete(id);
        setShowConfirmDelete(true);
    };

    const deleteOrder = async () => {
        if (!orderToDelete) return;
        setDeleting(true);
        try {
            const response = await fetch(`${baseurl}/delorder/${orderToDelete}`, {
                method: 'DELETE',
                headers: {
                    'auth-token': `${sessionStorage.getItem('auth-token')}`,
                    'Content-Type': 'application/json',
                },
            });
            if (response.ok) {
                const data = await response.json();
                if (data.success) {
                    const ordersData = await fetchOrders();
                    setOrders(ordersData);
                } else {
                    setError('Failed to delete the order');
                }
            } else {
                setError('Failed to delete the order');
            }
        } catch (error) {
            setError('Error deleting the order: ' + error.message);
        } finally {
            setDeleting(false);
            setShowConfirmDelete(false);
            setOrderToDelete(null);
        }
    };

    const getStatusClass = (status) => {
        switch (status) {
            case 'Processing':
                return 'status-processing';
            case 'Shipped':
                return 'status-shipped';
            case 'Delivered':
                return 'status-delivered';
            case 'Cancelled':
                return 'status-cancelled';
            default:
                return '';
        }
    };

    const handleStatusUpdate = async () => {
        try {
            const ordersData = await fetchOrders();
            setOrders(ordersData);
        } catch (error) {
            setError('Failed to update orders');
        }
    };

    return (
        <div className="admin-orders-container">
            <h2 className="admin-orders-title">Order Management</h2>
            {loading && <p>Loading orders...</p>}
            {error && <p className="error-message">{error}</p>}
            {deleting && <p>Deleting order...</p>}
            <table className="admin-orders-table">
                <thead>
                    <tr>
                        <th>Order ID</th>
                        <th>Order Date</th>
                        <th>Order Status</th>
                        <th>Total Price</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.length > 0 ? (
                        orders.map((order) => (
                            <tr key={order._id} className="table-row">
                                <td>{order.orderId}</td>
                                <td>{new Date(order.dateOrdered).toLocaleString()}</td>
                                <td className="status-cell">
                                    <span className={getStatusClass(order.orderStatus)}>
                                        {order.orderStatus}
                                    </span>
                                </td>
                                <td>${order.totalPrice.toFixed(2)}</td>
                                <td>
                                    <button onClick={() => viewOrderDetails(order.orderId)} className="o-db">
                                        <LuPencilLine />
                                    </button>
                                    <button onClick={() => confirmDeleteOrder(order.orderId)} className="o-db" disabled={deleting}>
                                        <RiDeleteBin6Line />
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="5">No orders available</td>
                        </tr>
                    )}
                </tbody>
            </table>

            {selectedOrderId && (
                <div className="order-details-container">
                    <Orderdetails oid={selectedOrderId} onClose={closeOrderDetails} onStatusUpdate={handleStatusUpdate} />
                </div>
            )}

            {showConfirmDelete && (
                <div className="confirm-delete-overlay">
                    <div className="confirm-delete-modal">
                        <h3>Confirm Deletion</h3>
                        <p>Are you sure you want to delete this order?</p>
                        <div className="modal-buttons">
                            <button className="confirm-button" onClick={deleteOrder}>Confirm</button>
                            <button className="cancel-button" onClick={() => setShowConfirmDelete(false)}>Cancel</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminOrders;
