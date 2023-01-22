import React, { useState, useEffect } from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import Nav from '../components/Nav/Nav';
import Spinner from '../components/Spinner/Spinner';

const data = [
    {
        name: 'Makine 10',
        uv: 4000,
        pv: 2400,
        amt: 2400,
    },
    {
        name: 'Makine 11',
        uv: 3000,
        pv: 1398,
        amt: 2210,
    },
    {
        name: 'Makine 8',
        uv: 2000,
        pv: 9800,
        amt: 2290,
    },
    {
        name: 'Makine 6',
        uv: 2780,
        pv: 3908,
        amt: 2000,
    },
    {
        name: 'Makine 9',
        uv: 1890,
        pv: 4800,
        amt: 2181,
    },
    {
        name: 'Makine 12',
        uv: 2390,
        pv: 3800,
        amt: 2500,
    },
    {
        name: 'Makine 3',
        uv: 3490,
        pv: 4300,
        amt: 2100,
    },
];

const Dashboard = () => {
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        setTimeout(() => {
            setLoading(true);
        }, 1500)
    })
    return (
        <div className='flex w-screen h-screen'>
            {
                loading ?
                    <div className='flex max-w-screen-lg'>
                        <Nav pageName='Dashboard'/>
                            <ResponsiveContainer width="100%" height="100%">
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
                                    <Bar dataKey="pv" fill="#8884d8" />
                                    <Bar dataKey="uv" fill="#82ca9d" />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    :
                    <Spinner color='blue' />
            }
        </div>
    )
}

export default Dashboard