"use client"

import { Flowbite, ThemeModeScript } from 'flowbite-react';
import type { Metadata } from 'next'
import { Montserrat } from 'next/font/google'
import './globals.css'
import NextNProgress from 'nextjs-progressbar';

const montserrat = Montserrat({
  weight: ['400', '500', '600', '700', '800'],
  subsets: ['latin'],
  display: 'swap'
})

const RootLayout: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  return (
    <html lang="en">
      <head>
        {/* eslint-disable-next-line @next/next/no-sync-scripts */}
        <script src="http://localhost:8097"></script>
        <ThemeModeScript></ThemeModeScript>
      </head>
      <body className={montserrat.className}>
        <NextNProgress></NextNProgress>
        <Flowbite>
          {children}
        </Flowbite>
      </body>
    </html>
  );
};

export default RootLayout