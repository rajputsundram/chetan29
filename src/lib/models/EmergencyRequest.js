// models/Emergency.ts
import mongoose from 'mongoose';

const EmergencySchema = new mongoose.Schema(
  {
    name: String,
    phone: String,
    location: String,
    latitude: String,
    longitude: String,
    emergencyType: String,
    time: String,
    status: String,
  },
  { timestamps: true }
);

export default mongoose.models.Emergency || mongoose.model('Emergency', EmergencySchema);
