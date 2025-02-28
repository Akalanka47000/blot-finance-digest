import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { createCommonSlice } from './common';

export const useStore = create<any>()(
  devtools(
    persist(
      (...a) => ({
        ...createCommonSlice(...a)
      }),
      {
        onRehydrateStorage: () => (state) => {
          state?.setHasHydrated(true);
        },
        name: 'store'
      }
    )
  )
);

export const getState = () => useStore.getState();
