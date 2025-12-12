// import slide_01 from '../../assets/images/slide-01.jpg'
// import slide_02 from '../../assets/images/slide-02.jpg'
// import slide_03 from '../../assets/images/slide-03.jpg'
// import slide_04 from '../../assets/images/slide-04.jpg'
// import slide_01 from '../../assets/images/slider/slide-101.jpg'
import slide_01 from '../../assets/images/slider/slider-101.png'
import slide_02 from '../../assets/images/slider/slider-102.png'
import slide_03 from '../../assets/images/slider/slider-103.png'
import slide_04 from '../../assets/images/slider/slider-104.png'

export const data = [
    {
        id: 1, background: slide_01, spanText: "Categoria IPHONES",
        spanAppear: "fadeInDown", h2Text: "Iphone 17", h2Appear: "fadeInUp",
        link: "product.html", linkText: "Comprar ahora", linkAppear: "zoomIn",

    },
    {
        id: 2, background: slide_02,
            spanText: "Categoria Sony",
            spanAppear: "rollIn",
            h2Text: "Play station 5",
            h2Appear: "lightSpeedIn",
            link: "product.html",
            linkText: "Comprar ahora",
            linkAppear: "slideInUp",
    },
    {
        id: 3,  background: slide_03,
            spanText: "Categoria Samsung - celulares",
            spanAppear: "rotateInDownLeft",
            h2Text: "Samsung s24",
            h2Appear: "rotateInUpRight",
            link: "product.html",
            linkText: "Comprar ahora",
            linkAppear: "rotateIn",
    },
    {
        id: 4, background: slide_04,
            spanText: "Categoria Perifericos",
            spanAppear: "rotateInDownLeft",
            h2Text: "Mouse logitech",
            h2Appear: "rotateInUpRight",
            link: "product.html",
            linkText: "Comprar ahora",
            linkAppear: "rotateIn",
    },
]