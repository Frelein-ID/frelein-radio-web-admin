'use client'

import React from 'react'
import { Breadcrumb, } from 'flowbite-react'
import { HiHome } from 'react-icons/hi'
import PersonalityInfoTable from './table'
import AdminLayout from '../adminLayout'
import { NextSeo } from 'next-seo'

const PersonalityInfoPage = () => {
    return (
        <AdminLayout>
            <NextSeo
                title='Personality Information'
            />
            <>
                <div className="mb-6">
                    <h1>Personality Information</h1>
                    <Breadcrumb aria-label="Personality info breadcrumbs">
                        <Breadcrumb.Item href="/admin/dashboard" icon={HiHome}>
                            Dashboard
                        </Breadcrumb.Item>
                        <Breadcrumb.Item>Personality</Breadcrumb.Item>
                        <Breadcrumb.Item href="/admin/personality-info">Information</Breadcrumb.Item>
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