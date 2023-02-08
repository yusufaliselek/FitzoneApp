import React from 'react';
import { RiAccountCircleLine } from 'react-icons/ri';
import { Bar, BarChart, CartesianGrid, Legend, Tooltip, XAxis, YAxis } from 'recharts';

import DefaultHeader from '../components/Header/DefaultHeader';
import Nav from '../components/Nav/Nav';


const data = [
    {
        name: 'Makine 10',
        uv: 4000,
        pv: 2400,
    },
    {
        name: 'Makine 11',
        uv: 3000,
        pv: 1398,
    },
    {
        name: 'Makine 8',
        uv: 2000,
        pv: 9800,
    },
    {
        name: 'Makine 6',
        uv: 2780,
        pv: 3908,
    },
    {
        name: 'Makine 9',
        uv: 1890,
        pv: 4800,
    },
    {
        name: 'Makine 12',
        uv: 2390,
        pv: 3800,
    },
    {
        name: 'Makine 3',
        uv: 3490,
        pv: 4300,
    },
];

const Dashboard = () => {
    // useEffect(() => {
    //     setTimeout(() => {
    //         setLoading(true);
    //     }, 1500)
    // })
    return (
        <>
            {
                <div className='flex w-full h-full'>
                    <Nav pageName='Dashboard' />
                    <div className='flex-row w-full h-full'>
                        <DefaultHeader pageName='Dashboard' DefaultName='Yusuf Ali Selek' DefaultIcon={<RiAccountCircleLine className='h-8 w-8' />} />
                        <div className='grid grid-cols-3 gap-4 w-full h-auto py-10'>
                            <BarChart
                                width={500}
                                height={300}
                                data={data}
                                margin={{
                                    top: 5,
                                    right: 30,
                                    left: 20,
                                    bottom: 5,
                                }}
                            >
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="pv" fill="gray" />
                                <Bar dataKey="uv" fill="gray" />
                            </BarChart>


                        </div>
                    </div>

                </div>
            }
        </>
    )
}

export default Dashboard