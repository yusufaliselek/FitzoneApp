import React from 'react'
import { useParams } from 'react-router-dom'
import Nav from '../components/Nav/Nav';

interface Param {
    id: string;
}

const CoachDetail = () => {
    const asd: any = useParams();
    const params: Param = asd
    return (
        <div className='flex w-screen h-screen'>
            {/* Navbar */}
            <Nav pageName='Antrenörler' />
            <div className='flex flex-col w-full h-screen p-5 items-center align-middle pt-20'>
                {/* Coach Detail */}
                <div className='flex flex-col gap-y-4 items-center w-10/12 shadow-[rgba(0,0,0,0.35)_0px_1px_2px_0px,rgba(60,64,67,0.15)_0px_2px_6px_2px] p-5'>
                    <div>
                        <div className='flex flex-col gap-y-4 items-center'>
                            <img src="https://source.unsplash.com/150x150/?portrait?3" alt="" className="w-32 h-32 mx-auto rounded-full dark:bg-gray-500 aspect-square  border-solid border-2 p-1" />
                            <p className='text-lg'>{params.id}</p>
                        </div>
                    </div>
                    <div className='w-full p-2'>
                        <p className='text-zinc-500 text-xs'>Biyografi</p>
                        <p className='text-sm'>Lorem ipsum dolor sit amet consectetur adipisicing elit. At dolorum necessitatibus sed, molestias omnis perferendis ut excepturi, rem voluptatibus beatae totam voluptatum vitae ipsa quo iusto ab accusamus dignissimos recusandae ex, facere expedita reprehenderit laboriosam eos? Quidem itaque dolor consequatur inventore expedita. Corrupti ullam architecto laborum saepe, aliquam ratione placeat in consequatur. Debitis, illo eum sapiente quas architecto error magni repellat, officia ducimus deleniti laborum vel modi necessitatibus provident quam quibusdam distinctio odio voluptate. Neque delectus molestiae magni unde dicta a explicabo libero! Reiciendis fugit quibusdam dolorum velit natus vel ipsam voluptatum minus at, aperiam expedita repudiandae. In, iure nemo!</p>
                    </div>
                    <div className='w-full p-2'>
                        <p className='text-zinc-500 text-xs'>Yeterlilikler</p>
                        <ul className='text-sm'>
                            <li>MapFunction</li>
                        </ul>
                    </div>
                    <div className='w-full p-2'>
                        <p className='text-zinc-500 text-xs'>Lisanslar</p>
                        <ul className='text-sm'>
                            <li>MapFunction</li>
                        </ul>
                    </div>
                    <div className='w-full p-2'>
                        <p className='text-zinc-500 text-xs'>Kulüpler</p>
                        <ul className='text-sm'>
                            <li>MapFunction</li>
                        </ul>
                    </div>
                    <div className='w-full p-2'>
                        <p className='text-zinc-500 text-xs'>Telefon</p>
                        <ul className='text-sm'>
                            <li>05307302325</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CoachDetail