import React, { useEffect, useMemo, useState } from 'react';
import { Box, InputAdornment, TextField } from '@mui/material';
import { DataGrid, GridToolbarColumnsButton, GridToolbarContainer, GridToolbarDensitySelector, GridToolbarExport, GridToolbarFilterButton, GridPagination } from '@mui/x-data-grid';
import { useTheme } from '@emotion/react';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import { useDispatch, useSelector } from 'react-redux';
import { changeTableSlice } from '../../Redux/Slices/TableSlice';




const CustomToolbar = () => {
  const theme = useTheme()

  const dispatch = useDispatch()

  const {TableHeadSerachText, HeaderFilters, headerFilteridx} = useSelector(state=>state.TableSlice)

  
  return (
    <GridToolbarContainer >
      <Box sx={{ display: 'flex', alignItems: 'center',  width: '100%' }}>
      <Box sx={{width:'20vw', ml:1}}>
                        <TextField
                            id="header_serach"
                            placeholder='Search here'
                            value={TableHeadSerachText}
                            InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SearchIcon sx={{color:'primary.dark'}}/>
                                </InputAdornment>
                            ),
                            endAdornment:(
                              <InputAdornment position="end" sx={{cursor:'pointer'}} onClick = {()=>dispatch(changeTableSlice({TableHeadSerachText:''}))}>
                                <ClearIcon />
                              </InputAdornment>
                            ),
                            sx:{
                                borderRadius:'5px',
                                height:'40px',
                            }
                            }}
                            variant="outlined"
                            onChange={(e)=>dispatch(changeTableSlice({TableHeadSerachText:e.target.value}))}
                        />
                    </Box>
        <Box sx={{ display: 'flex', flex:1, justifyContent: 'end', gap: 1 }}>
          <GridPagination/>
          <GridToolbarFilterButton   slotProps={{
              button: {
                sx: { color: theme.palette.primary.dark } 
              },
            }}/>
          <GridToolbarColumnsButton   slotProps={{
              button: {
                sx: { color: theme.palette.primary.dark } 
              }
            }}/>
          
          <GridToolbarDensitySelector  slotProps={{
              button: {
                sx: { color: theme.palette.primary.dark } 
              }
            }}/>
          <GridToolbarExport slotProps={{
              button: {
                sx: { color: theme.palette.primary.dark } 
              }
            }}/>
          
        </Box>
        
      </Box>
    </GridToolbarContainer>
  );
};



const CustomDataTable = ({ row_data, column_data, default_page_size = 5, check_box = true ,show_job_details,  disable_column_resize = true, disable_column_menu = true}) => {


  const rowData = useMemo(() => row_data, [row_data]);

  const [filteredData, setFilteredData] = useState(row_data)

  const columnData = useMemo(() => column_data.map((column) => ({
    ...column,
    flex: 1,
    headerAlign: 'center',
    align: 'center',
  })), [column_data,]);

  const {TableHeadSerachText} = useSelector(state=>state.TableSlice)

  useEffect(() => {
    if (!TableHeadSerachText) {
      setFilteredData(rowData)
      return;
    }

    const lowercasedFilter = TableHeadSerachText.toLowerCase();
    const newFilteredData = rowData.filter(item =>
      Object.values(item).some(value =>
        String(value).toLowerCase().includes(lowercasedFilter)
      )
    );

    setFilteredData(newFilteredData)

  
  }, [TableHeadSerachText, rowData]);

  
  const handleRowClick = (params) => {
    show_job_details(params.row)
  };
  

  const pageSizeOptions = [5, 10, 20, 50];

  return (
    <div style={{ width: '100%', maxHeight: 500, }}>
      <DataGrid
        rows={filteredData}
        columns={columnData}
        slots={{
          toolbar: CustomToolbar,
        }}
        initialState={{
          pagination: {
            paginationModel: {
              page: 0,
              pageSize: default_page_size,
            },
          },
        }}
        pageSizeOptions={pageSizeOptions}
        checkboxSelection={check_box}
        hideFooterPagination
        onRowClick={handleRowClick}
        hideFooter
        disableColumnResize = {disable_column_resize}
        disableColumnMenu = {disable_column_menu}
        

        
      />
    </div>
  );
};

export default CustomDataTable;
