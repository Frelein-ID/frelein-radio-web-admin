"use client"

import { Breadcrumb, Button, Label, TextInput, Textarea, Datepicker, Select, Spinner } from 'flowbite-react'
import React, { useEffect, useState } from 'react'
import { HiHome } from "react-icons/hi";
import { useForm, SubmitHandler } from 'react-hook-form';
import { PersonalityInfo } from '@/app/_interfaces/PersonalityInfo';
import { createPersonalityInfo } from '@/app/_services/PersonalityServices';
import AdminLayout from '../../adminLayout';
import swal from 'sweetalert';
import { useRouter } from 'next/navigation';
import { Response } from '@/app/_interfaces/Response';
import { useLoading } from '@/app/_context/loadingContext';

const PersonalityInfoAddPage = () => {
    const router = useRouter()
    const { stopLoading, startLoading } = useLoading()
    const [isCompLoading, setIsCompLoading] = useState(false)

    const {
        register,
        handleSubmit,
        watch,
        setValue,
        getValues,
        formState: { errors },
    } = useForm<PersonalityInfo>({
        defaultValues: {
            name: "",
            name_jp: "",
            nickname: "",
            birthdate: "",
            birthplace: "",
            bloodtype: "A",
            image: "",
            source: "",
            description: ""
        }
    })
    register('birthdate', { required: true });

    useEffect(() => {
        watch()
        stopLoading()
    }, [stopLoading, watch])

    const onSubmit: SubmitHandler<PersonalityInfo> = async (data) => {
        setIsCompLoading(true)
        const response: Response = await createPersonalityInfo(data)
        if (response?.status === 201) {
            setIsCompLoading(false)
            swal({
                title: "Success!",
                text: "Personality data has been added",
                icon: "success",
            }).then((result) => {
                if (result) {
                    router.push("/admin/personality-info")
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

    return (
        <AdminLayout>
            <div className="mb-6">
                <h1>Add New Personality Information</h1>
            </div>
            <div className="mb-6">
                <Breadcrumb aria-label="Personality information breadcrumb">
                    <Breadcrumb.Item href="#" onClick={() => {
                        startLoading()
                        router.push("/admin/dashboard")
                    }} icon={HiHome}>
                        Dashboard
                    </Breadcrumb.Item>
                    <Breadcrumb.Item>Personality</Breadcrumb.Item>
                    <Breadcrumb.Item href="#" onClick={() => {
                        startLoading()
                        router.push("/admin/personality-info")
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
                                {...register("name", {
                                    required: true,
                                    minLength: 3,
                                    maxLength: 255,
                                })}
                                defaultValue=""
                                id="name"
                                type="text"
                                placeholder="Insert name here"
                                required
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
                                <Label htmlFor="name_jp" value="Name (Kanji)" />
                            </div>
                            <TextInput
                                {...register("name_jp", { required: false })}
                                defaultValue=""
                                id="name_jp"
                                type="text"
                                placeholder="Insert the Japanese name here"
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
                                <Label htmlFor="nickname" value="Nickname" />
                            </div>
                            <TextInput
                                {...register("nickname", { required: false, })}
                                defaultValue=""
                                id="nickname"
                                type="text"
                                placeholder="Insert nickname here"
                                color={"success"}
                                helperText={
                                    getValues("nickname") == "" ? (
                                        <>
                                            <span className="font-medium">It&apos;s fine</span>, this field can be empty. But it will better if you fill this field.
                                        </>
                                    ) : (getValues("nickname") ? getValues("nickname")?.length : 0) < 3 ? (
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
                                <Label htmlFor="birthdate" value="Birthdate" />
                            </div>
                            <Datepicker
                                id="birthdate"
                                type='text'
                                placeholder='Insert birthdate here'
                                onSelectedDateChanged={
                                    (e) => {
                                        const year = e.getFullYear()
                                        const month = (e.getMonth() + 1).toString().padStart(2, '0');
                                        const day = e.getDate().toString().padStart(2, '0');
                                        setValue('birthdate', `${year}-${month}-${day}`)
                                    }
                                }
                                color={
                                    getValues("birthdate") == "" ? "failure" : "success"
                                }
                                helperText={
                                    getValues("birthdate") == "" ? (
                                        <>
                                            Please set <span className="font-medium">Birthdate</span> properly.
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
                                <Label htmlFor="birthplace" value="Birthplace" />
                            </div>
                            <TextInput
                                {...register("birthplace", { required: false })}
                                defaultValue=""
                                id="birthplace"
                                type="text"
                                placeholder="Insert birthplace here"
                                color={"success"}
                                helperText={
                                    getValues("birthplace") == "" ? (
                                        <>
                                            <span className="font-medium">It&apos;s fine</span>, this field can be empty. But it will better if you fill this field.
                                        </>
                                    ) : (getValues("birthplace") ? getValues("birthplace")?.length : 0) < 3 ? (
                                        <>
                                            <span className="font-medium">It&apos;s fine</span>, but it will better if you give information with 3 character or more character.
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
                                <Label htmlFor="bloodtype" value="Bloodtype" />
                            </div>
                            <Select
                                {...register("bloodtype", { required: false })}
                                id="bloodtype"
                                color={
                                    getValues("bloodtype") === "A" || "B" || "O" || "AB" ? "success" : "failure"
                                }
                                helperText={
                                    getValues("bloodtype") === "A" || "B" || "O" || "AB" ? (
                                        <>
                                            <span className="font-medium">Alright</span> this is good.
                                        </>
                                    ) : (
                                        <>
                                            Please set <span className="font-medium">Bloodtype</span> properly.
                                        </>
                                    )
                                }
                            >
                                <option>A</option>
                                <option>B</option>
                                <option>AB</option>
                                <option>O</option>
                            </Select>
                        </div>
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="image" value="Image url" />
                            </div>
                            <TextInput
                                {...register("image", { required: false })}
                                defaultValue=""
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
                                } />
                        </div>
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="description" value="Description" />
                            </div>
                            <Textarea
                                defaultValue=""
                                {...register("description", { required: false })}
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
                                } />
                        </div>
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="source" value="Source" />
                            </div>
                            <TextInput
                                defaultValue=""
                                {...register("source", { required: false })}
                                id="source"
                                type="text"
                                placeholder="Insert source here"
                                color={"success"}
                                helperText={
                                    getValues("source") == "" ? (
                                        <>
                                            <span className="font-medium">It&apos;s fine</span>, this field can be empty. But it will better if you fill this field.
                                        </>
                                    ) : (getValues("source") ? getValues("source")?.length : 0) < 3 ? (
                                        <>
                                            <span className="font-medium">It&apos;s fine</span>, but it will better if you give information with 3 character or more character.
                                        </>
                                    ) : (
                                        <>
                                            <span className="font-medium">Alright</span> this is good.
                                        </>
                                    )
                                } />
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

export default PersonalityInfoAddPage