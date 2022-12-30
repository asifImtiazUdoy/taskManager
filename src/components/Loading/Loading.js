import React from 'react';
import load from '../../loading.gif';

const Loading = () => {
    return (
        <div className='flex justify-center items-center h-screen'><img src={load} alt="loader" /></div>
    );
};

export default Loading;