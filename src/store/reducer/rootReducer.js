import {combineReducers} from '@reduxjs/toolkit';
import themeReducer from '../reducerSlice/themeSlice';

const rootReducer = combineReducers({
  theme: themeReducer,
});

export default rootReducer;
