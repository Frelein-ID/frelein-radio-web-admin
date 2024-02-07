"use client"

import { Breadcrumb } from 'flowbite-react';
import { NextSeo } from 'next-seo';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';
import { HiHome } from 'react-icons/hi';
import { useLoading } from '@/app/_context/loadingContext';
import AdminLayout from '../adminLayout';
import RadioInfoTable from './table';

const RadioInfoPage = () => {
    const router = useRouter()
    const { stopLoading, startLoading } = useLoading()

    useEffect(() => {
        stopLoading()
    }, [stopLoading])

    return (
        <AdminLayout>
            <NextSeo
                title='Radio Information'
            />
            <div className="mb-6">
                <h1>Radio Information</h1>
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
                        router.push("/admin/radio-info")
                    }}>Information</Breadcrumb.Item>
                </Breadcrumb>
            </div>
            <div className="mb-6 rounded-lg relative overflow-hidden">
                <div className="mb-6 rounded-lg relative overflow-hidden">
                    <div className="overflow-scroll bg-white">
                        <RadioInfoTable />
                    </div>
                </div>
            </div>
        </AdminLayout>
    )
}

export default RadioInfoPage