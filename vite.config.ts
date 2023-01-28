/// <reference types="vitest" />
/// <reference types="vite/client" />
import react from "@vitejs/plugin-react-swc";
import { resolve } from "path";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react(), dts()],
    test: {
        globals: true,
        environment: "jsdom",
        coverage: {
            reporter: ["text", "json", "html"],
        },
    },
    build: {
        lib: {
            entry: resolve(__dirname, "./src/index.ts"),
            name: "gusty",
            fileName: "gusty",
        },
        rollupOptions: {
            external: ["react", "react-dom"],
            output: {
                globals: {
                    react: "React",
                },
            },
        },
    },

    //     rollupOptions: {
    //         // make sure to externalize deps that shouldn't be bundled
    //         // into your library
    //         external: [
    //             "react", // ignore react stuff
    //             "react-dom",
    //         ],
    //         output: {
    //             globals: {
    //                 react: "react",
    //                 "react-dom": "react-dom",
    //             },
    //         },
    //     },
    // },
});
