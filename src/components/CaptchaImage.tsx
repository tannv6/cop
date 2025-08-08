import React, { useState, useRef, useEffect, useCallback } from "react";
import "../../styles/style.css";
import { fetchCaptcha } from "../api/inquiry";

const ContactSection: React.FC = () => {
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
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]:
        type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
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
      setCaptchaSvg(
        "data:image/svg+xml;charset=UTF-8," + encodeURIComponent(svg)
      );
    } catch (err) {
      console.error("캡차 불러오기 실패", err);
    } finally {
      setCaptchaLoading(false);
    }
  }, []);

  useEffect(() => {
    loadCaptcha();
  }, [loadCaptcha]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.agree) {
      alert("개인정보 수집 및 이용에 동의해주세요.");
      return;
    }

    const payload = {
      ...form,
      captchaToken,
    };

    // TODO: 서버로 전송 처리
    console.log("제출 데이터:", payload);
    alert("문의가 제출되었습니다.");
  };

  return (
    <section className="contact_sect" id="contact">
      <div className="inner">
        <div className="contact_title" data-aos="fade-up">
          <h2>Contact us</h2>
          <p>
            COP에 대해 궁금한 점이 있으시거나 활용을 원하신다면 정보를
            남겨주세요 <br />
            빠른 시간 내에 담당자가 연락을 드리겠습니다
          </p>
        </div>

        <form onSubmit={handleSubmit} autoComplete="off">
          <div className="contact_form" data-aos="fade-up">
            <div className="input_wrap">
              <div className="wrap_content">
                <label>이름</label>
                <input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="필수 입력"
                />
              </div>
              <div className="wrap_content">
                <label>연락처</label>
                <input
                  name="contact"
                  value={form.contact}
                  onChange={handleChange}
                  placeholder="필수 입력"
                />
              </div>
            </div>

            <div className="input_wrap">
              <div className="wrap_content">
                <label>이메일</label>
                <input
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="필수 입력"
                />
              </div>
              <div className="wrap_content">
                <label>회사명</label>
                <input
                  name="company"
                  value={form.company}
                  onChange={handleChange}
                  placeholder="필수 입력"
                />
              </div>
            </div>

            <div className="input_wrap">
              <div className="wrap_content spe">
                <label>내용</label>
                <div className="textarea-wrapper">
                  <textarea
                    name="detail"
                    value={form.detail}
                    ref={textareaRef}
                    onFocus={handleTextareaFocus}
                    onBlur={handleTextareaBlur}
                    onChange={handleChange}
                  />
                  {showPlaceholder && (
                    <div
                      className="custom-placeholder"
                      onClick={() => textareaRef.current?.focus()}
                    >
                      필수 입력
                      <br />
                      *검토하신 요금제를 포함하여 입력해 주세요
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="input_wrap">
              <div className="wrap_content spe captcha">
                <label>자동등록방지</label>
                <div className="flex_box_cap">
                  <img
                    src={captchaSvg}
                    alt="captcha"
                    style={{ opacity: captchaLoading ? 0 : 1 }}
                  />
                  <div
                    className="spinner"
                    style={{ display: captchaLoading ? "block" : "none" }}
                  />
                  <button
                    type="button"
                    className="re_btn"
                    onClick={loadCaptcha}
                  >
                    <img
                      className="re_cap"
                      src="/images/reload.png"
                      alt="새로고침"
                    />
                  </button>
                  <div className="input-wrapper">
                    <input
                      name="captcha"
                      value={form.captcha}
                      placeholder="숫자를 입력해주세요."
                      onChange={handleChange}
                      className="captcha_input"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

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
                  <span className="view_more">개인정보 수집 및 이용</span>에
                  동의합니다.
                </label>
              </div>
            </div>
            <div className="submit" data-aos="fade-up">
              <button type="submit" className="flex_b_c">
                <p>COP 문의하기</p>
                <img src="/images/arr_next.png" alt="" className="only_web" />
                <img src="/images/arr_right_m.png" alt="" className="only_mo" />
              </button>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};

export default ContactSection;
