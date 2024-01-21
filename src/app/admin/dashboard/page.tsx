"use client"

import React, { useEffect, useState } from 'react'
import { Breadcrumb, Tooltip } from 'flowbite-react'
import { HiHome } from 'react-icons/hi'
import DashboardCards from './cards'
import AdminLayout from '../adminLayout'
import { BiMusic, BiUser, BiStar } from "react-icons/bi";
import { getStatistics } from '@/app/_services/AdminServices'
import { Line } from 'react-chartjs-2'

export const chartOptions = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top' as const,
        },
        title: {
            display: true,
            text: 'Chart.js Line Chart',
        },
    },
};

// export const data = {
//     labels,
//     datasets: [
//         {
//             label: 'Dataset 1',
//             data: labels.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
//             borderColor: 'rgb(255, 99, 132)',
//             backgroundColor: 'rgba(255, 99, 132, 0.5)',
//         },
//         {
//             label: 'Dataset 2',
//             data: labels.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
//             borderColor: 'rgb(53, 162, 235)',
//             backgroundColor: 'rgba(53, 162, 235, 0.5)',
//         },
//     ],
// };

const Dashboard = () => {
    const [isLoading, setIsLoading] = useState(true)
    const [token, setToken] = useState("")
    const [statistic, setStatistic] = useState<any>([])
    // const [loginChartData, setLoginChartData] = useState<any>([])
    // const [loginChartLabel, setLoginChartLabel] = useState<any>([])
    // const [registerChartData, setRegisterChartData] = useState<any>([])
    // const [registerChartLabel, setRegisterChartLabel] = useState<any>([])
    const loadTokenFromLocalStorage = (): string => {
        const token = localStorage.getItem('token') || "";
        const id = localStorage.getItem('id') || "";
        return token
    };

    useEffect(() => {
        const token = loadTokenFromLocalStorage()
        if (token) {
            setToken(token)
            console.log(token)
        }
    }, [])

    useEffect(() => {
        if (token) {
            const fetchData = async () => {
                try {
                    await getStatistics(token).then((value) => {
                        setStatistic(value)
                    })
                } catch (error) {
                    console.log(error)
                }
            }
            fetchData()
        }
    }, [token])

    useEffect(() => {
        if (statistic) {
            setIsLoading(false)
        }
    }, [statistic])

    if (isLoading) {
        return <p>Fetching data...</p>;
    }

    return (
        <AdminLayout>
            <div className="mb-6">
                <Breadcrumb aria-label="Default breadcrumb example">
                    <Breadcrumb.Item href="/admin/dashboard" icon={HiHome}>
                        Dashboard
                    </Breadcrumb.Item>
                </Breadcrumb>
            </div>
            <div className="mb-6 grid grid-cols-3 gap-8">
                <DashboardCards title={"Tracks"} value={statistic?.data?.data?.total_tracks} extraValue={0} icon={BiMusic} bg={"bg-gradient-to-tr from-cyan-400 to-blue-500 dark:from-purple-900 dark:to-slate-900"}></DashboardCards>
                <DashboardCards title={"Users"} value={statistic?.data?.data?.total_users} extraValue={0} icon={BiUser} bg={"bg-gradient-to-r from-fuchsia-600 to-purple-600 dark:from-purple-900 dark:to-slate-900"}></DashboardCards>
                <DashboardCards title={"Personality"} value={statistic?.data?.data?.total_personality} extraValue={0} icon={BiStar} bg={"bg-gradient-to-r from-fuchsia-500 to-pink-500 dark:from-purple-900 dark:to-slate-900"}></DashboardCards>
            </div>
            <div className="mb-6 flex">
                <div className="relative overflow-scroll object-cover bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                    <div className="grid grid-cols-2 gap-8 w-full h-80">
                        {/* <Line
                            options={chartOptions}
                            data={loginChartData}
                        /> */}

                        {/* <LineChart
                            width={500}
                            height={300}
                            data={statistic?.data?.data?.users_login_last_week}
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
                            <Tooltip content={statistic?.data?.users_login_last_week.value} />
                            <Legend />
                            <Line type="monotone" dataKey="value" stroke="#8884d8" activeDot={{ r: 8 }} />
                        </LineChart>
                        <LineChart
                            width={500}
                            height={300}
                            data={statistic?.data?.data?.users_register_lask_week}
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
                        </LineChart> */}
                    </div>
                </div>
            </div>
        </AdminLayout>
    )
}

export default Dashboard