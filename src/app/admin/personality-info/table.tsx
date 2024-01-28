'use client'

import React, { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import { Button, Checkbox, CustomFlowbiteTheme, Table } from 'flowbite-react'
import { HiPencil, HiOutlineTrash } from "react-icons/hi";
import { PersonalityInfo } from '../../_interfaces/PersonalityInfo';
import swal from 'sweetalert';
import { WARNING_SUBTITLE, WARNING_TITLE } from '@/app/_constants/constants';
import moment from 'moment';
import { deletePersonalityInfo } from '@/app/_services/PersonalityServices';
import Lottie from 'lottie-react';
import emptyAnimation from "@/app/_animations/empty.json"
import Image from 'next/image';
import { Response } from '@/app/_interfaces/Response';

const tableTheme: CustomFlowbiteTheme['table'] = {
    head: {
        cell: {
            base: "bg-gray-50 dark:bg-gray-700 px-6 py-3"
        }
    }
}

interface TableProps {
    data: PersonalityInfo[] | null;
    loading: boolean;
    token: string
}
interface TableRowProps {
    info: PersonalityInfo;
    pathname: string,
    token: string
}

const handleDelete = (
    id: string,
    token: string
) => {
    swal({
        title: WARNING_TITLE,
        text: WARNING_SUBTITLE,
        icon: "warning",
        dangerMode: true,
    })
        .then(async (willDelete) => {
            if (willDelete) {
                const response: Response = await deletePersonalityInfo(id, token)
                if (response?.status == 200) {
                    swal({
                        title: "Success!",
                        text: response?.message,
                        icon: "success",
                    })
                } else {
                    swal({
                        title: "Error",
                        text: response?.message,
                        icon: "error",
                    })
                }
            }
        });
}

const TableRow = (
    data: TableRowProps
) => {
    return (
        <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
            <Table.Cell className="p-4">
                <Checkbox />
            </Table.Cell>
            <Table.Cell>
                <div className='max-w-12 aspect-square overflow-hidden rounded-full'>
                    <Image className='w-full h-auto object-cover' height={48} width={48} src={data.info?.image} title={data.info?.name} alt={data.info?.name} loading="lazy" />
                </div>
            </Table.Cell>
            <Table.Cell className="max-w-52 whitespace-nowrap overflow-hidden text-ellipsis font-medium text-gray-900 dark:text-white">
                {`${data.info?.name} (${data.info?.name_jp})`}
            </Table.Cell>
            <Table.Cell className='max-w-52 text-nowrap whitespace-nowrap overflow-hidden text-ellipsis'>{data.info?.favoritedBy}</Table.Cell>
            <Table.Cell className='max-w-52 text-nowrap whitespace-nowrap overflow-hidden text-ellipsis'>{moment(data.info?.createdAt).fromNow()}</Table.Cell>
            <Table.Cell className='max-w-52 text-nowrap whitespace-nowrap overflow-hidden text-ellipsis'>{moment(data.info?.updatedAt).fromNow()}</Table.Cell>
            <Table.Cell>
                <Button href={`${data.pathname}/edit/${data.info?.id}`} color='blue'>
                    <HiPencil className='text-white' />
                </Button>
            </Table.Cell>
            <Table.Cell>
                <Button onClick={() => { handleDelete(data.info?.id, data.token) }} color='failure'>
                    <HiOutlineTrash className='text-white' />
                </Button>
            </Table.Cell>
        </Table.Row>
    )
}

const PersonalityInfoTable: React.FC<TableProps> = ({ data, token }) => {
    const pathname = usePathname()
    return (
        <Table theme={tableTheme}>
            <Table.Head>
                <Table.HeadCell className="p-4">
                    <Checkbox />
                </Table.HeadCell>
                <Table.HeadCell>Image</Table.HeadCell>
                <Table.HeadCell>Name</Table.HeadCell>
                <Table.HeadCell>Favorited by</Table.HeadCell>
                <Table.HeadCell>Added</Table.HeadCell>
                <Table.HeadCell>Updated</Table.HeadCell>
                <Table.HeadCell colSpan={2}>Action</Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y">
                {data?.length != 0 ? (
                    data?.map((info, index) => {
                        return (
                            <TableRow key={index} pathname={pathname} info={info} token={token} />
                        )
                    })
                ) : (
                    <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                        <Table.Cell colSpan={8}>
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

export default PersonalityInfoTable