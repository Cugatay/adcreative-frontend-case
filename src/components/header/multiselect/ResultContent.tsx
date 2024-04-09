import { cn } from "@/helpers/cn";
import useUIStore from "@/stores/ui-store";
import { type APICharacterDTO } from "@/types/api-response.type";
import Image from "next/image";
import { type RefObject, forwardRef } from "react";

interface IProps {
  character: APICharacterDTO;
  text: string;
  hoverIndex?: number;
  setHoverIndex: (index?: number) => void;
  index: number;
}

const ResultContent = forwardRef<HTMLInputElement, IProps>(
  ({ character, text, hoverIndex, setHoverIndex, index }: IProps, ref) => {
    const { selectedCharacters, addCharacter, removeCharacter } = useUIStore();

    return (
      <div
        id={`search-result-character-${index}`}
        key={character.id}
        onClick={() => {
          if (selectedCharacters.find((char) => char.id === character.id)) {
            removeCharacter(character.id);
          } else {
            addCharacter(character);
          }

          (ref as RefObject<HTMLInputElement>)?.current?.focus();
        }}
        className={cn(
          "border-secondary/40 flex w-full cursor-pointer items-center border-b px-4 py-2.5 transition-all duration-300 last:border-transparent",
          hoverIndex === index && "bg-secondary/10",
        )}
        onMouseEnter={() => setHoverIndex(index)}
        onMouseLeave={() => setHoverIndex(undefined)}
      >
        <div className="h-5 w-5 shrink-0 rounded-lg border-2 border-primary/60 p-[3px]">
          <div
            className={cn(
              "h-full w-full rounded-[3px] bg-primary transition-all duration-300",
              selectedCharacters.find((char) => char.id === character.id)
                ? "scale-100 opacity-100"
                : "scale-0 opacity-0",
            )}
          />
        </div>

        <Image
          src={character.image}
          width={48}
          height={48}
          className="ml-3 rounded-lg"
          alt={character.name}
        />

        <div className="relative ml-3.5 flex-1">
          <div className="max-w-48 truncate font-medium sm:max-w-96">
            {character.name
              .split(new RegExp(`(${text})`, "gi"))
              .map((part, index) =>
                part.toLowerCase() === text.toLowerCase() ? (
                  <b key={index}>{part}</b>
                ) : (
                  part
                ),
              )}
          </div>

          <div className="text-sm text-white/60">
            {character.episode.length} Episode
            {character.episode.length > 1 && "s"}
          </div>
        </div>
      </div>
    );
  },
);

ResultContent.displayName = "ResultContent";

export default ResultContent;
