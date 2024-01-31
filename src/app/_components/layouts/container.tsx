"use client"

import React from 'react'

const Container = ({
    children,
}: {
    children: React.ReactNode
}) => {
    return (
        <main className='container relative overflow-hidden block w-full min-h-screen p-8'>
            {children}
        </main>
    )
}

export default Container