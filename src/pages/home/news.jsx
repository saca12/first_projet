import { useEffect, useState } from "react";
import { Box, Text } from "@radix-ui/themes";
import { motion } from "framer-motion";
import { CoursIcon } from "../../assets/icons/CoursIcon";
import { HeartIcon } from "../../assets/icons/FavoriteIcon";
import { useAppContext } from "/src/context/AppContext";
import { useNavigate } from "react-router-dom";

export const Document = ({ book }) => {
    const { toggleFavorite, theme, setIsItemClicked } = useAppContext();
    const [bookIsLiked, setBookIsLiked] = useState(book.liked);
    const navigate = useNavigate();

    useEffect(() => {
        setBookIsLiked(book.liked);
    }, [book.liked]);

    function handleBookLiked(id) {
        setBookIsLiked(!bookIsLiked);
        toggleFavorite(id);
    }

    const handleItemClicked = () => {
        setIsItemClicked(true);
        navigate("/bibliotheque", { state: { book } });
    };

    return (
        <Box
            className={`w-100 max-sm:w-100 max-sm:mx-auto h-25 bg-[#291f43] rounded-sm ${
                theme === "dark" ? "bg-[#291f43]" : "bg-[#FFFFFF]"
            } rounded-sm cursor-pointer`}
            onClick={handleItemClicked}
        >
            <div className="flex">
                <div className="bookIcon flex my-3 items-center justify-center">
                    <CoursIcon />
                </div>
                <div
                    className={`book-info w-[70%] h-[50%] ${
                        theme === "dark" ? "text-[#E2DDFE]" : "text-[#333333]"
                    } font-bold gap-2 my-auto px-3 flex border-l-2 flex-col`}
                >
                    <Text>{book.title}</Text>
                    <Text>{book.classe}</Text>
                </div>
                <div
                    className={`flex flex-col ${
                        theme === "dark" ? "text-[#E2DDFE]" : "text-[#333333]"
                    } gap-8 my-auto`}
                >
                    <div className="like">
                        <motion.div
                            className="like cursor-pointer"
                            onClick={(e) => {
                                e.stopPropagation(); // Prevent triggering navigation on like click
                                handleBookLiked(book.id);
                            }}
                            animate={{ scale: bookIsLiked ? 1.2 : 1 }}
                            transition={{ type: "spring", stiffness: 300, damping: 20 }}
                        >
                            <HeartIcon filled={bookIsLiked} color={theme === "dark" ? "#ccc" : "#666"} />
                        </motion.div>
                    </div>
                    <Text>{book.annee}</Text>
                </div>
            </div>
        </Box>
    );
};

export function News() {
    const { newsBooks, handlePageChange, setActiveSection, theme } = useAppContext();
    const navigate = useNavigate();

    return (
        <Box
            className={`min-h-[60vh] sm:min-h-[75vh] pb-4 sm:pb-5 w-[70vw] max-w-[95%] max-sm:w-[100%] sm:max-w-[80%] ${
                theme === "dark" ? "bg-[#56468B]" : "bg-[#D1D5DB]"
            } flex items-center justify-center shadow-lg mx-auto rounded-xl my-6 sm:my-8 lg:my-10`}
        >
            <div className="p-4 sm:p-5 flex flex-col gap-2">
                <Text className="text-xl max-sm:text-3xl md:text-3xl lg:text-4xl flex text-center justify-center sm:justify-start font-bold bg-gradient-to-r from-[#1F6692] to-[#58D5BA] bg-clip-text text-transparent">
                    Nouveautés
                </Text>
                <hr className="w-40 sm:w-50 text-[#58D5BA] opacity-50 mx-auto sm:mx-0" />
            </div>
            <div className="grid sm:grid-cols-2 gap-3 max-sm:mx-auto sm:gap-4 sm:mx-30">
                {newsBooks.slice(0, 6).map((book) => (
                    <Document key={book.id} book={book} />
                ))}
            </div>
            <div
                className="more mt-4"
                onClick={() => {
                    handlePageChange("Bibliotheque");
                    navigate("/bibliotheque");
                    setActiveSection("Cours");
                }}
            >
                <button
                    className={`w-full max-sm:w-50 sm:w-auto ${
                        theme === "dark" ? "bg-[#291f43] text-[#E2DDFE]" : "bg-[#FFFFFF] text-[#333333]"
                    } p-2 sm:p-3 pl-8 sm:pl-15 pr-8 sm:pr-15 flex mx-auto rounded-lg shadow-xl cursor-pointer text-sm max-sm:justify-center max-sm:py-5 max-sm:text-xl sm:text-base`}
                >
                    Voir plus
                </button>
            </div>
        </Box>
    );
}