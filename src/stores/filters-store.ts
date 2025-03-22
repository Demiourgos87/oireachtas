import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface FiltersStore {
  filters: string[];
  setFilters: (filters: string[]) => void;
  removeFilters: () => void;
}

// For demonstration purposes only, filters should be handled through URL params and sent to server
const useFiltersStore = create<FiltersStore>()(
  persist(
    (set) => ({
      filters: [],
      setFilters: (filters: string[]) => {
        set({ filters });
      },
      removeFilters: () => {
        set({ filters: [] });
      },
    }),
    { name: 'bills-filters-storage' },
  ),
);

export default useFiltersStore;
