import React from "react";
import { useTranslation } from "react-i18next";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import CardThumb from "../CardThumb";

const imageData = [
  {
    thumbClass: "thumb1",
    videoSrc: "/video/video_card1.mp4",
    imgWeb: "/images/edit_img01.png",
    imgMo: "/images/edit_img01_m.png"
  },
  {
    thumbClass: "thumb2",
    videoSrc: "/video/video_card2.mp4",
    imgWeb: "/images/edit_img02.png",
    imgMo: "/images/edit_img02_m.png"
  },
  {
    thumbClass: "thumb3",
    videoSrc: "/video/video_card3.mp4",
    imgWeb: "/images/edit_img03.png",
    imgMo: "/images/edit_img03_m.png"
  },
  {
    thumbClass: "thumb4",
    videoSrc: "/video/video_card4.mp4",
    imgWeb: "/images/edit_img04.png",
    imgMo: "/images/edit_img04_m.png"
  },
  {
    thumbClass: "thumb5",
    videoSrc: "/video/video_card5.mp4",
    imgWeb: "/images/edit_img05.png",
    imgMo: "/images/edit_img05_m.png"
  }
];

const EditListSlider: React.FC = () => {
  const { t } = useTranslation();
  const editCardTexts = t("editCards", { returnObjects: true }) as {
    title: string;
    desc: string;
  }[];

  return (
      <Swiper
          modules={[Navigation]}
          loop={true}
          slidesPerView="auto"
          spaceBetween={55}
          navigation={{
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev"
          }}
          breakpoints={{
            0: { spaceBetween: 0 },
            1080: { spaceBetween: 55 }
          }}
      >
        {imageData.map((item, index) => (
            <SwiperSlide key={index}>
              <div className="card">
                <CardThumb
                    thumbClass={item.thumbClass}
                    videoSrc={item.videoSrc}
                    imgWeb={item.imgWeb}
                    imgMo={item.imgMo}
                />
                <div className="card_detail">
                  <p className="cont">{editCardTexts[index]?.title}</p>
                  <div className="text">
                    {editCardTexts[index]?.desc.split("\n").map((line, i) => (
                        <p key={i}>{line}</p>
                    ))}
                  </div>
                </div>
              </div>
            </SwiperSlide>
        ))}
      </Swiper>
  );
};

export default EditListSlider;
