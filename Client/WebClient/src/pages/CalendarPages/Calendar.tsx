import React from 'react'
import Nav from '../../components/Nav/Nav';
import AddContentHeader from '../../components/Header/Header';



const Calendar = () => {
    return (
        <div className='flex w-screen h-screen'>
            {/* Navbar */}
            <Nav pageName='Takvim' />
            <div className='flex flex-col w-full h-screen'>
                <AddContentHeader pageName='Takvim' />
                <div className=' overflow-scroll overscroll-x-none'>
                
                </div>

            </div>
        </div>
    )
}

export default Calendar