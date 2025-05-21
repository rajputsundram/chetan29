// src/app/api/bookings/route.ts
import { NextResponse } from "next/server";
import { ConnectDB } from "../../../lib/config/db";
import Booking from "../../../lib/models/Booking";

export async function POST(request) {
  try {
    const body = await request.json();
    const {
      testId,
      testName,
      testDescription,
      date,
      time,
      firstName,
      lastName,
      email,
      phone,
      address = "",
      notes = "",
    } = body;

    // Validate required fields
    if (
      !testId ||
      !testName ||
      !testDescription ||
      !date ||
      !time ||
      !firstName ||
      !lastName ||
      !email ||
      !phone
    ) {
      return NextResponse.json(
        { success: false, message: "Missing required fields" },
        { status: 400 }
      );
    }

    await ConnectDB();

    const booking = await Booking.create({
      testId,
      testName,
      testDescription,
      selectedDate: new Date(date),
      selectedTime: time,
      firstName,
      lastName,
      email,
      phone,
      address,
      notes,
    });

    return NextResponse.json({ success: true, data: booking }, { status: 201 });
  } catch (err) {
    console.error("Booking API error:", err);
    return NextResponse.json(
      { success: false, message: err.message || "Server error" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    await ConnectDB();

    // Return all bookings, in insertion order
    const bookings = await Booking.find();

    return NextResponse.json(
      { success: true, data: bookings },
      { status: 200 }
    );
  } catch (err) {
    console.error("Fetch bookings error:", err);
    return NextResponse.json(
      { success: false, message: err.message || "Server error" },
      { status: 500 }
    );
  }
}