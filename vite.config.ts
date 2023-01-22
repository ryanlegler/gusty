/// <reference types="vitest" />
/// <reference types="vite/client" />
import react from "@vitejs/plugin-react-swc";
import { resolve } from "path";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    test: {
        globals: true,
        environment: "jsdom",
        coverage: {
            reporter: ["text", "json", "html"],
        },
    },
    build: {
        lib: {
            entry: resolve(__dirname, "./src/utils/gusty"),
            name: "gusty",
            fileName: "gusty",
        },
        rollupOptions: {
            // make sure to externalize deps that shouldn't be bundled
            // into your library
            external: [
                "react", // ignore react stuff
                "react-dom",
            ],
            output: {
                globals: {
                    react: "react",
                    "react-dom": "react-dom",
                },
            },
        },
    },
});
