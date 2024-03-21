import axios, { axiosAuth } from "@/utils/axios";
import { isAxiosError } from "axios";

export const getInvoices = async () => {
  try {
    const response = await axios.get(`api/invoices`);

    return response;
  } catch (error) {
    if (isAxiosError(error)) {
      return error.response;
    } else {
      console.log(error);
    }
  }
};

export const getInvoice = async (id: string) => {
  try {
    const response = await axios.get(`api/invoices/${id}`);

    return response;
  } catch (error) {
    if (isAxiosError(error)) {
      return error.response;
    } else {
      console.log(error);
    }
  }
};

// export const addInvoice = async (payload: IInvoice) => {
//   try {
//     const response = await axiosAuth.post(`api/invoices`, payload);

//     return response;
//   } catch (error) {
//     if (isAxiosError(error)) {
//       return error.response;
//     } else {
//       console.log(error);
//     }
//   }
// };

// export const updateInvoice = async (payload: IInvoice) => {
//   try {
//     const response = await axiosAuth.patch(`api/invoices/${payload._id}`, payload);

//     return response;
//   } catch (error) {
//     if (isAxiosError(error)) {
//       return error.response;
//     } else {
//       console.log(error);
//     }
//   }
// };

// export const deleteInvoice = async (id: string) => {
//   try {
//     const response = await axiosAuth.delete(`api/invoices/${id}`);

//     return response;
//   } catch (error) {
//     if (isAxiosError(error)) {
//       return error.response;
//     } else {
//       console.log(error);
//     }
//   }
// };
