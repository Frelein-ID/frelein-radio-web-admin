"use client"

import React, { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import { Breadcrumb, Button, Checkbox, CustomFlowbiteTheme, Table, TextInput } from 'flowbite-react'
import { HiHome } from 'react-icons/hi'
import { HiSearch } from "react-icons/hi";
import UsersTable from './table'
import AdminLayout from '../adminLayout'
import { Users } from '@/app/_interfaces/Users'
import { getAllUser } from '@/app/_services/UserServices'

const HistoryPage = () => {
    const [token, setToken] = useState("")
    const loadTokenFromLocalStorage = (): string => {
        const token = localStorage.getItem('token') || "";
        return token
    };
    const pathname = usePathname()
    const [users, setUsers] = useState<Users[]>([])
    const [loading, setLoading] = useState(true)

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
            }
        }
        fetchData()
    }, [token])

    useEffect(() => {
        setLoading(false)
    }, [users])

    return (
        <AdminLayout>
            <div className="mb-6">
                <h1>History</h1>
            </div>
            <div className="mb-6">
                <Breadcrumb aria-label="Users information breadcrumbs">
                    <Breadcrumb.Item href="/admin/dashboard" icon={HiHome}>
                        Dashboard
                    </Breadcrumb.Item>
                    <Breadcrumb.Item href="/admin/history">History</Breadcrumb.Item>
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
                <div className="overflow-scroll">
                    {/* <UsersTable data={users} loading={loading} token={token} /> */}
                </div>
            </div>
        </AdminLayout>
    )
}

export default HistoryPage