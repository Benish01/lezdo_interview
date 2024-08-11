
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";


const HeaderFilters = [
    {
        label:"All Openings",
        code:''
    },
    {
        label:'In-Progress',
        code:'in_progress'
    },
    {
        label:'Waiting for approval',
        code:'waiting_for_approval'
    },
    {
        label:'On Hold',
        code:'on_hold'
    },
    {
        label:'Filled',
        code:'filled'
    },
    {
        label:'Cancelled',
        code:'cancelled'
    },
    {
        label:'Declined',
        code:'declined'
    },
    {
        label:'In-Active',
        code:'in_active'
    }
]

const jobDetailsFilter = [
    {
        label:"Info",
        code:''
    },
    {
        label:'Tags',
        code:'tags'
    },
    {
        label:'Notes',
        code:'notes'
    },
    {
        label:'Attachments',
        code:'attachments'
    },
    {
        label:'Interview',
        code:'interview'
    },
    {
        label:'Shared Vendors',
        code:'vendors'
    },
    {
        label:'To Do’s',
        code:'to_dos'
    },
    {
        label:'Checklists',
        code:'checklists'
    },
    {
        label:'Pre-screening Assignment',
        code:'assignment'
    }
  
]

const SideFilters = [{
    label:'Date Range',
    type:'date_picker'
}]


const initialState = {
    addFilter: false,
    TableHeadSerachText:'',
    HeaderFilters:HeaderFilters,
    jobDetailsFilter:jobDetailsFilter,
    headerFilteridx:0,
    job_detail_header:0,
    sideFilterState:{
    },
    JobTitles:[{ label: "UI Designer", code: "ui_designer" },
        { label: "UX Designer", code: "ux_designer" },
        { label: "Graphics Designer", code: "graphics_designer" },
        { label: "Junior Developer", code: "junior_developer" },
        { label: "Frontend Developer", code: "frontend_developer" },
        { label: "Backend Developer", code: "backend_developer" }],
    JobTitlesCopy : [{ label: "UI Designer", code: "ui_designer" },
        { label: "UX Designer", code: "ux_designer" },
        { label: "Graphics Designer", code: "graphics_designer" },
        { label: "Junior Developer", code: "junior_developer" },
        { label: "Frontend Developer", code: "frontend_developer" },
        { label: "Backend Developer", code: "backend_developer" }]
}
const TableSlice = createSlice({
    name: 'table_slice',
    initialState,
    reducers:{
        changeTableSlice :(state, action)=>{
            const data = action.payload
            for (const key in data){
               state[key] = data[key]
            }
        }
    }
})



export const {changeTableSlice} = TableSlice.actions;
export default TableSlice.reducer