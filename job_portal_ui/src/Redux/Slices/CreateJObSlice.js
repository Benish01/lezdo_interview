import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  description_info: {
    job_description: "",
    requirements: "",
    benefits: "",
  },

  CreateJobTitles : [
    { label: "UI Designer", code: "ui_designer" },
    { label: "UX Designer", code: "ux_designer" },
    { label: "Graphics Designer", code: "graphics_designer" },
    { label: "Junior Developer", code: "junior_developer" },
    { label: "Frontend Developer", code: "frontend_developer" },
    { label: "Backend Developer", code: "backend_developer" }
  ],

  CreateJobHiringManagers: [
      { label: "John", code: "john" },
      { label: "Ben", code: "ben" },
      { label: "Steve", code: "steve" },
      { label: "Harry", code: "harry" }
    ],

    CreateJobOpeningStatus : [
      {label:'In-Progress', code:'in_progress'},
      {label:'Waiting for approval',code:'waiting_for_approval'},
      {label:'On Hold',code:'on_hold'},
      {label:'Filled',code:'filled'},
      {label:'Cancelled',code:'cancelled'},
      {label:'Declined',code:'declined'},
      {label:'In-Active',code:'in_active'}
    ],
    CreateJobSalary:[{label:"10k-20k", code: "10k-20k"}, {label:"20k-30k", code: "20k-30k"}, {label:"30k-45k", code: "30k-45k"}],
    CreateJobWorkExperience : [{label:"1 Year", code: "1_year"}, {label:"2 Years", code: "2_years"}, {label:"2-5 Years", code: "2-5_years"}],
    CreateJobType : [{label:"Part Time", code:'part_time'},{label:"Full Time", code:'full_time'} ],
    CreateJobSkills:[{label:"HTML", code:'html'},{label:"CSS", code:'css'}, {label:"Java Script", code:'java_script'},{label:"React", code:'react'}, {label:"Python", code:'python'},{label:"Flask", code:'flask'}   ],


    CreateJobRequiredFields : ['job_title', 'job_opening_status'],

    updateJob:{}
 
}


const CreateJobSlice = createSlice({
  name: "create_job",
  initialState,
  reducers: {
    setParsedContent: (state, action) => {
      const { field_type, content } = action.payload;

      state.description_info[field_type] = content;
    },

    setJobEditValue : (state, action)=>{
      if(action.payload == null){
        state.updateJob  = {}
        return
      }
      const {state_key, value} =  action.payload
      state.updateJob = {...state.updateJob, [state_key]:value}
    }
  },
});

export const { setParsedContent , setJobEditValue} = CreateJobSlice.actions;
export default CreateJobSlice.reducer;
