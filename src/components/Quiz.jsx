import React, { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { ChevronLeft, Check } from 'lucide-react';
import { useQuizStore } from '../stores/quizStore';
import { SMB_ASSESSMENT, ANALYTICS_EVENTS } from '../data/site.js';

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
  const shouldReduceMotion = useReducedMotion();

  const questions = getQuestions();
  // Question range 1-5 in store. Step 6 is lead form.
  // In our store, currentStep starts at 0 (landing) now, but mock-quiz starts at 0 as Question 1.
  // Let's adjust to match mock-quiz: 0-indexed.
  const totalQuestions = 5;
  const isLeadStep = currentStep === totalQuestions;
  const currentQuestion = !isLeadStep ? questions[currentStep] : null;


  const handleOptionClick = (option) => {
    setAnswer(currentStep + 1, option); // Store uses 1-indexing for answers
    window.setTimeout(() => {
      setDirection('next');
      nextStep();
    }, shouldReduceMotion ? 0 : 300);
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

    const formattedMessage = [
      'Small-business automation quiz responses:',
      ...questions.slice(0, totalQuestions).map(
        (question, index) => `${index + 1}. ${question.question}\n${answers[index + 1] || 'Not answered'}`
      ),
    ].join('\n\n');

    const formData = {
      access_key: 'e70d96e8-39c9-44b1-b22a-6c48e41fb456',
      subject: `Small-business automation quiz response from ${fullName}`,
      from_name: fullName,
      email,
      message: formattedMessage,
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
      <div className="min-h-screen bg-[var(--color-bg)] text-[var(--color-text-primary)] flex flex-col items-center justify-center p-6">
        <div className="max-w-2xl w-full text-center space-y-6">
          <h1 className="text-3xl md:text-4xl font-serif font-bold">Answers received.</h1>
          <p className="text-xl text-[var(--color-text-secondary)]">
            Your small-business automation quiz response was sent. No assessment was booked and no payment was collected.
          </p>
          <div className="bg-[var(--color-surface)] p-8 rounded-2xl border border-[var(--color-border)]">
            <Check className="w-16 h-16 text-green-700 mx-auto mb-4" aria-hidden="true" />
            <p>
              If you want a structured recommendation, review the <strong>{SMB_ASSESSMENT.name}</strong>: a {SMB_ASSESSMENT.durationMinutes}-minute
              working session and {SMB_ASSESSMENT.deliverable} delivered {SMB_ASSESSMENT.deliveryWindow}.
            </p>
            <a
              href={SMB_ASSESSMENT.slug}
              className="inline-block mt-5 text-[var(--color-accent)] underline"
              data-analytics-event={ANALYTICS_EVENTS.smbAssessmentOpen}
              data-analytics-location="quiz-complete-assessment"
            >
              View the ${SMB_ASSESSMENT.priceUsd} assessment →
            </a>
          </div>
          <button
            type="button"
            onClick={() => {
              reset();
              window.location.href = '/';
            }}
            className="bg-[var(--color-surface)] text-[var(--color-text-primary)] border border-[var(--color-border)] hover:bg-[var(--color-surface-hover)] hover:border-[var(--color-border-hover)] px-8 py-3 rounded-full font-bold transition-all duration-300"
          >
            Return home
          </button>
        </div>
      </div>
    );
  }

  const variants = shouldReduceMotion
    ? {
        enter: { x: 0, opacity: 1 },
        center: { x: 0, opacity: 1 },
        exit: { x: 0, opacity: 1 },
      }
    : {
        enter: (direction) => ({
          x: direction === 'next' ? 200 : -200,
          opacity: 0,
        }),
        center: {
          x: 0,
          opacity: 1,
        },
        exit: (direction) => ({
          x: direction === 'next' ? -200 : 200,
          opacity: 0,
        }),
      };

  const completedSteps = Math.min(currentStep + 1, totalQuestions);
  const progress = (completedSteps / totalQuestions) * 100;

  return (
    <div className="min-h-screen bg-[var(--color-bg)] text-[var(--color-text-primary)] flex flex-col overflow-x-hidden">
      <div className="pt-12 pb-8 px-6 text-center space-y-4">
        <h1 className="text-3xl md:text-4xl font-serif font-bold leading-tight">
          Find the workflow creating the most operational drag.
        </h1>
        <p className="text-[var(--color-text-secondary)] text-lg md:text-xl font-light">
          Five questions to name the recurring work, its consequence, the outcome you want, and your timing.
        </p>
      </div>

      {/* Progress Bar Container */}
      <div
        className="w-full h-1 bg-[var(--color-border)] relative"
        role="progressbar"
        aria-label="Quiz progress"
        aria-valuemin={1}
        aria-valuemax={totalQuestions}
        aria-valuenow={completedSteps}
      >
        <motion.div
          className="absolute h-full bg-[var(--color-text-primary)]"
          initial={false}
          animate={{ width: `${progress}%` }}
          transition={{ duration: shouldReduceMotion ? 0 : 0.5, ease: 'easeOut' }}
        />
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col items-center justify-start py-12 px-6">
        <div className="max-w-4xl w-full">
          <AnimatePresence mode="wait" custom={direction} initial={false}>
            <motion.div
              key={currentStep}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ type: 'tween', duration: shouldReduceMotion ? 0 : 0.3 }}
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
                        type="button"
                        aria-pressed={answers[currentStep + 1] === option}
                        onClick={() => handleOptionClick(option)}
                        className="w-full flex items-center group text-left transition-all duration-200"
                      >
                        <div className="flex-shrink-0 w-8 h-8 rounded border border-[var(--color-border)] bg-[var(--color-surface)] mr-6 flex items-center justify-center group-hover:bg-[var(--color-surface-hover)] group-hover:border-[var(--color-border-hover)] transition-colors">
                          {answers[currentStep + 1] === option && <Check className="text-black w-5 h-5" aria-hidden="true" />}
                        </div>
                        <span className="text-lg md:text-xl font-light text-[var(--color-text-secondary)] group-hover:text-[var(--color-text-primary)]">
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
                        className="flex items-center text-moonlight-text-muted hover:text-[var(--color-text-primary)] transition-colors"
                      >
                        <ChevronLeft className="w-5 h-5 mr-1" />
                        Back
                      </button>
                    )}
                  </div>
                </div>
              ) : (
                <div className="max-w-2xl mx-auto bg-[var(--color-surface)] rounded-2xl p-8 md:p-12 text-[var(--color-text-primary)] border border-[var(--color-border)] shadow-2xl">
                  <div className="text-center space-y-4 mb-8">
                    <h2 className="text-3xl font-light leading-tight">
                      Your workflow snapshot is ready to send.
                    </h2>
                    <p className="text-[var(--color-text-secondary)] text-lg">
                      Submitting shares these five answers with Collin. It does not book or purchase anything; the separate ${SMB_ASSESSMENT.priceUsd} {SMB_ASSESSMENT.name} is the structured next step if you want a recommendation and 14-day plan.
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label htmlFor="quiz-first-name" className="text-sm font-medium text-[var(--color-text-muted)] uppercase tracking-wider">First name</label>
                        <input
                          id="quiz-first-name"
                          name="first_name"
                          autoComplete="given-name"
                          required
                          type="text"
                          value={firstName}
                          onChange={(e) => setFirstName(e.target.value)}
                          placeholder="First Name"
                          className="w-full px-4 py-3 rounded bg-[var(--color-bg)] border border-[var(--color-border)] text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] focus:border-[var(--color-accent)] transition-all"
                        />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="quiz-last-name" className="text-sm font-medium text-[var(--color-text-muted)] uppercase tracking-wider">Last name</label>
                        <input
                          id="quiz-last-name"
                          name="last_name"
                          autoComplete="family-name"
                          required
                          type="text"
                          value={lastName}
                          onChange={(e) => setLastName(e.target.value)}
                          placeholder="Last Name"
                          className="w-full px-4 py-3 rounded bg-[var(--color-bg)] border border-[var(--color-border)] text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] focus:border-[var(--color-accent)] transition-all"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="quiz-email" className="text-sm font-medium text-[var(--color-text-muted)] uppercase tracking-wider">Email address</label>
                      <input
                        id="quiz-email"
                        name="email"
                        autoComplete="email"
                        required
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email"
                        className="w-full px-4 py-3 rounded bg-[var(--color-bg)] border border-[var(--color-border)] text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] focus:border-[var(--color-accent)] transition-all"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting || !firstName || !lastName || !email}
                      className="w-full bg-[var(--color-accent)] text-white text-xl py-4 rounded font-medium hover:bg-[var(--color-accent-hover)] transition-colors shadow-lg active:scale-[0.98] transform disabled:opacity-50"
                    >
                      {isSubmitting ? 'Sending...' : 'Send my quiz answers'}
                    </button>
                  </form>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{
        __html: `
        .font-serif {
          font-family: var(--serif);
        }
      ` }} />
    </div>
  );
};

export default Quiz;
