import { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, FreeMode, Thumbs, A11y, Zoom } from 'swiper/modules';
import 'swiper/scss';
import 'swiper/scss/navigation';
import 'swiper/css/free-mode'
import 'swiper/scss/thumbs'
import styles from './ProductImgsSwiper.module.scss'
import * as SwiperTypes from 'swiper/types';

export const ProductImgsSwiper = ({imgs}: {imgs: string[]}) => {
    const [thumbsSwiper, setThumbsSwiper] = useState<SwiperTypes.Swiper>()

    return ( 
            <div className={styles.gallery}>
                <Swiper       
                    modules={[Zoom, Navigation, FreeMode, Thumbs, A11y]}
                    loop={true}
                    zoom={true}
                    navigation={false}
                    thumbs={{
                        swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null
                    }}
                    spaceBetween={10}
                    className={styles.main_swiper}
                    observer={true}
                    >
                    {imgs.map((img, index) => (
                        <SwiperSlide key={index}>
                            <div className="swiper-zoom-container">
                                <img src={img} alt='product photo'/>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>

                <Swiper       
                    onSwiper={setThumbsSwiper}
                    modules={[Navigation, Thumbs]}
                    loop={true}
                    freeMode={true}
                    spaceBetween={10}
                    slidesPerView={4}
                    watchSlidesProgress={true}
                    pagination={{ clickable: true}}
                    scrollbar={{ draggable: true }}
                    className={styles.thumbs}
                    >
                    {imgs.map((img, index) => (
                        <SwiperSlide key={index} >
                            <img className={styles.blured} src={img} alt='product photo'/>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
    )
}