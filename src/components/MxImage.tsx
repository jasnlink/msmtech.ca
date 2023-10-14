/* eslint-disable jsx-a11y/alt-text */
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
    mxWidths: MxImageWidths;
    mxQuality?: number;
}

export default function MxImage({ mxWidths, mxQuality=75, ...props }: MxImageProps) {

    const {theme} = resolveConfig(tailwindConfig)
    const breakpoints:any = theme?.screens

    return (
        <picture>
            <source media={`(min-width: ${breakpoints['2xl']})`} srcSet={`${props.src}?w=${mxWidths?.['2xl']}&fm=jpg&q=${mxQuality}`} />
            <source media={`(min-width: ${breakpoints?.xl})`} srcSet={`${props.src}?w=${mxWidths?.xl}&fm=jpg&q=${mxQuality}`} />
            <source media={`(min-width: ${breakpoints?.lg})`} srcSet={`${props.src}?w=${mxWidths?.lg}&fm=jpg&q=${mxQuality}`} />
            <source media={`(min-width: ${breakpoints?.md})`} srcSet={`${props.src}?w=${mxWidths?.md}&fm=jpg&q=${mxQuality}`} />
            <source media={`(min-width: ${breakpoints?.sm})`} srcSet={`${props.src}?w=${mxWidths?.sm}&fm=jpg&q=${mxQuality}`} />
            <source media={`(min-width: 0px)`} srcSet={`${props.src}?w=${mxWidths?.sm}&fm=jpg&q=${mxQuality}`} />
            <img {...props} />
        </picture>
    )
}