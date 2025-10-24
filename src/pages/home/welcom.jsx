import { Text, Box } from "@radix-ui/themes";
import { RobotProfSVG } from "../../components/RobotProfSVG";
import { useAppContext } from "/src/context/AppContext";
import { useNavigate } from "react-router-dom";

export function Welcome() {
  const { handlePageChange, setActiveSection, theme } = useAppContext();
  const navigate = useNavigate();

  return (
    <div className={`flex items-center min-h-[100vh] max-sm:min-h-[90vh] w-[100%] my-10 gap-5 ${theme === "dark" ? "bg-[#291F43]" : "bg-[#F5F5F5]"}`}>
      <Box className={`flex flex-col justify-center h-[100%] ${theme === "dark" ? "text-[#E2DDFE]" : "text-[#333333]"} mx-15 gap-3`}>
        <div className="flex flex-col gap-2">
          <Text className="font-bold text-4xl">Bienvenue sur Votre espace</Text>
          <Text className="text-4xl font-bold bg-gradient-to-r from-[#1F6692] to-[#58D5BA] bg-clip-text text-transparent">
            Le renouveau
          </Text>
        </div>
        <hr className="w-120 max-sm:w-90 text-[#58D5BA]" />
        <Text className="text-lg">
          Toutes les ressources dont vous aurez besoin pour un meilleur apprentissage
        </Text>
        <div className="flex gap-5 max-sm:flex-col mt-2">
          <button
            className={`w-60 h-13 max-sm:w-90 ${theme === "dark" ? "bg-[#5472E4]" : "bg-[#4B6ACF]"} font-bold rounded cursor-pointer`}
            onClick={() => {
              handlePageChange("Mon portail");
              navigate("/portail");
            }}
          >
            Mon portail
          </button>
          <button
            className={`w-60 h-13 max-sm:w-90 border-1 font-bold ${theme === "dark" ? "text-[#5472E4] border-[#5472E4]" : "text-[#4B6ACF] border-[#4B6ACF]"} rounded cursor-pointer`}
            onClick={() => {
              handlePageChange("Bibliotheque");
              navigate("/bibliotheque");
              setActiveSection("Cours");
            }}
          >
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