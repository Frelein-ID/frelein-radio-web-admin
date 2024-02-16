import "dotenv/config";
import axios from "axios";
import { Response } from "../_interfaces/Response";
import { loadDataFromStorage } from "../_utils/auth-utils";
import { Personalities } from "../_interfaces/Personalities";

const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL || "";
const accessToken = process.env.NEXT_PUBLIC_ACCESS_TOKEN || "";

export const assignPersonalitiesToRadioTrack = async (
  data: Personalities
): Promise<Response> => {
  try {
    const token = loadDataFromStorage("token");
    const response = await axios.post<Response>(
      `${baseURL}/personalities`,
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Access-Token": accessToken,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updatePersonalitiesFromRadioTracks = async (
  id: string,
  updatedPersonalities: Personalities
): Promise<Response> => {
  try {
    const token = loadDataFromStorage("token");
    const response = await axios.put(
      `${baseURL}/personalities/${id}`,
      updatedPersonalities,
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
    throw error;
  }
};

export const deletePersonalitiesFromRadioTrack = async (
  id: string
): Promise<Response> => {
  try {
    const token = loadDataFromStorage("token");
    const response = await axios.delete<Response>(
      `${baseURL}/personalities/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Access-Token": accessToken,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
