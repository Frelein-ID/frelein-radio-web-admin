import "dotenv/config";
import axios from "axios";
import { Users } from "../_interfaces/Users";
import { Response } from "../_interfaces/Response";

const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL || "";
const accessToken = process.env.NEXT_PUBLIC_ACCESS_TOKEN || "";

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
