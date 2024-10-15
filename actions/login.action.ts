"use server";

import { ISigninForm } from "@/interfaces";
import { authService } from "@/services";

export async function loginAction(payload: ISigninForm) {
  const { email } = payload;
  console.debug(`${email} is signing in ...`);
  const response = await authService.login(payload);
  return response;
}
