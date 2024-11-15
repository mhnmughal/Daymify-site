const Popup = require('../models/popup'); // Adjust path as needed

class PopupController {
  // Create a new popup
  createPopup = async (req, res) => {
    try {
      const popupData = req.body;
      const popup = new Popup(popupData);
      const savedPopup = await popup.save();

      res.status(201).json({
        success: true,
        data: savedPopup,
        message: 'Popup created successfully'
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Failed to create popup',
        error: error.message
      });
    }
  };

  // Get all popups
  getAllPopups = async (req, res) => {
    try {
      const { 
        page = 1, 
        limit = 10, 
        sortBy = 'createdAt', 
        sortOrder = 'desc' 
      } = req.query;

      const options = {
        page: parseInt(page),
        limit: parseInt(limit),
        sort: { [sortBy]: sortOrder === 'desc' ? -1 : 1 }
      };

      const popups = await Popup.find()
        .sort(options.sort)
        .skip((options.page - 1) * options.limit)
        .limit(options.limit);

      const total = await Popup.countDocuments();

      res.status(200).json({
        success: true,
        data: popups,
        pagination: {
          currentPage: options.page,
          totalPages: Math.ceil(total / options.limit),
          totalItems: total
        }
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Failed to retrieve popups',
        error: error.message
      });
    }
  };

  // Get active popups for current user
  getActivePopups = async (req, res) => {
    try {
      const now = new Date();
  
      const activePopups = await Popup.find({
        isActive: true,
        $and: [
          {
            $or: [
              { startDate: { $lte: now } },
              { startDate: null }
            ]
          },
          {
            $or: [
              { endDate: null },
              { endDate: { $gte: now } }
            ]
          }
        ]
      });
  
      res.status(200).json({success: true,data: activePopups });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Failed to retrieve active popups',
        error: error.message
      });
    }
  };
  

  // Get single popup by ID
  getPopupById = async (req, res) => {
    try {
      const { id } = req.params;
      const popup = await Popup.findById(id);

      if (!popup) {
        return res.status(404).json({
          success: false,
          message: 'Popup not found'
        });
      }

      res.status(200).json({
        success: true,
        data: popup
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Failed to retrieve popup',
        error: error.message
      });
    }
  };

  // Update popup
  updatePopup = async (req, res) => {
    try {
      const { id } = req.params;
      const updateData = req.body;
      const updatedPopup = await Popup.findByIdAndUpdate(
        id, 
        updateData, 
        { new: true, runValidators: true }
      );

      if (!updatedPopup) {
        return res.status(404).json({
          success: false,
          message: 'Popup not found'
        });
      }

      res.status(200).json({
        success: true,
        data: updatedPopup,
        message: 'Popup updated successfully'
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Failed to update popup',
        error: error.message
      });
    }
  };

  // Delete popup
  deletePopup = async (req, res) => {
    try {
      const { id } = req.params;
      const deletedPopup = await Popup.findByIdAndDelete(id);

      if (!deletedPopup) {
        return res.status(404).json({
          success: false,
          message: 'Popup not found'
        });
      }

      res.status(200).json({
        success: true,
        message: 'Popup deleted successfully'
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Failed to delete popup',
        error: error.message
      });
    }
  };
}

module.exports = new PopupController();
