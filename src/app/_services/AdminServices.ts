import "dotenv/config";
import axios from "axios";
import { Response } from "../_interfaces/Response";
import { loadDataFromStorage } from "../_utils/auth-utils";

const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL || "";
const accessToken = process.env.NEXT_PUBLIC_ACCESS_TOKEN || "";

export const getStatistics = async (): Promise<Response> => {
  try {
    const token = loadDataFromStorage("token");
    const response = await axios.get<Response>(`${baseURL}/admin/statistics`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Access-Token": accessToken,
      },
    });
    return response.data;
  } catch (error: any) {
    return error.response.data;
  }
};

export const getAdminData = async (id: String): Promise<Response> => {
  try {
    const token = loadDataFromStorage("token");
    const response = await axios.get(`${baseURL}/user/${id}/my`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Access-Token": accessToken,
      },
    });
    return response.data;
  } catch (error: any) {
    return error.response.data;
  }
};
