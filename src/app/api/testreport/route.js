import { ConnectDB } from '../../../lib/config/db';
import MedicalTest from '../../../lib/models/Booking';
import { NextResponse } from 'next/server';

export async function GET() {
  await ConnectDB();
  const tests = await MedicalTest.find().sort({ testDate: -1 });
  return NextResponse.json(tests, { status: 200 });
}

export async function POST(request) {
  await ConnectDB();
  const data = await request.json();
  try {
    const newTest = await MedicalTest.create({
      patientName: data.patientName,
      testType: data.testType,
      testDate: data.testDate,
      resultValue: data.resultValue,
      referenceRange: data.referenceRange,
      status: data.status,
    });
    return NextResponse.json(newTest, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
