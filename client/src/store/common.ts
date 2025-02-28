import { StateCreator } from 'zustand';
import type { CommonSlice } from '@app/store/types';

export const createCommonSlice: StateCreator<CommonSlice, [], [], CommonSlice> = (set) => ({
  _hasHydrated: false,
  setHasHydrated: (arg) => set(() => ({ _hasHydrated: arg }))
});
