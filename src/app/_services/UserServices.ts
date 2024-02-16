import "dotenv/config";
import axios from "axios";
import { Users } from "../_interfaces/Users";
import { Response } from "../_interfaces/Response";
import { loadDataFromStorage } from "../_utils/auth-utils";

const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL || "";
const accessToken = process.env.NEXT_PUBLIC_ACCESS_TOKEN || "";

export const getUserByID = async (id: Promise<Users["id"]>): Promise<Users> => {
  try {
    const token = loadDataFromStorage("token");
    const response = await axios.post(`${baseURL}/user/${id}`, {
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

export const getAllUser = async (): Promise<Response> => {
  try {
    const token = loadDataFromStorage("token");
    const response = await axios.get(`${baseURL}/user`, {
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

export const updateUser = async (
  id: string,
  updatedData: Users
): Promise<Users> => {
  try {
    const token = loadDataFromStorage("token");
    const response = await axios.put(`${baseURL}/user/${id}`, updatedData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Access-Token": accessToken,
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error: any) {
    return error.response.data;
  }
};

export const deleteUser = async (id: string): Promise<Response> => {
  try {
    const token = loadDataFromStorage("token");
    const response: Response = await axios.delete(`${baseURL}/user/${id}`, {
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
