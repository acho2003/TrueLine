
import React { useState } from "react";
// --- MODIFIED: FaUser is now imported ---
import { FaStar, FaArrowLeft, FaArrowRight, FaUser } from "react-icons/fa";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css"; // Import the slider's CSS

// --- STATIC DATA: imageUrl has been removed ---
const testimonials = [
  {
    _id: "1",
    name: "Sarah J.",
    location: "Seattle, WA",
    rating: 5,
    reviewText: "TrueLine transformed our backyard! The team was professional, efficient, and the quality of their work on our new fence is outstanding. Highly recommended!",
  },
  {
    _id: "2",
    name: "Michael B.",
    location: "Bellevue, WA",
    rating: 5,
    reviewText: "From the initial quote to the final cleanup, the entire process was seamless. Our lawn has never looked better. A truly professional service.",
  },
  {
    _id: "3",
    name: "Emily R.",
    location: "Kirkland, WA",
    rating: 5,
    reviewText: "They listened to our vision and executed it perfectly. The attention to detail is what sets them apart. We are so happy with the results!",
  },
  {
    _id: "4",
    name: "David L.",
    location: "Redmond, WA",
    rating: 4,
    reviewText: "A fantastic job on our garden maintenance. The team is always on time and does great work. Our yard looks neat and tidy all year round.",
  },
];

// A small helper component to render the star ratings dynamically
const StarRating: React.FC<{ rating: number }> = ({ rating }) => {
  return (
    <div className="flex items-center space-x-1">
      {[...Array(5)].map((_, index) => (
        <FaStar
          key={index}
          className={index < rating ? 'text-yellow-400' : 'text-gray-300'}
          size={18}
        />
      ))}
    </div>
  );
};


const TestimonialsSection: React.FC = () => {
  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
    breakpoints: {
      "(min-width: 768px)": { slides: { perView: 2, spacing: 30 } },
      "(min-width: 1200px)": { slides: { perView: 3, spacing: 30 } },
    },
    loop: true,
    initial: 0,
  });

  return (
    <section className="bg-white py-20 lg:py-28">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div
          className="text-center mb-12"
          data-aos="fade-up"
          data-aos-duration="1000"
        >
          <p className="text-lg font-semibold text-secondary font-montserrat">
            TESTIMONIALS
          </p>
          <h2 className="text-3xl md:text-4xl text-primary font-bold font-montserrat mt-1">
            What Our Customers Say
          </h2>
        </div>

        {/* Slider Content */}
        <div className="relative">
          <div ref={sliderRef} className="keen-slider">
            {testimonials.map((testimonial, index) => (
              <div key={testimonial._id} className="keen-slider__slide p-2">
                <div data-aos="fade-up" data-aos-duration="1000" data-aos-delay={index * 100}>
                  {/* Speech Bubble Card */}
                  <div className="bg-gray-50 p-8 relative rounded-none 
                                before:absolute before:w-6 before:h-6 before:bg-gray-50 
                                before:rotate-45 before:left-12 before:-bottom-3">
                    <StarRating rating={testimonial.rating} />
                    <p className="font-open-sans text-base text-gray-600 leading-relaxed mt-6">
                      "{testimonial.reviewText}"
                    </p>
                  </div>
                  {/* Reviewer Info */}
                  <div className="flex items-center mt-10">
                    {/* --- MODIFIED: Replaced <img> with a styled div and FaUser icon --- */}
                    <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0">
                      <FaUser className="text-gray-400 text-3xl" />
                    </div>
                    <div className="ml-5">
                      <h4 className="text-xl text-primary font-bold font-montserrat">
                        {testimonial.name}
                      </h4>
                      <p className="text-base text-gray-500 font-open-sans">
                        {testimonial.location}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Arrow Navigation */}
          {instanceRef.current && testimonials.length > 1 && (
            <div className="flex items-center justify-end gap-4 mt-8">
              <button
                onClick={() => instanceRef.current?.prev()}
                className="w-12 h-12 flex items-center justify-center rounded-full border-2 border-primary text-primary hover:bg-primary hover:text-white transition-all duration-300"
                aria-label="Previous testimonial"
              >
                <FaArrowLeft size={20} />
              </button>
              <button
                onClick={() => instanceRef.current?.next()}
                className="w-12 h-12 flex items-center justify-center rounded-full border-2 border-primary text-primary hover:bg-primary hover:text-white transition-all duration-300"
                aria-label="Next testimonial"
              >
                <FaArrowRight size={20} />
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;