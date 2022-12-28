import { useState, useEffect } from "react";
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
} from "@material-tailwind/react";
import { Link } from "react-router-dom";
import { BsSun, BsMoon } from "react-icons/bs";

const TopBar = () => {
    const [openNav, setOpenNav] = useState(false);

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
                <Link href="#" className="flex items-center">
                    Pages
                </Link>
            </Typography>
            <Typography
                as="li"
                variant="small"
                color="blue-gray"
                className="p-1 font-normal"
            >
                <Link href="#" className="flex items-center">
                    Account
                </Link>
            </Typography>
            <Typography
                as="li"
                variant="small"
                color="blue-gray"
                className="p-1 font-normal"
            >
                <Link href="#" className="flex items-center">
                    Blocks
                </Link>
            </Typography>
            <Typography
                as="li"
                variant="small"
                color="blue-gray"
                className="p-1 font-normal"
            >
                <Link href="#" className="flex items-center">
                    Docs
                </Link>
            </Typography>
        </ul>
    );

    return (
        <Navbar className="mx-auto max-w-full py-2">
            <div className="container mx-auto flex items-center justify-between text-blue-gray-900">
                <Typography
                    as="a"
                    href="#"
                    variant="small"
                    className="mr-4 cursor-pointer py-1.5 font-normal"
                >
                    <span>Material Tailwind</span>
                </Typography>
                <div className="hidden lg:block">{navList}</div>
                <div className="flex">
                    <div className="flex items-center mr-4">
                        <BsSun className="mr-2" />
                        <Switch className="checked:bg-black" defaultChecked />
                        <BsMoon className="ml-2" />
                    </div>
                    <Menu placement="bottom-end">
                        <MenuHandler>
                            <Avatar className="border-2 p-1 cursor-pointer border-violet-600 hover:shadow" width="60" src="./logo192.png" alt="avatar" variant="circular" />
                        </MenuHandler>
                        <MenuList>
                            <MenuItem><Link>All Tasks</Link></MenuItem>
                            <MenuItem><Link>Completed Tasks</Link></MenuItem>
                            <MenuItem><Link>Incompleted Tasks</Link></MenuItem>
                            <MenuItem><Link>Log Out</Link></MenuItem>
                        </MenuList>
                    </Menu>
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