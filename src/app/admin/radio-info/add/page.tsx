"use client"

import { Breadcrumb, Button, Label, TextInput, Textarea } from 'flowbite-react'
import React, { useEffect, useState } from 'react'
import { HiHome } from "react-icons/hi";
import AdminLayout from '../../adminLayout';
import { useRouter } from 'next/navigation';
import { RadioInfo } from '@/app/_interfaces/RadioInfo';
import { SubmitHandler, useForm } from 'react-hook-form';
import { createRadioInfo } from '@/app/_services/RadioInfoServices';
import swal from 'sweetalert';

const RadioInfoAddPage = () => {
    const router = useRouter()
    const [token, setToken] = useState("")
    const loadTokenFromLocalStorage = (): string => {
        const token = localStorage.getItem('token') || "";
        return token
    };
    const {
        register,
        handleSubmit,
        watch,
        setValue,
        formState: { errors },
    } = useForm<RadioInfo>()
    useEffect(() => {
        const token = loadTokenFromLocalStorage()
        setToken(token)
        console.log(token)
    }, [])
    const onSubmit: SubmitHandler<RadioInfo> = async (data) => {
        const response: any = await createRadioInfo(data, token)
        console.log({ response })
        if (response?.status == 200) {
            swal({
                title: "Success!",
                text: "Personality data has been added",
                icon: "success",
            }).then((result) => {
                if (result.isConfirmed) {
                    router.back()
                }
            })
        }
        if (response?.status == 400) {
            console.log(response?.data?.status)
            swal({
                title: "Error",
                text: response?.data?.message,
                icon: "error",
            })
        }
    }
    console.log(watch())
    return (
        <AdminLayout>
            <div className="mb-6">
                <h1>Add New Radio Information</h1>
            </div>
            <div className="mb-6">
                <Breadcrumb aria-label="Breadcrumb">
                    <Breadcrumb.Item href="/admin/dashboard" icon={HiHome}>
                        Dashboard
                    </Breadcrumb.Item>
                    <Breadcrumb.Item>Radio</Breadcrumb.Item>
                    <Breadcrumb.Item href="/admin/radio-info">Information</Breadcrumb.Item>
                    <Breadcrumb.Item>Add new information</Breadcrumb.Item>
                </Breadcrumb>
            </div>
            <div className="mb-6 bg-white dark:bg-gray-700 p-6 rounded-lg">
                <form className="flex flex-col gap-4">
                    <div onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-2 gap-6">
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="name" value="Name" />
                            </div>
                            <TextInput defaultValue="" {...register("name", { required: true })} id="name" type="text" placeholder="Insert name here" required />
                        </div>
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="name_jp" value="Name (In Japanese)" />
                            </div>
                            <TextInput defaultValue="" {...register("name_jp")} id="name_jp" type="text" placeholder="Insert kanji name here" />
                        </div>
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="image" value="Image url" />
                            </div>
                            <TextInput defaultValue="" {...register("image")} id="image" type="text" placeholder="Insert image url here" required />
                        </div>
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="description" value="Description" />
                            </div>
                            <Textarea defaultValue="" {...register("description")} id="description" placeholder="Insert description here" required rows={4} />
                        </div>
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="website" value="Official website" />
                            </div>
                            <TextInput defaultValue="" {...register("website")} id="website" type="text" placeholder="Insert official website here" required />
                        </div>
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="social" value="Social media link" />
                            </div>
                            <TextInput defaultValue="" {...register("social")} id="social" type="text" placeholder="Insert social media link here" required />
                        </div>
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="schedule" value="Schedule" />
                            </div>
                            <TextInput defaultValue="" {...register("schedule")} id="schedule" type="text" placeholder="Insert schedule here" required />
                        </div>
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="start_time" value="Start time" />
                            </div>
                            <TextInput defaultValue="" {...register("start_time")} id="start_time" type="text" placeholder="Insert start time here" required />
                        </div>
                    </div>
                    <Button type="submit">Submit</Button>
                </form>
            </div>
        </AdminLayout>
    )
}

export default RadioInfoAddPage