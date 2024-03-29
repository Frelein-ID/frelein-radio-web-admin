"use client"

import React, { useEffect, useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { Breadcrumb, Button, Checkbox, CustomFlowbiteTheme, Table, TextInput } from 'flowbite-react'
import { HiHome } from 'react-icons/hi'
import { HiSearch } from "react-icons/hi";
import UsersTable from './table'
import AdminLayout from '../adminLayout'
import { Users } from '@/app/_interfaces/Users'
import { getAllUser } from '@/app/_services/UserServices'
import Lottie from 'lottie-react'
import loadingAnimation from "@/app/_animations/loading.json"
import { loadDataFromStorage } from '@/app/_utils/auth-utils'
import { NextSeo } from 'next-seo'
import { useLoading } from '@/app/_context/loadingContext'

const UsersPage = () => {
    const pathname = usePathname()
    const router = useRouter()
    const { stopLoading, startLoading } = useLoading()
    const [token, setToken] = useState("")
    const [users, setUsers] = useState<Users[]>([])

    useEffect(() => {
        setToken(loadDataFromStorage("token"))
        const fetchData = async () => {
            try {
                const response = await getAllUser()
                setUsers(response?.data)
            } catch (error) {
                console.log(error)
            } finally {
                stopLoading()
            }
        }
        fetchData()
    }, [stopLoading, token])

    return (
        <AdminLayout>
            <NextSeo
                title='Users Information'
            />
            <div className="mb-6">
                <h1>Users Information</h1>
            </div >
            <div className="mb-6">
                <Breadcrumb aria-label="Users information breadcrumb">
                    <Breadcrumb.Item href="#" onClick={() => {
                        startLoading()
                        router.push("/admin/dashboard")
                    }} icon={HiHome}>
                        Dashboard
                    </Breadcrumb.Item>
                    <Breadcrumb.Item href="#" onClick={() => {
                        startLoading()
                        router.push("/admin/users")
                    }}>Users</Breadcrumb.Item>
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
        </AdminLayout >
    )
}

export default UsersPage