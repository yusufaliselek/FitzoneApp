import React from 'react'
import { AiOutlineCheckCircle } from 'react-icons/ai'

const IsCanDo = ({text}: {text: string}) => {
    return (
        <div className='flex flex-row w-128 h-10 items-center justify-center gap-x-7 shadow-[rgba(0,0,0,0.1)_0px_0px_5px_0px,rgba(0,0,0,0.1)_0px_0px_1px_0px] rounded-sm'>
            <span>{text}</span>
            <AiOutlineCheckCircle className='text-green-500' size={25} />
        </div>
    )
}

export default IsCanDo