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
            },
            {
                path:'/candidates',
                element:<></>
            },
            {
                path:'/job_applications',
                element:<></>
            },
            {
                path:'/interviews',
                element:<></>
            },
            {
                path:'/assessments',
                element:<></>
            },
            {
                path:'/offers',
                element:<></>
            },
            {
                path:'/departments',
                element:<></>
            },
            {
                path:'/vendors',
                element:<></>
            },
            {
                path:'/refferals',
                element:<></>
            },
            {
                path:'/to_do_s',
                element:<></>
            }
        ]
        
    }

])


export default router