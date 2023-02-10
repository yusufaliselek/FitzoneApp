import React from 'react'

const MemberCard = ({ name, surname, memberRegistrationDate, memberType }: { name: string, surname: string, memberRegistrationDate: string, memberType: string }) => {
    return (
        <div className='flex w-full h-10 gap-x-2 items-center hover:shadow-[0_1px_4px_rgba(0,0,0,0.2)] transition-shadow duration-100 cursor-pointer py-2'>
            <div className='w-[30%]'>
                {name} {surname}
            </div>
            <div className='w-[10%]'>
                {memberRegistrationDate}
            </div>
            <div className='w-[10%]'>
                {memberType}
            </div>
            <div className='w-[40%]'>
                <button>
                    action
                </button>
            </div>
        </div>
    )
}

export default MemberCard