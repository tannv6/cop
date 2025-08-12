import client from "./client";
import type { AxiosError } from "axios";

export interface AdminUpdatePayload {
  email?: string;
  password?: string;
}

export interface MetaInfoPayload {
  browser_title?: string;
  meta_tag?: string;
  meta_keyword?: string;
  og_title?: string;
  og_des?: string;
  og_url?: string;
  og_img?: File;
  [key: string]: any;
}

export const updateAdminInfo = async (data: AdminUpdatePayload) => {
  try {
    const res = await client.put("/users/me", data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });
    return res.data;
  } catch (err) {
    const error = err as AxiosError<{ message?: string }>;
    throw new Error(error.response?.data?.message || "관리자 정보 수정 실패");
  }
};

// 메타 정보 등록/수정
export const updateMetaInfo = async (data: MetaInfoPayload) => {
  const formData = new FormData();
  for (const key in data) {
    if (data[key] !== undefined) formData.append(key, data[key]);
  }

  try {
    const res = await client.post("/meta-info", formData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        "Content-Type": "multipart/form-data",
      },
    });
    return res.data;
  } catch (err) {
    const error = err as AxiosError<{ message?: string }>;
    throw new Error(error.response?.data?.message || "메타정보 저장 실패");
  }
};

// 메타 정보 가져오기
export const getMetaInfo = async (): Promise<MetaInfoPayload> => {
  try {
    const res = await client.get("/meta-info", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });
    return res.data;
  } catch (err) {
    throw new Error("메타정보 불러오기 실패");
  }
};

export interface PolicyPayload {
  type: string;         // 예: "privacy", "terms"
  language?: string;    // 예: "ko"
  title?: string;       // 예: "개인정보처리방침"
  content: string;
}

// 정책 단건 조회 (GET)
export const getPolicy = async (
  type: string,
  language: string = "ko"
): Promise<{ content: string }> => {
  try {
    const res = await client.get(`/policy/one`, {
      params: { type, language },
    });
    return res.data;
  } catch (err) {
    throw new Error("정책 불러오기 실패");
  }
};

// 정책 저장/수정 (PUT)
export const updatePolicy = async (data: PolicyPayload) => {
  try {
    const res = await client.put(`/policy`, data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });
    return res.data;
  } catch (err) {
    const error = err as AxiosError<{ message?: string }>;
    throw new Error(error.response?.data?.message || "정책 저장 실패");
  }
};

export const getMe = async (): Promise<{
  id: number;
  email: string;
  name: string;
  role: string;
  createdAt: string;
}> => {
  try {
    const res = await client.get("/users/me", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        // 필요시: "accept": "application/json"
      },
    });
    return res.data;
  } catch (err) {
    const error = err as AxiosError<{ message?: string }>;
    throw new Error(error.response?.data?.message || "내 정보 불러오기 실패");
  }
};

export const getClientIp = async (): Promise<{ ip: string }> => {
  try {
    const res = await client.get("/users/ip");
    return res.data; // { ip: "xxx.xxx.xxx.xxx" }
  } catch (err) {
    throw new Error("IP 조회 실패");
  }
};
