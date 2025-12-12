import React, { useState } from 'react';
import './Categories.css'
import img1 from '../../assets/images/categorys/category-01.png'
import img2 from '../../assets/images/categorys/category-02.png'
import img3 from '../../assets/images/categorys/category-03.webp'
import img4 from '../../assets/images/categorys/category-04.webp'

export default function CategoryGrid() {
    const [categories, setCategories] = useState([
        {
            id: 1,
            name: 'Laptops',
            count: 245,
            image: '💻',
            gridClass: 'row-span-2'
        },
        {
            id: 2,
            name: 'Drones',
            count: 28,
            image: '🚁',
            gridClass: 'col-span-2'
        },
        {
            id: 3,
            name: 'Smartphones',
            count: 273,
            image: '📱',
            gridClass: 'col-start-2 row-start-2'
        },
        {
            id: 4,
            name: 'Gaming',
            count: 25,
            image: '🎮',
            gridClass: 'col-start-3 row-start-2'
        }
    ]);

    const [hoveredId, setHoveredId] = useState(null);

    const hoverColors = [
        'bg-blue-500',
        'bg-purple-500',
        'bg-teal-600',
        'bg-rose-500',
        'bg-amber-500',
        'bg-green-500',
        'bg-indigo-500',
        'bg-pink-500'
    ];

    const addCategory = () => {
        const newCategory = {
            id: categories.length + 1,
            name: `Categoría ${categories.length + 1}`,
            count: Math.floor(Math.random() * 300),
            image: ['⌚', '🎧', '📷', '⌨️', '🖱️', '🖥️', '🔌', '💡'][Math.floor(Math.random() * 8)],
            gridClass: ''
        };
        setCategories([...categories, newCategory]);
    };

    const removeCategory = () => {
        if (categories.length > 1) {
            setCategories(categories.slice(0, -1));
        }
    };

    return (
        <div className='container'>

            <div className="p-b-10">
                <h3 className="ltext-103 cl5">
                    Categorias
                </h3>
            </div>
            <div class="container-categories">
                <div class="parent" id="categoryGrid">

                    <div class="category-card div1" data-id="1">
                        <div class="category-info">
                            <h3 class="category-title">Laptops</h3>
                            <p class="category-count">15</p>
                        </div>
                        <img src={img1} alt="" className='img1' />
                        {/* <div class="category-icon">💻</div> */}
                    </div>

                    <div class="category-card div2" data-id="2">
                        <div class="category-info">
                            <h3 class="category-title">Celulares</h3>
                            <p class="category-count">28</p>
                        </div>
                        <img src={img2} alt="" className='img2' />
                        {/* <div class="category-icon">🚁</div> */}
                    </div>
                    <div class="category-card div3" data-id="3">
                        <div class="category-info">
                            <h3 class="category-title">Consolas</h3>
                            <p class="category-count">23</p>
                        </div>
                        <img src={img3} alt="" className='img3' />
                        {/* <div class="category-icon">📱</div> */}
                    </div>
                    <div class="category-card div4" data-id="4">
                        <div class="category-info">
                            <h3 class="category-title">Tablets</h3>
                            <p class="category-count">15</p>
                        </div>
                        <img src={img4} alt="" className='img4' />
                        {/* <div class="category-icon">🎮</div> */}
                    </div>
                </div>
            </div>
        </div>
    );
}