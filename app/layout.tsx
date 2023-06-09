import NavMenu from './_components/NavMenu'
import './globals.css'
import { Assistant } from 'next/font/google'

const assistant = Assistant({ subsets: ['latin'] })

export const metadata = {
  title: 'MSM TECHNOLOGIES',
  description: 'Meta description bro',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={assistant.className}>
        <NavMenu />
        {children}
      </body>
    </html>
  )
}
