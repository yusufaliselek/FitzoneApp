import React from 'react';

const DefaultHeader = ({ pageName, DefaultName, DefaultIcon }: { pageName: string, DefaultName: string, DefaultIcon: JSX.Element }) => {
    return (
        <div className='px-5 '>
            <div className='flex w-full h-16 justify-between items-center border-b-2 border-gray-200 text-sm'>
                <span className='text-gray-400 font-light text-2xl'>
                    {pageName}
                </span>
                <div className='flex text-gray-400 px-1 md:px-5 py-1 items-center space-x-1 md:space-x-4 rounded-md '>
                    <span>{DefaultName}</span>
                    {DefaultIcon}
                </div>
            </div>
        </div>
    )
}

export default DefaultHeader