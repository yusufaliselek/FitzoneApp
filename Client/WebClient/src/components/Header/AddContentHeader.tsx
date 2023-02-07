import React from 'react'
import { IconType } from 'react-icons/lib'
import { RiAccountCircleLine } from 'react-icons/ri'

const AddContentHeader = ({ pageName, addContent, addContentIcon, addContentAction }: { pageName: string, addContent: string, addContentIcon: JSX.Element, addContentAction: any }) => {
  return (
    <div className='px-5 '>
      <div className='flex w-full h-16 justify-between items-center border-b-2 border-gray-200 text-sm'>
        <span className='text-gray-400 font-light text-2xl'>
          {pageName}
        </span>
        <div onClick={addContentAction} className='flex hover:text-gray-400 hover:bg-white bg-gray-400 text-white px-5 py-1 items-center space-x-4 rounded-md cursor-pointer transition-all duration-300'>
          <span>{addContent}</span>
          {addContentIcon}
        </div>
      </div>
    </div>
  )
}

export default AddContentHeader