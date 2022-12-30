import React from 'react';
import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    IconButton,
    Checkbox,
    Textarea,
    Button,
} from "@material-tailwind/react";
import { FaInbox, FaPencilAlt, FaTrashAlt } from "react-icons/fa";
import { toast } from 'react-hot-toast';
import { useForm } from 'react-hook-form';

const MyTask = ({ task, handleDelete, handleOpen, refetch }) => {
    const { _id, title, description, status, image, message } = task;
    const { register, handleSubmit } = useForm();

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
            .then(result => {
                refetch();
                toast.success('Task Status Updated Successfully!')
            })
    }

    const handleMessage = (data) => {
        fetch(`https://task-backend-xi.vercel.app/task/${_id}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(result => {
                refetch();
                toast.success('Message Added Successfully!')
            })
    }

    return (
        <Card className='justify-between mb-12'>
            <CardHeader color="blue" className="relative h-56">
                <img
                    src={image}
                    alt="TaskImage"
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
            {
                status === 1 ?
                    <div className='px-6'>
                        <form className='block' onSubmit={handleSubmit(handleMessage)}>
                            <Textarea label="Task Message" {...register('message')} defaultValue={message} />
                            <Button className='mt-4 mb-2' type='submit' color='teal' variant="gradient" fullWidth>
                                Add Message
                            </Button>
                        </form>
                    </div> : ''
            }
        </Card>
    );
};

export default MyTask;