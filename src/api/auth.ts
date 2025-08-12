import type { AxiosError } from "axios";
import client from "./client"; // ✅ Axios 인스턴스

export interface LoginPayload {
  email: string;
  password: string;
}

export const login = async (
  payload: LoginPayload
): Promise<{ accessToken: string }> => {
  try {
    const res = await client.post("/auth/login", payload);
    return res.data;
  } catch (err) {
    const error = err as AxiosError<{ message?: string }>;
    const message =
      error.response?.data?.message || "로그인 실패! (아이디/비밀번호 확인)";
    throw new Error(message);
  }
};
