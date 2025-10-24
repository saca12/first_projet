import { createContext, useContext, useState, useEffect } from "react";
import isiData from "/src/data/isi.json";
import rtData from "/src/data/rt.json";
import glData from "/src/data/gl.json";
import { v4 as uuidv4 } from "uuid";

const classMap = { isi: isiData, rt: rtData, gl: glData };

const AppContext = createContext();

export function AppProvider({ children }) {
  // Initialisation des favoris avec les données du localStorage ou vide
  const [favorites, setFavorites] = useState(() => {
    const savedFavorites = localStorage.getItem("favorites");
    return savedFavorites ? JSON.parse(savedFavorites) : [];
  });
  // État pour le thème
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "dark");
  // État pour la page active
  const [activePage, setActivePage] = useState("Home");
  // État pour les livres de la section Nouveautés avec statut liked
  const [newsBooks, setNewsBooks] = useState(() => {
    const savedNewsBooks = localStorage.getItem("newsBooks");
    return savedNewsBooks
      ? JSON.parse(savedNewsBooks)
      : Object.entries(classMap).flatMap(([classKey, data]) =>
          data.news.map((book, index) => ({
            ...book,
            id: book.id || `${classKey}-news-${index}`,
            classe: classKey.toUpperCase(),
            liked: localStorage.getItem("favorites")
              ? JSON.parse(localStorage.getItem("favorites")).includes(book.id || `${classKey}-news-${index}`)
              : false,
          }))
        );
  });
  // État pour les livres de la bibliothèque avec statut liked
  const [libraryBooks, setLibraryBooks] = useState(() => {
    const savedLibraryBooks = localStorage.getItem("libraryBooks");
    return savedLibraryBooks
      ? JSON.parse(savedLibraryBooks)
      : Object.entries(classMap).flatMap(([classKey, data]) =>
          Object.entries(data.bibliotheque || {}).flatMap(([sectionKey, section]) =>
            section.map((item, index) => ({
              ...item,
              id: item.id || `${classKey}-${sectionKey}-${index}`,
              type: sectionKey,
              classe: classKey.toUpperCase(),
              liked: localStorage.getItem("favorites")
                ? JSON.parse(localStorage.getItem("favorites")).includes(item.id || `${classKey}-${sectionKey}-${index}`)
                : false,
            }))
          )
        );
  });
  // État pour les projets (tutos) avec statut liked
  const [projects, setProjects] = useState(() => {
    const savedProjects = localStorage.getItem("projects");
    return savedProjects
      ? JSON.parse(savedProjects)
      : Object.entries(classMap).flatMap(([classKey, data]) =>
          Object.entries(data.projets || {}).flatMap(([sectionKey, section]) =>
            section.map((item, index) => ({
              ...item,
              id: item.id || `${classKey}-${sectionKey}-${index}`,
              type: "tutos",
              classe: classKey.toUpperCase(),
              liked: localStorage.getItem("favorites")
                ? JSON.parse(localStorage.getItem("favorites")).includes(item.id || `${classKey}-${sectionKey}-${index}`)
                : false,
            }))
          )
        );
  });
  // État pour l'utilisateur
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser
      ? JSON.parse(savedUser)
      : {
          name: "COMPAORE Salomon",
          email: "compaore@example.com",
          formation: "Licence 3 * Informatique * ESI * UNB",
          description: "Passionné du DevOps - Co-Founder de MicraV - Co-Founder MULTIVERUS",
          competences: ["REACT", "Tailwindcss", "TypeScript", "Postman"],
          parcours: [
            {
              annee: "2023-2024",
              niveau: "Licence 1",
              filiere: "Informatique",
              etablissement: "ESI/UNB",
              statut: "termine",
            },
            {
              annee: "2024-2025",
              niveau: "Licence 2",
              filiere: "Informatique",
              etablissement: "ESI/UNB",
              statut: "termine",
            },
            {
              annee: "2025-2026",
              niveau: "Licence 3",
              filiere: "Informatique",
              etablissement: "ESI/UNB",
              statut: "encours",
            },
          ],
        };
  });

  // États pour Bibliotheque
  const [selectedClass, setSelectedClass] = useState("isi");
  const [activeSection, setActiveSection] = useState("Cours");
  const [direction, setDirection] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  // État pour suivre si un item est cliqué
  const [isItemClicked, setIsItemClicked] = useState(false);

  // Sauvegarde des favoris dans le localStorage à chaque changement
  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
    setNewsBooks((prev) =>
      prev.map((book) => ({
        ...book,
        liked: favorites.includes(book.id),
      }))
    );
    setLibraryBooks((prev) =>
      prev.map((item) => ({
        ...item,
        liked: favorites.includes(item.id),
      }))
    );
    setProjects((prev) =>
      prev.map((item) => ({
        ...item,
        liked: favorites.includes(item.id),
      }))
    );
  }, [favorites]);

  // Sauvegarde de l'utilisateur dans le localStorage
  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(user));
  }, [user]);

  // Sauvegarde des publications dans le localStorage
  useEffect(() => {
    localStorage.setItem("newsBooks", JSON.stringify(newsBooks));
    localStorage.setItem("libraryBooks", JSON.stringify(libraryBooks));
    localStorage.setItem("projects", JSON.stringify(projects));
  }, [newsBooks, libraryBooks, projects]);

  const toggleFavorite = (itemId) => {
    setFavorites((prev) =>
      prev.includes(itemId)
        ? prev.filter((id) => id !== itemId)
        : [...prev, itemId]
    );
  };

  const toggleTheme = () => {
    setTheme((prev) => {
      const newTheme = prev === "dark" ? "light" : "dark";
      localStorage.setItem("theme", newTheme);
      return newTheme;
    });
  };

  const handlePageChange = (pageName) => {
    setActivePage(pageName);
  };

  const addPublication = (publication) => {
    if (!publication.type || !publication.domaine || !publication.classe || !publication[publication.type === "tutos" ? "name" : "title"]) {
      return; // Prevent adding incomplete publications
    }

    const newId = uuidv4();
    const publicationWithMeta = {
      ...publication,
      id: newId,
      auteur: user.name,
      classe: publication.classe.toUpperCase(),
      liked: false,
      type: publication.type === "livre" ? "livre" : publication.type, // Ensure livre type consistency
    };

    if (publication.type === "tutos") {
      setProjects((prev) => [...prev, { ...publicationWithMeta, type: "tutos" }]);
    } else if (publication.type === "cours" || publication.type === "livre") {
      setNewsBooks((prev) => [...prev, publicationWithMeta]);
    } else if (publication.type === "tdtp" || publication.type === "examens") {
      setLibraryBooks((prev) => [...prev, publicationWithMeta]);
    }
  };

  return (
    <AppContext.Provider
      value={{
        favorites,
        toggleFavorite,
        theme,
        toggleTheme,
        activePage,
        handlePageChange,
        newsBooks,
        setNewsBooks,
        libraryBooks,
        setLibraryBooks,
        projects,
        setProjects,
        selectedClass,
        setSelectedClass,
        activeSection,
        setActiveSection,
        direction,
        setDirection,
        searchTerm,
        setSearchTerm,
        isItemClicked,
        setIsItemClicked,
        user,
        setUser,
        addPublication,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export const useAppContext = () => useContext(AppContext);