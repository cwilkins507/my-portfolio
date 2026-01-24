import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const quizQuestions = [
  {
    id: 1,
    question: "Are you regularly using AI tools in your business?",
    options: [
      "Yes - I'm using AI tools like ChatGPT or Claude at least a few times per week.",
      "No - I've played around with AI but it hasn't become part of my routine yet."
    ]
  },
  {
    id: 2,
    question: "What's your current work situation?",
    options: [
      "I'm a solopreneur (no employees)",
      "I run a small business (1-10 employees)",
      "I run a big business (10+ employees)",
      "I'm a full-time employee (no business of my own)"
    ]
  },
  {
    id: 3,
    question: "What's your #1 AI challenge right now?",
    options: [
      "I'm excited about AI but overwhelmed by where to start",
      "I'm behind my competitors who are using AI more effectively",
      "I don't have time to learn where AI can fit into my business"
    ]
  },
  {
    id: 4,
    question: "What's the #1 outcome you're hoping AI can help you achieve?",
    options: [
      "Make more money - I want to increase revenue or cut costs",
      "Save time - I want to automate tasks and free up my schedule",
      "Improve quality - I want better products, fewer errors, or happier customers"
    ]
  },
  {
    id: 5,
    question: "Which area of your business eats up the most of your time?",
    options: [
      "Admin work (emails, scheduling, data entry)",
      "Marketing and content creation",
      "Sales and lead follow-up",
      "Client delivery and fulfillment"
    ]
  },
  {
    id: 6,
    question: "Your personalized AI action plan is ready.",
    isContactForm: true
  }
];

export const useQuizStore = create(
  persist(
    (set, get) => ({
      currentStep: 0,
      answers: {},
      name: '',
      email: '',
      isSubmitting: false,
      isComplete: false,

      setAnswer: (step, answer) => {
        set((state) => ({
          answers: { ...state.answers, [step]: answer }
        }));
      },

      nextStep: () => {
        const currentStep = get().currentStep;
        if (currentStep < quizQuestions.length) {
          set({ currentStep: currentStep + 1 });
        }
      },

      prevStep: () => {
        const currentStep = get().currentStep;
        if (currentStep > 0) {
          set({ currentStep: currentStep - 1 });
        }
      },

      setName: (name) => set({ name }),
      setEmail: (email) => set({ email }),

      setSubmitting: (isSubmitting) => set({ isSubmitting }),
      setComplete: (isComplete) => set({ isComplete }),

      reset: () => {
        set({
          currentStep: 0,
          answers: {},
          name: '',
          email: '',
          isSubmitting: false,
          isComplete: false
        });
      },

      getQuestions: () => quizQuestions
    }),
    {
      name: 'quiz-storage',
      partialize: (state) => ({
        currentStep: state.currentStep,
        answers: state.answers,
        name: state.name,
        email: state.email
      })
    }
  )
);
