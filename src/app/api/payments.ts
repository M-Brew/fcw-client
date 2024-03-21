import axios, { axiosAuth } from "@/utils/axios";
import { isAxiosError } from "axios";

export const getPayments = async () => {
  try {
    const response = await axios.get(`api/payments`);

    return response;
  } catch (error) {
    if (isAxiosError(error)) {
      return error.response;
    } else {
      console.log(error);
    }
  }
};

export const getPayment = async (id: string) => {
  try {
    const response = await axios.get(`api/payments/${id}`);

    return response;
  } catch (error) {
    if (isAxiosError(error)) {
      return error.response;
    } else {
      console.log(error);
    }
  }
};

export const addPayment = async (payload: IPayment) => {
  try {
    const response = await axiosAuth.post(`api/payments`, payload);

    return response;
  } catch (error) {
    if (isAxiosError(error)) {
      return error.response;
    } else {
      console.log(error);
    }
  }
};

export const updatePayment = async (payload: IPayment) => {
  try {
    const response = await axiosAuth.patch(`api/payments/${payload._id}`, payload);

    return response;
  } catch (error) {
    if (isAxiosError(error)) {
      return error.response;
    } else {
      console.log(error);
    }
  }
};

export const deletePayment = async (id: string) => {
  try {
    const response = await axiosAuth.delete(`api/payments/${id}`);

    return response;
  } catch (error) {
    if (isAxiosError(error)) {
      return error.response;
    } else {
      console.log(error);
    }
  }
};
