'use client'

import { CustomFlowbiteTheme, Sidebar } from 'flowbite-react'
import React from 'react'
import { BiPieChartAlt2, BiRadio, BiUser, BiStar, BiHistory } from 'react-icons/bi';

const sidebarTheme: CustomFlowbiteTheme['sidebar'] = {
    root: {
        inner: "h-full overflow-y-auto overflow-x-hidden bg-gray-50 py-4 px-3 dark:bg-gray-800"
    }
}

const CustomSidebar = () => {
    return (
        <>
            <Sidebar theme={sidebarTheme} aria-label="Sidebar">
                <Sidebar.Items>
                    <Sidebar.ItemGroup>
                        <Sidebar.Item href="/admin/dashboard" icon={BiPieChartAlt2}>
                            Dashboard
                        </Sidebar.Item>
                        <Sidebar.Collapse icon={BiRadio} label="Radio">
                            <Sidebar.Item href="/admin/radio-info">Information</Sidebar.Item>
                            <Sidebar.Item href="/admin/radio-tracks">Tracks</Sidebar.Item>
                        </Sidebar.Collapse>
                        <Sidebar.Item href="/admin/personality-info" icon={BiStar}>
                            Personality
                        </Sidebar.Item>
                        <Sidebar.Item href="/admin/users" icon={BiUser}>
                            Users
                        </Sidebar.Item>
                        <Sidebar.Item href="/admin/history" icon={BiHistory}>
                            History
                        </Sidebar.Item>
                    </Sidebar.ItemGroup>
                </Sidebar.Items>
            </Sidebar>
        </>
    )
}

export default CustomSidebar