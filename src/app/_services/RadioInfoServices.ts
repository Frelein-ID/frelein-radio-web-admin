import "dotenv/config";
import axios from "axios";
import { RadioInfo } from "../_interfaces/RadioInfo";

const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL || "";

export const createRadioInfo = async (
  newRadio: Omit<RadioInfo, "id">,
  token: string
): Promise<RadioInfo> => {
  try {
    const response = await axios.post(`${baseURL}/radio-info`, newRadio, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error creating radio info:", error);
    throw error;
  }
};

export const getAllRadioInfo = async (token: string): Promise<RadioInfo[]> => {
  try {
    const response = await axios.get(`${baseURL}/radio-info`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.log("Error fetching radio info:", error);
    throw error;
  }
};

export const updateRadioInfo = async (
  id: string,
  updatedRadio: RadioInfo,
  token: string
): Promise<RadioInfo> => {
  try {
    const response = await axios.put(
      `${baseURL}/radio-info/${id}`,
      updatedRadio,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error(`Error updating radio info with ID ${id}:`, error);
    throw error;
  }
};

export const deleteRadioInfo = async (
  id: string,
  token: string
): Promise<void> => {
  try {
    await axios.delete(`${baseURL}/radio-info/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    console.log("Error deleting radio info:", error);
    throw error;
  }
};
