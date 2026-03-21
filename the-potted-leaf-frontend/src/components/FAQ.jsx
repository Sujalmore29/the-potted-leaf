import React, { useState } from 'react'

const faqs = [
    {
        question: "How long does delivery take?",
        answer: "We deliver plants within 3-7 business days depending on your location."
    },
     {
    question: "Do you offer returns?",
    answer: "Yes! You can return your plant within 30 days if you're not satisfied."
  },
  {
    question: "How do I take care of my plant?",
    answer: "Each plant comes with a care guide. You can also check our Plant Care section."
  },
  {
    question: "Are the plants real or artificial?",
    answer: "All our plants are 100% real, fresh, and hand-picked."
  },
  {
    question: "Is payment secure?",
    answer: "Yes, we use Stripe for secure and encrypted payment processing."
  }
]

const FAQ = () => {
    const [openIndex, setopenIndex] = useState(null);

    const toggleFAQ = (index) => {
        setopenIndex(openIndex === index ? null : index)
    };

  return (
    <div className='max-w-5xl mx-auto px-6 py-20'>

        { /* Heading */ }
        <h2 className='text-4xl font bold text-center text-green-800 mb-4'>
            Frequently Asked Questions
        </h2>
        <p className='text-center text-gray-600 mb-12'>
            Everything you need to know about our plants and services 🌿
        </p>

        { /* FAQ List */ }
        <div id="Faqs" className='space-y-6'>
            {faqs.map((faq, index) => (
                <div key={index}
                className='bg-white rounded-2xl shadow-md p-5 cursor-pointer transition'
                onClick={() => toggleFAQ(index)}>

                    { /* Question */ }
                    <div className='flex justify-between items-center'>
                        <h3 className='text-lg font-semibold text-gray-800'>{faq.question}</h3>
                        <span className='text-green-700 text-xl'>
                            {openIndex === index ? "-" : "+"}
                        </span>
                    </div>

                    { /* Answer */ }
                    <div className={`transition-all duration-300 overflow-hidden ${
                        openIndex === index ? "max-h-40 mt-4" : "max-h-0"
                    }`}>
                        <p className='text-gray-600'>{faq.answer}</p>
                    </div>
                </div>
            ))}
        </div>
    </div>
  )
}

export default FAQ