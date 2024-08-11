


import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";


const initialState = {
    DrawerState:false,
    selectedMenuIdx:0,
    ListJobs:false,
    CreateJobs : false,
    DrawerWidth : 240,
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