import { ElementType, forwardRef } from "react";
import {
    IntrinsicElementsKeys,
    IntrinsicElementsTemplateFunctionsMap,
    TailwindInterface,
} from "./types";
import domElements from "./domElements";

import { expandNested } from "./expandNested";

const templateFunctionFactory: TailwindInterface = ((Component: ElementType) => {
    return (
        template: TemplateStringsArray,
        ...templateElements: ((props: any) => string | undefined | null)[]
    ) => {
        return forwardRef((props, ref) => {
            const resolvedTemplateElements = templateElements.map((templateElement) =>
                templateElement(props)
            );
            const resolvedTemplateTag = template.reduce(
                (prev, current, index) =>
                    prev.concat(current || [], resolvedTemplateElements[index] || []),
                [] as string[]
            );
            const expandedClasses = expandNested(resolvedTemplateTag.join(""));
            return <Component {...props} ref={ref} className={expandedClasses} />;
        });
    };
}) as any;

const intrinsicElementsMap: IntrinsicElementsTemplateFunctionsMap = domElements.reduce(
    <K extends IntrinsicElementsKeys>(
        acc: IntrinsicElementsTemplateFunctionsMap,
        DomElement: K
    ) => ({
        ...acc,
        [DomElement]: templateFunctionFactory(DomElement),
    }),
    {} as IntrinsicElementsTemplateFunctionsMap
);

const gusty: TailwindInterface = Object.assign(templateFunctionFactory, intrinsicElementsMap);

export { gusty };
