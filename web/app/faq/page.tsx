// FAQComponent.js
import React from 'react';


function FAQ() {
  return (
    <div className="min-h-screen bg-gray-50 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-center text-4xl font-extrabold mb-8">Frequently asked questions</h1>
        <p className="text-center mb-10">Have a different question and can’t find the answer you’re looking for? Reach out to our support team by <span className="underline cursor-pointer text-blue-500">sending us an email</span> and we’ll get back to you as soon as we can.</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {faqData.map((faq, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold text-gray-700 mb-4">{faq.question}</h2>
              <p className="text-gray-500">{faq.answer}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const faqData = [
  {
    question: "What's the best thing about Switzerland?",
    answer: "I don't know, but the flag is a big plus. Lorem ipsum dolor sit amet consectetur adipiscing elit. Quas cupiditate laboriosam fugiat."
  },
  {
    question: "How do you make holy water?",
    answer: "You boil the hell out of it. Lorem ipsum dolor sit amet consectetur adipiscing elit. Quas cupiditate laboriosam fugiat."
  },
  {
    question: "Why do you never see elephants hiding in trees?",
    answer: "Because they're so good at it. Lorem ipsum dolor sit amet consectetur adipiscing elit. Quas cupiditate laboriosam fugiat."
  },
  {
    question: "What do you call someone with no body and no nose?",
    answer: "Nobody knows. Lorem ipsum dolor sit amet consectetur adipiscing elit. Quas cupiditate laboriosam fugiat."
  },
  {
    question: "Why can't you hear a pterodactyl go to the bathroom?",
    answer: "Because the pee is silent. Lorem ipsum dolor sit amet consectetur adipiscing elit. Quas cupiditate laboriosam fugiat."
  },
  {
    question: "Why did the invisible man turn down the job offer?",
    answer: "He couldn't see himself doing it. Lorem ipsum dolor sit amet consectetur adipiscing elit. Quas cupiditate laboriosam fugiat."
  }
];

export default FAQ;
