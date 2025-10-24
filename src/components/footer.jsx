import { Box,Text } from "@radix-ui/themes";
import { useAppContext } from "/src/context/AppContext";

export function Footer() {
  const { theme } = useAppContext();

  return (
    <Box className={`w-full h-40 sm:h-48 lg:h-60 ${theme === "dark" ? "bg-[#291F43]" : "bg-[#D1D5DB]"} flex items-center justify-center text-center`}>
      <Text className={`text-sm sm:text-base ${theme === "dark" ? "text-[#E2DDFE]" : "text-[#333333]"}`}>
        © 2025 ESI Renouveau. Tous droits réservés.
      </Text>
    </Box>
  );
}