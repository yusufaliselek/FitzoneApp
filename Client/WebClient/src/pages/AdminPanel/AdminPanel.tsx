import React, { useState, useEffect } from 'react'
import Nav from '../../components/Nav/Nav'
import FitzoneHeader from '../../components/Header/FitzoneHeader'
import { Box, Tab, Tabs } from '@mui/material';
import { FitzoneApi } from '../../services/fitzoneApi';
import { IGetTrainerDetailById } from '../../types/Types';
import { DataGrid, GridColDef } from '@mui/x-data-grid';


interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}


function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box>
                    <div>{children}</div>
                </Box>
            )}
        </div>
    );
}

function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

const AdminPanel = () => {

    const [value, setValue] = useState(0);
    const [trainerPermissions, setTrainerPermissions] = useState<IGetTrainerDetailById[]>([]);

    useEffect(() => {
        FitzoneApi.GetAllTrainerPermission().then(res => {
            setTrainerPermissions(res.data)
        })
    }, [])


    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    const columns: GridColDef[] = [
        {
            field: 'name',
            headerName: 'Yetki Adı',
            flex: 1,
            minWidth: 200,
        },
        {
            field: 'canCreateUser',
            headerName: 'Kullanıcı Oluşturma',
            flex: 1,
            renderCell: (params) => {
                return (
                    <div>
                        {params.row.canCreateUser ? 'Evet' : 'Hayır'}
                    </div>
                )
            }
        }
    ]



    return (
        <div className='flex w-screen h-screen'>
            {/* Navbar */}
            <Nav pageName='' />
            <div className='flex flex-col w-full h-screen'>
                {/* Header */}
                <FitzoneHeader pageName='Admin Paneli' />
                <Box sx={{ width: '100%', paddingX: 2, overflowY: "auto", height: "calc(100vh-112px)" }}>
                    <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                        <Tab label="Yetki Altyapısı" {...a11yProps(0)} />
                        <Tab label="Güvenlik Ayarlarım" {...a11yProps(1)} />
                    </Tabs>
                    <TabPanel value={value} index={0}>
                        <div className='w-full h-[calc(100vh-112px)] overflow-y-auto flex flex-col gap-2 items-center'>
                            <div className='w-full mt-5 flex'>
                                <div className='w-[80%]'>
                                    <input type="text" placeholder='arama' />
                                </div>
                                <div className='w-[20%]'>
                                    <button>yetki ekle</button>
                                </div>
                            </div>
                            <div className='w-full h-full'>
                                <DataGrid rows={trainerPermissions} columns={columns} pageSize={10} />
                            </div>
                        </div>
                    </TabPanel>
                    <TabPanel value={value} index={1}>

                    </TabPanel>
                </Box>
            </div>
        </div >
    )
}

export default AdminPanel