import React, { useState, useEffect } from 'react'
import Nav from '../components/Nav/Nav';
import Spinner from '../components/Spinner/Spinner';


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
                    <div className='flex'>
                        <Nav />
                        <div className='flex items-center w-full justify-center'>
                            <h1>asd</h1>
                        </div>
                    </div>
                    :
                    <Spinner color='blue'/>
            }
        </div>
    )
}

export default Dashboard