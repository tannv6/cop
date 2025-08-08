import React, { createContext, useContext, useEffect, useState } from "react";
import { getMetaInfo } from "../api/admin";

// 타입 정의 (API 반환값과 일치하게 유지)
export interface MetaInfo {
  browserTitle?: string;
  metaDesc?: string;
  metaKeyword?: string;
  metaAuthor?: string;
  metaSubject?: string;
  ogTitle?: string;
  ogDesc?: string;
  ogUrl?: string;
  ogImage?: string;
}

// context 생성
const MetaInfoContext = createContext<MetaInfo>({});

// context hook
export const useMetaInfo = () => useContext(MetaInfoContext);

// provider 컴포넌트
export const MetaInfoProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [meta, setMeta] = useState<MetaInfo>({});

  useEffect(() => {
    (async () => {
      try {
        const data = await getMetaInfo();
        setMeta({
          browserTitle: data.browserTitle,
          metaDesc: data.metaDesc,
          metaKeyword: data.metaKeyword,
          metaAuthor: data.metaAuthor,
          metaSubject: data.metaSubject,
          ogTitle: data.ogTitle,
          ogDesc: data.ogDesc,
          ogUrl: data.ogUrl,
          ogImage: data.ogImage,
        });
      } catch {
        // 에러는 조용히 무시 (필요시 alert 등 처리)
      }
    })();
  }, []);

  return <MetaInfoContext.Provider value={meta}>{children}</MetaInfoContext.Provider>;
};
