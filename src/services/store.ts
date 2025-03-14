import { combineSlices, configureStore } from '@reduxjs/toolkit';
import { mainSlice } from './slice';
  
  const rootReducer = combineSlices(mainSlice);
  
  const store = configureStore({
    reducer: rootReducer,
  });
export default store;