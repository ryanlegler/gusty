import { describe, expect, test } from "vitest";
import { gusty } from "./gusty";
import { render } from "@testing-library/react";

describe("gusty", () => {
    test("gusty test 1", () => {
        const Button: any = gusty("div")`
            foo-class
            ${(props: any) => `root-${props.color}`}
            hover {
                nested-class
                ${(props: any) => `bg-${props.color}`}
            }
        `;
        const { asFragment } = render(<Button color="green" />);
        expect(asFragment()).toMatchInlineSnapshot(`
          <DocumentFragment>
            <div
              class="foo-class root-green hover:nested-class hover:bg-green"
              color="green"
            />
          </DocumentFragment>
        `);
    });
});

export {};
