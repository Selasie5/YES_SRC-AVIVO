import React from 'react';

export const metadata = {
  title: 'Terms of Service | Afrovivo',
  description: 'Terms of Service for Afrovivo',
};

export default function TermsOfServicePage() {
  return (
    <div className="bg-white min-h-screen pt-32 pb-24 px-6 md:px-12 lg:px-24">
      <div className="max-w-3xl mx-auto font-[family-name:var(--font-inter-tight)]">
        <h1 className="text-4xl md:text-5xl font-medium tracking-tight text-gray-900 mb-8">
          Terms of Service
        </h1>
        <p className="text-sm text-gray-500 mb-12">Last updated: [Date]</p>
        
        <div className="prose prose-gray max-w-none text-gray-700 leading-relaxed space-y-6">
          <p>
            [Insert your Terms of Service content here. This page is currently a placeholder for the official Terms of Service.]
          </p>
          
          <h2 className="text-2xl font-semibold text-gray-900 mt-12 mb-4">1. Acceptance of Terms</h2>
          <p>
            [Details about acceptance of terms]
          </p>

          <h2 className="text-2xl font-semibold text-gray-900 mt-12 mb-4">2. Use of Services</h2>
          <p>
            [Details about usage rules and restrictions]
          </p>

          <h2 className="text-2xl font-semibold text-gray-900 mt-12 mb-4">3. Intellectual Property</h2>
          <p>
            [Details about intellectual property rights]
          </p>

          <h2 className="text-2xl font-semibold text-gray-900 mt-12 mb-4">4. Contact Us</h2>
          <p>
            If you have any questions about these Terms, please contact us at:
            <br />
            Email: [Your Contact Email]
            <br />
            Address: [Your Address]
          </p>
        </div>
      </div>
    </div>
  );
}
