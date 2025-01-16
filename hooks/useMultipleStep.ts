import { create } from "zustand";

interface MultipleStepStore {
  currentStep: number;
  next: () => void;
  prev: () => void;
}

const useMultipleStep = create<MultipleStepStore>()((set) => ({
  currentStep: 0,
  next: () => {
    set((prev) => ({
      currentStep: prev.currentStep + 1,
    }));
  },
  prev: () => {
    set((prev) => ({
      currentStep: prev.currentStep - 1,
    }));
  },
}));

export { useMultipleStep };
