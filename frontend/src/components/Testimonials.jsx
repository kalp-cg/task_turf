// TestimonialsCarousel.js
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { FaQuoteLeft, FaQuoteRight } from "react-icons/fa";

const TestimonialsCarousel = () => {
  const testimonials = [
    { name: 'Anita Mehta', review: 'Great service! The plumber was very professional and fixed the issue quickly.' },
    { name: 'Rahul Verma', review: 'Highly recommend Aapki for home services. The workers are skilled and reliable.' },
    { name: 'Sneha Reddy', review: 'The cleaning service was excellent. My house has never been this clean!' },
  ];

  return (
    <section className="bg-gray-50 py-16 text-center">
      <h3 className="text-3xl font-bold text-gray-800 mb-8">What Our Customers Say</h3>
      <Swiper
        modules={[Pagination, Navigation]}
        spaceBetween={30}
        slidesPerView={1}
        pagination={{ clickable: true }}
        navigation
        breakpoints={{
          640: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
        className="px-4"
      >
        {testimonials.map((testimonial) => (
          <SwiperSlide key={testimonial.name}>
            <div className="p-6 rounded-lg shadow-sm hover:shadow-md transition duration-300 cursor-pointer bg-white">
              <FaQuoteLeft className="text-gray-400 mx-auto" />
              <p className="text-gray-600 mt-4">{testimonial.review}</p>
              <FaQuoteRight className="text-gray-400 mx-auto mt-4" />
              <h4 className="text-xl font-semibold text-gray-800 mt-4">{testimonial.name}</h4>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default TestimonialsCarousel;