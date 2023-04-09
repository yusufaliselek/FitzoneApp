import React from 'react';
import AccountMenu from '../AccountMenu/AccountMenu';

const FitzoneHeader = ({ pageName, addContent, addContentIcon, addContentAction }: { pageName: string, addContent?: string, addContentIcon?: JSX.Element, addContentAction?: any }) => {
  return (
    <div className='px-5 items-start'>
      <div className='flex w-full h-16 justify-between items-center text-sm shadow-[rgba(33,35,38,0.1)_0px_10px_10px_-10px]'>
        <span className='text-blue-800 font-light text-2xl'>
          {pageName}
        </span>
        <div className='flex'>
          {addContent != null &&
            <div onClick={addContentAction} className={`flex hover:text-blue-800 hover:bg-white bg-blue-800 text-white px-5 py-1 items-center space-x-4 rounded-md cursor-pointer transition-all duration-700`}>
              <span>{addContent}</span>
              {addContentIcon}
            </div>
          }
          <div className='flex text-blue-800 px-1 md:px-5 py-1 items-center space-x-1 md:space-x-4 rounded-md '>
            {AccountMenu({ firstName: String(localStorage.getItem("username")), lastName: String(localStorage.getItem("username")) })}
          </div>
        </div>
      </div>
    </div>
  )
}

export default FitzoneHeader;