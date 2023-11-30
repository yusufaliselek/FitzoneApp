import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Tooltip from '@mui/material/Tooltip';
import Cookies from 'js-cookie';
import React, { useEffect, useState } from 'react';
import { CiLogout } from 'react-icons/ci';
import { RiSettings4Line } from 'react-icons/ri';
import { MdOutlineAdminPanelSettings } from 'react-icons/md';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import { decodeJwt } from 'jose';
import clearTokens from '../../utils/funcs/ClearTokens';

const PaperProps = {
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
        }
    }
};

export const AccountMenu = ({ accountName }: { accountName: string }) => {

    const navigate: NavigateFunction = useNavigate();
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [isAdmin, setIsAdmin] = useState<boolean>(false);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleNavigate = (path: string) => {
        if (path === "/logout") {
            clearTokens();
        }
        handleClose();
        navigate(path);
    }

    const menuItems = [
        {
            title: "Admin Paneli",
            icon: <MdOutlineAdminPanelSettings size={25} />,
            path: "/admin"
        },
        {
            title: "Ayarlar",
            icon: <RiSettings4Line size={25} />,
            path: "/settings"
        },
        {
            title: "Çıkış Yap",
            icon: <CiLogout size={25} />,
            path: "/logout"
        },
    ];

    useEffect(() => {

        if (!Cookies.get('token')) {
            navigate('/login');
        }
        const token = Cookies.get('token');
        if (token) {
            const payload = decodeJwt(token);
            setIsAdmin(payload.typ === 'admin');
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

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
                PaperProps={PaperProps}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
                <MenuItem style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <span>{accountName}</span>
                </MenuItem>
                <Divider />
                {menuItems.map((item, index) => {
                    if (item.title === "Admin Paneli" && !isAdmin) {
                        return null;
                    }
                    return (
                        <MenuItem key={index} onClick={() => handleNavigate(item.path)}>
                            <ListItemIcon>
                                {item.icon}
                            </ListItemIcon>
                            <span>{item.title}</span>
                        </MenuItem>
                    )
                })}
            </Menu>
        </div>
    );
}

export default AccountMenu;