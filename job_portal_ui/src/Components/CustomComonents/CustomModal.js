import { Box, Modal } from "@mui/material"




const CustomModal = ({open, onClose = ()=>{}, ModalComponent})=>{


    const handleClose = ()=>{
        onClose()
    }

    return (
        
        <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="custom-modal-title"
        aria-describedby="custom-modal-description"
    >
        <Box 
            sx={{ 
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                // width: 400,
                bgcolor: 'background.paper',
                // border: '2px solid #000',
                boxShadow: 24,
                p: 4,
                borderRadius:'13px'
            }}
        >
            {ModalComponent}
        </Box>
    </Modal>
        
    )
}


export default CustomModal