import { type AppType } from "next/app";
import { Poppins } from "next/font/google";

import { api } from "@/utils/api";

import "@/styles/globals.css";
import Header from "@/components/header";
import CharacterModal from "@/components/CharacterModal";

const poppins = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <main
      className={`${poppins.className} mx-auto max-w-7xl px-4 pb-10 pt-28 lg:pt-36`}
    >
      <Header />

      <CharacterModal />

      <Component {...pageProps} />
    </main>
  );
};

export default api.withTRPC(MyApp);
