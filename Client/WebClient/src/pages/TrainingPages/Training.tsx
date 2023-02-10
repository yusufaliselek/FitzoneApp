import React from 'react'
import AddContentHeader from '../../components/Header/AddContentHeader'
import Nav from '../../components/Nav/Nav'
import TrainingPackCard from '../../components/Training/TrainingPackCard'

const Training = () => {

    function getTraining() {

    }

    return (
        <div className='flex w-screen h-screen'>
            {/* Navbar */}
            <Nav pageName='Antrenmanlar' />
            <div className='flex flex-col w-full h-screen'>
                {/* Header */}
                <AddContentHeader pageName='Antrenmanlar' />
                <div className='flex w-full h-full p-10 gap-16 justify-center md:grid-cols-4 xs:grid-cols-1 flex-wrap overflow-y-scroll'>
                    <TrainingPackCard trainingPackName='Günlük Antrenman Paketi' trainingPackPhoto='https://source.unsplash.com/500x500/?activity?1' />
                    <TrainingPackCard trainingPackName='Haftalık Antrenman Paketi' trainingPackPhoto='https://source.unsplash.com/500x500/?activity?2' />
                    <TrainingPackCard trainingPackName='Aylık Antrenman Paketi' trainingPackPhoto='https://source.unsplash.com/500x500/?activity?3' />
                    <TrainingPackCard trainingPackName='Günlük Antrenman Paketi' trainingPackPhoto='https://source.unsplash.com/500x500/?activity?1' />
                    <TrainingPackCard trainingPackName='Haftalık Antrenman Paketi' trainingPackPhoto='https://source.unsplash.com/500x500/?activity?2' />
                    <TrainingPackCard trainingPackName='Aylık Antrenman Paketi' trainingPackPhoto='https://source.unsplash.com/500x500/?activity?3' />
                    <TrainingPackCard trainingPackName='Günlük Antrenman Paketi' trainingPackPhoto='https://source.unsplash.com/500x500/?activity?1' />
                    <TrainingPackCard trainingPackName='Haftalık Antrenman Paketi' trainingPackPhoto='https://source.unsplash.com/500x500/?activity?2' />
                    <TrainingPackCard trainingPackName='Aylık Antrenman Paketi' trainingPackPhoto='https://source.unsplash.com/500x500/?activity?3' />
                </div>
            </div>
        </div>
    )
}

export default Training