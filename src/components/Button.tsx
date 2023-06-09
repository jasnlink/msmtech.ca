import { PropsWithChildren } from "react";
import Link from "next/link";

interface ButtonProps {
    variant?: string;
    size?: string;
    href?: string;
}

export default function Button({ variant=`default`, size=`default`, href=`/`, children }:PropsWithChildren<ButtonProps>) {

    let buttonClass:string = ``
    if(variant === `default`) {
        buttonClass = `bg-gradient-to-r from-[#1488CC] to-[#2B32B2] font-semibold rounded-full shadow-lg`
    }

    if(size === `default`) {
        buttonClass += ` py-3 px-8 text-lg`
    } else if(size === `large`) {
        buttonClass += ` py-4 px-12 text-xl`
    }

    return (
        <Link
            href={href}
            className={buttonClass}
        >
            {children}
        </Link>
    )
}