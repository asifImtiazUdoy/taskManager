import React, { useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    IconButton,
    Checkbox,
} from "@material-tailwind/react";
import { FaPencilAlt, FaTrashAlt } from "react-icons/fa";
import { toast } from 'react-hot-toast';

const MyTask = ({ task, handleDelete, handleOpen }) => {
    const { _id, title, description, status } = task;
    const handleUpdate = (event) => {
        let data = { status: 0 };

        if (event.target.checked) {
            data = {
                status: 1
            }
        }
        fetch(`https://task-backend-xi.vercel.app/task/${_id}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(result => toast.success('Task Updated Successfully!'))
    }

    return (
        <Card>
            <CardHeader color="blue" className="relative h-56">
                <img
                    src="/img/blog.jpg"
                    alt="img-blur-shadow"
                    className="h-full w-full"
                />
            </CardHeader>
            <CardBody className="text-center">
                <Typography variant="h5" className="mb-2">
                    {title}
                </Typography>
                <Typography>
                    {description}
                </Typography>
            </CardBody>
            <CardFooter divider className="flex items-center justify-between py-3">
                <Typography variant="small"><Checkbox checked={status === 1 ? 'checked' : ''} label="Task Completed" onChange={handleUpdate} /></Typography>
                <Typography variant="small" color="gray" className="flex gap-1">
                    <IconButton onClick={() => handleOpen(_id)} color='green'>
                        <FaPencilAlt />
                    </IconButton>
                    <IconButton onClick={() => handleDelete(_id)} color='red'>
                        <FaTrashAlt />
                    </IconButton>
                </Typography>
            </CardFooter>
        </Card>
    );
};

export default MyTask;