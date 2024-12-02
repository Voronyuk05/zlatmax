import { useGetAllTypes } from '@/hooks/typesHooks/useGetAllTypes'
import { Headings } from '../Headings/Headings';
import { useState } from 'react';
import { useGetCategoriesByTypeId } from '../../../hooks/categoriesHooks/useGetCategoriesByTypeId';
import { IoArrowBack } from "react-icons/io5";
import { IoIosArrowForward } from "react-icons/io";
import Link from 'next/link';
import styles from './MenuNav.module.scss'

export const MenuNav = () => {
    const [hoveredType, setHoveredType] = useState(0)
    const {data: typesData} = useGetAllTypes()
    const {data: catergoriesByTypeData} = useGetCategoriesByTypeId(hoveredType)
    
    if (typesData)
    return (
        <div className={styles.wrapper_nav}>
            <nav className={styles.nav}>
                {typesData.map(({type_id, type_name}) => (
                    <div className={styles.products_type} key={type_id}>
                        {hoveredType === type_id && catergoriesByTypeData ? (
                            <div className={styles.products_filters}>
                                <IoArrowBack onClick={() => setHoveredType(0)}/>
                                <div className={styles.filter_column}>
                                    {catergoriesByTypeData.map(({category_id, category_name}) => (
                                        <Link key={category_id} href={`/products?type_id=${type_id}&category_id=${category_id}`}>{category_name}</Link>
                                    ))}
                                </div>
                            </div>
                        ) : hoveredType === 0 ? (
                            <Headings heading='h3' color='white' weight='500' onClick={() => setHoveredType(type_id)}><>{type_name} <IoIosArrowForward /></></Headings>
                        ) : null}
                    </div>
                ))}
            </nav>
        </div>
    )
}