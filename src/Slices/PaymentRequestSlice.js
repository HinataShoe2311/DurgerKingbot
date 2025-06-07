// Slice for Async API calls
"use client"
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import createPaymentLink from "@/Services/CreatePaymentLink";
const initialState = {
  paymentRequestDetails: {},
  loading: false,
  error: "",
};

export const paymentRequest = createAsyncThunk("payment/CreateLinks", (body) => {
  // getUserDetails is an API call
  return createPaymentLink(body);
});

const PaymentRequestSlice = createSlice({
  name: "PaymentRequest",
  initialState,
  reducers: {
    resetPaymentStore: () => initialState
  },
  extraReducers: (builder) => {
    builder.addCase(paymentRequest.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(paymentRequest.fulfilled, (state, action) => {
      state.loading = false;
      state.paymentRequestDetails = action.payload;
      
      window.location.href = action.payload.short_url;

      state.error = "";
    });
    builder.addCase(paymentRequest.rejected, (state, action) => {
      state.loading = false;
      state.paymentRequestDetails = {};
      state.error = action.error.message;
    });
  },
});
export const {  resetPaymentStore } = PaymentRequestSlice.actions;
export default PaymentRequestSlice;