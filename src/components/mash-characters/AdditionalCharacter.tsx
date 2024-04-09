import useUIStore from "@/stores/ui-store";
import { type APICharacterDTO } from "@/types/api-response.type";
import Image from "next/image";
import { IoMdClose } from "react-icons/io";

interface IProps {
  character: APICharacterDTO;
  index: number;
}

export default function AdditionalCharacter({ character, index }: IProps) {
  const { removeCharacter, swapCharacters } = useUIStore((state) => ({
    removeCharacter: state.removeCharacter,
    swapCharacters: state.swapCharacters,
  }));

  return (
    <div
      draggable
      onDragStart={(e) => {
        e.dataTransfer.setData("text/plain", (index + 4).toString());
      }}
      onDragOver={(e) => {
        e.preventDefault();
      }}
      onDrop={(e) => {
        const targetIndex = parseInt(e.currentTarget.id.slice(-1));
        const droppedIndex = parseInt(e.dataTransfer.getData("text/plain"));

        swapCharacters(targetIndex, droppedIndex);
      }}
      key={character.id}
      className="bg-secondary/20 group relative h-16 w-16 rounded-xl"
      id={`additional-character-dropzone-${index + 4}`}
    >
      <Image
        src={character.image}
        fill
        alt={character.name}
        className="rounded-xl"
      />
      <IoMdClose
        onClick={() => removeCharacter(character.id)}
        className="absolute -right-1 -top-1 h-4 w-4 cursor-pointer rounded-full bg-red-400 p-0.5 text-white opacity-0 transition-all duration-300 group-hover:scale-110 group-hover:opacity-100"
      />
    </div>
  );
}
