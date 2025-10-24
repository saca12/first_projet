import { Box, Text } from "@radix-ui/themes";
import { BookIcon } from "../../assets/icons/BookIcon";
import { TDIcon } from "../../assets/icons/TDIcon";
import { FolderIcon } from "../../assets/icons/FolderIcon";
import isiData from "/src/data/isi.json";
import React from "react";
import { useAppContext } from "/src/context/AppContext";

const iconMap = { BookIcon, TDIcon, FolderIcon };

const DisplayStat = ({ header, contents }) => {
  const { theme } = useAppContext();

  // Validate that header.svg is a valid React component
  const IconComponent = iconMap[header.icon];
  if (!IconComponent) {
    console.error(`Invalid icon: ${header.icon}`);
    return null;
  }

  return (
    <Box className={`w-80 max-sm:w-100 h-60 max-sm:h-80 mx-auto my-10 rounded-xl shadow-2xl flex flex-col items-center justify-center ${theme === "dark" ? "bg-[#291f43]" : "bg-[#FFFFFF]"} gap-2 sm:gap-3`}>
      <div className={`flex items-center mt-[-5%] max-sm:mt-[-8%] mx-auto justify-center ${theme === "dark" ? "text-[#58D5BA] bg-[#3C2E69]" : "text-[#4B6ACF] bg-[#E0E0E0]"} w-full max-w-[200px] h-8 sm:h-10 max-sm:h-15 rounded-sm border-1 gap-2 opacity-50 text-sm max-sm:text-lg sm:text-base`}>
        <IconComponent />
        <span>{header.name}</span>
      </div>
      <div className="contents flex flex-col max-sm:gap-5 mt-5 max-sm:mt-10">
        {contents && contents.length > 0 ? (
          contents.map((content, i) => (
            <div key={i}>
              {i !== 0 && <hr className="text-[#58D5BA] w-[80%] mx-auto" />}
              <Text className={`py-2 sm:py-4 ${theme === "dark" ? "text-[#E2DDFE]" : "text-[#333333]"} flex items-center justify-center gap-2 text-xs max-sm:text-xl sm:text-sm`}>
                <span>+{content.count}</span>
                <span>{content.name}</span>
              </Text>
            </div>
          ))
        ) : (
          <Text className={`text-xs sm:text-sm ${theme === "dark" ? "text-[#E2DDFE]" : "text-[#333333]"}`}>
            No data available
          </Text>
        )}
      </div>
    </Box>
  );
};


export function Repertories() {
  const { theme } = useAppContext();
  const stats = isiData.repertoires.map((rep) => ({
    header: {
      name: rep.header.name,
      icon: rep.header.icon // Store icon name for validation
    },
    contents: rep.contents
  }));

  return (
    <Box className="min-h-[60vh] sm:min-h-[70vh] py-6 sm:py-8">
      <div className="flex flex-col sm:flex-row text-center items-center justify-center gap-3 sm:gap-5">
        <Text className={`font-bold text-xl max-sm:text-3xl sm:text-2xl md:text-3xl lg:text-4xl ${theme === "dark" ? "text-[#E2DDFE]" : "text-[#333333]"}`}>
          Profitez d'un vaste
        </Text>
        <Text className="text-xl max-sm:text-3xl sm:text-2xl md:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-[#1F6692] to-[#58D5BA] bg-clip-text text-transparent">
          Répertoire
        </Text>
      </div>
      <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-4 sm:gap-8 lg:gap-15 my-4 sm:my-5">
        {stats.map((stat, i) => (
          <DisplayStat key={i} header={stat.header} contents={stat.contents} />
        ))}
      </div>
    </Box>
  );
}

