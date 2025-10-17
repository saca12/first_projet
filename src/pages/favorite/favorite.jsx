import { Box, Text } from "@radix-ui/themes";
import { useState, useMemo, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

import { Document } from "../home/news";
import { ProjetCard } from "../home/projets";

import isiData from "/src/data/isi.json";
import rtData from "/src/data/rt.json";
import glData from "/src/data/gl.json";

const classMap = { isi: isiData, rt: rtData, gl: glData };

const topLinks = [
  { name: "Cours", key: "cours" },
  { name: "TD & TP", key: "tdtp" },
  { name: "Examens", key: "examens" },
  { name: "Livres", key: "livres" },
  { name: "Tutos", key: "tutos" }
];

export function Favorite() {
  const [selectedClass, setSelectedClass] = useState("isi");
  const [activeSection, setActiveSection] = useState("Cours");
  const [direction, setDirection] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const contentRef = useRef(null);

  const classData = useMemo(() => classMap[selectedClass], [selectedClass]);

  // 🧠 Fusion dynamique des données favorites
  const getFullFavorites = (sectionKey) => {
    const allData = {
      cours: [
        ...(classData.bibliotheque?.cours || []),
        ...(classData.news?.filter((n) => n.type === "cours") || [])
      ],
      tdtp: classData.bibliotheque?.tdtp || [],
      examens: classData.bibliotheque?.examens || [],
      livres: [
        ...(classData.bibliotheque?.livres || []),
        ...(classData.news?.filter((n) => n.type === "livre") || [])
      ],
      tutos: [
        ...(classData.bibliotheque?.tutos || []),
        ...(classData.projets?.tutores || []),
        ...(classData.projets?.opensource || [])
      ]
    };
    const combined = allData[sectionKey] || [];
    return combined.filter((item) => item.liked === true);
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
        <div className="grid grid-cols-3 gap-6 w-full max-w-[95%] mx-auto">
          {content.map((doc, i) => (
            <div key={i} className="w-full">
              <Document
                book={{ ...doc, classe: selectedClass.toUpperCase() }}
              />
            </div>
          ))}
          {content.length === 0 && (
            <Text className="text-center text-[#E2DDFE] opacity-70 col-span-2">
              Aucun favori trouvé.
            </Text>
          )}
        </div>
      );
    }

    if (sectionKey === "tutos") {
      return (
        <div className="flex flex-wrap justify-center gap-6 w-full max-w-[95%] mx-auto">
          {content.map((proj, i) => (
            <ProjetCard key={i} projet={proj} />
          ))}
          {content.length === 0 && (
            <Text className="text-center text-[#E2DDFE] opacity-70 w-full">
              Aucun projet favori trouvé.
            </Text>
          )}
        </div>
      );
    }

    return <Text className="text-[#E2DDFE]">Aucune donnée disponible.</Text>;
  };

  const variants = {
    enter: (dir) => ({ x: dir > 0 ? 100 : -100, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir) => ({ x: dir < 0 ? 100 : -100, opacity: 0 })
  };

  return (
    <Box className="pt-16 w-full flex flex-col bg-[#3C2E69] min-h-screen text-[#E2DDFE]">
      <div className="flex items-center mt-5 justify-between w-full px-6">
        <Box className=" max-w-[95%]">
          <Text className="text-4xl flex text-center justify-baseline font-bold bg-gradient-to-r from-[#1F6692] to-[#58D5BA] bg-clip-text text-transparent">
            Mes Favoris
          </Text>
          <hr className="w-50 text-[#58D5BA] opacity-50" />
        </Box>
        {/* 🔍 Barre de recherche */}
        <Box className="w-[30%] max-w-[1200px] ml-15">
          <input
            type="text"
            placeholder="Rechercher un favori..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-3 rounded-md bg-[#291F43] text-[#E2DDFE] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#28D5BA]"
          />
        </Box>
      </div>
      {/* 🧭 Barre horizontale */}
      <Box className="w-124 h-15 mt-5 ml-15 bg-[#56468B] border-b border-[#3C2E69] flex justify-center items-center mx-auto justify-center items-center ">
        {topLinks.map((link) => (
          <button
            key={link.name}
            onClick={() => handleTabChange(link.name)}
            className={`px-6 h-[100%] font-semibold transition-colors ${
              activeSection === link.name
                ? "bg-[#291F43] text-[#58D5BA]"
                : "hover:bg-[#291F43]  hover:opacity-70"
            }`}
          >
            {" "}
            {link.name}
          </button>
        ))}
      </Box>

      {/* 📚 Zone principale */}
      <Box
        ref={contentRef}
        className="flex-grow w-full overflow-y-auto flex flex-col items-center px-6 py-8"
      >
        {/* ✨ Contenu animé */}
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
