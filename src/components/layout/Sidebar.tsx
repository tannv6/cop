import React, { useState } from "react";
import { Link } from "react-router-dom";
import classNames from "classnames";

interface SidebarProps {
  onToggle: () => void;
  isToggled: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ onToggle, isToggled }) => {
  const [openMenu, setOpenMenu] = useState<"contact" | "settings" | null>(null);

  const toggleMenu = (menu: "contact" | "settings") => {
    setOpenMenu((prev) => (prev === menu ? null : menu));
  };

  return (
      <ul
          className={classNames(
              "navbar-nav bg-gradient-primary sidebar sidebar-dark accordion",
              { toggled: isToggled }
          )}
          id="accordionSidebar"
      >
        {/* 로고 */}
        <Link
            className="sidebar-brand d-flex align-items-center justify-content-center"
            to="/"
        >
          <div className="sidebar-brand-icon">
            <img
                src="/images/logo.png"
                alt="Logo"
                style={{
                  height: "42px",
                  width: "110px",
                  objectFit: "contain",
                }}
            />
          </div>
        </Link>

        <hr className="sidebar-divider" />

        {/* Contact Us */}
        <li className="nav-item">
          <button
              className="nav-link collapsed btn btn-link"
              onClick={(e) => {
                e.preventDefault();
                toggleMenu("contact");
              }}
          >
            <i className="fa fa-bullhorn" aria-hidden="true"></i>
            <span>Contact Us</span>
          </button>
          <div
              id="collapseBanner"
              className={classNames("collapse", { show: openMenu === "contact" })}
          >
            <div className="bg-white py-2 collapse-inner rounded">
              <Link className="collapse-item" to="/AdmMaster/inquiries/list">
                문의관리
              </Link>
            </div>
          </div>
        </li>

        {/* 기본설정 */}
        <li className="nav-item active">
          <button
              className="nav-link collapsed btn btn-link"
              onClick={(e) => {
                e.preventDefault();
                toggleMenu("settings");
              }}
          >
            <i className="fas fa-fw fa-wrench"></i>
            <span>기본설정</span>
          </button>
          <div
              id="collapseUtilities"
              className={classNames("collapse", { show: openMenu === "settings" })}
          >
            <div className="bg-white py-2 collapse-inner rounded">
              <Link className="collapse-item" to="/AdmMaster/settings">
                홈페이지 기본설정
              </Link>
              <Link className="collapse-item" to="/AdmMaster/policy">
                약관 및 정책
              </Link>
            </div>
          </div>
        </li>

        <hr className="sidebar-divider" />

        {/* 토글 버튼 */}
        <div className="text-center d-none d-md-inline">
          <button
              className="rounded-circle border-0"
              id="sidebarToggle"
              onClick={onToggle}
          ></button>
        </div>
      </ul>
  );
};

export default Sidebar;
