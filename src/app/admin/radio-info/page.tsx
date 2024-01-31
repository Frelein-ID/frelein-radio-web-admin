"use client"

import React, { useEffect, useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { Breadcrumb, Button, CustomFlowbiteTheme, TextInput } from 'flowbite-react'
import { HiHome } from 'react-icons/hi'
import { RadioInfo } from '../../_interfaces/RadioInfo'
import { getAllRadioInfo } from '../../_services/RadioInfoServices'
import { HiSearch } from "react-icons/hi";
import RadioInfoTable from './table'
import AdminLayout from '../adminLayout'
import { loadDataFromStorage } from '@/app/_utils/auth-utils'
import { NextSeo } from 'next-seo'
import { useLoading } from '@/app/_context/loadingContext'

const RadioInfoPage = () => {
    const pathname = usePathname()
    const router = useRouter()
    const { stopLoading, startLoading } = useLoading()
    const [token, setToken] = useState<string>("")
    const [radioInfo, setRadioInfo] = useState<RadioInfo[]>([])

    useEffect(() => {
        setToken(loadDataFromStorage("token"))
        const fetchRadioInfo = async () => {
            try {
                const response = await getAllRadioInfo(token)
                setRadioInfo(response?.data)
            } catch (error) {
                console.log(error)
            } finally {
                stopLoading()
            }
        }
        fetchRadioInfo()
    }, [stopLoading, token])

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
                <div className='p-4 flex flex-row justify-between items-center bg-white dark:bg-gray-800'>
                    <TextInput id="search-table" type="text" icon={HiSearch} placeholder="Search here..." />
                    <div className="grid grid-cols-2 gap-3">
                        <Button color="failure">Delete selected</Button>
                        <Button href={`${pathname}/add/`} color="success">Add new</Button>
                    </div>
                </div>
                <div className="overflow-scroll">
                    <RadioInfoTable data={radioInfo} />
                </div>
            </div>
        </AdminLayout>
    )
}

export default RadioInfoPage