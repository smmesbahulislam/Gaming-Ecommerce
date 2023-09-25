import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    selectedProduct: null,
    openProductDetailsDialog: false,
}

const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        setSelectedProduct(state, action){
            state.selectedProduct = action.payload;
        },
        setOpenProductDetailsDialog(state,action){
            state.openProductDetailsDialog = action.payload;
        }

    }
})

export const {
    setSelectedProduct,
    setOpenProductDetailsDialog
} = productSlice.actions

export default productSlice.reducer;