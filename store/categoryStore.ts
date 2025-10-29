import { create } from 'zustand';

interface CategoryState {
  category: string;
  setCategory: (category: string) => void;
}

export const useCategoryStore = create<CategoryState>((set) => ({
  category: "all",
  setCategory: (category) => set({ category }),
}));
