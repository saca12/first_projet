import { Logo } from "./Logo";
import * as Switch from "@radix-ui/react-switch";
import { useAppContext } from "/src/context/AppContext";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function Header() {
  const { activePage, handlePageChange, theme, toggleTheme } = useAppContext();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const links = [
    { name: "Acceuil", path: "/home" },
    { name: "Bibliotheque", path: "/bibliotheque" },
    { name: "Favoris", path: "/favoris" },
    { name: "Mon portail", path: "/portail" }
  ];

  const handleLinkClick = (pageName, path) => {
    handlePageChange(pageName);
    navigate(path);
    setIsMenuOpen(false);
  };

  return (
    <nav className={`fixed top-0 ${theme === "dark" ? "bg-[#291F43]" : "bg-[#F5F5F5]"} backdrop-blur-sm nav-bar flex justify-between items-center w-full h-16 z-50`}>
      <div className={`flex items-center justify-between w-[95%] max-w-[1400px] mx-auto border-b ${theme === "dark" ? "border-gray-600" : "border-gray-300"} h-full px-4`}>
        {/* SECTION GAUCHE : LOGO + NAV */}
        <section className="flex items-center gap-4">
          <button
            className="lg:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} className={`${theme === "dark" ? "text-[#E2DDFE]" : "text-[#333333]"}`} /> : <Menu size={24} className={`${theme === "dark" ? "text-[#E2DDFE]" : "text-[#333333]"}`} />}
          </button>
          <div className="flex mx-auto"><Logo /></div>
          <ul className={`hidden lg:flex gap-4 text-sm font-medium border-l-2 ${theme === "dark" ? "border-[#7BA0FF]" : "border-[#4B6ACF]"} pl-4`}>
            {links.map((link) => (
              <li
                key={link.name}
                onClick={() => handleLinkClick(link.name, link.path)}
                className={`cursor-pointer transition-colors ${
                  activePage === link.name
                    ? `${theme === "dark" ? "text-[#9EB1FF]" : "text-[#4B6ACF]"} font-semibold`
                    : `${theme === "dark" ? "text-[#E2DDFE] hover:text-[#9EB1FF]" : "text-[#333333] hover:text-[#4B6ACF]"}`
                }`}
              >
                {link.name}
              </li>
            ))}
          </ul>
        </section>

        {/* SECTION DROITE : THÈME + PROFIL */}
        <section className="flex items-center gap-0">
          {/* Toggle theme (Radix UI Switch) */}
          <div className="flex items-center gap-2">
            <Switch.Root
              className="w-[42px] h-[25px] bg-gray-500 rounded-full relative data-[state=checked]:bg-[#9EB1FF] focus:outline-none"
              checked={theme === "dark"}
              onCheckedChange={()=>toggleTheme(theme)}
            >
              <Switch.Thumb className="block w-[21px] h-[21px] bg-white rounded-full transition-transform translate-x-[2px] will-change-transform data-[state=checked]:translate-x-[19px]" />
            </Switch.Root>
          </div>

          {/* User icon */}
          <div className="user-info ml-3 my-auto pl-3 border-l-2 border-[#7BA0FF]">
            <svg
              width="25"
              height="25"
              viewBox="0 0 51 48"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9.8175 35.495C11.985 33.9025 14.4075 32.6469 17.085 31.7281C19.7625 30.8094 22.5675 30.35 25.5 30.35C28.4325 30.35 31.2375 30.8094 33.915 31.7281C36.5925 32.6469 39.015 33.9025 41.1825 35.495C42.67 33.8208 43.8281 31.9221 44.6569 29.7987C45.4856 27.6754 45.9 25.4092 45.9 23C45.9 17.5692 43.9131 12.9448 39.9394 9.12687C35.9656 5.30896 31.1525 3.4 25.5 3.4C19.8475 3.4 15.0344 5.30896 11.0606 9.12687C7.08688 12.9448 5.1 17.5692 5.1 23C5.1 25.4092 5.51437 27.6754 6.34312 29.7987C7.17187 31.9221 8.33 33.8208 9.8175 35.495ZM25.5 25.45C22.9925 25.45 20.8781 24.6231 19.1569 22.9694C17.4356 21.3156 16.575 19.2842 16.575 16.875C16.575 14.4658 17.4356 12.4344 19.1569 10.7806C20.8781 9.12688 22.9925 8.3 25.5 8.3C28.0075 8.3 30.1219 9.12688 31.8431 10.7806C33.5644 12.4344 34.425 14.4658 34.425 16.875C34.425 19.2842 33.5644 21.3156 31.8431 22.9694C30.1219 24.6231 28.0075 25.45 25.5 25.45ZM25.5 47.5C21.9725 47.5 18.6575 46.8569 15.555 45.5706C12.4525 44.2844 9.75375 42.5388 7.45875 40.3338C5.16375 38.1288 3.34688 35.5358 2.00813 32.555C0.669375 29.5742 0 26.3892 0 23C0 19.6108 0.669375 16.4258 2.00813 13.445C3.34688 10.4642 5.16375 7.87125 7.45875 5.66625C9.75375 3.46125 12.4525 1.71563 15.555 0.429375C18.6575 -0.856875 21.9725 -1.5 25.5 -1.5C29.0275 -1.5 32.3425 -0.856875 35.445 0.429375C38.5475 1.71563 41.2462 3.46125 43.5412 5.66625C45.8362 7.87125 47.6531 10.4642 48.9919 13.445C50.3306 16.4258 51 19.6108 51 23C51 26.3892 50.3306 29.5742 48.9919 32.555C47.6531 35.5358 45.8362 38.1288 43.5412 40.3338C41.2462 42.5388 38.5475 44.2844 35.445 45.5706C32.3425 46.8569 29.0275 47.5 25.5 47.5ZM25.5 42.6C27.7525 42.6 29.8775 42.2835 31.875 41.6506C33.8725 41.0177 35.7 40.1092 37.3575 38.925C35.7 37.7408 33.8725 36.8323 31.875 36.1994C29.8775 35.5665 27.7525 35.25 25.5 35.25C23.2475 35.25 21.1225 35.5665 19.125 36.1994C17.1275 36.8323 15.3 37.7408 13.6425 38.925C15.3 40.1092 17.1275 41.0177 19.125 41.6506C21.1225 42.2835 23.2475 42.6 25.5 42.6ZM25.5 20.55C26.605 20.55 27.5187 20.2029 28.2412 19.5088C28.9637 18.8146 29.325 17.9367 29.325 16.875C29.325 15.8133 28.9637 14.9354 28.2412 14.2413C27.5187 13.5471 26.605 13.2 25.5 13.2C24.395 13.2 23.4812 13.5471 22.7587 14.2413C22.0362 14.9354 21.675 15.8133 21.675 16.875C21.675 17.9367 22.0362 18.8146 22.7587 19.5088C23.4812 20.2029 24.395 20.55 25.5 20.55Z"
                fill="#7BA0FF"
              />
            </svg>
          </div>
        </section>
      </div>
      {isMenuOpen && (
        <div className={`lg:hidden absolute top-16 left-0 w-full ${theme === "dark" ? "bg-[#291F43]" : "bg-[#F5F5F5]"} shadow-lg z-40`}>
          <ul className="flex flex-col items-center justify-center gap-10 py-4 h-100">
            {links.map((link) => (
              <li
                key={link.name}
                onClick={() => handleLinkClick(link.name, link.path)}
                className={`cursor-pointer transition-colors text-2xl ${
                  activePage === link.name
                    ? `${theme === "dark" ? "text-[#9EB1FF]" : "text-[#4B6ACF]"} font-semibold`
                    : `${theme === "dark" ? "text-[#E2DDFE] hover:text-[#9EB1FF]" : "text-[#333333] hover:text-[#4B6ACF]"}`
                }`}
              >
                {link.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
}