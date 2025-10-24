import { Box, Text } from "@radix-ui/themes";
import { motion } from "framer-motion";
import { NexIcon } from "../../assets/icons/NextIcon";
import { HeartIcon } from "../../assets/icons/FavoriteIcon";
import { useAppContext } from "/src/context/AppContext";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const ProjetCard = ({ projet, onClick }) => {
    const { toggleFavorite, theme } = useAppContext();
    const [isLiked, setIsLiked] = useState(projet.liked);

    useEffect(() => {
        setIsLiked(projet.liked);
    }, [projet.liked]);

    function handleLiked(id) {
        setIsLiked(!isLiked);
        toggleFavorite(id);
    }

    return (
        <Box
            className={`w-full max-sm:min-w-90 max-w-[280px] h-48 sm:h-56 lg:h-60 max-sm:h-70 rounded-sm shadow-xl ${
                theme === "dark" ? "bg-[#291f43]" : "bg-[#FFFFFF]"
            } flex p-2 flex-col gap-2`}
            onClick={onClick}
        >
            <Box>
                <img
                    src={projet.url}
                    alt={projet.name}
                    className="w-[95%] h-[60%] object-cover mx-auto rounded-xl"
                    onError={(e) => console.error("Image failed to load:", projet.url)}
                />
                <motion.div
                    className="like cursor-pointer"
                    onClick={(e) => {
                        e.stopPropagation();
                        handleLiked(projet.id);
                    }}
                    animate={{ scale: isLiked ? 1.0 : 1 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                    <HeartIcon filled={isLiked} color={theme === "dark" ? "#ccc" : "#382b2bff"} />
                </motion.div>
            </Box>
            <Text
                className={`font-bold ${
                    theme === "dark" ? "text-[#E2DDFE]" : "text-[#333333]"
                } max-sm:pt-5 flex text-center justify-center text-sm sm:text-base`}
            >
                {projet.name}
            </Text>
            <div
                className={`flex px-2 w-[100%] justify-between ${
                    theme === "dark" ? "text-[#E2DDFE]" : "text-[#333333]"
                } text-xs sm:text-sm`}
            >
                <Text className="flex gap-4 sm:gap-15 font-bold">
                    <p className="text-start">{projet.auteur}</p>
                    <p className="text-end">{projet.domaine}</p>
                </Text>
            </div>
        </Box>
    );
};

export function Projets() {
    const { projects, handlePageChange, setActiveSection, theme, setIsItemClicked } = useAppContext();
    const navigate = useNavigate();

    return (
        <Box
            className={`min-h-[60vh] sm:min-h-[75vh] w-full max-w-[95%] sm:max-w-[80%] ${
                theme === "dark" ? "bg-[#56468B]" : "bg-[#D1D5DB]"
            } flex flex-col shadow-lg mx-auto rounded-xl my-6 sm:my-8 lg:my-10`}
        >
            <div className="flex flex-col lg:flex-row">
                <div className="description flex flex-col py-6 sm:py-8 lg:py-10 gap-4 sm:gap-5 items-center lg:items-start justify-center px-4 lg:pl-10">
                    <div className="title flex flex-col">
                        <Text
                            className={`text-xl max-sm:text-3xl sm:text-2xl md:text-3xl lg:text-4xl flex text-center lg:text-left justify-center lg:justify-start font-bold ${
                                theme === "dark" ? "text-[#E2DDFE]" : "text-[#333333]"
                            }`}
                        >
                            Les meilleurs
                        </Text>
                        <Text
                            className="text-xl sm:text-2xl max-sm:text-3xl md:text-3xl lg:text-4xl flex text-center lg:text-left justify-center lg:justify-start font-bold bg-gradient-to-r from-[#1F6692] to-[#58D5BA] bg-clip-text text-transparent"
                        >
                            Projets Tutorés
                        </Text>
                        <hr className="w-40 sm:w-50 lg:w-70 text-[#58D5BA] opacity-50 mx-auto lg:mx-0" />
                    </div>
                    <div
                        className={`info text-sm sm:text-base max-sm:text-xl lg:text-lg font-bold ${
                            theme === "dark" ? "text-[#E2DDFE]" : "text-[#333333]"
                        } w-full max-w-[300px] lg:w-80`}
                    >
                        Des solutions développées par les étudiants et la communauté open source.
                    </div>
                </div>
                <div className="main-content grid grid-cols-1 sm:grid-cols-2 gap-3 max-sm:gap-10 sm:gap-5 max-sm:mx-auto my-4 sm:my-5 px-4">
                    {projects.slice(0, 4).map((projet) => (
                        <ProjetCard
                            key={projet.id}
                            projet={projet}
                            onClick={() => {
                                setIsItemClicked(true);
                                navigate("/bibliotheque", { state: { tutos: projet } });
                            }}
                        />
                    ))}
                </div>
                <div
                    className={`next ${
                        theme === "dark" ? "bg-[#291f43]" : "bg-[#FFFFFF]"
                    } w-12 max-sm:w-50 sm:w-15 h-24 max-sm:h-15 sm:h-30 my-auto mx-auto rounded-2xl flex items-center justify-center cursor-pointer`}
                    onClick={() => {
                        handlePageChange("Bibliotheque");
                        navigate("/bibliotheque");
                        setActiveSection("Tutos");
                    }}
                >
                    <NexIcon />
                </div>
            </div>
        </Box>
    );
}