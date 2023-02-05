import React from 'react'
import { RiAccountCircleLine } from 'react-icons/ri'

const Header = ({pageName}: {pageName:string}) => {
  return (
    <div className='px-5 '>
      <div className='flex w-full h-16 justify-between items-center border-b-2 border-gray-200 text-sm'>
        <span className='text-gray-400 font-light text-2xl'>
          {pageName}
        </span>
        <div className='flex text-gray-400 hover:bg-gray-400 hover:text-white px-5 py-1 items-center space-x-4 rounded-md cursor-pointer'>
          <span>Yusuf Ali Selek</span>
          <RiAccountCircleLine className='h-8 w-8' />
        </div>
      </div>
    </div>
  )
}

export default Header