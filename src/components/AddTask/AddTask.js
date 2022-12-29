import React from 'react';
import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    Input,
    Button,
} from "@material-tailwind/react";
import { useForm } from 'react-hook-form';
import  toast  from 'react-hot-toast';

const AddTask = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();

    const handleLogin = (data) => {
        fetch('http://localhost:5000/task', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(res => res.json())
        .then(result => toast.success('Task Added Successfully!'))
    }

    return (
        <div className="mt-12">
            <Card className="container m-auto">
                <form onSubmit={handleSubmit(handleLogin)}>
                    <CardHeader
                        variant="gradient"
                        color="blue"
                        className="mb-4 grid h-28 place-items-center"
                    >
                        <Typography variant="h3" color="white">
                            Add a Task
                        </Typography>
                    </CardHeader>
                    <CardBody className="flex flex-col gap-4">
                        <Input label="Task Title" size="lg" {...register('title', { required: "Email is required" })} />
                        {errors.email && <span className='text-red-600'>This field is required</span>}
                        <Input type="file" size="lg" />
                    </CardBody>
                    <CardFooter className="pt-0">
                        <Button type='submit' variant="gradient" fullWidth>
                            Add Task
                        </Button>
                    </CardFooter>
                </form>
            </Card>
        </div>
    );
};

export default AddTask;