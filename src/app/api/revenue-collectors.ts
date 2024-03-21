import axios, { axiosAuth } from "@/utils/axios";
import { isAxiosError } from "axios";

export const getRevenueCollectors = async () => {
  try {
    const response = await axios.get(`api/revenue-collectors`);

    return response;
  } catch (error) {
    if (isAxiosError(error)) {
      return error.response;
    } else {
      console.log(error);
    }
  }
};

export const getRevenueCollector = async (id: string) => {
  try {
    const response = await axios.get(`api/revenue-collectors/${id}`);

    return response;
  } catch (error) {
    if (isAxiosError(error)) {
      return error.response;
    } else {
      console.log(error);
    }
  }
};

export const addRevenueCollector = async (payload: IRevenueCollector) => {
  try {
    const response = await axiosAuth.post(`api/revenue-collectors`, payload);

    return response;
  } catch (error) {
    if (isAxiosError(error)) {
      return error.response;
    } else {
      console.log(error);
    }
  }
};

export const updateRevenueCollector = async (payload: IRevenueCollector) => {
  try {
    const response = await axiosAuth.patch(
      `api/revenue-collectors/${payload._id}`,
      payload
    );

    return response;
  } catch (error) {
    if (isAxiosError(error)) {
      return error.response;
    } else {
      console.log(error);
    }
  }
};

export const suspendRevenueCollector = async (id: string) => {
  try {
    const response = await axiosAuth.patch(
      `api/revenue-collectors/suspend/${id}`
    );

    return response;
  } catch (error) {
    if (isAxiosError(error)) {
      return error.response;
    } else {
      console.log(error);
    }
  }
};

export const restoreRevenueCollector = async (id: string) => {
  try {
    const response = await axiosAuth.patch(
      `api/revenue-collectors/restore/${id}`
    );

    return response;
  } catch (error) {
    if (isAxiosError(error)) {
      return error.response;
    } else {
      console.log(error);
    }
  }
};

export const deleteRevenueCollector = async (id: string) => {
  try {
    const response = await axiosAuth.delete(`api/revenue-collectors/${id}`);

    return response;
  } catch (error) {
    if (isAxiosError(error)) {
      return error.response;
    } else {
      console.log(error);
    }
  }
};
