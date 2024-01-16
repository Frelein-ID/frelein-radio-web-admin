"use client"

import React, { useEffect, useState } from 'react'
import { Breadcrumb } from 'flowbite-react'
import { HiHome } from 'react-icons/hi'
import DashboardCards from './cards'
import AdminLayout from '../adminLayout'
import { BiMusic, BiUser, BiStar } from "react-icons/bi";
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from 'recharts'

const Dashboard = () => {
    const [token, setToken] = useState("")
    const data = [{ name: 'Page A', uv: 400, pv: 2400, amt: 2400 }];
    const loadTokenFromLocalStorage = (): string => {
        const token = localStorage.getItem('token') || "";
        return token
    };
    useEffect(() => {
        const token = loadTokenFromLocalStorage()
        setToken(token)
        console.log({ token })
    }, [])
    return (
        <AdminLayout>
            <div className="mb-6">
                <Breadcrumb aria-label="Default breadcrumb example">
                    <Breadcrumb.Item href="/dashboard" icon={HiHome}>
                        Dashboard
                    </Breadcrumb.Item>
                </Breadcrumb>
            </div>
            <div className="mb-6 grid grid-cols-3 gap-8">
                <DashboardCards title={"Tracks"} value={0} extraValue={0} icon={BiMusic} bg={"bg-gradient-to-tr from-cyan-400 to-blue-500 dark:from-purple-900 dark:to-slate-900"}></DashboardCards>
                <DashboardCards title={"Users"} value={0} extraValue={0} icon={BiUser} bg={"bg-gradient-to-r from-fuchsia-600 to-purple-600 dark:from-purple-900 dark:to-slate-900"}></DashboardCards>
                <DashboardCards title={"Personality"} value={0} extraValue={0} icon={BiStar} bg={"bg-gradient-to-r from-fuchsia-500 to-pink-500 dark:from-purple-900 dark:to-slate-900"}></DashboardCards>
            </div>
            <div className="mb-6 grid grid-cols-2 gap-8">
                <div className="relative overflow-scroll object-cover bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                    <LineChart width={459} height={360} className='relative w-full h-480' data={data}>
                        <Line type="monotone" dataKey="uv" stroke="#8884d8" />
                        <CartesianGrid stroke="#ccc" />
                        <XAxis dataKey="name" />
                        <YAxis />
                    </LineChart>
                </div>
                <div className="relative overflow-scroll object-cover bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                    <LineChart width={459} height={360} className='relative w-full h-480' data={data}>
                        <Line type="monotone" dataKey="uv" stroke="#8884d8" />
                        <CartesianGrid stroke="#ccc" />
                        <XAxis dataKey="name" />
                        <YAxis />
                    </LineChart>
                </div>
            </div>
        </AdminLayout>
    )
}

export default Dashboard