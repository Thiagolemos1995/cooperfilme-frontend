import { cooperfilmeApi } from "../api.service";
import { ISendScript } from "../../interfaces";

export const scriptsService = {
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
