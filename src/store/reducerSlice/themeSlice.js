import {createSlice} from '@reduxjs/toolkit';

export const themeSlice = createSlice({
  name: 'theme',
  initialState: {
    isDarkmode: false,
  },
  reducers: {
    toggleTheme: state => {
      state.isDarkmode = !state.isDarkmode;
    },
  },
});

export const {toggleTheme} = themeSlice.actions;
export default themeSlice.reducer;
