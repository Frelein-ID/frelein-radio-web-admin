"use client"

import React, { useEffect } from 'react'
import { Breadcrumb } from 'flowbite-react'
import { HiHome } from 'react-icons/hi'
import AdminLayout from '../adminLayout'
import RadioTracksTable from './table'
import { NextSeo } from 'next-seo'
import { useLoading } from '@/app/_context/loadingContext'
import { useRouter } from 'next/navigation'

const RadioTracksPage = () => {
    const router = useRouter()
    const { stopLoading, startLoading } = useLoading()

    useEffect(() => {
        stopLoading()
    }, [stopLoading])

    return (
        <AdminLayout>
            <NextSeo
                title='Radio Tracks'
            />
            <div className="mb-6">
                <h1>Radio Tracks</h1>
            </div>
            <div className="mb-6">
                <Breadcrumb aria-label="Radio information breadcrumbs">
                    <Breadcrumb.Item href="#" onClick={() => {
                        startLoading()
                        router.push("/admin/dashboard")
                    }} icon={HiHome}>
                        Dashboard
                    </Breadcrumb.Item>
                    <Breadcrumb.Item>Radio</Breadcrumb.Item>
                    <Breadcrumb.Item href="#" onClick={() => {
                        startLoading()
                        router.push("/admin/radio-tracks")
                    }}>Tracks</Breadcrumb.Item>
                </Breadcrumb>
            </div>
            <div className="mb-6 rounded-lg relative overflow-hidden">
                <div className="mb-6 rounded-lg relative overflow-hidden">
                    <div className="overflow-scroll bg-white">
                        <RadioTracksTable />
                    </div>
                </div>
            </div>
        </AdminLayout>
    )
}

export default RadioTracksPage