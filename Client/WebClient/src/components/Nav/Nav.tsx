import React from 'react';
import { BsCalendar2, BsPersonBadgeFill } from 'react-icons/bs';
import { CgGym } from 'react-icons/cg';
import { RiAccountCircleLine } from 'react-icons/ri';
import { RxDashboard } from 'react-icons/rx';
import { VscFileSubmodule } from 'react-icons/vsc';
import { Link } from 'react-router-dom';
import { IMenu } from '../../types/Types';


const Nav = ({ pageName }: { pageName: string }) => {
    const Menus: IMenu[] = [
        {
            title: "Dashboard",
            icon: <RxDashboard size={24} />,
            link: "/dashboard"
        },
        {
            title: "Antrenörler",
            icon: <BsPersonBadgeFill size={24} />,
            link: "/trainers"
        },
        {
            title: "Üyeler",
            icon: <RiAccountCircleLine size={24} />,
            link: "/members"
        },
        {
            title: "Antrenmanlar",
            icon: <CgGym size={24} />,
            link: "/training"
        },
        {
            title: "Makineler",
            icon: <VscFileSubmodule size={24} />,
            link: "/files"
        },
        {
            title: "Dosyalar",
            icon: <VscFileSubmodule size={24} />,
            link: "/files"
        },
        {
            title: "Takvim",
            icon: <BsCalendar2 size={24} />,
            link: "/calendar"
        },
    ];


    return (
        <div className="w-64 h-screen p-2">
            <div className='h-full px-3 py-4 overflow-y-auto bg-[rgb(231,235,236)] bg-opacity-80 rounded-lg'>
                <div className='flex items-center justify-center'>
                    <h1 className="text-2xl font-normal  text-blue-600">
                        FITZONE
                    </h1>
                </div>
                <ul>
                    {Menus.map((menu, index) => (
                        <Link to={menu.link} key={index} className={`flex items-center py-2 px-4  ${pageName === menu.title ? "text-white bg-blue-500 font-medium" :
                            "text-slate-600 font-normal hover:bg-slate-200"}  cursor-pointer rounded-md mt-3 transition-all duration-400`}
                        >
                            <span className="mr-2">{menu.icon}</span>
                            <span>{menu.title}</span>
                        </Link>
                    ))}
                </ul>
            </div>
        </div>

    );

}

export default Nav;

