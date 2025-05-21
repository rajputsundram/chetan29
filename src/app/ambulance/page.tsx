"use client";

import { useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

export default function EmergencyPage() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    location: "",
    latitude: "",
    longitude: "",
    emergencyType: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => setForm({ ...form, [e.target.name]: e.target.value });

  const fetchLocation = () => {
    if (!navigator.geolocation) {
      toast.error("GPS not supported");
      return;
    }

    navigator.geolocation.getCurrentPosition((pos) => {
      setForm((prev) => ({
        ...prev,
        latitude: pos.coords.latitude.toString(),
        longitude: pos.coords.longitude.toString(),
      }));
      toast.success("GPS location fetched");
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post("/api/emergency", {
        ...form,
        time: new Date().toISOString(),
        status: "Pending",
      });

      toast.success(response.data.message);

      setForm({
        name: "",
        phone: "",
        location: "",
        latitude: "",
        longitude: "",
        emergencyType: "",
      });
    } catch (err: any) {
      toast.error("Error: " + (err.response?.data?.message || err.message));
    }
  };

  return (
    <div className="min-h-screen flex">
      <Toaster position="top-center" />

      {/* Left side */}
      <div className="w-1/2 bg-indigo-700 text-white flex flex-col justify-center items-center p-10">
        <div className="text-center space-y-4">
          <div className="text-6xl">💖</div>
          <h2 className="text-2xl font-bold">Swastic Clinic Emergency</h2>
          <p className="text-lg">
            Get help fast — submit an emergency request instantly with live GPS tracking.
          </p>
        </div>
      </div>

      {/* Right side - Form */}
      <div className="w-1/2 flex justify-center items-center bg-gray-100">
        <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
          <h1 className="text-2xl font-bold text-red-600 text-center mb-6">
            Emergency Request
          </h1>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              required
              value={form.name}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-400"
            />
            <input
              type="tel"
              name="phone"
              placeholder="Phone Number"
              required
              value={form.phone}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-400"
            />
            <input
              type="text"
              name="location"
              placeholder="Address/Location"
              required
              value={form.location}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-400"
            />

            <select
              name="emergencyType"
              required
              value={form.emergencyType}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-400"
            >
              <option value="">Select Emergency Type</option>
              <option>Accident</option>
              <option>Cardiac Arrest</option>
              <option>Seizure</option>
              <option>Labour</option>
              <option>Other</option>
            </select>

            <div className="flex items-center justify-between">
              <button
                type="button"
                onClick={fetchLocation}
                className="bg-gray-700 hover:bg-gray-800 text-white px-4 py-2 rounded-md"
              >
                Get My GPS Location
              </button>

              {form.latitude && form.longitude && (
                <p className="text-sm text-gray-600">
                  GPS: {form.latitude}, {form.longitude}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md"
            >
              Request Ambulance
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
