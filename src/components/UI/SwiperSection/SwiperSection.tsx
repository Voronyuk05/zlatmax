import { Swiper } from 'swiper/react';
import { ReactElement, ReactNode } from 'react';
import { Navigation, A11y } from 'swiper/modules';
import { Headings } from '../Headings/Headings';
import styles from './SwiperSection.module.scss'
import 'swiper/scss';
import 'swiper/scss/navigation';
import 'swiper/scss/pagination';

export const SwiperSection = ({children, title, slidesPerView}: {children: ReactNode, title: string | ReactElement, slidesPerView: number}) => {
    return (
        <section className={styles.swiper_section}>
            <div className={styles.container}>
                <div className={styles.title}>
                    <Headings heading='h3' weight='900' color='black'>{title}</Headings>
                </div>
                <Swiper
                className={styles.slider}
                role='slider'
                modules={[Navigation, A11y]}
                spaceBetween={25}
                slidesPerView={slidesPerView}
                navigation={true}>
                    {children}
                </Swiper>
            </div>
        </section>
    )
}