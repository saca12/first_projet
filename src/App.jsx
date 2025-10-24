import { Routes, Route, useNavigate } from "react-router-dom";
import Header from "./components/Header";
import { Home } from "/src/pages/home/home.jsx";
import { Bibliotheque } from "/src/pages/bibliotheque/bibliotheque.jsx";
import { Favorite } from "/src/pages/favorite/favorite.jsx";
import { Portail } from "/src/pages/portail/portail.jsx";
import { useEffect } from "react";
import { AppProvider, useAppContext } from "./context/AppContext";
import { Theme } from "@radix-ui/themes";
import "@radix-ui/themes/styles.css";

const navLinks = [
  { name: "Home", path: "/home", element: <Home /> },
  { name: "Bibliotheque", path: "/bibliotheque", element: <Bibliotheque /> },
  { name: "Favoris", path: "/favoris", element: <Favorite /> },
  { name: "Mon portail", path: "/portail", element: <Portail /> }
];

function AppContent() {
  const { theme, toggleTheme, activePage, handlePageChange } = useAppContext();
  const navigate = useNavigate();

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  // Redirection initiale vers /home
  useEffect(() => {
    if (window.location.pathname !== "/home") {
      handlePageChange("Home");
      navigate("/home", { replace: true });
    }
  }, []);

  return (
    <Theme appearance={theme === "dark" ? "dark" : "light"} accentColor="indigo">
      <div className={`${theme === "dark" ? "bg-[#291F43]" : "bg-[#f5f5f5]"}`}>
        <Header />
        <Routes>
          {navLinks.map((link) => (
            <Route key={link.name} path={link.path} element={link.element} />
          ))}
        </Routes>
      </div>
    </Theme>
  );
}

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}