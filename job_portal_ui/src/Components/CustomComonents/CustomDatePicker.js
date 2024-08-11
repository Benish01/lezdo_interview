import { DatePicker } from "@mui/x-date-pickers"
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'
import moment from "moment";




const CustomDatePicker = ({label = 'Date', value = null, defaultValue = null,  onChange = ()=>{}, isDisabled, minDate = null, maxDate = null, dateFormat = 'YYYY/MM/DD' })=>{

    // 'YYYY-MM-DD' ==>  2024-07-14
    // 'YYYY-MM-DD HH:mm:ss' ===> 2024-07-14 13:45:00
    // 'MMMM Do YYYY, h:mm:ss a' ===> July 14th 2024, 1:45:00 pm
    // 'dddd' ===> Sunday

    const handleChange = (moment_obj)=>{
        const date = moment(moment_obj).format(dateFormat)
        onChange(date)
    }

    return  (
    <LocalizationProvider dateAdapter={AdapterMoment}>
        <DatePicker 
            label={label}  
            onChange={handleChange} 
            value={value}  
            defaultValue={defaultValue} 
            disabled = {isDisabled} 
            minDate = {minDate} 
            maxDate = {maxDate}
            format={dateFormat}
            />     
    </LocalizationProvider>)
}


export default CustomDatePicker