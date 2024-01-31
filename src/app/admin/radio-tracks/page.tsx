"use client"

import React, { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import { Breadcrumb, Button, TextInput } from 'flowbite-react'
import { HiHome } from 'react-icons/hi'
import { RadioTracks } from '../../_interfaces/RadioTracks'
import { getAllRadioTracks } from '../../_services/RadioTracksServices'
import { HiSearch } from "react-icons/hi";
import AdminLayout from '../adminLayout'
import RadioTracksTable from './table'
import { loadDataFromStorage } from '@/app/_utils/auth-utils'
import { NextSeo } from 'next-seo'
import { useLoading } from '@/app/_context/loadingContext'
import { useRouter } from 'next/navigation'

const RadioTracks = () => {
    const pathname = usePathname()
    const router = useRouter()
    const { startLoading, stopLoading } = useLoading()
    const [token, setToken] = useState("")
    const [radioTracks, setRadioTracks] = useState<RadioTracks[]>([])

    useEffect(() => {
        <NextSeo
            title='Radio Tracks'
        />
        setToken(loadDataFromStorage("token"))
        const fetchRadioTracks = async () => {
            try {
                const response = await getAllRadioTracks(token)
                setRadioTracks(response?.data)
            } catch (error) {
                console.log(error)
            } finally {
                stopLoading()
            }
        }
        fetchRadioTracks()
    }, [stopLoading, token])

    return (
        <AdminLayout>
            <div className="mb-6">
                <h1>Radio Tracks</h1>
            </div>
            <div className="mb-6">
                <Breadcrumb aria-label="Radio tracks breadcrumb">
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
                <div className='p-4 flex flex-row justify-between items-center bg-white dark:bg-gray-800'>
                    <TextInput id="search-table" type="text" icon={HiSearch} placeholder="Search here..." />
                    <div className="grid grid-cols-2 gap-3">
                        <Button color="failure">Delete selected</Button>
                        <Button href={`${pathname}/add/`} color="success">Add new</Button>
                    </div>
                </div>
                <div className="overflow-scroll">
                    <RadioTracksTable data={radioTracks} />
                </div>
            </div>
        </AdminLayout >
    )
}

export default RadioTracks