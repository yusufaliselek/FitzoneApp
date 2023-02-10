import React from 'react';

const AddContentHeader = ({ pageName, addContent, addContentIcon, addContentAction }: { pageName: string, addContent?: string, addContentIcon?: JSX.Element, addContentAction?: any }) => {
  return (
    <div className='px-5 items-start'>
      <div className='flex w-full h-16 justify-between items-center text-sm shadow-[rgba(33,35,38,0.1)_0px_10px_10px_-10px]'>
        <span className='text-gray-400 font-light text-2xl'>
          {pageName}
        </span>
        {addContent != null &&
          <div onClick={addContentAction} className='flex hover:text-gray-400 hover:bg-white bg-gray-400 text-white px-5 py-1 items-center space-x-4 rounded-md cursor-pointer transition-all duration-300'>
            <span>{addContent}</span>
            {addContentIcon}
          </div>
        }
      </div>
    </div>
  )
}

export default AddContentHeader