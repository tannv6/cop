import { Helmet } from "react-helmet-async";
import { useMetaInfo } from "../contexts/MetaInfoContext";

const CommonMetaHead = () => {
  const meta = useMetaInfo();

  return (
    <Helmet>
      <title>{meta.browserTitle || "COP-AI"}</title>
      <meta name="description" content={meta.metaDesc || ""} />
      <meta name="keywords" content={meta.metaKeyword || ""} />
      <meta name="author" content={meta.metaAuthor || ""} />
      <meta name="subject" content={meta.metaSubject || ""} />

      <meta property="og:type" content="website" />
      <meta property="og:title" content={meta.ogTitle || meta.browserTitle || ""} />
      <meta property="og:description" content={meta.ogDesc || meta.metaDesc || ""} />
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