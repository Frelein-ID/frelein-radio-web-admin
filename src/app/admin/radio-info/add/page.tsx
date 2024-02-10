"use client"

import { Breadcrumb, Button, Label, Spinner, TextInput, Textarea } from 'flowbite-react'
import React, { useEffect, useState } from 'react'
import { HiHome } from "react-icons/hi";
import AdminLayout from '../../adminLayout';
import { useRouter } from 'next/navigation';
import { RadioInfo } from '@/app/_interfaces/RadioInfo';
import { SubmitHandler, useForm } from 'react-hook-form';
import { createRadioInfo } from '@/app/_services/RadioInfoServices';
import swal from 'sweetalert';
import { useLoading } from '@/app/_context/loadingContext';
import { Response } from '@/app/_interfaces/Response';

const RadioInfoAddPage = () => {
    const router = useRouter()
    const { stopLoading, startLoading } = useLoading()
    const [isCompLoading, setIsCompLoading] = useState(false)

    const {
        register,
        handleSubmit,
        watch,
        getValues,
        formState: { errors },
    } = useForm<RadioInfo>()
    const onSubmit: SubmitHandler<RadioInfo> = async (data) => {
        setIsCompLoading(true)
        const response: Response = await createRadioInfo(data)
        if (response?.status === 201) {
            setIsCompLoading(false)
            swal({
                title: "Success!",
                text: "Radio data has been added",
                icon: "success",
            }).then((result) => {
                if (result) {
                    router.push("/admin/radio-info")
                }
            })
        } else {
            setIsCompLoading(false)
            swal({
                title: "Error",
                text: response?.message,
                icon: "error",
            })
        }
    }

    useEffect(() => {
        stopLoading()
        watch()
    }, [stopLoading, watch])

    console.log(watch())

    return (
        <AdminLayout>
            <div className="mb-6">
                <h1>Add New Radio Information</h1>
            </div>
            <div className="mb-6">
                <Breadcrumb aria-label="Radio information breadcrumb">
                    <Breadcrumb.Item href="#" onClick={() => {
                        startLoading()
                        router.push("/admin/dashboard")
                    }} icon={HiHome}>
                        Dashboard
                    </Breadcrumb.Item>
                    <Breadcrumb.Item>Radio</Breadcrumb.Item>
                    <Breadcrumb.Item href="#" onClick={() => {
                        startLoading()
                        router.push("/admin/radio-info")
                    }}>Information</Breadcrumb.Item>
                    <Breadcrumb.Item>Add</Breadcrumb.Item>
                </Breadcrumb>
            </div>
            <div className="mb-6 bg-white dark:bg-gray-700 p-6 rounded-lg">
                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
                    <div className="grid grid-cols-2 gap-6">
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="name" value="Name" />
                            </div>
                            <TextInput
                                defaultValue=""
                                {...register("name", {
                                    required: true,
                                })}
                                id="name"
                                type="text"
                                placeholder="Insert name here"
                                color={
                                    getValues("name") == "" ? "failure"
                                        : (getValues("name") ? getValues("name")?.length : 0) < 3 ? "failure"
                                            : "success"
                                }
                                helperText={
                                    getValues("name") == "" ? (
                                        <>
                                            <span className="font-medium">Name</span> cannot be empty.
                                        </>
                                    ) : (getValues("name") ? getValues("name")?.length : 0) < 3 ? (
                                        <>
                                            <span className="font-medium">Name</span> must be 3 character or more.
                                        </>
                                    ) : (
                                        <>
                                            <span className="font-medium">Alright</span> this is good.
                                        </>
                                    )
                                } />
                        </div>
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="name_jp" value="Name (In Japanese)" />
                            </div>
                            <TextInput
                                defaultValue=""
                                {...register("name_jp")}
                                id="name_jp"
                                type="text"
                                placeholder="Insert name in Japanese here"
                                color={"success"}
                                helperText={
                                    getValues("name_jp") == "" ? (
                                        <>
                                            <span className="font-medium">It&apos;s fine</span>, this field can be empty. But it will better if you fill this field.
                                        </>
                                    ) : (getValues("name_jp") ? getValues("name_jp")?.length : 0) < 3 ? (
                                        <>
                                            <span className="font-medium">It&apos;s fine</span>, but it will better if you give information with 3 character or more character.
                                        </>
                                    ) : (
                                        <>
                                            <span className="font-medium">Alright</span> this is good.
                                        </>
                                    )
                                }
                            />
                        </div>
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="image" value="Image url" />
                            </div>
                            <TextInput
                                defaultValue=""
                                {...register("image")}
                                id="image"
                                type="text"
                                placeholder="Insert image url here"
                                color={"success"}
                                helperText={
                                    getValues("image") == "" ? (
                                        <>
                                            <span className="font-medium">It&apos;s fine</span>, this field can be empty. But it will better if you fill this field.
                                        </>
                                    ) : (getValues("image") ? getValues("image")?.length : 0) < 3 ? (
                                        <>
                                            <span className="font-medium">It&apos;s fine</span>, but it will better if you give information with 3 character or more character.
                                        </>
                                    ) : (
                                        <>
                                            <span className="font-medium">Alright</span> this is good.
                                        </>
                                    )
                                }
                            />
                        </div>
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="description" value="Description" />
                            </div>
                            <Textarea
                                defaultValue=""
                                {...register("description")}
                                id="description"
                                placeholder="Insert description here"
                                rows={4}
                                color={"success"}
                                helperText={
                                    getValues("description") == "" ? (
                                        <>
                                            <span className="font-medium">It&apos;s fine</span>, this field can be empty. But it will better if you fill this field.
                                        </>
                                    ) : (getValues("description") ? getValues("description")?.length : 0) < 3 ? (
                                        <>
                                            <span className="font-medium">It&apos;s fine</span>, but it will better if you give information with 3 character or more character.
                                        </>
                                    ) : (
                                        <>
                                            <span className="font-medium">Alright</span> this is good.
                                        </>
                                    )
                                }
                            />
                        </div>
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="website" value="Official website" />
                            </div>
                            <TextInput
                                defaultValue=""
                                {...register("website")}
                                id="website"
                                type="text"
                                placeholder="Insert official website here"
                                color={"success"}
                                helperText={
                                    getValues("website") == "" ? (
                                        <>
                                            <span className="font-medium">It&apos;s fine</span>, this field can be empty. But it will better if you fill this field.
                                        </>
                                    ) : (getValues("website") ? getValues("website")?.length : 0) < 3 ? (
                                        <>
                                            <span className="font-medium">It&apos;s fine</span>, but it will better if you give information with 3 character or more character.
                                        </>
                                    ) : (
                                        <>
                                            <span className="font-medium">Alright</span> this is good.
                                        </>
                                    )
                                }
                            />
                        </div>
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="social" value="Social media link" />
                            </div>
                            <TextInput
                                defaultValue=""
                                {...register("social")}
                                id="social"
                                type="text"
                                placeholder="Insert social media link here"
                                color={"success"}
                                helperText={
                                    getValues("social") == "" ? (
                                        <>
                                            <span className="font-medium">It&apos;s fine</span>, this field can be empty. But it will better if you fill this field.
                                        </>
                                    ) : (getValues("social") ? getValues("social")?.length : 0) < 3 ? (
                                        <>
                                            <span className="font-medium">It&apos;s fine</span>, but it will better if you give information with 3 character or more character.
                                        </>
                                    ) : (
                                        <>
                                            <span className="font-medium">Alright</span> this is good.
                                        </>
                                    )
                                }
                            />
                        </div>
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="schedule" value="Schedule" />
                            </div>
                            <TextInput
                                defaultValue=""
                                {...register("schedule")}
                                id="schedule"
                                type="text"
                                placeholder="Insert schedule here"
                                color={"success"}
                                helperText={
                                    getValues("schedule") == "" ? (
                                        <>
                                            <span className="font-medium">It&apos;s fine</span>, this field can be empty. But it will better if you fill this field.
                                        </>
                                    ) : (getValues("schedule") ? getValues("schedule")?.length : 0) < 3 ? (
                                        <>
                                            <span className="font-medium">It&apos;s fine</span>, but it will better if you give information with 3 character or more character.
                                        </>
                                    ) : (
                                        <>
                                            <span className="font-medium">Alright</span> this is good.
                                        </>
                                    )
                                }
                            />
                        </div>
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="start_time" value="Start time" />
                            </div>
                            <TextInput
                                defaultValue=""
                                {...register("start_time")}
                                id="start_time"
                                type="text"
                                placeholder="Insert start time here"
                                color={"success"}
                                helperText={
                                    getValues("start_time") == "" ? (
                                        <>
                                            <span className="font-medium">It&apos;s fine</span>, this field can be empty. But it will better if you fill this field.
                                        </>
                                    ) : (getValues("start_time") ? getValues("start_time")?.length : 0) < 3 ? (
                                        <>
                                            <span className="font-medium">It&apos;s fine</span>, but it will better if you give information with 3 character or more character.
                                        </>
                                    ) : (
                                        <>
                                            <span className="font-medium">Alright</span> this is good.
                                        </>
                                    )
                                }
                            />
                        </div>
                    </div>
                    <Button type="submit" disabled={isCompLoading ? true : false}>{isCompLoading ? (
                        <>
                            <Spinner aria-label="Spinner loading" size="sm" />
                            <span className="pl-3">Loading...</span>
                        </>
                    ) : "Submit"}</Button>
                </form>
            </div>
        </AdminLayout>
    )
}

export default RadioInfoAddPage