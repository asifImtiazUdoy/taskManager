import React, { useContext } from 'react';
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
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Login = () => {
    const { login, googleLogin } = useContext(AuthContext);
    const { register, handleSubmit, formState: { errors } } = useForm();
    const location = useLocation();
    const navigate = useNavigate();

    const from = location.state?.from?.pathname || '/';

    const handleLogin = (data) => {
        login(data.email, data.password)
            .then(result => {
                toast.success('User logged in successfully!')
            })
            .catch(e => console.error(e))
    }

    const handleGoogleLogin = () => {
        googleLogin()
        .then(result => {
            navigate(from);
            toast.success('User Login Successfully!')
        })
        .catch(e => console.error(e))
    }

    return (
        <div className="mt-12 grid grid-cols-7">
            <Card className="container mx-auto col-start-3 col-span-3">
                <form onSubmit={handleSubmit(handleLogin)}>
                    <CardHeader
                        variant="gradient"
                        color="teal"
                        className="mb-4 grid h-28 place-items-center"
                    >
                        <Typography variant="h3" color="white">
                            Sign In
                        </Typography>
                    </CardHeader>
                    <CardBody className="flex flex-col gap-4">
                        <Input label="Email" type='email' size="lg" {...register('email', { required: "Task name is required" })} />
                        {errors.title && <span className='text-red-600'>This field is required</span>}
                        <Input label="Password" type='password' size="lg" {...register('password', { required: "Task name is required" })} />
                        {errors.description && <span className='text-red-600'>This field is required</span>}
                    </CardBody>
                    <CardFooter className="pt-0">
                        <Button className='mb-6' type='submit' color='teal' variant="gradient" fullWidth>
                            Log In
                        </Button>
                        <Button type='button' onClick={handleGoogleLogin} variant="outlined" fullWidth>
                            Sign In with Google
                        </Button>
                    </CardFooter>
                </form>
            </Card>
        </div>
    );
};

export default Login;