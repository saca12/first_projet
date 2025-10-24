import { Box } from "@radix-ui/themes";
import { useAppContext } from "../../context/AppContext";

export function TutosInfos({tutos}){
    const { theme } = useAppContext();
    return (<Box className={`relative w-[90%] max-sm:w-[100%] max-w-4xl mx-auto h-auto min-h-[75vh] rounded-sm p-4 sm:p-6 ${
                theme === "dark" ? "bg-[#56468B]" : "bg-[#D1D5DB]"
            }`}>
    </Box>)
}