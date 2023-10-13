'use client'
import { Popover, Disclosure, Transition } from "@headlessui/react";
import { NavigationItem } from "./NavMenu";
import Image from "next/image";
import Link from "next/link"
import { MouseEvent, MutableRefObject, useEffect } from "react";
import { CloseIcon, MobileMenuIcon, ChevronDownIcon } from "@/src/components/Icon";
import { Fragment, useState, useRef } from "react";
import ContentContainer from "@/src/components/ContentContainer";
import Text from "@/src/components/Text";
import MxImage from "@/src/components/MxImage";

interface MobileMenuProps {
    navigationItems: Array<NavigationItem>;
}

export default function MobileMenu({navigationItems}:MobileMenuProps) {

    const [isOpen, setisOpen] = useState(false)
    const scrollPositionRef = useRef(0)
    const [scrollPosition, setScrollPosition] = useState(0)

    useEffect(() => {
        if(isOpen && document.documentElement && document.body) {
            scrollPositionRef.current = window.scrollY
            document.body.style.overflow = `hidden`
            document.body.style.position = `fixed`
            document.body.style.top = `-${scrollPositionRef.current}px`
            document.body.style.width = `100%`
        } else if(!isOpen && document.documentElement && document.body) {
            document.body.style.removeProperty(`overflow`)
            document.body.style.removeProperty(`position`)
            document.body.style.removeProperty(`top`)
            document.body.style.removeProperty(`width`)
            window.scrollTo(0, scrollPositionRef.current)
        }
    }, [isOpen])

    function recursiveMobileNavItemMap(array: Array<NavigationItem>, isChild=false, callback=()=>{}) {
        const NavLink = ({
            item,
            isChild=false,
            close=callback
        }:{
            item: NavigationItem;
            isChild?: boolean;
            close?:(focusableElement?: HTMLElement | MouseEvent<HTMLElement, MouseEvent> | MutableRefObject<HTMLElement | null> | undefined) => void
        }) => {
            if(!item.children.length && isChild === false) {
                return (
                    <Link
                        className={`transition-all px-4 py-1 text-2xl uppercase rounded-lg hover:bg-zinc-700/90 active:bg-zinc-500/90`}
                        href={`${item.url}` ?? ``}
                        title={item.title}
                        onClick={() => {
                            close()
                        }}
                    >
                        {item.title}
                    </Link>
                )
            }
            else if (!item.children.length && isChild === true) {
                return (
                    <Link
                        className="relative pt-3 px-3 pb-1 transition-all rounded-lg hover:bg-zinc-700/60"
                        href={`${item.url}` ?? ``}
                        onClick={() => {
                            close()
                        }}
                    >
                        {item.featuredImage !== null && (
                            <MxImage 
                                loading={`eager`}
                                src={item.featuredImage}
                                alt={item.title}
                                height={`400`}
                                width={`300`}
                                className={`relative aspect-quarter h-48 w-auto rounded-lg shadow-lg border border-zinc-800`}
                                mxwidths={{
                                    '2xl': 360,
                                    xl: 360,
                                    lg: 360,
                                    md: 360,
                                    sm: 360,
                                    none: 360
                                }}
                            />
                        )}
                        <div className="mt-2 text-center">
                            <Text variant="h6">{item.title}</Text>
                        </div>
                    </Link>
                )
            } else if(item.children.length) {
                return (
                    // Temp removal -> Causing crash in Safari mobile
                    //
                    // <Disclosure>
                    //     {({open}) => (
                    //         <>
                    //             <Disclosure.Button
                    //                 className={`relative text-2xl uppercase flex gap-1 items-center transition-all px-4 py-1 rounded-lg ${open ? `bg-zinc-500/90` : ``}`}
                    //             >
                    //                 <span>{item.title}</span>
                    //                 <span className={`w-4 h-4 text-white block transition-all ${open ? `rotate-180` : ``}`}>{ChevronDownIcon}</span>
                    //             </Disclosure.Button>
                    //             <Transition
                    //                 show={open}
                    //                 as={Fragment}
                    //                 enter="overflow-hidden ease-out transition-slide-down duration-500"
                    //                 enterFrom="max-h-0 blur-lg"
                    //                 enterTo="max-h-full blur-none"
                    //                 leave="overflow-hidden ease-in-out transition-slide-down duration-500"
                    //                 leaveFrom="opacity-100 max-h-full blur-none"
                    //                 leaveTo="opacity-0 max-h-0 blur-lg"
                    //             >
                    //                 <Disclosure.Panel>
                    //                     <div className="relative flex flex-wrap justify-center items-center gap-0">
                    //                         {recursiveMobileNavItemMap(item.children, true, close)}
                    //                     </div>
                    //                 </Disclosure.Panel>
                    //             </Transition>
                    //         </>
                    //     )}
                    // </Disclosure>
                    <>
                        <div className={`relative text-2xl uppercase flex gap-1 items-center transition-all px-4 py-1 rounded-lg`}>
                            <span>{item.title}</span>
                        </div>
                        <div>
                            <div className="relative flex flex-wrap justify-center items-center gap-0">
                                {recursiveMobileNavItemMap(item.children, true, close)}
                            </div>
                        </div>
                    </>
                )
            } else {
                return null
            }
        }

        return (
            array.map(item => (
                <NavLink key={item.id} item={item} isChild={isChild} close={callback} />
            ))
        )
    }

    return (
        <div className="lg:hidden">
            <Popover>
                {({ open, close }) => {
                    function handleClose() {
                        setisOpen(false)
                        close()
                    }
                    return (
                        <>
                            <Popover.Button
                                className={`relative text-lg uppercase flex gap-1 items-center transition-all p-1 rounded-lg ${open ? ` bg-zinc-500/90` : ``}`}
                                onClick={() => setisOpen(true)}
                            >
                                <span className={`w-10 h-10 text-white block transition-all`}>{MobileMenuIcon}</span>
                            </Popover.Button>
                            <Transition
                                show={open}
                                as={Fragment}
                                enter="overflow-hidden ease-out transition-all duration-500"
                                enterFrom="opacity-0 blur-lg"
                                enterTo="opacity-100 blur-none"
                                leave="overflow-hidden ease-in-out transition-all duration-300"
                                leaveFrom="opacity-100 blur-none"
                                leaveTo="opacity-0 blur-lg"
                            >
                                <Popover.Panel
                                    className="absolute z-20 h-screen w-screen top-0 left-0 overflow-auto bg-zinc-800/80 backdrop-blur-sm"
                                >
                                    <div className="relative px-4 pt-20 pb-32">
                                        <ContentContainer p="sm">
                                            <div className="flex flex-col items-start gap-4 text-lg">
                                                {recursiveMobileNavItemMap(navigationItems, false, handleClose)}
                                            </div>
                                        </ContentContainer>
                                        <div className="fixed z-20 w-full top-0 left-0 px-4 py-4 flex items-center justify-between">
                                            <Link href="/" title="msmtech.ca">
                                                <Image
                                                    priority
                                                    src="/assets/logo-main-white-v2.svg"
                                                    height={64}
                                                    width={240}
                                                    alt="msmtech.ca logo"
                                                    className="w-48 md:w-64 lg:w-56 xl:w-64"
                                                    onClick={handleClose}
                                                />
                                            </Link>
                                            <div className="p-1 rounded-lg hover:bg-zinc-700/90" onClick={handleClose}>
                                                <span className="w-10 h-10 text-white block transition-all">{CloseIcon}</span>
                                            </div>
                                        </div>
                                    </div>
                                </Popover.Panel>
                            </Transition>
                        </>
                    )
                }}
            </Popover>
        </div>
    )
}