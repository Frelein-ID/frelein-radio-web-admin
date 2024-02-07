"use client";

import { useRouter } from "next/navigation";
import { getAdminData } from "../_services/AdminServices";
import { Users } from "../_interfaces/Users";
import { useEffect } from "react";

export const loadDataFromStorage = (key: string): string => {
  const data = localStorage.getItem(key) || "";
  return data;
};

export const removeDataFromStorage = (key: string): void => {
  localStorage.removeItem(key);
};

export const CheckUserIsLogin = () => {
  const token = loadDataFromStorage("token");
  const id = loadDataFromStorage("userId");
  if (token !== "" && id !== "") {
    return true;
  } else {
    return false;
  }
};

export const VerifyUser = async (): Promise<Users | null> => {
  try {
    const id = loadDataFromStorage("userId");
    const response = await getAdminData(id);
    if (response.status != 200) {
      return null;
    } else {
      return response.data;
    }
  } catch (error) {
    throw error;
  }
};

export const storeDataToStoage = (data: string, key: string): void => {
  try {
    localStorage.setItem(key, data);
  } catch (error) {
    throw error;
  }
};
