import React, { useEffect, useState } from 'react';
import './adminQueries.css';

const AdminQueries = () => {
    const [queries, setQueries] = useState([]);
    const [queryToDelete, setQueryToDelete] = useState(null);
    const [queryToView, setQueryToView] = useState(null); // For full message view modal

    const baseurl = import.meta.env.VITE_REACT_APP_BACKEND_BASEURL;

    useEffect(() => {
        fetchQueries();
    }, []);

    const fetchQueries = async () => {
        try {
            const response = await fetch(`${baseurl}/allquories`);
            const data = await response.json();
            setQueries(data.data);
        } catch (error) {
            console.error('Error fetching queries:', error);
        }
    };

    const handleStatusChange = async (id, newStatus) => {
        try {
            const response = await fetch(`${baseurl}/updatequory/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ status: newStatus }),
            });
            if (response.ok) {
                fetchQueries();
            } else {
                console.error('Failed to update query status');
            }
        } catch (error) {
            console.error('Error updating query status:', error);
        }
    };

    const handleDeleteQuery = async (id) => {
        try {
            const response = await fetch(`${baseurl}/delquory/${id}`, {
                method: 'DELETE',
            });
            if (response.ok) {
                setQueryToDelete(null);
                fetchQueries();
            } else {
                console.error('Failed to delete query');
            }
        } catch (error) {
            console.error('Error deleting query:', error);
        }
    };

    return (
        <div className="admin-queries-container">
            <h1>User Queries Management</h1>
            <table className="queries-table">
                <thead>
                    <tr>
                        <th>User Name</th>
                        <th>Email</th>
                        <th>Subject</th>
                        <th>Message</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {queries.map(query => (
                        <tr key={query._id}>
                            <td>{query.firstname} {query.lastname}</td>
                            <td>{query.email}</td>
                            <td>{query.subject}</td>
                            <td>
                                <lable
                                    className="show-message-btn"
                                    onClick={() => setQueryToView(query)}
                                >
                                    Show Message
                                </lable>
                            </td>
                            <td>
                                <select
                                    value={query.status}
                                    onChange={(e) => handleStatusChange(query._id, e.target.value)}
                                >
                                    <option value="pending">Pending</option>
                                    <option value="in-progress">In Progress</option>
                                    <option value="completed">Completed</option>
                                </select>
                            </td>
                            <td>
                                <label className="delete-btn" onClick={() => setQueryToDelete(query)}>
                                    Delete
                                </label>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Delete Confirmation Modal */}
            {queryToDelete && (
                <div className="modal1">
                    <div className="modal-content">
                        <h3>Confirm Delete</h3>
                        <p>Are you sure you want to delete the query from <strong>{queryToDelete.firstname} {queryToDelete.lastname}</strong>?</p>
                        <button onClick={() => handleDeleteQuery(queryToDelete._id)}>Yes</button>
                        <button onClick={() => setQueryToDelete(null)}>Cancel</button>
                    </div>
                </div>
            )}

            {/* Full Message Modal */}
            {queryToView && (
                <div className="message-modal">
                    <div className="message-modal-content">
                        <h3>Message from {queryToView.firstname} {queryToView.lastname}</h3>
                        <p>{queryToView.message}</p>
                        <button onClick={() => setQueryToView(null)}>Close</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminQueries;
