import { gusty } from "../utils/gusty";
import "./gusty.css";

export default {
    title: "Gusty",
    parameters: {
        layout: "fullscreen",
    },
};

const Template = () => {
    const MyComponent = gusty("div")`
            foo
            hover {
                ${(props: any) => `${props.hover}`}
                sm {
                    ${(props: any) => `${props.hover}`}
                }
            }
        `;

    return <MyComponent hover="bar">MyComponent</MyComponent>;
};

export const BasicExample = Template.bind({});
