import React, { useEffect, useState } from "react";
import {
  GalleryImage,
  ImageContainer,
  RestoGalleryWrapper,
  RestoGalleryContainer,
} from "./styles/RestoGallery.styled";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./styles/swiper-resto-gallery.css";

import { Navigation, Pagination } from "swiper";
import { Header } from "../../components/ReviewsCard/ReviewsCard.styled";

interface ImageProps {
  id: number;
  src: string;
  alt: string;
}

interface RestoGalleryProps {
  imageList: ImageProps[];
}

const RestoGallery: React.FC<RestoGalleryProps> = ({ imageList }) => {
  const [loadedImages, setLoadedImages] = useState<string[]>([]);

  const loadImages = async () => {
    const loadedImages = await Promise.all(
      imageList.map(async (image) => {
        const loadedImage = await import(`../../imgs/${image.src}`);
        return loadedImage.default;
      })
    );
    setLoadedImages(loadedImages);
  };

  useEffect(() => {
    loadImages();
  }, [imageList]);

  return (
    <RestoGalleryWrapper>
      <RestoGalleryContainer>
        <Header>Gallery ({imageList.length})</Header>
        <ImageContainer>
          <Swiper
            slidesPerView={3}
            loop={true}
            modules={[Navigation, Pagination]}
            pagination={{
              clickable: true,
            }}
            navigation={true}
            grabCursor={true}
            className="mySwiper"
          >
            {loadedImages.map((imageSrc, index) => (
              <SwiperSlide>
                <GalleryImage
                  key={imageList[index].id}
                  src={imageSrc}
                  alt={imageList[index].alt}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </ImageContainer>
      </RestoGalleryContainer>
    </RestoGalleryWrapper>
  );
};

export default RestoGallery;
