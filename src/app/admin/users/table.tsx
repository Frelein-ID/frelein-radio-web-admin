'use client'

import React from 'react'
import { usePathname } from 'next/navigation'
import { Badge, Button, Checkbox, CustomFlowbiteTheme, Table } from 'flowbite-react'
import Skeleton from 'react-loading-skeleton';
import { HiPencil, HiOutlineTrash } from "react-icons/hi";
import swal from 'sweetalert';
import { WARNING_SUBTITLE, WARNING_TITLE } from '@/app/_constants/constants';
import { Users } from '@/app/_interfaces/Users';
import moment from "moment"

const tableTheme: CustomFlowbiteTheme['table'] = {
    head: {
        cell: {
            base: "bg-gray-50 dark:bg-gray-700 px-6 py-3"
        }
    }
}

const badgeTheme: CustomFlowbiteTheme['badge'] = {
    "root": {
        "base": "flex h-fit justify-center items-center gap-1 font-semibold uppercase",
    },
}

interface TableProps {
    data: Users[] | null;
    loading: boolean;
    token: string
}

interface TableRowProps {
    info: Users,
    pathname: string,
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
                    <img className='w-full h-auto object-cover' src={data.info.image} title={data.info.name} alt={data.info.name} />
                </div>
            </Table.Cell>
            <Table.Cell className="max-w-52 whitespace-nowrap overflow-hidden text-ellipsis font-medium text-gray-900 dark:text-white">
                {data.info.name}
            </Table.Cell>
            <Table.Cell className="max-w-52 whitespace-nowrap overflow-hidden text-ellipsis font-medium text-gray-900 dark:text-white">
                {data.info.role == "admin" ? (
                    <Badge theme={badgeTheme} color="success">{data.info.role}</Badge>
                ) : (
                    <Badge theme={badgeTheme} color="info">{data.info.role}</Badge>
                )}
            </Table.Cell>
            <Table.Cell className='max-w-52 text-nowrap whitespace-nowrap overflow-hidden text-ellipsis'>{data.info.username}</Table.Cell>
            <Table.Cell className='max-w-52 text-nowrap whitespace-nowrap overflow-hidden text-ellipsis'>{data.info.email}</Table.Cell>
            <Table.Cell className='max-w-52 text-nowrap whitespace-nowrap overflow-hidden text-ellipsis'>{data.info?.lastLogin ? moment(data.info.lastLogin).fromNow() : "Unknown"}</Table.Cell>
            <Table.Cell>
                <Button href={`${data.pathname}/edit/${data.info.id}`} color='blue'>
                    <HiPencil className='text-white' />
                </Button>
            </Table.Cell>
            <Table.Cell>
                <Button color='failure' >
                    <HiOutlineTrash className='text-white' />
                </Button>
            </Table.Cell>
        </Table.Row>
    )
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
                <Table.HeadCell>Last login</Table.HeadCell>
                <Table.HeadCell>
                    <span className="sr-only">Action Edit</span>
                </Table.HeadCell>
                <Table.HeadCell>
                    <span className="sr-only">Action Delete</span>
                </Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y">
                {data?.map((info, index) => {
                    return (
                        <TableRow key={index} info={info} pathname={pathname} />
                    )
                })}
            </Table.Body>
        </Table>
    )
}

export default UsersTable