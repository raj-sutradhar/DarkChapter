// About.jsx
import React from "react";

const About = () => {
  return (
    <section className="bg-gray-900 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        <div className="flex flex-col md:flex-row items-center gap-12">
          {/* Image Section */}
          <div className="md:w-1/2 relative">
            <div className="relative rounded-2xl overflow-hidden transform transition-all duration-500 hover:rotate-[1deg]">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-900/40 to-pink-900/30"></div>
              <img
                src="https://images.unsplash.com/photo-1532012197267-da84d127e765?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
                alt="Ancient Library"
                className="w-full h-[400px] object-cover object-center"
                loading="lazy"
              />

              {/* Floating Badge */}
              <div className="absolute top-4 left-4 bg-gray-900/80 backdrop-blur-sm p-3 rounded-lg border border-purple-900/30">
                <span className="text-purple-400 text-sm">Est. 1482</span>
              </div>
            </div>
          </div>

          {/* Content Section */}
          <div className="md:w-1/2 space-y-6">
            <h2 className="text-3xl sm:text-4xl font-bold text-white">
              Guardians of
              <br />
              <span className="bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
                Timeless Knowledge
              </span>
            </h2>

            <p className="text-gray-400 text-lg">
              For centuries, we've curated the world's most extraordinary
              collection of mystical texts and modern literature. Our mission is
              to preserve and share knowledge that transcends time and space.
            </p>

            <div className="grid grid-cols-2 gap-4 mt-8">
              {[
                { number: "50K+", label: "Ancient Tomes" },
                { number: "120+", label: "Languages" },
                { number: "800+", label: "Secret Collections" },
                { number: "24/7", label: "Access" },
              ].map((stat, index) => (
                <div
                  key={index}
                  className="p-4 bg-gray-800/50 rounded-lg border border-purple-900/30"
                >
                  <div className="text-2xl font-bold text-purple-400">
                    {stat.number}
                  </div>
                  <div className="text-gray-400 text-sm mt-1">{stat.label}</div>
                </div>
              ))}
            </div>

            <div className="mt-8 pt-6 border-t border-purple-900/30">
              <div className="flex items-center space-x-4">
                <div className="flex -space-x-2">
                  {["Merlin", "Gandalf", "Dumbledore"].map((name) => (
                    <img
                      key={name}
                      src={`https://api.dicebear.com/7.x/avataaars-neutral/svg?seed=${name}`}
                      alt="Archivist"
                      className="w-10 h-10 rounded-full border-2 border-gray-800"
                    />
                  ))}
                </div>
                <p className="text-gray-400">
                  Protected by legendary archivists through the ages
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
