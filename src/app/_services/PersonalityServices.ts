import "dotenv/config";
import axios from "axios";
import { PersonalityInfo } from "../_interfaces/PersonalityInfo";
import { Response } from "../_interfaces/Response";
import { loadDataFromStorage } from "../_utils/auth-utils";

const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL || "";
const accessToken = process.env.NEXT_PUBLIC_ACCESS_TOKEN || "";

export const createPersonalityInfo = async (
  newRadio: PersonalityInfo
): Promise<Response> => {
  try {
    const token = loadDataFromStorage("token");
    const response = await axios.post(`${baseURL}/personality-info`, newRadio, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        "Access-Token": accessToken,
      },
    });
    return response.data;
  } catch (error: any) {
    return error.response.data;
  }
};

export const getPersonalityInfoByID = async (id: string): Promise<Response> => {
  try {
    const token = loadDataFromStorage("token");
    const response = await axios.get(`${baseURL}/personality-info/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Access-Token": accessToken,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error creating personality info:", error);
    throw error;
  }
};

export const getAllPersonalityInfo = async (): Promise<Response> => {
  try {
    const token = loadDataFromStorage("token");
    const response = await axios.get(`${baseURL}/personality-info`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Access-Token": accessToken,
      },
    });
    return response.data;
  } catch (error) {
    console.log("Error fetching personality info:", error);
    throw error;
  }
};

export const updatePersonalityInfo = async (
  id: string,
  updatedRadio: PersonalityInfo
): Promise<Response> => {
  try {
    const token = loadDataFromStorage("token");
    const response = await axios.put(
      `${baseURL}/personality-info/${id}`,
      updatedRadio,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Access-Token": accessToken,
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error(`Error updating personality info with ID ${id}:`, error);
    throw error;
  }
};

export const deletePersonalityInfo = async (id: string): Promise<Response> => {
  try {
    const token = loadDataFromStorage("token");
    const response = await axios.delete(`${baseURL}/personality-info/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Access-Token": accessToken,
      },
    });
    return response.data;
  } catch (error) {
    console.log("Error deleting personality info:", error);
    throw error;
  }
};
