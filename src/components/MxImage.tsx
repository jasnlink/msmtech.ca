import resolveConfig from 'tailwindcss/resolveConfig'
import tailwindConfig from '@/tailwind.config.js'
import { ImgHTMLAttributes } from 'react';

interface MxImageWidths {
    /**
     * 1536px
     */
    '2xl': number;
    /**
     * 1280px
     */
    xl: number;
    /**
     * 1024px
     */
    lg: number;
    /**
     * 768px
     */
    md: number;
    /**
     * 640px
     */
    sm: number;
    /**
     * 0px
     */
    none: number;
}
interface MxImageProps extends ImgHTMLAttributes<HTMLImageElement> {
    mxwidths: MxImageWidths;
    mxquality?: number;
}
const defaultProps = {
    mxquality: 75
}

export default function MxImage(props: MxImageProps) {
    props = {...defaultProps, ...props}
    const {theme} = resolveConfig(tailwindConfig)
    const breakpoints:any = theme?.screens

    return (
        <picture>
            <source media={`(min-width: ${breakpoints['2xl']})`} srcSet={`${props.src}?w=${props.mxwidths?.['2xl']}&fm=jpg&q=${props.mxquality}`} />
            <source media={`(min-width: ${breakpoints?.xl})`} srcSet={`${props.src}?w=${props.mxwidths?.xl}&fm=jpg&q=${props.mxquality}`} />
            <source media={`(min-width: ${breakpoints?.lg})`} srcSet={`${props.src}?w=${props.mxwidths?.lg}&fm=jpg&q=${props.mxquality}`} />
            <source media={`(min-width: ${breakpoints?.md})`} srcSet={`${props.src}?w=${props.mxwidths?.md}&fm=jpg&q=${props.mxquality}`} />
            <source media={`(min-width: ${breakpoints?.sm})`} srcSet={`${props.src}?w=${props.mxwidths?.sm}&fm=jpg&q=${props.mxquality}`} />
            <source media={`(min-width: 0px)`} srcSet={`${props.src}?w=${props.mxwidths?.sm}&fm=jpg&q=${props.mxquality}`} />
            <img
                {...props}
            />
        </picture>
    )
}