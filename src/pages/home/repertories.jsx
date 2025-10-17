import { Box, Text } from "@radix-ui/themes";
import { BookIcon } from "../../assets/icons/BookIcon";
import { TDIcon } from "../../assets/icons/TDIcon";
import { FolderIcon } from "../../assets/icons/FolderIcon";
import isiData from "/src/data/isi.json";
import React from "react";

const iconMap = { BookIcon, TDIcon, FolderIcon };

const DisplayStat = ({ header, contents }) => (
  <Box className="w-80 h-60 m-5 rounded-xl shadow-2xl bg-[#291f43] gap-3 flex flex-col items-center justify-center">
    <div className="flex items-center mt-[-5%] mx-auto justify-center text-[#58D5BA] w-70 h-10 bg-[#3C2E69] rounded-sm border-1 gap-2 opacity-50">
      {header.svg}
      {header.name}
    </div>
    <div className="contents gap-5 ">
      {contents.map((content, i) => (
        <div key={i}>
          {i !== 0 && <hr className="text-[#58D5BA] w-[10vw] mx-auto" />}
          <Text className="py-4 text-[#E2DDFE] flex items-center justify-center gap-2">
            <p>+{content.count}</p>
            <p>{content.name}</p>
          </Text>
        </div>
      ))}
    </div>
  </Box>
);

export function Repertories() {
  const stats = isiData.repertoires.map((rep) => ({
    header: {
      name: rep.header.name,
      svg: React.createElement(iconMap[rep.header.icon])
    },
    contents: rep.contents
  }));

  return (
    <Box className="min-h-[70vh]">
      <div className="flex text-center items-center justify-center gap-5">
        <Text className="font-bold text-4xl text-[#E2DDFE]">
          Profitez d'un vaste
        </Text>
        <Text className="text-4xl font-bold bg-gradient-to-r from-[#1F6692] to-[#58D5BA] bg-clip-text text-transparent">
          Répertoire
        </Text>
      </div>
      <div className="flex my-5 justify-center gap-15">
        {stats.map((stat, i) => (
          <DisplayStat key={i} header={stat.header} contents={stat.contents} />
        ))}
      </div>
    </Box>
  );
}
