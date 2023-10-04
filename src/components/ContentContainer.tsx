import { PropsWithChildren } from "react";

type PaddingVariants = 'default' | 'lg' | 'sm' | 'none'

interface ContentContainerProps {
    p?: PaddingVariants;
}



export default function ContentContainer({p=`default`, children}:PropsWithChildren<ContentContainerProps>) {

    const paddingMap:Record<PaddingVariants, string> = {
        default: `px-6 lg:px-10 pt-8 pb-8`,
        lg: `px-12 md:px-20 pt-24 pb-16`,
        sm: `p-4`,
        none: `p-0`
    }

    return (
        <div className={`relative before:shadow-[0_0_200px_200px] before:content-[''] before:z-[-1] before:shadow-zinc-300/5 before:absolute before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2 rounded-lg bg-gradient-to-r border border-zinc-800/80 from-zinc-900/80 to-zinc-950/80 shadow-sm shadow-zinc-900/80 backdrop-blur-xl z-20 ${paddingMap[p]}`}>
            {children}
        </div>
    )
}