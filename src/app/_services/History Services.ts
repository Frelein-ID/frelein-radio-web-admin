import "dotenv/config";
import axios from "axios";
import { History } from "../_interfaces/History";
import { loadDataFromStorage } from "../_utils/auth-utils";

const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL || "";
const accessToken = process.env.NEXT_PUBLIC_ACCESS_TOKEN || "";

export const getHistoryByID = async (
  id: Promise<History["id"]>
): Promise<History> => {
  try {
    const token = loadDataFromStorage("token");
    const response = await axios.get(`${baseURL}/history/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Access-Token": accessToken,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getAllHistory = async (): Promise<History[]> => {
  try {
    const token = loadDataFromStorage("token");
    const response = await axios.get(`${baseURL}/history`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Access-Token": accessToken,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
