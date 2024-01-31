"use client"

import React from 'react'
import Lottie from 'lottie-react'
import loadingAnimation from "@/app/_animations/loading.json"

const Loading = () => {
    return (
        <div className="flex justify-center items-center w-full h-screen mx-auto">
            <div className='relative w-64 h-64 rounded-2xl bg-white dark:bg-gray:700 shadow-xl'>
                <Lottie animationData={loadingAnimation} />
            </div>
        </div>
    )
}

export default Loading