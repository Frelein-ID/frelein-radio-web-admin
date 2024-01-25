import "dotenv/config";
import axios from "axios";
import { History } from "../_interfaces/History";

const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL || "";

export const getHistoryByID = async (
  id: Promise<History["id"]>,
  token: string
): Promise<History> => {
  try {
    const response = await axios.get(`${baseURL}/history/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching history:", error);
    throw error;
  }
};

export const getAllHistory = async (token: string): Promise<History[]> => {
  try {
    const response = await axios.get(`${baseURL}/history`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.log("Error fetching history:", error);
    throw error;
  }
};
