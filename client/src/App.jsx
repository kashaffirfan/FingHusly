import React, { useState, useEffect } from "react";
import heroImage from "./assets/hero.jpg"; // 👈 put your image inside src/assets folder
import { Search, Home, Shield, MessageCircle, MapPin, Star, Users, TrendingUp, Heart, ChevronRight, Play, Phone, Mail, Instagram, Linkedin, Facebook, Map, Clock } from "lucide-react";

export default function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeFeature, setActiveFeature] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const features = [
    {
      icon: <Search className="w-8 h-8" />,
      title: "Smart Search",
      description: "AI-powered property matching with personalized recommendations based on your preferences.",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Verified Listings",
      description: "Every property is thoroughly verified to ensure authenticity and protect your investment.",
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: <MapPin className="w-8 h-8" />,
      title: "Virtual Tours",
      description: "Explore properties from anywhere with immersive 360° virtual tours and HD photography.",
      color: "from-purple-500 to-pink-500"
    }
  ];

  const stats = [
    { number: "50K+", label: "Properties Listed" },
    { number: "25K+", label: "Happy Customers" },
    { number: "150+", label: "Cities Covered" },
    { number: "98%", label: "Satisfaction Rate" }
  ];

  const socialLinks = [
    {
      icon: <Instagram className="w-6 h-6" />,
      name: "Instagram",
      url: "https://instagram.com/findhusly",
      color: "hover:bg-pink-500"
    },
    {
      icon: <Linkedin className="w-6 h-6" />,
      name: "LinkedIn",
      url: "https://linkedin.com/company/findhusly",
      color: "hover:bg-blue-600"
    },
    {
      icon: <Facebook className="w-6 h-6" />,
      name: "Facebook",
      url: "https://facebook.com/findhusly",
      color: "hover:bg-blue-500"
    }
  ];

  const contactInfo = [
    {
      icon: <Phone className="w-6 h-6" />,
      title: "Phone Number",
      detail: "+1 (555) 123-4567",
      description: "Mon-Fri from 8am to 6pm",
      bgColor: "bg-blue-100",
      iconColor: "text-blue-600",
      hoverColor: "hover:bg-blue-50"
    },
    {
      icon: <Mail className="w-6 h-6" />,
      title: "Email Address",
      detail: "hello@findhusly.com",
      description: "We reply within 24 hours",
      bgColor: "bg-green-100",
      iconColor: "text-green-600",
      hoverColor: "hover:bg-green-50"
    },
    {
      icon: <Map className="w-6 h-6" />,
      title: "Office Location",
      detail: "123 Property Street",
      description: "Real Estate City, RC 10001",
      bgColor: "bg-red-100",
      iconColor: "text-red-600",
      hoverColor: "hover:bg-red-50"
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: "Business Hours",
      detail: "Monday - Friday",
      description: "8:00 AM - 6:00 PM EST",
      bgColor: "bg-purple-100",
      iconColor: "text-purple-600",
      hoverColor: "hover:bg-purple-50"
    }
  ];

  return (
    <div className="flex flex-col text-gray-800 overflow-hidden">
      {/* HERO SECTION */}
      <section
        className="min-h-screen flex flex-col bg-cover bg-center relative text-white"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.6)), url(${heroImage})`,
        }}
      >
        {/* Animated Background Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/30 to-purple-900/30"></div>
        
        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-4 h-4 bg-blue-400 rounded-full animate-pulse"></div>
        <div className="absolute top-40 right-20 w-6 h-6 bg-purple-400 rounded-full animate-bounce"></div>
        <div className="absolute bottom-40 left-20 w-3 h-3 bg-cyan-400 rounded-full animate-pulse"></div>

        {/* Navbar */}
        <nav className={`flex justify-between items-center px-6 md:px-12 py-6 transition-all duration-300 relative z-20 ${
          isScrolled ? 'bg-white/95 backdrop-blur-md shadow-lg' : 'bg-transparent'
        }`}>
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
              <Home className="w-6 h-6 text-white" />
            </div>
            <h1 className={`text-2xl font-bold ${isScrolled ? 'text-gray-900' : 'text-white'}`}>FindHusly</h1>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <a href="#features" className={`font-medium hover:text-blue-400 transition-colors ${
              isScrolled ? 'text-gray-700' : 'text-white'
            }`}>Features</a>
            <a href="#about" className={`font-medium hover:text-blue-400 transition-colors ${
              isScrolled ? 'text-gray-700' : 'text-white'
            }`}>About</a>
            <a href="#contact" className={`font-medium hover:text-blue-400 transition-colors ${
              isScrolled ? 'text-gray-700' : 'text-white'
            }`}>Contact</a>
            <button 
              onClick={() => (window.location.href = "/login")}
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2.5 rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              Get Started
            </button>
          </div>
        </nav>

        {/* Hero Content */}
        <main className="flex-1 flex flex-col items-center justify-center text-center px-6 relative z-10">
          <div className="max-w-4xl mx-auto">
            {/* Badge */}
            <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 mb-8 border border-white/20">
              <Star className="w-4 h-4 text-yellow-400 fill-current" />
              <span className="text-sm font-medium">Trusted by 25,000+ home seekers</span>
              <ChevronRight className="w-4 h-4" />
            </div>

            <h1 className="text-5xl md:text-7xl font-extrabold mb-6 leading-tight">
              Find Your 
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent"> Dream Home </span>
              Today
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-200 max-w-2xl mx-auto mb-10 leading-relaxed">
              Discover perfect properties with AI-powered search, virtual tours, and verified listings. Your journey home starts here.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
              <button
                onClick={() => (window.location.href = "/login")}
                className="group bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-2xl text-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-2xl hover:shadow-2xl transform hover:-translate-y-1 flex items-center space-x-2"
              >
                <span>Explore Properties</span>
                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              
              <button className="group bg-white/10 backdrop-blur-md text-white px-8 py-4 rounded-2xl text-lg font-semibold border border-white/20 hover:bg-white/20 transition-all duration-300 flex items-center space-x-2">
                <Play className="w-5 h-5" />
                <span>Watch Demo</span>
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-2xl mx-auto">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-2xl md:text-3xl font-bold text-white mb-1">{stat.number}</div>
                  <div className="text-sm text-gray-300">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </main>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/70 rounded-full mt-2"></div>
          </div>
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section id="features" className="py-20 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute top-0 left-0 w-72 h-72 bg-blue-100 rounded-full -translate-x-36 -translate-y-36"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-100 rounded-full translate-x-48 translate-y-48"></div>
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
              Why Choose FindHusly?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              We've revolutionized property hunting with cutting-edge technology and user-centric design.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="group relative bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:border-transparent"
                onMouseEnter={() => setActiveFeature(index)}
              >
                {/* Hover Gradient Border */}
                <div className={`absolute inset-0 rounded-3xl bg-gradient-to-r ${feature.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10`}></div>
                
                <div className={`w-16 h-16 mb-6 rounded-2xl bg-gradient-to-r ${feature.color} flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-300`}>
                  {feature.icon}
                </div>
                
                <h3 className="text-2xl font-bold mb-4 text-gray-900 group-hover:text-white transition-colors duration-300">
                  {feature.title}
                </h3>
                
                <p className="text-gray-600 group-hover:text-gray-200 transition-colors duration-300 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>

          {/* Additional Feature Showcase */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-8 md:p-12 text-white text-center">
            <div className="max-w-4xl mx-auto">
              <h3 className="text-3xl md:text-4xl font-bold mb-6">
                Ready to Find Your Perfect Home?
              </h3>
              <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
                Join thousands of satisfied users who found their dream property through FindHusly.
              </p>
              <button
                onClick={() => (window.location.href = "/login")}
                className="bg-white text-blue-600 px-8 py-4 rounded-2xl text-lg font-semibold hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 inline-flex items-center space-x-2"
              >
                <span>Start Your Journey</span>
                <Heart className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT SECTION */}
      <section id="about" className="py-20 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold mb-8 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                Transforming Real Estate with Innovation
              </h2>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                FindHusly was born from a simple vision: to make property hunting effortless, transparent, and enjoyable. 
                We combine advanced technology with human expertise to deliver exceptional experiences.
              </p>
              
              <div className="space-y-4">
                {[
                  "AI-powered property matching algorithm",
                  "Verified listings with quality assurance",
                  "Virtual tours and 3D walkthroughs",
                  "Secure in-platform communication"
                ].map((item, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                      <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-gray-700 font-medium">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="relative">
              {/* Feature Cards Stack */}
              <div className="relative">
                <div className="absolute -top-6 -right-6 w-full h-full bg-gradient-to-br from-blue-100 to-purple-100 rounded-3xl transform rotate-3"></div>
                <div className="absolute -top-3 -right-3 w-full h-full bg-gradient-to-br from-blue-50 to-purple-50 rounded-3xl transform rotate-2"></div>
                <div className="relative bg-white rounded-3xl p-8 shadow-2xl border border-gray-100">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center mb-6">
                    <TrendingUp className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-gray-900">Market Insights</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Get real-time market trends, price analytics, and neighborhood insights to make informed decisions.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-64 h-64 bg-blue-200 rounded-full -translate-x-32 -translate-y-32 opacity-50"></div>
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-purple-200 rounded-full translate-x-40 translate-y-40 opacity-50"></div>
        
        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
              Loved by Home Seekers
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Don't just take our word for it. Here's what our users have to say.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[1, 2, 3].map((item) => (
              <div key={item} className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 group">
                <div className="flex items-center space-x-1 mb-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  "FindHusly made finding our dream home so easy! The virtual tours saved us countless hours, and the verified listings gave us peace of mind."
                </p>
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                    U{item}
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">User {item}</div>
                    <div className="text-sm text-gray-500">Found their home in 2024</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT SECTION */}
      <section id="contact" className="py-20 bg-gradient-to-br from-gray-50 to-white relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
              Get In Touch
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Have questions or ready to get started? We're here to help you find your perfect home.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            {/* Contact Information Grid */}
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              {contactInfo.map((contact, index) => (
                <div 
                  key={index}
                  className={`p-6 bg-white rounded-2xl shadow-lg border border-gray-100 ${contact.hoverColor} transition-all duration-300 hover:shadow-xl group`}
                >
                  <div className="flex items-center space-x-4">
                    <div className={`w-14 h-14 ${contact.bgColor} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                      <div className={contact.iconColor}>
                        {contact.icon}
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">{contact.title}</h3>
                      <p className="text-xl font-bold text-gray-800 mb-1">{contact.detail}</p>
                      <p className="text-sm text-gray-500">{contact.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Social Media Links */}
            <div className="text-center">
              <h3 className="text-2xl font-bold mb-6 text-gray-900">Follow Us on Social Media</h3>
              <p className="text-gray-600 mb-8 max-w-md mx-auto">
                Stay updated with the latest properties, market insights, and success stories.
              </p>
              
              <div className="flex justify-center space-x-6">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-gray-600 shadow-lg transition-all duration-300 ${social.color} hover:text-white hover:scale-110 hover:shadow-xl border border-gray-200`}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="py-20 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Find Your Dream Home?
          </h2>
          <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto">
            Join FindHusly today and experience the future of property hunting. 
            Your perfect home is just a click away.
          </p>
          <button
            onClick={() => (window.location.href = "/login")}
            className="bg-white text-blue-600 px-8 py-4 rounded-2xl text-lg font-semibold hover:bg-gray-100 transition-all duration-300 shadow-2xl hover:shadow-2xl transform hover:-translate-y-1"
          >
            Get Started Free
          </button>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8 mb-12">
            <div>
              <div className="flex items-center space-x-2 mb-6">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                  <Home className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold">FindHusly</h3>
              </div>
              <p className="text-gray-400 leading-relaxed">
                Making property hunting simple, smart, and secure for everyone.
              </p>
            </div>
            
            {['Product', 'Company', 'Support', 'Legal'].map((category) => (
              <div key={category}>
                <h4 className="font-semibold mb-4 text-lg">{category}</h4>
                <ul className="space-y-2 text-gray-400">
                  {['Features', 'Pricing', 'Testimonials', 'Blog'].map((item) => (
                    <li key={item}>
                      <a href="#" className="hover:text-white transition-colors">{item}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          
          <div className="pt-8 border-t border-gray-800 text-center text-gray-400">
            <p>© {new Date().getFullYear()} FindHusly. All rights reserved. Made with ❤️ for home seekers everywhere.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}