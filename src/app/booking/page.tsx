// app/bookings/page.tsx
"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { format } from "date-fns";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface Booking {
  id: string;
  testId: string;
  testName: string;
  testDescription: string;
  selectedDate: string;
  selectedTime: string;
  address?: string;
  notes?: string;
  status?: string;
  reportUrl?: string;
}

export default function MyBookingsPage() {
  const router = useRouter();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchBookings() {
      setLoading(true);
      try {
        const { data } = await axios.get<{ success: boolean; data: Booking[] }>(
          "/api/booking"
        );
        if (data.success) {
          setBookings(data.data);
        } else {
          toast.error("Could not load bookings");
        }
      } catch (err) {
        console.error(err);
        toast.error("Failed to fetch bookings");
      } finally {
        setLoading(false);
      }
    }
    fetchBookings();
  }, []);

  if (loading) return <p className="px-6 py-8">Loading...</p>;
  if (!loading && bookings.length === 0)
    return <p className="px-6 py-8 text-gray-500">No bookings found.</p>;

  return (
    <div className="px-6 py-8">
      <h1 className="text-3xl font-bold text-blue-700 mb-6">My Test Bookings</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {bookings.map((b) => (
          <div
            key={b.id}
            className="bg-white rounded-xl shadow p-6 flex flex-col justify-between"
          >
            <div>
              <h2 className="text-xl font-semibold text-blue-700 mb-2">
                {b.testName}
              
              </h2>
              <p className="text-gray-600 mb-4">{b.testDescription}</p>
              <p className="text-gray-700 mb-1">
                📅 {format(new Date(b.selectedDate), "MMMM do, yyyy")} at {b.selectedTime}
              </p>
              {b.address && (
                <p className="text-gray-700 mb-1">📍 {b.address}</p>
              )}
              {b.notes && (
                <p className="text-gray-700 mb-1">🗒️ {b.notes}</p>
              )}
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              
              {b.reportUrl && (
                <a
                  href={b.reportUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm"
                >
                  Download Report
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
