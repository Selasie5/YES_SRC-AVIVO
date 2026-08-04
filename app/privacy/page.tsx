import React from 'react';

export const metadata = {
  title: 'Privacy Policy | Afrovivo',
  description: 'Privacy Policy for Afrovivo',
};

export default function PrivacyPolicyPage() {
  return (
    <div className="bg-white min-h-screen pt-32 pb-24 px-6 md:px-12 lg:px-24">
      <div className="max-w-3xl mx-auto font-[family-name:var(--font-inter-tight)]">
        <h1 className="text-4xl md:text-5xl font-medium tracking-tight text-gray-900 mb-8">
          Privacy Policy
        </h1>
        <p className="text-sm text-gray-500 mb-12">Last updated: [Date]</p>
        
        <div className="prose prose-gray max-w-none text-gray-700 leading-relaxed space-y-6">
          <p>
            [Insert your Privacy Policy content here. This page is currently a placeholder for the official Privacy Policy.]
          </p>
          
          <h2 className="text-2xl font-semibold text-gray-900 mt-12 mb-4">1. Information We Collect</h2>
          <p>
            [Details about information collection]
          </p>

          <h2 className="text-2xl font-semibold text-gray-900 mt-12 mb-4">2. How We Use Your Information</h2>
          <p>
            [Details about information usage]
          </p>

          <h2 className="text-2xl font-semibold text-gray-900 mt-12 mb-4">3. Data Security</h2>
          <p>
            [Details about data security practices]
          </p>

          <h2 className="text-2xl font-semibold text-gray-900 mt-12 mb-4">4. Contact Us</h2>
          <p>
            If you have any questions about this Privacy Policy, please contact us at:
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
