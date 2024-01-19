"use client"

import React, { useEffect, useState } from 'react'
import { Breadcrumb, Tooltip } from 'flowbite-react'
import { HiHome } from 'react-icons/hi'
import DashboardCards from './cards'
import AdminLayout from '../adminLayout'
import { BiMusic, BiUser, BiStar } from "react-icons/bi";
import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, XAxis, YAxis } from 'recharts'
import { getStatistics } from '@/app/_services/AdminServices'

interface Statistics {
    total_tracks: number;
    total_radio: number;
    total_personality: number;
    total_users: number;
    users_login_last_week: Object;
    users_register_lask_week: Object;
}

const Dashboard = () => {
    const [isLoading, setIsLoading] = useState(true)
    const [token, setToken] = useState("")
    const [statistic, setStatistic] = useState<any>([])
    const loadTokenFromLocalStorage = (): string => {
        const token = localStorage.getItem('token') || "";
        return token
    };
    useEffect(() => {
        const token = loadTokenFromLocalStorage()
        setToken(token)
        console.log(token)
    }, [])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const statistic = await getStatistics(token)
                setStatistic(statistic)
            } catch (error) {
                console.log(error)
            }
        }
        fetchData()
    }, [token])

    useEffect(() => {
        setIsLoading(false)
    }, [statistic])

    if (isLoading) {
        return <p>Fetching data...</p>;
    }

    const ChartComponent = ({ data }: any) => {
        return (
            <LineChart
                width={800}
                height={400}
                data={Object.entries(data).map(([date, counts]) => ({ date, ...(counts as object) }))}
                margin={{ top: 20, right: 30, left: 20, bottom: 10 }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip content={undefined} />
                <Legend />
                <Line type="monotone" dataKey="totalLogins" stroke="#8884d8" />
            </LineChart>
        );
    };
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
                <DashboardCards title={"Tracks"} value={statistic?.data?.total_tracks} extraValue={0} icon={BiMusic} bg={"bg-gradient-to-tr from-cyan-400 to-blue-500 dark:from-purple-900 dark:to-slate-900"}></DashboardCards>
                <DashboardCards title={"Users"} value={statistic?.data?.total_users} extraValue={0} icon={BiUser} bg={"bg-gradient-to-r from-fuchsia-600 to-purple-600 dark:from-purple-900 dark:to-slate-900"}></DashboardCards>
                <DashboardCards title={"Personality"} value={statistic?.data?.total_personality} extraValue={0} icon={BiStar} bg={"bg-gradient-to-r from-fuchsia-500 to-pink-500 dark:from-purple-900 dark:to-slate-900"}></DashboardCards>
            </div>
            <div className="mb-6 flex">
                <div className="relative overflow-scroll object-cover bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                    <div className="grid grid-cols-2 gap-8 w-full h-80">
                        <LineChart
                            width={500}
                            height={300}
                            data={statistic?.data?.users_login_last_week}
                            margin={{
                                top: 5,
                                right: 30,
                                left: 20,
                                bottom: 5,
                            }}
                        >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="date" />
                            <YAxis />
                            {/* <Tooltip content={statistic?.data?.users_login_last_week.value} /> */}
                            <Legend />
                            <Line type="monotone" dataKey="value" stroke="#8884d8" activeDot={{ r: 8 }} />
                        </LineChart>
                        <LineChart
                            width={500}
                            height={300}
                            data={statistic?.data?.users_register_lask_week}
                            margin={{
                                top: 5,
                                right: 30,
                                left: 20,
                                bottom: 5,
                            }}
                        >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="date" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Line type="monotone" dataKey="value" stroke="#8884d8" activeDot={{ r: 8 }} />
                        </LineChart>
                    </div>
                </div>
            </div>
        </AdminLayout>
    )
}

export default Dashboard