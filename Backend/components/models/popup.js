const mongoose = require('mongoose');

const PopupSchema = new mongoose.Schema({
  title: {
    type: String,
    required: false,
    trim: true
  },
  description: {
    type: String,
    required: false,
    trim: true
  },
  icon: {
    type: String,
    default: null
  },
  buttonText: {
    type: String,
    default: 'Learn More'
  },
  buttonLink: {
    type: String,
    default: '/'
  },
 
  isActive: {
    type: Boolean,
    default: true
  },
  startDate: {
    type: Date,
    default: Date.now
  },
  endDate: {
    type: Date,
    default: null
  },
  displayFrequency: {
    type: String,
    enum: ['always', 'once_per_session', 'once_per_day', 'once_per_week'],
    default: 'always'
  },
  targetAudience: {
    type: String,
    enum: ['all', 'new_users', 'returning_users'],
    default: 'all'
  },

}, { 
  timestamps: true 
});

// Create a method to check if popup is currently valid
PopupSchema.methods.isValidPopup = function() {
  const now = new Date();
  return (
    this.isActive && 
    (!this.startDate || this.startDate <= now) &&
    (!this.endDate || this.endDate >= now)
  );
};

module.exports = mongoose.model('Popup', PopupSchema);