import { ISigninForm } from "@/interfaces";
import { cooperfilmeApi } from "../api.service";

export const authService = {
  async login({ email, password }: ISigninForm) {
    try {
      const response = await cooperfilmeApi("/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username: email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          `Failed to send script: ${errorData.message || response.statusText}`
        );
      }

      console.log(`${email} is signed in`);
      return response.json();
    } catch (error) {
      if (error instanceof Error) {
        console.error("Login error:", error);
        throw new Error(`Login error: ${error.message}`);
      } else {
        console.error("Login error:", error);
        throw new Error("Login error");
      }
    }
  },
};
