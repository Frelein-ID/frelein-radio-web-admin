'use client'

import { Breadcrumb, Button, Label, TextInput, Textarea, Datepicker, Select } from 'flowbite-react'
import React, { useState } from 'react'
import { HiHome } from "react-icons/hi";
import { useForm, SubmitHandler } from 'react-hook-form';

enum Bloodtype {
    A = "A",
    B = "B",
    AB = "AB",
    O = "O"
}

type Inputs = {
    name: string,
    name_jp: string,
    nickname: string,
    birthdate: string | undefined,
    birthplace: string,
    bloodtype: Bloodtype,
    description: string,
    image: string,
    source: string
}

const PersonalityInfoAddPage = () => {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<Inputs>()
    const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data)
    const [name, setName] = useState<string>("")
    const [name_jp, setNameKanji] = useState<string>("")
    const [nickname, setNickname] = useState<string>("")
    const [birthdate, setBirthdate] = useState<string>()
    const [birthplace, setBirthplace] = useState<string>("")
    const [bloodtype, setBloodtype] = useState<Bloodtype>(Bloodtype.A)
    const [description, setDescription] = useState<string>("")
    const [image, setImage] = useState<string>("")
    const [source, setSource] = useState<string>("")
    console.log(watch("name"))
    console.log(watch("name_jp"))
    console.log(watch("nickname"))
    console.log(watch("birthplace"))
    console.log(watch("bloodtype"))
    console.log(watch("description"))
    console.log(watch("image"))
    console.log(watch("source"))
    return (
        <>
            <div className="mb-6">
                <h1>Add New Personality Information</h1>
                <Breadcrumb aria-label="Default breadcrumb example">
                    <Breadcrumb.Item href="/dashboard" icon={HiHome}>
                        Dashboard
                    </Breadcrumb.Item>
                    <Breadcrumb.Item>Personality</Breadcrumb.Item>
                    <Breadcrumb.Item href="/personality-info">Information</Breadcrumb.Item>
                    <Breadcrumb.Item>Add new information</Breadcrumb.Item>
                </Breadcrumb>
            </div>
            <div className="mb-6 bg-white dark:bg-gray-700 p-6 rounded-lg">
                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
                    <div className="grid grid-cols-2 gap-6">
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="name" value="Name" />
                            </div>
                            <TextInput {...register("name", { required: true })} id="name" type="text" defaultValue={name} placeholder="Insert name here" required />
                        </div>
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="name_jp" value="Name (Kanji)" />
                            </div>
                            <TextInput {...register("name_jp", { required: true })} id="name_jp" type="text" value={name_jp} onChange={(e) => setNameKanji(e.target.value)} placeholder="Insert kanji name here" required />
                        </div>
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="nickname" value="Nickname" />
                            </div>
                            <TextInput {...register("nickname", { required: true })} id="nickname" type="text" value={nickname} onChange={(e) => setNickname(e.target.value)} placeholder="Insert nickname here" required />
                        </div>
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="birthdate" value="Birthdate" />
                            </div>
                            <Datepicker {...register("birthdate", { required: true })} id="birthdate" type='text' value={birthdate} placeholder='Insert birthdate here' onSelectedDateChanged={
                                (e) => {
                                    const year = e.getFullYear()
                                    const month = (e.getMonth() + 1).toString().padStart(2, '0');
                                    const day = e.getDate().toString().padStart(2, '0');
                                    setBirthdate(`${year}-${month}-${day}`)
                                }
                            } />
                        </div>
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="birthplace" value="Birthplace" />
                            </div>
                            <TextInput {...register("birthplace", { required: true })} id="birthplace" type="text" value={birthplace} onChange={(e) => setBirthplace(e.target.value)} placeholder="Insert birthplace here" required />
                        </div>
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="bloodtype" value="Bloodtype" />
                            </div>
                            <Select {...register("bloodtype", { required: true })} id="bloodtype" value={bloodtype} onChange={(e) => setBloodtype(e.target.value as Bloodtype)} required>
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
                            <TextInput {...register("image", { required: true })} id="image" type="text" value={image} onChange={(e) => setImage(e.target.value)} placeholder="Insert image url here" required />
                        </div>
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="description" value="Description" />
                            </div>
                            <Textarea {...register("description", { required: true })} id="description" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Insert description here" rows={4} />
                        </div>
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="source" value="Source" />
                            </div>
                            <TextInput {...register("source", { required: true })} id="source" type="text" value={source} onChange={(e) => setSource(e.target.value)} placeholder="Insert source here" required />
                        </div>
                    </div>
                    <Button type="submit">Submit</Button>
                </form>
            </div>
        </>
    )
}

export default PersonalityInfoAddPage