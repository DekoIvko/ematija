import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IProducts } from "../interfaces/IProducts";

interface IInitialState {
  cartProducts: Array<IProducts>;
}

const initialState: IInitialState = {
  cartProducts: [],
};

const cartProductsSlice = createSlice({
  name: "cartProducts",
  initialState,
  reducers: {
    addProductToCart: (state: IInitialState, action: PayloadAction<any>) => {
      console.log(action);
      const tempState = state;
      tempState.cartProducts.push(action.payload);

      state = tempState;
    },
    removeProductToCart: (state: any, action: PayloadAction<any>) => {
      console.log(action);
      const tempState = state;
      tempState.productsToBuy.filter((product: any) => !product.checked);

      state = tempState;
    },
  },
});

export const { addProductToCart, removeProductToCart } =
  cartProductsSlice.actions;
export default cartProductsSlice.reducer;
