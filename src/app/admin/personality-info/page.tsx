'use client'

import React, { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import { Breadcrumb, Button, Checkbox, CustomFlowbiteTheme, Table, TextInput } from 'flowbite-react'
import { HiHome } from 'react-icons/hi'
import { HiSearch } from "react-icons/hi";
import PersonalityInfoTable from './table'
import { PersonalityInfo } from '../../_interfaces/PersonalityInfo'
import { getAllPersonalityInfo } from '../../_services/PersonalityServices'
import { RootState } from '@/app/redux/store/store'
import { useSelector } from 'react-redux'
import AdminLayout from '../adminLayout'

const PersonalityInfo = () => {
    const [token, setToken] = useState("")
    const loadTokenFromLocalStorage = (): string => {
        const token = localStorage.getItem('token') || "";
        return token
    };
    const pathname = usePathname()
    const [personalityInfo, setPersonalityInfo] = useState<PersonalityInfo[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const token = loadTokenFromLocalStorage()
        setToken(token)
        console.log({ token })
    }, [])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getAllPersonalityInfo(token)
                setPersonalityInfo(data)
            } catch (error) {
                console.log(error)
            }
        }
        fetchData()
    }, [token])

    useEffect(() => {
        console.log(personalityInfo)
        setLoading(false)
    }, [personalityInfo])

    return (
        <AdminLayout>
            <div className="mb-6">
                <h1>Personality Information</h1>
                <Breadcrumb aria-label="Personality info breadcrumbs">
                    <Breadcrumb.Item href="/dashboard" icon={HiHome}>
                        Dashboard
                    </Breadcrumb.Item>
                    <Breadcrumb.Item>Personality</Breadcrumb.Item>
                    <Breadcrumb.Item href="/personality-info">Information</Breadcrumb.Item>
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
                <PersonalityInfoTable data={personalityInfo} loading={loading} />
            </div>
        </AdminLayout>
    )
}

export default PersonalityInfo