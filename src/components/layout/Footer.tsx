import React from "react";
import { useTranslation } from "react-i18next";

const Footer: React.FC = () => {
  const { t, i18n } = useTranslation();

  const isEn = i18n.language === "en";

  return (
      <footer id="footer">
        <div className="inner">
          <div className="logo_ft">
            <img src="/images/logo_ft.png" alt="LG CNS Logo" className="only_web" />
            <img src="/images/logo_ft_m.png" alt="LG CNS Logo Mobile" className="only_mo" />
          </div>

          <div className={`ft_info ${isEn ? "en" : ""}`}>
            <div className="info">
              <div className="list">
                <p>
                  <span>{t("footer.addressLabel")}</span> {t("footer.address")}
                </p>
              </div>
              <div className="list">
                <p>
                  <span>{t("footer.businessNoLabel")}</span> {t("footer.businessNo")}
                </p>
                <p>
                  <span>{t("footer.ceoLabel")}</span> {t("footer.ceo")}
                </p>
                <p>
                  <span>{t("footer.emailLabel")}</span> {t("footer.email")}
                </p>
              </div>
            </div>

            <div className="bot flex_b_c">
              <div className="copy">
                <p>{t("footer.copyright")}</p>
              </div>
              {/* <div className="privacy flex__c">
                <Link to={`/privacy`}>
                  <p>{t("footer.privacyPolicy")}</p>
                </Link>
                <Link to={`/privacy?tab=1`}>
                  <p>{t("footer.privacyConsent")}</p>
                </Link>
              </div> */}
            </div>
          </div>
        </div>
      </footer>
  );
};

export default Footer;
