import { DataList, Box, Text, TextArea, Heading, Table } from "@radix-ui/themes";
import "@radix-ui/themes/styles.css";
import { BookIcon } from "../../assets/icons/BookIcon";
import { useAppContext } from "/src/context/AppContext";

export function DocInfo({ book }) {
    const { theme } = useAppContext();
    console.log("is called");

    // Function to handle document download
    const handleDownload = () => {
        if (book?.fileUrl) {
            const link = document.createElement("a");
            link.href = book.fileUrl;
            link.download = book.title || "document"; // Fallback to "document" if title is missing
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } else {
            console.error("No file URL provided for download");
            alert("No file available for download.");
        }
    };

    return (
        <Box
            className={`relative w-[90%] max-sm:w-[100%] max-w-4xl mx-auto h-auto min-h-[75vh] rounded-sm p-4 sm:p-6 ${
                theme === "dark" ? "bg-[#56468B]" : "bg-[#D1D5DB]"
            }`}
        >
            <Box className="flex items-center justify-center">
                <Heading
                    className={`flex mx-auto justify-center py-4 sm:py-5 text-2xl sm:text-3xl font-bold ${
                        theme === "dark" ? "text-[#58D5BA]" : "text-[#1F6692]"
                    }`}
                >
                    {book?.title || "Titre"}
                </Heading>
            </Box>
            <Box>
                <Table.Root size="3" layout="auto" className="w-full">
                    <Table.Body>
                        <Table.Row>
                            <Table.ColumnHeaderCell className="text-sm sm:text-base font-bold px-2 sm:px-4 py-2">
                                Autor
                            </Table.ColumnHeaderCell>
                            <Table.ColumnHeaderCell
                                className={`text-sm sm:text-base px-2 sm:px-4 py-2 ${
                                    theme === "dark" ? "text-[#E2DDFE]" : "text-[#333333]"
                                }`}
                            >
                                {book?.auteur || "COMPAORE Salomon"}
                            </Table.ColumnHeaderCell>
                        </Table.Row>
                        <Table.Row>
                            <Table.ColumnHeaderCell className="text-sm sm:text-base font-bold px-2 sm:px-4 py-2">
                                Description
                            </Table.ColumnHeaderCell>
                            <Table.ColumnHeaderCell
                                className={`text-sm sm:text-base px-2 sm:px-4 py-2 ${
                                    theme === "dark" ? "text-[#E2DDFE]" : "text-[#333333]"
                                }`}
                            >
                                {book?.description ||
                                    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam laudantium qui dicta, aperiam praesentium, unde suscipit cupiditate sit doloremque sed labore nesciunt reiciendis delectus ipsum, repellat amet. Laborum, labore velit?"}
                            </Table.ColumnHeaderCell>
                        </Table.Row>
                        <Table.Row>
                            <Table.ColumnHeaderCell className="text-sm sm:text-base font-bold px-2 sm:px-4 py-2">
                                Classe
                            </Table.ColumnHeaderCell>
                            <Table.ColumnHeaderCell
                                className={`text-sm sm:text-base px-2 sm:px-4 py-2 ${
                                    theme === "dark" ? "text-[#E2DDFE]" : "text-[#333333]"
                                }`}
                            >
                                {book?.classe || "ISI"}
                            </Table.ColumnHeaderCell>
                        </Table.Row>
                        <Table.Row>
                            <Table.ColumnHeaderCell className="text-sm sm:text-base font-bold px-2 sm:px-4 py-2">
                                Année
                            </Table.ColumnHeaderCell>
                            <Table.ColumnHeaderCell
                                className={`text-sm sm:text-base px-2 sm:px-4 py-2 ${
                                    theme === "dark" ? "text-[#E2DDFE]" : "text-[#333333]"
                                }`}
                            >
                                {book?.annee || "2024"}
                            </Table.ColumnHeaderCell>
                        </Table.Row>
                        <Table.Row>
                            <Table.ColumnHeaderCell className="text-sm sm:text-base font-bold px-2 sm:px-4 py-2">
                                Commentaire
                            </Table.ColumnHeaderCell>
                            <Table.ColumnHeaderCell className="px-2 sm:px-4 py-2">
                                <TextArea
                                    placeholder="Envoyer un commentaire…"
                                    className={`w-full text-sm sm:text-base ${
                                        theme === "dark"
                                            ? "bg-[#291F43] text-[#E2DDFE] placeholder-gray-400"
                                            : "bg-[#FFFFFF] text-[#333333] placeholder-gray-600"
                                    }`}
                                />
                                <button
                                    className={`w-32 sm:w-40 h-10 rounded-lg mt-2 sm:mt-3 ml-[20vw] sm:ml-auto block ${
                                        theme === "dark" ? "bg-[#5472E4] text-[#E2DDFE]" : "bg-[#1F6692] text-[#FFFFFF]"
                                    } cursor-pointer`}
                                >
                                    Envoyer
                                </button>
                            </Table.ColumnHeaderCell>
                        </Table.Row>
                        <Table.Row>
                            <Table.ColumnHeaderCell>Options</Table.ColumnHeaderCell>
                            <Table.ColumnHeaderCell className="px-2 sm:px-4 py-2">
                                <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center">
                                    <button
                                        className={`px-6 sm:px-10 py-2 rounded-lg text-sm sm:text-lg font-bold cursor-pointer ${
                                            theme === "dark"
                                                ? "bg-gray-900 text-[#E2DDFE]"
                                                : "bg-[#333333] text-[#FFFFFF]"
                                        }`}
                                        onClick={handleDownload}
                                    >
                                        Télécharger
                                    </button>
                                    <button
                                        className={`px-6 sm:px-10 py-2 rounded-lg text-sm sm:text-lg font-bold cursor-pointer ${
                                            theme === "dark" ? "bg-[#58D5BA] text-[#291F43]" : "bg-[#1F6692] text-[#FFFFFF]"
                                        }`}
                                    >
                                        Lire en ligne
                                    </button>
                                </div>
                            </Table.ColumnHeaderCell>
                        </Table.Row>
                    </Table.Body>
                </Table.Root>
            </Box>
        </Box>
    );
}