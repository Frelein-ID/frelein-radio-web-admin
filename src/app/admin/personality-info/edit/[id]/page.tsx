'use client'

import { Breadcrumb, Button, Label, TextInput, Textarea, Datepicker, Select, Spinner } from 'flowbite-react'
import React, { useEffect, useState } from 'react'
import { HiHome } from "react-icons/hi";
import { useForm, SubmitHandler } from 'react-hook-form';
import { PersonalityInfo } from '@/app/_interfaces/PersonalityInfo';
import { createPersonalityInfo, getPersonalityInfoByID, updatePersonalityInfo } from '@/app/_services/PersonalityServices';
import AdminLayout from '../../../adminLayout';
import swal from 'sweetalert';
import { useRouter } from 'next/navigation';
import { Response } from '@/app/_interfaces/Response';
import moment from 'moment';
import { loadDataFromStorage } from '@/app/_utils/auth-utils';
import Skeleton from 'react-loading-skeleton';

const PersonalityInfoEditPage = ({ params }: { params: { id: string } }) => {
    const router = useRouter()
    const [token, setToken] = useState("")
    const [personalityInfo, setPersonalityInfo] = useState<PersonalityInfo | null>(null)
    const [isLoading, setIsLoading] = useState(true)
    const [isCompLoading, setIsCompLoading] = useState(false)

    const {
        register,
        handleSubmit,
        watch,
        setValue,
        getValues,
        formState: { errors },
    } = useForm<PersonalityInfo>()
    register('birthdate', { required: true });

    useEffect(() => {
        const token = loadDataFromStorage("token")
        setToken(token)
        setIsCompLoading(false)
        if (token) {
            const fetchData = async () => {
                try {
                    const data = await getPersonalityInfoByID(params.id, token)
                    setPersonalityInfo(data.data)
                    setIsLoading(false)
                } catch (error) {
                    throw error
                }
            }
            fetchData()
        }
    }, [params.id])

    useEffect(() => {
        if (personalityInfo !== null) {
            setValue("name", personalityInfo?.name)
            setValue("name_jp", personalityInfo?.name_jp)
            setValue("nickname", personalityInfo?.nickname)
            setValue("birthdate", moment().format(personalityInfo?.birthdate))
            setValue("birthplace", personalityInfo?.birthplace)
            setValue("bloodtype", personalityInfo?.bloodtype)
            setValue("description", personalityInfo?.description)
            setValue("image", personalityInfo?.image)
            setValue("source", personalityInfo?.source)
        }
    }, [personalityInfo, setValue])

    const onSubmit: SubmitHandler<PersonalityInfo> = async (data) => {
        setIsCompLoading(true)
        const response: Response = await updatePersonalityInfo(params.id, data, token)
        console.log({ response })
        if (response?.status == 200) {
            setIsCompLoading(false)
            swal({
                title: "Success!",
                text: "Personality data has been updated",
                icon: "success",
            }).then((result) => {
                if (result) {
                    router.back()
                }
            })
        } else {
            console.log(response?.status)
            swal({
                title: "Error",
                text: response?.message,
                icon: "error",
            })
        }
    }
    console.log(watch())

    return (
        <AdminLayout>
            <div className="mb-6">
                <h1>Edit Personality Information</h1>
            </div>
            <div className="mb-6">
                <Breadcrumb aria-label="Default breadcrumb example">
                    <Breadcrumb.Item href="/admin/dashboard" icon={HiHome}>
                        Dashboard
                    </Breadcrumb.Item>
                    <Breadcrumb.Item>Personality</Breadcrumb.Item>
                    <Breadcrumb.Item href="/admin/personality-info">Information</Breadcrumb.Item>
                    <Breadcrumb.Item>Edit information</Breadcrumb.Item>
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
                                    pattern: /([A-Za-z]+( [A-Za-z]+)+)/,
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

export default PersonalityInfoEditPage