import { getAdminData } from "../_services/AdminServices";

export const loadDataFromStorage = (key: string): string => {
  const data = localStorage.getItem(key) || "";
  return data;
};

export const verifyUser = async () => {
  try {
    const token = loadDataFromStorage("token");
    const id = loadDataFromStorage("userId");
    const response = await getAdminData(token, id);
    return response.data;
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
