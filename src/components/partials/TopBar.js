import { useState, useEffect, useContext } from "react";
import {
    Navbar,
    MobileNav,
    Typography,
    IconButton,
    Avatar,
    Menu,
    MenuHandler,
    MenuList,
    MenuItem,
    Switch,
    Button,
} from "@material-tailwind/react";
import { Link, Navigate } from "react-router-dom";
import { BsSun, BsMoon } from "react-icons/bs";
import { AuthContext } from "../../contexts/AuthProvider/AuthProvider";
import { toast } from "react-hot-toast";

const TopBar = () => {
    const [openNav, setOpenNav] = useState(false);
    const { user, logOut } = useContext(AuthContext);

    const handleLogout = () => {
        logOut()
            .then()
            .then(result => {
                <Navigate to='/login'></Navigate>
                toast.success('Logout successfully!')
            })
    }

    useEffect(() => {
        window.addEventListener(
            "resize",
            () => window.innerWidth >= 960 && setOpenNav(false)
        );
    }, []);

    const navList = (
        <ul className="mb-4 mt-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
            <Typography
                as="li"
                variant="small"
                color="blue-gray"
                className="p-1 font-normal"
            >
                <Link to="task/create" className="flex items-center">
                    Add Task
                </Link>
            </Typography>
            <Typography
                as="li"
                variant="small"
                color="blue-gray"
                className="p-1 font-normal"
            >
                <Link to='/tasks' className="flex items-center">
                    My tasks
                </Link>
            </Typography>
            <Typography
                as="li"
                variant="small"
                color="blue-gray"
                className="p-1 font-normal"
            >
                <Link to='/tasks/completed' className="flex items-center">
                    Completed Task
                </Link>
            </Typography>
        </ul>
    );

    return (
        <Navbar className="mx-auto max-w-full py-2 dark:bg-slate-800">
            <div className="container mx-auto flex items-center justify-between text-blue-gray-900">
                <Typography
                    as="button"
                    variant="small"
                    className="mr-4 cursor-pointer py-1.5 font-normal"
                >
                    <Link to='/'>Task Manager</Link>
                </Typography>
                <div className="hidden lg:block">{navList}</div>
                <div className="flex">
                    <div className="flex items-center mr-4">
                        <BsSun className="mr-2" />
                        <Switch className="checked:bg-black" defaultChecked />
                        <BsMoon className="ml-2" />
                    </div>
                    {
                        user ?
                            <Menu placement="bottom-end">
                                <MenuHandler>
                                    {
                                        user?.photoURL ?
                                            <Avatar className="border-2 p-1 cursor-pointer border-violet-600 hover:shadow" width="60" src={user.photoURL} alt="User" variant="circular" /> :
                                            <Avatar className="border-2 p-1 cursor-pointer border-violet-600 hover:shadow" width="60" src="./logo192.png" alt="avatar" variant="circular" />
                                    }
                                </MenuHandler>
                                <MenuList>
                                    <MenuItem><Link to='/tasks'>All Tasks</Link></MenuItem>
                                    <MenuItem><Link to='/tasks/completed'>Completed Tasks</Link></MenuItem>
                                    <MenuItem><Link to='tasks/incompleted'>Incompleted Tasks</Link></MenuItem>
                                    <MenuItem><span onClick={handleLogout}>Log Out</span></MenuItem>
                                </MenuList>
                            </Menu> :
                            <>
                                <Link to='/register' variant="gradient">
                                    <Button variant="outlined" className="focus:shadow-none">
                                        Register
                                    </Button>
                                </Link>
                                <Link to='/login' variant="gradient">
                                    <Button variant="outlined" className="ml-2 focus:shadow-none">
                                        Login
                                    </Button>
                                </Link>
                            </>
                    }
                </div>
                <IconButton
                    variant="text"
                    className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
                    ripple={false}
                    onClick={() => setOpenNav(!openNav)}
                >
                    {openNav ? (
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            className="h-6 w-6"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                    ) : (
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth={2}
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M4 6h16M4 12h16M4 18h16"
                            />
                        </svg>
                    )}
                </IconButton>
            </div>
            <MobileNav open={openNav}>
                {navList}
            </MobileNav>
        </Navbar>
    );
}

export default TopBar;