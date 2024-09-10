import { createTheme } from '@mui/material/styles';
import custom_colors from './colors';


export const customTheme = (mode="light")=>{
    const theme = createTheme({

        palette: {
            mode, 
            primary: {
                main: custom_colors[mode].primary.main,
                contrastText:custom_colors[mode].primary.button_text,
                dark:custom_colors[mode].primary.dark,
                light:custom_colors[mode].primary.light
            },
            secondary:{
                main:custom_colors[mode].secondary.main
            },
            extra_colors:custom_colors[mode].extra_colors


    },
    typography: {
        fontFamily: '"Jost", Arial, sans-serif',
      },

    })


    theme.components = {
        MuiCssBaseline:{
            styleOverrides:{
                p :{
                    margin:0
                }
            }
        },
        MuiButton:{
            styleOverrides:{
                root:{
                    textTransform:'none',
                    
                }
            },
            variants:[
                
                    {
                        props: { variant: 'app_button'},
                        style: { backgroundColor:theme.palette.secondary.main, color:theme.palette.primary.contrastText, 
                            '&:hover':{
                                backgroundColor:theme.palette.secondary.main 
                            }
                        }
                    },
                    {
                        props: { variant: 'disabled_button'},
                        style: { backgroundColor:theme.palette.extra_colors.disabled_button_bg, color:theme.palette.primary.light, 
                            '&:hover':{
                                backgroundColor:theme.palette.extra_colors.disabled_button_bg,
                                
                            }
                        }
                    },
                    
                    {
                        props: { variant: 'grey_buuton'},
                        style: { backgroundColor:theme.palette.primary.light, color:theme.palette.primary.dark, 
                            boxShadow:"0 0 0 2px rgba(0, 0, 0, 0.1)",
                            borderRadius:'5px',
                            '&:hover':{
                                backgroundColor:theme.palette.extra_colors.disabled_button_bg,
                                
                            }
                        }
                    },
                    
                    
                
            ]
        },
        MuiTypography:{

            variants:[
                {
                    props: { variant: 'jost_normal'},
                    style: { 
                        fontSize:'12px',
                        fontWeight:500,
                        lineHeight:'17.34px'
                    }
                },
                {
                    props: { variant: 'jost_14_medium'},
                    style: { 
                        fontSize:'14px',
                        fontWeight:500,
                        lineHeight:'20.23px'
                    }
                },
                {
                    props: { variant: 'edit_link'},
                    style: { 
                        fontSize:'16px',
                        fontWeight:500,
                        lineHeight:'23.12px',
                        color:theme.palette.secondary.main 
                    }
                    
                },
                {
                    props: { variant: 'jost_14_regular'},
                    style: { 
                        fontSize:'14px',
                        fontWeight:400,
                        lineHeight:'20.23px'
                    }
                },
                {
                    props: { variant: 'jost_18_semi_bold'},
                    style: { 
                        fontSize:'18px',
                        fontWeight:600,
                        lineHeight:'26.01px'
                    }
                },
                {
                    props: { variant: 'jost_16_medium'},
                    style: { 
                        fontSize:'16px',
                        fontWeight:500,
                        lineHeight:'23.12px'
                    }
                },
                {
                    props: { variant: 'jost_12_regular'},
                    style: { 
                        fontSize:'12px',
                        fontWeight:400,
                        lineHeight:'17.34px'
                    }
                },
                {
                    props: { variant: 'jost_16_semi_bold'},
                    style: { 
                        fontSize:'16px',
                        fontWeight:600,
                        lineHeight:'23.12px'
                    }
                },
            ]
        },
        MuiBox: {
            variants: [
              {
                props: { variant: 'customBox' },
                style: {
                  background: '#F6F6F6',
                  borderRadius: '8px',
                  padding: '10px',
                  display: 'flex',
                  alignItems: 'center',
                },
              },
            ],
          },

        MuiMenuItem:{
            styleOverrides:{
                root:{
                    '&:hover':{
                        backgroundColor:theme.palette.primary.main,
                        color:theme.palette.primary.contrastText
                    },
                    // '&.Mui-selected': {
                    //     backgroundColor: theme.palette.primary.main,
                    //     color: theme.palette.primary.contrastText,
                    //   },
                }
            }
        }
  
      
}

    return theme
}