import { Box, Text } from "@radix-ui/themes";
import { useState } from "react";
import { Edit2, Upload } from "lucide-react"; // pour les icônes élégantes

export function Portail() {
  const [user] = useState({
    name: "COMPAORE Salomon",
    formation: "Licence 3 * Informatique * ESI * UNB",
    description:
      "Passionné du DevOps - Co-Founder de MicraV - Co-Founder MULTIVERUS",
    competences: ["REACT", "Tailwindcss", "TypeScript", "Postman"],
    parcours: [
      {
        annee: "2023-2024",
        niveau: "Licence 1",
        filiere: "Informatique",
        etablissement: "ESI/UNB",
        statut: "termine"
      },
      {
        annee: "2024-2025",
        niveau: "Licence 2",
        filiere: "Informatique",
        etablissement: "ESI/UNB",
        statut: "termine"
      },
      {
        annee: "2025-2026",
        niveau: "Licence 3",
        filiere: "Informatique",
        etablissement: "ESI/UNB",
        statut: "encours"
      }
    ]
  });

  return (
    <Box className="w-full min-h-screen flex bg-[#2B2442] pt-16 text-[#E2DDFE] overflow-y-hidden">
      {/* 🧍 Profil utilisateur (gauche) */}
      <div className="flex">
        <Box className="w-[45%] bg-[#3C2E69] p-4 flex flex-col items-center shadow-xl overflow-y-auto h-[90vh]">
          {/* Photo de profil */}
          <div className="flex justify-center mt-4 mb-2">
            <div className="w-28 h-28 rounded-full bg-[#2B2442] flex items-center justify-center text-3xl font-bold text-[#58D5BA] mb-4">
              {user.name.split(" ")[0][0]}
            </div>
          </div>

          {/* Nom & Formation */}
          <div className="flex flex-col items-center">
            <Text className="text-xl font-bold">{user.name}</Text>
            <Text className="text-[#7AA2FF] mb-6">{user.formation}</Text>
          </div>
          <hr className="w-90 ml-[20%] opacity-50 my-4" />
          {/* Description */}
          <Box className="w-[90%] text-sm mb-3">
            <Text className="text-[#58D5BA] font-semibold">Description :</Text>
            <Text className="block mt-1 opacity-90">{user.description}</Text>
          </Box>

          {/* Compétences */}
          <Box className="w-[90%] text-sm mb-6">
            <Text className="text-[#58D5BA] font-semibold">Compétence :</Text>
            <Text className="block mt-1 opacity-90">
              {user.competences.join("  •  ")}
            </Text>
          </Box>
          <hr className="w-90 ml-[20%] opacity-50 my-4" />
          {/* Parcours */}
          <Box className="w-[90%] text-sm mb-4">
            <div className="flex justify-between items-center mb-2">
              <Text className="text-[#58D5BA] font-semibold">Parcours</Text>
              <div className="flex gap-3 text-xs items-center">
                <div className="flex items-center gap-1">
                  <span className="w-3 h-3 rounded-full bg-[#5472E4] opactity-50" />
                  En cours
                </div>
                <div className="flex items-center gap-1">
                  <span className="w-3 h-3 rounded-full bg-[#7A7A7A]" />
                  Terminé
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              {user.parcours.map((p, i) => (
                <div
                  key={i}
                  className={`flex justify-between px-3 py-2 rounded-md ${
                    p.statut === "encours" ? "bg-[#5472E4]" : "bg-[#4C4377]"
                  }`}
                >
                  <span>{p.annee}</span>
                  <span>{p.niveau}</span>
                  <span>{p.filiere}</span>
                  <span>{p.etablissement}</span>
                </div>
              ))}
            </div>
          </Box>

          {/* Bouton modifier */}
          <button className="mt-5 flex items-center gap-2 bg-[#5472E4] text-white px-5 py-2 rounded-md hover:bg-[#4061C7] transition">
            <Edit2 size={16} />
            Modifier mes informations
          </button>

          {/* Footer */}
          <div className="mt-10 text-sm font-bold text-[#E2DDFE] opacity-70">
            Liens & adresses :{" "}
            <span className="underline">salomoncompaore@gmail.com</span>
          </div>
        </Box>

        {/* 💼 Espace professionnel (droite) */}
        <Box className="w-[55%] flex flex-col justify-center items-center bg-[#2B2442] text-[#E2DDFE]">
          <div className="flex flex-col flex-col justify-center items-center gap-2 min-h-[90vh]">
            <Text className="text-3xl font-bold mb-3">
              Votre espace{" "}
              <span className="bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text text-transparent">
                professionnel
              </span>
            </Text>

            <Text className="text-sm opacity-80 mb-5">
              Vous n’avez pas encore de publication
            </Text>

            <button className="flex items-center gap-2 bg-[#5472E4] px-5 py-2 rounded-md text-white cursor-pointer hover:bg-[#4061C7] transition">
              <Upload size={16} />
              Publier maintenant
            </button>
          </div>
        </Box>
      </div>
    </Box>
  );
}
