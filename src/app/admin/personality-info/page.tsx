'use client'

import React, { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import { Breadcrumb, Button, Checkbox, CustomFlowbiteTheme, Table, TextInput } from 'flowbite-react'
import { HiHome } from 'react-icons/hi'
import { HiSearch } from "react-icons/hi";
import PersonalityInfoTable from './table'
import { PersonalityInfo } from '../../_interfaces/PersonalityInfo'
import { getAllPersonalityInfo } from '../../_services/PersonalityServices'
import AdminLayout from '../adminLayout'
import Lottie from 'lottie-react'
import loadingAnimation from "@/app/_animations/loading.json"


const PersonalityInfo = () => {
    const pathname = usePathname()
    const [isLoading, setIsLoading] = useState(true)

    const [token, setToken] = useState("")
    const loadTokenFromLocalStorage = (): string => {
        const token = localStorage.getItem('token') || "";
        return token
    };

    const [personalityInfo, setPersonalityInfo] = useState<PersonalityInfo[]>([])

    useEffect(() => {
        const token = loadTokenFromLocalStorage()
        setToken(token)
    }, [])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getAllPersonalityInfo(token)
                setPersonalityInfo(response?.data)
            } catch (error) {
                console.log(error)
            } finally {
                setIsLoading(false)
            }
        }
        fetchData()
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
                                <Button href={`${pathname}/add/`} color="success">Add new</Button>
                            </div>
                        </div>
                        <div className="overflow-scroll">
                            <PersonalityInfoTable data={personalityInfo} loading={isLoading} token={token} />
                        </div>
                    </div>
                </>
            )}
        </AdminLayout>
    )
}

export default PersonalityInfo