


import { Label } from "@mui/icons-material";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";


const initialState = {
    DrawerState:false,
    selectedMenuIdx:0,
    ListJobs:false,
    CreateJobs : false,
    DrawerWidth : 240,
    HeaderMenu:false,
    HeaderMenus:[
        {
        label : 'Job Opening', key:'job_opening'
        },
        {
            label : 'Candidate', key:'candidate'
        },
        {
            label : 'Job Applications', key:'job_applications'
        },
        {
            label : 'Interview', key:'interview'
        },
        {
            label : 'Assessment', key:'assessment'
        },
        {
            label : 'Offer', key:'offer'
        },
        {
            label : 'Department', key:'department'
        }
]
}
const HeaderSlice = createSlice({
    name: 'header',
    initialState,
    reducers:{
        changeHeaderSlice :(state, action)=>{
            const data = action.payload
            for (const key in data){
               state[key] = data[key]
            }
        }
    }
})



export const {changeHeaderSlice} = HeaderSlice.actions;
export default HeaderSlice.reducer