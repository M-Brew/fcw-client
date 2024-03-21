import axios, { axiosAuth } from "@/utils/axios";
import { isAxiosError } from "axios";

export const getClients = async () => {
  try {
    const response = await axios.get(`api/clients`);

    return response;
  } catch (error) {
    if (isAxiosError(error)) {
      return error.response;
    } else {
      console.log(error);
    }
  }
};

export const getClient = async (id: string) => {
  try {
    const response = await axios.get(`api/clients/${id}`);

    return response;
  } catch (error) {
    if (isAxiosError(error)) {
      return error.response;
    } else {
      console.log(error);
    }
  }
};

export const addClient = async (payload: IClient) => {
  try {
    const response = await axiosAuth.post(`api/clients`, payload);

    return response;
  } catch (error) {
    if (isAxiosError(error)) {
      return error.response;
    } else {
      console.log(error);
    }
  }
};

export const updateClient = async (payload: IClient) => {
  try {
    const response = await axiosAuth.patch(`api/clients/${payload._id}`, payload);

    return response;
  } catch (error) {
    if (isAxiosError(error)) {
      return error.response;
    } else {
      console.log(error);
    }
  }
};

export const suspendClient = async (id: string) => {
  try {
    const response = await axiosAuth.patch(`api/clients/suspend/${id}`);

    return response;
  } catch (error) {
    if (isAxiosError(error)) {
      return error.response;
    } else {
      console.log(error);
    }
  }
};

export const restoreClient = async (id: string) => {
  try {
    const response = await axiosAuth.patch(`api/clients/restore/${id}`);

    return response;
  } catch (error) {
    if (isAxiosError(error)) {
      return error.response;
    } else {
      console.log(error);
    }
  }
};

export const deleteClient = async (id: string) => {
  try {
    const response = await axiosAuth.delete(`api/clients/${id}`);

    return response;
  } catch (error) {
    if (isAxiosError(error)) {
      return error.response;
    } else {
      console.log(error);
    }
  }
};
