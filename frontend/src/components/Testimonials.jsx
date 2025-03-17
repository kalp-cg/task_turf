import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, Autoplay, EffectCoverflow } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-coverflow";
import { Quote } from "lucide-react";
import { motion } from "framer-motion";

const testimonials = [
  { 
    name: "Anita Mehta", 
    role: "Homeowner",
    review: "The plumber was prompt, professional, and fixed our leaking pipe in no time. TaskTurf made the entire process seamless.",
    rating: 5,
    image: "https://randomuser.me/api/portraits/women/44.jpg"
  },
  { 
    name: "Rahul Verma", 
    role: "Small Business Owner",
    review: "I've used TaskTurf for various office maintenance needs. The workers are skilled, reliable, and always deliver quality service.",
    rating: 5,
    image: "https://randomuser.me/api/portraits/men/44.jpg"
  },
  { 
    name: "Sneha Reddy", 
    role: "Working Professional",
    review: "The cleaning service exceeded my expectations. My apartment has never been this spotless! I'll definitely book again.",
    rating: 4,
    image: "https://randomuser.me/api/portraits/women/24.jpg"
  },
  { 
    name: "Vikram Singh",
    role: "Property Manager",
    review: "Managing multiple properties is so much easier with TaskTurf. I can quickly find qualified workers for any maintenance issue.",
    rating: 5,
    image: "https://randomuser.me/api/portraits/men/24.jpg"
  },
  { 
    name: "Priya Sharma",
    role: "Event Organizer",
    review: "Their team helped transform our event space beautifully. The decorators were creative and worked efficiently against tight deadlines.",
    rating: 5,
    image: "https://randomuser.me/api/portraits/women/64.jpg"
  },
  { 
    name: "Aman Gupta",
    role: "Software Engineer",
    review: "The carpenter fixed my broken desk perfectly. Quick and efficient work! Highly recommend TaskTurf.",
    rating: 4,
    image: "https://randomuser.me/api/portraits/men/34.jpg"
  },
  { 
    name: "Neha Kapoor",
    role: "Interior Designer",
    review: "TaskTurf's painting service completely revamped my home. The team paid attention to detail and was extremely courteous.",
    rating: 5,
    image: "https://randomuser.me/api/portraits/women/54.jpg"
  },
  { 
    name: "Arjun Nair",
    role: "Gym Owner",
    review: "The electrical repairs were handled quickly and safely. TaskTurf's professionals know their craft well!",
    rating: 4,
    image: "https://randomuser.me/api/portraits/men/54.jpg"
  },
  { 
    name: "Ritu Malhotra",
    role: "Cafe Owner",
    review: "The handyman I hired through TaskTurf fixed multiple issues in my cafe without any hassle. Great experience!",
    rating: 5,
    image: "https://randomuser.me/api/portraits/women/74.jpg"
  },
  { 
    name: "Manoj Kumar",
    role: "Freelancer",
    review: "I needed urgent plumbing repairs, and TaskTurf delivered beyond my expectations. Fantastic service!",
    rating: 5,
    image: "https://randomuser.me/api/portraits/men/64.jpg"
  }
];


const TestimonialCard = ({ testimonial }) => {
  const stars = Array(5).fill(0).map((_, i) => (
    <svg 
      key={i}
      className={`w-5 h-5 transition-transform duration-300 ${i < testimonial.rating ? "text-yellow-400" : "text-gray-300"}`}
      fill="currentColor" 
      viewBox="0 0 20 20"
      style={{ transform: i < testimonial.rating ? 'scale(1.1)' : 'scale(1)' }}
    >
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
  ));

  return (
    <motion.div 
      className="bg-white rounded-3xl shadow-xl p-8 relative h-[400px] flex flex-col hover:scale-[1.02] transition-transform duration-300"
      whileHover={{ scale: 1.02 }}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <div className="absolute -top-6 -right-6 transform rotate-12">
        <div className="bg-gradient-to-br from-[#F4A261] to-[#E9C46A] p-4 rounded-2xl shadow-lg">
          <Quote size={32} className="text-white" />
        </div>
      </div>
      
      <div className="flex mb-4 gap-1">
        {stars}
      </div>
      
      <p className="text-gray-700 mb-6 italic flex-grow">"{testimonial.review}"</p>
      
      <div className="mt-4 pt-4 border-t border-gray-100">
        <div className="flex items-center gap-4">
          <img 
            src={testimonial.image} 
            alt={testimonial.name}
            className="w-12 h-12 rounded-full ring-2 ring-[#F4A261] object-cover"
          />
          <div>
            <h4 className="text-xl font-bold text-gray-800">{testimonial.name}</h4>
            <p className="text-gray-500">{testimonial.role}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const TestimonialsCarousel = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="container mx-auto px-6">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h2 className="text-5xl font-bold mb-4 text-[#0D1B2A] drop-shadow-sm">What Our Customers Say</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-[#F4A261] to-[#E9C46A] mx-auto rounded-full mb-6"></div>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Over 10,000+ satisfied customers trust TaskTurf for their home and business service needs
          </p>
        </motion.div>

        <div className="max-w-7xl mx-auto">
          <Swiper
            modules={[Pagination, Navigation, Autoplay, EffectCoverflow]}
            spaceBetween={30}
            slidesPerView={1}
            pagination={{
              clickable: true,
              bulletClass: 'swiper-pagination-bullet bg-gray-300 w-3 h-3 rounded-full mx-2',
              bulletActiveClass: 'bg-[#F4A261] scale-125'
            }}
            navigation={{
              nextEl: '.swiper-button-next',
              prevEl: '.swiper-button-prev',
              disabledClass: 'opacity-30'
            }}
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            effect="coverflow"
            coverflowEffect={{
              rotate: 0,
              stretch: 0,
              depth: 200,
              modifier: 2.5,
              slideShadows: false
            }}
            breakpoints={{
              640: { slidesPerView: 1 },
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
              1440: { slidesPerView: 4 }
            }}
            className="pb-16"
          >
            {testimonials.map((testimonial, index) => (
              <SwiperSlide key={index}>
                <TestimonialCard testimonial={testimonial} />
              </SwiperSlide>
            ))}
            
            <div className="swiper-button-prev group">
              <svg 
                className="w-10 h-10 text-gray-500 group-hover:text-[#F4A261] transition-colors duration-300"
                fill="none" 
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </div>
            <div className="swiper-button-next group">
              <svg 
                className="w-10 h-10 text-gray-500 group-hover:text-[#F4A261] transition-colors duration-300"
                fill="none" 
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </Swiper>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsCarousel;