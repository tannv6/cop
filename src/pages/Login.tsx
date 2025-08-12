import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { login } from "../api/auth";
import { useNavigate } from "react-router-dom";

const LoginPage: React.FC = () => {
  const [userId, setUserId] = useState("");
  const [userPw, setUserPw] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!userId.trim()) {
      alert("아이디를 입력하세요");
      return;
    }

    if (!userPw.trim()) {
      alert("비밀번호를 입력하세요");
      return;
    }

    try {
      const { accessToken } = await login({ email: userId, password: userPw });
      localStorage.setItem("accessToken", accessToken);

      navigate("/AdmMaster/inquiries/list");
    } catch (err) {
      if (err instanceof Error) {
        alert(err.message || "로그인 오류! 다시 시도하세요.");
      } else {
        alert("로그인 오류! 다시 시도하세요.");
      }
    }
  };

  useEffect(() => {
    const form = document.getElementById("loginForm") as HTMLFormElement | null;
    const btn = document.getElementById("loginBtn") as HTMLAnchorElement | null;
    if (form && btn) {
      form.addEventListener("submit", (e) => {
        e.preventDefault();
        btn.click();
      });
    }
  }, []);

  return (
    <>
      <Helmet>
        <title>COP - Login</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link
          rel="shortcut icon"
          href="/images/favicon.svg"
          type="image/x-icon"
        />
      </Helmet>

      <div id="wrap">
        <div
          className="bk_box"
          style={{
            background: "url('/images/login_bg.png') no-repeat center / cover",
          }}
        >
          <div className="wrapper">
            <div className="adm_login_wrap">
              <p className="adm_logo"></p>
              <p className="login_txt">로그인</p>

              <form id="loginForm" name="loginForm" autoComplete="off">
                <div className="log_box">
                  <ul className="log_cont">
                    <li className="left">
                      <input
                        type="text"
                        name="user_id"
                        placeholder="아이디"
                        autoComplete="username"
                        value={userId}
                        onChange={(e) => setUserId(e.target.value)}
                        required
                        onKeyUp={(e) => {
                          if (e.key === "Enter") {
                            handleLogin(e);
                          }
                        }}
                      />
                      <span>
                        <input
                          type="password"
                          name="user_pw"
                          placeholder="비밀번호"
                          autoComplete="current-password"
                          value={userPw}
                          onChange={(e) => setUserPw(e.target.value)}
                          required
                          onKeyUp={(e) => {
                            if (e.key === "Enter") {
                              handleLogin(e);
                            }
                          }}
                        />
                      </span>
                    </li>
                    <li className="right">
                      <p className="btn_log">
                        <a href="#" id="loginBtn" onClick={handleLogin}>
                          로그인
                        </a>
                      </p>
                    </li>
                  </ul>
                </div>
              </form>

              <p className="copy">
                Copyright ⓒ 2025 LG CNS. All rights reserved
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
