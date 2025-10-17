import { Routes, Route, useNavigate } from "react-router-dom";
import Header from "./components/Header";
import { Home } from "/src/pages/home/home.jsx";
import { Bibliotheque } from "/src/pages/bibliotheque/bibliotheque.jsx";
import { Favorite } from "/src/pages/favorite/favorite.jsx";
import { Portail } from "/src/pages/portail/portail.jsx";
import { useState, useEffect } from "react";
import { AppProvider } from "./context/AppContext";
import { Theme } from "@radix-ui/themes";
import "@radix-ui/themes/styles.css";

const navLinks = [
  { name: "Home", path: "/home", element: <Home /> },
  { name: "Bibliotheque", path: "/bibliotheque", element: <Bibliotheque /> },
  { name: "Favoris", path: "/favoris", element: <Favorite /> },
  { name: "Mon portail", path: "/portail", element: <Portail /> }
];

export default function App() {
  const [activePage, setActivePage] = useState("Home");
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "dark");
  const navigate = useNavigate();

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    handlePageChange("Home", "/home");
  }, []);

  const handlePageChange = (pageName, path) => {
    setActivePage(pageName);
    navigate(path);
  };

  const handleThemeToggle = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  return (
    <AppProvider>
      {/* ✅ Contexte Radix UI ici */}
      <Theme
        appearance={theme === "dark" ? "dark" : "light"}
        accentColor="indigo"
      >
        <div
          className={`${theme === "dark" ? "bg-[#291F43]" : "bg-[#f5f5f5]"}`}
        >
          <Header
            links={navLinks}
            activePage={activePage}
            onLinkClicked={handlePageChange}
            onThemeToggle={handleThemeToggle}
            theme={theme}
          />

          <Routes>
            {navLinks.map((link) => (
              <Route key={link.name} path={link.path} element={link.element} />
            ))}
          </Routes>
        </div>
      </Theme>
    </AppProvider>
  );
}
