import React, { useState, useEffect } from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import Header from '../components/Header/Header';
import Nav from '../components/Nav/Nav';
import Spinner from '../components/Spinner/Spinner';


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
    const [loading, setLoading] = useState(true);
    // useEffect(() => {
    //     setTimeout(() => {
    //         setLoading(true);
    //     }, 1500)
    // })
    return (
        <>
            {
                loading ?
                    <div className='flex w-full h-full'>
                        <Nav pageName='Dashboard' />
                        <div className='flex-row w-full h-full'>
                            <Header pageName='Dashboard'/>
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
                    :
                    <Spinner color='blue' />
            }
        </>
    )
}

export default Dashboard