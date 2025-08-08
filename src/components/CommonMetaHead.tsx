import { Helmet } from "react-helmet-async";
import { useMetaInfo } from "../contexts/MetaInfoContext";

const CommonMetaHead = () => {
  const meta = useMetaInfo();

  return (
    <Helmet>
      <title>{meta.browserTitle || "Contents Optimization Platform COP"}</title>
      <meta name="description" content={meta.metaDesc || "AI 기반 고품질 마케팅 콘텐츠 생성 서비스 COP"} />
      <meta name="keywords" content={meta.metaKeyword || "AI, 생성형AI, 이미지AI, AI편집"} />
      <meta name="author" content={meta.metaAuthor || "Contents Optimization Platform COP"} />
      <meta name="subject" content={meta.metaSubject || "AI 기반 고품질 마케팅 콘텐츠 생성 서비스"} />

      <meta property="og:type" content="website" />
      <meta property="og:title" content={meta.ogTitle || meta.browserTitle || "Contents Optimization Platform COP"} />
      <meta property="og:description" content={meta.ogDesc || meta.metaDesc || "AI 기반 고품질 마케팅 콘텐츠 생성 서비스"} />
      <meta property="og:url" content={meta.ogUrl || window.location.href} />
      <meta property="og:image" content={
        meta.ogImage
          ? (meta.ogImage.startsWith("/")
              ? `${import.meta.env.VITE_API_SERVICE}${meta.ogImage}`
              : meta.ogImage)
          : ""
      } />
    </Helmet>
  );
};

export default CommonMetaHead;