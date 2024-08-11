import React, { useState } from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, IconButton, Box, ListItemButton, Typography } from '@mui/material';
import BusinessCenterOutlinedIcon from '@mui/icons-material/BusinessCenterOutlined';
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import { useDispatch, useSelector } from 'react-redux';
import { changeHeaderSlice } from '../Redux/Slices/HeaderSlice';
import { useTheme } from '@emotion/react';
import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined';
import { useNavigate } from 'react-router';
import { MdOutlineDashboard } from "react-icons/md";
import { RiDashboardLine } from "react-icons/ri";
import { TbLayoutDashboard } from "react-icons/tb";
import { PiSuitcaseSimpleThin } from "react-icons/pi";
import { GrUserManager } from "react-icons/gr";
import { GrGroup } from "react-icons/gr";
import { TbCheckbox } from "react-icons/tb";
import { IoMailOpenOutline } from "react-icons/io5";
import { PiBuildingApartmentLight } from "react-icons/pi";
import { TbUserDollar } from "react-icons/tb";
import { LiaClipboardListSolid } from "react-icons/lia";
import { TbClipboardList } from "react-icons/tb";
import { AiOutlineUsergroupAdd } from "react-icons/ai";
import { CiGrid42 } from "react-icons/ci";
import { CiUser } from "react-icons/ci";
import { HiOutlineUserGroup } from "react-icons/hi2";

const SideBar = () => {
  // const [DrawerState, setDrawerState] = useState(false);

  const {DrawerState, selectedMenuIdx, DrawerWidth} = useSelector(state=>state.HeaderSlice);

  const theme = useTheme();

  const dispatch = useDispatch();

  const navigate = useNavigate()

  const handleMenuClick = (idx, navigate_to = '/')=>{
    dispatch(changeHeaderSlice({selectedMenuIdx:idx}))
    navigate(navigate_to)
  }

  const drawerList = [
    {
      text: 'Home',
      // icon: <DashboardOutlinedIcon />,
      icon: <CiGrid42 strokeWidth={0.1} size={25}/>,
      link:'/'
    },
    {
      text: 'Job Openings',
      // icon: <BusinessCenterOutlinedIcon />,
      icon:<PiSuitcaseSimpleThin strokeWidth={2} size={25}/>,
      link:'/job_openings'
    },
    {
      text: 'Candidates',
      // icon: <GroupsOutlinedIcon />,
      icon:<HiOutlineUserGroup size={25} strokeWidth={1.5}/>,
      link:'/'
    },
    {
      text: 'Job Applications',
      // icon: <DashboardOutlinedIcon />,
      icon:<CiUser strokeWidth={0.3} size={25}/>,
      link:'/'
    },
    {
      text: 'Interviews',
      icon: <CiGrid42  size={25} strokeWidth={0.4}/>,
      link:'/'
    },
    {
      text: 'Assessments',
      // icon: <DashboardOutlinedIcon />,
      icon:<TbCheckbox strokeWidth={1.5} size={25}/>,
      link:'/'
    },
    {
      text: 'Offers',
      // icon: <DashboardOutlinedIcon />,
      icon:<IoMailOpenOutline strokeWidth={1.5} size={25}/>,
      link:'/'
    },
    {
      text: 'Departments',
      // icon: <DashboardOutlinedIcon />,
      icon:<PiBuildingApartmentLight strokeWidth={1.5} size={25}/>,
      link:'/'
    },
    {
      text: 'Vendors',
      // icon: <DashboardOutlinedIcon />,
      icon:<TbUserDollar strokeWidth={1.5} size={25}/>,
      link:'/'
    },
    {
      text: 'Refferals',
      // icon: <DashboardOutlinedIcon />,
      icon:<AiOutlineUsergroupAdd strokeWidth={1.5} size={25}/>,
      link:'/'
    },
    {
      text: "To do's",
      // icon: <DashboardOutlinedIcon />,
      icon:<TbClipboardList strokeWidth={1.5} size={25}/>,
      link:'/'
    }
  ];

  const handleMouse = (open) => {
    dispatch(changeHeaderSlice({DrawerState:open}));
  };

  const getDrawerList = () => {
    return (
      <Box>
         <Box
          sx={{
            display: 'flex',
            justifyContent: DrawerState ? 'initial' : 'center',
            alignItems: 'center',
            height: '70px',
            padding: '10px',
            transition: 'padding 0.3s',
            mb:1
          }}
        >
          {
            DrawerState ? 
              <img
              src={'header_full.png'}
              alt="Logo"
              style={{
                height: '48px',
                // width: 'auto',
                transition: 'height 0.3s',
                marginLeft: DrawerState ? 0 : 'auto',
                marginRight: DrawerState ? 0 : 'auto',
              }}
            />:
            <img
              src={'header.png'}
              alt="Logo"
              style={{
                height: '48px',
                // width: 'auto',
                transition: 'height 0.3s',
                marginLeft: DrawerState ? 0 : 'auto',
                marginRight: DrawerState ? 0 : 'auto',
              }}
            />
          }
        </Box>

        <List>
        {drawerList.map((val, idx) => (
          <ListItem key={idx} disablePadding sx={{ display: 'block' , backgroundColor: selectedMenuIdx == idx ? theme.palette.secondary.main : null, color: selectedMenuIdx == idx ? theme.palette.primary.contrastText : theme.palette.primary.dark}}>
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: DrawerState ? 'initial' : 'center',
                px: 2.5,
                py:1.5
              }}
              onClick = {()=>handleMenuClick(idx, val.link)}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: DrawerState ? 2: 'auto',
                  justifyContent: 'center',
                  color: selectedMenuIdx == idx ? theme.palette.primary.contrastText : theme.palette.primary.dark
                }}
              >
                <Typography>{val.icon}</Typography>
              </ListItemIcon>
              {DrawerState && <ListItemText primary={val.text} />}
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      </Box>
     
    );
  };

  return (
    <Box sx={{ display: 'flex', height: '100vh' }}>
      <Drawer
        variant="permanent"
        open={DrawerState}
        onMouseEnter={() => handleMouse(true)}
        onMouseLeave={() => handleMouse(false)}
        // sx={{
        //   width: DrawerState ? 240 : 60,
        //   transition: 'width 0.3s',
        //   '& .MuiDrawer-paper': {
        //     width: DrawerState ? 240 : 60,
        //     transition: 'width 0.3s',
        //     overflowX: 'hidden',
        //     boxSizing: 'border-box',
        //   },
        // }}
        sx={{
          width: DrawerState ? DrawerWidth : '64px',
          flexShrink: 0,
          '& .MuiDrawer-paper': {
              width: DrawerState ? DrawerWidth : '64px',
              boxSizing: 'border-box',
            
          },
      }}

      >
        {getDrawerList()}
      </Drawer>
    </Box>
  );
};

export default SideBar;





