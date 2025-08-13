import React, { useState, useRef, useEffect, useCallback } from "react";
import "../../lib_css/jquery-ui.css";
import "../../lib_css/slick.css";
import "../../lib_css/swiper.min.css";
import "../../styles/style.css";
import { fetchCaptcha, postInquiry } from "../../api/inquiry";
import PrivacyPopup from "../PrivacyPopup.tsx";
import { useTranslation } from "react-i18next";


const ContactSection: React.FC = () => {
  const { t, i18n } = useTranslation();

  const descList = t("contactSection.desc", { returnObjects: true }) as {
    line1: string;
    line2: string;
    line3: string;
  };

  const [form, setForm] = useState({
    name: "",
    contact: "",
    email: "",
    company: "",
    detail: "",
    captcha: "",
    agree: false,
  });

  const [captchaToken, setCaptchaToken] = useState("");
  const [captchaSvg, setCaptchaSvg] = useState("");
  const [captchaLoading, setCaptchaLoading] = useState(false);
  const [showPlaceholder, setShowPlaceholder] = useState(true);
  const [showPrivacyPopup, setShowPrivacyPopup] = useState(false);

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleChange = (
      e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    let newValue = value;

    switch (name) {
      case "name":
        newValue = value.slice(0, 10);
        break;
      case "contact":
        newValue = value.replace(/[^0-9]/g, "").slice(0, 13);
        break;
      case "email":
        newValue = value.slice(0, 40);
        break;
      case "company":
        newValue = value.slice(0, 20);
        break;
      case "detail":
        newValue = value.slice(0, 500);
        break;
    }

    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : newValue,
    }));
  };

  const handleTextareaFocus = () => setShowPlaceholder(false);
  const handleTextareaBlur = () => setShowPlaceholder(form.detail === "");

  const generateToken = () => Math.random().toString(36).substring(2, 12);

  const loadCaptcha = useCallback(async () => {
    const token = generateToken();
    setCaptchaToken(token);
    setCaptchaLoading(true);

    try {
      const svg = await fetchCaptcha(token);
      setCaptchaSvg("data:image/svg+xml;charset=UTF-8," + encodeURIComponent(svg));
    } catch (err) {
      console.error("캡차 불러오기 실패", err);
    } finally {
      setCaptchaLoading(false);
    }
  }, []);

  useEffect(() => {
    loadCaptcha();
  }, [loadCaptcha]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.contact) {
      alert("연락처를 입력해주세요.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email)) {
      alert("유효한 이메일 주소를 입력해주세요.");
      return;
    }

    if (!form.detail.trim()) {
      alert("문의 내용을 입력해주세요.");
      return;
    }

    if (!form.agree) {
      alert("개인정보 수집 및 이용에 동의해주세요.");
      return;
    }

    const payload = {
      company: form.company,
      name: form.name,
      email: form.email,
      phone: form.contact,
      message: form.detail,
      language: i18n.language,
      captcha: form.captcha,
      captchaToken,
    };

    try {
      await postInquiry(payload);
      alert("문의가 정상적으로 등록되었습니다!");

      setForm({
        name: "",
        contact: "",
        email: "",
        company: "",
        detail: "",
        captcha: "",
        agree: false,
      });

      loadCaptcha();
    } catch (err: unknown) {
      if (err instanceof Error) {
        alert(err.message);
      } else {
        alert("서버 오류! 다시 시도해주세요.");
      }
      loadCaptcha();
    }
  };

  return (
      <>
        <section className="contact_sect" id="contact">
          <div className="inner">
            <div className="contact_title" data-aos="fade-up">
              <h2>{t("contactSection.title")}</h2>
              <p className="desc">
                {descList.line1}<br />
                {descList.line2}
                  <br className="only_mo" />
                {descList.line3}
              </p>
            </div>

            <form name="frm" id="frm" onSubmit={handleSubmit} autoComplete="off" style={{display: 'none'}}>
              <input type="hidden" value="" id="hidden_captcha" />
              <div className="contact_form" data-aos="fade-up">
                {/* 이름 / 연락처 */}
                <div className="input_wrap">
                  <div className="wrap_content">
                    <label>{t("contactSection.fields.name")}</label>
                    <input
                        type="text"
                        name="name"
                        maxLength={10}
                        value={form.name}
                        placeholder={t("contactSection.fields.required")}
                        onChange={handleChange}
                    />
                  </div>
                  <div className="wrap_content">
                    <label>{t("contactSection.fields.contact")}</label>
                    <input
                        type="text"
                        name="contact"
                        value={form.contact}
                        placeholder={t("contactSection.fields.required")}
                        onChange={handleChange}
                    />
                  </div>
                </div>

                {/* 이메일 / 회사명 */}
                <div className="input_wrap">
                  <div className="wrap_content">
                    <label>{t("contactSection.fields.email")}</label>
                    <input
                        type="text"
                        name="email"
                        maxLength={40}
                        value={form.email}
                        placeholder={t("contactSection.fields.required")}
                        onChange={handleChange}
                    />
                  </div>
                  <div className="wrap_content">
                    <label>{t("contactSection.fields.company")}</label>
                    <input
                        type="text"
                        name="company"
                        maxLength={20}
                        value={form.company}
                        placeholder={t("contactSection.fields.required")}
                        onChange={handleChange}
                    />
                  </div>
                </div>

                {/* 내용 */}
                <div className="input_wrap">
                  <div className="wrap_content spe">
                    <label>{t("contactSection.fields.message")}</label>
                    <div id="textareaWrapper" className="textarea-wrapper">
                  <textarea
                      id="customTextarea"
                      name="detail"
                      maxLength={500}
                      ref={textareaRef}
                      value={form.detail}
                      onFocus={handleTextareaFocus}
                      onBlur={handleTextareaBlur}
                      onChange={handleChange}
                  />
                      {showPlaceholder && (
                          <div
                              id="customPlaceholder"
                              className="custom-placeholder"
                              onClick={() => textareaRef.current?.focus()}
                          >
                            {t("contactSection.fields.textareaPlaceholder")
                                .split("\n")
                                .map((line, i) => (
                                    <React.Fragment key={i}>
                                      {line}
                                      <br />
                                    </React.Fragment>
                                ))}
                          </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* 캡차 */}
                <div className="input_wrap">
                  <div className="wrap_content spe captcha">
                    <label>{t("contactSection.fields.captcha")}</label>
                    <div className="flex_box_cap">
                      <img
                          src={captchaSvg}
                          alt="captcha"
                          id="cap_re"
                          loading="lazy"
                          style={{ opacity: captchaLoading ? 0 : 1 }}
                      />
                      <div
                          className="spinner"
                          id="spinner_load"
                          style={{ display: captchaLoading ? "block" : "none" }}
                      ></div>
                      <button className="re_btn" type="button" onClick={loadCaptcha}>
                        <img
                            className="re_cap"
                            src="/images/reload.png"
                            alt="새로고침"
                        />
                      </button>
                      <div className="input-wrapper">
                        <input
                            className="captcha_input"
                            id="captcha_input"
                            type="text"
                            name="captcha"
                            placeholder={t("contactSection.fields.captchaPlaceholder")}
                            value={form.captcha}
                            onChange={handleChange}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* 개인정보 수집 동의 */}

              <div className="term_submit flex_b">
                <div className="term">
                  <div className="input_radio">
                    <input
                        id="agree"
                        type="checkbox"
                        name="agree"
                        checked={form.agree}
                        onChange={handleChange}
                    />
                    <label htmlFor="agree">
                      {i18n.language === "ko" ? (
                          <>
            <span
                className="view_more"
                style={{ cursor: "pointer" }}
                onClick={() => setShowPrivacyPopup(true)}
            >
              {t("contactSection.agree.prefix")}
            </span>
                            {t("contactSection.agree.suffix")}
                          </>
                      ) : (
                          <>
                            {t("contactSection.agree.prefix")}
                            <span
                                className="view_more"
                                style={{ cursor: "pointer" }}
                                onClick={() => setShowPrivacyPopup(true)}
                            >
              {t("contactSection.agree.suffix")}
            </span>
                          </>
                      )}
                    </label>
                  </div>
                </div>

                <div className="submit" data-aos="fade-up">
                  <button type="submit" className="flex_b_c">
                    <p>{t("contactSection.submit")}</p>
                    <img src="/images/arr_next.png" alt="" className="only_web" />
                    <img src="/images/arr_right_m.png" alt="" className="only_mo" />
                  </button>
                </div>
              </div>
            </form>
            
            <div className="contact_mail">
              <div className="mail_content">
                <img src="/images/contact_mail_ic.png" alt="" />
                <p className="mail_txt">cop_support@lgcns.com</p>
              </div>
              <a href="mailto:cop_support@lgcns.com" className="mail_desc">
                <p>{t("contactSection.mail")}</p>
                <img src="/images/btn_contact_mail.png" alt="" className="only_web" />
                <img src="/images/btn_contact_mail_m.png" alt="" className="only_mo" />
              </a>
            </div>

          </div>
        </section>

        {showPrivacyPopup && (
            <PrivacyPopup onClose={() => setShowPrivacyPopup(false)} />
        )}
      </>
  );
};

export default ContactSection;
