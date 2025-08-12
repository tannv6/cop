import React, { useEffect, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getClientIp } from "../../api/admin";

const Topbar: React.FC = () => {
  const [clientIp, setClientIp] = useState<string>("");
  const [clock, setClock] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLLIElement | null>(null);
  const navigate = useNavigate(); // ✅ 이동 함수

  useEffect(() => {
    (async () => {
      try {
        const { ip } = await getClientIp();
        setClientIp(ip);
      } catch {
        setClientIp("조회실패");
      }
    })();
    const updateClock = () => {
      const now = new Date();
      const Y = now.getFullYear();
      const M = String(now.getMonth() + 1).padStart(2, "0");
      const D = String(now.getDate()).padStart(2, "0");
      const h = String(now.getHours()).padStart(2, "0");
      const m = String(now.getMinutes()).padStart(2, "0");
      const s = String(now.getSeconds()).padStart(2, "0");
      setClock(`${Y}-${M}-${D} ${h}:${m}:${s}`);
    };

    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.onerror = null;
    e.currentTarget.src = "/images/default-profile.svg";
  };

  const handleLogout = () => {
    localStorage.removeItem("accessToken"); // ✅ accessToken 제거
    navigate("/AdmMaster"); // ✅ 로그인 페이지로 이동
  };

  return (
    <nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">
      <button id="sidebarToggleTop" className="btn btn-link d-md-none rounded-circle mr-3">
        <i className="fa fa-bars"></i>
      </button>

      <Link to="/" className="btn btn-primary text-white" target="_blank" rel="noopener noreferrer">
        <i className="fas fa-home"></i> 홈페이지 바로가기
      </Link>

      <ul className="navbar-nav ml-auto">
        <li className="nav-item d-flex align-items-center">
        <span style={{ color: "#252525" }}>
            IP : {clientIp || "조회중..."} / 최근접속일시 : <span id="clock">{clock}</span>
          </span>
        </li>

        <div className="topbar-divider d-none d-sm-block" />

        <li className="nav-item dropdown no-arrow" ref={dropdownRef}>
          <button
            className="btn nav-link dropdown-toggle"
            onClick={() => setDropdownOpen(prev => !prev)}
            style={{ background: "transparent", border: "none" }}
            aria-haspopup="true"
            aria-expanded={dropdownOpen}
          >
            <img
              className="img-profile rounded-circle"
              src="/images/favicon.svg"
              onError={handleImageError}
              alt="profile"
              width={32}
              height={32}
            />
          </button>

          {dropdownOpen && (
            <div className="dropdown-menu dropdown-menu-right shadow animated--grow-in show" role="menu">
              <Link className="dropdown-item" to="/AdmMaster/settings">
                <i className="fas fa-cogs fa-sm fa-fw mr-2 text-gray-400"></i>
                홈페이지 기본설정
              </Link>
              <div className="dropdown-divider"></div>
              <button className="dropdown-item" onClick={handleLogout}>
                <i className="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400"></i>
                로그아웃
              </button>
            </div>
          )}
        </li>
      </ul>
    </nav>
  );
};

export default Topbar;
