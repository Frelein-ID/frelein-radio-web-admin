'use client'

import React, { useEffect, useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { Breadcrumb, Button, Checkbox, CustomFlowbiteTheme, Table, TextInput } from 'flowbite-react'
import { HiHome } from 'react-icons/hi'
import { HiSearch } from "react-icons/hi";
import PersonalityInfoTable from './table'
import AdminLayout from '../adminLayout'
import { NextSeo } from 'next-seo'

const PersonalityInfoPage = () => {
    const pathname = usePathname()
    const router = useRouter()
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
                    <div className='p-4 flex flex-row justify-between items-center bg-white dark:bg-gray-800'>
                        <TextInput id="search-table" type="text" icon={HiSearch} placeholder="Search here..." />
                        <div className="grid grid-cols-2 gap-3">
                            <Button color="failure">Delete selected</Button>
                            <Button onClick={() => router.push(`${pathname}/add/`)} color="success">Add new</Button>
                        </div>
                    </div>
                    <div className="overflow-scroll bg-white">
                        <PersonalityInfoTable />
                    </div>
                </div>
            </>
        </AdminLayout>
    )
}

export default PersonalityInfoPage