import React, { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthProvider/AuthProvider';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { Button, Card, CardBody, CardFooter, CardHeader, Input, Textarea, Typography } from '@material-tailwind/react';

const Register = () => {
    const { createUser, googleLogin } = useContext(AuthContext);
    const { register, handleSubmit, formState: { errors } } = useForm();
    const location = useLocation();
    const navigate = useNavigate();

    const from = location.state?.from?.pathname || '/';

    const handleLogin = (data) => {

        createUser(data.email, data.password)
            .then(res => res.json())
            .then(result => {
                if (result.user?.uid) {
                    toast.success('User Created Successfully');
                }
            })
    }

    const handleGoogleLogin = () => {
        googleLogin()
            .then(res => res.json())
            .then(data => {
                navigate(from);
                toast.success('User Login Successfully!')
            })
            .catch(e => console.error(e))
    }

    return (
        <div className="mt-12 grid grid-cols-5">
            <Card className="container mx-auto col-start-2 col-span-3">
                <form onSubmit={handleSubmit(handleLogin)}>
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
                        <Input type="file" size="lg" />
                    </CardBody>
                    <CardFooter className="pt-0">
                        <Button className='w-1/3 mx-auto' type='submit' color='teal' variant="gradient" fullWidth>
                            Add Task
                        </Button>
                        <Link onClick={handleGoogleLogin} className='w-1/3 mx-auto' variant="outlined" fullWidth>
                            Sign In with Google
                        </Link>
                    </CardFooter>
                </form>
            </Card>
        </div>
    );
};

export default Register;