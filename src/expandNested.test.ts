import { describe, expect, test } from "vitest";
import { expandNested } from "./expandNested";

describe("expandNested", () => {
    test("renders a single class", () => {
        const testInput = `
            text-slate-100
        `;
        const result = expandNested(testInput);
        const expected = "text-slate-100";
        expect(result).toEqual(expected);
    });

    test("renders multiple class", () => {
        const testInput = `
            text-slate-100
            text-2xl
        `;
        const result = expandNested(testInput);
        const expected = "text-slate-100 text-2xl";
        expect(result).toEqual(expected);
    });

    test("renders classes w/ a single nested hover", () => {
        const testInput = `
            text-slate-100
            hover {
                text-slate-800
            }
        `;
        const result = expandNested(testInput);
        const expected = "text-slate-100 hover:text-slate-800";
        expect(result).toEqual(expected);
    });

    test("renders classes w/ a double nested dark:hover", () => {
        const testInput = `
            text-slate-100
            dark {
                hover {
                    text-slate-800
                }
            }
        `;
        const result = expandNested(testInput);
        const expected = "text-slate-100 dark:hover:text-slate-800";
        expect(result).toEqual(expected);
    });

    test("renders classes w/ a double nested dark:hover", () => {
        const testInput = `
            text-slate-100
            dark {
                hover {
                    text-slate-800
                }
            }
        `;
        const result = expandNested(testInput);
        const expected = "text-slate-100 dark:hover:text-slate-800";
        expect(result).toEqual(expected);
    });
    test("renders a combination", () => {
        const testInput = `
            text-slate-500
            hover {
                text-slate-100
            }
            dark {
                text-slate-100
                hover {
                    text-slate-500
                }
            }
        `;
        const result = expandNested(testInput);
        const expected =
            "text-slate-500 hover:text-slate-100 dark:text-slate-100 dark:hover:text-slate-500";
        expect(result).toEqual(expected);
    });
});

export {};
