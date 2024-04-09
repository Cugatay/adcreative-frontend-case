import useUIStore from "@/stores/ui-store";
import { type MashupObjectType } from "@/types/mashup.type";
import Image from "next/image";

interface IProps {
  mashup: MashupObjectType;
  index: number;
}

export default function PastMashUp({ mashup, index }: IProps) {
  const setCharacterModalIndex = useUIStore(
    (state) => state.setCharacterModalIndex,
  );

  return (
    <div
      onClick={() => setCharacterModalIndex(index)}
      className="flex flex-1 cursor-pointer flex-col items-center space-y-3 rounded-2xl bg-paper/40 p-4 md:h-32 md:flex-row md:space-x-6 md:space-y-0"
    >
      <div className="space-y-[-74px]">
        {mashup.characterImages.map((src, i) => (
          <Image
            key={i}
            src={src}
            width={80}
            height={80}
            alt="mashup character"
            style={{ marginLeft: `${i * 6}px`, zIndex: 4 - i }}
            className="relative rounded-xl border border-white/50"
          />
        ))}
      </div>

      <div className="flex-1 space-y-2">
        <p className="line-clamp-2 w-full text-center text-xl font-bold md:text-start md:text-2xl">
          {mashup.mashupName}
        </p>

        <div className="flex w-full flex-wrap justify-center gap-2 md:justify-start">
          {mashup.traits.map((trait, i) => (
            <div
              key={i}
              className="truncate rounded-xl bg-black/30 px-3 py-1.5 text-sm font-semibold lg:max-w-40 xl:max-w-48"
            >
              {trait.title}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
