import React from 'react'
import { Rings } from 'react-loader-spinner';

const Spinner = ({color}: {color: string}) => {
  return (
    <div className='flex w-screen items-center justify-center relative'>
      <Rings
        height="80"
        width="80"
        color={color}
        radius="6"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
        ariaLabel="rings-loading"
      />
    </div>
  )
}

export default Spinner