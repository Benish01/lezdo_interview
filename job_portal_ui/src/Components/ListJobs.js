import React, { useEffect, useState } from "react"
import CustomDataTable from "./CustomComonents/CustomTable"
import { Box, IconButton, Typography } from "@mui/material"
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import { useDispatch, useSelector } from "react-redux";
import RemoveCircleRoundedIcon from '@mui/icons-material/RemoveCircleRounded';
import { changeHeaderSlice } from "../Redux/Slices/HeaderSlice";
import { changeTableSlice } from "../Redux/Slices/TableSlice";
import FilterComponent from "./FilterComponent";
import { hasKeyWithValue, to_code_str, to_readable_str } from "../Common/helper";
import moment from "moment";
import ShowJObDetails from "./ShowJObDetails";
import { call_api } from "../Common/fetch_helper";




const ListJob = ()=>{

  const dispatch = useDispatch()
  const {addFilter, HeaderFilters, sideFilterState, JobTitlesCopy, JobTitles} = useSelector(state=>state.TableSlice)
  const [job_info,setjob_info] = useState(false)

  const title_style = {
    display:'flex',
    alignItems:'center',
    pl:1,
    height:'50px',
    mt:2
  }

    const [row_data, setRowdata]   = useState([])


    const [copy_data, setCopy_data] = useState([...row_data])


    const column_data = [
            { field: 'job_title', headerName: 'Job Title', valueFormatter : (value)=>to_readable_str(value)},
            { field: 'job_opening_id', headerName: 'Job Opening ID ',  },
            { field: 'department', headerName: 'Department',  },
            { field: 'assigned_recruiter',headerName: 'Assigned Recruiter',},
            { field: 'hiring_manager',headerName: 'Hiring Manager',},
            { field: 'date_opened', headerName: 'Posted Date', valueFormatter : (value)=>moment(value, 'DD-MM-YYYY').format('DD/MM/YY')},
            { field: 'closing_date',headerName: 'Expiry Date', valueFormatter : (value)=>moment(value, 'DD-MM-YYYY').format('DD/MM/YY')},
            { field: 'current_status', headerName: 'Status', valueFormatter : (value)=>to_readable_str(value) }]


    useEffect(()=>{
      get_jobs()
    }, [])

    const get_jobs = async()=>{
      const response = await call_api('/job_opening/all', null, 'get')
      if(response.status == 'success'){
        setRowdata(response.data)
        setCopy_data(response.data)

        // const job_titles = response.data?.length  >0  &&  response.data.map((val,idx)=> ({label:to_readable_str(val.job_title), code:to_code_str(val.job_title)}))
        // dispatch(changeTableSlice({JobTitles:job_titles, JobTitlesCopy:job_titles}))
      }
    }

    const handelFilterBtn = (btn_status)=>{
      dispatch(changeTableSlice({addFilter:btn_status}))
    }

    const onHeaderfilterChange = (filter_key, filter_val)=>{
      console.log(filter_key, filter_val)
        if(!filter_val || filter_val == ""){
          setCopy_data(row_data)
          return
        }
        const data = row_data.filter((val)=>val[filter_key] == filter_val) 
        setCopy_data(data)
    }


    const onSidefilterChange = (state_key, val, checked_state) =>{

        var side_state = {...sideFilterState}
        // if(state_key !== "selectedJobTitles"){
        //   side_state[state_key] = val

        //   dispatch(changeTableSlice({sideFilterState:side_state}))
        // }

       
        if (state_key === 'fromDate' || state_key === 'toDate') {
            side_state.DateRange = { ...side_state.DateRange, [state_key]: val };
            dispatch(changeTableSlice({ sideFilterState: side_state }));
            return;
          
        }

        if(state_key == "SerachJobText"){
          if(val == "" || !val){
            dispatch(changeTableSlice({JobTitlesCopy:JobTitles}))
            return
          }
            const lowercasedFilter = val.toLowerCase();
            const newFilteredData = JobTitles.filter(item =>
              Object.values(item).some(value =>
                value.toLowerCase().includes(lowercasedFilter)
              )
            );
            dispatch(changeTableSlice({JobTitlesCopy:newFilteredData}))

            return
        }
        else if(state_key == "selectedJobTitles"){
          let selected_job_titles = Array.isArray(side_state.selectedJobTitles) ? side_state.selectedJobTitles : [];

          var new_selected_jobs = selected_job_titles;

          if (checked_state) {
            new_selected_jobs = [...selected_job_titles, val];
          } else {
            new_selected_jobs =  selected_job_titles.length > 0 && selected_job_titles.filter((value) => value != val);
          }

          side_state[state_key] = new_selected_jobs;

          dispatch(changeTableSlice({ sideFilterState: side_state }));

          return;


        

            
        }
    }
      const handleFilterClicked = (type) => {      
        if (type === 'side_filter' && hasKeyWithValue(sideFilterState)) {
          let new_copy_data = [...row_data];
      
          for (let key in sideFilterState) {
            if (key === "DateRange") {
              const { fromDate, toDate } = sideFilterState[key];
              if (fromDate) {
                new_copy_data = new_copy_data.filter(val => moment(val.date_opened, 'DD-MM-YYYY').isSameOrAfter(moment(fromDate, 'DD-MM-YYYY')));
              }
              if (toDate) {
                new_copy_data = new_copy_data.filter(val => moment(val.closing_date, 'DD-MM-YYYY').isSameOrBefore(moment(toDate, 'DD-MM-YYYY')));
              }
            } 
            else if (key === "selectedJobTitles") {
              const { selectedJobTitles } = sideFilterState;

              
              if (selectedJobTitles && selectedJobTitles.length > 0) {
                new_copy_data = new_copy_data.filter(val => selectedJobTitles.includes(val.job_title));
              }
            }
          }
      
          console.log(new_copy_data, 'Filtered Data');
          setCopy_data(new_copy_data); // Update state with the filtered data
        }
      };


      const handleReset = (type)=>{
        if(type == 'side_filter'){
          dispatch(changeTableSlice({sideFilterState:{}}))
          setCopy_data(row_data)
        }
      }
    

  const showJobDetails = (data) =>{
    setjob_info(data)
  }


    return(
        <React.Fragment>

              {job_info ?
              <>
              <ShowJObDetails job_info={job_info} setjob_info = {setjob_info}/>
              </>:
              <>

                <Box sx={title_style}>
                    <Typography variant="jost_18_semi_bold">Job Openings</Typography>
                    <Box className="filter_add_btn_section" sx={{pr:addFilter? 0: 2}}>
                        {!addFilter&& 
                        <>
                          <IconButton size="large" sx={{padding:0,  mr:1}} onClick={()=>handelFilterBtn(true)}>
                              <AddCircleRoundedIcon sx={{color:'primary.main'}}/>
                          </IconButton>
                        <Typography variant="jost_normal">Add Filter</Typography>
                        </>
                    }
                        {addFilter&& 
                        <>
                        <Typography variant="jost_normal" sx={{ml:'10px', mr:'10px'}} >Remove Filter</Typography>

                          <IconButton size="large" sx={{padding:0,}} onClick={()=>{handelFilterBtn(false);handleReset('side_filter')}} >
                              <RemoveCircleRoundedIcon sx={{color:'primary.main'}}/>
                          </IconButton>
                        </>
                    }
                    </Box>
                </Box>
            
                <div className="d-flex  w-100">
                  {addFilter && (
                    <div className="col-2">
                      <FilterComponent type={'side_filter'} onChange={onSidefilterChange} handleFilterClicked = {handleFilterClicked} handleReset = {handleReset}/>
                    </div>
                  )}
                  <div className={addFilter ? 'col-10' : 'col-12'}>
                  <FilterComponent type={'header_filter'} onChange={onHeaderfilterChange}/>
                    <CustomDataTable row_data={copy_data} column_data={column_data} show_job_details ={(data)=>showJobDetails(data)}/>
                  </div>
                </div>
              </>
              }


        </React.Fragment>
    )
}


export default ListJob