import React, { useState, useEffect, useContext, useMemo } from 'react';
import './clientorderdetails.css';
import { RxCross2 } from 'react-icons/rx';
import { Context } from '../../context API/Contextapi';

const Clientorderdetails = ({ onClose, orderId }) => {
    const { myorders, countryCode } = useContext(Context);
    const [orderDetails, setOrderDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchOrderDetails = async () => {
            setLoading(true);
            setError(null);

            try {
                const data = await myorders();
                const order = data.find((order) => order._id === orderId);

                if (order) {
                    setOrderDetails(order);
                } else {
                    setError('Order not found');
                }
            } catch (err) {
                setError(`Error fetching order details: ${err.message}`);
            } finally {
                setLoading(false);
            }
        };

        fetchOrderDetails();
    }, [myorders, orderId]);

    const formattedDate = useMemo(() => {
        return orderDetails ? new Date(orderDetails.dateOrdered).toLocaleString() : '';
    }, [orderDetails]);

    const renderLoading = () => <p>Loading order details...</p>;
    const renderError = () => <p className="client-error-message">{error}</p>;

    if (loading) return renderLoading();
    if (error) return renderError();
    if (!orderDetails) return <p>No order details available.</p>;

    const {
        orderId: ID,
        totalPrice,
        orderItems,
        shippingInfo,
        paymentInfo,
        user,
        orderStatus
    } = orderDetails;


    // Get currency symbol based on country code
    const currencySymbols = {
        US: '$',
        EU: '€',
        PK: '₨',
        GB: '£',
        AE: 'د.إ'
    };
    const currencySymbol = currencySymbols[countryCode] || '$';


    return (
        <div className="client-container">
            <RxCross2 className="client-close-btn" onClick={onClose} />
            <h2>Order Details</h2>
            
            <div className="client-order-info">
                <p><strong>Order ID:</strong> {ID}</p>
                <p><strong>Order Date:</strong> {formattedDate}</p>
                <p><strong>Order Price:</strong> {currencySymbol}{totalPrice.toFixed(0)}</p>
                <p><strong>Payment Method:</strong> {paymentInfo?.method || 'N/A'}</p>
                <p><strong>Payment Status:</strong> {paymentInfo?.status || 'N/A'}</p>
                <p><strong>Order Status:</strong> <span className="client-status">{orderStatus}</span></p>
            </div>

            <div className="client-order-details">
                <h3>Order Items</h3>
                {orderItems?.map((item) => (
                    <div key={item._id} className="client-o-details">
                        <p><strong>Title:</strong> {item.name}</p>
                        <p><strong>Quantity:</strong> {item.quantity}</p>
                        <p><strong>Price:</strong> {currencySymbol}{item.price.toFixed(0)}</p>
                        <p><strong>Size:</strong> {item.size}</p>
                        <p><strong>Color:</strong> {item.color}</p>
                    </div>
                ))}
            </div>

            <div className="client-shipping-info">
                <h3>Shipping Info</h3>
                {shippingInfo ? (
                    <>
                        <p><strong>Name:</strong> {user?.name || 'N/A'}</p>
                        <p><strong>Address:</strong> {shippingInfo.address}</p>
                        <p><strong>City, State, Country:</strong> {`${shippingInfo.city}, ${shippingInfo.state}, ${shippingInfo.country}`}</p>
                        <p><strong>Postal Code:</strong> {shippingInfo.postcode}</p>
                        <p><strong>Phone:</strong> {shippingInfo.phone}</p>
                    </>
                ) : (
                    <p>No shipping information available.</p>
                )}
            </div>
        </div>
    );
};

export default Clientorderdetails;
