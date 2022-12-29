import React from 'react';
import { Fragment, useState } from "react";
import {
    Button,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
    Input,
    Textarea,
    CardBody,
} from "@material-tailwind/react";
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';

const EditTask = ({ open, handleOpen, task }) => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { _id, title, description } = task;

    const handleUpdate = (data) => {
        fetch(`http://localhost:5000/task/${_id}`, {
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
        <Fragment>
            <Dialog open={open} handler={handleOpen}>
                <DialogBody divider>
                    <form onSubmit={handleSubmit(handleUpdate)}>
                        <CardBody>
                            <Input label="Task Title" size="lg" {...register('title', { required: "Task name is required" })} value={task ? title : ''} />
                            {errors.title && <span className='text-red-600'>This field is required</span>}
                            <Textarea label="Task Description" {...register('description', { required: "Task Description is required" })} value={task ? description : ''} />
                            {errors.description && <span className='text-red-600'>This field is required</span>}
                            <Input type="file" size="lg" />
                            <Button type='submit' color='teal' variant="gradient" fullWidth>
                                Add Task
                            </Button>
                        </CardBody>
                    </form>
                </DialogBody>
                <DialogFooter>
                    <Button
                        variant="text"
                        color="red"
                        onClick={handleOpen}
                        className="mr-1"
                    >
                        <span>Cancel</span>
                    </Button>
                    <Button variant="gradient" color="green" onClick={handleOpen}>
                        <span>Confirm</span>
                    </Button>
                </DialogFooter>
            </Dialog>
        </Fragment>
    );
};

export default EditTask;