'use client'

import React, { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import { Breadcrumb, Button, Checkbox, CustomFlowbiteTheme, Table, TextInput } from 'flowbite-react'
import { HiHome } from 'react-icons/hi'
import { RadioTracks } from '../../_interfaces/RadioTracks'
import { getAllRadioTracks } from '../../_services/RadioTracksServices'
import { HiSearch, HiPencil, HiOutlineTrash } from "react-icons/hi";
import AdminLayout from '../adminLayout'

const tableTheme: CustomFlowbiteTheme['table'] = {
    head: {
        cell: {
            base: "bg-gray-50 dark:bg-gray-700 px-6 py-3"
        }
    }
}

let monthNames = [
    'Januari', 'Februari', 'Maret',
    'April', 'Mei', 'Juni',
    'Juli', 'Agustus', 'September',
    'Oktober', 'November', 'Desember'
];

const RadioTracks = () => {
    const pathname = usePathname()
    const [radioTracks, setRadioTracks] = useState<RadioTracks[]>([])

    const [token, setToken] = useState("")
    const loadTokenFromLocalStorage = (): string => {
        const token = localStorage.getItem('token') || "";
        return token
    };
    useEffect(() => {
        const token = loadTokenFromLocalStorage()
        setToken(token)
        console.log({ token })
    }, [])

    useEffect(() => {
        const fetchRadioTracks = async () => {
            try {
                const data = await getAllRadioTracks(token)
                setRadioTracks(data)
            } catch (error) {
                console.log(error)
            }
        }
        fetchRadioTracks()
    }, [token])

    useEffect(() => {
        console.log(radioTracks)
    }, [radioTracks])

    return (
        <AdminLayout>
            <div className="mb-6">
                <h1>Radio Tracks</h1>
                <Breadcrumb aria-label="Default breadcrumb example">
                    <Breadcrumb.Item href="/dashboard" icon={HiHome}>
                        Dashboard
                    </Breadcrumb.Item>
                    <Breadcrumb.Item>Radio</Breadcrumb.Item>
                    <Breadcrumb.Item href="/radio-tracks">Tracks</Breadcrumb.Item>
                </Breadcrumb>
            </div>
            <div className="mb-6">
                <div className='p-4 flex flex-row justify-between items-center bg-white dark:bg-gray-800 rounded-tl-lg rounded-tr-lg'>
                    <TextInput id="search-table" type="text" icon={HiSearch} placeholder="Search here..." />
                    <div className="grid grid-cols-2 gap-3">
                        <Button color="failure">Delete selected</Button>
                        <Button href={`${pathname}/add/`} color="success">Add new</Button>
                    </div>
                </div>
                <Table theme={tableTheme} hoverable>
                    <Table.Head>
                        <Table.HeadCell className="p-4">
                            <Checkbox />
                        </Table.HeadCell>
                        <Table.HeadCell>Image</Table.HeadCell>
                        <Table.HeadCell>Name</Table.HeadCell>
                        <Table.HeadCell>Episode</Table.HeadCell>
                        <Table.HeadCell>On Air</Table.HeadCell>
                        <Table.HeadCell>Personalities</Table.HeadCell>
                        <Table.HeadCell>
                            <span className="sr-only">Action</span>
                        </Table.HeadCell>
                    </Table.Head>
                    <Table.Body className="divide-y">
                        {radioTracks && (
                            radioTracks.map((tracks, index) => {
                                let onAir = new Date(tracks.radio_oa)
                                let day = onAir.getDate();
                                let monthIndex = onAir.getMonth();
                                let year = onAir.getFullYear();
                                let formattedDate = `${day} ${monthNames[monthIndex]} ${year}`;
                                let personalities_name = tracks.personalities.map(person => person.name)
                                let personalities_name_final = personalities_name.join(', ')
                                return (
                                    <Table.Row key={index} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                                        <Table.Cell className="p-4">
                                            <Checkbox />
                                        </Table.Cell>
                                        <Table.Cell>
                                            <div className='max-w-16 aspect-square overflow-hidden rounded-lg'>
                                                <img className='w-full h-auto object-cover' src={tracks.track_image} title={tracks.name} alt={tracks.name} />
                                            </div>
                                        </Table.Cell>
                                        <Table.Cell className="max-w-40 whitespace-nowrap overflow-hidden text-ellipsis font-medium text-gray-900 dark:text-white">
                                            {tracks.name} ({tracks.name_jp})
                                        </Table.Cell>
                                        <Table.Cell className='max-w-52 text-nowrap whitespace-nowrap overflow-hidden text-ellipsis'>{tracks.episode}</Table.Cell>
                                        <Table.Cell className='max-w-52 text-nowrap whitespace-nowrap overflow-hidden text-ellipsis'>{formattedDate}</Table.Cell>
                                        <Table.Cell className='max-w-52 text-nowrap whitespace-nowrap overflow-hidden text-ellipsis'>{personalities_name_final}</Table.Cell>
                                        <Table.Cell>
                                            <div className="grid grid-cols-2 gap-3">
                                                <Button href={`${pathname}/edit/${tracks.id}`} color='blue'>
                                                    <HiPencil className='text-white' />
                                                </Button>
                                                <Button href={`${pathname}/delete/${tracks.id}`} color='failure'>
                                                    <HiOutlineTrash className='text-white' />
                                                </Button>
                                            </div>
                                        </Table.Cell>
                                    </Table.Row>
                                )
                            })
                        )}

                    </Table.Body>
                </Table>
            </div>
        </AdminLayout>
    )
}

export default RadioTracks