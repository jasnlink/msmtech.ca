import { PropsWithChildren } from "react";
import { createElement } from "react";

type TextVariants = 'default' | 'body1' | 'body2' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
interface TextProps {
    variant?: TextVariants;
    tw?: string;
}

export default function Text({variant='default', tw='', children}:PropsWithChildren<TextProps>) {

    // Define a mapping of variants to actual components.
    const componentMap:Record<TextVariants, { element: string, class: string }> = {
        default: {
            element: `p`,
            class: `lg:text-lg`,
        },
        body1: {
            element: `p`,
            class: `text-lg lg:text-xl`
        },
        body2: {
            element: `p`,
            class: `text-sm`
        },
        h1: {
            element: `h1`,
            class: `font-bold text-5xl font-serif`,
        },
        h2: {
            element: `h2`,
            class: `font-bold text-4xl lg:text-5xl font-serif`,
        },
        h3: {
            element: `h3`,
            class: `font-bold text-2xl lg:text-3xl font-serif`,
        },
        h4: {
            element: `h4`,
            class: `font-bold text-xl lg:text-2xl font-serif`,
        },
        h5: {
            element: `h5`,
            class: `font-bold text-lg lg:text-xl font-serif`,
        },
        h6: {
            element: `h6`,
            class: `font-bold lg:text-lg font-serif`,
        }
    }
    tw ? tw = ` ${tw}`: tw
    const Component = componentMap[variant].element;
    const className = `${componentMap[variant].class}${tw}`;

    return createElement(Component, { className }, children);

}