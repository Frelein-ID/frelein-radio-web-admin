'use client'

import React from 'react'
import { usePathname } from 'next/navigation'
import { Button, Checkbox, CustomFlowbiteTheme, Table } from 'flowbite-react'
import { HiPencil, HiOutlineTrash } from "react-icons/hi";
import { PersonalityInfo } from '../../_interfaces/PersonalityInfo';
import swal from 'sweetalert';
import { WARNING_SUBTITLE, WARNING_TITLE } from '@/app/_constants/constants';
import moment from 'moment';

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
    formattedDate: string
}

let monthNames = [
    'Januari', 'Februari', 'Maret',
    'April', 'Mei', 'Juni',
    'Juli', 'Agustus', 'September',
    'Oktober', 'November', 'Desember'
];


const PersonalityInfoTable: React.FC<TableProps> = ({ data, loading, token }) => {
    const pathname = usePathname()
    return (
        <Table theme={tableTheme} hoverable>
            <Table.Head>
                <Table.HeadCell className="p-4">
                    <Checkbox />
                </Table.HeadCell>
                <Table.HeadCell></Table.HeadCell>
                <Table.HeadCell>Name</Table.HeadCell>
                <Table.HeadCell>Favorited by</Table.HeadCell>
                <Table.HeadCell>Added</Table.HeadCell>
                <Table.HeadCell>Updated</Table.HeadCell>
                <Table.HeadCell>
                    <span className="sr-only">Action</span>
                </Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y">
                {data?.map((info, index) => {
                    let onAir = new Date(info.birthdate)
                    let day = onAir.getDate();
                    let monthIndex = onAir.getMonth();
                    let year = onAir.getFullYear();
                    let formattedDate = `${day} ${monthNames[monthIndex]} ${year}`;
                    const dataFinal = {
                        info: info,
                        pathname: pathname,
                        formattedDate: formattedDate
                    }
                    return (
                        <Table.Row key={index} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                            <Table.Cell className="p-4">
                                <Checkbox />
                            </Table.Cell>
                            <Table.Cell>
                                <div className='max-w-12 aspect-square overflow-hidden rounded-full'>
                                    {/* <Image className='w-full h-auto object-cover' height={48} width={48} src={info.image} title={info.name} alt={info.name} loading="lazy" /> */}

                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img className='w-full h-auto object-cover' height={48} width={48} src={info?.image} title={`${info?.name} (${info?.name_jp})`} alt={`${info?.name} (${info?.name_jp})`} loading="lazy" />
                                </div>
                            </Table.Cell>
                            <Table.Cell className="max-w-52 whitespace-nowrap overflow-hidden text-ellipsis font-medium text-gray-900 dark:text-white">
                                {`${info?.name} (${info?.name_jp})`}
                            </Table.Cell>
                            <Table.Cell className='max-w-52 text-nowrap whitespace-nowrap overflow-hidden text-ellipsis'>{info?.favoritedBy}</Table.Cell>
                            <Table.Cell className='max-w-52 text-nowrap whitespace-nowrap overflow-hidden text-ellipsis'>{moment(info?.createdAt).fromNow()}</Table.Cell>
                            <Table.Cell className='max-w-52 text-nowrap whitespace-nowrap overflow-hidden text-ellipsis'>{moment(info?.updatedAt).fromNow()}</Table.Cell>
                            <Table.Cell>
                                <div className="grid grid-cols-2 gap-3">
                                    <Button href={`${pathname}/edit/${info?.id}`} color='blue'>
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
                })}
            </Table.Body>
        </Table>
    )
}

export default PersonalityInfoTable