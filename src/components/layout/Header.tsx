import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import i18n from "../../i18n"; // i18n 인스턴스 가져오기

const Header: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState<string | null>(null);
  const [langOpen, setLangOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState("KOR");
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      const header = document.getElementById("header");
      if (!header) return;
      if (window.scrollY > 100) {
        header.classList.add("header-scrolled");
      } else {
        header.classList.remove("header-scrolled");
      }
    };

    // 초기 언어 설정
    const isEnglish = window.location.pathname.startsWith("/en");
    setCurrentLang(isEnglish ? "ENG" : "KOR");

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLinkClick = (
      e: React.MouseEvent<HTMLAnchorElement>,
      href: string
  ) => {
    e.preventDefault();
    setActiveLink(href);
    setMenuOpen(false);

    const id = href.split("#")[1];
    const el = document.getElementById(id);

    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    } else {
      navigate(`/#${id}`);
    }
  };


  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const toggleLangDropdown = () => {
    setLangOpen(!langOpen);
  };

  const selectLang = (lang: "ENG" | "KOR") => {
    const i18nLang = lang === "ENG" ? "en" : "ko";
    setCurrentLang(lang);
    setLangOpen(false);

    i18n.changeLanguage(i18nLang); // ✅ 언어 전역 변경
  };

  const navLinks = [
    { label: "Service", href: "/#service" },
    { label: "Feature", href: "/#feature" },
    // { label: "Partners", href: "/#partner" },
    { label: "Price", href: "/#price" },
    { label: "Contact", href: "/#contact" },
  ];

  return (
      <header id="header" className={menuOpen ? "header_mo" : ""}>
        <div className="container">
          <div className="header flex_b_c">
            <div className="info flex__c">
              <div className="logo">
                <a href="/">
                  <img src="/images/logo.png" alt="" className="only_web" />
                  <img
                      src="/images/logo_m.png"
                      alt=""
                      className="only_mo logo_main"
                  />
                  <img
                      src="/images/logo_b.png"
                      alt=""
                      className="only_mo logo_sub"
                  />
                </a>
              </div>
              <div className="header_sub flex__c">
                {navLinks.map(({ label, href }) => (
                    <a
                        key={href}
                        className={`header_link ${activeLink === href ? "on" : ""}`}
                        href={href}
                        onClick={(e) => handleLinkClick(e, href)}
                    >
                      {label}
                    </a>
                ))}
              </div>
            </div>

            <div className="contact">
              <a
                  href="https://www.cop-ai.kr"
                  target="_blank"
                  className="btn_contact"
                  rel="noreferrer"
              >
                <p>Launch COP</p>
              </a>

              <div
                  className="lang_select flex__c"
                  id="lang-toggle"
                  onClick={toggleLangDropdown}
              >
                <img src="/images/lang_ic.png" alt="" className="ic only_web" />
                <img src="/images/lang_ic_m.png" alt="" className="ic only_mo" />
                <p id="current-lang">{currentLang}</p>
                <div className="select_ic">
                  <img src="/images/select_ic.png" alt="" className="only_web" />
                  <img src="/images/select_ic_m.png" alt="" className="only_mo" />
                </div>
                  {langOpen && (
                      <ul className="lang_dropdown" id="lang-dropdown">
                        {currentLang === "KOR" ? (
                          <li data-lang="en" onClick={(e) => {
                            e.stopPropagation();
                            selectLang("ENG");
                          }}>
                            <img
                              src="/images/lang_ic.png"
                              alt=""
                              className="ic only_web"
                            />
                            <img
                              src="/images/lang_ic_m.png"
                              alt=""
                              className="ic only_mo"
                            />
                            <p>ENG</p>
                          </li>
                        ) : (
                          <li data-lang="kr" onClick={(e) => {
                            e.stopPropagation();
                            selectLang("KOR");
                          }}>
                            <img
                              src="/images/lang_ic.png"
                              alt=""
                              className="ic only_web"
                            />
                            <img
                              src="/images/lang_ic_m.png"
                              alt=""
                              className="ic only_mo"
                            />
                            <p>KOR</p>
                          </li>
                        )}
                      </ul>
                    )}
              </div>

              <div className="only_mo">
                <div
                    className={`logo_ham ${menuOpen ? "on" : ""}`}
                    onClick={toggleMenu}
                />
              </div>
            </div>
          </div>

          <div className={`all_menu_gnb_wrap ${menuOpen ? "active" : ""}`}>
            <nav className="gnb_mo flex">
              <ul>
                {navLinks.map(({ label, href }) => (
                    <li key={href}>
                      <a
                          key={href}
                          className={`header_link ${activeLink === href ? "on" : ""}`}
                          href={href}
                          onClick={(e) => handleLinkClick(e, href)}
                      >
                        {label}
                      </a>
                    </li>
                ))}
              </ul>
            </nav>
          </div>

          <div className="only_web">
            <div className="beta">
              <p>Beta</p>
            </div>
          </div>
        </div>
      </header>
  );
};

export default Header;