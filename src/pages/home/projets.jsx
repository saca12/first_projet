import { Box, Text } from "@radix-ui/themes";
import { NexIcon } from "../../assets/icons/NextIcon";
import isiData from "/src/data/isi.json";

export const ProjetCard = ({ projet }) => (
  <Box className="w-70 h-60 rounded-sm shadow-xl bg-[#291f43] flex p-2 flex-col gap-2">
    <Box
      className={`w-[95%] h-[60%] bg-[url(${projet.url})] bg-cover bg-center bg-no-repeat mx-auto rounded-xl`}
    ></Box>
    <Text className="font-bold text-[#E2DDFE] flex text-center justify-center">
      {projet.name}
    </Text>
    <Text className="flex gap-15 mx-auto font-bold text-[#E2DDFE]">
      <p className="text-center">{projet.auteur}</p>
      <p className="text-center">{projet.domaine}</p>
    </Text>
  </Box>
);

export function Projets() {
  const projets = [...isiData.projets.tutores, ...isiData.projets.opensource];

  return (
    <Box className="min-h-[75vh] w-[80%] bg-[#56468B] flex shadow-lg mx-auto rounded-xl my-10">
      <div className="flex">
        <div className="description flex flex-col py-10 gap-5 items-center justify-center">
          <div className="title flex flex-col ml-10">
            <Text className="text-4xl flex text-center justify-baseline font-bold text-[#E2DDFE]">
              Les meilleurs
            </Text>
            <Text className="text-4xl flex text-center justify-baseline font-bold bg-gradient-to-r from-[#1F6692] to-[#58D5BA] bg-clip-text text-transparent">
              Projets Tutorés
            </Text>
            <hr className="w-70 text-[#58D5BA] opacity-50" />
          </div>
          <div className="info text-lg font-bold text-[#E2DDFE] w-80 ml-15">
            Des solutions développées par les étudiants et la communauté open
            source.
          </div>
        </div>
        <div className="main-content grid grid-rows-2 grid-cols-2 gap-5 my-5">
          {projets.map((projet, i) => (
            <ProjetCard key={i} projet={projet} />
          ))}
        </div>
        <div className="next bg-[#291f43] w-15 h-30 my-auto mx-auto rounded-2xl flex items-center justify-center cursor-pointer">
          <NexIcon />
        </div>
      </div>
    </Box>
  );
}
