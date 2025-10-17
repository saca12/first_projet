import { Box, Text, Select } from "@radix-ui/themes";
import { useState, useMemo, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Document } from "../home/news";
import { ProjetCard } from "../home/projets";

import isiData from "/src/data/isi.json";
import rtData from "/src/data/rt.json";
import glData from "/src/data/gl.json";

const classMap = { isi: isiData, rt: rtData, gl: glData };

const sidebarLinks = [
  { name: "Cours", key: "cours" },
  { name: "TD & TP", key: "tdtp" },
  { name: "Examens", key: "examens" },
  { name: "Livres", key: "livres" },
  { name: "Tutos", key: "tutos" }
];

export function Bibliotheque() {
  const [selectedClass, setSelectedClass] = useState("isi");
  const [activeSection, setActiveSection] = useState("Cours");
  const [direction, setDirection] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const contentRef = useRef(null);

  const classData = useMemo(() => classMap[selectedClass], [selectedClass]);
  const data = classData.bibliotheque;

  // Remonte le scroll à chaque changement
  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [activeSection, selectedClass]);

  // ↔️ Gestion de la direction d'animation
  const handleSectionChange = (newSection) => {
    const currentIndex = sidebarLinks.findIndex(
      (l) => l.name === activeSection
    );
    const newIndex = sidebarLinks.findIndex((l) => l.name === newSection);
    setDirection(newIndex > currentIndex ? 1 : -1);
    setActiveSection(newSection);
    setSearchTerm(""); // réinitialise la recherche à chaque changement
  };

  // 🧠 Fusion dynamique des données
  const getFullSectionData = (sectionKey) => {
    let base = data[sectionKey] || [];

    switch (sectionKey) {
      case "cours":
        return [
          ...(classData.news?.filter((n) => n.type === "cours") || []),
          ...base
        ];
      case "livres":
        return [
          ...(classData.news?.filter((n) => n.type === "livre") || []),
          ...base
        ];
      case "tutos":
        return [
          ...(classData.projets?.tutores || []),
          ...(classData.projets?.opensource || []),
          ...base
        ];
      default:
        return base;
    }
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

  // Rendu du contenu
  const renderContent = () => {
    const sectionKey = sidebarLinks.find((s) => s.name === activeSection)?.key;
    if (!sectionKey) return null;

    const fullData = getFullSectionData(sectionKey);
    const content = filterContent(fullData);

    if (["cours", "tdtp", "examens", "livres"].includes(sectionKey)) {
      return (
        <div className="grid grid-cols-2 gap-6 w-full max-w-[95%] mx-auto">
          {content.map((doc, i) => (
            <div key={i} className="w-full">
              <Document
                book={{ ...doc, classe: selectedClass.toUpperCase() }}
              />
            </div>
          ))}
          {content.length === 0 && (
            <Text className="text-center text-[#E2DDFE] opacity-80 col-span-2">
              Aucun document trouvé
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
            <Text className="text-center text-[#E2DDFE] opacity-80 w-full">
              Aucun tutoriel trouvé
            </Text>
          )}
        </div>
      );
    }

    return <Text className="text-[#E2DDFE]">Aucune donnée disponible.</Text>;
  };

  // Variantes d’animation slide horizontal
  const variants = {
    enter: (dir) => ({ x: dir > 0 ? 150 : -150, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir) => ({ x: dir < 0 ? 150 : -150, opacity: 0 })
  };

  return (
    <Box className="pt-16 min-h-screen w-full flex ">
      {/* 🧭 Sidebar */}
      <div className="flex overflow-hidden">
        <Box className="w-[25%] min-h-[90vh]  bg-[#56468B] flex flex-col">
          <Box className="w-full p-5 border-b-2 border-[#3C2E69]">
            <Select.Root onValueChange={setSelectedClass} defaultValue="isi">
              <Select.Trigger className="mt-3 w-[90%] flex mx-auto" />
              <Select.Content>
                <Select.Item value="isi">
                  Informatique & Systèmes Intelligents
                </Select.Item>
                <Select.Item value="rt">Réseaux & Télécoms</Select.Item>
                <Select.Item value="gl">Génie Logiciel</Select.Item>
              </Select.Content>
            </Select.Root>
          </Box>

          <Box className="links w-full flex flex-col mt-5 font-bold text-[#E2DDFE] text-lg">
            {sidebarLinks.map((link) => (
              <div
                key={link.name}
                onClick={() => handleSectionChange(link.name)}
                className={`py-3 pl-10 cursor-pointer transition-colors ${
                  activeSection === link.name
                    ? "bg-[#291F43] text-[#58D5BA]"
                    : "hover:bg-[#3C2E69]"
                }`}
              >
                {link.name}
              </div>
            ))}
          </Box>
        </Box>

        {/* 📚 Contenu principal */}
        <Box
          ref={contentRef}
          className="w-[75%] bg-[#3C2E69] h-[90vh] overflow-y-scroll flex flex-col items-center px-6 py-8"
        >
          {/* Titre + Barre de recherche */}
          <Box className="w-full max-w-[95%] mb-6 flex flex-col gap-3">
            <Text className="text-3xl font-bold text-[#E2DDFE]">
              {activeSection} — Classe {selectedClass.toUpperCase()}
            </Text>

            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Rechercher un document ou un projet..."
              className="w-full p-3 rounded-md bg-[#291F43] text-[#E2DDFE] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#58D5BA]"
            />
          </Box>

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
      </div>
    </Box>
  );
}
