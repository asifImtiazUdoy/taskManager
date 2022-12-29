import React from 'react';
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

const MyTask = ({ task, handleDelete }) => {
    const { _id, title } = task;

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
                    The place is close to Barceloneta Beach and bus stop just 2 min by
                    walk and near to "Naviglio" where you can enjoy the main night life in
                    Barcelona.
                </Typography>
            </CardBody>
            <CardFooter divider className="flex items-center justify-between py-3">
                <Typography variant="small">$899/night</Typography>
                <Typography variant="small" color="gray" className="flex gap-1">
                    <IconButton color='green'>
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