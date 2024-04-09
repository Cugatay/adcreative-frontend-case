import useUIStore from "@/stores/ui-store";
import { memo } from "react";
import { MdCancel, MdSearch } from "react-icons/md";

const LeftInput = memo(() => {
  const { selectedCharacters, removeCharacter } = useUIStore();
  return (
    <div className="flex space-x-1.5">
      {!selectedCharacters.length ? (
        <MdSearch className="text-[26px] text-white/60" />
      ) : (
        <>
          {selectedCharacters.slice(0, 1).map((char) => (
            <div
              key={char.id}
              className="bg-secondary/30 flex max-w-14 items-center space-x-1.5 rounded-[10px] px-2 py-1 md:max-w-32"
            >
              <span
                title={char.name}
                className="flex-1 truncate text-xs font-medium md:text-sm"
              >
                {char.name}
              </span>
              <MdCancel
                className="cursor-pointer"
                onClick={() => removeCharacter(char.id)}
              />
            </div>
          ))}

          {selectedCharacters.length > 1 && (
            <div className="bg-secondary/30 flex items-center rounded-[10px] px-2 py-1 md:max-w-32">
              <span className="text-sm font-medium">
                +{selectedCharacters.length - 1}
              </span>
            </div>
          )}
        </>
      )}
    </div>
  );
});

LeftInput.displayName = "LeftInput";

export default LeftInput;
