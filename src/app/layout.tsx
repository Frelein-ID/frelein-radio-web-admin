"use client"

import { Flowbite, ThemeModeScript } from 'flowbite-react';
import type { Metadata } from 'next'
import { Montserrat } from 'next/font/google'
import './globals.css'
import { Provider } from 'react-redux';
import { store } from './redux/store/store';

const montserrat = Montserrat({
  weight: ['400', '500', '600', '700', '800'],
  subsets: ['latin'],
  display: 'swap'
})

const RootLayout: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  return (
    <html lang="en">
      <head>
        <ThemeModeScript></ThemeModeScript>
      </head>
      <body className={montserrat.className}>
        <Provider store={store}>
          <Flowbite>
            {children}
          </Flowbite>
        </Provider>
      </body>
    </html>
  );
};

export default RootLayout