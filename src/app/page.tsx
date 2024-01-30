'use client'

import { NextSeo } from 'next-seo'
import { redirect } from 'next/navigation'
import NextNProgress from 'nextjs-progressbar';

export default function App() {
  redirect('/login')
  return (
    <>
      <NextSeo
        title='Frelein Radio Admin'
        description='A website to manage frelein radio app data'
      />
      <NextNProgress />
    </>
  )
}
