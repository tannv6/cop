import React from "react";
import { useTranslation, Trans } from "react-i18next";
import EditListSlider from "./EditListSlider";

const ServiceSection: React.FC = () => {
  const { t } = useTranslation();

  const createText = t("service.create.text", { returnObjects: true }) as string[];
  const editText = t("service.edit.text", { returnObjects: true }) as string[];
  const smartAdText = t("service.smartAd.text", { returnObjects: true }) as string[];

  return (
      <section className="service_sect" id="service">
        <div className="inner">
          <div className="title_big" data-aos="fade-up">
            <h2>{t("service.title")}</h2>
          </div>

          <div className="service_list">
            {/* Create */}
            <div className="box flex__c">
              <div className="images" data-aos="fade-up">
                <div className="thumb">
                  <img src="/images/service_img01.png" alt="" />
                </div>
              </div>
              <div className="detail" data-aos="fade-up">
                <span className="tit">{t("service.create.tit")}</span>
                <h2 className="title">
                  <Trans i18nKey="service.create.title">
                    이미지 생성 기능 - <span>Create</span>
                  </Trans>
                </h2>
                <div className="text">
                  {createText.map((line, i) => (
                      <p key={i}>{line}</p>
                  ))}
                </div>
              </div>
            </div>

            {/* Edit */}
            <div className="box flex__c spe">
              <div className="detail" data-aos="fade-up">
                <span className="tit">{t("service.edit.tit")}</span>
                <h2 className="title">
                  <Trans i18nKey="service.edit.title">
                    간편한 편집 기능 - <span>Edit</span>
                  </Trans>
                </h2>
                <div className="text">
                  {editText.map((line, i) => (
                      <p key={i}>{line}</p>
                  ))}
                </div>
              </div>
              <div className="images" data-aos="fade-up">
                <div className="thumb">
                  <img src="/images/service_img02.png" alt="" />
                </div>
                <div className="ic">
                  <img src="/images/ser_ic01.png" alt="" className="ic01 only_web" />
                  <img src="/images/ser_ic01_m.png" alt="" className="ic01 only_mo" />
                  <img src="/images/ser_ic02.png" alt="" className="ic02 only_web" />
                  <img src="/images/ser_ic02_m.png" alt="" className="ic02 only_mo" />
                  <img src="/images/ser_ic03.png" alt="" className="ic03 only_web" />
                  <img src="/images/ser_ic03_m.png" alt="" className="ic03 only_mo" />
                </div>
              </div>
            </div>
          </div>

          {/* 편집 기능 Swiper */}
          <div className="service_edit">
            <div className="edit_top flex_b_c" data-aos="fade-up">
              <div className="btn_edit">
                <p>{t("service.editDetail")}</p>
              </div>
              <div className="btn_swiper">
                <div className="swiper-button-prev"></div>
                <div className="swiper-button-next"></div>
              </div>
            </div>
            <div className="edit_list" data-aos="fade-up">
              <EditListSlider />
            </div>
          </div>

          {/* Smart AD */}
          <div className="service_list last">
            <div className="box flex__c" data-aos="fade-up">
              <div className="images">
                <div className="thumb">
                  <img src="/images/service_img03.png" alt="" />
                </div>
              </div>
              <div className="detail">
                <span className="tit">{t("service.smartAd.tit")}</span>
                <h2 className="title">
                  <Trans i18nKey="service.smartAd.title">
                    광고 소재 제작 기능 - <span>Smart AD</span>
                  </Trans>
                </h2>
                <div className="text">
                  {smartAdText.map((line, i) => (
                      <p key={i}>{line}</p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
  );
};

export default ServiceSection;
