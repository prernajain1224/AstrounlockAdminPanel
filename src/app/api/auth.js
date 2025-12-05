import { da } from "date-fns/locale";
import {
  LOGIN,
  returnOrThrow,
  postWrapper,
  FORGOT_PASSWORD,
  VERIFY_OTP,
  RESET_PASSWORD,
} from "./util";

export const login = async (data) => {
  let form = new FormData();
  form.append("email", data?.email);
  form.append("password", data?.password);
  const resJSON = await fetch(`${LOGIN}`, {
    method: "POST",
    body: JSON.stringify({ email: data?.email, password: data?.password }),
    headers: { "Content-Type": "application/json" },
  });
  const result = await returnOrThrow(resJSON);
  return result;
};

export const forgotPassword = async (data) => {
  const resJSON = await postWrapper(FORGOT_PASSWORD, data);
  const result = await returnOrThrow(resJSON);
  return result;
};


export const resetPassword = async (data) => {
  const resJSON = await postWrapper(RESET_PASSWORD, data);
  const result = await returnOrThrow(resJSON);
  return result;
};
