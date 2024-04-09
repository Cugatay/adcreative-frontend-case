import useUIStore from "@/stores/ui-store";
import { api } from "@/utils/api";
import useMashupStore from "@/stores/mashup-store";
import { cn } from "@/helpers/cn";
import LoadingSpinner from "../LoadingSpinner";
import { motion } from "framer-motion";
import MainCharacter from "./MainCharacter";
import AdditionalCharacter from "./AdditionalCharacter";

export default function MashCharacters() {
  const { mutateAsync, isPending, isError } =
    api.mash.mashTogether.useMutation();
  const { selectedCharacters, removeAllCharacters, setCharacterModalIndex } =
    useUIStore((state) => ({
      selectedCharacters: state.selectedCharacters,
      removeCharacter: state.removeCharacter,
      removeAllCharacters: state.removeAllCharacters,
      setCharacterModalIndex: state.setCharacterModalIndex,
    }));

  const addMashup = useMashupStore((state) => state.addMashup);

  const handleMashTogether = async () => {
    try {
      const res = await mutateAsync({
        character: selectedCharacters.slice(0, 4).map((char) => char.name),
      });

      if (!res) return;

      addMashup({
        ...res,
        characterImages: selectedCharacters
          .slice(0, 4)
          .map((char) => char.image),
      });
      removeAllCharacters();
      setCharacterModalIndex(0);
    } catch (_) {
      return;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center"
    >
      <div
        className={cn(
          "grid grid-cols-2 gap-4 md:flex md:gap-0 md:space-x-5",
          isPending && "pointer-events-none md:-space-x-24",
        )}
      >
        {Array.from({ length: 4 }).map((_, index) => (
          <MainCharacter
            key={index}
            character={selectedCharacters[index]}
            isPending={isPending}
            index={index}
          />
        ))}
      </div>

      <button
        disabled={selectedCharacters.length < 2 || isPending}
        onClick={handleMashTogether}
        className="mt-10 rounded-xl bg-primary/70 px-5 py-2.5 text-xl font-medium transition-all duration-300 hover:brightness-75 disabled:pointer-events-none disabled:opacity-50"
      >
        {isPending ? <LoadingSpinner /> : "Mash Together!"}
      </button>

      {isError && (
        <div className="mt-3 text-center font-medium text-red-400">
          An error occured, please try again later
        </div>
      )}

      {selectedCharacters.length > 4 && (
        <div className="mt-20 w-full text-lg text-white/70">
          <p>
            Note: Max character limit is 4, these characters will not be mashed:
          </p>

          <div className="mt-4 flex w-full flex-wrap gap-4">
            {selectedCharacters.slice(4).map((character, index) => (
              <AdditionalCharacter
                key={index}
                character={character}
                index={index}
              />
            ))}
          </div>
        </div>
      )}
    </motion.div>
  );
}
