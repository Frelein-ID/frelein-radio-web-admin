'use client'

import React, { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import { Breadcrumb, Button, Checkbox, CustomFlowbiteTheme, Table, TextInput } from 'flowbite-react'
import { HiHome } from 'react-icons/hi'
import { HiSearch } from "react-icons/hi";
import UsersTable from './table'
import AdminLayout from '../adminLayout'
import { Users } from '@/app/_interfaces/Users'
import { getAllUser } from '@/app/_services/UserServices'
import Skeleton from 'react-loading-skeleton'
import Lottie from 'lottie-react'
import loadingAnimation from "@/app/_animations/loading.json"

const UsersPage = () => {
    const [token, setToken] = useState("")
    const loadTokenFromLocalStorage = (): string => {
        const token = localStorage.getItem('token') || "";
        return token
    };
    const pathname = usePathname()
    const [users, setUsers] = useState<Users[]>([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const token = loadTokenFromLocalStorage()
        setToken(token)
    }, [])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getAllUser(token)
                setUsers(response?.data)
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
                        <h1>Users Information</h1>
                    </div >
                    <div className="mb-6">
                        <Breadcrumb aria-label="Users information breadcrumbs">
                            <Breadcrumb.Item href="/admin/dashboard" icon={HiHome}>
                                Dashboard
                            </Breadcrumb.Item>
                            <Breadcrumb.Item>Users</Breadcrumb.Item>
                            <Breadcrumb.Item href="/admin/users">Users</Breadcrumb.Item>
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
                            <UsersTable data={users} token={token} />
                        </div>
                    </div>
                </>
            )}
        </AdminLayout >
    )
}

export default UsersPage