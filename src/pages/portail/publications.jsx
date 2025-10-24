import { Box, Text, Button, Flex, TextField, TextArea, Select } from "@radix-ui/themes";
import { useAppContext } from "/src/context/AppContext";
import { ProjetCard } from "../home/projets";
import { Document } from "../home/news";
import { useState } from "react";
import { Upload } from "lucide-react";

function MySelect({ options, label, value, onChange,theme }) {
    return (
        <Select.Root value={value} onValueChange={onChange}>
            <Select.Trigger
                className={`w-full p-3 rounded-md ${
                    theme === "dark"
                        ? "bg-[#291F43] text-[#E2DDFE] border-gray-600"
                        : "bg-[#FFFFFF] text-[#333333] border-gray-300"
                } focus:outline-none focus:ring-2 focus:ring-[#58D5BA]`}
            />
            <Select.Content>
                <Select.Group>
                    <Select.Label>{label}</Select.Label>
                    {options.map((option) => (
                        <Select.Item key={option} value={option}>
                            {option}
                        </Select.Item>
                    ))}
                </Select.Group>
            </Select.Content>
        </Select.Root>
    );
}

export function Publication() {
    const { user, newsBooks, libraryBooks, projects, theme, addPublication } = useAppContext();
    const [isCreating, setIsCreating] = useState(false);
    const [formData, setFormData] = useState({
        type: "tutos",
        title: "",
        domaine: "",
        description: "",
        classe: "isi",
        source: null, // For file object
    });

    // Filter publications by user.name
    const userPublications = {
        tutos: projects.filter((proj) => proj.auteur === user.name),
        cours: [
            ...newsBooks.filter((book) => book.type === "cours" && book.auteur === user.name),
            ...libraryBooks.filter((book) => book.type === "cours" && book.auteur === user.name),
        ],
        tdtp: libraryBooks.filter((book) => book.type === "tdtp" && book.auteur === user.name),
        examens: libraryBooks.filter((book) => book.type === "examens" && book.auteur === user.name),
        livres: [
            ...newsBooks.filter((book) => book.type === "livre" && book.auteur === user.name),
            ...libraryBooks.filter((book) => book.type === "livres" && book.auteur === user.name),
        ],
    };

    // Combine all publications for total count
    const allPublications = [
        ...userPublications.tutos,
        ...userPublications.cours,
        ...userPublications.tdtp,
        ...userPublications.examens,
        ...userPublications.livres,
    ];

    const handleCreateToggle = () => {
        setIsCreating(!isCreating);
        setFormData({
            type: "tutos",
            title: "",
            domaine: "",
            description: "",
            classe: "isi",
            source: null,
        });
    };

    const handleChange = (field, value) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const sourceUrl = URL.createObjectURL(file);
            setFormData((prev) => ({ ...prev, source: sourceUrl }));
        }
    };

    const handleSubmit = () => {
        const publication = {
            type: formData.type,
            [formData.type === "tutos" ? "name" : "title"]: formData.title,
            domaine: formData.domaine,
            description: formData.description,
            classe: formData.classe,
            [formData.type === "tutos" ? "url" : "file"]: formData.source,
        };
        addPublication(publication);
        setIsCreating(false);
    };

    return (
        <Box
            className={`w-full flex flex-col items-center p-4 sm:p-6 min-h-[50vh] lg:min-h-[90vh] ${
                theme === "dark" ? "bg-[#2B2442] text-[#E2DDFE]" : "bg-[#F5F5F5] text-[#333333]"
            }`}
        >
            <Text className="text-xl sm:text-2xl lg:text-3xl font-bold mb-3 text-center">
                Vos publications
            </Text>

            {isCreating ? (
                <Box className="w-full max-w-[95%] sm:max-w-[600px] mx-auto flex flex-col gap-4">
                    <Text className="text-lg sm:text-xl font-bold mb-2 text-center">
                        Créer une nouvelle publication
                    </Text>
                    <Flex direction="column" gap="3">
                        <label>
                            <Text as="div" size="2" mb="1" weight="bold">
                                Type
                            </Text>
                            <MySelect
                                options={["tutos", "cours", "tdtp", "examens", "livres"]}
                                label="Type"
                                theme={theme}
                                value={formData.type}
                                onChange={(value) => handleChange("type", value)}
                            />
                        </label>
                        <label>
                            <Text as="div" size="2" mb="1" weight="bold">
                                {formData.type === "tutos" ? "Nom" : "Titre"}
                            </Text>
                            <TextField.Root
                                value={formData.title}
                                onChange={(e) => handleChange("title", e.target.value)}
                                placeholder={formData.type === "tutos" ? "Entrez le nom du tutoriel" : "Entrez le titre du document"}
                                className={`w-full p-3 rounded-md ${
                                    theme === "dark"
                                        ? "bg-[#291F43] text-[#E2DDFE] placeholder-gray-400"
                                        : "bg-[#FFFFFF] text-[#333333] placeholder-gray-600"
                                } focus:outline-none focus:ring-2 focus:ring-[#58D5BA]`}
                            />
                        </label>
                        <label>
                            <Text as="div" size="2" mb="1" weight="bold">
                                Domaine
                            </Text>
                            <TextField.Root
                                value={formData.domaine}
                                onChange={(e) => handleChange("domaine", e.target.value)}
                                placeholder="Entrez le domaine (ex: Informatique, Mathématiques)"
                                className={`w-full p-3 rounded-md ${
                                    theme === "dark"
                                        ? "bg-[#291F43] text-[#E2DDFE] placeholder-gray-400"
                                        : "bg-[#FFFFFF] text-[#333333] placeholder-gray-600"
                                } focus:outline-none focus:ring-2 focus:ring-[#58D5BA]`}
                            />
                        </label>
                        <label>
                            <Text as="div" size="2" mb="1" weight="bold">
                                Description
                            </Text>
                            <TextArea
                                value={formData.description}
                                onChange={(e) => handleChange("description", e.target.value)}
                                placeholder="Entrez une description de la publication"
                                className={`w-full p-3 rounded-md ${
                                    theme === "dark"
                                        ? "bg-[#291F43] text-[#E2DDFE] placeholder-gray-400"
                                        : "bg-[#FFFFFF] text-[#333333] placeholder-gray-600"
                                } focus:outline-none focus:ring-2 focus:ring-[#58D5BA]`}
                            />
                        </label>
                        <label>
                            <Text as="div" size="2" mb="1" weight="bold">
                                Classe
                            </Text>
                            <MySelect
                                options={["isi", "rt", "gl"]}
                                label="Classe"
                                value={formData.classe}
                                onChange={(value) => handleChange("classe", value)}
                            />
                        </label>
                        <label>
                            <Text as="div" size="2" mb="1" weight="bold">
                                Source
                            </Text>
                            <input
                                type="file"
                                onChange={handleFileChange}
                                className={`w-full p-3 rounded-md border ${
                                    theme === "dark"
                                        ? "bg-[#291F43] text-[#E2DDFE] border-gray-600 placeholder-gray-400"
                                        : "bg-[#FFFFFF] text-[#333333] border-gray-300 placeholder-gray-600"
                                } focus:outline-none focus:ring-2 focus:ring-[#58D5BA]`}
                            />
                        </label>
                    </Flex>
                    <Flex gap="3" mt="4" justify="end">
                        <Button
                            variant="soft"
                            color="gray"
                            onClick={handleCreateToggle}
                            className={`px-4 py-2 rounded-md ${
                                theme === "dark"
                                    ? "bg-gray-600 text-[#E2DDFE] hover:bg-gray-500"
                                    : "bg-gray-200 text-[#333333] hover:bg-gray-300"
                            } transition`}
                        >
                            Annuler
                        </Button>
                        <Button
                            onClick={handleSubmit}
                            disabled={!formData.title || !formData.domaine || !formData.classe || !formData.source}
                            className={`px-4 py-2 rounded-md ${
                                theme === "dark"
                                    ? "bg-[#5472E4] hover:bg-[#4061C7]"
                                    : "bg-[#4B6ACF] hover:bg-[#3A5AB0]"
                            } text-[#FFFFFF] transition disabled:opacity-50 disabled:cursor-not-allowed`}
                        >
                            Publier
                        </Button>
                    </Flex>
                </Box>
            ) : (
                <>
                    {allPublications.length === 0 ? (
                        <Box className="flex flex-col items-center gap-4 mt-4">
                            <Text className="text-sm sm:text-base opacity-80 text-center">
                                Vous n’avez pas encore de publication
                            </Text>
                            <Button
                                onClick={handleCreateToggle}
                                className={`w-full sm:w-auto flex items-center justify-center gap-2 ${
                                    theme === "dark"
                                        ? "bg-[#5472E4] hover:bg-[#4061C7]"
                                        : "bg-[#4B6ACF] hover:bg-[#3A5AB0]"
                                } px-4 sm:px-5 py-2 rounded-md text-white cursor-pointer transition text-sm sm:text-base`}
                            >
                                <Upload size={16} />
                                Publier maintenant
                            </Button>
                        </Box>
                    ) : (
                        <Box className="w-full max-w-[95%] sm:max-w-[80%] flex flex-col gap-6">
                            {["tutos", "cours", "tdtp", "examens", "livres"].map((category) => (
                                userPublications[category].length > 0 && (
                                    <Box key={category} className="flex flex-col gap-3">
                                        <Text className="text-lg sm:text-xl font-bold capitalize">
                                            {category === "tdtp" ? "TD & TP" : category}
                                        </Text>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-5">
                                            {category === "tutos"
                                                ? userPublications[category].map((proj) => (
                                                      <ProjetCard
                                                          key={proj.id}
                                                          projet={proj}
                                                          onClick={() =>
                                                              navigate("/bibliotheque", {
                                                                  state: { tutos: proj },
                                                              })
                                                          }
                                                      />
                                                  ))
                                                : userPublications[category].map((doc) => (
                                                      <Document
                                                          key={doc.id}
                                                          book={doc}
                                                          onClick={() =>
                                                              navigate("/bibliotheque", {
                                                                  state: { book: doc },
                                                              })
                                                          }
                                                      />
                                                  ))}
                                        </div>
                                    </Box>
                                )
                            ))}
                            <Button
                                onClick={handleCreateToggle}
                                className={`w-full sm:w-auto flex items-center justify-center gap-2 ${
                                    theme === "dark"
                                        ? "bg-[#5472E4] hover:bg-[#4061C7]"
                                        : "bg-[#4B6ACF] hover:bg-[#3A5AB0]"
                                } px-4 sm:px-5 py-2 rounded-md text-white cursor-pointer transition text-sm sm:text-base mt-4`}
                            >
                                <Upload size={16} />
                                Publier maintenant
                            </Button>
                        </Box>
                    )}
                </>
            )}
        </Box>
    );
}