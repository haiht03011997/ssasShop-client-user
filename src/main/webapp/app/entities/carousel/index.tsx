import React from 'react';
import { Carousel, Image } from 'antd';
import './style.scss'
const CustomCarousel = () => {
  return (
    <Carousel className="carousel-mid" autoplay={false} dotPosition="bottom" autoplaySpeed={2000}>
      <Image className="image-slide rounded" loading="lazy" src="/content/images/slide/capcut-59435.webp" />
      <Image className="image-slide rounded" loading="lazy" src="/content/images/slide/netflix-slide.webp" />
      <Image className="image-slide rounded" loading="lazy" src="/content/images/slide/youtube-Slide.webp" />
    </Carousel>
  );
};
export default CustomCarousel;
