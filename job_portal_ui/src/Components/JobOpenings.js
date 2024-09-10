
import { Box, Button, Grid, IconButton, LinearProgress, Typography } from "@mui/material"
import React, { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import ListJob from "./ListJobs"
import CreateJob from "./CreateJob"
import { changeHeaderSlice } from "../Redux/Slices/HeaderSlice"
import CustomModal from "./CustomComonents/CustomModal"
import { generate_columns_for_imported_data, is_csv_file } from "../Common/helper"
import { changeTableSlice } from "../Redux/Slices/TableSlice"
import Papa from 'papaparse'
import CloseIcon from '@mui/icons-material/Close';
import { IoCloudUploadOutline } from "react-icons/io5"
import { useTheme } from "@emotion/react"
import { FaRegFileLines } from "react-icons/fa6";
import { RiDeleteBin6Line } from "react-icons/ri";
import { CiEdit } from "react-icons/ci";
import { call_api, file_upload } from "../Common/fetch_helper"
import { notifyError, notifySuccess } from "./CustomComonents/CustomNotify"




const JobOpenings = ()=>{


    const {ListJobs, CreateJobs} = useSelector(state=>state.HeaderSlice)
    const {ImportRowDatas,ImportModal,  ImportColumnDatas} = useSelector(state => state.TableSlice)
    // const[create_job,setcreate_job] = useState(false)

    const [upload_progress, set_upload_progress] = useState(null)
    const [file, set_file] = useState(null)
    const [file_path, set_file_path] = useState(null)

    const theme = useTheme()

    const dispatch = useDispatch()

    const title_style = {
        display:'flex',
        alignItems:'center',
        padding:3,
        backgroundColor:'#F6F6F6',
        height:'50px',
        // mt:2
    }

    const  import_modal_close = (option = false)=>{
      set_file(null)
        dispatch(changeTableSlice({ImportModal:option}))
      }
    
      const handleDragOver = (event) => {
        event.preventDefault();
        event.stopPropagation();
      };

      const handle_csv_file_import = (file) =>{
        Papa.parse(file, {
          complete:(result)=>{
            const imported_columns_datas = generate_columns_for_imported_data(result.data[0])
            dispatch(changeTableSlice({ImportColumnDatas:imported_columns_datas, ImportRowDatas:result.data}))
            dispatch(changeHeaderSlice({CreateJobs:false, ListJobs:true}))
          },
          header:true,
          skipEmptyLines:true
        })
      }
    
      const handleFileChange = (event)=>{
        event.preventDefault();
        event.stopPropagation(); 
        const files = event.target.files || event.dataTransfer.files;
        if (files && files.length > 0) {
          let file = files[0];
          if(is_csv_file(file)){
            // handle_csv_file_import(file)
            // import_modal_close()
            set_file(file)
            // handle_file_upload_api(file)
          }
          else{
            alert('please provide the correct format of files')
          }
        }
      }

      const upload = ()=>{
        handle_file_upload_api(file)
      }


      const file_upload_progress = (event)=>{
        const {loaded, total} = event
        const loadedKB = (loaded / 1024).toFixed(2);
        const totalKB = (total / 1024).toFixed(2);
        set_upload_progress({
          loaded:loadedKB,
          total:totalKB,
          percentage: Math.round((loadedKB * 100) / totalKB)
        })
      }


      const handle_file_upload_api = async(file_to_save)=>{
          const formData = new FormData()
          formData.append('file', file_to_save)

          file_upload(formData, file_upload_progress).then((response)=>{
            if(response && response.status == "success"){
              notifySuccess(response.data.message)
              set_file_path(response.data.file_path)
            }
          }).catch((error) =>{
            notifyError(error)
          })



      }

      const delete_file = async(file_path)=>{
        const result = await call_api('/common/delete_file',{file_path:file_path}, "post")
         if(result.status == "success"){
          notifySuccess(result.data.message)
          set_file(null)
          set_upload_progress(null)
          set_file_path(null)
         }
         else{
          notifyError(result.message)
         }

      }
    

    const import_modal_component = ()=>{
        return <React.Fragment>
           <Grid container spacing={3} display={'flex'} alignItems={'center'} justifyContent={'center'} sx={{pl:{xs:4}, width:'100%'}} onDragOver = {handleDragOver} onDrop={handleFileChange}>
                        <Grid item xs={10}>
                            <Typography id="custom-modal-title" variant='jost_16_semi_bold'>Import Job Openings</Typography>
                        </Grid>
                        <Grid item xs={2} display={'flex'} justifyContent={'end'} >
                            <IconButton onClick={()=>import_modal_close()} sx={{color:theme.palette.dark}}>
                                <CloseIcon />
                            </IconButton>
                        </Grid>
                    <Grid item xs={12} display={'flex'} flexDirection={'column'} alignItems={'center'} justifyContent={'center'} padding={2} gap={3} sx={{border:'1px dashed black'}} mt={2}>
                        <input
                          id="upload-button"
                          type="file"
                          style={{ display: 'none' }}
                          onChange={handleFileChange}
                        />
                        <label  htmlFor="upload-button"><div style={{cursor:'pointer'}} ><IoCloudUploadOutline color="black" size={30}/></div></label>
                        <Typography variant="jost_14_regular">Drag and Drop your files here</Typography>
                        <Typography variant="jost_14_regular" sx={{color:theme.palette.extra_colors.calander}}>or</Typography>
                        <div>
                        <label htmlFor="upload-button">
                          <Button  component="span" variant="app_button">
                            Choose File
                          </Button>
                        </label>
                      </div>
    
                    </Grid> 

                    <Grid item xs={12} sx={{paddingLeft:'0 !important'}}>
                        {file && 
                        <Box 
                          sx={{display:'flex', boxShadow:"0 0 0 2px rgba(0, 0, 0, 0.25)", borderRadius:'5px', p:3}}
                        >
                            <Box sx={{mr:1}}>
                                <FaRegFileLines color={theme.palette.primary.main} size={20}/>
                            </Box>

                             <Box sx={{flexGrow:1}}>
                              <Grid container  display={'flex'} justifyContent={'space-around'} mb={1}>
                                  <Grid item xs={9}>
                                    <Typography>{file.name}</Typography>
                                  </Grid>
                                  {file_path && <Grid item xs={3} display={'flex'} alignSelf={'end'} justifyContent={'end'} sx={{cursor:'pointer'}}>
                                        <RiDeleteBin6Line size={20} style={{ marginRight: 10 }} onClick={()=>delete_file(file_path)}/>

                                        {/* <CiEdit size={20}/> */}
                                  </Grid>}
                              </Grid>
                              {upload_progress && upload_progress.loaded &&<Box>
                                <LinearProgress  variant="determinate" value={upload_progress.percentage}/> 
                                <Typography>{upload_progress.loaded} kb of {upload_progress.total} Uploaded</Typography>
                              </Box>}
                            </Box>
                          
                        </Box>}
                        {file && file.name && <Box sx={{display:'flex', justifyContent:'end', mt:1}}>
                            <Button sx={{mr:1,}} variant="app_button" onClick={()=>upload()} disabled={file_path}>Upload</Button>
                            <Button variant="grey_buuton" onClick={()=>delete_file(file_path)} disabled={!file_path}>Cancel</Button>
                          </Box>}
                    </Grid>
                       
                        
            </Grid>
    
        </React.Fragment>
      }

    

    return(
        <React.Fragment>

          
            {CreateJobs ?
                <CreateJob/>
            :
            ListJobs ?
                <ListJob/>
              :
            <>
           
           
            <Box>
                <Box sx={title_style}>
                    <Typography variant="jost_18_semi_bold">Job Openings</Typography>
                </Box>
                <Box sx={{textAlign:"center"}}>
                    <Box className='job_opening_img_section'>
                        <img src={'create_job.png'} alt="img" style={{width:'25%'}}/>

                    </Box>
                    <Typography variant="jost_16_medium" >Create and showcase all Job Openings on your website and job boards</Typography>
                    <Grid container spacing={2} display={'flex'} alignItems={'center'}>
                        <Grid item xs={6} md={6} display={'flex'}  justifyContent={'end'}
                            >
                            <Grid><Button variant="app_button" onClick={()=>dispatch(changeHeaderSlice({CreateJobs:true}))}>Create Job</Button></Grid>
                        </Grid>
                        <Grid item xs={6} md={6} display={'flex'} justifyContent={'start'}>
                            <Grid ><Button variant="app_button" onClick={()=>import_modal_close(true)}>Import Job</Button></Grid>
                        </Grid>

                    </Grid>

                </Box>
            </Box>
         
           </>}

           { <CustomModal open={ImportModal} onClose={()=>import_modal_close()} ModalComponent={import_modal_component()} modalWidth={'30%'}/>}

        </React.Fragment>
    )
}


export default JobOpenings