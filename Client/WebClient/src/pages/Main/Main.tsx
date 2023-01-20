import React from 'react'
import Nav from '../../components/Nav/Nav'
import fitzonebg from '../../assets/fitzonebg.gif';

const Main = () => {
  return (
    <div className='flex'>
      <Nav />
      <div className={`object-cover w-full h-full relative`}>
        <img src={fitzonebg} alt="description of" className={`object-cover w-full h-full absolute`} />
        <div className='relative  min-w-screen min-h-screen'>asddsa</div>
      </div>
    </div>
  )
}

export default Main