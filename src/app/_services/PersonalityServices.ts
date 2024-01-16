import "dotenv/config";
import axios from "axios";
import { PersonalityInfo } from "../_interfaces/PersonalityInfo";

const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL || "";

export const createPersonalityInfo = async (
  newRadio: Omit<PersonalityInfo, "id">,
  token: string
): Promise<PersonalityInfo> => {
  try {
    const response = await axios.post(`${baseURL}/personality-info`, newRadio, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error creating personality info:", error);
    throw error;
  }
};

export const getPersonalityInfoByID = async (
  id: Promise<PersonalityInfo["id"]>,
  token: string
): Promise<PersonalityInfo> => {
  try {
    const response = await axios.post(`${baseURL}/personality-info/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error creating personality info:", error);
    throw error;
  }
};

export const getAllPersonalityInfo = async (
  token: string
): Promise<PersonalityInfo[]> => {
  try {
    const response = await axios.get(`${baseURL}/personality-info`, {
      headers: {
        Authorization: `Bearer ${token}`,
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
  updatedRadio: PersonalityInfo,
  token: string
): Promise<PersonalityInfo> => {
  try {
    const response = await axios.put(
      `${baseURL}/personality-info/${id}`,
      updatedRadio,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error(`Error updating personality info with ID ${id}:`, error);
    throw error;
  }
};

export const deletePersonalityInfo = async (id: string): Promise<void> => {
  try {
    await axios.delete(`${baseURL}/personality-info/${id}`);
  } catch (error) {
    console.log("Error deleting personality info:", error);
    throw error;
  }
};
