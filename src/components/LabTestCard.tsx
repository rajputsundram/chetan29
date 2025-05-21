"use client";

import React, { useState } from "react";
import { LabTest } from "./LabTestCard.types"; // or wherever your type lives
import BookingForm from "@/components/BookingForm";

export const LabTestCard: React.FC<{ test: LabTest }> = ({ test }) => {
  const [showForm, setShowForm] = useState(false);

  return (
    <>
      <div className="border rounded-lg p-6 shadow-sm hover:shadow-md transition">
        <h3 className="text-xl font-semibold text-blue-700">{test.name}</h3>
        <p className="mt-2 text-gray-600 text-sm">{test.description}</p>
        <div className="mt-4 space-y-1 text-sm">
          <p><span className="font-medium">Price:</span> ${test.price.toFixed(2)}</p>
          <p><span className="font-medium">Duration:</span> {test.duration}</p>
          <p><span className="font-medium">Category:</span> {test.category}</p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="mt-6 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          Book Now
        </button>
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-white bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg max-w-lg w-full p-6 relative">
            <button
              onClick={() => setShowForm(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>
            <BookingForm test={test} onSuccess={() => setShowForm(false)} />
          </div>
        </div>
      )}
    </>
  );
};