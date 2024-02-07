import "dotenv/config";
import axios from "axios";
import { RadioTracks } from "../_interfaces/RadioTracks";
import { Response } from "../_interfaces/Response";
import { loadDataFromStorage } from "../_utils/auth-utils";

const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL || "";
const accessToken = process.env.NEXT_PUBLIC_ACCESS_TOKEN || "";

export const createRadioTracks = async (
  newRadio: Omit<RadioTracks, "id">
): Promise<RadioTracks> => {
  try {
    const token = loadDataFromStorage("token");
    const response = await axios.post(`${baseURL}/radio-tracks`, newRadio, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Access-Token": accessToken,
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error creating radio tracks:", error);
    throw error;
  }
};

export const getAllRadioTracks = async (): Promise<Response> => {
  try {
    const token = loadDataFromStorage("token");
    const response = await axios.get(`${baseURL}/radio-tracks`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Access-Token": accessToken,
      },
    });
    return response.data;
  } catch (error) {
    console.log("Error fetching radio tracks:", error);
    throw error;
  }
};

export const updateRadioTracks = async (
  id: string,
  updatedRadio: RadioTracks
): Promise<RadioTracks> => {
  try {
    const token = loadDataFromStorage("token");
    const response = await axios.put(
      `${baseURL}/radio-tracks/${id}`,
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
    console.error(`Error updating radio tracks with ID ${id}:`, error);
    throw error;
  }
};

export const deleteRadioTracks = async (id: string): Promise<void> => {
  try {
    const token = loadDataFromStorage("token");
    await axios.delete(`${baseURL}/radio-tracks/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Access-Token": accessToken,
      },
    });
  } catch (error) {
    console.log("Error deleting radio tracks:", error);
    throw error;
  }
};
