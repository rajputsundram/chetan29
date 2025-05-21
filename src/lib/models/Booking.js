// models/Booking.js
import mongoose from 'mongoose';

const BookingSchema = new mongoose.Schema({
  testId: {
    type: String,
    required: true,
  },
  testName: {
    type: String,
    required: true,
    trim: true,
  },
  testDescription: {
    type: String,
    required: true,
    trim: true,
  },
  firstName: {
    type: String,
    required: true,
    trim: true,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
  },
  phone: {
    type: String,
    required: true,
  },
  address: {
    type: String,
  },
  notes: {
    type: String,
  },
  selectedDate: {
    type: Date,
    required: true,
  },
  selectedTime: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.Booking || mongoose.model('Booking', BookingSchema);
