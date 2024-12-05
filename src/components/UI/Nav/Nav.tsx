import { useState } from 'react';
import { useGetCategoriesByTypeId } from '../../../hooks/categoriesHooks/useGetCategoriesByTypeId';
import { useGetAllTypes } from '@/hooks/typesHooks/useGetAllTypes'
import { useGetAttributesByTypeId } from '@/hooks/attributesHooks/useGetAttributesByTypeId';
import { Headings } from '../Headings/Headings';
import Link from 'next/link';
import styles from './Nav.module.scss'

export const Nav = () => {
    const [hoveredType, setHoveredType] = useState(0)
    const {data: typesData} = useGetAllTypes()
    const {data: catergoriesByTypeData} = useGetCategoriesByTypeId(hoveredType)
    const {data: attributesData} = useGetAttributesByTypeId(hoveredType)
    
    if (typesData)
    return (
        <div className={styles.wrapper_nav}>
            <nav className={styles.nav}>
                {typesData.map(({type_id, type_name}) => {
                    
                    return <div className={styles.products_type} key={type_id} onPointerEnter={() => setHoveredType(type_id)}  onPointerLeave={() => setHoveredType(0)}>
                        <Headings heading='h5' color='white' weight='500'>{type_name}</Headings>
                        {hoveredType === type_id && catergoriesByTypeData && attributesData ? (
                            <div className={styles.products_filters}>
                                <div className={styles.filters_container}>
                                    <div className={styles.filter_column}>
                                        <div className={styles.column_title}>
                                            <Link href={`/products?type_id=${type_id}`}>{`${type_name} categories`}</Link>
                                        </div>
                                        <div className={styles.column_items}>
                                            {catergoriesByTypeData.map(({category_id, category_name}) => (
                                                <Link key={category_id} href={`/products?type_id=${type_id}&category_id=${category_id}`}>{category_name}</Link>
                                            ))}
                                        </div>
                                        <div className={styles.column_bottom}>
                                            <Link href={`/products?type_id=${type_id}`}>See all</Link>
                                        </div>
                                    </div>
                                    {attributesData.map(({attribute_id, attribute_items, attribute_name}) => {
                                        if (attribute_items) {
                                            const slicedItems = attribute_items.slice(0, 6)
                                            return (<div className={styles.filter_column} key={attribute_id}>
                                                <div className={styles.column_title}>
                                                    <Link href={`/products?type_id=${type_id}`}>{`${attribute_name}`}</Link>
                                                </div>
                                                <div className={styles.column_items}>
                                                    {slicedItems.map(({attribute_item_id, attribute_item_name}) => (
                                                        <Link key={attribute_item_name} href={`/products?type_id=${type_id}&${attribute_name}=${attribute_item_id}`}>{attribute_item_name}</Link>
                                                    ))}
                                                </div>
                                                <div className={styles.column_bottom}>
                                                    <Link href={`/products?type_id=${type_id}`}>See all</Link>
                                                </div>
                                            </div>)
                                        }
                                    })}
                                </div>
                            </div>
                        ) : null}
                    </div>
                })}
            </nav>
        </div>
    )
}