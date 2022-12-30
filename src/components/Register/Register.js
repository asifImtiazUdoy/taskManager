import React, { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthProvider/AuthProvider';
import { useLocation, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { Button, Card, CardBody, CardFooter, CardHeader, Input, Typography } from '@material-tailwind/react';

const Register = () => {
    const { createUser, googleLogin } = useContext(AuthContext);
    const { register, handleSubmit, formState: { errors } } = useForm();
    const location = useLocation();
    const navigate = useNavigate();

    const from = location.state?.from?.pathname || '/';

    const handleLogin = (data) => {
        createUser(data.email, data.password)
            .then(result => {
                if (result.user?.uid) {
                    navigate(from);
                    toast.success('User Created Successfully');
                }
            })
    }

    const handleGoogleLogin = () => {
        googleLogin()
            .then(data => {
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
                            Sign Up
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
                            Register
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

export default Register;