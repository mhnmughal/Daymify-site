const UserQueries = require('../models/userquories'); // Adjust the path according to your file structure

// Create a new user query
const createQuery = async (req, res) => {
    try {
        const newQuery = new UserQueries(req.body);
        await newQuery.save();
        res.status(201).json({ success: true, message: 'Query submitted successfully.', data: newQuery });
    } catch (error) {
        console.error('Error creating query:', error);
        res.status(500).json({ success: false, message: 'Failed to submit query.', error: error.message });
    }
};

// Get all user queries
const getQueries = async (req, res) => {
    try {
        const queries = await UserQueries.find();
        res.status(200).json({ success: true, data: queries });
    } catch (error) {
        console.error('Error fetching queries:', error);
        res.status(500).json({ success: false, message: 'Failed to retrieve queries.', error: error.message });
    }
};

// Get a specific user query by ID
const getQueryById = async (req, res) => {
    try {
        const query = await UserQueries.findById(req.params.id);
        if (!query) {
            return res.status(404).json({ success: false, message: 'Query not found.' });
        }
        res.status(200).json({ success: true, data: query });
    } catch (error) {
        console.error('Error fetching query:', error);
        res.status(500).json({ success: false, message: 'Failed to retrieve query.', error: error.message });
    }
};

// Update a user query
const updateQuery = async (req, res) => {
    try {
        const query = await UserQueries.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!query) {
            return res.status(404).json({ success: false, message: 'Query not found.' });
        }
        res.status(200).json({ success: true, message: 'Query updated successfully.', data: query });
    } catch (error) {
        console.error('Error updating query:', error);
        res.status(500).json({ success: false, message: 'Failed to update query.', error: error.message });
    }
};

// Delete a user query
const deleteQuery = async (req, res) => {
    try {
        const query = await UserQueries.findByIdAndDelete(req.params.id);
        if (!query) {
            return res.status(404).json({ success: false, message: 'Query not found.' });
        }
        res.status(200).json({ success: true, message: 'Query deleted successfully.' });
    } catch (error) {
        console.error('Error deleting query:', error);
        res.status(500).json({ success: false, message: 'Failed to delete query.', error: error.message });
    }
};

module.exports = {
    createQuery,
    getQueries,
    getQueryById,
    updateQuery,
    deleteQuery,
};
