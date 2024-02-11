"use client"

import { Breadcrumb, Button, Datepicker, Label, Select, Spinner, TextInput, Tooltip } from 'flowbite-react'
import React, { useEffect, useState } from 'react'
import { HiHome, HiOutlineX } from "react-icons/hi";
import AdminLayout from '../../adminLayout';
import { useRouter } from 'next/navigation';
import { RadioTracks } from '@/app/_interfaces/RadioTracks';
import { SubmitHandler, useForm } from 'react-hook-form';
import { createRadioTracks } from '@/app/_services/RadioTracksServices';
import swal from 'sweetalert';
import { useLoading } from '@/app/_context/loadingContext';
import { Response } from '@/app/_interfaces/Response';
import { RadioInfo } from '@/app/_interfaces/RadioInfo';
import { getAllRadioInfo } from '@/app/_services/RadioInfoServices';
import { PersonalityInfo } from '@/app/_interfaces/PersonalityInfo';
import { getAllPersonalityInfo } from '@/app/_services/PersonalityServices';
import { Personalities } from '@/app/_interfaces/Personalities';
import { assignPersonalitiesToRadioTrack } from '@/app/_services/PersonalitiesServices';

const RadioTracksAddPage = () => {
    const router = useRouter()
    const { stopLoading, startLoading } = useLoading()
    const [isCompLoading, setIsCompLoading] = useState(false)
    const [radioInfo, setRadioInfo] = useState<RadioInfo[]>([])
    const [personalitiyInfo, setPersonalityInfo] = useState<PersonalityInfo[]>([])
    const [personalities, setPersonalities] = useState([''])

    const {
        register,
        handleSubmit,
        watch,
        setValue,
        getValues,
        formState: { errors },
    } = useForm<RadioTracks>()
    register('radio_oa');

    const onSubmit: SubmitHandler<RadioTracks> = async (data) => {
        setIsCompLoading(true)
        const radioTracksData: RadioTracks = {
            radio_info: data.radio_info,
            episode: data.episode,
            radio_oa: data.radio_oa,
            image: data.image,
            src: data.src,
        }
        await createRadioTracks(radioTracksData).then((value: Response) => {
            data.personalities?.forEach(async (person: PersonalityInfo) => {
                const personalitiesData: Personalities = {
                    tracks_id: value.data.id,
                    personality_id: person.id
                }
                await assignPersonalitiesToRadioTrack(personalitiesData)
            })
        }).finally(() => {
            setIsCompLoading(false)
            swal({
                title: "Success!",
                text: "Radio data has been added",
                icon: "success",
            }).then((result) => {
                if (result) {
                    router.push("/admin/radio-tracks")
                }
            })
        })
    }

    const handleAddPersonalities = () => {
        setPersonalities([...personalities, ''])
    }

    const handleRemovePersonalities = (index: number) => {
        const newPersonalities = [...personalities];
        newPersonalities.splice(index, 1);
        setPersonalities(newPersonalities);
    }

    useEffect(() => {
        const fetch = async () => {
            try {
                await getAllRadioInfo().then((value: Response) => {
                    setRadioInfo(value.data)
                    setValue("radio_info", value.data.radio_info)
                })
                await getAllPersonalityInfo().then((value: Response) => {
                    setPersonalityInfo(value.data)
                })
            } catch (error) {
                throw error
            }
        }
        fetch()
        watch()
    }, [setValue, stopLoading, watch])

    console.log(watch())

    return (
        <AdminLayout>
            <div className="mb-6">
                <h1>Add New Radio Tracks</h1>
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
                        router.push("/admin/radio-tracks")
                    }}>Tracks</Breadcrumb.Item>
                    <Breadcrumb.Item>Add</Breadcrumb.Item>
                </Breadcrumb>
            </div>
            <div className="mb-6 bg-white dark:bg-gray-700 p-6 rounded-lg">
                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
                    <h3>Radio Tracks Information</h3>
                    <div className="grid grid-cols-2 gap-6 mb-6">
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="radio_info" value="Radio" />
                            </div>
                            <Select
                                {...register("radio_info", { required: false })}
                                id="radio_info"
                                color={
                                    getValues("radio_info") !== null || "" ? "success" : "failure"
                                }
                                helperText={
                                    getValues("radio_info") !== null || "" ? (
                                        <>
                                            <span className="font-medium">Alright</span> this is good.
                                        </>
                                    ) : (
                                        <>
                                            Please set <span className="font-medium">Radio information</span> properly.
                                        </>
                                    )
                                }
                            >
                                {radioInfo?.map((info, index) => {
                                    return (
                                        <option key={index} value={info.id}>{`${info.name} 「${info.name_jp}」`}</option>
                                    )
                                })}
                            </Select>
                        </div>
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="episode" value="Episode" />
                            </div>
                            <TextInput
                                defaultValue=""
                                {...register("episode", {
                                    min: 1,
                                    max: 9999,
                                    valueAsNumber: true
                                })}
                                id="episode"
                                type="number"
                                placeholder="Insert episode here"
                                color={
                                    getValues("episode") == 0 ? "failure" : "success"
                                }
                                helperText={
                                    getValues("episode") == 0 ? (
                                        <>
                                            <span className="font-medium">Episode</span> cannot be empty.
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
                                <Label htmlFor="radio_oa" value="On Air Date" />
                            </div>
                            <Datepicker
                                id="radio_oa"
                                type='text'
                                placeholder='Insert radio on air date here'
                                onSelectedDateChanged={
                                    (e) => {
                                        const year = e.getFullYear()
                                        const month = (e.getMonth() + 1).toString().padStart(2, '0');
                                        const day = e.getDate().toString().padStart(2, '0');
                                        setValue('radio_oa', `${year}-${month}-${day}`)
                                    }
                                }
                                color={
                                    getValues("radio_oa") == undefined || "" ? "failure" : "success"
                                }
                                helperText={
                                    getValues("radio_oa") == undefined || "" ? (
                                        <>
                                            Please set <span className="font-medium">Radio on air date</span> properly.
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
                                <Label htmlFor="src" value="Audio source" />
                            </div>
                            <TextInput
                                defaultValue=""
                                {...register("src")}
                                id="src"
                                type="text"
                                placeholder="Insert audio source here"
                                color={"success"}
                                helperText={
                                    getValues("src") == "" ? (
                                        <>
                                            <span className="font-medium">It&apos;s fine</span>, this field can be empty. But it will better if you fill this field.
                                        </>
                                    ) : (getValues("src") ? getValues("src")?.length : 0) < 3 ? (
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
                    <h3>Radio Tracks Personalities</h3>
                    <div className="grid grid-cols-2 gap-6 mb-6">
                        {personalities.map((id: string, index: number) => {

                            <div className="mb-2 block">
                                <Label htmlFor="personalities" value="Assign personalities" />
                            </div>
                            return (
                                <div key={index} className="flex items-start justify-start gap-4">
                                    <Select
                                        {...register(`personalities.${index}.id`, { required: false })}
                                        id="personalities"
                                        color={
                                            getValues(`personalities.${index}.id`) ? "success" : "failure"
                                        }
                                        helperText={
                                            getValues(`personalities.${index}.id`) ? (
                                                <>
                                                    <span className="font-medium">Alright</span> this is good.
                                                </>
                                            ) : (
                                                <>
                                                    Please set <span className="font-medium">Radio information</span> properly.
                                                </>
                                            )
                                        }
                                    >
                                        {personalitiyInfo?.map((info, index) => {
                                            return (
                                                <option key={index} value={info.id}>{`${info.name} 「${info.name_jp}」`}</option>
                                            )
                                        })}
                                    </Select>
                                    <Tooltip content="Remove personalities">
                                        <Button onClick={() => handleRemovePersonalities(index)}>
                                            <HiOutlineX className="relative h-5 w-5" />
                                        </Button>
                                    </Tooltip>
                                </div>
                            )
                        })}
                        <Button onClick={handleAddPersonalities} className='relative w-full rounded-lg overflow-hidden flex justify-center items-center border disabled:cursor-not-allowed disabled:opacity-50 border-dashed' color="light">Add more personalities</Button>
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

export default RadioTracksAddPage