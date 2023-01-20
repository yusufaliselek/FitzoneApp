import React, { useState } from 'react';
import { RxDashboard } from 'react-icons/rx';
import { RiAccountCircleLine, RiSettings4Line } from 'react-icons/ri';
import { BsCalendar3 } from 'react-icons/bs';
import { IMenu } from '../../types/Types';
import { MdOutlineAnalytics } from 'react-icons/md';
import { VscFileSubmodule } from 'react-icons/vsc';
import { Link } from 'react-router-dom'




const Nav: React.FC<{}> = () => {
    const [open, setOpen] = useState(true);
    const Menus: IMenu[] = [
        {
            title: "Dashboard",
            icon: <RxDashboard className='h-6 w-6'/>,
            link: "/"
        },
        {
            title: "Kullanıcılar",
            icon: <RiAccountCircleLine className='h-6 w-6'/>,
            link: "/"
        },
        {
            title: "Takvim",
            icon: <BsCalendar3 className='h-6 w-6'/>,
            link: "/"
        },
        {
            title: "Analizler",
            icon: <MdOutlineAnalytics className='h-6 w-6'/>,
            link: "/"
        },
        {
            title: "Dosyalar",
            icon: <VscFileSubmodule className='h-6 w-6'/>,
            link: "/"
        },
        {
            title: "Ayarlar",
            icon: <RiSettings4Line className='h-6 w-6'/>,
            link: "/"
        },
    ];
    return (
            <aside
                className={` ${open ? "w-72" : "w-20"
                    } h-screen p-5  pt-8 relative duration-500 bg-gray-700`}
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
                            className={`flex  rounded-md p-2 cursor-pointer hover:bg-light-white text-gray-300 
                            text-sm items-center gap-x-4 mt-2 ${index === 0 && "bg-light-white"} `}>
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

