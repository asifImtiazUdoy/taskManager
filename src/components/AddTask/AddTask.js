import React, { useContext, useState } from 'react';
import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    Input,
    Button,
    Textarea,
} from "@material-tailwind/react";
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { AuthContext } from '../../contexts/AuthProvider/AuthProvider';
import { Navigate } from 'react-router-dom';

const AddTask = () => {
    const { user } = useContext(AuthContext);
    const [loading, setLoading] = useState(false);
    const { register, handleSubmit, formState: { errors } } = useForm();

    const handleCreate = (data) => {
        const task = {
            email: user.email,
            title: data.title,
            description: data.description,
            status: 0,
        }

        if (data.image.length === 0) {
            return fetch('https://task-backend-xi.vercel.app/task', {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(task)
            })
            .then(res => res.json())
            .then(result => {
                if (result.acknowledged) {
                    <Navigate to='/tasks'></Navigate>
                    toast.success('Task Added Successfully!')
                }
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
                task.image = imgResult.data.url;
                fetch('https://task-backend-xi.vercel.app/task', {
                    method: 'POST',
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify(task)
                })
                    .then(res => res.json())
                    .then(result => {
                        if (result.acknowledged) {
                            setLoading(false);
                            <Navigate to='/tasks'></Navigate>
                            toast.success('Task Added Successfully!')
                        }
                    })
            }
        })
    }

    return (
        <div className="mt-12 grid grid-cols-5">
            <Card className="container mx-auto col-start-2 col-span-3">
                <form onSubmit={handleSubmit(handleCreate)}>
                    <CardHeader
                        variant="gradient"
                        color="teal"
                        className="mb-4 grid h-28 place-items-center"
                    >
                        <Typography variant="h3" color="white">
                            Add a Task
                        </Typography>
                    </CardHeader>
                    <CardBody className="flex flex-col gap-4">
                        <Input label="Task Title" size="lg" {...register('title', { required: "Task name is required" })} />
                        {errors.title && <span className='text-red-600'>This field is required</span>}
                        <Textarea label="Task Description" {...register('description', { required: "Task Description is required" })} />
                        {errors.description && <span className='text-red-600'>This field is required</span>}
                        <Input type="file" size="lg" {...register('image')} />
                    </CardBody>
                    <CardFooter className="pt-0">
                        <Button className='w-1/3 mx-auto' type='submit' color='teal' variant="gradient" fullWidth>
                            {loading ? 'Uploading...' : 'Add Task'}
                        </Button>
                    </CardFooter>
                </form>
            </Card>
        </div>
    );
};

export default AddTask;