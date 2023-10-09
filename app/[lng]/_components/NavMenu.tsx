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
import { Translation } from "@/src/models"
import useT from "@/src/hooks/useT"
import { languages } from "@/app/i18n/settings"
import { usePathname } from "next/navigation"

export interface NavigationItem {
    id: string;
    featuredImage: string | null;
    title: string;
    description: string | null;
    url: string | null;
    childrenType?: 'row' | 'col';
    childrenCenter?: boolean;
    children: Array<NavigationItem>
}

interface NavMenuProps {
    lng: string;
    t?: Translation;
}
export default function NavMenu({ lng, t }: NavMenuProps) {

    const pathname = usePathname()

    const navigationItems: Array<NavigationItem> = [
        {
            id: `0`,
            featuredImage: null,
            title: useT(t?.navigation.solutions),
            description: null,
            url: null,
            children: [
                {
                    id: `0-0`,
                    featuredImage: `/assets/solution4-1.png`,
                    title: useT(t?.navigation.website_essentials),
                    description: null,
                    url: `/${lng}/solutions/website-essentials`,
                    children: []
                },
                {
                    id: `0-1`,
                    featuredImage: `/assets/solution3-1.png`,
                    title: useT(t?.navigation.ecommerce_suite),
                    description: null,
                    url: `/${lng}/solutions/ecommerce-suite`,
                    children: []
                },
                {
                    id: `0-2`,
                    featuredImage: `/assets/solution1-1.png`,
                    title: useT(t?.navigation.enterprise_web_app),
                    description: null,
                    url: `/${lng}/solutions/enterprise-web-app`,
                    children: []
                }
            ]
        },
        {
            id: `1`,
            featuredImage: null,
            title: useT(t?.navigation.blogs),
            description: null,
            url: `/${lng}/blogs`,
            children: []
        },
        {
            id: `2`,
            featuredImage: null,
            title: useT(t?.navigation.contact),
            description: null,
            url: `/${lng}/contact`,
            children: []
        },
        {
            id: `3`,
            featuredImage: null,
            title: lng,
            description: null,
            url: null,
            childrenType: `col`,
            childrenCenter: false,
            children: function(){
                let res:NavigationItem[] = []
                let i = 0
                for (let lang of languages) {
                    res.push({
                        id: i.toString(),
                        featuredImage: null,
                        title: lang.toUpperCase(),
                        description: null,
                        url: `${process.env.NEXT_PUBLIC_HOST}${pathname ?? pathname.split(`/`).toSpliced(1,1,lang).join(`/`)}`,
                        children: []
                    })
                    i++
                }
                return res
            }()
        }
    ]

    const ctaButtonText = useT(t?.general.schedule_consultation)

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
                        className={`relative transition-all rounded-lg hover:bg-zinc-700/60 ${item.featuredImage !== null ? `pt-3 px-3 pb-1` : `pt-1 px-3 pb-1`}`}
                        href={`${item.url}` ?? ``}
                        onClick={() => {
                            close()
                        }}
                    >
                        {item.featuredImage !== null && (
                            <img
                                loading={`eager`}
                                src={item.featuredImage}
                                height={1366}
                                width={1024}
                                alt={item.title}
                                className="relative aspect-quarter h-48 w-auto rounded-lg shadow-lg border border-zinc-800"
                            />
                        )}
                        <div className={`text-center ${item.featuredImage !== null ? `mt-2` : `mt-0`}`}>
                            <Text variant="h6">{item.title}</Text>
                        </div>
                    </Link>
                )
            } else if(item.children.length) {
                return (
                    <Popover className={`relative`}>
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
                                        className={`bg-transparent backdrop-blur-xl z-20 mt-4 left-0 w-full xl:w-max ${item.childrenCenter === false ? `absolute` : `fixed xl:left-1/2 xl:-translate-x-1/2`}`}
                                    >
                                        <ContentContainer p="sm">
                                            <div className={`relative flex flex-wrap justify-center items-center gap-0 ${item.childrenType === `col` ? `flex-col` : `flex-row`}`}>
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
                    <Link href={`/${lng}`} title="msmtech.ca">
                        <Image
                            priority
                            src="/assets/logo-main-white-v2.svg"
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
                    <Link href={`/${lng}/contact`} title={ctaButtonText} passHref legacyBehavior>
                        <Button>{ctaButtonText}</Button>
                    </Link>
                </div>
                <MobileMenu navigationItems={navigationItems} />
            </div>
        </nav>
    )
}