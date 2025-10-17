import { Welcome } from "./welcom";
import { Repertories } from "./repertories";
import { News } from "./news";
import { Projets } from "./projets";
import { Box } from "@radix-ui/themes";
import { Footer } from "../../components/footer";

export function Home() {
  return (
    <>
      <Welcome />
      <Box className="bg-[#3C2E69] py-10">
        <Repertories />
        <News />
        <Projets />
      </Box>
      <Footer />
    </>
  );
}
