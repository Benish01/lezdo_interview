import { AppBar, Avatar, Badge, Button, Grid, IconButton, InputAdornment, Menu, MenuItem, TextField, Toolbar, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import { useTheme } from '@emotion/react';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import AccountCircle from '@mui/icons-material/AccountCircle';
import AddIcon from '@mui/icons-material/Add';
import SettingsIcon from '@mui/icons-material/Settings';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import { useDispatch, useSelector } from 'react-redux';
import { changeHeaderSlice } from '../Redux/Slices/HeaderSlice';
import { IoIosNotificationsOutline } from "react-icons/io";
import { IoSettingsOutline } from "react-icons/io5";
import { IoNotificationsOutline } from "react-icons/io5";
import { useState } from 'react';





const Header = ()=>{

    const theme = useTheme();
    const dispatch = useDispatch();
    const {DrawerState, DrawerWidth, HeaderMenus} = useSelector(state=>state.HeaderSlice);

    const [menu_open, setMenuopen] = useState(false)
    const [menu_anchor, set_menu_anchor] = useState(true)
    const header_serach_style = {
                                width:'100%',  
                                '& .MuiOutlinedInput-root': {
                                            '& fieldset': {
                                            border: 'none', 
                                            },
                                            '&:hover fieldset': {
                                            border: 'none', 
                                            },
                                            '&.Mui-focused fieldset': {
                                            border: 'none',
                                            },
                                    },
    }

    const handleMenuClick = ()=>{
        dispatch(changeHeaderSlice({DrawerState:!DrawerState}))
    }


    const handleHeaderMenuState = (option)=>{
        setMenuopen(option)
        set_menu_anchor(null)
    }

    const handleMenuItemClick = (item)=>{
        if(item.key == 'job_opening'){
            dispatch(changeHeaderSlice({CreateJobs:true, ListJobs:false}))
        }
        handleHeaderMenuState(false)

    }

    const header_menu = ()=>{
        return(
            <Box>
                <Menu open={menu_open} onClose={()=>handleHeaderMenuState(false)} id='menu-button' anchorEl={menu_anchor} sx={{padding:'5px'}}>
                    {HeaderMenus.map((val, idx)=>
                        <MenuItem onClick={()=>handleMenuItemClick(val)} sx={{'&:hover':{backgroundColor:''}}}>
                            <Grid container display={'flex'} alignContent={'center'} spacing={3}>
                                <Grid item xs={3}>
                                    <AddIcon fontSize='small'/>
                                </Grid>
                                <Grid item xs={9}>
                                    <Typography variant='jost_normal'>{val.label}</Typography>
                                </Grid>

                            </Grid>
                            
                        </MenuItem>)}
                </Menu>
            </Box>
        )
    }



    return (
        
            <AppBar position='sticky' sx={{backgroundColor:theme.palette.primary.light,  width: '100%', zIndex:1000 , top:'0px', height:'64px' }}>
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                        onClick={()=>handleMenuClick(true)}
                    >
                            <MenuIcon />
                    </IconButton>

                    <Box sx={{width:'25vw'}}>
                        <TextField
                            id="header_serach"
                            placeholder='Search Here'
                            InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <SearchIcon/>
                                </InputAdornment>
                            ),
                            sx:{
                                borderRadius:'25px',
                                height:'40px',
                                backgroundColor:"#F6F6F6",
                                
                            }
                            }}
                            variant="outlined"
                            sx={header_serach_style}
                        />
                    </Box>

                    <Box sx={{ flexGrow: 1 }} />
                        <Box sx={{ display: {  md: 'flex' }, gap:2 , alignItems:'center'}}>
                            
                                <Button variant='app_button' 
                                sx={{borderRadius:'25px', height:'33px'}} 
                                startIcon={<AddIcon/>} onClick={(e)=>{handleHeaderMenuState(true);set_menu_anchor(e.currentTarget)}} aria-controls='menu-button'
                                aria-expanded={menu_open ? "true":undefined}
                                aria-haspopup="true"
                                
                                >
                                    
                                    Create
                                
                                </Button>
                            
                            <IconButton
                                size="large"
                                edge="end"
    
                            >
                        
                                 <IoNotificationsOutline size={30}  color={theme.palette.primary.dark}/>
                            </IconButton>
                            <IconButton
                                size="large"
                                edge="end"
                                >
                                 <IoSettingsOutline size={30}  color={theme.palette.primary.dark}/>
                            </IconButton>
                            <IconButton
                                size="large"
                                edge="end"
                                >
                                <Avatar   sx={{color:theme.palette.primary.dark}}/>
                            </IconButton>
                        </Box>
            
            

                </Toolbar>

                {header_menu()}
            </AppBar>

        
    )
}

export default Header