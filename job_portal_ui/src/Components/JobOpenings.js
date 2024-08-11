
import { Box, Button, Grid, Typography } from "@mui/material"
import React, { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import ListJob from "./ListJobs"
import CreateJob from "./CreateJob"
import { changeHeaderSlice } from "../Redux/Slices/HeaderSlice"




const JobOpenings = ()=>{


    const {ListJobs, CreateJobs} = useSelector(state=>state.HeaderSlice)
    // const[create_job,setcreate_job] = useState(false)

    const dispatch = useDispatch()

    const title_style = {
        display:'flex',
        alignItems:'center',
        padding:3,
        backgroundColor:'#F6F6F6',
        height:'50px',
        // mt:2
    }

    

    return(
        <React.Fragment>

          
            {CreateJobs ?
                <CreateJob/>
            :
            ListJobs ?
                <ListJob/>
              :
            <>
           
           
            <Box>
                <Box sx={title_style}>
                    <Typography variant="jost_18_semi_bold">Job Openings</Typography>
                </Box>
                <Box sx={{textAlign:"center"}}>
                    <Box className='job_opening_img_section'>
                        <img src={'create_job.png'} alt="img" style={{width:'25%'}}/>

                    </Box>
                    <Typography variant="jost_16_medium" >Create and showcase all Job Openings on your website and job boards</Typography>
                    {/* <Box className='d-flex m-auto justify-content-around p-4' sx={{width:'20%'}}>

                        <Button variant="app_button" onClick={()=>{setcreate_job(true)}}>Create Job</Button>
                        <Button variant="app_button">Import Job</Button>
                    </Box> */}
                    <Grid container spacing={2} display={'flex'} alignItems={'center'}>
                        <Grid item xs={6} md={6} display={'flex'}  justifyContent={'end'}
                            >
                            <Grid><Button variant="app_button" onClick={()=>dispatch(changeHeaderSlice({CreateJobs:true}))}>Create Job</Button></Grid>
                        </Grid>
                        <Grid item xs={6} md={6} display={'flex'} justifyContent={'start'}>
                            <Grid ><Button variant="app_button">Import Job</Button></Grid>
                        </Grid>

                    </Grid>

                </Box>
            </Box>
         
           </>}

        </React.Fragment>
    )
}


export default JobOpenings