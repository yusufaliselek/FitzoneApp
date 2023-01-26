import React, { useState } from 'react';
import { BsCalendar3 } from 'react-icons/bs';
import { MdOutlineAnalytics } from 'react-icons/md';
import { RiAccountCircleLine, RiSettings4Line } from 'react-icons/ri';
import { CiLogout } from 'react-icons/ci';
import { RxDashboard } from 'react-icons/rx';
import { VscFileSubmodule } from 'react-icons/vsc';
import { Link } from 'react-router-dom';
import { IMenu } from '../../types/Types';




const Nav = ({ pageName }: { pageName: string }) => {
    const [open, setOpen] = useState(true);
    const Menus: IMenu[] = [
        {
            title: "Dashboard",
            icon: <RxDashboard size={24} />,
            link: "/dashboard"
        },
        {
            title: "Kullanıcılar",
            icon: <RiAccountCircleLine size={24} />,
            link: "/users"
        },
        {
            title: "Takvim",
            icon: <BsCalendar3 size={24} />,
            link: "/calendar"
        },
        {
            title: "Analizler",
            icon: <MdOutlineAnalytics size={24} />,
            link: "/analystics"
        },
        {
            title: "Dosyalar",
            icon: <VscFileSubmodule size={24} />,
            link: "/files"
        },
        {
            title: "Ayarlar",
            icon: <RiSettings4Line size={24} />,
            link: "/settings"
        },
    ];
    return (
        <aside
            className={`${open ? "w-60" : "w-20"} h-screen p-5  pt-8 relative bg-gray-500 transition-all duration-500`}>
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
                        className={`flex  rounded-md p-2 cursor-pointer ${pageName === Menu.title ? "bg-gray-300 text-black" : "text-gray-300"} hover:bg-gray-100 hover:text-black transition-all text-sm items-center gap-x-4 mt-2`}>
                        {Menu.icon}
                        <span className={`${!open ? "hidden w-0" : "w-full"} origin-left `}>
                            {Menu.title}
                        </span>
                    </Link>
                ))}
            </ul>
            <Link to={"/"} className={`flex  rounded-md p-2 text-sm gap-x-4 mt-2 items-center cursor-pointer absolute bottom-5  hover:bg-gray-100 hover:text-black text-gray-300  transition duration-500`}>
                <CiLogout className='h-6 w-6' />
                <span className={`${!open ? "hidden" : "whitespace-nowrap"} origin-left`}>
                    Çıkış Yap
                </span>
            </Link>
        </aside>
    );
};

export default Nav;

