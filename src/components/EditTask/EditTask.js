import React, { useState } from 'react';
import { Fragment } from "react";
import {
    Button,
    Dialog,
    DialogBody,
    Input,
    Textarea,
    CardBody,
} from "@material-tailwind/react";
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { FaWindowClose } from 'react-icons/fa';

const EditTask = ({ open, setOpen, handleOpen, task, refetch }) => {
    const [loading, setLoading] = useState(false);
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { _id, title, description } = task;

    const handleUpdate = (data) => {
        if (data.image.length === 0) {
            return fetch(`https://task-backend-xi.vercel.app/task/${_id}`, {
                method: 'PUT',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(data)
            })
                .then(res => res.json())
                .then(result => {
                    refetch();
                    setOpen(!open);
                    toast.success('Task Updated Successfully!')
                })
        }

        setLoading(true);
        const formData = new FormData();
        formData.append('image', data.image[0]);
        fetch(`https://api.imgbb.com/1/upload?key=${process.env.REACT_APP_imagebb_key}`, {
            method: "POST",
            body: formData
        })
            .then(res => res.json())
            .then(imgResult => {
                if (imgResult.success) {
                    data.image = imgResult.data.url;
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
                            setOpen(!open);
                            toast.success('Task Updated Successfully!')
                        })
                }
            })
    }

    return (
        <Fragment>
            <Dialog open={open} handler={handleOpen}>
                <DialogBody className='flex-col'>
                    <div className='w-full text-right'>
                        <Button
                            variant="text"
                            color="red"
                            onClick={handleOpen}
                            className="text-right"
                        >
                            <span className='text-2xl'><FaWindowClose /></span>
                        </Button>
                    </div>
                    <form onSubmit={handleSubmit(handleUpdate)}>
                        <CardBody>
                            <Input label="Task Title" size="lg" {...register('title', { required: "Task name is required" })} value={title} />
                            {errors.title && <span className='text-red-600'>This field is required</span>}
                            <div className="my-4">
                                <Textarea label="Task Description" {...register('description', { required: "Task Description is required" })} value={description} />
                            </div>
                            {errors.description && <span className='text-red-600'>This field is required</span>}
                            <Input type="file" size="lg" {...register('image')} />
                            <Button className='mt-4' type='submit' color='teal' variant="gradient" fullWidth>
                            {loading ? 'Uploading...' : 'Update Task'}
                            </Button>
                        </CardBody>
                    </form>
                </DialogBody>
            </Dialog>
        </Fragment>
    );
};

export default EditTask;