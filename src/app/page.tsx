'use client'

import { NextSeo } from 'next-seo'
import { redirect } from 'next/navigation'

export default function App() {
  <NextSeo
    title='Frelein Radio Admin'
    description='A website to manage frelein radio app data'
  />
  redirect('/login')
}
