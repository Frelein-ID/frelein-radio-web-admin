"use client"

import React, { useEffect, useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { Button, Checkbox, CustomFlowbiteTheme, Dropdown, Spinner, Table, TextInput } from 'flowbite-react'
import { HiPencil, HiOutlineTrash } from "react-icons/hi";
import swal from 'sweetalert';
import { WARNING_SUBTITLE, WARNING_TITLE } from '@/app/_constants/constants';
import moment from 'moment';
import Lottie from 'lottie-react';
import emptyAnimation from "@/app/_animations/empty.json"
import Image from 'next/image';
import { Response } from '@/app/_interfaces/Response';
import { HiSearch } from "react-icons/hi";
import { useLoading } from '@/app/_context/loadingContext';
import { RadioInfo } from '@/app/_interfaces/RadioInfo';
import { deleteRadioInfo, getAllRadioInfo } from '@/app/_services/RadioInfoServices';

const tableTheme: CustomFlowbiteTheme['table'] = {
    head: {
        cell: {
            base: "bg-gray-50 dark:bg-gray-700 px-6 py-3 hover:cursor-pointer"
        }
    }
}

interface TableRowProps {
    info: RadioInfo;
    pathname: string
}

interface SortableHeaderProps {
    columnKey: keyof RadioInfo;
    columnName: string;
    sortConfig: { key: keyof RadioInfo; direction: 'asc' | 'desc' } | null;
    handleSorting: (key: keyof RadioInfo) => void;
}

const RadioInfoTable: React.FC = () => {
    const pathname = usePathname()
    const router = useRouter()
    const { loading, startLoading, stopLoading } = useLoading()
    const [checkboxState, setCheckboxState] = useState<{ [key: string]: 'checked' | 'unchecked' | 'indeterminate' }>({});
    const [radioInfo, setRadioInfo] = useState<RadioInfo[]>([])
    const [checkboxFilteredKeys, setCheckboxFilteredKeys] = useState<string[]>([])
    const [sortConfig, setSortConfig] = useState<{ key: keyof RadioInfo; direction: 'asc' | 'desc' } | null>(null);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [itemsPerPage, setItemsPerPage] = useState(5)
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        handleFilterCheckbox(checkboxState)
    }, [checkboxState])

    // function
    function handleSingleDelete(
        id: string,
    ) {
        swal({
            title: WARNING_TITLE,
            text: WARNING_SUBTITLE,
            icon: "warning",
            dangerMode: true,
        })
            .then(async (willDelete) => {
                if (willDelete) {
                    const response: Response = await deleteRadioInfo(id)
                    if (response?.status == 200) {
                        swal({
                            title: "Success!",
                            text: response?.message,
                            icon: "success",
                        })
                        const newData = await getAllRadioInfo()
                        setRadioInfo(newData.data)
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

    function handleMultipleDelete() {
        swal({
            title: WARNING_TITLE,
            text: WARNING_SUBTITLE,
            icon: "warning",
            dangerMode: true,
        })
            .then(async (willDelete) => {
                if (willDelete) {
                    for (var data of checkboxFilteredKeys) {
                        await deleteRadioInfo(data)
                        const newData = await getAllRadioInfo()
                        setCheckboxFilteredKeys(checkboxFilteredKeys.filter((item) => item !== data))
                        setRadioInfo(newData.data)
                    }
                    swal({
                        title: "Success!",
                        text: "Deletion request has been sent",
                        icon: "success",
                    })
                }
            });
    }

    function handleCheckboxChange(rowId: string) {
        setCheckboxState((prev) => {
            const newState: { [key: string]: 'checked' | 'unchecked' | 'indeterminate' } = { ...prev };

            // Toggle state checkbox
            newState[rowId] = newState[rowId] === 'checked' ? 'unchecked' : 'checked';

            // Jika semua checkbox checked, set allState ke 'checked', jika tidak, set ke 'unchecked'
            const allChecked = Object.values(newState).every((state) => state === 'checked');
            const allUnchecked = Object.values(newState).every((state) => state === 'unchecked');
            newState.allState = allChecked ? 'checked' : allUnchecked ? 'unchecked' : 'indeterminate';

            return newState;
        });
    };

    function handleAllCheckboxChange() {
        setCheckboxState((prev) => {
            const newAllState = prev.allState === 'checked' ? 'unchecked' : 'checked';
            const newState: { [key: string]: 'checked' | 'unchecked' } = {};

            // Set semua checkbox ke allState yang baru
            radioInfo.forEach((row) => {
                newState[row.id] = newAllState;
            });

            // Set allState ke 'checked' jika semua checkbox checked, 'unchecked' jika semua unchecked, dan 'indeterminate' jika sebagian
            const allChecked = newAllState === 'checked';
            newState.allState = allChecked ? 'checked' : 'unchecked';

            return newState;
        });
    }

    function handleFilterCheckbox(keys: Object) {
        const allEntries = Object.entries(keys)
        const filteredEntries = allEntries.filter(([key, value]) => key !== "allState" && value === "checked")
        const filteredKeys = filteredEntries.map(([key]) => key)
        setCheckboxFilteredKeys(filteredKeys)
    }

    function handleSorting(key: keyof RadioInfo) {
        let direction: 'asc' | 'desc' = 'asc';
        if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc';
        }
        setSortConfig({ key, direction });
    };

    function sortedData() {
        if (!sortConfig) {
            return radioInfo;
        }

        return [...radioInfo].sort((a, b) => {
            if (a[sortConfig.key] < b[sortConfig.key]) {
                return sortConfig.direction === 'asc' ? -1 : 1;
            }
            if (a[sortConfig.key] > b[sortConfig.key]) {
                return sortConfig.direction === 'asc' ? 1 : -1;
            }
            return 0;
        });
    };

    function handleSearch(e: React.ChangeEvent<HTMLInputElement>) {
        setSearchTerm(e.target.value);
    };

    function goToPage(pageNumber: number) {
        setCurrentPage(pageNumber);
    };

    // component
    const SortableHeader: React.FC<SortableHeaderProps> = ({ columnKey, columnName, sortConfig, handleSorting }) => {
        const isSorted = sortConfig && sortConfig.key === columnKey;

        return (
            <Table.HeadCell onClick={() => handleSorting(columnKey)}>
                {columnName}
                {isSorted && (sortConfig?.direction === 'asc' ? ' ▲' : ' ▼')}
            </Table.HeadCell>
        );
    };

    const TableRow = (
        data: TableRowProps
    ) => {
        return (
            <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                <Table.Cell className="p-4">
                    <Checkbox
                        checked={checkboxState[data?.info.id] === 'checked'}
                        onChange={() => {
                            handleCheckboxChange(data?.info.id)
                        }}
                    />
                </Table.Cell>
                <Table.Cell>
                    <div className='max-w-12 aspect-square overflow-hidden rounded-lg'>
                        {data.info?.image != "" ? (
                            <Image className='w-full h-auto object-cover' height={48} width={48} src={data.info?.image} title={data.info?.name} alt={data.info?.name} loading="lazy" />
                        ) : (
                            <div className='flex justify-center items-center w-full h-full object-cover bg-gray-100 dark:bg-gray-700 text-lg font-bold'>
                                {Array.from(data.info?.name)[0]}
                            </div>
                        )}
                    </div>
                </Table.Cell>
                <Table.Cell className="max-w-52 whitespace-nowrap overflow-hidden text-ellipsis font-medium text-gray-900 dark:text-white">
                    {`${data.info?.name} (${data.info?.name_jp})`}
                </Table.Cell>
                <Table.Cell className='max-w-52 text-nowrap whitespace-nowrap overflow-hidden text-ellipsis'>{moment(data.info?.createdAt).fromNow()}</Table.Cell>
                <Table.Cell className='max-w-52 text-nowrap whitespace-nowrap overflow-hidden text-ellipsis'>{moment(data.info?.updatedAt).fromNow()}</Table.Cell>
                <Table.Cell>
                    <Button onClick={() => {
                        startLoading()
                        router.push(`${data.pathname}/edit/${data.info?.id}`)
                    }} color='blue'>
                        <HiPencil className='text-white' />
                    </Button>
                </Table.Cell>
                <Table.Cell>
                    <Button onClick={() => { handleSingleDelete(data.info?.id) }} color='failure'>
                        <HiOutlineTrash className='text-white' />
                    </Button>
                </Table.Cell>
            </Table.Row>
        )
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getAllRadioInfo()
                setRadioInfo(response?.data)
            } catch (error) {
                console.log(error)
            } finally {
                stopLoading()
            }
        }
        fetchData()
    }, [stopLoading])

    const filteredData = sortedData().filter((row) =>
        row.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const totalPages = Math.ceil(filteredData.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentData = filteredData.slice(startIndex, endIndex);


    return (
        <>
            <div className='p-4 flex flex-row justify-between items-center bg-white dark:bg-gray-800'>
                <TextInput id="search-table" type="text" value={searchTerm} onChange={handleSearch} icon={HiSearch} placeholder="Search here..." />
                <div className="grid grid-cols-2 gap-3">
                    <Button onClick={() => {
                        handleMultipleDelete()
                    }}
                        disabled={checkboxFilteredKeys.length == 0 ? true : false}
                        color="failure">Delete selected</Button>
                    <Button disabled={loading ? true : false} onClick={() => {
                        startLoading()
                        router.push(`${pathname}/add/`
                        )
                    }} color="success">{loading ? (
                        <>
                            <Spinner aria-label="Spinner loading" size="sm" />
                            <span className="pl-3">Loading...</span>
                        </>) : "Add new"}</Button>
                </div>
            </div>
            <Table theme={tableTheme}>
                <Table.Head>
                    <Table.HeadCell className="p-4">
                        <Checkbox
                            checked={checkboxState.allState === 'checked'}
                            onChange={() => {
                                handleAllCheckboxChange()
                            }}
                        />
                    </Table.HeadCell>
                    <Table.HeadCell>Image</Table.HeadCell>
                    <SortableHeader
                        columnKey='name'
                        columnName="Name"
                        sortConfig={sortConfig}
                        handleSorting={handleSorting}
                    />
                    <SortableHeader
                        columnKey='createdAt'
                        columnName="Added"
                        sortConfig={sortConfig}
                        handleSorting={handleSorting}
                    />
                    <SortableHeader
                        columnKey='updatedAt'
                        columnName="Updated"
                        sortConfig={sortConfig}
                        handleSorting={handleSorting}
                    />
                    <Table.HeadCell colSpan={2}>Action</Table.HeadCell>
                </Table.Head>
                <Table.Body className="divide-y">
                    {currentData?.length != 0 ? (
                        currentData?.map((info, index) => {
                            return (
                                <TableRow key={index} pathname={pathname} info={info} />
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
            <div className='w-full flex justify-between items-center my-4 px-8 bg-white dark:bg-gray-800'>
                <p>Showing {itemsPerPage} of {filteredData.length} entries</p>
                <div className="flex overflow-x-auto sm:justify-end gap-4">
                    <Dropdown size="sm" dismissOnClick={false} label="" renderTrigger={() => <Button color='light'>Show item per table: {itemsPerPage}</Button>}>
                        <Dropdown.Item onClick={() => { setItemsPerPage(5) }}>5</Dropdown.Item>
                        <Dropdown.Item onClick={() => { setItemsPerPage(25) }}>25</Dropdown.Item>
                        <Dropdown.Item onClick={() => { setItemsPerPage(100) }}>100</Dropdown.Item>
                    </Dropdown>
                </div>
            </div>
            <nav className='w-full flex justify-center items-center mx-auto my-4 px-8' aria-label="Pagination">
                <ul className="relative inline-flex -space-x-px text-sm gap-2">
                    {Array.from({ length: totalPages }, (_, index) => index + 1).map((pageNumber) => (
                        <li key={pageNumber}>
                            <button
                                onClick={() => goToPage(pageNumber)}
                                disabled={currentPage === pageNumber}
                                className="relative flex items-center justify-center p-5 h-8 rounded-lg leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                            >
                                {pageNumber}
                            </button>
                        </li>
                    ))}
                </ul>
            </nav>
        </>

    )
}

export default RadioInfoTable