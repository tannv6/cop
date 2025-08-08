import type { AxiosError } from "axios";
import client from "./client";

export const fetchCaptcha = async (token: string): Promise<string> => {
  const res = await client.get(`/inquiry/captcha?token=${token}`, {
    responseType: "text", // SVG는 text로 받아야 함
  });
  return res.data;
};

export interface InquiryPayload {
  company: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  language: string;
  captcha: string;
  captchaToken: string;
}

export const postInquiry = async (payload: InquiryPayload) => {
  try {
    const res = await client.post("/inquiry", payload);
    return res.data;
  } catch (err) {
    const error = err as AxiosError<{ message?: string }>;
    const message = error.response?.data?.message || "문의 전송 실패";
    throw new Error(message);
  }
};

export interface Inquiry {
  id: number;
  company: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  createdAt: string;
}

export interface InquiryListResponse {
  data: Inquiry[];
  total: number;
}

export const fetchInquiries = async (
  params: { limit?: number; page?: number; keyword?: string } = {}
): Promise<InquiryListResponse> => {
  const { limit = 10, page = 1, keyword = "" } = params;
  const res = await client.get<InquiryListResponse>(
    `/inquiry?limit=${limit}&page=${page}&keyword=${encodeURIComponent(keyword)}`
  );
  return res.data;
};

export const deleteInquiry = async (id: number) => {
  await client.delete(`/inquiry/${id}`);
};

export const deleteMultipleInquiries = async (ids: number[]) => {
  await Promise.all(ids.map((id) => client.delete(`/inquiry/${id}`)));
};

export const fetchInquiryById = async (id: number): Promise<Inquiry> => {
  const res = await client.get<Inquiry>(`/inquiry/${id}`);
  return res.data;
};

// 관리자 수정용 페이로드 타입 분리
export interface AdminUpdateInquiryPayload {
  company: string;
  name: string;
  email: string;
  phone: string;
  message: string;
}

// 관리자용 수정 API 함수 분리
export const adminUpdateInquiry = async (
  id: number,
  payload: AdminUpdateInquiryPayload
) => {
  try {
    const res = await client.put(`/inquiry/${id}`, payload);
    return res.data;
  } catch (err) {
    const error = err as AxiosError<{ message?: string }>;
    const message = error.response?.data?.message || "문의 수정 실패";
    throw new Error(message);
  }
};
