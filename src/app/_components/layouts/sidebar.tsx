"use client"

import { useLoading } from '@/app/_context/loadingContext';
import { CustomFlowbiteTheme, Sidebar } from 'flowbite-react'
import { useRouter } from 'next/navigation';
import React from 'react'
import { BiPieChartAlt2, BiRadio, BiUser, BiStar, BiHistory } from 'react-icons/bi';

const sidebarTheme: CustomFlowbiteTheme['sidebar'] = {
    root: {
        inner: "h-full overflow-y-auto overflow-x-hidden bg-gray-50 py-4 px-3 dark:bg-gray-800"
    },
    item: {
        base: "flex items-center justify-center rounded-lg p-2 text-base font-normal text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700 cursor-pointer"
    }
}

const CustomSidebar = () => {
    const router = useRouter()
    const { startLoading } = useLoading();
    return (
        <>
            <Sidebar theme={sidebarTheme} aria-label="Sidebar">
                <Sidebar.Items>
                    <Sidebar.ItemGroup>
                        <Sidebar.Item onClick={() => {
                            startLoading()
                            router.push("/admin/dashboard")
                        }} icon={BiPieChartAlt2}>
                            Dashboard
                        </Sidebar.Item>
                        <Sidebar.Collapse icon={BiRadio} label="Radio">
                            <Sidebar.Item onClick={() => {
                                startLoading()
                                router.push("/admin/radio-info")
                            }}>Information</Sidebar.Item>
                            <Sidebar.Item onClick={() => {
                                startLoading()
                                router.push("/admin/radio-tracks")
                            }}>Tracks</Sidebar.Item>
                        </Sidebar.Collapse>
                        <Sidebar.Collapse icon={BiStar} label="Personality">
                            <Sidebar.Item onClick={() => {
                                startLoading()
                                router.push("/admin/personality-info")
                            }}>Information</Sidebar.Item>
                            <Sidebar.Item onClick={() => {
                                startLoading()
                                router.push("/admin/personalities")
                            }}>Assign</Sidebar.Item>
                        </Sidebar.Collapse>
                        <Sidebar.Item onClick={() => {
                            startLoading()
                            router.push("/admin/users")
                        }} icon={BiUser}>
                            Users
                        </Sidebar.Item>
                        <Sidebar.Item onClick={() => {
                            startLoading()
                            router.push("/admin/history")
                        }} icon={BiHistory}>
                            History
                        </Sidebar.Item>
                    </Sidebar.ItemGroup>
                </Sidebar.Items>
            </Sidebar>
        </>
    )
}

export default CustomSidebar