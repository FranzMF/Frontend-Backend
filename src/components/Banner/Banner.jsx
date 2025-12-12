import React from 'react';

import banner_01 from '../../assets/images/banner-01.jpg';

import { dataBanner } from './dataBanner';
import { Link } from 'react-router-dom';

const Banner = () => {
    return (
        <div className="sec-banner bg0 p-t-80 p-b-50">
            <div className="container">
                
                <div class="row">
                    {dataBanner.map((item, index) => (

                        <div key={ index } class="col-md-6 col-xl-4 p-b-30 m-lr-auto">
                            {/* <!-- Block1 --> */}
                            <div class="block1 wrap-pic-w">
                                <img src={item.background} alt="IMG-BANNER" />
                                
                                <Link to='/products' class="block1-txt ab-t-l s-full flex-col-l-sb p-lr-38 p-tb-34 trans-03 respon3"> 
                                    <div class="block1-txt-child1 flex-col-l">
                                        <span class="block1-name ltext-102 trans-04 p-b-8 no-underline">
                                            {item.title}
                                        </span>

                                        <span class="block1-info stext-102 trans-04">
                                            {item.description}
                                        </span>
                                    </div>

                                    <div class="block1-txt-child2 p-b-4 trans-05">
                                        <div class="block1-link stext-101 cl0 trans-09">
                                            Shop Now
                                        </div>
                                    </div>
                                
                                </Link>
                                
                                {/* <a href="product.html" class="block1-txt ab-t-l s-full flex-col-l-sb p-lr-38 p-tb-34 trans-03 respon3">
                                </a> */}

                            </div>
                        </div>
                    ))}


                </div>
            </div>
        </div>
    )
}

export default Banner
