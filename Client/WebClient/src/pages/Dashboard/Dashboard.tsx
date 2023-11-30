import React, { useEffect } from 'react';
import Header from '../../components/Header/Header';
import Nav from '../../components/Nav/Nav';
import RefreshToken from '../../utils/funcs/RefreshToken';


const Dashboard = () => {


    useEffect(() => {
        RefreshToken();
    }, [])

    return (
        <>
            {
                <div className='flex w-full h-full overflow-hidden'>
                    {/*Navbar*/}
                    <Nav pageName='Dashboard' />
                    <div className='flex-row w-full h-full'>
                        {/*Header*/}
                        <Header pageName='Dashboard' />
                        {/*Content*/}
                        <div className='xl:grid xl:grid-cols-3 flex flex-wrap gap-4 w-full py-10 overflow-y-scroll h-full'>
                            DASHBOARD
                        </div>
                    </div>

                </div>
            }
        </>
    )
}

export default Dashboard