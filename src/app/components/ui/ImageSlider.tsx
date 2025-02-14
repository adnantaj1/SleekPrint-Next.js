"use client";
import Slider from "react-slick";
import Image from "next/image";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

type ImageSliderProps = {
  images: string[];
};

export default function ImageSlider({ images }: ImageSliderProps) {
  const settings = {
    dots: images.length > 1, // ✅ Show dots only if multiple images
    infinite: images.length > 1, // ✅ Infinite loop only if multiple images
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: images.length > 1, // ✅ Show arrows only if multiple images
    autoplay: images.length > 1, // ✅ Autoplay only if multiple images
    autoplaySpeed: 3000,
  };

  return (
    <div className="w-full h-48">
      {images.length > 0 ? (
        <Slider {...settings}>
          {images.map((img, index) => (
            <div key={index} className="w-full h-48">
              <Image
                src={img}
                alt={`Product Image ${index + 1}`}
                width={300}
                height={200}
                className="object-cover w-full h-full rounded-md"
              />
            </div>
          ))}
        </Slider>
      ) : (
        <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-500">
          No Images Available
        </div>
      )}
    </div>
  );
}
