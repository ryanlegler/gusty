# Gusty (WIP)

Styled Component approach to writing Tailwind variant scoped classes with a nested SCSS / GraphQL like syntax

## 🧪 Testing

Run tests in the terminal

```
pnpm test
```

Run tests with vite UI

```
pnpm test:ui
```

## Storybook

Start Storybook

```
pnpm storybook
```

_Not quite working with tailwind yet_

Link: https://storybook.js.org/recipes/tailwindcss

## Build

```
pnpm build
```

_TODO - currently broken_

# 😱 Motivation

## Simple Example

To be charitable lets first look at a simple example of a very lightly styled Tailwind element

### 1. Standard Tailwind

Today the standard / generally recommended way to write tailwind is like this:

```html
<div
    className="text-slate-500 hover:text-slate-100 dark:text-slate-100 dark:hover:text-slate-500"
/>
```

### 2. Styled Component

https://github.com/MathiasGilson/tailwind-styled-component
With Tailwind Styled-Component (love this project!) we can write Tailwind like this:

```tsx
// Styled Component
export const StyledText = gusty.div`
    text-slate-500
    hover:text-slate-100
    dark:text-slate-100
    dark:hover:text-slate-500
`;
```

Then in are JSX we use the component

```tsx
<StyledText />
```

This is nice in that we can now see our classes on multiple lines and actually use the vertical space of our development env but can still be a bit difficult to parse the multi-level nested variants

### 3. Easy Tailwind + Tailwind Styled-Component

Solve it with Javascript!

```tsx
export const StyledToggleHandle = tw.div`
    text-slate-500
    ${() =>
        e({
            hover: ["text-slate-100"],
            dark: [
                "text-slate-100",
                {
                    hover: ["text-slate-500"],
                },
            ],
        })}
`;
```

This potentially better in that it gives us a declarative structure to indicate our variant hierarchy.
On the flip side the syntax is perhaps a bit finicky / verbose... may not flow very natually for someone used to just writing classes

## 4. Enter Gusty - The Future Is Now!!!

With Gusty we write tailwind like nested SCSS - easy to visually scan and see the hierarchy and groupings

```tsx
import { gusty } from "gusty";

export const StyledText = gusty.div`
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
```

In all cases the output in the DOM is the very same HTML. The question is do you consider this flat list of classes the optimal way to author, share and reason about your styling or like myself, do you consider this class list to be more appropriate as the "output" or "compile target".

and that for the sake of DX put an abstraction in front of it?

```html
<!-- output HTML -->
<div
    className="text-slate-500 hover:text-slate-100 dark:text-slate-100 dark:hover:text-slate-500"
/>
```

---
