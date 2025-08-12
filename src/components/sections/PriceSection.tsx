import React from "react";
import { useTranslation } from "react-i18next";
import "../../lib_css/jquery-ui.css";
import "../../lib_css/slick.css";
import "../../lib_css/swiper.min.css";
import "../../styles/style.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";

// interface PriceCard {
//   tag: string;
//   info: string;
//   price: string;
//   features: {
//     name: string;
//     included: boolean;
//   }[];
// }

const PriceSection: React.FC = () => {
  const { t } = useTranslation();
  const descLines = t("priceSection.desc", { returnObjects: true }) as {
    line1: string;
    line2: string;
    line3: string;
  };

  const note = t("priceSection.note");

  const product1 = t("priceSection.product.product1", { returnObjects: true }) as {
    title: string;
    credit: string;
    price: string;
    tag: string;
    line1: string;
    line2: string;
  };
  const product2 = t("priceSection.product.product2", { returnObjects: true }) as {
    title: string;
    credit: string;
    price: string;
    tag: string;
    line1: string;
    line2: string;
    line3: string;
  };
  const product3 = t("priceSection.product.product3", { returnObjects: true }) as {
    title: string;
    credit: string;
    price: string;
    tag: string;
    line1: string;
    line2: string;
    line3: string;
    line4: string;
    line5: string;
  };

  return (
    <section className="price_sect" id="price">
      <div className="inner">
        <div className="price_title" data-aos="fade-up">
          <h2>{t("priceSection.title")}</h2>
          <p>
            {Object.entries(descLines).map(([key, value]) => (
              <React.Fragment key={key}>
                {value}
                <br />
              </React.Fragment>
            ))}
            <span className="price_note">{note}</span>
          </p>
        </div>
        <div className="price_list" data-aos="fade-up">
          <div className="card">
            <div className="top">
              <div className="tag">
                <p>{product1.title}</p>
              </div>
              <div className="info_price">
                {/* <p className="info">{product1.credit}</p> */}
                <div className="price_num">
                  <span>{product1.credit}</span>
                  <p>
                    {product1.price} <span>{product1.tag}</span>
                  </p>
                </div>
              </div>
            </div>
            <div className="bot">
              <div className="price_check flex">
                <div className="ico">
                  <img src="/images/price_check.png" alt="" />
                </div>
                <div className="text">
                  <p>{product1.line1}</p>
                </div>
              </div>
              <div className="price_check flex">
                <div className="ico">
                  <img src="/images/price_check.png" alt="" />
                </div>
                <div className="text">
                  <p>{product1.line2}</p>
                </div>
              </div>
            </div>
          </div>
            <div className="card">
            <div className="top">
              <div className="tag">
                <p>{product2.title}</p>
              </div>
              <div className="info_price">
                {/* <p className="info">{product2.credit}</p> */}
                <div className="price_num">
                  <span>{product2.credit}</span>
                  <p>
                    {product2.price} <span>{product2.tag}</span>
                  </p>
                </div>
              </div>
            </div>
            <div className="bot">
              <div className="price_check flex">
                <div className="ico">
                  <img src="/images/price_check.png" alt="" />
                </div>
                <div className="text">
                  <p>{product2.line1}</p>
                </div>
              </div>
              <div className="price_check flex">
                <div className="ico">
                  <img src="/images/price_check.png" alt="" />
                </div>
                <div className="text">
                  <p>{product2.line2}</p>
                </div>
              </div>
              <div className="price_check flex">
                <div className="ico">
                  <img src="/images/price_check.png" alt="" />
                </div>
                <div className="text">
                  <p>{product2.line3}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="card">
            <div className="top">
              <div className="tag">
                <p>{product3.title}</p>
              </div>
              <div className="info_price">
                {/* <p className="info">{product3.credit}</p> */}
                <div className="price_num">
                  <span>{product3.credit}</span>
                  <p>
                    {product3.price} <span>{product3.tag}</span>
                  </p>
                </div>
              </div>
            </div>
            <div className="bot">
              <div className="price_check flex">
                <div className="ico">
                  <img src="/images/price_check.png" alt="" />
                </div>
                <div className="text">
                  <p>{product3.line1}</p>
                </div>
              </div>
              <div className="price_check flex">
                <div className="ico">
                  <img src="/images/price_check.png" alt="" />
                </div>
                <div className="text">
                  <p>{product3.line2}</p>
                </div>
              </div>
              <div className="price_check flex">
                <div className="ico">
                  <img src="/images/price_check.png" alt="" />
                </div>
                <div className="text">
                  <p>{product3.line3}</p>
                </div>
              </div>
              <div className="price_check flex">
                <div className="ico">
                  <img src="/images/price_check.png" alt="" />
                </div>
                <div className="text">
                  <p>{product3.line4}</p>
                </div>
              </div>
              <div className="price_check flex">
                <div className="ico">
                  <img src="/images/price_check.png" alt="" />
                </div>
                <div className="text">
                  <p>{product3.line5}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="price_list_mo">
          <Swiper
            modules={[Pagination]}
            slidesPerView="auto"
            spaceBetween={0}
            centeredSlides={true}
            initialSlide={1}
            pagination={{
              clickable: true,
              el: '.swiper-pagination'
            }}
            className="swiper-container"
          >
              <SwiperSlide>
                <div className="card">
                  <div className="top">
                    <div className="tag">
                      <p>{product1.title}</p>
                    </div>
                    <div className="info_price">
                      {/* <p className="info">{card.info}</p> */}
                      <div className="price_num">
                        <span>{product1.credit}</span>
                        <p>
                          {product1.price} <span>{product1.tag}</span>
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="bot">
                      <div className="price_check flex">
                        <div className="ico">
                          <img src="/images/price_check.png" alt="" />
                        </div>
                        <div className="text">
                          <p>{product1.line1}</p>
                        </div>
                      </div>
                      <div className="price_check flex">
                        <div className="ico">
                          <img src="/images/price_check.png" alt="" />
                        </div>
                        <div className="text">
                          <p>{product1.line2}</p>
                        </div>
                      </div>
                  </div>
                </div>
              </SwiperSlide>
                <SwiperSlide>
                <div className="card">
                  <div className="top">
                    <div className="tag">
                      <p>{product2.title}</p>
                    </div>
                    <div className="info_price">
                      {/* <p className="info">{card.info}</p> */}
                      <div className="price_num">
                        <span>{product2.credit}</span>
                        <p>
                          {product2.price} <span>{product2.tag}</span>
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="bot">
                      <div className="price_check flex">
                        <div className="ico">
                          <img src="/images/price_check.png" alt="" />
                        </div>
                        <div className="text">
                          <p>{product2.line1}</p>
                        </div>
                      </div>
                      <div className="price_check flex">
                        <div className="ico">
                          <img src="/images/price_check.png" alt="" />
                        </div>
                        <div className="text">
                          <p>{product2.line2}</p>
                        </div>
                      </div>
                      <div className="price_check flex">
                        <div className="ico">
                          <img src="/images/price_check.png" alt="" />
                        </div>
                        <div className="text">
                          <p>{product2.line3}</p>
                        </div>
                      </div>
                  </div>
                </div>
              </SwiperSlide>
                <SwiperSlide>
                <div className="card">
                  <div className="top">
                    <div className="tag">
                      <p>{product3.title}</p>
                    </div>
                    <div className="info_price">
                      {/* <p className="info">{card.info}</p> */}
                      <div className="price_num">
                        <span>{product3.credit}</span>
                        <p>
                          {product3.price} <span>{product3.tag}</span>
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="bot">
                      <div className="price_check flex">
                        <div className="ico">
                          <img src="/images/price_check.png" alt="" />
                        </div>
                        <div className="text">
                          <p>{product3.line1}</p>
                        </div>
                      </div>
                      <div className="price_check flex">
                        <div className="ico">
                          <img src="/images/price_check.png" alt="" />
                        </div>
                        <div className="text">
                          <p>{product3.line2}</p>
                        </div>
                      </div>
                      <div className="price_check flex">
                        <div className="ico">
                          <img src="/images/price_check.png" alt="" />
                        </div>
                        <div className="text">
                          <p>{product3.line3}</p>
                        </div>
                      </div>
                      <div className="price_check flex">
                        <div className="ico">
                          <img src="/images/price_check.png" alt="" />
                        </div>
                        <div className="text">
                          <p>{product3.line4}</p>
                        </div>
                      </div>
                      <div className="price_check flex">
                        <div className="ico">
                          <img src="/images/price_check.png" alt="" />
                        </div>
                        <div className="text">
                          <p>{product3.line5}</p>
                        </div>
                      </div>
                  </div>
                </div>
              </SwiperSlide>
          </Swiper>
          <div className="swiper-pagination"></div>
        </div>
      </div>
    </section>
  );
};

export default PriceSection;
