import { Accordion, AccordionDetails, AccordionSummary, Box, Button, Card, Checkbox, FormControlLabel, FormGroup, InputAdornment, Tab, Tabs, TextField, Typography } from "@mui/material"
import { useDispatch, useSelector } from "react-redux";
import { changeTableSlice } from "../Redux/Slices/TableSlice";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CustomDatePicker from "./CustomComonents/CustomDatePicker";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import moment from "moment";
import { useTheme } from "@emotion/react";
import SearchIcon from '@mui/icons-material/Search';
import { hasKeyWithValue } from "../Common/helper";







const title_style = {
    display:'flex',
    alignItems:'center',
    pl:1,
    backgroundColor:'#F6F6F6',
    height:'50px',
    marginTop:'10px'
}

const job_filter ={
    display:'flex',
    alignItems:'center',
    pl:1,
    height:'50px',
}




const FilterComponent = ({type, onChange = ()=>{}, handleFilterClicked = ()=>{}, handleReset = ()=>{}})=>{

    const {HeaderFilters,jobDetailsFilter,job_detail_header, headerFilteridx, sideFilterState, JobTitlesCopy, selectedJobTitles} = useSelector(state=>state.TableSlice)
    const dispatch = useDispatch()

    const theme = useTheme();

    const handleFilterClick = (val, idx)=>{
        if(type == 'header_filter' || type == "job_deatils_filter"){
           let key_type = (type == 'header_filter') ? "headerFilteridx" :  "job_detail_header"
            dispatch(changeTableSlice({[key_type]:idx}))
            onChange('current_status', val.code)
        }
    }

    const handlesidefilterChange = (state_key, val, event = null)=>{
        if(state_key == 'fromDate' || state_key == 'toDate' ){
             val = moment(val).format('DD-MM-YYYY')
        }
        if(state_key =="selectedJobTitles" && event){
            event = event.target.checked
        }


        

        onChange(state_key, val, event)

    }

    const handleFilterBtn = (type)=>{
        handleFilterClicked(type)
    }

    const handleFilterReset = (type)=>{
        
        handleReset(type)
    }

    const header_filter_style ={
        borderRight :'1px solid #E6E6E6',
        borderTop:'1px solid #E6E6E6',

    
    }

   const filter_type = (type == "job_deatils_filter") ? jobDetailsFilter : HeaderFilters
   const index = (type == "job_deatils_filter") ? job_detail_header : headerFilteridx

    return(
        <Box>
            {(type == 'header_filter' || type == "job_deatils_filter") && 
            <div className="d-flex " style={(type == 'header_filter') ? title_style : job_filter}>

                {
                    (filter_type).map((val,idx)=>(
                        <Box className="px-3 h-100 d-flex align-items-center col-md-auto " sx={{color:idx == [index] ? 'primary.main': 'primary.dark' , borderBottom: idx == [index]  ? '2px solid ' : 'none', cursor:'pointer',  transition: 'border 0.2s ease-out' , borderRight:  type == "job_deatils_filter" ?"1px solid #E6E6E6" :"none" ,  borderTop: type == "job_deatils_filter" ?"1px solid #E6E6E6" :"none" ,} }
                        onClick={()=>handleFilterClick(val, idx)} key={idx}>
                            <Typography variant= { (type == 'header_filter' )? "jost_14_medium" : "jost_16_medium"}>{val.label}</Typography>
                        </Box>
                    ))
                }
            
            </div>

            // <Box 
            //     sx={{ 
            //         width: '100%', 
            //         borderBottom: 1, 
            //         borderColor: 'divider', 
            //         ...(type === 'job_details_filter' && { borderTop: '1px solid #E6E6E6', borderRight: '1px solid #E6E6E6' })
            //     }}
            //     >
            //     <Tabs
            //         value={index}
            //         onChange={(event, newValue) => handleFilterClick(newValue)}
            //         aria-label="filter tabs"
            //         sx={{ 
            //         '& .MuiTab-root': {
            //             color: 'primary.dark',
            //             transition: 'border 0.2s ease-out',
            //         },
            //         '& .Mui-selected': {
            //             color: 'primary.main',
            //             borderBottom: '2px solid',
            //         },
            //         }}
            //     >
            //         {filter_type.map((val, idx) => (
            //         <Tab
            //             key={idx}
            //             label={<Typography variant={type === 'header_filter' ? 'jost_14_medium' : 'jost_16_medium'}>{val.label}</Typography>}
            //             value={idx}
            //             sx={{
            //             borderBottom: idx === index ? '2px solid' : 'none',
            //             borderRight: type === 'job_details_filter' ? '1px solid #E6E6E6' : 'none',
            //             borderTop: type === 'job_details_filter' ? '1px solid #E6E6E6' : 'none',
            //             }}
            //         />
            //         ))}
            //     </Tabs>
            //     </Box>

            
            }

            {type == 'side_filter' && 
                <div>
                     <div className="d-flex justify-content-around  align-items-center    py-3 px-2">
                        <Typography variant="jsot_14_medium" sx={{color:theme.palette.extra_colors.calander}}>{`${hasKeyWithValue(sideFilterState, true)} Filters Applied`}</Typography>
                        <Button sx={{backgroundColor:theme.palette.extra_colors.reset_btn , borderRadius:'7px', color:'primary.dark', p:0}} onClick={()=>handleFilterReset(type)}>Reset</Button>
                     </div>
                   <Accordion sx={{'& .Mui-expanded': {margin:0,}}}>
                        <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel2-content"
                        id="panel2-header"
                        
                        >
                        <Typography variant="jsot_14_medium">Date Range</Typography>
                        </AccordionSummary>
                        <AccordionDetails>

                         <LocalizationProvider dateAdapter={AdapterMoment}>
                           { !sideFilterState.DateRange?.fromDate ? <DatePicker
                                label={" Start Date"}  
                                onChange={(e)=>handlesidefilterChange('fromDate', e)} 
                                format="DD/MM/YY"
                                value={sideFilterState.DateRange?.fromDate ? moment(sideFilterState.DateRange.fromDate, 'DD-MM-YYYY') : null }
                                
                                />  :
                                <DatePicker
                                label={"End Date"}  
                                onChange={(e) => handlesidefilterChange('toDate', e)}
                                minDate={moment(sideFilterState.DateRange?.fromDate, 'DD-MM-YYYY')}
                                format="DD/MM/YY"
                                value={sideFilterState.DateRange?.toDate ? moment(sideFilterState.DateRange.toDate, 'DD-MM-YYYY') : null}
                            /> }  
                        </LocalizationProvider> 

                        {
                            sideFilterState.DateRange?.fromDate && <div className="d-flex  px-2">
                                <div className="col"><Typography variant="jost_14_regular" sx={{color:theme.palette.extra_colors.calander}}>From:</Typography></div>
                                <div className="col"><Typography variant="jost_14_regular" sx={{color:theme.palette.extra_colors.calander}}>{sideFilterState.DateRange?.fromDate }</Typography></div>

                            </div>
                        }
                        {
                            sideFilterState.DateRange?.toDate && <div className="d-flex px-2">
                                <div className="col"><Typography variant="jost_14_regular" sx={{color:theme.palette.extra_colors.calander}}>To:</Typography></div>
                                <div className="col"><Typography variant="jost_14_regular" sx={{color:theme.palette.extra_colors.calander}}>{sideFilterState.DateRange?.toDate}</Typography></div>

                            </div>
                        }
                        
                        </AccordionDetails>
                    </Accordion>

                    <Accordion>
                        <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel2-content"
                        id="panel2-header"
                        >
                            <Typography variant="jsot_14_medium">Job Title</Typography>
                        </AccordionSummary>
                        <AccordionDetails>

                        <TextField
                            id="side_filter_serach"
                            placeholder='Search Here'
                            InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <SearchIcon/>
                                </InputAdornment>
                            ),
                            sx:{
                                height:'30px',
                            }
                            }}
                            variant="outlined"
                            onChange={(e)=>handlesidefilterChange('SerachJobText', e.target.value)}
                            
                        />

                        {JobTitlesCopy && JobTitlesCopy.map((val, idx)=>(
                             <FormGroup key={idx}>
                                <FormControlLabel 
                                    control={
                                            <Checkbox  sx={{ml:'auto'}}  
                                                onChange={(e)=>handlesidefilterChange('selectedJobTitles', val.code, e)} 
                                                checked={sideFilterState.selectedJobTitles?.includes(val.code) || false}/>
                                            } 
                                            label={
                                                <Typography variant="jost_14_regular" sx={{color:theme.palette.extra_colors.calander,}}>{val.label}</Typography>
                                                } 
                                        
                                            labelPlacement="start" 
                                                
                                />
                             
                           </FormGroup>
                        ))}



                        </AccordionDetails>
                    </Accordion>
                    <div  className="d-flex justify-content-center align-items-center mt-3"> 
                        <Button variant={hasKeyWithValue(sideFilterState)? "app_button" :"disabled_button"} disabled={hasKeyWithValue(sideFilterState)? false :true} sx={{ px:3, width:'80%'}} onClick = {()=>handleFilterBtn(type)}><Typography variant="jost_16_medium">Apply Filter</Typography></Button>
                    </div>

                </div>
                }
        </Box>
    )





}

export default FilterComponent