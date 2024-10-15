import { cooperfilmeApi } from "../api.service";
import { ISendScript } from "../../interfaces";

export const scriptsService = {
  async fetchAllScripts(token: string) {
    try {
      const response = await cooperfilmeApi("/script", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          `Failed to fetch scripts: ${errorData.message || response.statusText}`
        );
      }

      return response.json();
    } catch (error) {
      console.error("Error fetching scripts:", error);
      throw new Error(
        "An error occurred while fetching the scripts. Please try again later."
      );
    }
  },

  async sendScript(script: ISendScript): Promise<ISendScript> {
    try {
      const response = await cooperfilmeApi("/script/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(script),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          `Failed to send script: ${errorData.message || response.statusText}`
        );
      }

      return response.json();
    } catch (error) {
      console.error("Error sending script:", error);
      throw new Error(
        "An error occurred while sending the script. Please try again later."
      );
    }
  },
};
