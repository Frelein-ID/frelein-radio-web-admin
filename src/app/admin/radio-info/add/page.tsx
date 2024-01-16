import { Breadcrumb, Button, Label, TextInput, Textarea } from 'flowbite-react'
import React from 'react'
import { HiHome } from "react-icons/hi";

const RadioInfoAddPage = () => {
    return (
        <>
            <div className="mb-6">
                <h1>Add New Radio Information</h1>
                <Breadcrumb aria-label="Default breadcrumb example">
                    <Breadcrumb.Item href="/dashboard" icon={HiHome}>
                        Dashboard
                    </Breadcrumb.Item>
                    <Breadcrumb.Item>Radio</Breadcrumb.Item>
                    <Breadcrumb.Item href="/radio-info">Information</Breadcrumb.Item>
                    <Breadcrumb.Item>Add new information</Breadcrumb.Item>
                </Breadcrumb>
            </div>
            <div className="mb-6 bg-white dark:bg-gray-700 p-6 rounded-lg">
                <form className="flex flex-col gap-4">
                    <div className="grid grid-cols-2 gap-6">
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="name" value="Name" />
                            </div>
                            <TextInput id="name" type="text" placeholder="Insert name here" required />
                        </div>
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="name_jp" value="Name (Kanji)" />
                            </div>
                            <TextInput id="name_jp" type="text" placeholder="Insert kanji name here" required />
                        </div>
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="image" value="Image url" />
                            </div>
                            <TextInput id="image" type="text" placeholder="Insert image url here" required />
                        </div>
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="image" value="Image url" />
                            </div>
                            <TextInput id="image" type="text" placeholder="Insert image url here" required />
                        </div>
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="description" value="Description" />
                            </div>
                            <Textarea id="description" placeholder="Insert description here" required rows={4} />
                        </div>
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="website" value="Official website" />
                            </div>
                            <TextInput id="website" type="text" placeholder="Insert official website here" required />
                        </div>
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="social" value="Social media link" />
                            </div>
                            <TextInput id="social" type="text" placeholder="Insert social media link here" required />
                        </div>
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="schedule" value="Schedule" />
                            </div>
                            <TextInput id="schedule" type="text" placeholder="Insert schedule here" required />
                        </div>
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="start_time" value="Start time" />
                            </div>
                            <TextInput id="start_time" type="text" placeholder="Insert start time here" required />
                        </div>
                    </div>
                    <Button type="submit">Submit</Button>
                </form>
            </div>
        </>
    )
}

export default RadioInfoAddPage