"use client"

import React from 'react'
import { Breadcrumb, } from 'flowbite-react'
import { HiHome } from 'react-icons/hi'
import PersonalityInfoTable from './table'
import AdminLayout from '../adminLayout'
import { NextSeo } from 'next-seo'
import { useRouter } from 'next/navigation'
import { useLoading } from '@/app/_context/loadingContext'

const PersonalityInfoPage = () => {
    const router = useRouter()
    const { startLoading } = useLoading()
    return (
        <AdminLayout>
            <NextSeo
                title='Personality Information'
            />
            <>
                <div className="mb-6">
                    <h1>Personality Information</h1>
                    <Breadcrumb aria-label="Personality information breadcrumb">
                        <Breadcrumb.Item href="#" onClick={() => {
                            startLoading()
                            router.push("/admin/dashboard")
                        }} icon={HiHome}>
                            Dashboard
                        </Breadcrumb.Item>
                        <Breadcrumb.Item>Personality</Breadcrumb.Item>
                        <Breadcrumb.Item href="#" onClick={() => {
                            startLoading()
                            router.push("/admin/personality-info")
                        }}>Information</Breadcrumb.Item>
                    </Breadcrumb>
                </div>
                <div className="mb-6 rounded-lg relative overflow-hidden">
                    <div className="overflow-scroll bg-white">
                        <PersonalityInfoTable />
                    </div>
                </div>
            </>
        </AdminLayout>
    )
}

export default PersonalityInfoPage