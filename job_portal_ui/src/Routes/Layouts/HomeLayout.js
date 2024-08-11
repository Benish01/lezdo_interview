
import React, { useEffect } from "react"
import { Outlet, useNavigate } from "react-router"
import Header from "../../Components/Header"
import SideBar from "../../Components/SideBar"
import { Box } from "@mui/material"
import { useDispatch } from "react-redux"
import { changeHeaderSlice } from "../../Redux/Slices/HeaderSlice"
import CustomNotify from "../../Components/CustomComonents/CustomNotify"

const HomeLayOut = ()=>{

    const navigate = useNavigate()
    const dispatch =useDispatch()

    useEffect(()=>{
        dispatch(changeHeaderSlice({selectedMenuIdx:1}))
        navigate('/job_openings')
    },[])


    return(
        <React.Fragment>
            <Box sx={{  width:'100%', position:'relative'}}>
                <Box position={'fixed'} sx={{zIndex:1100}}><SideBar /></Box>
                <Box sx={{ paddingLeft:'64px' }}>
                    <Header />
                    <Box component="main" sx={{  width:'100%' ,}}>
                        <Outlet />
                        <CustomNotify/>
                    </Box>
                </Box>
            </Box>
    </React.Fragment>
    )

}

export default HomeLayOut