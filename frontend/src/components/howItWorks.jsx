// import React from "react";

// const HowItWorks = () => {
//   return (
//     <section id="how-it-works" className="bg-gray-50 py-16 text-center">
//       <h3 className="text-3xl font-bold text-gray-800 mb-8">How It Works</h3>
//       <div className="flex justify-center gap-8 flex-wrap px-4">
//         {[
//           { title: 'Post a Request', description: 'Describe the service you need and your location.' },
//           { title: 'Get Matched', description: 'We connect you with trusted workers in your area.' },
//           { title: 'Work Done & Payment', description: 'The worker completes the job, and you pay securely.' },
//         ].map((step, index) => (
//           <div key={index} className="p-6  rounded-lg shadow-lg hover:shadow-2xl transition duration-300 cursor-pointer bg-white w-72 transform hover:scale-105">
//             <h4 className="text-xl font-semibold text-gray-800 mb-4">{step.title}</h4>
//             <p className="text-gray-600">{step.description}</p>
//           </div>
//         ))}
//       </div>
//     </section>
//   );
// };

// export default HowItWorks;


import React from "react";
import { ClipboardList, Users, CheckCircle } from "lucide-react"; // Icons for better visuals

const steps = [
  {
    title: "Post a Request",
    description: "Describe the service you need, provide details, and set your location to get relevant matches.",
    icon: <ClipboardList size={40} className="text-blue-500" />,
  },
  {
    title: "Get Matched",
    description: "We connect you with verified and skilled professionals in your area who can handle your request.",
    icon: <Users size={40} className="text-green-500" />,
  },
  {
    title: "Job Done & Payment",
    description: "Once the worker completes the job to your satisfaction, you can pay securely through our platform.",
    icon: <CheckCircle size={40} className="text-purple-500" />,
  },
];

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="bg-gray-50 py-20 text-center">
      <h3 className="text-4xl font-extrabold text-gray-800 mb-10 tracking-wide">How It Works</h3>

      <div className="flex flex-wrap justify-center gap-10 px-6">
        {steps.map((step, index) => (
          <div
            key={index}
            className="p-8 rounded-xl shadow-lg hover:shadow-2xl transition duration-300 cursor-pointer bg-white w-80 transform hover:scale-105 flex flex-col items-center text-center"
          >
            <div className="mb-4">{step.icon}</div>
            <h4 className="text-2xl font-semibold text-gray-800 mb-3">{step.title}</h4>
            <p className="text-gray-600 leading-relaxed">{step.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HowItWorks;
