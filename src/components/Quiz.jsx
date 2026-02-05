import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, Check } from 'lucide-react';
import { useQuizStore } from '../stores/quizStore';

const Quiz = () => {
  const {
    currentStep,
    answers,
    email,
    isSubmitting,
    isComplete,
    setAnswer,
    nextStep,
    prevStep,
    setName,
    setEmail,
    setSubmitting,
    setComplete,
    reset,
    getQuestions
  } = useQuizStore();

  const [direction, setDirection] = useState('next');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const questions = getQuestions();
  // Question range 1-5 in store. Step 6 is lead form.
  // In our store, currentStep starts at 0 (landing) now, but mock-quiz starts at 0 as Question 1.
  // Let's adjust to match mock-quiz: 0-indexed.
  const totalQuestions = 5;
  const isLeadStep = currentStep === totalQuestions;
  const currentQuestion = !isLeadStep ? questions[currentStep] : null;

  useEffect(() => {
    // If the store currentStep is 0, it means Question 1 (if we follow mock-quiz logic)
    // However, my previous edit changed quizStore to start at 0 for a landing page.
    // Given the user's feedback, common sense says Question 1 should be the first thing they see.
  }, []);

  const handleOptionClick = (option) => {
    setAnswer(currentStep + 1, option); // Store uses 1-indexing for answers
    setTimeout(() => {
      setDirection('next');
      nextStep();
    }, 300);
  };

  const handleBack = () => {
    setDirection('prev');
    prevStep();
  };

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    if (!firstName || !lastName || !email) return;

    const fullName = `${firstName} ${lastName}`;
    setName(fullName);
    setSubmitting(true);

    const formattedMessage = `
Quiz Results:

1. AI Tool Usage: ${answers[1] || 'Not answered'}
2. Work Situation: ${answers[2] || 'Not answered'}
3. AI Challenge: ${answers[3] || 'Not answered'}
4. Desired Outcome: ${answers[4] || 'Not answered'}
5. Time-Consuming Area: ${answers[5] || 'Not answered'}
    `.trim();

    const formData = {
      access_key: 'e70d96e8-39c9-44b1-b22a-6c48e41fb456',
      subject: `Action Plan Request from ${fullName}`,
      from_name: fullName,
      email: email,
      message: formattedMessage
    };

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setComplete(true);
        localStorage.removeItem('quiz-storage');
      } else {
        alert('Something went wrong. Please try again.');
      }
    } catch (error) {
      console.error('Submission error:', error);
      alert('Network error. Please check your connection and try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (isComplete) {
    return (
      <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-6 font-sans">
        <div className="max-w-2xl w-full text-center space-y-6">
          <h1 className="text-4xl md:text-5xl font-serif font-bold">Success!</h1>
          <p className="text-xl text-zinc-300">Your custom AI Action Plan is being generated and sent to {email}.</p>
          <div className="bg-white/10 p-8 rounded-2xl border border-white/20">
            <Check className="w-16 h-16 text-green-400 mx-auto mb-4" />
            <p>Check your inbox in the next 5 minutes.</p>
          </div>
          <button
            onClick={() => {
              reset();
              window.location.href = '/';
            }}
            className="bg-white text-black hover:bg-zinc-200 px-8 py-3 rounded-full font-bold transition"
          >
            Return Home
          </button>
        </div>
      </div>
    );
  }

  const variants = {
    enter: (direction) => ({
      x: direction === 'next' ? 200 : -200,
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1
    },
    exit: (direction) => ({
      x: direction === 'next' ? -200 : 200,
      opacity: 0
    })
  };

  const progress = (currentStep / totalQuestions) * 100;

  return (
    <div className="min-h-screen bg-black text-white flex flex-col font-sans overflow-x-hidden">
      {/* Header Section */}
      <div className="pt-12 pb-8 px-6 text-center space-y-4">
        <h1 className="text-4xl md:text-6xl font-serif font-bold leading-tight">
          Get Your Free AI Action Plan
        </h1>
        <p className="text-moonlight-text-secondary text-lg md:text-xl font-light">
          Choose the answer you agree with most
        </p>
      </div>

      {/* Progress Bar Container */}
      <div className="w-full h-1 bg-zinc-800 relative">
        <motion.div
          className="absolute h-full bg-white transition-all duration-500 ease-out"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
        />
      </div>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col items-center justify-start py-12 px-6">
        <div className="max-w-4xl w-full">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={currentStep}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ type: 'tween', duration: 0.3 }}
              className="w-full"
            >
              {!isLeadStep ? (
                <div className="space-y-12">
                  <h2 className="text-2xl md:text-4xl text-center font-medium leading-snug">
                    {currentQuestion?.question}
                  </h2>

                  <div className="space-y-4 max-w-2xl mx-auto">
                    {currentQuestion?.options.map((option, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleOptionClick(option)}
                        className="w-full flex items-center group text-left transition-all duration-200"
                      >
                        <div className="flex-shrink-0 w-8 h-8 rounded bg-white mr-6 flex items-center justify-center group-hover:bg-zinc-200 transition-colors">
                          {answers[currentStep + 1] === option && <Check className="text-black w-5 h-5" />}
                        </div>
                        <span className="text-lg md:text-xl font-light text-zinc-100 group-hover:text-white">
                          {option}
                        </span>
                      </button>
                    ))}
                  </div>

                  <div className="pt-12 flex flex-col items-center space-y-8">
                    <span className="text-moonlight-text-muted text-lg font-mono">
                      {currentStep + 1} / {totalQuestions}
                    </span>

                    {currentStep > 0 && (
                      <button
                        onClick={handleBack}
                        className="flex items-center text-moonlight-text-muted hover:text-white transition-colors"
                      >
                        <ChevronLeft className="w-5 h-5 mr-1" />
                        Back
                      </button>
                    )}
                  </div>
                </div>
              ) : (
                <div className="max-w-2xl mx-auto bg-white rounded-2xl p-8 md:p-12 text-black shadow-2xl">
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
                        <label className="text-sm font-medium text-moonlight-text-muted uppercase tracking-wider">First Name</label>
                        <input
                          required
                          type="text"
                          value={firstName}
                          onChange={(e) => setFirstName(e.target.value)}
                          placeholder="First Name"
                          className="w-full px-4 py-3 rounded border border-zinc-300 focus:outline-none focus:ring-2 focus:ring-black transition-all"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-moonlight-text-muted uppercase tracking-wider">Last Name</label>
                        <input
                          required
                          type="text"
                          value={lastName}
                          onChange={(e) => setLastName(e.target.value)}
                          placeholder="Last Name"
                          className="w-full px-4 py-3 rounded border border-zinc-300 focus:outline-none focus:ring-2 focus:ring-black transition-all"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-moonlight-text-muted uppercase tracking-wider">Email</label>
                      <input
                        required
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email"
                        className="w-full px-4 py-3 rounded border border-zinc-300 focus:outline-none focus:ring-2 focus:ring-black transition-all"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting || !firstName || !lastName || !email}
                      className="w-full bg-black text-white text-xl py-4 rounded font-medium hover:bg-zinc-800 transition-colors shadow-lg active:scale-[0.98] transform disabled:opacity-50"
                    >
                      {isSubmitting ? 'Sending...' : 'Get My Action Plan'}
                    </button>
                  </form>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>

      {/* Footer Branding */}
      <footer className="p-6 flex justify-end items-center">
        <div className="bg-zinc-900 px-4 py-2 rounded flex items-center space-x-2 text-sm border border-[rgba(255,255,255,0.06)]">
          <span className="text-moonlight-text-secondary">Powered by</span>
          <div className="flex items-center space-x-1">
            <div className="w-2 h-2 rounded-full bg-white opacity-50" />
            <span className="font-bold text-white">interact</span>
          </div>
        </div>
      </footer>

      <style dangerouslySetInnerHTML={{
        __html: `
        .font-serif {
          font-family: 'Instrument Serif', serif;
        }
        body {
          background-color: black;
        }
      ` }} />
    </div>
  );
};

export default Quiz;
