import { createSlice } from '@reduxjs/toolkit'

// appAPi
import appApi from '../services/appApi'

const initialState = [];

export const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        updateProducts: (_, action) => {
            return action.payload;
        }
    },
})

export const { updateProducts } = productSlice.actions;
export default productSlice.reducer