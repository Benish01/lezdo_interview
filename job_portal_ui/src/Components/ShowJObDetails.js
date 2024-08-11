import React, { useState } from 'react';
import { Avatar, Badge, Box, Button, FormControl, Grid, IconButton, InputLabel, List, ListItem, MenuItem, Select, TextField, Typography } from '@mui/material';
import CompressIcon from '@mui/icons-material/Compress';
import AddIcon from '@mui/icons-material/Add';
import { Edit } from '@mui/icons-material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ExpandCircleDownOutlinedIcon from '@mui/icons-material/ExpandCircleDownOutlined';
import { useTheme } from '@emotion/react';
import DifferenceOutlinedIcon from '@mui/icons-material/DifferenceOutlined';
import AddReactionOutlinedIcon from '@mui/icons-material/AddReactionOutlined';
import TelegramIcon from '@mui/icons-material/Telegram';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import FilterComponent from './FilterComponent';
import OpenInFullIcon from '@mui/icons-material/OpenInFull';
import { Timeline, TimelineItem, TimelineSeparator, TimelineConnector, TimelineContent, TimelineDot, TimelineOppositeContent,timelineOppositeContentClasses } from '@mui/lab';
import ScreenRotationAltIcon from '@mui/icons-material/ScreenRotationAlt';
import WorkOutlineIcon from '@mui/icons-material/WorkOutline';
import { to_readable_str } from '../Common/helper';
import { useDispatch, useSelector } from 'react-redux';
import { changeHeaderSlice } from '../Redux/Slices/HeaderSlice';
import { setJobEditValue } from '../Redux/Slices/CreateJObSlice';
import CustomModal from './CustomComonents/CustomModal';
import CloseIcon from '@mui/icons-material/Close';
import { call_api } from '../Common/fetch_helper';
import { notifySuccess } from './CustomComonents/CustomNotify';

