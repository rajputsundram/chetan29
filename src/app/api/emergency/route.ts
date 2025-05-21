// app/api/emergency/route.ts
import { NextResponse } from 'next/server';
import { ConnectDB } from "../../../lib/config/db";
import Emergency from "../../../lib/models/EmergencyRequest";

export async function POST(request: Request) {
  try {
    const data = await request.json();

    const {
      name,
      phone,
      location,
      latitude,
      longitude,
      emergencyType,
      time,
      status,
    } = data;

    if (
      !name || !phone || !location || !latitude ||
      !longitude || !emergencyType || !time || !status
    ) {
      return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
    }

    await ConnectDB();

    const emergency = new Emergency({
      name,
      phone,
      location,
      latitude,
      longitude,
      emergencyType,
      time,
      status,
    });

    await emergency.save();

    return NextResponse.json(
      { message: 'Emergency request submitted and saved successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error saving emergency request:', error);
    return NextResponse.json(
      { message: 'Server error', error },
      { status: 500 }
    );
  }
}
