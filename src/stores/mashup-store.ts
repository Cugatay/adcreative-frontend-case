import { type MashupObjectType } from "@/types/mashup.type";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface IMashupStore {
  mashups: MashupObjectType[];
  addMashup: (mashup: MashupObjectType) => void;
  removeMashup: (mashup: MashupObjectType) => void;
}

const useMashupStore = create<IMashupStore>()(
  persist(
    (set) => ({
      mashups: [],
      addMashup: (mashup) =>
        set((state) => ({
          mashups:
            state.mashups.length >= 25
              ? [mashup, ...state.mashups.slice(0, 24)]
              : [mashup, ...state.mashups],
        })),
      removeMashup: (mashup) =>
        set((state) => ({
          mashups: state.mashups.filter(
            (m) => m.mashupName !== mashup.mashupName,
          ),
        })),
    }),
    {
      name: "mashup-storage",
    },
  ),
);

export default useMashupStore;
