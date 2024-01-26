'use client'

import React, { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import { Breadcrumb, Button, Checkbox, CustomFlowbiteTheme, Table, TextInput } from 'flowbite-react'
import { HiHome } from 'react-icons/hi'
import { RadioTracks } from '../../_interfaces/RadioTracks'
import { getAllRadioTracks } from '../../_services/RadioTracksServices'
import { HiSearch, HiPencil, HiOutlineTrash } from "react-icons/hi";
import AdminLayout from '../adminLayout'
import RadioTracksTable from './table'
import Lottie from 'lottie-react'
import loadingAnimation from "@/app/_animations/loading.json"

const tableTheme: CustomFlowbiteTheme['table'] = {
    head: {
        cell: {
            base: "bg-gray-50 dark:bg-gray-700 px-6 py-3"
        }
    }
}

let monthNames = [
    'Januari', 'Februari', 'Maret',
    'April', 'Mei', 'Juni',
    'Juli', 'Agustus', 'September',
    'Oktober', 'November', 'Desember'
];

const RadioTracks = () => {
    const pathname = usePathname()
    const [radioTracks, setRadioTracks] = useState<RadioTracks[]>([])
    const [isLoading, setIsLoading] = useState(true)

    const [token, setToken] = useState("")
    const loadTokenFromLocalStorage = (): string => {
        const token = localStorage.getItem('token') || "";
        return token
    };
    useEffect(() => {
        const token = loadTokenFromLocalStorage()
        setToken(token)
        console.log({ token })
    }, [])

    useEffect(() => {
        const fetchRadioTracks = async () => {
            try {
                const response = await getAllRadioTracks(token)
                setRadioTracks(response?.data)
            } catch (error) {
                console.log(error)
            } finally {
                setIsLoading(false)
            }
        }
        fetchRadioTracks()
    }, [token])

    return (
        <AdminLayout>
            {isLoading ? (
                <div className='w-full h-full flex justify-center items-center'>
                    <Lottie animationData={loadingAnimation} />
                </div>
            ) : (
                <>
                    <div className="mb-6">
                        <h1>Radio Tracks</h1>
                    </div>
                    <div className="mb-6">
                        <Breadcrumb aria-label="Default breadcrumb example">
                            <Breadcrumb.Item href="/admin/dashboard" icon={HiHome}>
                                Dashboard
                            </Breadcrumb.Item>
                            <Breadcrumb.Item>Radio</Breadcrumb.Item>
                            <Breadcrumb.Item href="/admin/radio-tracks">Tracks</Breadcrumb.Item>
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
                </>
            )}
        </AdminLayout >
    )
}

export default RadioTracks