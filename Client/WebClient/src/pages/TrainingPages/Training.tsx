import React from 'react'
import Header from '../../components/Header/Header'
import Nav from '../../components/Nav/Nav'
const Training = () => {

    function getTraining() {

    }

    return (
        <div className='flex w-screen h-screen'>
            {/* Navbar */}
            <Nav pageName='Antrenmanlar' />
            <div className='flex flex-col w-full h-screen'>
                {/* Header */}
                <Header pageName='Antrenmanlar' />
                <div className='flex w-full h-full p-10 gap-16 justify-center md:grid-cols-4 xs:grid-cols-1 flex-wrap overflow-y-scroll'>
                   
                </div>
            </div>
        </div>
    )
}

export default Training