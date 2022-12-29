import React from 'react';
import { useLoaderData } from 'react-router-dom';
import MyTask from './MyTask';
import  toast  from 'react-hot-toast';

const MyTasks = () => {
    const tasks = useLoaderData();

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
        <div className='container mx-auto grid grid-cols-4 gap-4 mt-12'>
            { tasks.map( task => <MyTask key={task._id} task={task} handleDelete={handleDelete}></MyTask>) }
        </div>
    );
};

export default MyTasks;