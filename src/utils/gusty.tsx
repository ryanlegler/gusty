import { ElementType, forwardRef } from "react";
import { expandNested } from "./expandNested";

const gusty: any = (Component: ElementType) => {
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
};

export { gusty };
