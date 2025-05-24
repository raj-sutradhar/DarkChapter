// Contact.jsx
import React from "react";

const Contact = () => {
  return (
    <section className="bg-gray-900 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        <div className="flex flex-col md:flex-row items-center gap-12">
          {/* Contact Form */}
          <div className="md:w-1/2 space-y-6">
            <h2 className="text-3xl sm:text-4xl font-bold text-white">
              Send a Message to the
              <br />
              <span className="bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
                Library Keepers
              </span>
            </h2>

            <form className="space-y-6">
              <div>
                <input
                  type="text"
                  placeholder="Your Name"
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
              <div>
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
              <div>
                <textarea
                  rows="5"
                  placeholder="Your Mystical Message..."
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full md:w-auto bg-purple-600 hover:bg-purple-700 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-300 hover:translate-y-[-2px] hover:shadow-xl hover:shadow-purple-500/30"
              >
                Send Message ✨
              </button>
            </form>
          </div>

          {/* Contact Info */}
          <div className="md:w-1/2 space-y-8 relative">
            <div className="relative rounded-2xl overflow-hidden bg-gray-800 p-8 border border-purple-900/30">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-900/20 to-pink-900/10"></div>

              <div className="space-y-6 relative z-10">
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-purple-900/30 rounded-lg">
                    <svg
                      className="w-6 h-6 text-purple-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-white font-semibold">Email Us</h3>
                    <p className="text-purple-400">keepers@mysticlib.com</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-purple-900/30 rounded-lg">
                    <svg
                      className="w-6 h-6 text-purple-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-white font-semibold">Find Us</h3>
                    <p className="text-purple-400">
                      123 Arcane Street, Library District
                    </p>
                  </div>
                </div>

                <div className="mt-8 border-t border-purple-900/30 pt-8">
                  <div className="flex -space-x-2">
                    {["Aang", "Katara", "Zuko"].map((name) => (
                      <img
                        key={name}
                        src={`https://api.dicebear.com/7.x/avataaars-neutral/svg?seed=${name}`}
                        alt="Keeper"
                        className="w-10 h-10 rounded-full border-2 border-gray-800"
                      />
                    ))}
                  </div>
                  <p className="text-gray-400 mt-4">
                    Our team of library keepers is ready to assist you with any
                    inquiry
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
