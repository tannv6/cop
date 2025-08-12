import React from "react";
import { useTranslation } from "react-i18next";
import "../../lib_css/jquery-ui.css";
import "../../lib_css/slick.css";
import "../../lib_css/swiper.min.css";
import "../../styles/style.css";

const MainVisual: React.FC = () => {
  const { t } = useTranslation();

  const title = t("mainVisual.title", { returnObjects: true }) as {
    line1: string;
    line2: string;
    line3: string;
    line4: string;
  };

  const descList = t("mainVisual.desc", { returnObjects: true }) as string[];

  const btn = t("mainVisual.button", { returnObjects: true }) as {
    title: string;
    desc: string;
  };

  return (
      <section className="main_visual">
        <div className="inner">
          <div className="video-area">
            <div className="video-item">
              <video
                  id="videoPlayer"
                  loop
                  autoPlay
                  muted
                  playsInline
                  src="/video/video_main.mp4"
              >
                <source src="/video/video_main.mp4" type="video/mp4" />
              </video>
            </div>
          </div>
          <div className="main_content">
            <h2 className="title">
              {title.line1}
              <br className="only_mo" />
              {title.line2}
              <br className="only_mo" />
              {title.line3}
              <br className="only_mo" />
              {title.line4}
            </h2>
            <p className="desc">
              {descList.map((line, index) => (
                  <React.Fragment key={index}>
                    {line}
                    {index !== descList.length - 1 && <br />}
                  </React.Fragment>
              ))}
            </p>
            <a href="#contact" className="main_contact flex_c_c">
              <p>{btn.title}</p>
              <p>{btn.desc}</p>
              <img src="/images/arr_next.png" alt="" className="only_web" />
              <img src="/images/arr_next_m.png" alt="" className="only_mo" />
            </a>
          </div>
        </div>
        <div className="only_mo">
          <div className="beta">
            <p>Beta</p>
          </div>
        </div>
      </section>
  );
};

export default MainVisual;
