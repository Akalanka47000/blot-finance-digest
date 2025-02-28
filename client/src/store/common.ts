import type { CommonSlice } from '@app/store/types';
import { StateCreator } from 'zustand';

export const createCommonSlice: StateCreator<CommonSlice, [], [], CommonSlice> = (set) => ({
  _hasHydrated: false,
  setHasHydrated: (arg) => set(() => ({ _hasHydrated: arg }))
});
