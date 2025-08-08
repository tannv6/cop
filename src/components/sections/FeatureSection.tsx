import React from "react";
import { useTranslation } from "react-i18next";
import "../../lib_css/jquery-ui.css";
import "../../lib_css/slick.css";
import "../../lib_css/swiper.min.css";
import "../../styles/style.css";

const iconPaths = [
  "/images/feature_ic01.png",
  "/images/feature_ic02.png",
  "/images/feature_ic03.png",
  "/images/feature_ic04.png",
  "/images/feature_ic05.png",
  "/images/feature_ic06.png"
];

const FeatureSection: React.FC = () => {
  const { t } = useTranslation();

  const title = t("featureSection.title");
  const subtitle = t("featureSection.subtitle");
  const cards = t("featureSection.cards", { returnObjects: true }) as {
    title: string;
    desc: string;
  }[];

  return (
      <section className="feature_sect" id="feature">
        <div className="inner">
          <div className="feature_title" data-aos="fade-up">
            <h2>{title}</h2>
            <p>{subtitle}</p>
          </div>
          <div className="feature_list" data-aos="fade-up">
            {cards.map((card, idx) => (
                <div className="card" key={idx}>
                  <div className="ico">
                    <img src={iconPaths[idx]} alt="" />
                  </div>
                  <div className="card_info">
                    <h2>
                      {card.title.split("\n").map((line, idx) => (
                          <React.Fragment key={idx}>
                            {line}
                            <br />
                          </React.Fragment>
                      ))}
                    </h2>
                    <p>
                      {card.desc.split("\n").map((line, i) => (
                          <React.Fragment key={i}>
                            {line}
                            <br />
                          </React.Fragment>
                      ))}
                    </p>
                  </div>
                </div>
            ))}
          </div>
        </div>
      </section>
  );
};

export default FeatureSection;
