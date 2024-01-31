"use client"

import React, { useEffect, useState } from 'react'
import { Breadcrumb } from 'flowbite-react'
import { HiHome } from 'react-icons/hi'
import DashboardCards from './cards'
import AdminLayout from '../adminLayout'
import { BiMusic, BiUser, BiStar } from "react-icons/bi";
import { getStatistics } from '@/app/_services/AdminServices'
import { Line } from 'react-chartjs-2'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { loadDataFromStorage } from '@/app/_utils/auth-utils'
import { NextSeo } from 'next-seo'
import { useLoading } from '@/app/_context/loadingContext'

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const loginChartOptions = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top' as const,
        },
        title: {
            display: true,
            text: 'Logged in user last week',
        },
    },
};

const registerChartOptions = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top' as const,
        },
        title: {
            display: true,
            text: 'Registered user last week',
        },
    },
};

const Dashboard = () => {
    const { stopLoading } = useLoading()
    const [statistic, setStatistic] = useState<any>({})
    const [loginChartData, setLoginChartData] = useState<any>([])
    const [loginChartLabel, setLoginChartLabel] = useState<any>([])
    const [registerChartData, setRegisterChartData] = useState<any>([])
    const [registerChartLabel, setRegisterChartLabel] = useState<any>([])

    useEffect(() => {
        const token = loadDataFromStorage("token")
        const fetchData = async () => {
            try {
                await getStatistics(token).then((value) => {
                    setStatistic(value)
                    setLoginChartData(value.data.users_login_last_week.map((item: any) => item.value))
                    setLoginChartLabel(value.data.users_login_last_week.map((item: any) => item.date))
                    setRegisterChartData(value.data.users_register_last_week.map((item: any) => item.value))
                    setRegisterChartLabel(value.data.users_register_lask_week.map((item: any) => item.date))
                })
            } catch (error: any) {
                console.log(error)
            } finally {
                stopLoading()
            }
        }
        fetchData()
    }, [stopLoading])

    return (
        <>
            <NextSeo
                title='Dashboard'
            />
            <AdminLayout>
                <div className="mb-6">
                    <Breadcrumb aria-label="Default breadcrumb example">
                        <Breadcrumb.Item href="/admin/dashboard" icon={HiHome}>
                            Dashboard
                        </Breadcrumb.Item>
                    </Breadcrumb>
                </div>
                <div className="mb-6 grid grid-cols-3 gap-8">
                    <DashboardCards title={"Tracks"} value={statistic?.data?.total_tracks || "NaN"} extraValue={0} icon={BiMusic} bg={"bg-gradient-to-tr from-cyan-400 to-blue-500 dark:from-purple-900 dark:to-slate-900"}></DashboardCards>
                    <DashboardCards title={"Users"} value={statistic?.data?.total_users || "NaN"} extraValue={0} icon={BiUser} bg={"bg-gradient-to-r from-fuchsia-600 to-purple-600 dark:from-purple-900 dark:to-slate-900"}></DashboardCards>
                    <DashboardCards title={"Personality"} value={statistic?.data?.total_personality || "NaN"} extraValue={0} icon={BiStar} bg={"bg-gradient-to-r from-fuchsia-500 to-pink-500 dark:from-purple-900 dark:to-slate-900"}></DashboardCards>
                </div>
                <div className="mb-6 flex">
                    <div className="relative overflow-scroll object-cover bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                        <div className="grid grid-cols-2 gap-8 w-full h-80">
                            {loginChartLabel.length != 0 && loginChartData.length != 0 ? (
                                <Line
                                    options={loginChartOptions}
                                    data={{
                                        labels: loginChartLabel,
                                        datasets: [
                                            {
                                                label: 'Users',
                                                data: loginChartData,
                                                fill: false,
                                                borderColor: 'rgb(75, 192, 192)',
                                                tension: 0.1
                                            }
                                        ]
                                    }}
                                />
                            ) : (
                                <></>
                            )}

                            {registerChartLabel.length != 0 && registerChartData.length != 0 ? (
                                <Line
                                    options={registerChartOptions}
                                    data={{
                                        labels: registerChartLabel,
                                        datasets: [
                                            {
                                                label: 'Users',
                                                data: registerChartData,
                                                fill: false,
                                                borderColor: 'rgb(75, 192, 192)',
                                                tension: 0.1
                                            }
                                        ]
                                    }}
                                />
                            ) : (
                                <></>
                            )}


                        </div>
                    </div>
                </div>
            </AdminLayout>
        </>
    )
}

export default Dashboard