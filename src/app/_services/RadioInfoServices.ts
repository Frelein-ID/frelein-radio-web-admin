import "dotenv/config";
import axios from "axios";
import { RadioInfo } from "../_interfaces/RadioInfo";
import { Response } from "../_interfaces/Response";
import { loadDataFromStorage } from "../_utils/auth-utils";

const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL || "";
const accessToken = process.env.NEXT_PUBLIC_ACCESS_TOKEN || "";

export const createRadioInfo = async (
  newRadio: RadioInfo
): Promise<Response> => {
  try {
    const token = loadDataFromStorage("token");
    const response = await axios.post(`${baseURL}/radio-info`, newRadio, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        "Access-Token": accessToken,
      },
    });
    return response.data;
  } catch (error: any) {
    throw error.response.data;
  }
};

export const getAllRadioInfo = async (): Promise<Response> => {
  try {
    const token = loadDataFromStorage("token");
    const response = await axios.get(`${baseURL}/radio-info`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Access-Token": accessToken,
      },
    });
    return response.data;
  } catch (error) {
    console.log("Error fetching radio info:", error);
    throw error;
  }
};

export const getRadioInfoByID = async (id: string): Promise<Response> => {
  try {
    const token = loadDataFromStorage("token");
    const response = await axios.get(`${baseURL}/radio-info/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Access-Token": accessToken,
      },
    });
    return response.data;
  } catch (error: any) {
    throw error.response.data;
  }
};

export const updateRadioInfo = async (
  id: string,
  updatedRadio: RadioInfo
): Promise<Response> => {
  try {
    const token = loadDataFromStorage("token");
    const response = await axios.put(
      `${baseURL}/radio-info/${id}`,
      updatedRadio,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          "Access-Token": accessToken,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error(`Error updating radio info with ID ${id}:`, error);
    throw error;
  }
};

export const deleteRadioInfo = async (id: string): Promise<Response> => {
  try {
    const token = loadDataFromStorage("token");
    const response = await axios.delete(`${baseURL}/radio-info/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Access-Token": accessToken,
      },
    });
    return response.data;
  } catch (error) {
    console.log("Error deleting radio info:", error);
    throw error;
  }
};
