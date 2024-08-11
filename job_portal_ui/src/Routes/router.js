import {createBrowserRouter} from 'react-router-dom'
import HomeLayOut from './Layouts/HomeLayout'
import JobOpenings from '../Components/JobOpenings'



const router = createBrowserRouter([

    {
        path:'/',
        element:<HomeLayOut/>,
        children:[  
            {
                path:'/job_openings',
                element:<JobOpenings/>
            }
        ]
        
    }

])


export default router