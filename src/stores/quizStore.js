import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const quizQuestions = [
  {
    id: 1,
    question: "How big is your team?",
    options: [
      "Just me (solopreneur)",
      "2-5 people",
      "6-20 people",
      "20+ people"
    ]
  },
  {
    id: 2,
    question: "How many hours per week does your team spend on repetitive tasks?",
    options: [
      "Less than 5 hours",
      "5-10 hours",
      "10-20 hours",
      "More than 20 hours"
    ]
  },
  {
    id: 3,
    question: "What's eating up the most time?",
    options: [
      "Data entry and copying between systems",
      "Email and follow-ups",
      "Reporting and spreadsheets",
      "Client onboarding and fulfillment"
    ]
  },
  {
    id: 4,
    question: "Have you tried to automate this before?",
    options: [
      "No — not sure where to start",
      "Yes — with Zapier/Make but hit limits",
      "Yes — hired a developer but it didn't work out",
      "Yes — built something ourselves but it's fragile"
    ]
  },
  {
    id: 5,
    question: "What's your budget for automation help?",
    options: [
      "Under $2K (I need something small)",
      "$2K-$5K (willing to invest in the right solution)",
      "$5K-$15K (this is a priority)",
      "$15K+ (ready for a bigger project)"
    ]
  },
  {
    id: 6,
    question: "Your results are ready.",
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
