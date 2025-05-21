"use client";

export const dynamic = "force-dynamic";

import { useEffect, useState } from "react";
import axios from "axios";

type Emergency = {
  _id: string;
  name: string;
  phone: string;
  location: string;
  latitude: number | string;
  longitude: number | string;
  emergencyType: string;
  time: string;
  status: string;
};

const statusColors: { [key: string]: string } = {
  pending: "bg-yellow-100 text-yellow-800",
  active: "bg-red-100 text-red-800",
  resolved: "bg-green-100 text-green-800",
};

const emergencyIcons: { [key: string]: string } = {
  fire: "🔥",
  medical: "🚑",
  police: "🚨",
  accident: "🚗",
  other: "⚠️",
};

const safeCoordinate = (coord: number | string): string => {
  try {
    return Number(coord).toFixed(4);
  } catch (error) {
    console.error("Invalid coordinate format:", coord);
    return "0.0000";
  }
};

export default function EmergencyRequestsPage() {
  const [emergencies, setEmergencies] = useState<Emergency[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    const fetchEmergencies = async () => {
      try {
        const response = await axios.get("/api/emergency");
        if (response.status !== 200) throw new Error(`HTTP ${response.status}`);
        
        const { success, data, message } = response.data;
        if (success) {
          // Ensure coordinates are numbers
          const validatedData = data.map((emergency: Emergency) => ({
            ...emergency,
            latitude: Number(emergency.latitude),
            longitude: Number(emergency.longitude),
          }));
          setEmergencies(validatedData);
        } else {
          throw new Error(message || "API returned success: false");
        }
      } catch (err: any) {
        setErrorMsg(err.message || "Failed to load emergency requests");
      } finally {
        setLoading(false);
      }
    };

    fetchEmergencies();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Emergency Requests</h1>
          <p className="text-gray-600 mt-2">Recent emergency reports and their status</p>
        </div>

        {loading && (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent"></div>
          </div>
        )}

        {errorMsg && (
          <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-6">
            <div className="flex">
              <div className="flex-shrink-0">
                <span className="text-red-500">⚠️</span>
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-700">{errorMsg}</p>
              </div>
            </div>
          </div>
        )}

        {!loading && !errorMsg && (
          <div className="grid gap-5">
            {emergencies.length === 0 ? (
              <div className="text-center py-12 bg-white rounded-lg shadow">
                <p className="text-gray-500">No emergency requests found</p>
              </div>
            ) : (
              emergencies.map((emergency) => (
                <div
                  key={emergency._id}
                  className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 p-6"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-4">
                      <div className="text-3xl">
                        {emergencyIcons[emergency.emergencyType.toLowerCase()] || emergencyIcons.other}
                      </div>
                      <div>
                        <h2 className="text-lg font-semibold text-gray-900">{emergency.name}</h2>
                        <p className="text-sm text-gray-500">{emergency.location}</p>
                      </div>
                    </div>
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                      statusColors[emergency.status] || statusColors.pending
                    }`}>
                      {emergency.status}
                    </span>
                  </div>

                  <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4 border-t pt-4">
                    <div className="space-y-1">
                      <div className="flex items-center text-sm text-gray-600">
                        <span className="mr-2">📞</span>
                        <a href={`tel:${emergency.phone}`} className="hover:text-blue-600">
                          {emergency.phone}
                        </a>
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <span className="mr-2">🕒</span>
                        {new Date(emergency.time).toLocaleString([], {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </div>
                    </div>
                    <div className="space-y-1">
                      <div className="text-sm">
                        <span className="font-medium text-gray-900">Emergency Type:</span>
                        <span className="ml-2 text-gray-600 capitalize">{emergency.emergencyType}</span>
                      </div>
                      <div className="text-sm">
                        <span className="font-medium text-gray-900">Coordinates:</span>
                        <span className="ml-2 text-gray-600">
                          {safeCoordinate(emergency.latitude)}, {safeCoordinate(emergency.longitude)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}