"use client"

import { Breadcrumb, Button, Datepicker, Label, Select, Spinner, TextInput, Tooltip } from 'flowbite-react'
import React, { useEffect, useState } from 'react'
import { HiHome, HiOutlineX } from "react-icons/hi";
import AdminLayout from '../../../adminLayout';
import { useRouter } from 'next/navigation';
import { RadioTracks } from '@/app/_interfaces/RadioTracks';
import { SubmitHandler, useForm } from 'react-hook-form';
import { getRadioTracksByID, updateRadioTracks } from '@/app/_services/RadioTracksServices';
import swal from 'sweetalert';
import { useLoading } from '@/app/_context/loadingContext';
import { Response } from '@/app/_interfaces/Response';
import { RadioInfo } from '@/app/_interfaces/RadioInfo';
import { getAllRadioInfo } from '@/app/_services/RadioInfoServices';
import moment from 'moment';
import { PersonalityInfo } from '@/app/_interfaces/PersonalityInfo';
import { assignPersonalitiesToRadioTrack, deletePersonalitiesFromRadioTrack, updatePersonalitiesFromRadioTracks } from '@/app/_services/PersonalitiesServices';
import { Personalities } from '@/app/_interfaces/Personalities';
import { getAllPersonalityInfo } from '@/app/_services/PersonalityServices';

const RadioTracksEditPage = ({ params }: { params: { id: string } }) => {
    const router = useRouter()
    const { stopLoading, startLoading } = useLoading()
    const [isCompLoading, setIsCompLoading] = useState(false)
    const [radioInfo, setRadioInfo] = useState<RadioInfo[]>([])
    const [radioTracks, setRadioTracks] = useState<RadioTracks | null>(null)
    const [personalityInfo, setPersonalityInfo] = useState<PersonalityInfo[]>([])
    const [personalities, setPersonalities] = useState<Personalities[]>([])

    const {
        register,
        unregister,
        handleSubmit,
        watch,
        setValue,
        getValues,
        formState: { errors },
    } = useForm<RadioTracks>()
    register('radio_oa');

    useEffect(() => {
        if (radioTracks !== null) {
            setValue("radio_info", radioTracks?.radio_info)
            setValue("episode", radioTracks?.episode)
            setValue("radio_oa", moment().format(radioTracks?.radio_oa))
            setValue("image", radioTracks?.track_image || "")
            setValue("src", radioTracks?.src)
            radioTracks.personalities?.forEach((person: Personalities, index: number) => {
                setPersonalities([...personalities, person])
                register(`personalities.${index}.personality_id`)
                setValue(`personalities.${index}.personality_id`, person.personality_id)
            })
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [radioTracks])

    useEffect(() => {
        console.log({ personalities })
    }, [personalities])

    const onSubmit: SubmitHandler<RadioTracks> = async (data) => {
        setIsCompLoading(true)
        const radioTracksData: RadioTracks = {
            radio_info: data.radio_info,
            episode: data.episode,
            radio_oa: data.radio_oa,
            image: data.image,
            src: data.src,
        }
        const response: Response = await updateRadioTracks(params.id, radioTracksData)
        // Delete current personalities first
        if (radioTracks?.personalities?.length! > 0) {
            radioTracks?.personalities?.forEach(async (value: Personalities, index: number) => {
                if (radioTracks?.personalities?.[index]?.id !== null || undefined || "") {
                    await deletePersonalitiesFromRadioTrack(value.id!)
                }
            })
        }
        // Reassign the new one
        data.personalities?.forEach(async (person: Personalities) => {
            const personalitiesData: any = {
                tracks_id: params.id!,
                personality_id: person.personality_id!
            }
            await assignPersonalitiesToRadioTrack(personalitiesData)
        })

        if (response?.status === 200) {
            setIsCompLoading(false)
            swal({
                title: "Success!",
                text: "Radio track data has been updated",
                icon: "success",
            }).then((result) => {
                if (result) {
                    router.push("/admin/radio-tracks")
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

    const handleAddPersonalities = () => {
        const defaultPersonalities: Personalities = {
            tracks_id: params.id,
            personality_id: personalityInfo[0].id
        }
        setPersonalities([...personalities, defaultPersonalities])
    }

    const handleRemovePersonalities = (index: number) => {
        const newPersonalities = [...personalities];
        newPersonalities.splice(index, 1);
        setPersonalities(newPersonalities);
        unregister([`personalities.${index}.personality_id`])
    }

    useEffect(() => {
        const fetch = async () => {
            try {
                await getRadioTracksByID(params.id).then((value: Response) => {
                    setRadioTracks(value.data)
                })
                await getAllRadioInfo().then((value: Response) => {
                    setRadioInfo(value.data)
                })
                await getAllPersonalityInfo().then((value: Response) => {
                    setPersonalityInfo(value.data)
                })
                stopLoading()
            } catch (error) {
                throw error
            }
        }

        fetch()
        watch()
    }, [params.id, stopLoading, watch])

    console.log(watch())

    return (
        <AdminLayout>
            <div className="mb-6">
                <h1>Edit Radio Tracks</h1>
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
                    <Breadcrumb.Item>Edit</Breadcrumb.Item>
                </Breadcrumb>
            </div>
            <div className="mb-6 bg-white dark:bg-gray-700 p-6 rounded-lg">
                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
                    <h3>Radio Tracks Information</h3>
                    <div className="grid grid-cols-2 gap-6">
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
                        {personalities.map((value: Personalities, index: number) => {
                            <div className="mb-2 block">
                                <Label htmlFor="personalities" value="Assign personalities" />
                            </div>
                            return (
                                <div key={index} className="flex items-start justify-start gap-4">
                                    <Select
                                        {...register(`personalities.${index}.personality_id`, { required: false })}
                                        id="personalities"
                                        color={
                                            getValues(`personalities.${index}.personality_id`) ? "success" : "failure"
                                        }
                                        helperText={
                                            getValues(`personalities.${index}.personality_id`) ? (
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
                                        {personalityInfo?.map((info, idx) => {
                                            return (
                                                <option key={idx} value={info.id}>{`${info.name} 「${info.name_jp}」`}</option>
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
                        <Button onClick={() => handleAddPersonalities()} className='relative w-full rounded-lg overflow-hidden flex justify-center items-center border disabled:cursor-not-allowed disabled:opacity-50 border-dashed' color="light">Add more personalities</Button>
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

export default RadioTracksEditPage