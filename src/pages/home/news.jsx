import { Box, Text } from "@radix-ui/themes";
import { CoursIcon } from "../../assets/icons/CoursIcon";
import { HeartIcon } from "../../assets/icons/FavoriteIcon";
import isiData from "/src/data/isi.json";

export const Document = ({ book }) => (
  <Box className="w-100 h-25 bg-[#291f43] rounded-sm">
    <div className="flex">
      <div className="bookIcon flex my-3 items-center justify-center">
        <CoursIcon />
      </div>
      <div className="book-info w-[70%] h-[50%] text-[#E2DDFE] font-bold gap-2 my-auto px-3 flex border-l-2 flex-col">
        <Text>{book.title}</Text>
        <Text>{book.classe}</Text>
      </div>
      <div className="flex flex-col text-[#E2DDFE] gap-8 my-auto">
        <div className="like">
          <HeartIcon filled={book.liked} color="#ccc" />
        </div>
        <Text>{book.annee}</Text>
      </div>
    </div>
  </Box>
);

export function News() {
  const books = isiData.news;

  return (
    <Box className="min-h-[75vh] pb-5 w-[80%] bg-[#56468B] shadow-lg mx-auto rounded-xl">
      <div className="p-5 flex flex-col gap-2">
        <Text className="text-4xl flex text-center justify-baseline font-bold bg-gradient-to-r from-[#1F6692] to-[#58D5BA] bg-clip-text text-transparent">
          Nouveautés
        </Text>
        <hr className="w-50 text-[#58D5BA] opacity-50" />
      </div>
      <div className="grid grid-cols-2 grid-rows-3 gap-4 mx-30">
        {books.map((book, i) => (
          <Document key={i} book={{ ...book, classe: isiData.classe }} />
        ))}
      </div>
      <div className="more">
        <button className="bg-[#291f43] p-3 pl-15 pr-15 mt-2 flex mx-auto rounded-lg text-[#E2DDFE] shadow-xl cursor-pointer">
          Voir plus
        </button>
      </div>
    </Box>
  );
}
