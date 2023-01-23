import React, { useState } from 'react';
import { BsCalendar3 } from 'react-icons/bs';
import { MdOutlineAnalytics } from 'react-icons/md';
import { RiAccountCircleLine, RiSettings4Line } from 'react-icons/ri';
import { RxDashboard } from 'react-icons/rx';
import { VscFileSubmodule } from 'react-icons/vsc';
import { Link } from 'react-router-dom';
import { IMenu } from '../../types/Types';




const Nav = ({ pageName }: { pageName: string }) => {
    const [open, setOpen] = useState(true);
    const Menus: IMenu[] = [
        {
            title: "Dashboard",
            icon: <RxDashboard className='h-6 w-6' />,
            link: "/dashboard"
        },
        {
            title: "Kullanıcılar",
            icon: <RiAccountCircleLine className='h-6 w-6' />,
            link: "/users"
        },
        {
            title: "Takvim",
            icon: <BsCalendar3 className='h-6 w-6' />,
            link: "/calendar"
        },
        {
            title: "Analizler",
            icon: <MdOutlineAnalytics className='h-6 w-6' />,
            link: "/analystics"
        },
        {
            title: "Dosyalar",
            icon: <VscFileSubmodule className='h-6 w-6' />,
            link: "/files"
        },
        {
            title: "Ayarlar",
            icon: <RiSettings4Line className='h-6 w-6' />,
            link: "/settings"
        },
    ];
    return (
        <aside
            className={` ${open ? "w-72 min-w-72" : "w-20 min-w-20"
                } h-screen p-5  pt-8 relative duration-500 bg-gray-900`}
        >
            <div className="flex gap-x-4 items-center">

                {/* <img
                        src={logo}
                        onClick={() => setOpen(!open)}
                        className={`cursor-pointer duration-500 ${open && "rotate-[360deg]"
                            }`}
                    /> */}
                <h2 className={`cursor-pointer text-white duration-500 ${open && "rotate-[360deg]"
                    }`} onClick={() => setOpen(!open)}>Fitzone</h2>
            </div>
            <ul className="pt-6">
                {Menus.map((Menu, index) => (
                    <Link to={Menu.link} key={index}
                        className={`flex  rounded-md p-2 cursor-pointer hover:bg-light-white 
                            text-sm items-center gap-x-4 mt-2 ${pageName === Menu.title ? "bg-gray-300 text-black" : "text-gray-300"}`}>
                        {Menu.icon}
                        <span className={`${!open && "hidden"} origin-left duration-200`}>
                            {Menu.title}
                        </span>
                    </Link>
                ))}
            </ul>
        </aside>
    );
};

export default Nav;

