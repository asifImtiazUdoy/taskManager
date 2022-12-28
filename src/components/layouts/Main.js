import React from 'react';
import { Outlet } from 'react-router-dom';
import TopBar from '../partials/TopBar';

const Main = () => {
    return (
        <div className='max-w-full'>
            <TopBar></TopBar>
            <Outlet></Outlet>
        </div>
    );
};

export default Main;