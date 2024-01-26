import "dotenv/config";
import axios from "axios";
import { Users } from "../_interfaces/Users";
import { Response } from "../_interfaces/Response";

const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL || "";

export const getUserByID = async (
  id: Promise<Users["id"]>,
  token: string
): Promise<Users> => {
  try {
    const response = await axios.post(`${baseURL}/user/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getAllUser = async (token: string): Promise<Response> => {
  try {
    const response = await axios.get(`${baseURL}/user`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const updateUser = async (
  id: string,
  updatedData: Users,
  token: string
): Promise<Users> => {
  try {
    const response = await axios.put(`${baseURL}/user/${id}`, updatedData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const deleteUser = async (id: string, token: string): Promise<void> => {
  try {
    await axios.delete(`${baseURL}/user/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    console.log(error);
    throw error;
  }
};
