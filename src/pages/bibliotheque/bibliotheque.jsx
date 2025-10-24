import { Box, Text, Select } from "@radix-ui/themes";
import { useRef, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Document } from "../home/news";
import { ProjetCard } from "../home/projets";
import { useAppContext } from "/src/context/AppContext";
import { DownIcon } from "../../assets/icons/DownIcon";
import { UpIcon } from "../../assets/icons/UpIcon";
import { DocInfo } from "./docInfo";
import { TutosInfos } from "./tutosInfos";
import { BackIcon } from "../../assets/icons/BackIcon";
import { useLocation, useNavigate } from "react-router-dom";

const sidebarLinks = [
    { name: "Cours", key: "cours" },
    { name: "TD & TP", key: "tdtp" },
    { name: "Examens", key: "examens" },
    { name: "Livres", key: "livres" },
    { name: "Tutos", key: "tutos" },
];

export function Bibliotheque() {
    const {
        newsBooks,
        libraryBooks,
        projects,
        selectedClass,
        setSelectedClass,
        activeSection,
        setActiveSection,
        direction,
        setDirection,
        searchTerm,
        setSearchTerm,
        theme,
        isItemClicked,
        setIsItemClicked,
    } = useAppContext();
    const contentRef = useRef(null);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    const selectedBook = location.state?.book;
    const selectedTutos = location.state?.tutos;

    // 🧠 Fusion dynamique des données
    const getFullSectionData = (sectionKey) => {
        const lowerClass = selectedClass.toLowerCase();
        const allData = {
            cours: [
                ...newsBooks.filter((n) => n.type === "cours" && n.classe.toLowerCase() === lowerClass),
                ...libraryBooks.filter((b) => b.type === "cours" && b.classe.toLowerCase() === lowerClass),
            ],
            tdtp: libraryBooks.filter((b) => b.type === "tdtp" && b.classe.toLowerCase() === lowerClass),
            examens: libraryBooks.filter((b) => b.type === "examens" && b.classe.toLowerCase() === lowerClass),
            livres: [
                ...newsBooks.filter((n) => n.type === "livre" && n.classe.toLowerCase() === lowerClass),
                ...libraryBooks.filter((b) => b.type === "livres" && b.classe.toLowerCase() === lowerClass),
            ],
            tutos: projects.filter((p) => p.classe.toLowerCase() === lowerClass),
        };
        return allData[sectionKey] || [];
    };

    // 🔍 Filtrage selon la recherche
    const filterContent = (items) => {
        if (!searchTerm.trim()) return items;
        const term = searchTerm.toLowerCase();
        return items.filter(
            (i) =>
                i.title?.toLowerCase().includes(term) ||
                i.name?.toLowerCase().includes(term) ||
                i.auteur?.toLowerCase().includes(term) ||
                i.domaine?.toLowerCase().includes(term)
        );
    };

    // Remonte le scroll à chaque changement
    useEffect(() => {
        if (contentRef.current) {
            contentRef.current.scrollTo({ top: 0, behavior: "smooth" });
        }
    }, [activeSection, selectedClass]);

    // ↔️ Gestion de la direction d'animation
    const handleSectionChange = (newSection) => {
        const currentIndex = sidebarLinks.findIndex((l) => l.name === activeSection);
        const newIndex = sidebarLinks.findIndex((l) => l.name === newSection);
        setDirection(newIndex > currentIndex ? 1 : -1);
        setActiveSection(newSection);
        setSearchTerm(""); // réinitialise la recherche à chaque changement
        setIsItemClicked(false); // Reset item clicked state when changing section
    };

    // Rendu du contenu
    const renderContent = () => {
        const sectionKey = sidebarLinks.find((s) => s.name === activeSection)?.key;
        if (!sectionKey) return null;

        const fullData = getFullSectionData(sectionKey);
        const content = filterContent(fullData);

        if (["cours", "tdtp", "examens", "livres"].includes(sectionKey)) {
            return (
                <div className="grid grid-cols-2 max-sm:grid-cols-1 gap-6 w-full max-w-[95%] mx-auto">
                    {content.map((doc) => (
                        <Document
                            key={doc.id}
                            book={doc}
                            onClick={() => {
                                setIsItemClicked(true);
                                navigate("/bibliotheque", { state: { book: doc } });
                            }}
                        />
                    ))}
                    {content.length === 0 && (
                        <Text
                            className={`text-center ${
                                theme === "dark" ? "text-[#E2DDFE]" : "text-[#333333]"
                            } opacity-80 col-span-2`}
                        >
                            Aucun document trouvé
                        </Text>
                    )}
                </div>
            );
        }

        if (sectionKey === "tutos") {
            return (
                <div className="flex flex-wrap justify-center gap-6 w-full max-w-[95%] mx-auto">
                    {content.map((proj) => (
                        <ProjetCard
                            key={proj.id}
                            projet={proj}
                            onClick={() => {
                                setIsItemClicked(true);
                                navigate("/bibliotheque", { state: { tutos: proj } });
                            }}
                        />
                    ))}
                    {content.length === 0 && (
                        <Text
                            className={`text-center ${
                                theme === "dark" ? "text-[#E2DDFE]" : "text-[#333333]"
                            } opacity-80 w-full`}
                        >
                            Aucun tutoriel trouvé
                        </Text>
                    )}
                </div>
            );
        }

        return (
            <Text className={`${theme === "dark" ? "text-[#E2DDFE]" : "text-[#333333]"}`}>
                Aucune donnée disponible.
            </Text>
        );
    };

    // Variantes d’animation slide horizontal
    const variants = {
        enter: (dir) => ({ x: dir > 0 ? 150 : -150, opacity: 0 }),
        center: { x: 0, opacity: 1 },
        exit: (dir) => ({ x: dir < 0 ? 150 : -150, opacity: 0 }),
    };

    // Animation for sidebar
    const sidebarVariants = {
        hidden: { height: 0, opacity: 0 },
        visible: { height: "auto", opacity: 1, transition: { duration: 0.3, ease: "easeInOut" } },
    };

    // Animation for toggle icon
    const iconVariants = {
        closed: { rotate: 0 },
        open: { rotate: 180, transition: { duration: 0.3 } },
    };

    const handleBack = () => {
        setIsItemClicked(false);
        navigate("/bibliotheque", { state: {} }); // Clear book state on back
    };

    return (
        <Box
            className={`pt-16 min-h-screen w-full flex ${
                theme === "dark" ? "bg-[#291F43]" : "bg-[#F5F5F5]"
            }`}
        >
            <div className="flex overflow-hidden flex-col lg:flex-row">
                <Box
                    className={`w-full lg:w-[25%] min-h-[auto] lg:min-h-[90vh] ${
                        theme === "dark" ? "bg-[#56468B]" : "bg-[#D1D5DB]"
                    } flex flex-col`}
                >
                    <Box
                        className={`w-full p-5 border-b-2 ${
                            theme === "dark" ? "border-[#3C2E69]" : "border-[#B0B0B0]"
                        }`}
                    >
                        <Select.Root onValueChange={setSelectedClass} defaultValue="isi">
                            <Select.Trigger className="mt-3 w-[90%] flex mx-auto" />
                            <Select.Content>
                                <Select.Item value="isi">Informatique & Systèmes Intelligents</Select.Item>
                                <Select.Item value="rt">Réseaux & Télécoms</Select.Item>
                                <Select.Item value="gl">Génie Logiciel</Select.Item>
                            </Select.Content>
                        </Select.Root>
                    </Box>

                    {/* Toggle button for mobile */}
                    <div className="lg:hidden">
                        <Box
                            className="flex justify-center items-center p-2 cursor-pointer"
                            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                        >
                            <div className="flex lg:hidden justify-between">
                                <Text
                                    className={`font-bold ${
                                        theme === "dark" ? "text-[#E2DDFE]" : "text-[#333333]"
                                    }`}
                                >
                                    Sections
                                </Text>
                                <motion.div
                                    className="ml-2"
                                    variants={iconVariants}
                                    initial="closed"
                                    animate={isSidebarOpen ? "open" : "closed"}
                                >
                                    {isSidebarOpen ? <UpIcon /> : <DownIcon />}
                                </motion.div>
                            </div>
                        </Box>
                    </div>

                    {/* Sidebar links - hidden on mobile when closed */}
                    <AnimatePresence>
                        {isSidebarOpen && (
                            <motion.div
                                variants={sidebarVariants}
                                initial="hidden"
                                animate="visible"
                                exit="hidden"
                                className={`w-full flex-col mt-0 font-bold ${
                                    theme === "dark" ? "text-[#E2DDFE]" : "text-[#333333]"
                                } text-lg overflow-hidden`}
                            >
                                {sidebarLinks.map((link) => (
                                    <motion.div
                                        key={link.name}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{
                                            duration: 0.2,
                                            delay: sidebarLinks.findIndex((l) => l.name === link.name) * 0.05,
                                        }}
                                        onClick={() => {
                                            handleSectionChange(link.name);
                                            setIsSidebarOpen(false); // Close sidebar after selection on mobile
                                        }}
                                        className={`py-3 pl-10 cursor-pointer transition-colors ${
                                            activeSection === link.name
                                                ? `${
                                                      theme === "dark"
                                                          ? "bg-[#291F43] text-[#58D5BA]"
                                                          : "bg-[#FFFFFF] text-[#4B6ACF]"
                                                  }`
                                                : `${
                                                      theme === "dark" ? "hover:bg-[#3C2E69]" : "hover:bg-[#E0E0E0]"
                                                  }`
                                        }`}
                                    >
                                        {link.name}
                                    </motion.div>
                                ))}
                            </motion.div>
                        )}
                    </AnimatePresence>
                    {/* Desktop Sidebar (Visible only on lg and above) */}
                    <div className="max-sm:hidden">
                        <Box
                            className={`flex w-full flex-col mt-5 font-bold text-lg ${
                                theme === "dark" ? "bg-[#291F43] text-[#E2DDFE]" : "bg-[#FFFFFF] text-[#333333]"
                            }`}
                        >
                            {sidebarLinks.map((link) => (
                                <div
                                    key={link.name}
                                    onClick={() => handleSectionChange(link.name)}
                                    className={`py-3 pl-10 cursor-pointer transition-colors duration-200 ${
                                        activeSection === link.name
                                            ? `${
                                                  theme === "dark"
                                                      ? "bg-[#3C2E69] text-[#58D5BA]"
                                                      : "bg-[#E0E0E0] text-[#4B6ACF]"
                                              }`
                                            : `${
                                                  theme === "dark" ? "hover:bg-[#3C2E69]" : "hover:bg-[#E0E0E0]"
                                              }`
                                    }`}
                                >
                                    {link.name}
                                </div>
                            ))}
                        </Box>
                    </div>
                </Box>

                <Box
                    ref={contentRef}
                    className={`w-full lg:w-[75%] ${
                        theme === "dark" ? "bg-[#3C2E69]" : "bg-[#E0E0E0]"
                    } h-[90vh] overflow-y-scroll flex flex-col items-center px-6 py-8`}
                >
                    {isItemClicked ? (
                        <div className="w-[90%] h-10 mx-auto">
                            <BackIcon onBack={handleBack} />
                        </div>
                    ) : (
                        <Box className="w-full max-w-[95%] mb-6 flex flex-col gap-3">
                            <Text
                                className={`text-3xl font-bold ${
                                    theme === "dark" ? "text-[#E2DDFE]" : "text-[#333333]"
                                }`}
                            >
                                {activeSection} — Classe {selectedClass.toUpperCase()}
                            </Text>

                            <input
                                type="text"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                placeholder="Rechercher un document ou un projet..."
                                className={`w-full p-3 rounded-md ${
                                    theme === "dark"
                                        ? "bg-[#291F43] text-[#E2DDFE] placeholder-gray-400"
                                        : "bg-[#FFFFFF] text-[#333333] placeholder-gray-600"
                                } focus:outline-none focus:ring-2 focus:ring-[#58D5BA]`}
                            />
                        </Box>
                    )}

                    <AnimatePresence mode="wait" custom={direction}>
                        <motion.div
                            key={`${selectedClass}-${activeSection}-${searchTerm}-${isItemClicked}`}
                            custom={direction}
                            variants={variants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            transition={{
                                x: { type: "spring", stiffness: 200, damping: 25 },
                                opacity: { duration: 0.3 },
                            }}
                            className="w-full flex justify-center"
                        >
                            {isItemClicked ? 
                                (activeSection === "Tutos" ? 
                                    <TutosInfos tutos={selectedTutos} /> : 
                                    <DocInfo book={selectedBook} />
                                ) : 
                                renderContent()}
                        </motion.div>
                    </AnimatePresence>
                </Box>
            </div>
        </Box>
    );
}