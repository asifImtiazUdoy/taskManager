import React, { useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    IconButton,
} from "@material-tailwind/react";
import { FaPencilAlt, FaTrashAlt } from "react-icons/fa";
import EditTask from '../EditTask/EditTask';

const MyTask = ({ task, handleDelete, handleOpen }) => {
    const { _id, title, description } = task;

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
                <Typography variant="small">$899/night</Typography>
                <Typography variant="small" color="gray" className="flex gap-1">
                    <IconButton onClick={ () => handleOpen(_id) } color='green'>
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