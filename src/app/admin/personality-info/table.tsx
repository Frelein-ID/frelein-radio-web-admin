'use client'

import React from 'react'
import { usePathname } from 'next/navigation'
import { Button, Checkbox, CustomFlowbiteTheme, Table } from 'flowbite-react'
import Skeleton from 'react-loading-skeleton';
import { HiPencil, HiOutlineTrash } from "react-icons/hi";
import { PersonalityInfo } from '../_interfaces/PersonalityInfo';

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
}

let monthNames = [
    'Januari', 'Februari', 'Maret',
    'April', 'Mei', 'Juni',
    'Juli', 'Agustus', 'September',
    'Oktober', 'November', 'Desember'
];

const PersonalityInfoTable: React.FC<TableProps> = ({ data, loading }) => {
    const pathname = usePathname()
    return (
        <Table theme={tableTheme} hoverable>
            <Table.Head>
                <Table.HeadCell className="p-4">
                    <Checkbox />
                </Table.HeadCell>
                <Table.HeadCell>Image</Table.HeadCell>
                <Table.HeadCell>Name</Table.HeadCell>
                <Table.HeadCell>TTL</Table.HeadCell>
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
                    </Table.Row>
                ) : (
                    // Tampilkan data jika sudah dimuat
                    data?.map((info, index) => {
                        let onAir = new Date(info.birthdate)
                        let day = onAir.getDate();
                        let monthIndex = onAir.getMonth();
                        let year = onAir.getFullYear();
                        let formattedDate = `${day} ${monthNames[monthIndex]} ${year}`;
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
                                <Table.Cell className="max-w-40 whitespace-nowrap overflow-hidden text-ellipsis font-medium text-gray-900 dark:text-white">
                                    {info.name} ({info.name_jp})
                                </Table.Cell>
                                <Table.Cell>{`${info.birthplace} - ${formattedDate}`}</Table.Cell>
                                <Table.Cell>
                                    <div className="grid grid-cols-2 gap-3">
                                        <Button href={`${pathname}/edit/${info.id}`} color='blue'>
                                            <HiPencil className='text-white' />
                                        </Button>
                                        <Button href={`${pathname}/delete/${info.id}`} color='failure'>
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

export default PersonalityInfoTable