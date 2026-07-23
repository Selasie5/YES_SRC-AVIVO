import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Afrovivo International",
  description: "Get in touch with Afrovivo International for talent, communications, and business development support in Africa's energy sector.",
};

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-white text-gray-900 font-[family-name:var(--font-inter-tight)] pt-32 pb-20 px-6">
      <div className="max-w-4xl mx-auto">
        <header className="mb-16">
          <h1 className="text-4xl md:text-5xl font-bold font-[family-name:var(--font-inter-tight)] mb-6">Let's Build the Bridge</h1>
          <p className="text-xl text-gray-700 leading-relaxed max-w-3xl">
            Whether you're hiring, communicating, expanding, or looking to get involved with YEBS — we'd like to hear from you.
          </p>
        </header>

        <div className="grid md:grid-cols-2 gap-16">
          <div>
            <h2 className="text-2xl font-bold mb-8 font-[family-name:var(--font-inter-tight)]">Get in touch</h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold text-gray-900">General enquiries:</h3>
                <a href="mailto:info@afrovivo.com" className="text-blue-600 hover:underline">info@afrovivo.com</a>
              </div>
              
              <div>
                <h3 className="font-semibold text-gray-900">Sponsorship & partnerships:</h3>
                <a href="mailto:partners@afrovivo.com" className="text-blue-600 hover:underline">partners@afrovivo.com</a>
              </div>
              
              <div>
                <h3 className="font-semibold text-gray-900">Talent & recruitment:</h3>
                <a href="mailto:talent@afrovivo.com" className="text-blue-600 hover:underline">talent@afrovivo.com</a>
              </div>
              
              <div className="pt-6 mt-6 border-t border-gray-100">
                <p className="font-semibold text-gray-900 flex items-center">
                  <span className="mr-2">📍</span> Accra, Ghana
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-50 p-8 rounded-xl border border-gray-100">
            <form className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <input type="text" id="name" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-black focus:border-black" />
              </div>
              
              <div>
                <label htmlFor="organisation" className="block text-sm font-medium text-gray-700 mb-1">Organisation</label>
                <input type="text" id="organisation" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-black focus:border-black" />
              </div>
              
              <div>
                <label htmlFor="topic" className="block text-sm font-medium text-gray-700 mb-1">What can we help with?</label>
                <select id="topic" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-black focus:border-black">
                  <option>Talent & Workforce Solutions</option>
                  <option>Corporate Communications</option>
                  <option>Business Development</option>
                  <option>YEBS Sponsorship / Delegate</option>
                  <option>Other</option>
                </select>
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                <textarea id="message" rows={4} className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-black focus:border-black"></textarea>
              </div>
              
              <button type="button" className="w-full bg-black text-white font-semibold py-3 px-6 rounded-md hover:bg-gray-800 transition-colors">
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}
