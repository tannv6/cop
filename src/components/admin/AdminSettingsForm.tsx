import React, { useEffect, useRef, useState } from "react";
import { getMe, getMetaInfo, updateAdminInfo } from "../../api/admin";

interface MetaInfo {
  browserTitle: string;
  metaDesc: string;
  metaKeyword: string;
  metaAuthor: string;
  metaSubject: string;
  ogTitle: string;
  ogDesc: string;
  ogUrl: string;
  ogImage: string;
}

const AdminSettingsForm: React.FC = () => {
  const [adminEmail, setAdminEmail] = useState("admin@cop-ai.kr");
  const [password, setPassword] = useState("");
  const [passwordR, setPasswordR] = useState("");

  const [metaInfo, setMetaInfo] = useState<MetaInfo>({
    browserTitle: "",
    metaDesc: "",
    metaKeyword: "",
    metaAuthor: "",
    metaSubject: "",
    ogTitle: "",
    ogDesc: "",
    ogUrl: "",
    ogImage: "",
  });

  const [ogImageFile, setOgImageFile] = useState<File | null>(null);
  const [ogImagePreview, setOgImagePreview] = useState<string>("");
  const ogImageRef = useRef<HTMLInputElement | null>(null);
  const API_BASE_URL = import.meta.env.VITE_API_SERVICE as string;
  const originUrl = API_BASE_URL.replace(/\/api\/?$/, '');  


  useEffect(() => {
    (async () => {
      try {
        const me = await getMe();
        setAdminEmail(me.email);
        const meta = await getMetaInfo();
        setMetaInfo({
          browserTitle: meta.browserTitle ?? "",
          metaDesc: meta.metaDesc ?? "",
          metaKeyword: meta.metaKeyword ?? "",
          metaAuthor: meta.metaAuthor ?? "",
          metaSubject: meta.metaSubject ?? "",
          ogTitle: meta.ogTitle ?? "",
          ogDesc: meta.ogDesc ?? "",
          ogUrl: meta.ogUrl ?? "",
          ogImage: meta.ogImage ?? "",
        });
        if (meta.adminEmail) setAdminEmail(meta.adminEmail);
      } catch {
        alert("메타정보 불러오기 실패");
      }
    })();
  }, []);

  const handleAdminUpdate = async () => {
    if (password && password !== passwordR) {
      return alert("비밀번호가 일치하지 않습니다.");
    }
    try {
      await updateAdminInfo({
        email: adminEmail,
        ...(password ? { password } : {}),
      });
      alert("관리자 정보가 수정되었습니다.");
      setPassword("");
      setPasswordR("");
    } catch (err: unknown) {
      if (err instanceof Error) {
        alert(err.message);
      } else {
        alert("오류가 발생했습니다.");
      }
    }
  };

  const handleFileChange = () => {
    const file = ogImageRef.current?.files?.[0];
    if (file) {
      setOgImageFile(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setOgImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleMetaUpdate = async () => {
    const data = { ...metaInfo };
    const formData = new FormData();

    if (ogImageFile) {
      formData.append("ogImage", ogImageFile);
    }

    Object.entries(data).forEach(([key, value]) => {
      if (key === "ogImage") return;
      if (typeof value === "string" || typeof value === "number") {
        formData.append(key, String(value));
      }
    });

    try {
      const res = await fetch(`${API_BASE_URL}/meta-info`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken") || ""}`,
        },
        body: formData,
      });
      if (!res.ok) throw new Error("메타정보 저장 실패");
      const result = await res.json();
      setMetaInfo({
        browserTitle: result.browserTitle ?? "",
        metaDesc: result.metaDesc ?? "",
        metaKeyword: result.metaKeyword ?? "",
        metaAuthor: result.metaAuthor ?? "",
        metaSubject: result.metaSubject ?? "",
        ogTitle: result.ogTitle ?? "",
        ogDesc: result.ogDesc ?? "",
        ogUrl: result.ogUrl ?? "",
        ogImage: result.ogImage ?? "",
      });
      setOgImageFile(null);
      setOgImagePreview("");
      if (ogImageRef.current) ogImageRef.current.value = "";
      alert("메타 정보가 저장되었습니다.");
    } catch (err: unknown) {
      if (err instanceof Error) {
        alert(err.message);
      } else {
        alert("메타정보 저장 중 오류 발생");
      }
    }
  };

  const metaFields = [
    { label: "Browser Title", name: "browserTitle", comment: "_BROWSER_TITLE" },
    { label: "META Description", name: "metaDesc", comment: "_META_DES" },
    { label: "META Keyword", name: "metaKeyword", comment: "_META_KEYWORD" },
    { label: "META Author", name: "metaAuthor", comment: "_META_AUTHOR" },
    { label: "META Subject", name: "metaSubject", comment: "_META_SUBJECT" },
    { label: "og:Title", name: "ogTitle", comment: "_OG_TITLE" },
    { label: "og:Description", name: "ogDesc", comment: "_OG_DES" },
    { label: "og:URL", name: "ogUrl", comment: "_OG_URL" },
  ];

  return (
      <div>
        <h3 className="font-weight-bold mb-2">홈페이지 기본설정</h3>
        <div className="card shadow mb-4">
          <div className="card-header py-3 d-flex justify-content-end align-items-center">
            <div className="d-flex" style={{ gap: "5px" }}>
              <button type="button" className="btn btn-primary btn-sm" onClick={handleMetaUpdate}>
                <i className="fa fa-cog" aria-hidden="true"></i> 메타정보 저장
              </button>
            </div>
          </div>
          <div id="contents">
            <div className="listWrap_noline">
              <div className="bg-white p-2">
                <div className="listTop">
                  <div className="left">
                    <p className="font-weight-bold">■ 기본정보</p>
                  </div>
                </div>
                <div className="listBottom">
                  <table className="table table-bordered">
                    <colgroup>
                      <col width="250px" />
                      <col width="35%" />
                      <col width="250px" />
                      <col width="*" />
                    </colgroup>
                    <tbody>
                    <tr>
                      <th>관리자 이메일</th>
                      <td>
                        <input
                            type="text"
                            name="adminEmail"
                            value={adminEmail}
                            onChange={(e) => setAdminEmail(e.target.value)}
                            className="form-control d-inline-block"
                            style={{ width: "250px" }}
                        />
                      </td>
                      <th>관리자 비번수정</th>
                      <td>
                        <input
                            type="password"
                            name="admin_pass"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="form-control d-inline-block"
                            style={{ width: "150px" }}
                        />
                        <input
                            type="password"
                            name="admin_pass_r"
                            value={passwordR}
                            onChange={(e) => setPasswordR(e.target.value)}
                            className="form-control d-inline-block ml-2"
                            style={{ width: "150px" }}
                        />
                        <button
                            type="button"
                            className="btn btn-primary btn-sm ml-2 mb-1"
                            onClick={handleAdminUpdate}
                        >
                          <i className="fa fa-cog"></i> 비번수정
                        </button>
                      </td>
                    </tr>
                    </tbody>
                  </table>
                </div>
                <div className="listTop">
                  <div className="left">
                    <p className="font-weight-bold">■ 메타정보</p>
                  </div>
                </div>
                <div className="listBottom">
                  <table className="table table-bordered">
                    <colgroup>
                      <col width="250px" />
                      <col width="*" />
                    </colgroup>
                    <tbody>
                    {metaFields.map((item) => (
                        <tr key={item.name}>
                          <th>{item.label}</th>
                          <td colSpan={3}>
                            <div className="d-flex align-items-center">
                              <input
                                  type="text"
                                  name={item.name}
                                  value={metaInfo[item.name as keyof MetaInfo] ?? ""}
                                  onChange={(e) =>
                                      setMetaInfo({ ...metaInfo, [item.name]: e.target.value })
                                  }
                                  className="form-control d-inline-block w-75"
                              />
                              {item.comment}
                            </div>
                          </td>
                        </tr>
                    ))}
                    <tr>
                      <th>
                        og:image<br /> (jpg,png)
                      </th>
                      <td colSpan={3}>
                        <input
                            type="file"
                            name="ogImage"
                            ref={ogImageRef}
                            className="form-control-file"
                            style={{ width: "300px" }}
                            accept="image/png, image/jpeg"
                            onChange={handleFileChange}
                        />
                        {ogImagePreview ? (
                            <img
                                className="bg-gray mt-2"
                                src={ogImagePreview}
                                style={{ maxHeight: "200px" }}
                                alt="OG 미리보기"
                            />
                        ) : metaInfo.ogImage ? (
                            <img
                                className="bg-gray mt-2"
                                src={
                                  metaInfo.ogImage.startsWith("/")
                                      ? `${originUrl}${metaInfo.ogImage}`
                                      : metaInfo.ogImage
                                }
                                style={{ maxHeight: "200px" }}
                                alt="OG 이미지"
                            />
                        ) : null}
                        _OG_IMG
                      </td>
                    </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
};

export default AdminSettingsForm;
