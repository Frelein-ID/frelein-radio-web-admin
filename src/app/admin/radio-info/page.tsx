'use client'

import React, { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import { Breadcrumb, Button, TextInput } from 'flowbite-react'
import { HiHome } from 'react-icons/hi'
import { RadioInfo } from '../../_interfaces/RadioInfo'
import { getAllRadioInfo } from '../../_services/RadioInfoServices'
import { HiSearch } from "react-icons/hi";
import RadioInfoTable from './table'
import AdminLayout from '../adminLayout'

const RadioInfoPage = () => {
    const pathname = usePathname()
    const [radioInfo, setRadioInfo] = useState<RadioInfo[]>([])
    const [loading, setLoading] = useState(true)

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
        const fetchRadioInfo = async () => {
            try {
                const data = await getAllRadioInfo(token)
                setRadioInfo(data)
            } catch (error) {
                console.log(error)
            }
        }
        fetchRadioInfo()
    }, [token])

    useEffect(() => {
        console.log(radioInfo)
        setLoading(false)
    }, [radioInfo])

    return (
        <AdminLayout>
            <div className="mb-6">
                <h1>Radio Information</h1>
                <Breadcrumb aria-label="Default breadcrumb example">
                    <Breadcrumb.Item href="/dashboard" icon={HiHome}>
                        Dashboard
                    </Breadcrumb.Item>
                    <Breadcrumb.Item>Radio</Breadcrumb.Item>
                    <Breadcrumb.Item href="/radio-info">Information</Breadcrumb.Item>
                </Breadcrumb>
            </div>
            <div className="mb-6">
                <div className='p-4 flex flex-row justify-between items-center bg-white dark:bg-gray-800 rounded-tl-lg rounded-tr-lg'>
                    <TextInput id="search-table" type="text" icon={HiSearch} placeholder="Search here..." />
                    <div className="grid grid-cols-2 gap-3">
                        <Button color="failure">Delete selected</Button>
                        <Button href={`${pathname}/add/`} color="success">Add new</Button>
                    </div>
                </div>
                <RadioInfoTable data={radioInfo} loading={loading} />
            </div>
        </AdminLayout>
    )
}

export default RadioInfoPage