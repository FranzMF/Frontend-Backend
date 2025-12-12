import React from "react";

import img1 from '../../assets/images/slide-01.jpg'
import img2 from '../../assets/images/slide-02.jpg'
import img3 from '../../assets/images/slide-03.jpg'
import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// estilos
import '../../assets/css/main.css';
import '../../assets/css/util.css';

import { data } from "./data";

// Botón izquierda
const PrevArrow = ({ onClick }) => (
    <button
        className="slick-prev custom-arrow"
        onClick={onClick}
        style={{
            position: "absolute",
            left: "30px",
            top: "50%",
            transform: "translateY(-50%)",
            zIndex: 2,
            background: "rgba(0,0,0,0.5)",
            color: "white",
            border: "none",
            borderRadius: "50%",
            width: "40px",
            height: "40px",
            cursor: "pointer"
        }}
    >
        &#10094;
    </button>
);

// Botón de flecha derecha
const NextArrow = ({ onClick }) => (
    <button
        className="slick-next custom-arrow"
        onClick={onClick}
        style={{
            position: "absolute",
            right: "30px",
            top: "50%",
            transform: "translateY(-50%)",
            zIndex: 2,
            background: "rgba(0,0,0,0.5)",
            color: "white",
            border: "none",
            borderRadius: "50%",
            width: "40px",
            height: "40px",
            cursor: "pointer"
        }}
    >
        &#10095;
    </button>
);

const SliderPag = () => {

    const settings = {
        dots: true,
        infinite: true,
        speed: 800,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
        autoplay: true,
        autoplaySpeed: 3500,
        pauseOnHover: false,
        prevArrow: <PrevArrow />,
        nextArrow: <NextArrow />,
    };

    return (
        <section className="section-slide" style={{ overflow: "hidden" }}>
            <div className="wrap-slick1" style={{ position: 'relative' }}>
                <Slider {...settings} className="slick1">
                    {data.map((item, index) => (
                        <div key={index}>
                            <div
                                className="item-slick1"
                                style={{
                                    backgroundImage: `url(${item.background})`,
                                    height: "calc(104vh - 40px)",
                                    backgroundSize: "cover",
                                    backgroundPosition: "center",
                                }}
                            >
                                <div className="container h-full">
                                    <div className="flex-col-l-m h-full p-t-100 p-b-30 respon5">
                                        <div
                                            className="layer-slick1 animated visible-true"
                                            data-appear={item.spanAppear}
                                            data-delay="0"
                                        >
                                            <span className="ltext-101 cl2 respon2">
                                                {item.spanText}
                                            </span>
                                        </div>

                                        <div
                                            className="layer-slick1 animated visible-true"
                                            data-appear={item.h2Appear}
                                            data-delay="800"
                                        >
                                            <h2 className="ltext-201 cl2 p-t-19 p-b-43 respon1">
                                                {item.h2Text}
                                            </h2>
                                        </div>

                                        <div
                                            className="layer-slick1 animated visible-true"
                                            data-appear={item.linkAppear}
                                            data-delay="1600"
                                        >
                                            <a
                                                href={item.link}
                                                className="flex-c-m stext-101 cl0 size-101 bg1 bor1 hov-btn1 p-lr-15 trans-04"
                                            >
                                                {item.linkText}
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </Slider>
            </div>
        </section>
    );
};

export default SliderPag;
