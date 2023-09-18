import { createSlice } from "@reduxjs/toolkit";

interface Status {
  paid: boolean;
}
const initialState: Status = {
  paid: false,
};
const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    orderSuccess: (state) => {
      state.paid = true;
    },
    orderFailure: (state) => {
      state.paid = false;
    },
  },
});
export const { orderSuccess, orderFailure } = orderSlice.actions;
export default orderSlice.reducer;
