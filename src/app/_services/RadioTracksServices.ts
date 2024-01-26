import "dotenv/config";
import axios from "axios";
import { RadioTracks } from "../_interfaces/RadioTracks";
import { Response } from "../_interfaces/Response";

const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL || "";

export const createRadioTracks = async (
  newRadio: Omit<RadioTracks, "id">,
  token: string
): Promise<RadioTracks> => {
  try {
    const response = await axios.post(`${baseURL}/radio-tracks`, newRadio, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error creating radio tracks:", error);
    throw error;
  }
};

export const getAllRadioTracks = async (token: string): Promise<Response> => {
  try {
    const response = await axios.get(`${baseURL}/radio-tracks`, {
      headers: {
        Authorization: `Bearer ${token}`,
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
  updatedRadio: RadioTracks,
  token: string
): Promise<RadioTracks> => {
  try {
    const response = await axios.put(
      `${baseURL}/radio-tracks/${id}`,
      updatedRadio,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error(`Error updating radio tracks with ID ${id}:`, error);
    throw error;
  }
};

export const deleteRadioTracks = async (
  id: string,
  token: string
): Promise<void> => {
  try {
    await axios.delete(`${baseURL}/radio-tracks/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    console.log("Error deleting radio tracks:", error);
    throw error;
  }
};
