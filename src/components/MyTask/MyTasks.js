import React, { useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import MyTask from './MyTask';
import  toast  from 'react-hot-toast';
import EditTask from '../EditTask/EditTask';

const MyTasks = () => {
    const tasks = useLoaderData();
    const [open, setOpen] = useState(false);

    const handleOpen = (id) => {
        setOpen(!open);
        fetch(`http://localhost:5000/task/${id}`)
        .then(res => res.json())
        .then(data => {
            <EditTask open={open} handleOpen={handleOpen} task={data}></EditTask>
        })
    };

    const handleDelete = (id) => {
        fetch(`http://localhost:5000/task/${id}`, {
            method: 'DELETE',
            headers: {
                'content-type': 'application/json'
            }
        })
        .then(res => res.json())
        .then(result => toast.success('Task Deleted Successfully!'))
    }

    return (
        <div className='container mx-auto grid grid-cols-3 gap-4 mt-12'>
            { tasks.map( task => <MyTask key={task._id} task={task} handleDelete={handleDelete} handleOpen={handleOpen}></MyTask>) }
            <EditTask open={open} handleOpen={handleOpen} task=""></EditTask>
        </div>
    );
};

export default MyTasks;