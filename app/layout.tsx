import type React from "react"
import type { Metadata } from "next"
import { Montserrat, Open_Sans } from "next/font/google"
import "./globals.css"
import { GameProvider } from "@/contexts/GameContext"

const montserrat = Montserrat({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-montserrat",
  weight: ["400", "600", "700", "900"],
})

const openSans = Open_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-open-sans",
  weight: ["400", "500", "600"],
})

export const metadata: Metadata = {
  title: "Escape Room Luxury - Desafío Mental",
  description: "Una experiencia de escape room digital de lujo con múltiples niveles y desafíos",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" className={`${montserrat.variable} ${openSans.variable}`}>
      <head>
        <style>{`
html {
  font-family: ${openSans.style.fontFamily};
  --font-montserrat: ${montserrat.style.fontFamily};
  --font-open-sans: ${openSans.style.fontFamily};
}
        `}</style>
      </head>
      <body className="font-sans antialiased">
        <GameProvider>{children}</GameProvider>
      </body>
    </html>
  )
}
