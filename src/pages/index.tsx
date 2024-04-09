import PastMashUp from "@/components/PastMashUp";
import MashCharacters from "@/components/mash-characters";
import useMashupStore from "@/stores/mashup-store";
import useUIStore from "@/stores/ui-store";
import Head from "next/head";
import { motion } from "framer-motion";

export default function Home() {
  const mashups = useMashupStore((state) => state.mashups);
  const selectedCharacters = useUIStore((state) => state.selectedCharacters);

  return (
    <>
      <Head>
        <title>Ricky Mash-up</title>
        <meta
          name="description"
          content="Rick's secret project to combine DNA's, because why not"
        />
        <link rel="icon" href="/logo.svg" />
      </Head>

      <main>
        {selectedCharacters.length ? (
          <MashCharacters />
        ) : (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            {mashups.length ? (
              <>
                <h1 className="text-3xl font-semibold">Last Mash-Ups</h1>
                <div className="mt-7 grid grid-cols-1 gap-6 lg:grid-cols-2">
                  {mashups.map((mashup, i) => (
                    <PastMashUp key={i} mashup={mashup} index={i} />
                  ))}
                </div>
              </>
            ) : (
              <div className="mt-12 text-center text-2xl font-light text-white/60">
                You have no mash up yet. To create one, start searching!
              </div>
            )}
          </motion.div>
        )}
      </main>
    </>
  );
}
