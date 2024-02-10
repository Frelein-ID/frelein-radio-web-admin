import "dotenv/config";
import axios from "axios";
import { RadioTracks } from "../_interfaces/RadioTracks";
import { Response } from "../_interfaces/Response";
import { loadDataFromStorage } from "../_utils/auth-utils";

const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL || "";
const accessToken = process.env.NEXT_PUBLIC_ACCESS_TOKEN || "";

export const createRadioTracks = async (
  newRadio: Omit<RadioTracks, "id">
): Promise<Response> => {
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
  } catch (error: any) {
    throw error.response.data;
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
  } catch (error: any) {
    throw error.response.data;
  }
};

export const getRadioTracksByID = async (id: string): Promise<Response> => {
  try {
    const token = loadDataFromStorage("token");
    const response = await axios.get(`${baseURL}/radio-tracks/${id}`, {
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

export const updateRadioTracks = async (
  id: string,
  updatedRadio: RadioTracks
): Promise<Response> => {
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
  } catch (error: any) {
    throw error.response.data;
  }
};

export const deleteRadioTracks = async (id: string): Promise<Response> => {
  try {
    const token = loadDataFromStorage("token");
    const response: Response = await axios.delete(
      `${baseURL}/radio-tracks/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Access-Token": accessToken,
        },
      }
    );
    return response.data;
  } catch (error: any) {
    throw error.response.data;
  }
};
