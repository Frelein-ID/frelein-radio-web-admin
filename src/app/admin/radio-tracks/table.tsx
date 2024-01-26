'use client'

import React from 'react'
import { usePathname } from 'next/navigation'
import { Button, Checkbox, CustomFlowbiteTheme, Table, Spinner } from 'flowbite-react'
import { RadioTracks } from '../../_interfaces/RadioTracks';
import { HiPencil, HiOutlineTrash, HiExternalLink } from "react-icons/hi";
import moment from 'moment';
import Lottie from 'lottie-react';
import emptyAnimation from "@/app/_animations/empty.json"

const tableTheme: CustomFlowbiteTheme['table'] = {
    head: {
        cell: {
            base: "bg-gray-50 dark:bg-gray-700 px-6 py-3 overflow-scroll relative"
        }
    }
}

interface TableProps {
    data: RadioTracks[] | null;
}

interface TableRowProps {
    pathname: string,
    info: RadioTracks
}

const TableRow = (
    data: TableRowProps
) => {
    let personalities_name = data.info.personalities.map((person: any) => person.name)
    let personalities_name_final = personalities_name.join(', ')
    return (
        <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
            <Table.Cell className="p-4">
                <Checkbox />
            </Table.Cell>
            <Table.Cell>
                <div className='max-w-16 aspect-square overflow-hidden rounded-lg'>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img className='w-full h-auto object-cover' src={data.info.track_image} title={data.info.name} alt={data.info.name} />
                </div>
            </Table.Cell>
            <Table.Cell className="max-w-40 whitespace-nowrap overflow-hidden text-ellipsis font-medium text-gray-900 dark:text-white">
                {data.info.name} ({data.info.name_jp})
            </Table.Cell>
            <Table.Cell className='max-w-52 text-nowrap whitespace-nowrap overflow-hidden text-ellipsis'>{data.info.episode}</Table.Cell>
            <Table.Cell className='max-w-52 text-nowrap whitespace-nowrap overflow-hidden text-ellipsis'>{moment(data.info?.radio_oa).format('LL')}</Table.Cell>
            <Table.Cell className='max-w-52 text-nowrap whitespace-nowrap overflow-hidden text-ellipsis'>{personalities_name_final}</Table.Cell>
            <Table.Cell className='max-w-52 text-nowrap whitespace-nowrap overflow-hidden text-ellipsis'>{moment(data.info?.createdAt).fromNow()}</Table.Cell>
            <Table.Cell className='max-w-52 text-nowrap whitespace-nowrap overflow-hidden text-ellipsis'>{moment(data.info?.updatedAt).fromNow()}</Table.Cell>
            <Table.Cell>
                <Button href={`${data.pathname}/edit/${data.info.id}`} color='blue'>
                    <HiPencil className='text-white' />
                </Button>
            </Table.Cell>
            <Table.Cell>
                <Button href={`${data.pathname}/delete/${data.info.id}`} color='failure'>
                    <HiOutlineTrash className='text-white' />
                </Button>
            </Table.Cell>
        </Table.Row>
    )
}


const RadioTracksTable: React.FC<TableProps> = ({ data }) => {
    const pathname = usePathname()
    return (
        <Table theme={tableTheme}>
            <Table.Head>
                <Table.HeadCell className="p-4">
                    <Checkbox />
                </Table.HeadCell>
                <Table.HeadCell>Image</Table.HeadCell>
                <Table.HeadCell>Name</Table.HeadCell>
                <Table.HeadCell>Episode</Table.HeadCell>
                <Table.HeadCell>On Air</Table.HeadCell>
                <Table.HeadCell>Personalities</Table.HeadCell>
                <Table.HeadCell>Added</Table.HeadCell>
                <Table.HeadCell>Updated</Table.HeadCell>
                <Table.HeadCell colSpan={2}>Action</Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y">
                {data?.length != 0 ? (
                    data?.map((info, index) => {
                        return (
                            <TableRow key={index} info={info} pathname={pathname} />
                        )
                    })
                ) : (
                    <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                        <Table.Cell colSpan={10}>
                            <div className="flex flex-col text-center justify-center items-center">
                                <Lottie className='w-96 h-96' animationData={emptyAnimation} />
                                <h3 className='mb-3'>Not Found</h3>
                            </div>
                        </Table.Cell>
                    </Table.Row>
                )}

            </Table.Body>
        </Table>
    )
}

export default RadioTracksTable