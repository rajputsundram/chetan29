'use client';

import { useState } from 'react';
import Head from 'next/head';
import Script from 'next/script';

declare global {
  interface Window {
    Razorpay: any;
  }
}

const DonationPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    amount: '',
    message: '',
  });

  const [isCustomAmount, setIsCustomAmount] = useState(false);
  const [selectedAmount, setSelectedAmount] = useState(''); // track select separately

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setSelectedAmount(value);
    if (value === 'custom') {
      setIsCustomAmount(true);
      setFormData((prev) => ({ ...prev, amount: '' }));
    } else {
      setIsCustomAmount(false);
      setFormData((prev) => ({ ...prev, amount: value }));
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePayment = (e: React.FormEvent) => {
    e.preventDefault();

    const amount = parseInt(formData.amount);
    if (!amount || amount < 1) {
      alert('Enter a valid amount');
      return;
    }

    const options = {
      key: 'rzp_test_76hyNElv5LYWaS', // Replace with your actual Razorpay Test Key
      amount: amount * 100, // Amount in paise
      currency: 'INR',
      name: 'Healing Hands Clinic',
      description: formData.message || 'Donation to the clinic',
      handler: function (response: any) {
        alert('✅ Payment Successful! ID: ' + response.razorpay_payment_id);
        console.log('Donor:', formData);
        console.log('Razorpay Response:', response);
      },
      prefill: {
        name: formData.name,
        email: 'user@example.com',
        contact: '',
      },
      notes: {
        message: formData.message,
      },
      theme: {
        color: '#16a34a',
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  return (
    <>
      <Head>
        <title>Donate to the Clinic</title>
      </Head>

      {/* Load Razorpay script */}
      <Script
        src="https://checkout.razorpay.com/v1/checkout.js"
        strategy="afterInteractive"
      />

      <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
        <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md">
          <h1 className="text-3xl font-bold text-center text-green-700 mb-6">
            Support Our Clinic 🙌
          </h1>

          <form onSubmit={handlePayment} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-800 mb-1">
                Name
              </label>
              <input
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Enter your name"
                className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-800 mb-1">
                Donation Amount (₹)
              </label>
              <select
                name="amount-select"
                value={selectedAmount}
                onChange={handleSelectChange}
                className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <option value="" disabled>
                  Select an amount
                </option>
                <option value="50">₹50</option>
                <option value="100">₹100</option>
                <option value="500">₹500</option>
                <option value="1000">₹1000</option>
                <option value="2000">₹2000</option>
                <option value="custom">Custom amount</option>
              </select>

              {isCustomAmount && (
                <input
                  type="number"
                  name="amount"
                  required
                  min="1"
                  value={formData.amount}
                  onChange={handleInputChange}
                  placeholder="Enter custom amount"
                  className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-2 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-800 mb-1">
                Message (Optional)
              </label>
              <textarea
                name="message"
                rows={3}
                value={formData.message}
                onChange={handleInputChange}
                placeholder="Type a message..."
                className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500"
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded-lg transition text-lg"
            >
              Donate Now
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-gray-600">
            Every contribution matters. Thank you 💚
          </p>
        </div>
      </div>
    </>
  );
};

export default DonationPage;
