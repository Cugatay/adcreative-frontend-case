import { type APICharacterDTO } from "@/types/api-response.type";
import { create } from "zustand";

interface IUIStore {
  selectedCharacters: APICharacterDTO[];
  addCharacter: (character: APICharacterDTO) => void;
  removeCharacter: (characterId?: number) => void;
  removeAllCharacters: () => void;
  swapCharacters: (index1: number, index2: number) => void;
  characterModalIndex?: number;
  setCharacterModalIndex: (index?: number) => void;
}

const useUIStore = create<IUIStore>((set) => ({
  selectedCharacters: [],
  addCharacter: (character) =>
    set((state) => ({
      selectedCharacters: [...state.selectedCharacters, character],
    })),
  removeCharacter: (characterId) =>
    set((state) => ({
      selectedCharacters: state.selectedCharacters.filter(
        (c) => c.id !== characterId,
      ),
    })),
  removeAllCharacters: () =>
    set(() => ({
      selectedCharacters: [],
    })),
  swapCharacters: (index1, index2) =>
    set((state) => {
      const characters = [...state.selectedCharacters];

      const temp = characters[index1];

      if (!temp || !characters[index2]) return {};

      characters[index1] = characters[index2]!;
      characters[index2] = temp!;

      return {
        selectedCharacters: characters,
      };
    }),
  characterModalIndex: undefined,
  setCharacterModalIndex: (index) =>
    set(() => ({
      characterModalIndex: index,
    })),
}));

export default useUIStore;
