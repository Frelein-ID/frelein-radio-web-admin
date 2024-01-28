'use client'

import { Breadcrumb, Button, Label, TextInput, Textarea, Datepicker, Select } from 'flowbite-react'
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

const PersonalityInfoEditPage = ({ params }: { params: { id: string } }) => {
    const router = useRouter()
    const [token, setToken] = useState("")
    const [personalityInfo, setPersonalityInfo] = useState<PersonalityInfo | null>(null)

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
    } = useForm<PersonalityInfo>()
    register('birthdate', { required: true });

    useEffect(() => {
        const token = loadTokenFromLocalStorage()
        setToken(token)
        if (token) {
            const fetchData = async () => {
                try {
                    const data = await getPersonalityInfoByID(params.id, token)
                    setPersonalityInfo(data.data)
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
        const response: Response = await updatePersonalityInfo(params.id, data, token)
        console.log({ response })
        if (response?.status == 200) {
            swal({
                title: "Success!",
                text: "Personality data has been updated",
                icon: "success",
            }).then((result) => {
                if (result) {
                    router.back()
                }
            })
        }
        if (response?.status == 400) {
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
                            <TextInput {...register("name", { required: true })} id="name" type="text" placeholder="Insert name here" required />
                        </div>
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="name_jp" value="Name (Kanji)" />
                            </div>
                            <TextInput {...register("name_jp", { required: true })} id="name_jp" type="text" placeholder="Insert kanji name here" required />
                        </div>
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="nickname" value="Nickname" />
                            </div>
                            <TextInput {...register("nickname", { required: true })} id="nickname" type="text" placeholder="Insert nickname here" required />
                        </div>
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="birthdate" value="Birthdate" />
                            </div>
                            <Datepicker id="birthdate" defaultDate={moment(personalityInfo?.birthdate).toDate()} placeholder='Insert birthdate here' onSelectedDateChanged={
                                (e) => {
                                    const year = e.getFullYear()
                                    const month = (e.getMonth() + 1).toString().padStart(2, '0');
                                    const day = e.getDate().toString().padStart(2, '0');
                                    setValue('birthdate', `${year}-${month}-${day}`)
                                }
                            } />
                        </div>
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="birthplace" value="Birthplace" />
                            </div>
                            <TextInput  {...register("birthplace", { required: true })} id="birthplace" type="text" placeholder="Insert birthplace here" required />
                        </div>
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="bloodtype" value="Bloodtype" />
                            </div>
                            <Select {...register("bloodtype", { required: true })} id="bloodtype" required>
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
                            <TextInput  {...register("image", { required: true })} id="image" type="text" placeholder="Insert image url here" required />
                        </div>
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="description" value="Description" />
                            </div>
                            <Textarea  {...register("description", { required: true })} id="description" placeholder="Insert description here" rows={4} />
                        </div>
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="source" value="Source" />
                            </div>
                            <TextInput  {...register("source", { required: true })} id="source" type="text" placeholder="Insert source here" required />
                        </div>
                    </div>
                    <Button type="submit">Submit</Button>
                </form>
            </div>
        </AdminLayout>
    )
}

export default PersonalityInfoEditPage