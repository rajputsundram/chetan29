import React from "react";
import Head from "next/head";

const PrivacyPolicy: React.FC = () => {
  return (
    <>
      <Head>
        <title>Privacy Policy - SwastikCare</title>
        <meta name="description" content="Privacy policy for SwastikCare explaining data handling and user rights." />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-green-50 to-white py-12 px-6">
        <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-2xl p-8 md:p-12 border border-gray-200">
          <h1 className="text-4xl font-bold text-green-700 mb-6 text-center">Privacy Policy</h1>
          <p className="text-gray-600 mb-6 text-center">
            Your privacy is important to us at <strong>SwastikCare</strong>. This policy explains how we handle your data.
          </p>

          <div className="space-y-8 text-gray-700 leading-relaxed">
            <section>
              <h2 className="text-2xl font-semibold text-green-600 mb-2">1. Information We Collect</h2>
              <p>We may collect the following types of personal information:</p>
              <ul className="list-disc pl-6 mt-2">
                <li>Contact Information (name, email address, phone number)</li>
                <li>Demographic Information (age, gender, location)</li>
                <li>Health Information (vaccination records, medical history)</li>
                <li>Device Information (IP address, browser type, device ID)</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-green-600 mb-2">2. How We Use Your Information</h2>
              <p>We use the collected information for the following purposes:</p>
              <ul className="list-disc pl-6 mt-2">
                <li>To provide and personalize our services</li>
                <li>To communicate with you about your account and our services</li>
                <li>To improve our website and user experience</li>
                <li>To comply with legal and regulatory requirements</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-green-600 mb-2">3. Data Sharing and Disclosure</h2>
              <p>We do not sell or rent your personal information to third parties. However, we may share your information with:</p>
              <ul className="list-disc pl-6 mt-2">
                <li>Service providers who assist us in delivering our services</li>
                <li>Government authorities when required by law</li>
                <li>Third parties with your explicit consent</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-green-600 mb-2">4. Data Security</h2>
              <p>
                We implement appropriate security measures to protect your personal information from unauthorized access, alteration, disclosure, or destruction.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-green-600 mb-2">5. Your Rights</h2>
              <p>
                You have the right to access, update, or delete your personal information. You may also opt-out of receiving promotional communications from us.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-green-600 mb-2">6. Changes to the Privacy Policy</h2>
              <p>
                We may update this privacy policy from time to time. Any changes will be posted on this page with an updated effective date.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-green-600 mb-2">7. Contact Us</h2>
              <p>
                If you have any questions or concerns about this privacy policy, please contact us at{" "}
                <a href="mailto:support@swastikcare.com" className="text-green-700 underline">
                  support@swastikcare.com
                </a>.
              </p>
            </section>
          </div>
        </div>
      </div>
    </>
  );
};

export default PrivacyPolicy;
