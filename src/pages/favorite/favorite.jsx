import { Box, Text } from "@radix-ui/themes";
import { useState, useMemo, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Document } from "../home/news";
import { ProjetCard } from "../home/projets";
import { useAppContext } from "/src/context/AppContext";

const topLinks = [
  { name: "Cours", key: "cours" },
  { name: "TD & TP", key: "tdtp" },
  { name: "Examens", key: "examens" },
  { name: "Livres", key: "livres" },
  { name: "Tutos", key: "tutos" }
];

export function Favorite() {
  const { favorites, newsBooks, libraryBooks, projects, theme } = useAppContext();
  const [selectedClass, setSelectedClass] = useState("isi");
  const [activeSection, setActiveSection] = useState("Cours");
  const [direction, setDirection] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const contentRef = useRef(null);

  // 🧠 Fusion dynamique des données favorites
  const getFullFavorites = (sectionKey) => {
    const lowerClass = selectedClass.toLowerCase();
    const allData = {
      cours: [
        ...newsBooks.filter((n) => n.type === "cours" && favorites.includes(n.id) && n.classe.toLowerCase() === lowerClass),
        ...libraryBooks.filter((b) => b.type === "cours" && favorites.includes(b.id) && b.classe.toLowerCase() === lowerClass),
      ],
      tdtp: libraryBooks.filter((b) => b.type === "tdtp" && favorites.includes(b.id) && b.classe.toLowerCase() === lowerClass),
      examens: libraryBooks.filter((b) => b.type === "examens" && favorites.includes(b.id) && b.classe.toLowerCase() === lowerClass),
      livres: [
        ...newsBooks.filter((n) => n.type === "livre" && favorites.includes(n.id) && n.classe.toLowerCase() === lowerClass),
        ...libraryBooks.filter((b) => b.type === "livres" && favorites.includes(b.id) && b.classe.toLowerCase() === lowerClass),
      ],
      tutos: projects.filter((p) => favorites.includes(p.id) && p.classe.toLowerCase() === lowerClass),
    };
    return allData[sectionKey] || [];
  };

  // 🔍 Recherche locale dans les favoris
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

  // Scroll vers le haut lors du changement
  useEffect(() => {
    if (contentRef.current)
      contentRef.current.scrollTo({ top: 0, behavior: "smooth" });
  }, [activeSection, selectedClass]);

  // Calcul direction d'animation
  const handleTabChange = (newSection) => {
    const currentIndex = topLinks.findIndex((l) => l.name === activeSection);
    const newIndex = topLinks.findIndex((l) => l.name === newSection);
    setDirection(newIndex > currentIndex ? 1 : -1);
    setActiveSection(newSection);
  };

  // Rendu du contenu
  const renderContent = () => {
    const sectionKey = topLinks.find((s) => s.name === activeSection)?.key;
    if (!sectionKey) return null;

    const content = filterContent(getFullFavorites(sectionKey));

    if (["cours", "tdtp", "examens", "livres"].includes(sectionKey)) {
      return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 w-full max-w-[95%] mx-auto">
          {content.map((doc) => (
            <motion.div
              key={doc.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Document book={doc} />
            </motion.div>
          ))}
          {content.length === 0 && (
            <Text className={`text-center ${theme === "dark" ? "text-[#E2DDFE]" : "text-[#333333]"} opacity-70 col-span-1 sm:col-span-2 md:col-span-3`}>
              Aucun favori trouvé.
            </Text>
          )}
        </div>
      );
    }

    if (sectionKey === "tutos") {
      return (
        <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-4 w-full max-w-[95%] mx-auto">
          {content.map((proj) => (
            <motion.div
              key={proj.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <ProjetCard projet={proj} />
            </motion.div>
          ))}
          {content.length === 0 && (
            <Text className={`text-center ${theme === "dark" ? "text-[#E2DDFE]" : "text-[#333333]"} opacity-70 w-full`}>
              Aucun projet favori trouvé.
            </Text>
          )}
        </div>
      );
    }

    return <Text className={`${theme === "dark" ? "text-[#E2DDFE]" : "text-[#333333]"}`}>Aucune donnée disponible.</Text>;
  };

  const variants = {
    enter: (dir) => ({ x: dir > 0 ? 100 : -100, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir) => ({ x: dir < 0 ? 100 : -100, opacity: 0 })
  };

  return (
    <Box className={`pt-16 w-full flex flex-col ${theme === "dark" ? "bg-[#3C2E69]" : "bg-[#E0E0E0]"} min-h-screen ${theme === "dark" ? "text-[#E2DDFE]" : "text-[#333333]"}`}>
      <div className="flex flex-col sm:flex-row items-center mt-4 justify-between w-full px-4 gap-4">
        <Box className="w-full sm:w-auto max-w-[95%]">
          <Text className="text-2xl sm:text-3xl md:text-4xl flex text-center justify-center sm:justify-start font-bold bg-gradient-to-r from-[#1F6692] to-[#58D5BA] bg-clip-text text-transparent">
            Mes Favoris
          </Text>
          <hr className="w-40 sm:w-50 text-[#58D5BA] opacity-50 mx-auto sm:mx-0" />
        </Box>
        <Box className="w-full sm:w-[50%] md:w-[30%] max-w-[600px]">
          <input
            type="text"
            placeholder="Rechercher un favori..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={`w-full p-2 sm:p-3 rounded-md ${theme === "dark" ? "bg-[#291F43] text-[#E2DDFE] placeholder-gray-400" : "bg-[#FFFFFF] text-[#333333] placeholder-gray-600"} focus:outline-none focus:ring-2 focus:ring-[#58D5BA]`}
          />
        </Box>
      </div>
      <Box className={`w-full max-w-[95%] h-auto mt-4 mx-auto ${theme === "dark" ? "bg-[#56468B] border-b border-[#3C2E69]" : "bg-[#D1D5DB] border-b border-[#B0B0B0]"} flex flex-wrap justify-center items-center p-2`}>
        {topLinks.map((link) => (
          <button
            key={link.name}
            onClick={() => handleTabChange(link.name)}
            className={`px-4 py-2 font-semibold transition-colors text-sm sm:text-base ${
              activeSection === link.name
                ? `${theme === "dark" ? "bg-[#291F43] text-[#58D5BA]" : "bg-[#FFFFFF] text-[#4B6ACF]"}`
                : `${theme === "dark" ? "hover:bg-[#291F43]" : "hover:bg-[#FFFFFF]"} hover:opacity-70`
            }`}
          >
            {link.name}
          </button>
        ))}
      </Box>

      <Box
        ref={contentRef}
        className="flex-grow w-full overflow-y-auto flex flex-col items-center px-4 py-6"
      >
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={`${selectedClass}-${activeSection}-${searchTerm}`}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 200, damping: 25 },
              opacity: { duration: 0.3 }
            }}
            className="w-full flex justify-center"
          >
            {renderContent()}
          </motion.div>
        </AnimatePresence>
      </Box>
    </Box>
  );
}