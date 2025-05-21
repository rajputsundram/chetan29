"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "sonner";

const timeSlots = [
  "09:00 AM","09:30 AM","10:00 AM","10:30 AM","11:00 AM","11:30 AM",
  "12:00 PM","12:30 PM","02:00 PM","02:30 PM","03:00 PM","03:30 PM",
  "04:00 PM","04:30 PM","05:00 PM"
];

export interface BookingFormProps {
  test: {
    id: string;
    name: string;
    description: string;
    price: number;
    duration: string;
    category: string;
  };
  onSuccess?: () => void;
}

const BookingForm: React.FC<BookingFormProps> = ({ test, onSuccess }) => {
  const router = useRouter();
  const [date, setDate] = useState<string>("");
  const [time, setTime] = useState<string>("");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    notes: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!date || !time) {
      toast.error("Please select both date and time");
      return;
    }

    const { firstName, lastName, email, phone } = formData;
    if (!firstName || !lastName || !email || !phone) {
      toast.error("Please fill in all required fields");
      return;
    }

    try {
      const payload = {
        testId: test.id,
        testName: test.name,
        testDescription: test.description,
        date,
        time,
        ...formData,
      };

      const { data } = await axios.post('/api/booking', payload);

      if (data.success) {
        toast.success("Booking confirmed!");
        onSuccess?.();
        setTimeout(() => router.push("/booking"), 1500);
      } else {
        toast.error(data.message || "Booking failed.");
      }
    } catch (err: any) {
      console.error("Booking error:", err);
      toast.error(err.response?.data?.message || "Booking failed.");
    }
  };

  return (
    <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg p-8">
      <h1 className="text-2xl font-bold">{test.name}</h1>
      <p className="text-gray-600 mb-4">{test.description}</p>
      <p className="font-semibold mb-6">
        Price: ${test.price.toFixed(2)}
      </p>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Hidden Test Info */}
        <input type="hidden" name="testName" value={test.name} />
        <input type="hidden" name="testDescription" value={test.description} />

        {/* Date & Time */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Date<span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Time<span className="text-red-500">*</span>
            </label>
            <select
              value={time}
              onChange={(e) => setTime(e.target.value)}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Select time</option>
              {timeSlots.map((slot) => (
                <option key={slot} value={slot}>
                  {slot}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Personal Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              First Name<span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              value={formData.firstName}
              onChange={handleChange}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Last Name<span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              value={formData.lastName}
              onChange={handleChange}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email<span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Phone<span className="text-red-500">*</span>
            </label>
            <input
              type="tel"
              name="phone"
              placeholder="Phone"
              value={formData.phone}
              onChange={handleChange}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Address
          </label>
          <input
            type="text"
            name="address"
            placeholder="Address"
            value={formData.address}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Additional Notes
          </label>
          <textarea
            name="notes"
            rows={4}
            placeholder="Any special requirements or info"
            value={formData.notes}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <button
          type="submit"
          className="w-full py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition"
        >
          Confirm Booking
        </button>
      </form>
    </div>
  );
};

export default BookingForm;
