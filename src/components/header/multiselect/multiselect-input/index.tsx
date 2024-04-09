import { cn } from "@/helpers/cn";
import LeftInput from "./LeftInput";
import { forwardRef, useCallback, useMemo } from "react";
import { type APICharacterDTO } from "@/types/api-response.type";
import useUIStore from "@/stores/ui-store";

interface IProps {
  isFocused: boolean;
  setIsFocused: (isFocused: boolean) => void;
  text: string;
  setText: (text: string) => void;
  hoverIndex?: number;
  setHoverIndex: (index?: number) => void;
  results: APICharacterDTO[];
}

const scrollToElement = (resultIndex: number) => {
  const popup: HTMLElement | null = document.getElementById("results-popup");

  if (!popup) return;

  const element = document.getElementById(
    `search-result-character-${resultIndex}`,
  );
  if (!element) return;

  popup.scrollTo({
    top: element.offsetTop - popup.offsetHeight / 3,
    behavior: "smooth",
  });
};

const MultiselectInput = forwardRef<HTMLInputElement, IProps>(
  (
    {
      isFocused,
      setIsFocused,
      text,
      setText,
      hoverIndex,
      setHoverIndex,
      results,
    }: IProps,
    ref,
  ) => {
    const { selectedCharacters, removeCharacter, addCharacter } = useUIStore(
      (state) => ({
        selectedCharacters: state.selectedCharacters,
        removeCharacter: state.removeCharacter,
        addCharacter: state.addCharacter,
      }),
    );

    const handleArrowDown = useCallback(() => {
      const newIndex =
        hoverIndex === undefined || !results.length
          ? 0
          : Math.min(hoverIndex + 1, results.length - 1);

      setHoverIndex(newIndex);
      scrollToElement(newIndex);
    }, [hoverIndex, results.length, setHoverIndex]);

    const handleArrowUp = useCallback(() => {
      const newIndex = hoverIndex && hoverIndex > 0 ? hoverIndex - 1 : -1;

      setHoverIndex(newIndex);
      scrollToElement(newIndex);
    }, [hoverIndex, setHoverIndex]);

    const handleEnter = useCallback(() => {
      if (hoverIndex === undefined) return;

      const character = results[hoverIndex];
      if (!character) return;

      const existingCharacter = selectedCharacters.find(
        (char) => char.id === character.id,
      );

      if (existingCharacter) {
        removeCharacter(character.id);
      } else {
        addCharacter(character);
      }
    }, [
      addCharacter,
      removeCharacter,
      hoverIndex,
      results,
      selectedCharacters,
    ]);

    const handleBackspace = useCallback(() => {
      if (!text.length && selectedCharacters.length < 2) {
        removeCharacter(selectedCharacters[selectedCharacters.length - 1]?.id);
      }
    }, [removeCharacter, selectedCharacters, text.length]);

    const handleKeyDown = useCallback(
      (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (!isFocused) return;

        switch (e.key) {
          case "Escape":
            setIsFocused(false);
            break;
          case "ArrowDown":
            handleArrowDown();
            break;
          case "ArrowUp":
            handleArrowUp();
            break;
          case "Enter":
            handleEnter();
            break;
          case "Backspace":
            handleBackspace();
            break;
          default:
            break;
        }
      },
      [
        isFocused,
        setIsFocused,
        handleArrowDown,
        handleArrowUp,
        handleEnter,
        handleBackspace,
      ],
    );

    return (
      <div
        className={cn(
          "flex h-full w-full items-center justify-start space-x-1.5 overflow-x-hidden rounded-t-2xl bg-paper pr-2 transition-all duration-300",
          isFocused && text.length ? "rounded-b-[4px]" : "rounded-b-2xl",
          isFocused ? "pl-2" : "pl-4",
        )}
      >
        <LeftInput />

        <input
          ref={ref}
          onFocus={() => setIsFocused(true)}
          onKeyDown={handleKeyDown}
          value={text}
          onChange={(e) => {
            setText(e.target.value);
            setHoverIndex(undefined);
            setIsFocused(true);
          }}
          placeholder="Search to Mash-Up..."
          className="h-full w-min bg-transparent text-lg outline-none placeholder:text-white/60 md:w-auto md:flex-1"
        />
      </div>
    );
  },
);
MultiselectInput.displayName = "MultiselectInput";

export default MultiselectInput;
