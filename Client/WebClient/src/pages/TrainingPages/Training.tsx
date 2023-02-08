import React from 'react'
import { CgGym } from 'react-icons/cg'
import AddContentHeader from '../../components/Header/AddContentHeader'
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
                <AddContentHeader pageName='Antrenmanlar' addContent='Antrenman Ekle' addContentIcon={<CgGym className='h-8 w-8' />} addContentAction={getTraining} />
                <div className='p-10 flex flex-wrap gap-16 justify-center' style={{ height: 'auto', overflowY: 'scroll' }}>

                </div>
            </div>
        </div>
    )
}

export default Training