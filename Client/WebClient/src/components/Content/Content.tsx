import React from 'react'
import Nav from '../Nav/Nav'

const Content = ({ title, content }: { title: string, content: JSX.Element }) => {
    return (
        <div className='flex w-screen h-screen'>
            <Nav pageName={title} />
            {content}
        </div>

    )
}

export default Content