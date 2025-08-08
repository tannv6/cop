import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import { Helmet } from "react-helmet-async";
import { getPolicy } from "../api/admin";
import {englishPrivacyHtml} from "../components/PrivacyPopup.tsx";

export default function PrivacyPolicy() {
  const [searchParams] = useSearchParams();
  const { i18n } = useTranslation();
  const isEnglish = i18n.language === "en";

  const initialTab = searchParams.get("tab") === "1" ? "consent" : "policy";
  const [activeTab, setActiveTab] = useState<"policy" | "consent">(initialTab);
  const [policyHtml, setPolicyHtml] = useState("");
  const [consentHtml, setConsentHtml] = useState("");

  useEffect(() => {
    const tabParam = searchParams.get("tab");
    setActiveTab(tabParam === "1" ? "consent" : "policy");
  }, [searchParams]);

  useEffect(() => {
    if (activeTab === "policy" && !isEnglish) {
      getPolicy("privacy")
          .then((res) => {
            const decoded = decodeHTML(res.content || "");
            setPolicyHtml(decoded);
          })
          .catch(() => {
            setPolicyHtml("<p>정책을 불러오지 못했습니다.</p>");
          });
    }

    if (activeTab === "consent" && !isEnglish) {
      getPolicy("consent")
          .then((res) => {
            const decoded = decodeHTML(res.content || "");
            setConsentHtml(decoded);
          })
          .catch(() => {
            setConsentHtml("<p>동의 내용을 불러오지 못했습니다.</p>");
          });
    }

    const url = new URL(window.location.href);
    if (activeTab === 'consent') {
      url.searchParams.set('tab', '1');
    } else {
      url.searchParams.delete('tab');
    }

    window.history.replaceState({}, '', url);
  }, [activeTab, isEnglish]);

  const decodeHTML = (html: string): string => {
    const textarea = document.createElement("textarea");
    textarea.innerHTML = html;
    return textarea.value;
  };


  const englishConsentHtml = `
                        <div>
                            <p>LG CNS Co., Ltd. (hereinafter referred to as the "Company") collects personal information
                                in accordance with the Personal Information Protection Act for the provision of COP
                                service.</p>
                        </div>
                        <div>
                            <h2>1. Purpose of Collection and Use, Items Collected, Retention Period</h2>
                            <table>
                                <tbody>
                                    <tr>
                                        <td>Category</td>
                                        <td>Purpose of Collection and Use</td>
                                        <td>Collected Items</td>
                                        <td>Retention Period</td>
                                    </tr>
                                    <tr>
                                        <td>Inquiry</td>
                                        <td>Responding to customer inquiries</td>
                                        <td>Required items: Name, Contact, Email, Company Name, Memo</td>
                                        <td>6 months from the date of collection</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div>
                            <h2>2. Right to Refuse Consent and Consequences</h2>
                        </div>
                        <div>
                            <p>Users have the right to refuse consent to the collection and use of personal information.
                                However, refusal to provide required information for responding to inquiries may result
                                in limited service use.</p>
                            <p>※ Please refer to the <span>Privacy Policy</span> for more details.</p>
                        </div>
  `;

  return (
      <>
        <Helmet>
          <title>{isEnglish ? "COP Privacy Policy" : "COP 개인정보처리방침"}</title>
          <meta name="description" content="LG CNS COP Privacy Policy Page" />
          <link rel="stylesheet" href="/lib_css/jquery-ui.css" />
          <link rel="stylesheet" href="/lib_css/slick.css" />
          <link rel="stylesheet" href="/lib_css/swiper.min.css" />
          <link rel="stylesheet" href="/lib_css/aos.css" />
          <link rel="stylesheet" href="/css/style.css" />
          <link rel="stylesheet" href="/css/sub.css" />
        </Helmet>

        <div id="wrap">
          <Header />
          <div className="privacy_detail">
            <div className="inner">
              <div className="pri_tab flex">
                <div
                    className={`tab ${activeTab === "policy" ? "active" : ""}`}
                    onClick={() => setActiveTab("policy")}
                >
                  <p>{isEnglish ? "Privacy Policy" : "개인정보처리방침"}</p>
                </div>
                <div
                    className={`tab ${activeTab === "consent" ? "active" : ""}`}
                    onClick={() => setActiveTab("consent")}
                >
                  <p>{isEnglish ? "Consent to Use of Personal Data" : "개인정보수집·이용동의"}</p>
                </div>
              </div>

              <div className="detail_info">
                {activeTab === "policy" ? (
                    <div
                        className="tab_content"
                        dangerouslySetInnerHTML={{
                          __html: isEnglish ? englishPrivacyHtml : policyHtml,
                        }}
                    />
                ) : (
                    <div
                        className="tab_content personal"
                        dangerouslySetInnerHTML={{
                          __html: isEnglish ? englishConsentHtml : consentHtml,
                        }}
                    />
                )}
              </div>
            </div>
          </div>
          <Footer />
        </div>
      </>
  );
}
