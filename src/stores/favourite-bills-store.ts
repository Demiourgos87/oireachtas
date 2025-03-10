import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { Bill } from '@custom-types/bill';

interface FavouriteBillsStore {
  favourites: Bill[];
  addFavourite: (bill: Bill) => void;
  removeFavourite: (bill: Bill) => void;
  isFavourite: (billName: string) => boolean;
}

// Using persist for local storage, in case of server communication, the actions would be async
const useFavouritesStore = create<FavouriteBillsStore>()(
  persist(
    (set, get) => ({
      favourites: [],
      addFavourite: (bill) => {
        const { favourites } = get();

        if (favourites.find((fav) => fav.shortTitleEn === bill.shortTitleEn)) return;

        set({ favourites: [...favourites, bill] });

        console.log(`${bill.shortTitleEn} added to storage, dispatch to server.`);
      },
      removeFavourite: (bill) => {
        const { favourites } = get();
        set({ favourites: favourites.filter((fav) => fav.shortTitleEn !== bill.shortTitleEn) });

        console.log(`${bill.shortTitleEn} removed from storage, dispatch to server.`);
      },
      isFavourite: (billName) => {
        return get().favourites.some((fav: Bill) => fav.shortTitleEn === billName);
      },
    }),
    {
      name: 'favourite-bills-storage',
    },
  ),
);

export default useFavouritesStore;
