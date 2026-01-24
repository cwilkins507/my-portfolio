import React, { useState, useEffect } from 'react';
import { ChevronLeft, Check } from 'lucide-react';

const App = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
  });
  const [answers, setAnswers] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const steps = [
    {
      id: 1,
      question: "Are you regularly using AI tools in your business?",
      options: [
        { id: 'a', text: "Yes - I'm using AI tools like ChatGPT or Claude at least a few times per week." },
        { id: 'b', text: "No - I've played around with AI but it hasn't become part of my routine yet." }
      ]
    },
    {
      id: 2,
      question: "What's your current work situation?",
      options: [
        { id: 'a', text: "I'm a solopreneur (no employees)" },
        { id: 'b', text: "I run a small business (1-10 employees)" },
        { id: 'c', text: "I run a big business (10+ employees)" },
        { id: 'd', text: "I'm a full-time employee (no business of my own)" }
      ]
    },
    {
      id: 3,
      question: "What's your #1 AI challenge right now?",
      options: [
        { id: 'a', text: "I'm excited about AI but overwhelmed by where to start" },
        { id: 'b', text: "I'm behind my competitors who are using AI more effectively" },
        { id: 'c', text: "I don't have time to learn where AI can fit into my business" }
      ]
    },
    {
      id: 4,
      question: "What's the #1 outcome you're hoping AI can help you achieve?",
      options: [
        { id: 'a', text: "Make more money - I want to increase revenue or cut costs" },
        { id: 'b', text: "Save time - I want to automate tasks and free up my schedule" },
        { id: 'c', text: "Improve quality - I want better products, fewer errors, or happier customers" }
      ]
    },
    {
      id: 5,
      question: "Which area of your business eats up the most of your time?",
      options: [
        { id: 'a', text: "Admin work (emails, scheduling, data entry)" },
        { id: 'b', text: "Marketing and content creation" },
        { id: 'c', text: "Sales and lead follow-up" },
        { id: 'd', text: "Client delivery and fulfillment" }
      ]
    }
  ];

  const handleOptionSelect = (stepId, optionId) => {
    setAnswers({ ...answers, [stepId]: optionId });
    setTimeout(() => {
      setCurrentStep(prev => prev + 1);
    }, 300);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.firstName && formData.lastName && formData.email) {
      setIsSubmitted(true);
    }
  };

  const progress = ((currentStep) / steps.length) * 100;

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-6 font-sans">
        <div className="max-w-2xl w-full text-center space-y-6">
          <h1 className="text-4xl md:text-5xl font-serif font-bold italic">Success!</h1>
          <p className="text-xl text-gray-300">Your custom AI Action Plan is being generated and sent to {formData.email}.</p>
          <div className="bg-white/10 p-8 rounded-2xl border border-white/20">
            <Check className="w-16 h-16 text-green-400 mx-auto mb-4" />
            <p>Check your inbox in the next 5 minutes.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white flex flex-col font-sans overflow-x-hidden">
      {/* Header Section */}
      <div className="pt-12 pb-8 px-6 text-center space-y-4">
        <h1 className="text-4xl md:text-6xl font-serif font-bold leading-tight">
          Get Your Free AI Action Plan
        </h1>
        <p className="text-gray-400 text-lg md:text-xl font-light">
          Choose the answer you agree with most
        </p>
      </div>

      {/* Progress Bar Container */}
      <div className="w-full h-1 bg-zinc-800 relative">
        <div
          className="absolute h-full bg-white transition-all duration-500 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col items-center justify-start py-12 px-6">
        <div className="max-w-4xl w-full">

          {currentStep < steps.length ? (
            <div className="space-y-12">
              {/* Question */}
              <h2 className="text-2xl md:text-4xl text-center font-medium leading-snug">
                {steps[currentStep].question}
              </h2>

              {/* Options */}
              <div className="space-y-4 max-w-2xl mx-auto">
                {steps[currentStep].options.map((option) => (
                  <button
                    key={option.id}
                    onClick={() => handleOptionSelect(steps[currentStep].id, option.id)}
                    className="w-full flex items-center group text-left transition-all duration-200"
                  >
                    <div className="flex-shrink-0 w-8 h-8 rounded bg-white mr-6 flex items-center justify-center group-hover:bg-zinc-200 transition-colors">
                      {answers[steps[currentStep].id] === option.id && <Check className="text-black w-5 h-5" />}
                    </div>
                    <span className="text-lg md:text-xl font-light text-zinc-100 group-hover:text-white">
                      {option.text}
                    </span>
                  </button>
                ))}
              </div>

              {/* Counter / Nav */}
              <div className="pt-12 flex flex-col items-center space-y-8">
                <span className="text-zinc-500 text-lg font-mono">
                  {currentStep + 1} / {steps.length}
                </span>

                {currentStep > 0 && (
                  <button
                    onClick={() => setCurrentStep(prev => prev - 1)}
                    className="flex items-center text-zinc-500 hover:text-white transition-colors"
                  >
                    <ChevronLeft className="w-5 h-5 mr-1" />
                    Back
                  </button>
                )}
              </div>
            </div>
          ) : (
            /* Lead Gen Form Step */
            <div className="max-w-2xl mx-auto bg-white rounded-2xl p-8 md:p-12 text-black shadow-2xl animate-in fade-in zoom-in duration-300">
              <div className="text-center space-y-4 mb-8">
                <h2 className="text-3xl font-light leading-tight">
                  Your personalized AI action plan is ready.
                </h2>
                <p className="text-zinc-600 text-lg">
                  We'll send your results + a few quick wins to get you started.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-zinc-500 uppercase tracking-wider">First Name</label>
                    <input
                      required
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      placeholder="First Name"
                      className="w-full px-4 py-3 rounded border border-zinc-300 focus:outline-none focus:ring-2 focus:ring-black transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-zinc-500 uppercase tracking-wider">Last Name</label>
                    <input
                      required
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      placeholder="Last Name"
                      className="w-full px-4 py-3 rounded border border-zinc-300 focus:outline-none focus:ring-2 focus:ring-black transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-zinc-500 uppercase tracking-wider">Email</label>
                  <input
                    required
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Email"
                    className="w-full px-4 py-3 rounded border border-zinc-300 focus:outline-none focus:ring-2 focus:ring-black transition-all"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-black text-white text-xl py-4 rounded font-medium hover:bg-zinc-800 transition-colors shadow-lg active:scale-[0.98] transform"
                >
                  Get My Action Plan
                </button>
              </form>
            </div>
          )}
        </div>
      </main>

      {/* Footer Branding */}
      <footer className="p-6 flex justify-end items-center">
        <div className="bg-zinc-900 px-4 py-2 rounded flex items-center space-x-2 text-sm border border-zinc-800">
          <span className="text-zinc-400">Powered by</span>
          <div className="flex items-center space-x-1">
            <div className="w-2 h-2 rounded-full bg-white opacity-50" />
            <span className="font-bold text-white">interact</span>
          </div>
        </div>
      </footer>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Inter:wght@300;400;500;700&display=swap');
        
        body {
          font-family: 'Inter', sans-serif;
        }
        
        .font-serif {
          font-family: 'Instrument Serif', serif;
        }
      `}</style>
    </div>
  );
};

export default App;