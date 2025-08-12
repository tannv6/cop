import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { gsap } from "gsap";

import "../../lib_css/jquery-ui.css";
import "../../lib_css/slick.css";
import "../../lib_css/swiper.min.css";
import "../../styles/style.css";

const PartnerSection: React.FC = () => {
  const { t } = useTranslation();

  useEffect(() => {
    gsap.to(".partner_sect .partner_list .partner_logo", {
      xPercent: -100,
      repeat: -1,
      duration: 30,
      ease: "linear",
    });
  }, []);

  return (
      <section className="partner_sect" id="partner">
        <div className="inner">
          <div className="partner_title" data-aos="fade-up">
            <h2>{t("partnerSection.title")}</h2>
            <p>{t("partnerSection.desc")}</p>
          </div>

          <div className="partner_list" data-aos="fade-up">
            {[1, 2].map((rowIndex) => (
                <div className="partner_logo" key={rowIndex}>
                  {[1, 2, 3, 4, 5, 6].map((num) => (
                      <div className="logo" key={num}>
                        <img
                            src={`/images/partner_img0${num}.png`}
                            alt=""
                            className={`partner_img${num}`}
                        />
                      </div>
                  ))}
                </div>
            ))}
          </div>
        </div>
      </section>
  );
};

export default PartnerSection;
