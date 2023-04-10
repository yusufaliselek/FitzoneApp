import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import { RiAccountCircleLine } from 'react-icons/ri';
import { Bar, BarChart, CartesianGrid, Legend, Tooltip, XAxis, YAxis } from 'recharts';
import FitzoneHeader from '../components/Header/FitzoneHeader';
import Nav from '../components/Nav/Nav';
import { FitzoneApi } from '../services/fitzoneApi';


const value: any[] = [
    [
        {
            name: 'Makine 10',
            uv: 4000,
            pv: 1400,
        },
        {
            name: 'Makine 11',
            uv: 3000,
            pv: 1398,
        },
        {
            name: 'Makine 8',
            uv: 2000,
            pv: 5800,
        },
        {
            name: 'Makine 6',
            uv: 2780,
            pv: 3908,
        },
        {
            name: 'Makine 9',
            uv: 1890,
            pv: 6800,
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
    ],
    [
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
            pv: 7800,
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
    ],
    [
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
            pv: 2800,
        },
        {
            name: 'Makine 3',
            uv: 3490,
            pv: 4300,
        },
    ],
    [
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
    ],
    [
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
    ],
    [
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
    ],
]

const Dashboard = () => {
    const navigate = useNavigate()
    const RefreshToken = async () => {
       if (!Cookies.get('token')) {
            return FitzoneApi.ResfreshAccessTokenByRefreshToken().then((response) => {
                Cookies.set('token', response.data.accessToken, { expires: new Date(response.data.accessTokenExpiration) });
                Cookies.set('refreshToken', response.data.refreshToken, { expires: new Date(response.data.refreshTokenExpiration) });
                console.log("Token yenilendi");
            }).catch((error) => {
                console.log(error)
                Cookies.remove('token');
                Cookies.remove('refreshToken');
                navigate('/login')
                console.log("Token süresi dolmuş");
            });
        }
    }

    useEffect(() => {
        RefreshToken()
    }, [])
    return (
        <>
            {
                <div className='flex w-full h-full overflow-hidden'>
                    {/*Navbar*/}
                    <Nav pageName='Dashboard' />
                    <div className='flex-row w-full h-full'>
                        {/*Header*/}
                        <FitzoneHeader pageName='Dashboard' />
                        {/*Content*/}
                        <div className='xl:grid xl:grid-cols-3 flex flex-wrap gap-4 w-full py-10 overflow-y-scroll h-full'>
                            {value.map((item) =>
                                <BarChart
                                    width={500}
                                    height={300}
                                    data={item}
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
                                    <Bar dataKey="pv" fill="blue" />
                                    <Bar dataKey="uv" fill="#8FBC8F" />
                                </BarChart>
                            )}
                        </div>
                    </div>

                </div>
            }
        </>
    )
}

export default Dashboard