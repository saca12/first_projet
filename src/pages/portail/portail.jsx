import { Box, Text } from "@radix-ui/themes";
import { useAppContext } from "/src/context/AppContext";
import { EditProfil } from "./editProfil";
import { Publication } from "./publications";

export function Portail() {
    const { theme, user } = useAppContext();

    return (
        <Box
            className={`w-full min-h-screen flex flex-col lg:flex-row ${
                theme === "dark" ? "bg-[#2B2442]" : "bg-[#F5F5F5]"
            } pt-16 ${theme === "dark" ? "text-[#E2DDFE]" : "text-[#333333]"} overflow-y-auto`}
        >
            <div className="flex max-sm:flex-col">
              {/* 🧍 Profil utilisateur */}
                <Box
                    className={`w-full lg:w-[45%] ${
                        theme === "dark" ? "bg-[#3C2E69]" : "bg-[#E0E0E0]"
                    } p-4 sm:p-6 flex flex-col items-center shadow-xl overflow-y-auto h-auto lg:h-[92vh]`}
                >
                    {/* Photo de profil */}
                    <div className="flex justify-center mt-4 mb-2">
                        <div
                            className={`w-20 sm:w-24 lg:w-28 h-20 sm:h-24 lg:h-28 rounded-full ${
                                theme === "dark" ? "bg-[#2B2442]" : "bg-[#D1D5DB]"
                            } flex items-center justify-center text-2xl sm:text-3xl font-bold text-[#58D5BA] mb-4`}
                        >
                            {user.name ? user.name.split(" ")[0][0] : "?"}
                        </div>
                    </div>

                    {/* Nom & Formation */}
                    <div className="flex flex-col items-center mb-4 sm:mb-6">
                        <Text className="text-lg sm:text-xl lg:text-2xl font-bold">
                            {user.name || "Nom non défini"}
                        </Text>
                        <Text
                            className={`${
                                theme === "dark" ? "text-[#7AA2FF]" : "text-[#4B6ACF]"
                            } text-sm sm:text-base text-center`}
                        >
                            {user.formation || "Formation non définie"}
                        </Text>
                    </div>

                    {/* Description */}
                    <Text
                        className="text-sm sm:text-base text-center mb-4 sm:mb-6 px-4"
                    >
                        {user.description || "Aucune description disponible"}
                    </Text>

                    {/* Compétences */}
                    <div className="flex flex-wrap justify-center gap-2 mb-4 sm:mb-6">
                        {user.competences.length > 0 ? (
                            user.competences.map((comp, i) => (
                                <span
                                    key={i}
                                    className={`px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm ${
                                        theme === "dark" ? "bg-[#4C4377]" : "bg-[#D1D5DB]"
                                    }`}
                                >
                                    {comp}
                                </span>
                            ))
                        ) : (
                            <Text className="text-sm opacity-80">
                                Aucune compétence ajoutée
                            </Text>
                        )}
                    </div>

                    {/* Parcours */}
                    <Box className="w-full mb-4 sm:mb-6">
                        <Text className="font-bold mb-2 text-sm sm:text-base">
                            Mon parcours
                        </Text>
                        {user.parcours.length > 0 ? (
                            <div className="flex flex-col gap-2">
                                {user.parcours.map((p, i) => (
                                    <div
                                        key={i}
                                        className={`flex flex-col sm:flex-row justify-between px-3 py-2 rounded-md text-xs sm:text-sm ${
                                            p.statut === "encours"
                                                ? `${
                                                      theme === "dark"
                                                          ? "bg-[#5472E4]"
                                                          : "bg-[#4B6ACF]"
                                                  } text-[#FFFFFF]`
                                                : `${
                                                      theme === "dark"
                                                          ? "bg-[#4C4377]"
                                                          : "bg-[#D1D5DB]"
                                                  }`
                                        }`}
                                    >
                                        <span>{p.annee || "Non défini"}</span>
                                        <span>{p.niveau || "Non défini"}</span>
                                        <span>{p.filiere || "Non défini"}</span>
                                        <span>{p.etablissement || "Non défini"}</span>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <Text className="text-sm opacity-80 text-center">
                                Aucun parcours ajouté
                            </Text>
                        )}
                    </Box>

                    <EditProfil />
                </Box>

                {/* 💼 Espace professionnel */}
                <Box><Publication /></Box>
            </div>
        </Box>
    );
}