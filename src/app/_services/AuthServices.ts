"use client";

import dotenv from "dotenv";
import axios from "axios";
import { Users } from "../_interfaces/Users";
import jwt, { Secret, verify } from "jsonwebtoken";

dotenv.config();

const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL || "";

type LoginResponse = {
  data: Users;
};

export const login = async (data: Users): Promise<Object> => {
  try {
    const email = data.email;
    const password = data.password;
    const response = await axios.post<LoginResponse>(
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
    return { error };
  }
};

export const register = async (
  name: string,
  username: string,
  email: string,
  password: string
): Promise<any> => {};

export const verifyToken = (token: string): Promise<any> => {
  const secretKey = process.env.JWT_SECRET_KEY || "";
  console.log({ secretKey, baseURL });
  return new Promise((resolve, reject) => {
    if (!token) {
      reject("Token is missing");
      return;
    }

    verify(token, secretKey, (err, decoded) => {
      if (err) {
        console.log({ err });
        reject("Token verification failed");
        return;
      }

      resolve(decoded);
    });
  });
};
