"use client";

import dotenv from "dotenv";
import axios from "axios";
import { Users } from "../_interfaces/Users";
import { Response } from "../_interfaces/Response";

dotenv.config();

const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL || "";

export const login = async (data: Users): Promise<Response> => {
  try {
    const email = data.email;
    const password = data.password;
    const response = await axios.post(
      `${baseURL}/auth/login`,
      {
        email: email,
        password: password,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.log({ error });
    throw error;
  }
};
