import useUIStore from "@/stores/ui-store";
import { type APICharacterDTO } from "@/types/api-response.type";
import { IoMdClose } from "react-icons/io";
import Image from "next/image";
import { cn } from "@/helpers/cn";

interface IProps {
  character?: APICharacterDTO;
  isPending?: boolean;
  index: number;
}

export default function MainCharacter({ character, isPending, index }: IProps) {
  const { removeCharacter, swapCharacters } = useUIStore((state) => ({
    removeCharacter: state.removeCharacter,
    swapCharacters: state.swapCharacters,
  }));

  return (
    <div
      draggable
      onDragStart={(e) => {
        e.dataTransfer.setData("text/plain", index.toString());
      }}
      onDragOver={(e) => {
        e.preventDefault();
      }}
      onDrop={(e) => {
        const targetIndex = parseInt(e.currentTarget.id.slice(-1));
        const droppedIndex = parseInt(e.dataTransfer.getData("text/plain"));

        swapCharacters(targetIndex, droppedIndex);
      }}
      id={`main-character-dropzone-${index}`}
      className={cn(
        "bg-secondary/20 group relative h-28 w-28 rounded-xl transition-all duration-700",
        isPending && !character ? "opacity-0" : "opacity-100",
      )}
    >
      {character?.image && (
        <>
          <Image
            className="rounded-xl"
            src={character.image}
            alt={character.name}
            fill
          />

          <IoMdClose
            onClick={() => removeCharacter(character.id)}
            className="absolute -right-2 -top-2 h-5 w-5 cursor-pointer rounded-full bg-red-400 p-0.5 text-white opacity-0 transition-all duration-300 group-hover:scale-110 group-hover:opacity-100"
          />
        </>
      )}
    </div>
  );
}
