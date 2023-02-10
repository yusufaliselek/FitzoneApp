import React from 'react'

const TrainingPackCard = ({ trainingPackName, trainingPackPhoto }: { trainingPackName: string, trainingPackPhoto: string }) => {
    return (
        <div className='md:w-80 md:h-80 w-40 h-40 relative rounded-sm'>
            <div className='absolute inset-0 z-10 bg-black text-center text-white flex flex-col items-center justify-center opacity-100 bg-opacity-20 hover:bg-opacity-40 duration-300 cursor-pointer rounded-sm'>
                {trainingPackName}
            </div>
            <img className='relative rounded-sm' src={trainingPackPhoto} />
        </div>

    )
}

export default TrainingPackCard