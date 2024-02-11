import dotenv from "dotenv";
import axios from "axios";
import { Response } from "../_interfaces/Response";
import { loadDataFromStorage } from "../_utils/auth-utils";
import { Personalities } from "../_interfaces/Personalities";

dotenv.config();

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
    console.log({ error });
    throw error;
  }
};
