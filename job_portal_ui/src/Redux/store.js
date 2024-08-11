import { configureStore } from '@reduxjs/toolkit';
import HeaderSlice from './Slices/HeaderSlice';
import TableSlice from './Slices/TableSlice';
import CreateJObSlice from './Slices/CreateJObSlice';


const rootReducer = {
 HeaderSlice:HeaderSlice,
 TableSlice:TableSlice,
 CreateJObSlice:CreateJObSlice
};

const store = configureStore({
  reducer: rootReducer,
  
});



// const persistor = persistStore(store);
export { store };



