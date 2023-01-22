// ever line tracks current keys in an array
// a new key is added if a { "gate" is present
// a key is removed when a } "gate" is present
// any line that doesn't include a gate we generate a class string based on the current path array and the contents of the line

import { CSSProperties, forwardRef } from "react";

// export function expandFunctions(
//   strings: TemplateStringsArray,
//   ...values: (string | (() => void))[]
// ) {
//   let str = "";
//   strings.forEach((string, i) => {
//     const value = values[i];
//     const resolved = typeof value === "function" ? value() : value;
//     str += string + (resolved || "");
//   });
//   return str;
// }

export function expandNested(input: string): string {
    const path: string[] = [];
    const result: string[] = [];
    const lines = input.split("\n").map((line) => line.trim());

    lines.forEach((line: string) => {
        if (line?.includes("{")) {
            path.push(line.replace(" {", ""));
        } else if (line?.includes("}")) {
            path.pop();
        } else if (line !== "") {
            const resolvedPath = path?.reduce((prev, curr) => {
                return prev ? `${prev}:${curr}` : curr;
            }, "");

            line.split(" ").forEach((member) => {
                result.push(resolvedPath ? `${resolvedPath}:${member}` : member);
            });
        }
    });

    return result?.reduce((prev, curr) => {
        return prev ? `${prev} ${curr}` : curr;
    }, "");
}
