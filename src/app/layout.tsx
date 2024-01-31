"use client"

import { Flowbite, ThemeModeScript } from 'flowbite-react';
import { Montserrat } from 'next/font/google'
import './globals.css'
import NextNProgress from 'nextjs-progressbar';
import { LoadingProvider } from './_context/loadingContext';

const montserrat = Montserrat({
  weight: ['400', '500', '600', '700', '800'],
  subsets: ['latin'],
  display: 'swap'
})

const RootLayout: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  return (
    <LoadingProvider>
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
    </LoadingProvider>
  );
};

export default RootLayout