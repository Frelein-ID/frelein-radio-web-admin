'use client'

import { logoutUser } from '@/app/redux/features/auth'
import { Avatar, Button, Dropdown, Navbar, DarkThemeToggle, CustomFlowbiteTheme } from 'flowbite-react'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useRouter } from 'next/navigation'
import { Users } from '@/app/_interfaces/Users'
import { getAdminData } from '@/app/_services/AdminServices'
import { VerifyUser, removeDataFromStorage } from '@/app/_utils/auth-utils'
import Skeleton from 'react-loading-skeleton'

const avatarTheme: CustomFlowbiteTheme['avatar'] = {
    root: {
        base: "flex justify-center items-center space-x-4 rounded",
        bordered: "p-1 ring-2",
        rounded: "rounded-full",
        img: {
            "base": "rounded object-cover",
            "off": "relative overflow-hidden bg-gray-100 dark:bg-gray-600",
            "on": "",
            "placeholder": "absolute w-auto h-auto text-gray-400 -bottom-1"
        }
    }
}

const navbarTheme: CustomFlowbiteTheme['navbar'] = {
    root: {
        base: "bg-white px-2 py-2.5 dark:bg-gray-800 sm:px-4 border-b border-gray-100 dark:border-gray-700"
    }
}

const CustomNavbar = () => {
    const router = useRouter()
    const [user, setUser] = useState<Users | null>(null)
    const handleSignOut = () => {
        removeDataFromStorage("token")
        removeDataFromStorage("userId")
        router.push("/login")
    }
    useEffect(() => {
        const fetchData = async () => {
            try {
                setUser(await VerifyUser())
            } catch (error) {
                console.log(error)
            }
        }
        fetchData()
    }, [])

    return (
        <Navbar theme={navbarTheme} fluid>
            <div className="w-full flex justify-between items-center">
                <Navbar.Brand as={Link} href="/dashboard">
                    <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">Frelein Radio</span>
                </Navbar.Brand>
                <div className="grid grid-cols-2 gap-4">
                    <DarkThemeToggle></DarkThemeToggle>
                    <div className="flex md:order-2">
                        <Dropdown
                            arrowIcon={false}
                            inline
                            label={
                                <Avatar theme={avatarTheme} alt="User profile" title="User profile" img={user?.image != null ? (user.image) : ("/images/people.jpg")} rounded />
                            }
                        >
                            <Dropdown.Header>
                                <span className="block text-sm">{user?.name || <Skeleton />}</span>
                                <span className="block truncate text-sm font-medium">{user?.email || <Skeleton />}</span>
                            </Dropdown.Header>
                            <Dropdown.Item>Settings</Dropdown.Item>
                            <Dropdown.Divider />
                            <Dropdown.Item onClick={handleSignOut}>Sign out</Dropdown.Item>
                        </Dropdown>
                    </div>
                </div>
            </div>
        </Navbar>
    )
}

export default CustomNavbar