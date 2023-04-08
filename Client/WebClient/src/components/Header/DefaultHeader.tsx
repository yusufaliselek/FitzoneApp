import React from 'react';
import AccountMenu from '../AccountMenu/AccountMenu';

const DefaultHeader = ({ pageName, DefaultName, DefaultIcon }: { pageName: string, DefaultName?: string, DefaultIcon?: JSX.Element }) => {
    return (
        <div className='px-5 '>
            <div className='flex w-full h-16 justify-between items-center shadow-[rgba(33,35,38,0.1)_0px_10px_10px_-10px] text-sm'>
                <span className='text-blue-800 font-light text-2xl'>
                    {pageName}
                </span>
                <div className='flex text-blue-800 px-1 md:px-5 py-1 items-center space-x-1 md:space-x-4 rounded-md '>
                    {AccountMenu({ userName: "sa", userImage: "sa"})}
                </div>
            </div>
        </div>
    )
}

export default DefaultHeader