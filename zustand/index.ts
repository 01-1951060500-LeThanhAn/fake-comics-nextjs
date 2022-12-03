import create from "zustand";
import { ComicFollow } from "../Interface/Interface";

interface User {
  user: any;
  setUser: (user: any) => void;
  addFollow: (comic: ComicFollow) => void;
  following: ComicFollow[];
  loading: boolean;
  setLoading: (loading: boolean) => void;
  setFollow: (comics: ComicFollow[]) => void;
}

const useStore = create<User>((set) => ({
  user: undefined,
  setUser: (user: any) =>
    set(() => ({
      user: user,
    })),
  loading: false,
  setLoading: (loading: boolean) =>
    set({
      loading: loading,
    }),
  addFollow: (comic: ComicFollow) =>
    set((state) => ({ following: [...state.following, comic] })),
  following: [],
  setFollow: (comics: ComicFollow[]) => set(() => ({ following: comics })),
}));

export default useStore;
