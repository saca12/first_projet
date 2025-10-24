import { Welcome } from "./welcom";
import { Repertories } from "./repertories";
import { News } from "./news";
import { Projets } from "./projets";
import { Box } from "@radix-ui/themes";
import { Footer } from "../../components/footer";
import { useAppContext } from "/src/context/AppContext";
import React from "react";



export function Home() {
  const { theme } = useAppContext();


  return (
    <div className="flex flex-col min-h-screen">
      <Welcome />
      <Box className={`flex-grow ${theme === "dark" ? "bg-[#3C2E69]" : "bg-[#E0E0E0]"} max-sm:w-[100%] py-6 sm:py-8 lg:py-10`}>
        <Repertories />
        <News />
        <Projets />
      </Box>
      <Footer />
    </div>
  );
}