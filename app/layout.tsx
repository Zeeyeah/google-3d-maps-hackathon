import type { Metadata } from 'next'
import localFont from 'next/font/local'
import './globals.css'
import { Montserrat } from 'next/font/google'
import { Analytics } from '@vercel/analytics/react'

const wulkanDisplay = localFont({
  src: './fonts/wulkan-display/WulkanDisplayMedium.woff',
  variable: '--font-wulkan-display',
})

const montserrat = Montserrat({
  variable: '--font-montserrat',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800', '900'],
})

export const metadata: Metadata = {
  title: 'Daryaft',
  description: 'A guide to Mt. Fuji',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${montserrat.variable} ${wulkanDisplay.variable}`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
