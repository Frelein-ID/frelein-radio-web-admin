"use client";

import dotenv from "dotenv";
import axios from "axios";

dotenv.config();

const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL || "";

interface Statistics {
  total_tracks: number;
  total_radio: number;
  total_personality: number;
  total_users: number;
  users_login_last_week: Object;
  users_register_lask_week: Object;
}

export const getStatistics = async (token: String): Promise<Object> => {
  try {
    // const total_tracks = data.total_tracks;
    // const total_radio = data.total_radio;
    // const total_personality = data.total_personality;
    // const total_users = data.total_users;
    // const users_login_last_week = data.users_login_last_week;
    // const users_register_lask_week = data.users_register_lask_week;
    const response = await axios.get<Statistics>(
      `${baseURL}/admin/statistics`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response;
  } catch (error) {
    console.log({ error });
    return { error };
  }
};