const ShowJObDetails = ({ job_info, setjob_info }) => {
    const theme = useTheme();
    const dispatch = useDispatch()
    const [active_filter, setactive_filter] = useState('overview');
    const [expand, setexpand] = useState(false);
    const [notes, setnotes] = useState(null);
    const [jobFilter, setjobFilter] = useState(null);

    const [EditJob, setEditJob] = useState(false)

    const text_margin = {
        ml: 2
    }

    const {HeaderFilters} = useSelector(state => state.TableSlice)

    const {CreateJobOpeningStatus, updateJob} = useSelector(state=>state.CreateJObSlice)
    
    const onSidefilterChange = (state_key, val) => {
        setjobFilter(val);
        // window.location.href = `#${val}`;
    
        setTimeout(() => {
            const element = document.getElementById(val);
            if (element) {
                const headerOffset = 210; 
                const elementPosition = element.getBoundingClientRect().top;
                const offsetPosition = (window.scrollY + elementPosition) - headerOffset;
    
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });

                console.log(elementPosition, 'element pos')
            }
        }, 100);
           
        
    }
   
    const active_style = {
        background: theme.palette.primary.main,
        borderRadius: '25px',
        color: theme.palette.primary.light,
        padding: '5px 15px'
    }
    const hiring_piplelines = [
        { label: "Screening", count: 20, addl_info: ["In Review 2", "Qualified 3"] },
        { label: "Submission", count: 90, addl_info: ["In Review 2", "Qualified 3"] },
        { label: "Interview", count: 70, addl_info: ["In Review 2", "Qualified 3"] },
        { label: "Offered", count: 30, },
        { label: "Hired", count: 2, addl_info: null },
        { label: "Rejected", count: 10, addl_info: ["In Review 2", "Qualified 3"] },
        { label: "Archived", count: 2, addl_info: ["In Review 2", "Qualified 3"] },


    ]
    const timeline_icons =  [ <TelegramIcon  sx={{color:theme.palette.extra_colors.disabled_button_bg}}/>,  <ScreenRotationAltIcon  sx={{color:theme.palette.extra_colors.disabled_button_bg}}/>, <WorkOutlineIcon  sx={{color:theme.palette.extra_colors.disabled_button_bg}}/>] 
        
       

    const job_opening_details = [
        { label: "Job Title:", key:'job_title', field_type: "select", required: true, },
        { label: "Mail:", field_type: "input", key:'email' },
        { label: "No of Positions:", field_type: "input", key:'no_of_positions' },
        { label: "Hiring Manager:", field_type: "select" , key:'hiring_manager', },
        { label: "Assigned Recruiter(s):", field_type: "input", key:'assigned_recruiter' },
        { label: "Job Type:", field_type: "select" , key:'job_type', },
        { label: "Job Opening Status:", field_type: "select", key:'current_status', },
        { label: "Work Experience:", field_type: "select" , key:'experience', },
        { label: "Date Opened:", field_type: "date" , key:'date_opened'},
        { label: "Closing Date:", field_type: "date", key:'closing_date' },
        { label: "Salary", field_type: "select" , key:'salary', },
        { label: "Skills Required:", field_type: "select", key:'skills_required'}
    ]
    const expand_icon = {
        cursor: 'pointer'
    }

    const addressInfo = [
        { label: "City:", field_type: "input", key:'city' },
        { label: "State/Province:", field_type: "input", key:"state_province" },
        { label: "Mail ID:", field_type: "input" , key:'email'},
        { label: "Zip/Postal Code:", field_type: "input", key:'zip_postal_code' },

    ]

    const description_info = [
        { label: "Job Description", key:"job_description" },
        { label: "Requirements", key:"requirements", },
        { label: "Benefits", key:'benefits' },

    ]

    const timeline = [
        {time : "11:06 am" , action:"Published By" ,action_by:"Hiring Manager"},
        {time : "11:00 am" , action:"status changed By" ,action_by:"Hiring Manager"},
        {time : "10:26 am" , action:"Job opening created By" ,action_by:"Hiring Manager"},

    ]

    const handleEditjobStatus = (value, state_key)=>{

        dispatch(setJobEditValue({state_key, value}))

    }

    const changeJobEditStatus = ()=>{
        setEditJob(true)
    }

    const handleStatusUpdateModalClose = ()=>{
        setEditJob(false)
        dispatch(setJobEditValue(null))
    }

    const updateJobStatus = async () => {
        try {
            const updateResponse = await call_api(`/job_opening/edit_job/${job_info.id}`, updateJob, 'post');
            
            if (updateResponse.status === 'success') {
                const fetchResponse = await call_api(`/job_opening/get_job/${job_info.id}`, null, 'get');
                
                if (fetchResponse.status === 'success') {
                    notifySuccess("Job status updated")
                    setjob_info(fetchResponse.data);
                } else {
                    console.error("Failed to fetch updated job data:", fetchResponse.message);
                }
            } else {
                console.error("Failed to update job status:", updateResponse.message);
            }
        } catch (error) {
            console.error("An error occurred:", error.message);
        }
        handleStatusUpdateModalClose()

    };


    const editJobStatus = ()=>{


        return (
                <Grid container spacing={3} display={'flex'} alignItems={'center'} sx={{pl:{xs:4}}}>
                    <Grid item xs={12} display={'flex'} justifyContent={'end'} >
                        <IconButton onClick={()=>handleStatusUpdateModalClose()} sx={{color:theme.palette.dark}}>
                            <CloseIcon />
                        </IconButton>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography id="custom-modal-title" variant='jost_16_semi_bold'>Change Status</Typography>
                    </Grid>
                    <Grid item xs ={4}>
                            <Typography variant='jost_14_regular' sx={{color:theme.palette.extra_colors.calander}}>Choose job status</Typography>
                    </Grid>
                    <Grid item xs ={6}>
                                <FormControl fullWidth variant="outlined"   >
                                            <Select  defaultValue={job_info.current_status ? job_info.current_status: ''}

                                            onChange={(e)=> handleEditjobStatus(e.target.value, 'status')}
    
                                          >
                                            {CreateJobOpeningStatus?.map(val =>  <MenuItem key={val.code} value={val.code}><Typography>{val.label}</Typography></MenuItem>)}
                                            
                                                
                                            </Select>
                                        </FormControl>
                    </Grid>
                    <Grid item xs={10}>
                        <Typography variant='jost_14_regular' sx={{color:theme.palette.extra_colors.calander}}>Notes</Typography>

                    </Grid>
                    <Grid item xs={10}>
                        <TextField fullWidth multiline maxRows={3} onChange={(e)=>handleEditjobStatus(e.target.value, 'notes')}/>

                    </Grid>
                   
                    <Grid item xs={10}>
                        <Box display="flex" justifyContent="flex-end" gap={2}>
                                <Button variant='app_button' onClick={()=>updateJobStatus()}>
                                    Update
                                </Button>
                                <Button sx={{ color: theme.palette.primary.dark, border: '1px solid rgba(0, 0, 0, 0.25)' }} onClick={() => handleStatusUpdateModalClose()}>
                                    Cancel
                                </Button>
                        </Box>
                    </Grid>
                    

                    

                </Grid>
        )
    }


    return (
        <div>
           <div className='custom-fixed-header'>
            <div className='pr-3'>
            <Grid
                container
                display="flex"
                    spacing={2}
                    justifyContent="space-between"
                    sx={{ background: '#F6F6F6', padding: '20px 10px', }}>

                    <Grid item xs={12} sm={6} md={6} sx={{ paddingTop: '0px !important' }} display="flex" alignItems="center">
                        <Typography variant="jost_18_semi_bold" sx={text_margin} component="div">
                            <ArrowBackIcon sx={{ mr: 2 , cursor:'pointer'}} onClick={()=>{dispatch(changeHeaderSlice({ListJobs:true}));setjob_info(false)}}/> {job_info.job_title ? to_readable_str(job_info.job_title): "-"}
                        </Typography>
                        <Button
                            variant="contained"
                            color="success"
                            sx={{ borderRadius: '25px', height: '33px', marginLeft: '20px',  }}
                            onClick={()=>changeJobEditStatus()}
                        >
                            {job_info.current_status ? to_readable_str(job_info.current_status) : '-'}
                        </Button>
                        <Typography variant="edit_link" sx={text_margin} component="div" onClick={()=>changeJobEditStatus()}>
                            <ExpandCircleDownOutlinedIcon variant="edit_link"  sx={{cursor:'pointer'}}/>
                        </Typography>

                    </Grid>

                    <Grid item xs={12} sm={6} md={6} sx={{ paddingTop: '0px !important' }} display="flex" justifyContent="flex-end" alignItems="center">
                        <Badge
                            badgeContent={2}
                            color="error"
                            overlap="circular"
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            sx={{ mr: 2 }}
                        >
                            <Avatar sx={{ bgcolor: theme.palette.secondary.main }}>
                                <DifferenceOutlinedIcon />
                            </Avatar>
                        </Badge>



                        <Avatar sx={{ bgcolor: theme.palette.secondary.main, mr: 2 }}>
                            <AddReactionOutlinedIcon />
                        </Avatar>

                        <Avatar sx={{ bgcolor: theme.palette.secondary.main, mr: 2 }}>
                            <Edit />
                        </Avatar>

                        <Avatar sx={{ bgcolor: theme.palette.secondary.main, mr: 2 }}>
                            <TelegramIcon />
                        </Avatar>

                        <span><MoreHorizIcon sx={{ mr: 2, color: theme.palette.secondary.light }} /></span>


                    </Grid>
                </Grid>
                <div className="d-flex col-md-auto w-100" style={{ borderBottom: '1px solid #E6E6E6' }} >
                    <FilterComponent type={'job_deatils_filter'} onChange={onSidefilterChange} />
                </div>
            </div>
           </div>

          <Box sx={{px:{sm:1, md:2, lg:3}}}>
          <div className='d-flex align-items-center mt-3 p-2 px-3   min_width'  >
                <Typography variant="jost_16_medium" onClick={() => setactive_filter("overview")} sx={active_filter == "overview" ? active_style : { mx: 2, cursor: 'pointer' }} component="div">
                    Overview
                </Typography>

                <Typography variant="jost_16_medium" onClick={() => setactive_filter("timeline")} sx={active_filter == "timeline" ? active_style : { mx: 2, cursor: 'pointer' }} component="div">
                    Timeline
                </Typography>
            </div>

            { (active_filter == "overview") &&
            <>

            <div className='d-flex align-items-center mt-4 p-2 px-3    div_border_radius' >
                <Box className="col-lg-12" >
                    <div className='d-flex align-items-center justify-content-between col-12'>
                        <Typography variant="jost_18_semi_bold" sx={{ px: 3, py: 2 }} component="div">
                            Hiring Pipeline
                        </Typography>

                        <Typography variant="jost_16_medium" sx={expand_icon} onClick={() => setexpand(!expand)} component="div">
                            {expand ? "Compress" : "Expand"}
                            {expand ? <CompressIcon sx={{ ml: 2, fontSize: "20px" }} />
                                : <OpenInFullIcon sx={{ ml: 2, fontSize: "20px" }} />}



                        </Typography>

                    </div>


                    <div className='d-flex align-items-center justify-content-around mx-0 mb-3 col-12'>
                        {hiring_piplelines.map((item, idx) => {
                            return (
                                <div key={idx} className={`hiring_pipeline   ${expand ? "addl_height" : ""}`}>
                                    <Typography variant="jost_16_medium" sx={{ textAlign: 'center' }} component="div">
                                        {item.count}
                                    </Typography>

                                    <Typography variant="jost_16_medium" sx={{ textAlign: 'center' }} component="div">
                                        {item.label}
                                    </Typography>

                                    {item.addl_info && expand &&
                                        <>
                                            {item.addl_info.map((addl_infos, idx) => {
                                                return (
                                                    <Typography variant="jost_14_regular" sx={{ textAlign: 'center', mt: 1, color: theme.palette.extra_colors.calander }} component="div">
                                                        {addl_infos}
                                                    </Typography>
                                                )
                                            })}
                                        </>

                                    }
                                </div>
                            )

                        })}
                    </div>
                </Box>
                </div>
                <div className='d-flex align-items-center mt-4 p-2 px-3    div_border_radius'>
                <Box>

                    <div>

                        <Box sx={{pl:{sm:3}}}>
                        <Box sx={{ py: 4,  }}>
                            <Typography variant="jost_18_semi_bold" component="div">
                                Job Opening Details
                            </Typography>
                        </Box>
                        <Grid container spacing={2} justifyContent="space-between">
                        {job_opening_details.map((item, idx) => (
                            <Grid key={idx} item xs={12} sm={6} md={6} lg={5} sx={{ mb: 2 , mx:{lg:3}}}>
                                <Grid container spacing={2} alignItems="center">
                                    <Grid item xs={3}>
                                        <Typography variant="jost_14_medium" component="div">
                                            {item.label} {item.required && <span style={{ color: 'red' }}>*</span>}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={8} display="flex">
                                        {item.key === 'skills_required' && job_info.skills_required?.length > 0 ? (
                                            job_info.skills_required.map((val, i) => (
                                                <Typography key={i} variant="jost_14_regular" sx={{ px: 1, color: theme.palette.extra_colors.calander }} component="div">
                                                    {to_readable_str(val)}
                                                </Typography>
                                            ))
                                        ) : (
                                            <Typography variant="jost_14_regular" component="div">
                                                {job_info[item.key] && item.key !== "email" ? to_readable_str(job_info[item.key]) : job_info[item.key]}
                                            </Typography>
                                        )}
                                    </Grid>
                                </Grid>
                            </Grid>
                        ))}
                    </Grid>
                        </Box>


                        <Box sx={{pl:{sm:3}}}>
                            <Box sx={{ py: 4,  }}>
                                <Typography variant="jost_18_semi_bold" component="div">
                                    Address Information
                                </Typography>
                            </Box>
                            <Grid container spacing={2} justifyContent="space-between">
                                {addressInfo.map((item, idx) => (
                                    <Grid key={idx} item xs={12} sm={6} md={6} lg={5} sx={{ mb: 2, mx: {lg:3} }}>
                                        <Grid container spacing={2} alignItems="center">
                                            <Grid item xs={3}>
                                                <Typography variant="jost_14_medium" component="div">
                                                    {item.label} {item.required && <span style={{ color: 'red' }}>*</span>}
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={7}>
                                                <Typography variant="jost_14_regular" component="div">
                                                    {job_info[item.key] || '-'}
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                ))}
                            </Grid>
                        </Box>


                        <Box sx={{pl:{sm:3}}}>
                            <Box sx={{ py: 4,  }}>
                                <Typography variant="jost_18_semi_bold" component="div">
                                    Description Information
                                </Typography>
                            </Box>


                            <Grid container spacing={2} display={'flex'} justifyContent={'space-between'}>
                                    {description_info.map((item, idx) => (
                                        <Grid key={idx} item xs={12} sx={{ mb: 2, mx: { lg: 3 } }} >
                                            <Typography variant="jost_16_medium" component="div">
                                                {item.label}
                                            </Typography>
                                            <div dangerouslySetInnerHTML={{ __html: job_info[item.key] }}  className='p-2'/>
                                        </Grid>
                                    ))}
                                </Grid>
                        </Box>

                    </div>


                </Box>


            </div>
                                              
            <div id="tags" className='d-flex align-items-center mt-4 p-2 px-3    div_border_radius' >
                <Box className="col-lg-12 col-sm-12"  sx={{px:{sm:3}}}>
                    <div>
                        <Box sx={{ py: 1,}}>
                            <div className='d-flex align-items-center justify-content-between'>
                                <Typography variant="jost_18_semi_bold" component="div">
                                    Tags
                                </Typography>
                                <Button
                                    variant="contained"
                                    color="success"
                                    sx={{ height: '33px', marginLeft: '20px' }}
                                >
                                    Add tag
                                </Button>
                            </div>

                        </Box>
                        <div className='d-flex '>
                            {job_info.hasOwnProperty('tags') && job_info['tags'].length >0  && job_info['tags'].map((item, idx) => {
                                return (
                                    <div key={idx} className=' mb-3'  >
                                        <Typography variant="p" sx={{ padding: '1px 10px', background: theme.palette.primary.main, color: theme.palette.primary.light }} component="div">
                                            {to_readable_str(item)}
                                        </Typography>
                                    </div>
                                )
                            })}
                        </div>





                    </div>


                </Box>


            </div>
            

            <div id="notes"  className='d-flex align-items-center mt-4 p-2 px-3    div_border_radius' >
                <Box className="col-lg-12 col-sm-12"  sx={{px:{sm:3}}}>
                    <div>
                        <Box sx={{ py: 1,}}>
                            <div className='d-flex align-items-center justify-content-between'>
                                <Typography variant="edit_link" component="div">
                                    Notes
                                </Typography>
                            </div>

                        </Box>
                        <div className='d-flex col-lg-10  py-4' >
                            <TextField variant="outlined" onChange={(e) => { setnotes(e.target.value) }} placeholder='@mention to notify users' fullWidth />

                        </div>





                    </div>


                </Box>


            </div>

            <div id="interview"   className='d-flex align-items-center mt-4 p-2 px-3    div_border_radius' >
                <Box className="col-lg-12 col-sm-12" sx={{px:{sm:3}}} >
                    <div>
                        <Box sx={{ py: 1,  }}>
                            <div className='d-flex align-items-center justify-content-between'>
                                <Typography variant="edit_link" component="div">
                                    Interviews
                                </Typography>
                                <Button
                                    variant="contained"
                                    color="success"
                                >
                                    + Schedule Interview
                                </Button>
                            </div>

                        </Box>
                        <div className='d-flex col-lg-10  '>
                            <Typography variant="p" sx={{ padding: '1px 10px',color: theme.palette.extra_colors.calander }} component="div">
                               No records Found
                            </Typography>
                        </div>





                    </div>


                </Box>


            </div>

            <div id="attachments"  className='d-flex align-items-center mt-4 p-2 px-3    div_border_radius' >
                <Box className="col-lg-12 col-sm-12"  sx={{px:{sm:3}}}>
                    <div>
                        <Box sx={{ py: 1,}}>
                            <div className='d-flex align-items-center justify-content-between'>
                                <Typography variant="edit_link" component="div">
                                Attachments                               
                                 </Typography>
                                <Button
                                    variant="contained"
                                    color="success"
                                >
                                     Attach
                                </Button>
                            </div>

                        </Box>
                        <div className='d-flex col-lg-10  py-4 '>
                            <Typography variant="p" sx={{ padding: '1px 10px',color: theme.palette.extra_colors.calander }} component="div">
                               No records Found
                            </Typography>
                        </div>





                    </div>


                </Box>


            </div>  
            <div id="vendors"  className='d-flex align-items-center mt-4 p-2 px-3    div_border_radius' >
                <Box className="col-lg-12 col-sm-12" sx={{px:{sm:3}}}>
                    <div>
                        <Box sx={{ py: 1}}>
                            <div className='d-flex align-items-center justify-content-between'>
                                <Typography variant="edit_link" component="div">
                                Shared Vendors                               
                                 </Typography>
                                <Button
                                    variant="contained"
                                    color="success"
                                >
                                     Filter
                                </Button>
                            </div>

                        </Box>
                        <div className='d-flex col-lg-10  py-4 '>
                            <Typography variant="p" sx={{ padding: '1px 10px',color: theme.palette.extra_colors.calander }} component="div">
                               No records Found
                            </Typography>
                        </div>





                    </div>


                </Box>


            </div>  
            <div id="to_dos"    className='d-flex align-items-center mt-4 p-2 px-3    div_border_radius' >
                <Box className="col-lg-12 col-sm-12" sx={{px:{sm:3}}}>
                    <div>
                        <Box sx={{ py: 1, }}>
                        <Grid container alignItems="center" justifyContent="space-between">
                            <Grid item xs={6} sm={6} md={7} lg={9}>
                                <Typography variant="edit_link" component="div">
                                    To Do’s
                                </Typography>
                            </Grid>
 
                            <Grid item xs={6} sm={6} md={5} lg={3}>
                                <Box sx={{ display: 'flex', justifyContent: 'space-around' }}>
                                    <Box sx={{ml:'auto',}}>
                                        <Button variant="contained" color="success" sx={{mr:{lg:2, sm:1}}}>
                                            + New Task
                                        </Button>
                                        <Button variant="contained" color="success">
                                            + New Event
                                        </Button>
                                    </Box>
                                </Box>
                            </Grid>
                        </Grid>

                        </Box>
                        <div className='d-flex col-lg-10  py-4'>
                            <Typography variant="p" sx={{ padding: '1px 10px',color: theme.palette.extra_colors.calander }} component="div">
                               No records Found
                            </Typography>
                        </div>





                    </div>


                </Box>


            </div>
                    <div  id="assignment"   className='d-flex align-items-center mt-4 p-2 px-3 mb-3   div_border_radius' >
                        <Box className="col-lg-12 col-sm-12" sx={{px:{sm:3}}}>
                            <div>
                                <Box sx={{ py: 1 }}>
                                    <div className='d-flex align-items-center justify-content-between'>
                                        <Typography variant="edit_link" component="div">
                                        Pre-screening Assesments
                                        </Typography>
                                    
                                    
                                    </div>

                                </Box>
                                <div className='d-flex col-lg-10  py-4 '>
                                    <Typography variant="p" sx={{ padding: '1px 10px',color: theme.palette.extra_colors.calander }} component="div">
                                    No records Found
                                    </Typography>
                                </div>





                            </div>


                        </Box>


                    </div>
                </>}

                {active_filter == "timeline" &&

                    <div className='d-flex align-items-center mt-4 p-2 px-3    div_border_radius' >
                    <Timeline
                    sx={{
                        [`& .${timelineOppositeContentClasses.root}`]: {
                        flex: 0,
                        },
                    }}
                    >

                {timeline.map((item,idx)=>{return(
                    <TimelineItem>
                        <TimelineOppositeContent>
                            <Typography variant='jost_14_regular'  sx={{width:'150px'}} >
                            {item.time}
                            </Typography>
                        </TimelineOppositeContent>
                        <TimelineSeparator>
                            <TimelineDot sx={{background:"none"}}>
                                {timeline_icons[idx]}
                            
                            
                            </TimelineDot>
                            <TimelineConnector />
                        </TimelineSeparator>
                        <TimelineContent>
                            <Typography variant="jost_16_medium" component="div">
                            {item.action}
                            </Typography>
                            <Typography variant="jost_14_regular" > {item.action_by}</Typography>
                        </TimelineContent>
                        </TimelineItem>
                )})}
                </Timeline>


                    </div>
                
                
                }
          </Box>

           <CustomModal open={EditJob} onClose={handleStatusUpdateModalClose} ModalComponent={editJobStatus()}/>

        </div>
    );
};

export default ShowJObDetails;