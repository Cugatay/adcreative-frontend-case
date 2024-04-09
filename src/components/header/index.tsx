import Image from "next/image";
import MultiSelect from "./multiselect";
import useUIStore from "@/stores/ui-store";

export default function Header() {
  const removeAllCharacters = useUIStore((state) => state.removeAllCharacters);

  return (
    <div className="fixed left-0 top-0 z-10 w-full border-b border-b-white/20 bg-background py-2">
      <div className="mx-auto flex h-max max-w-screen-2xl items-center space-x-2 px-2 md:space-x-14 md:px-8">
        <div
          onClick={removeAllCharacters}
          className="flex cursor-pointer items-center space-x-4"
        >
          <Image
            src="/logo.svg"
            alt="Ricky Mash-up"
            width={44}
            height={56}
            className="min-w-11"
          />

          <div
            className="hidden text-3xl font-semibold md:block"
            style={{
              background: `linear-gradient(to right, #6FA9E5, #FFFFFF)`,
              WebkitTextFillColor: "transparent",
              WebkitBackgroundClip: "text",
            }}
          >
            Mash-Up
          </div>
        </div>

        <MultiSelect />
      </div>
    </div>
  );
}
