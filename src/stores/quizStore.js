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
    question: "What's eating up the most time right now?",
    options: [
      "Data entry and copying between systems",
      "Email and follow-ups",
      "Reporting and spreadsheets",
      "Client onboarding and fulfillment"
    ]
  },
  {
    id: 3,
    question: "What happens when those tasks pile up?",
    options: [
      "We miss deadlines or drop the ball",
      "Costly mistakes and rework",
      "Team burns out or we have to hire more",
      "Growth stalls because we're stuck in the weeds"
    ]
  },
  {
    id: 4,
    question: "If you got 10+ hours back every week, what would change?",
    options: [
      "Take on more clients without hiring",
      "Focus on strategy instead of busywork",
      "Finally launch projects that keep getting pushed",
      "Reduce stress and stop firefighting"
    ]
  },
  {
    id: 5,
    question: "How soon do you want this solved?",
    options: [
      "Just exploring for now",
      "In the next 30 days",
      "As soon as possible",
      "We're already behind"
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
