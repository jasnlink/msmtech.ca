'use client'
import Button from "@/src/components/Button"
import Image from "next/image"
import Link from "next/link"
import { ChevronDownIcon } from "@/src/components/Icon"
import { Popover, Transition } from "@headlessui/react"
import ContentContainer from "@/src/components/ContentContainer"
import { Fragment } from "react"
import Text from "@/src/components/Text"
import { MouseEvent, MutableRefObject } from "react"
import MobileMenu from "./MobileMenu"

export interface NavigationItem {
    id: string;
    featuredImage: string | null;
    title: string;
    description: string | null;
    url: string | null;
    children: Array<NavigationItem>
}
export default function NavMenu() {

    const navigationItems: Array<NavigationItem> = [
        {
            id: `0`,
            featuredImage: null,
            title: `Solutions`,
            description: null,
            url: null,
            children: [
                {
                    id: `0-0`,
                    featuredImage: `/solution4-1.png`,
                    title: `Website Essentials`,
                    description: null,
                    url: `/solutions/website-essentials`,
                    children: []
                },
                {
                    id: `0-1`,
                    featuredImage: `/solution3-1.png`,
                    title: `Ecommerce Suite`,
                    description: null,
                    url: `/solutions/ecommerce-suite`,
                    children: []
                },
                {
                    id: `0-2`,
                    featuredImage: `/solution1-1.png`,
                    title: `Enterprise Web App`,
                    description: null,
                    url: `/solutions/enterprise-web-app`,
                    children: []
                }
            ]
        },
        {
            id: `1`,
            featuredImage: null,
            title: `Contact`,
            description: null,
            url: `/contact`,
            children: []
        }
    ]

    function recursiveNavItemMap(array: Array<NavigationItem>, isChild=false, callback=()=>{}) {

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
                            className={`transition-all px-4 py-1 uppercase rounded-lg hover:bg-zinc-700/90 active:bg-zinc-500/90`}
                            href={item.url ?? `/`}
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
                        href={item.url ?? `/`}
                        onClick={() => {
                            close()
                        }}
                    >
                        {item.featuredImage !== null && (
                            <Image
                                src={item.featuredImage}
                                height={1366}
                                width={1024}
                                alt={item.title}
                                className="relative aspect-quarter h-48 w-auto rounded-lg shadow-lg border border-zinc-800"
                            />
                        )}
                        <div className="mt-2 text-center">
                            <Text variant="h6">{item.title}</Text>
                        </div>
                    </Link>
                )
            } else if(item.children.length) {
                return (
                    <Popover>
                        {({ open, close }) => (
                            <>
                                <Popover.Button
                                    className={`relative text-lg uppercase flex gap-1 items-center transition-all px-4 py-1 rounded-lg hover:bg-zinc-700/90 ${open ? `hover:bg-zinc-400/90 bg-zinc-400/90` : ``}`}
                                >
                                    <span>{item.title}</span>
                                    <span className={`w-4 h-4 text-white block transition-all ${open ? `rotate-180` : ``}`}>{ChevronDownIcon}</span>
                                </Popover.Button>
                                <Popover.Overlay className="z-10 fixed cursor-default inset-0 bg-zinc-950/30" />
                                <Transition
                                    show={open}
                                    as={Fragment}
                                    enter="overflow-hidden ease-out transition-slide-down duration-500"
                                    enterFrom="max-h-0 blur-lg"
                                    enterTo="max-h-96 blur-none"
                                    leave="overflow-hidden ease-in-out transition-slide-down duration-300"
                                    leaveFrom="opacity-100 blur-none"
                                    leaveTo="opacity-0 blur-lg"
                                >
                                    <Popover.Panel
                                        className="fixed bg-transparent backdrop-blur-xl z-20 mt-4 left-0 w-full xl:w-max xl:left-1/2 xl:-translate-x-1/2"
                                    >
                                        <ContentContainer p="sm">
                                            <div className="relative flex flex-wrap justify-center items-center gap-0">
                                                {recursiveNavItemMap(item.children, true, close)}
                                            </div>
                                        </ContentContainer>
                                    </Popover.Panel>
                                </Transition>
                            </>
                        )}
                    </Popover>
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
        <nav className={`fixed top-0 w-full z-30 py-4 lg:py-6`}>
            <div className="px-4 xl:container mx-auto flex items-center justify-between">
                <div className="flex items-center gap-24 lg:gap-12 xl:gap-32">
                    <Link href="/" title="msmtech.ca">
                        <Image
                            priority
                            src="/logo-main-white-v2.svg"
                            height={64}
                            width={240}
                            alt="msmtech.ca logo"
                            className="w-48 md:w-64 lg:w-56 xl:w-64"
                        />
                    </Link>
                    <div className="hidden lg:relative lg:flex items-center gap-6 lg:gap-2 xl:gap-6 text-lg">
                        {recursiveNavItemMap(navigationItems)}
                    </div>
                </div>
                <div className="hidden lg:block">
                    <Link href="/contact" title="Schedule a free consultation" passHref legacyBehavior>
                        <Button>Schedule a free consultation</Button>
                    </Link>
                </div>
                <MobileMenu navigationItems={navigationItems} />
            </div>
        </nav>
    )
}