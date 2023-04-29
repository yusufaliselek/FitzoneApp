import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Tooltip from '@mui/material/Tooltip';
import Cookies from 'js-cookie';
import React, { useEffect } from 'react';
import { CiLogout } from 'react-icons/ci';
import { RiSettings4Line } from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';
import { FitzoneApi } from '../../services/fitzoneApi';
import { ObjectStrings, UserProps } from '../../types/Types';
import * as jose from 'jose';

export const AccountMenu = ({ accountName }: {accountName:string}) => {

    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const handleLogout = () => {
        Cookies.remove('token');
        Cookies.remove('refreshToken');
        localStorage.clear();
        handleClose();
        navigate('/login');
    };

    const handleSettings = () => {
        handleClose();
        navigate('/settings');
    }
    return (
        <div>
            <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
                <Tooltip title={accountName}>
                    <IconButton
                        onClick={handleClick}
                        size="small"
                        sx={{ padding: 1, color: 'rgb(30 64 175)', width: 32, height: 32, borderRadius: '50%', border: '1px solid rgb(30 64 175)' }}
                        aria-controls={open ? 'account-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                    >
                        {accountName.charAt(0).toUpperCase()}
                    </IconButton>
                </Tooltip>
            </Box>
            <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                PaperProps={{
                    elevation: 0,
                    sx: {
                        overflow: 'visible',
                        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                        mt: 1.5,
                        '& .MuiAvatar-root': {
                            width: 32,
                            height: 32,
                            ml: -0.5,
                            mr: 1,
                        },
                        '&:before': {
                            content: '""',
                            display: 'block',
                            position: 'absolute',
                            top: 0,
                            right: 14,
                            width: 10,
                            height: 10,
                            bgcolor: 'background.paper',
                            transform: 'translateY(-50%) rotate(45deg)',
                            zIndex: 0,
                        },
                    },
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
                <MenuItem className='gap-x-1'>
                     {accountName}
                </MenuItem>
                <Divider />
                <MenuItem onClick={handleSettings}>
                    <ListItemIcon>
                        <RiSettings4Line />
                    </ListItemIcon>
                    Ayarlar
                </MenuItem>
                <MenuItem onClick={handleLogout}>
                    <ListItemIcon>
                        <CiLogout />
                    </ListItemIcon>
                    Çıkış Yap
                </MenuItem>
            </Menu>
        </div>
    );
}

export default AccountMenu;