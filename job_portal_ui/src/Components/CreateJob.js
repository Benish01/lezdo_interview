import { Box, Button, FormControl, FormControlLabel, Grid, InputLabel, MenuItem, Radio, RadioGroup, Select, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import { Edit } from '@mui/icons-material';
import TextEditor from './CustomComonents/TextEditor';
import { useDispatch, useSelector } from 'react-redux';
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import moment from "moment";
import { call_api } from '../Common/fetch_helper';
import { changeHeaderSlice } from '../Redux/Slices/HeaderSlice';
import { notifyError, notifySuccess } from './CustomComonents/CustomNotify';

const CreateJob = () => {
    const {ListJobs} = useSelector(state => state.HeaderSlice)


    const dispatch =  useDispatch()

    const {CreateJobTitles, CreateJobHiringManagers, CreateJobOpeningStatus, CreateJobSalary, CreateJobWorkExperience, CreateJobType, CreateJobSkills, description_info, CreateJobRequiredFields} = useSelector(state=>state.CreateJObSlice)
    const [jobdetails, setjobdetails] = useState({
        job_opening_details: {},
        add_info: {},
        questions:{}
    })
  

    const text_margin = {
        ml: 2
    }
    const indise_label_margin ={
        ml: 5

    }
    const box_design = {
        m: 3,
        boxShadow: '0px 0px 2.76px 0px #00000040',
        borderRadius: '10px'
    }
    const job_opening_details = [
        { label: "Job Title:", key:'job_title', field_type: "select", required: true,  state_key:CreateJobTitles},
        { label: "Mail:", field_type: "input", key:'email' },
        { label: "No of Positions:", field_type: "input", key:'no_of_positions' },
        { label: "Hiring Manager:", field_type: "select" , key:'hiring_manager', state_key:CreateJobHiringManagers},
        { label: "Assigned Recruiter(s):", field_type: "input", key:'assigned_recruiter' },
        { label: "Job Type:", field_type: "select" , key:'job_type', state_key:CreateJobType},
        { label: "Job Opening Status:", field_type: "select", key:'job_opening_status', state_key: CreateJobOpeningStatus},
        { label: "Work Experience:", field_type: "select" , key:'experience', state_key:CreateJobWorkExperience},
        { label: "Date Opened:", field_type: "date" , key:'date_opened'},
        { label: "Closing Date:", field_type: "date", key:'closing_date' },
        { label: "Salary", field_type: "select" , key:'salary', state_key:CreateJobSalary},
        { label: "Skills Required:", field_type: "select", key:'skills_required', state_key : CreateJobSkills }
    ]

    const addressInfo = [
        { label: "City:", field_type: "input", key:'city' },
        { label: "State/Province:", field_type: "input", key:"state_province" },
        { label: "Mail ID:", field_type: "input" , key:'mail_id'},
        { label: "Zip/Postal Code:", field_type: "input", key:'zip_postal_code' },

    ]

    const formatLabel = (label) => {
        return label.toLowerCase().replace(/\s+/g, '_').replace(/:/g, '');
    };



    const getInputs = (val, field, field_info) => {

        // if (field === "expiry_date") {
        //     const postedDate = jobdetails.job_opening_details?.posted_date;
        //     if (postedDate && moment(postedDate).isAfter(val)) {
        //         alert('Please choose a correct expiry date. It should be after the posted date.');
        //         return;
        //     }
        // }
        setjobdetails(prevDetails => {
            if (!prevDetails[field_info]) {
                return prevDetails;
            }

            const key = formatLabel(field);

            return {
                ...prevDetails,
                [field_info]: {
                    ...prevDetails[field_info],
                    [key]: val
                }
            };
        });
    };

    const description_info_arr = ["Job Description", "Requirements", "Benefits"]


   const save_publish = async(type)=>{
        let payload ={
            ...jobdetails.job_opening_details,
            questions:{...jobdetails.questions},
            ...jobdetails.add_info,
            ...description_info
            
            
        }
        let required_field_is_empty = CreateJobRequiredFields && CreateJobRequiredFields.some(val => 
            !payload.hasOwnProperty(val) || payload[val] === undefined || payload[val] === ''
          );
        if(required_field_is_empty){
            // alert("please fill all the required fields")
            notifyError("please fill all the required fields")
            return
        }
        const response = await call_api('/job_opening/create', payload, "post")
        if(response.status == 'success'){
            notifySuccess("Job Created Successfully")
            dispatch(changeHeaderSlice({ListJobs:true, CreateJobs:false}))
        }

   }



    return (
        <React.Fragment>

            <Grid
                container
                spacing={2}
                justifyContent="space-between"
                sx={{ background: '#F6F6F6', padding: '20px 10px', position:'sticky', zIndex:2, top:64 }}
                
            >

                <Grid item xs={12} sm={6} md={6} sx={{ paddingTop: '0px !important' }} display="flex" alignItems="center" >
                    <Typography variant="jost_18_semi_bold" sx={text_margin} component="div">
                        Job Openings
                    </Typography>
                    <Button
                        variant="contained"
                        color="success"
                        sx={{ borderRadius: '25px', height: '33px', marginLeft: '20px' }}
                        startIcon={<AddIcon />}
                    >
                        Select Templates
                    </Button>
                    <Typography variant="edit_link" sx={text_margin} component="div">
                        Edit Page Layout <Edit sx={{ fontSize: '15px' }} />
                    </Typography>

                </Grid>

                <Grid item xs={12} sm={6} md={6} sx={{ paddingTop: '0px !important' }} display="flex" justifyContent="flex-end" alignItems="center">
                    <Button variant="contained" color="success" sx={{ height: '33px' }} onClick={()=>save_publish('save_publish')}>
                        Save & Publish
                    </Button>
                    <Button
                        variant="contained"
                        color="success"
                        sx={{ height: '33px', marginLeft: '20px' }}
                        onClick={()=>save_publish('save')}
                    >
                        Save
                    </Button>
                    <Button variant="outlined" color="success" sx={{ height: '33px', mx: 3 }} onClick={()=>dispatch(changeHeaderSlice({CreateJobs:false}))}>
                        Cancel
                    </Button>
                </Grid>
            </Grid>

            <Box sx={box_design}>
                <Box sx={{ py: 4, px: 3 }}>
                    <Typography variant="jost_18_semi_bold" sx={indise_label_margin} component="div">
                        Job Opening Details
                    </Typography>
                </Box>
                <Grid container spacing={2} display={'flex'} justifyContent={'center'}>
                    {job_opening_details.map((item, idx) => (
                        <Grid key={idx} item xs={12} sx={{ mb: 2 }} sm={6} md={6} lg={5}>
                            <Grid container spacing={2} alignItems="center">
                                <Grid item xs={3}>
                                    <Typography variant="jost_14_medium" component="div">
                                        {item.label} {item.required && <span style={{ color: 'red' }}>*</span>}
                                    </Typography>
                                </Grid>
                                <Grid item xs={7}>
                                    {item.field_type === 'input' && (
                                        <TextField variant="outlined" onChange={(e) => { getInputs(e.target.value, item.key, "job_opening_details") }} placeholder='Enter here' fullWidth />
                                    )}
                                    {item.field_type === 'select' && (
                                        <FormControl fullWidth variant="outlined"   >
                                            <InputLabel>{'Select here'}</InputLabel>
                                            <Select 
                                                label={item.label} 
                                                onChange={(e) => { getInputs(e.target.value, item.key, "job_opening_details") }} multiple = {item.key == 'skills_required' ? true:false}  
                                                value={item.key === 'skills_required' ? jobdetails.job_opening_details?.[item.key] || [] : jobdetails.job_opening_details?.[item.key]}
                                                sx={{
                                                    '.MuiSelect-select.MuiSelect-multiple': {
                                                      display: 'flex',
                                                      flexWrap: 'wrap',
                                                      textOverflow:"ellipsis",
                                                      overflow:'hidden',
                                                      gap: 0.5,
                                                      
                                                    },
                                                  }}
                                          >

                                                    {item.key !="skills_required" &&<MenuItem value={""}><em>none</em></MenuItem>}
                                                {
                                                     item.state_key?.map((val=>(
                                                    <MenuItem  key={val.code} value={val.code}><Typography>{val.label}</Typography></MenuItem>
                                                )))}
                                                
                                            </Select>
                                        </FormControl>
                                    )}
                                    {item.field_type === 'date' && (
                                       <LocalizationProvider dateAdapter={AdapterMoment}>
                                            <DatePicker sx={{width:'100%'}}
                                                label={"Select here"}  
                                                format='DD-MM-YYYY'
                                                onChange={(date) => {
                                                    const formattedDate = date ? moment(date).format('DD-MM-YYYY') : '';
                                                    getInputs(formattedDate, item.key, "job_opening_details");
                                                }}
                                                value={jobdetails.job_opening_details?.[item.key] ? moment(jobdetails.job_opening_details[item.key]) : null}
                                                maxDate={item.key === 'date_opened' ? moment() : undefined}
                                                minDate={item.key == 'closing_date' ? moment(jobdetails.job_opening_details?.['date_opened']) : undefined}
            
                                            
                                            />   
                                    </LocalizationProvider> 
                                    )}
                                </Grid>
                            </Grid>
                        </Grid>
                    ))}
                </Grid>
            </Box>


            <Box sx={box_design} >
                <Box sx={{ py: 4, px: 3 }}>
                    <Typography variant="jost_18_semi_bold" sx={indise_label_margin} component="div">
                        Address Info
                    </Typography>
                </Box>
                <Grid container spacing={2} display={'flex'} justifyContent={'center'}>
                    {addressInfo.map((item, idx) => (
                        <Grid key={idx} item xs={12} sx={{ mb: 2 }} sm={6} md={6} lg={5} >
                            <Grid container spacing={2} alignItems="center">
                                <Grid item xs={3} >
                                    <Typography variant="jost_14_medium" component="div">
                                        {item.label} {item.required && <span style={{ color: 'red' }}>*</span>}
                                    </Typography>
                                </Grid>
                                <Grid item xs={7}>
                                    {item.field_type === 'input' && (
                                        <TextField variant="outlined" onChange={(e) => { getInputs(e.target.value, item.key, "add_info") }} placeholder='Enter here' fullWidth />
                                    )}
                                </Grid>
                            </Grid>
                        </Grid>
                    ))}
                </Grid>
            </Box>

            <Box sx={box_design} >
                <Box sx={{ py: 4, px: 3 }}>
                    <Typography variant="jost_18_semi_bold" sx={indise_label_margin} component="div">
                        Description Information
                    </Typography>
                </Box>
                {description_info_arr.map((items, idx) => {
                    return (
                        <Box sx={{ margin: "20px 8%" }} key={idx}>
                            <Typography variant="jost_16_medium" component="div">
                                {items}
                            </Typography>
                            <Grid container sx={{ my: 3 }} key={idx}  >

                            <Grid item  xs={12} sm={12} md={12} lg={12}>
                                    <TextEditor field_type={formatLabel(items)} />
                                </Grid>

                                

                            </Grid>
                        </Box>
                    )
                })}

            </Box>

            <Box sx={box_design}>
                <Box sx={{ py: 4, px: 3 }}>
                    <Typography variant="jost_18_semi_bold" sx={indise_label_margin} component="div">
                        Questions
                    </Typography>
                </Box>
                <Grid container spacing={2} alignItems="center">
                    <Grid item xs={8} display={'flex'} justifyContent={'start'}>
                        <Typography variant='jost_14_regular' sx={{pl:10}}>
                           Do you have these minimum qualifications? (Bachelor’s degree or equivalent practical experience)
                        </Typography>
                    </Grid>
                    <Grid item xs={4}>
                        <FormControl component="fieldset">
                        <RadioGroup row aria-label="qualification" name="qualification" onChange={(e)=>getInputs(e.target.value, e.target.name, 'questions' )}>
                            <FormControlLabel value="yes" control={<Radio />} label="Yes" />
                            <FormControlLabel value="no" control={<Radio />} label="No" />
                        </RadioGroup>
                        </FormControl>
                    </Grid>

                    <Grid item xs={8} display={'flex'} justifyContent={'start'}>
                        <Typography variant='jost_14_regular' sx={{pl:10}}>
                            3 years of experience in UI/UX design, with proficiency in one or more design tools and a strong understanding of design principles.
                        </Typography>
                    </Grid>
                    <Grid item xs={4}>
                        <FormControl component="fieldset">
                        <RadioGroup row aria-label="ui_ux_experience" name="ui_ux_experience" onChange={(e)=>getInputs(e.target.value, e.target.name, 'questions' )}>
                            <FormControlLabel value="yes" control={<Radio />} label="Yes" />
                            <FormControlLabel value="no" control={<Radio />} label="No" />
                        </RadioGroup>
                        </FormControl>
                    </Grid>

                    <Grid item xs={8} display={'flex'} justifyContent={'start'}>
                        <Typography variant='jost_14_regular' sx={{pl:10}}>
                        1 year of experience in testing, maintaining, and/or launching digital products, and at least 1 year of experience in leading software design and architecture projects.
                        </Typography>
                    </Grid>
                    <Grid item xs={4}>
                        <FormControl component="fieldset">
                        <RadioGroup row aria-label="testing_experience" name="testing_experience" onChange={(e)=>getInputs(e.target.value, e.target.name, 'questions' )}>
                            <FormControlLabel value="yes" control={<Radio />} label="Yes" />
                            <FormControlLabel value="no" control={<Radio />} label="No" />
                        </RadioGroup>
                        </FormControl>
                    </Grid>

                    <Grid item xs={8} display={'flex'} justifyContent={'start'}>
                        <Typography variant='jost_14_regular' sx={{pl:10}}>
                        3 years of experience in implementing UI/UX strategies, including familiarity with ML/AI algorithms and tools for enhancing user experiences.
                        </Typography>
                    </Grid>
                    <Grid item xs={4}>
                        <FormControl component="fieldset">
                        <RadioGroup row aria-label="ai_algroithms" name="ai_algroithms"onChange={(e)=>getInputs(e.target.value, e.target.name, 'questions' )}>
                            <FormControlLabel value="yes" control={<Radio />} label="Yes" />
                            <FormControlLabel value="no" control={<Radio />} label="No" />
                        </RadioGroup>
                        </FormControl>
                    </Grid>
                </Grid>

            </Box>




        </React.Fragment>
    );
};

export default CreateJob;