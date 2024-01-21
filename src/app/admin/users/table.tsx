'use client'

import React from 'react'
import { usePathname } from 'next/navigation'
import { Badge, Button, Checkbox, CustomFlowbiteTheme, Table } from 'flowbite-react'
import Skeleton from 'react-loading-skeleton';
import { HiPencil, HiOutlineTrash } from "react-icons/hi";
import swal from 'sweetalert';
import { WARNING_SUBTITLE, WARNING_TITLE } from '@/app/_constants/constants';
import { Users } from '@/app/_interfaces/Users';

const tableTheme: CustomFlowbiteTheme['table'] = {
    head: {
        cell: {
            base: "bg-gray-50 dark:bg-gray-700 px-6 py-3"
        }
    }
}

interface TableProps {
    data: Users[] | null;
    loading: boolean;
    token: string
}

const badgeTheme: CustomFlowbiteTheme['badge'] = {
    "root": {
        "base": "flex h-fit justify-center items-center gap-1 font-semibold uppercase",
    },
}

const UsersTable: React.FC<TableProps> = ({ data, loading, token }) => {
    const pathname = usePathname()
    return (
        <Table theme={tableTheme} hoverable>
            <Table.Head>
                <Table.HeadCell className="p-4">
                    <Checkbox />
                </Table.HeadCell>
                <Table.HeadCell>Image</Table.HeadCell>
                <Table.HeadCell>Name</Table.HeadCell>
                <Table.HeadCell>Role</Table.HeadCell>
                <Table.HeadCell>Username</Table.HeadCell>
                <Table.HeadCell>Email</Table.HeadCell>
                <Table.HeadCell>
                    <span className="sr-only">Action</span>
                </Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y">
                {loading ? (
                    <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                        <Table.Cell></Table.Cell>
                        <Table.Cell><Skeleton /></Table.Cell>
                        <Table.Cell><Skeleton /></Table.Cell>
                        <Table.Cell><Skeleton /></Table.Cell>
                        <Table.Cell><Skeleton /></Table.Cell>
                        <Table.Cell><Skeleton /></Table.Cell>
                        <Table.Cell><Skeleton /></Table.Cell>
                    </Table.Row>
                ) : (
                    // Tampilkan data jika sudah dimuat
                    data?.map((info, index) => {
                        return (
                            <Table.Row key={index} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                                <Table.Cell className="p-4">
                                    <Checkbox />
                                </Table.Cell>
                                <Table.Cell>
                                    <div className='max-w-12 aspect-square overflow-hidden rounded-full'>
                                        <img className='w-full h-auto object-cover' src={info.image} title={info.name} alt={info.name} />
                                    </div>
                                </Table.Cell>
                                <Table.Cell className="max-w-52 whitespace-nowrap overflow-hidden text-ellipsis font-medium text-gray-900 dark:text-white">
                                    {info.name}
                                </Table.Cell>
                                <Table.Cell className="max-w-52 whitespace-nowrap overflow-hidden text-ellipsis font-medium text-gray-900 dark:text-white">
                                    {info.role == "admin" ? (
                                        <Badge theme={badgeTheme} color="success">{info.role}</Badge>
                                    ) : (
                                        <Badge theme={badgeTheme} color="info">{info.role}</Badge>
                                    )}
                                </Table.Cell>
                                <Table.Cell className='max-w-52 text-nowrap whitespace-nowrap overflow-hidden text-ellipsis'>{info.username}</Table.Cell>
                                <Table.Cell className='max-w-52 text-nowrap whitespace-nowrap overflow-hidden text-ellipsis'>{info.email}</Table.Cell>
                                <Table.Cell>
                                    <div className="grid grid-cols-2 gap-3">
                                        <Button href={`${pathname}/edit/${info.id}`} color='blue'>
                                            <HiPencil className='text-white' />
                                        </Button>
                                        <Button color='failure' onClick={() => {
                                            swal({
                                                title: WARNING_TITLE,
                                                text: WARNING_SUBTITLE,
                                                icon: "warning",
                                                dangerMode: true,
                                            })
                                                .then(async (willDelete) => {
                                                    if (willDelete) {
                                                        // const response: any = await deletePersonalityInfo(info.id, token)
                                                        // if (response?.status == 200) {
                                                        //     swal({
                                                        //         title: "Success!",
                                                        //         text: response?.message,
                                                        //         icon: "success",
                                                        //     })
                                                        // } else {
                                                        //     swal({
                                                        //         title: "Error",
                                                        //         text: response?.message,
                                                        //         icon: "error",
                                                        //     })
                                                        // }
                                                    }
                                                });
                                        }}>
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
    )
}

export default UsersTable