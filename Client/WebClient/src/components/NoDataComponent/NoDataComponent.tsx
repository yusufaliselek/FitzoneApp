import React from 'react'

const NoDataComponent = ({ text }: { text: string }) => {
    return (
        <div 
        className='w-full border border-solid border-gray-100 rounded-md p-4 text-gray-500 text-sm'>{text}</div>
    )
}

export default NoDataComponent