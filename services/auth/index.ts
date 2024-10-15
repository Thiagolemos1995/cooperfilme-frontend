import { cooperfilmeApi } from "../api.service";
import Cookies from "js-cookie";

export const authService = {
  async login(email: string, password: string) {
    try {
      const response = await cooperfilmeApi("/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (response.ok && data.token) {
        Cookies.set("authToken", data.token); // Save token in cookies
      }

      return data;
    } catch (error) {
      console.error("Login error:", error);
      throw new Error("Failed to login. Please try again later.");
    }
  },
};
