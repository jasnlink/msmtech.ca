import acceptLanguage from 'accept-language'
import { NextRequest, NextResponse } from 'next/server'
import { cookieName, fallbackLng, languages } from './app/i18n/settings'
import { redirects } from './src/data'

acceptLanguage.languages(languages)

export const config = {
    // matcher: '/:lng*'
    matcher: ['/((?!api|_next|_next/static|_next/image|assets|favicon.ico|sw.js|.*\.svg).*)']
}

export function middleware(req: NextRequest, res: NextResponse) {

    const response = NextResponse.next()

    try {
        if (redirects[req.nextUrl.pathname]) {
            console.log(`Middleware Redirect on: ${req.url ?? `null req.url`} -> to: ${redirects[req.nextUrl.pathname]}`)
            return NextResponse.redirect(new URL(redirects[req.nextUrl.pathname], req.url), 301)
        }
    } catch (error) {
        console.error('Middleware hard-coded redirect error:', error);
        return response;
    }

    try {
        let lng
        //@ts-ignore
        if (req.cookies.has(cookieName)) lng = acceptLanguage.get(req.cookies.get(cookieName).value)
        if (!lng) lng = acceptLanguage.get(req.headers.get('Accept-Language'))
        if (!lng) lng = fallbackLng
    
        // split path will split up to ['', 'locale', 'pathname']
        let splitPathname = req.nextUrl.pathname.split(`/`)
        
        // // Redirect to fallback locale with pathname appended for root visits /solutions => /en/solutions
        // if (splitPathname.length < 3 && !languages.some(loc => new RegExp((`^${loc}$`)).test(splitPathname[1]))) {
        //     return NextResponse.redirect(new URL(`/${fallbackLng}${req.nextUrl.pathname}${req.nextUrl.search ? req.nextUrl.search : ``}`, req.url))
        // }
        
        // Redirect if lng in path is not supported /de/solutions => /en/solutions
        if (
            // splitPathname.length > 2 &&
            !languages.some(loc => new RegExp((`^${loc}$`)).test(splitPathname[1])) &&
            !req.nextUrl.pathname.startsWith('/_next')
        ) {
            // const removedLocale = splitPathname.splice(1, 1)
            // const purifiedPathname = splitPathname.join('/')
            return NextResponse.redirect(new URL(`/${lng}${req.nextUrl.pathname}${req.nextUrl.search ? req.nextUrl.search : ``}`, req.url), 301)
        }
        
        if (req.headers.has('referer')) {
            const refererUrl = new URL(req.headers.get('referer') || ``)
            const lngInReferer = languages.find((l) => refererUrl.pathname.startsWith(`/${l}`))
            if (lngInReferer) response.cookies.set(cookieName, lngInReferer)
            return response
        }
    
        return response
    } catch (error) {
        console.error('Middleware localization error:', error);
        return response
    }
}