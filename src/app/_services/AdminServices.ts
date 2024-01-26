"use client";

import dotenv from "dotenv";
import axios from "axios";
import { Users } from "../_interfaces/Users";
import { Response } from "../_interfaces/Response";

dotenv.config();

const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL || "";

export const getStatistics = async (token: String): Promise<Response> => {
  try {
    const response = await axios.get<Response>(`${baseURL}/admin/statistics`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.log({ error });
    throw error;
  }
};

export const getAdminData = async (
  token: String,
  id: String
): Promise<Users> => {
  try {
    const response = await axios.get<Users>(`${baseURL}/user/${id}/my`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.log({ error });
    throw { error };
  }
};
