import { color } from "framer-motion";
import { plugin } from "postcss";

export default {
    darkMode: 'class',
    content: ["./index.html","./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            colors: {
                botanical: {
                    lightBg: "#f4f9f4",
                    lightPrimary: "#2e7d32",
                },
                luxury: {
                    darkBg: "#0f172a",
                    darkCard: "#1e293b",
                    gold: "#d4af37",
                }
            }
        }
    },
    plugins: [],
}