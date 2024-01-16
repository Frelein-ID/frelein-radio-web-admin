import React from 'react'

const Container = ({
    children,
}: {
    children: React.ReactNode
}) => {
    return (
        <main className='container relative overflow-hidden block w-full min-h-screen p-8 bg-gray-100 dark:bg-gray-900'>
            {children}
        </main>
    )
}

export default Container