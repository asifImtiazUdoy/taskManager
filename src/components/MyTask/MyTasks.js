import React, { useContext, useEffect, useState } from 'react';
import MyTask from './MyTask';
import toast from 'react-hot-toast';
import EditTask from '../EditTask/EditTask';
import { useQuery } from '@tanstack/react-query';
import { AuthContext } from '../../contexts/AuthProvider/AuthProvider';
import Loading from '../Loading/Loading';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@material-tailwind/react';

const MyTasks = () => {
    const location = useLocation();
    const { user } = useContext(AuthContext);
    const [task, setTask] = useState('');
    const [open, setOpen] = useState(false);

    const { isLoading, data: tasks = [], refetch } = useQuery({
        queryKey: ['tasks'],
        queryFn: () => {
            if (location.pathname === "/tasks/completed") {
                return fetch(`https://task-backend-xi.vercel.app/tasks?type=completed&email=${user.email}`).then(
                    (res) => res.json(),
                )
            }
            if (location.pathname === "/tasks/incompleted") {
                return fetch(`https://task-backend-xi.vercel.app/tasks?type=incompleted&email=${user.email}`).then(
                    (res) => res.json(),
                )
            }
            return fetch(`https://task-backend-xi.vercel.app/tasks?email=${user.email}`).then(
                (res) => res.json(),
            )
        }
    })

    useEffect(() => {
        refetch();
    }, [location])

    if (isLoading) {
        return <Loading></Loading>;
    }

    const handleOpen = (id) => {
        setOpen(!open);
        fetch(`https://task-backend-xi.vercel.app/task/${id}`)
            .then(res => res.json())
            .then(data => {
                setTask(data);
            })
    };

    const handleDelete = (id) => {
        fetch(`https://task-backend-xi.vercel.app/task/${id}`, {
            method: 'DELETE',
            headers: {
                'content-type': 'application/json'
            }
        })
            .then(res => res.json())
            .then(result => {
                refetch();
                toast.success('Task Deleted Successfully!')
            })
    }

    return (
        <div>
            <div className="container text-right w-full mt-4">
                {
                    location.pathname === "/tasks/completed" ?
                        <Button><Link to='/tasks/incompleted'>Incompleted Tasks</Link></Button> : (location.pathname === "/tasks/incompleted" ? <Button><Link to='/tasks/completed'>Completed Tasks</Link></Button> : '')
                }
            </div>
            <div className='container mx-auto grid grid-cols-3 gap-4 mt-12'>
                {tasks.map(task => <MyTask key={task._id} task={task} handleDelete={handleDelete} handleOpen={handleOpen} refetch={refetch}></MyTask>)}
                {
                    task &&
                    <EditTask refetch={refetch} open={open} setOpen={setOpen} handleOpen={handleOpen} task={task}></EditTask>
                }
            </div>
        </div>
    );
};

export default MyTasks;