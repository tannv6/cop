import React, { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const LanguageSelector: React.FC = () => {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const dropdownRef = useRef<HTMLUListElement>(null);
  const location = useLocation();
  const navigate = useNavigate();

  const currentLang = location.pathname.startsWith("/en") ? "EN" : "KR";

  const handleToggle = () => {
    setDropdownVisible((prev) => !prev);
  };

  const handleSelect = (lang: string) => {
    let newPath = location.pathname;

    if (lang === "en") {
      if (!newPath.startsWith("/en")) newPath = "/en" + newPath;
    } else if (lang === "kr") {
      if (newPath.startsWith("/en"))
        newPath = newPath.replace(/^\/en/, "") || "/";
    }

    navigate(newPath);
    setDropdownVisible(false);
  };

  // Optional: 클릭 외부 감지하여 닫기
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setDropdownVisible(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="lang-selector">
      <button id="lang-toggle" onClick={handleToggle}>
        <span id="current-lang">{currentLang}</span>
      </button>
      {dropdownVisible && (
        <ul id="lang-dropdown" ref={dropdownRef}>
          <li data-lang="kr" onClick={() => handleSelect("kr")}>
            KR
          </li>
          <li data-lang="en" onClick={() => handleSelect("en")}>
            EN
          </li>
        </ul>
      )}
    </div>
  );
};

export default LanguageSelector;
