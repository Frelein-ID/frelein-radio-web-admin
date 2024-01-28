"use client"

import React from 'react'
import { Button, Label, TextInput } from 'flowbite-react'
import Link from 'next/link'
import { useForm, SubmitHandler } from "react-hook-form"
import { login } from '../_services/AuthServices'
import { Users } from '../_interfaces/Users'
import { useRouter } from 'next/navigation'
import { storeDataToStoage } from '../_utils/auth-utils'
import { Response } from '../_interfaces/Response'
import { NextSeo } from 'next-seo'

const LoginPage = () => {
    const router = useRouter()
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<Users>()
    const onSubmit: SubmitHandler<Users> = async (data) => {
        const response: Response = await login(data)
        console.log({ response })
        const token: string = response?.data?.token
        const userId: string = response?.data?.id
        storeDataToStoage(token, "token")
        storeDataToStoage(userId, "userId")
        router.push("/admin/dashboard")
    }
    return (
        <>
            <NextSeo
                title='Login'
            />
            <section className='relative w-full flex justify-center items-center bg-gray-50 dark:bg-gray-900'>
                <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                    <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                                Sign in to your account
                            </h1>
                            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 md:space-y-6">
                                <div>
                                    <div className="mb-2 block">
                                        <Label htmlFor="email" value="Email" />
                                    </div>
                                    <TextInput defaultValue="" {...register("email")} id="email" type="email" placeholder="john@example.com" required />
                                </div>
                                <div>
                                    <div className="mb-2 block">
                                        <Label htmlFor="password" value="Password" />
                                    </div>
                                    <TextInput defaultValue="" {...register("password")} id="password" type="password" placeholder="********" required />
                                </div>
                                <div className="flex items-center justify-between">
                                    <Link
                                        href="/forgot-password"
                                        className="text-sm font-medium text-primary-600 hover:underline dark:text-gray-50"
                                    >
                                        Forgot password?
                                    </Link>
                                </div>
                                <Button className='w-full' color="blue" type="submit">Submit</Button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default LoginPage