import useMashupStore from "@/stores/mashup-store";
import useUIStore from "@/stores/ui-store";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect } from "react";

export default function CharacterModal() {
  const { characterModalIndex, setCharacterModalIndex } = useUIStore(
    (state) => ({
      characterModalIndex: state.characterModalIndex,
      setCharacterModalIndex: state.setCharacterModalIndex,
    }),
  );

  const mashups = useMashupStore((state) => state.mashups);

  const character =
    typeof characterModalIndex === "number"
      ? mashups[characterModalIndex]
      : undefined;

  useEffect(() => {
    if (characterModalIndex !== undefined) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [characterModalIndex]);

  return (
    <AnimatePresence>
      {character && (
        <motion.div
          onClick={() => setCharacterModalIndex(undefined)}
          className="fixed left-0 top-0 z-20 flex h-full w-full items-center justify-center bg-black/50 p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            onClick={(e) => e.stopPropagation()}
            initial={{ scale: 0.6 }}
            animate={{ scale: 1 }}
            exit={{ opacity: 0, scale: 0.6 }}
            className="flex h-max max-h-full w-full max-w-4xl flex-col overflow-y-auto rounded-2xl bg-paper sm:h-full sm:max-h-[600px] sm:flex-row"
          >
            <div className="flex h-full flex-col items-center border-white/30 p-5 sm:border-r">
              <p className="hidden text-[22px] font-semibold sm:block">
                Characters
              </p>

              <div className="flex flex-1 items-center space-x-4 overflow-x-auto sm:mt-4 sm:flex-col sm:space-x-0 sm:space-y-8">
                {character.characterImages.map((src, i) => (
                  <Image
                    src={src}
                    key={i}
                    alt="mashup character"
                    width={80}
                    height={80}
                    className="rounded-xl"
                  />
                ))}
              </div>
            </div>

            <div className="w-full px-4 pb-4 sm:px-8 sm:pt-8">
              <h1 className="text-center text-2xl font-bold md:text-start md:text-3xl">
                {character.mashupName}
              </h1>

              <div className="mt-4 w-full space-y-3.5">
                {character.traits.map((trait, i) => (
                  <div
                    key={i}
                    className="w-full rounded-2xl bg-black/30 px-4 py-2 md:w-10/12"
                  >
                    <p className="font-semibold">{trait.title}:</p>
                    <p className="mt-1 text-sm text-white/70 md:text-base">
                      {trait.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
