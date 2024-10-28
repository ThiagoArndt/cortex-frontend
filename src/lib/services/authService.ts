import axiosInstance from "../axiosInstance";

export const login = async (email: string, password: string) => {
  try {
    const response = await axiosInstance.post("/api/login", {
      email,
      password,
    });

    return response.data;
  } catch (error) {
    console.error("Login error:", error);
    throw error;
  }
};

export const register = async (email: string, password: string, username: string) => {
  try {
    const response = await axiosInstance.post("/api/register", {
      email,
      password,
      username,
    });

    return response.data;
  } catch (error) {
    console.error("Registration error:", error);
    throw error;
  }
};
