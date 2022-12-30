import React from 'react';
import { Button } from "@material-tailwind/react";
import { Link } from 'react-router-dom';

const Home = () => {

    return (
        <div className="mt-12 container mx-auto text-center">
            <h1 className='block text-3xl mb-6'>Hi, Welcome to Task Manager</h1>
            <Link to='/task/create'><Button variant='gradient'>Let's Start</Button></Link>
        </div>
    );
};

export default Home;