'use client'
import { motion } from 'framer-motion'
import { PropsWithChildren } from 'react'

interface PageWrapperProps {
    className?: string;
    screenHeight?: boolean;
}

export default function PageWrapper({ className, screenHeight=true, children }:PropsWithChildren<PageWrapperProps>) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 40, filter: 'blur(1rem)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0)' }}
            exit={{ opacity: 0, y: 40, filter: 'blur(1rem)' }}
            className={className ? `relative ${screenHeight ? `min-h-[calc(100vh-10rem)]` : ``} ${className}` : screenHeight ? `relative min-h-[calc(100vh-10rem)]` : ``}
        >
            {children}
        </motion.div>
    )
}