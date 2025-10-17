import { Text, Box, Button } from "@radix-ui/themes";
import { RobotProfSVG } from "../../components/RobotProfSVG";

export function Welcome() {
  return (
    <div className="flex items-center min-h-[100vh] w-[100%] my-10 gap-5">
      <Box className="flex flex-col justify-center h-[100%] text-[#E2DDFE] mx-15 gap-3">
        <div className="flex flex-col gap-2">
          <Text className="font-bold text-4xl">Bienvenue sur Votre espace</Text>
          <Text className="text-4xl font-bold bg-gradient-to-r from-[#1F6692] to-[#58D5BA] bg-clip-text text-transparent">
            Le renouveau
          </Text>
        </div>
        <hr className="w-120 text-[#58D5BA]" />
        <Text className="text-lg">
          Toutes les ressources dont vous aurez besoins pour un meilleur
          apprentissage
        </Text>
        <div className="flex gap-5">
          <button className="w-60 h-13 bg-[#5472E4] font-bold rounded cursor-pointer">
            Mon portail
          </button>
          <button className="w-50 h-13 border-1 font-bold text-[#5472E4] border-[#5472E4] rounded cursor-pointer">
            Explorer
          </button>
        </div>
      </Box>
      <Box className="w-[700px] h-[400px] overflow-hidden">
        <RobotProfSVG />
      </Box>
    </div>
  );
}
