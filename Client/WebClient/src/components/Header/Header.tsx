import React, { useEffect } from 'react';
import AccountMenu from '../AccountMenu/AccountMenu';
import { decodeJwt } from 'jose';
import Cookies from 'js-cookie';
import FButton from '../Button/FButton';

const Header = ({
  pageName, addContent, addContentIcon, addContentAction }
  :
  { pageName: string, addContent?: string, addContentIcon?: JSX.Element, addContentAction?: any }) => {

  const [name, setName] = React.useState('');

  useEffect(() => {
    const token = Cookies.get('token');
    if (token) {
      const decodedToken = decodeJwt(token);
      setName(String(decodedToken.unique_name));
    }
  }, []);

  return (
    <div className='px-5 items-start'>
      <div className='flex w-full h-16 justify-between items-center text-sm shadow-[rgba(33,35,38,0.1)_0px_10px_10px_-10px]'>
        <span className='text-blue-800 font-light text-2xl'>
          {pageName}
        </span>
        <div className='flex items-center'>
          {addContent != null &&
            <FButton onClick={addContentAction} text={addContent} icon={addContentIcon} />
          }
          <div className='flex text-blue-800 px-1 md:px-5 py-1 items-center space-x-1 md:space-x-4 rounded-md '>
            {
              AccountMenu({
                accountName: name
              })
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default Header;