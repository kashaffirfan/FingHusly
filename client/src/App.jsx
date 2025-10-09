import React from "react";
import heroImage from "./assets/hero.jpg"; // 👈 put your image inside src/assets folder

export default function App() {
  return (
    <div className="flex flex-col text-gray-800">
      {/* HERO SECTION (with background) */}
      <section
        className="min-h-screen flex flex-col bg-cover bg-center relative text-white"
        style={{
          backgroundImage: `url(${heroImage})`,
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/40"></div>

        {/* Navbar */}
        <nav className="flex justify-between items-center px-10 py-6 bg-white/80 backdrop-blur-md relative z-10">
          <h1 className="text-2xl font-bold text-gray-900">FindHusly</h1>
          <div className="space-x-6">
            <a href="#features" className="hover:text-blue-600">
              Features
            </a>
            <a href="#about" className="hover:text-blue-600">
              About
            </a>
            <a href="#contact" className="hover:text-blue-600">
              Contact
            </a>
            <button onClick={() => (window.location.href = "/login")}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
            Get Started
          </button>

          </div>
        </nav>

        {/* Hero Content */}
        <main className="flex-1 flex flex-col items-center justify-center text-center px-6 relative z-10">
          <h2 className="text-5xl font-extrabold mb-6 leading-tight text-white drop-shadow-lg">
            Find your <span className="text-blue-300">perfect home</span> easily.
          </h2>
          <p className="text-lg text-gray-100 max-w-xl mb-10">
            Discover the best properties in your city with our smart search and verified listings.
          </p>
          <button
  onClick={() => (window.location.href = "/login")}
  className="bg-blue-600 text-white px-6 py-3 rounded-lg text-lg hover:bg-blue-700 transition shadow-lg"
>
  Explore Homes
    </button>
        </main>
      </section>

      {/* ABOUT SECTION */}
      <section
        id="about"
        className="bg-white py-20 px-6 md:px-16 lg:px-32 text-center"
      >
        <h2 className="text-4xl font-bold mb-6 text-gray-800">About FindHusly</h2>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
          FindHusly is your trusted platform for discovering verified, high-quality
          rental and sale properties across the country. Whether you're finding your
          first apartment or your dream home, we make the search process simple, secure,
          and transparent.
        </p>

        <div className="mt-12 grid md:grid-cols-3 gap-8">
          <div className="p-6 bg-gray-50 rounded-2xl shadow-sm hover:shadow-md transition">
            <h3 className="text-xl font-semibold mb-2 text-blue-600">
              Verified Listings
            </h3>
            <p className="text-gray-600">
              Every property on FindHusly is verified to ensure authenticity and safety.
            </p>
          </div>

          <div className="p-6 bg-gray-50 rounded-2xl shadow-sm hover:shadow-md transition">
            <h3 className="text-xl font-semibold mb-2 text-blue-600">
              Smart Search
            </h3>
            <p className="text-gray-600">
              Filter and sort properties by location, price, amenities, and more — instantly.
            </p>
          </div>

          <div className="p-6 bg-gray-50 rounded-2xl shadow-sm hover:shadow-md transition">
            <h3 className="text-xl font-semibold mb-2 text-blue-600">
              Easy Contact
            </h3>
            <p className="text-gray-600">
              Connect directly with owners or agents through our secure in-app messaging.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50" id="features">
  <div className="max-w-6xl mx-auto px-6 text-center">
    <h2 className="text-3xl md:text-4xl font-bold mb-8 text-gray-800">
      Our Key Features
    </h2>
    <p className="text-gray-600 max-w-2xl mx-auto mb-16">
      Designed to simplify your experience — find your ideal place faster, easier, and smarter.
    </p>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {/* Feature 1 */}
      <div className="p-8 bg-white rounded-2xl shadow-md hover:shadow-lg transition">
        <div className="w-16 h-16 mx-auto mb-4 bg-indigo-100 text-indigo-600 flex items-center justify-center rounded-full text-2xl font-bold">
          🏠
        </div>
        <h3 className="text-xl font-semibold mb-3 text-gray-800">Smart Search</h3>
        <p className="text-gray-600">
          Filter by price, location, and style — get personalized matches instantly.
        </p>
      </div>

      {/* Feature 2 */}
      <div className="p-8 bg-white rounded-2xl shadow-md hover:shadow-lg transition">
        <div className="w-16 h-16 mx-auto mb-4 bg-green-100 text-green-600 flex items-center justify-center rounded-full text-2xl font-bold">
          🧭
        </div>
        <h3 className="text-xl font-semibold mb-3 text-gray-800">Interactive Map</h3>
        <p className="text-gray-600">
          Explore neighborhoods and find nearby shops, parks, and schools.
        </p>
      </div>

      {/* Feature 3 */}
      <div className="p-8 bg-white rounded-2xl shadow-md hover:shadow-lg transition">
        <div className="w-16 h-16 mx-auto mb-4 bg-pink-100 text-pink-600 flex items-center justify-center rounded-full text-2xl font-bold">
          🔔
        </div>
        <h3 className="text-xl font-semibold mb-3 text-gray-800">Instant Alerts</h3>
        <p className="text-gray-600">
          Get notified the moment new listings match your preferences.
        </p>
      </div>
    </div>
  </div>
</section>

<section className="py-20 bg-white" id="contact">
  <div className="max-w-6xl mx-auto px-6 text-center">
    <h2 className="text-3xl md:text-4xl font-bold mb-8 text-gray-800">
      Get in Touch
    </h2>
    <p className="text-gray-600 max-w-2xl mx-auto mb-12">
      Have questions or want to collaborate? We’d love to hear from you.  
      Fill out the form below and we’ll get back to you soon.
    </p>

    <form className="max-w-3xl mx-auto text-left space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <input
          type="text"
          placeholder="Your Name"
          className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
        />
        <input
          type="email"
          placeholder="Your Email"
          className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
        />
      </div>

      <textarea
        rows="5"
        placeholder="Your Message"
        className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
      ></textarea>

      <div className="text-center">
        <button
          type="submit"
          className="px-8 py-3 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition font-medium"
        >
          Send Message
        </button>
      </div>
    </form>

    <div className="mt-16 text-gray-500">
      <p>Email: <span className="text-gray-800 font-medium">support@findhusly.com</span></p>
      <p>Phone: <span className="text-gray-800 font-medium">+1 (234) 567-890</span></p>
    </div>
  </div>
</section>


      {/* FOOTER */}
      <footer className="py-6 text-center text-gray-500 text-sm bg-gray-100">
        © {new Date().getFullYear()} FindHusly. All rights reserved.
      </footer>
    </div>
  );
}
