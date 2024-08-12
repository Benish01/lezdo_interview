// Notification.js
import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const notifySuccess = (message) => {
  toast.success(message);
};

export const notifyError = (message) => {
  toast.error(message);
};

export const notifyInfo = (message) => {
  toast.info(message);
};

export const notifyWarning = (message) => {
  toast.warning(message);
};

const CustomNotify = () => {
  return (
    <ToastContainer 
      position="bottom-right"
      autoClose={1500}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
    />
  );
};

export default CustomNotify;
