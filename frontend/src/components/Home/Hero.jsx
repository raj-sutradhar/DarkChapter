import React from "react";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
          {/* Text Content - Mobile First */}
          <div className="md:w-1/2 space-y-4 md:space-y-6 order-1">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight">
              Enter the Realm of
              <br />
              <span className="bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
                Infinite Stories
              </span>
            </h1>

            <p className="text-gray-400 text-base md:text-lg">
              Discover 50,000+ mystical tomes and modern masterpieces in our
              enchanted collection. Where every book is a portal to another
              world.
            </p>

            <Link
              to={"/books"}
              className="w-full md:w-auto bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 md:px-8 md:py-4 rounded-lg text-base md:text-lg font-semibold transition-all duration-300 hover:translate-y-[-2px] hover:shadow-xl hover:shadow-purple-500/30"
            >
              Browse all Books →
            </Link>

            <div className="flex flex-col md:flex-row items-center space-y-3 md:space-y-0 md:space-x-4 pt-4 mt-5">
              <div className="flex -space-x-2">
                <img
                  src="https://api.dicebear.com/7.x/avataaars-neutral/svg?seed=Haku"
                  alt="Reader"
                  className="w-8 h-8 md:w-10 md:h-10 rounded-full border-2 border-gray-800"
                />
                <img
                  src="https://api.dicebear.com/7.x/avataaars-neutral/svg?seed=Chihiro"
                  alt="Reader"
                  className="w-8 h-8 md:w-10 md:h-10 rounded-full border-2 border-gray-800"
                />
                <img
                  src="https://api.dicebear.com/7.x/avataaars-neutral/svg?seed=Totoro"
                  alt="Reader"
                  className="w-8 h-8 md:w-10 md:h-10 rounded-full border-2 border-gray-800"
                />
              </div>
              <p className="text-gray-400 text-sm md:text-base text-center md:text-left">
                Trusted by 50k+ literary adventurers
              </p>
            </div>
          </div>

          {/* Image Section */}
          <div className="md:w-1/2 relative w-full order-2">
            <div className="relative rounded-2xl overflow-hidden transform transition-all duration-500 md:hover:rotate-[1deg] hover:shadow-2xl hover:shadow-purple-900/50">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-900/40 to-pink-900/30"></div>
              <img
                src="https://images.unsplash.com/photo-1589998059171-988d887df646?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
                alt="Mystical book collection"
                className="w-full h-[300px] md:h-[500px] object-cover object-center"
                loading="lazy"
              />

              {/* Animated Floating Book */}
              <div className="absolute top-4 right-4 md:top-8 md:right-8 animate-float">
                <svg
                  className="w-12 h-12 md:w-16 md:h-16 rotate-12 text-purple-400 filter drop-shadow-lg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>

              {/* Featured Book Card */}
              <div className="absolute bottom-4 left-4 md:bottom-8 md:left-8 bg-gray-900/80 backdrop-blur-sm p-3 md:p-4 rounded-lg border border-purple-900/30">
                <h3 className="text-white font-semibold text-sm md:text-base">
                  Weekly Gem
                </h3>
                <p className="text-purple-400 text-xs md:text-sm mt-1">
                  "The Atlas of Forgotten Lore"
                </p>
                <div className="mt-1 md:mt-2 flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className="w-3 h-3 md:w-4 md:h-4 text-yellow-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0% {
            transform: translateY(0px) rotate(12deg);
          }
          50% {
            transform: translateY(-12px) rotate(12deg);
          }
          100% {
            transform: translateY(0px) rotate(12deg);
          }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }

        @media (max-width: 768px) {
          .animate-float {
            animation: float 4s ease-in-out infinite;
          }
        }
      `}</style>
    </section>
  );
};

export default Hero;
