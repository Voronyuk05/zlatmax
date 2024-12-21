import { useEffect, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useGetTypesByAvailableCategories } from '@/hooks/typesHooks/useGetTypesByAvailableCategories';
import { useGetAttributesByAvailableProductsMarks } from '@/hooks/attributesHooks/useGetAttributesByAvailableProductsMarks';
import { useGetCategoriesByAvailableProductsMarks } from '@/hooks/categoriesHooks/useGetCategoriesByAvailableProductsMarks';
import { Headings } from '../../Headings/Headings';
import { ArrowDownIcon } from '../../Icons/Icons';
import Link from 'next/link';
import styles from './NavProductTypesList.module.scss'

export default function NavProductsTypesList() {
    const searchParams = useSearchParams()
    const path = usePathname()
    const {push} = useRouter()
    const [isShowed, setIsShowed] = useState<boolean>(false)
    const [hoveredType, setHoveredType] = useState(0)
    const {typesByAvailableCategoriesData} = useGetTypesByAvailableCategories()
    const {categoriesByAvailableProductsMarksData} = useGetCategoriesByAvailableProductsMarks(hoveredType)
    const {attributesByAvailableProductsMarksData} = useGetAttributesByAvailableProductsMarks({type_id: `${hoveredType}`})
    let hoverTimeout: NodeJS.Timeout
    

    const handleChangeHoveredType = (newType: number) => {
        clearTimeout(hoverTimeout)
        hoverTimeout = setTimeout(() => {
            setHoveredType(newType)
        }, 300)
    }

    const handleClearHoverTimeout = () => {
        setTimeout(() => {
            clearTimeout(hoverTimeout)
        }, 1)
    }

    useEffect(() => {
        setIsShowed(false)
        setHoveredType(0)
    }, [searchParams, path])

    return (
        <div className={`${isShowed ? styles.showed : ''} ${styles.nav_item}`}>
            <div className={styles.title} onClick={() => setIsShowed(!isShowed)}>
                <Headings heading='h4' color='white' weight='600'>Catalog</Headings>
                <ArrowDownIcon className={styles.arrow}/>
            </div>
            <div className={styles.types_menu}>
                <div className={styles.types_list}>
                    {typesByAvailableCategoriesData?.map(({type_id, type_name}) => (
                        <div key={type_id} className={`${hoveredType === type_id ? styles.hovered_type : ''} ${styles.types_item}`} onClick={() => push(`/products?type_id=${type_id}`)} onPointerEnter={() => handleChangeHoveredType(type_id)} onPointerLeave={handleClearHoverTimeout}>
                            <Headings heading='h5' color='white' weight='500'>{type_name}</Headings>
                            <ArrowDownIcon className={styles.type_arrow}/>
                        </div>
                    ))}
                </div>
                {hoveredType ? (<div className={styles.type_filters}>
                    {categoriesByAvailableProductsMarksData && categoriesByAvailableProductsMarksData?.length > 0 ? <div className={styles.filter_column}>
                        <Headings className={styles.filter_name} heading='h5' color='white' weight='600'>Categories</Headings>
                        <div className={styles.filter_items_list}>
                            {categoriesByAvailableProductsMarksData?.map(({category_id, category_name, type_id}) => (
                                <Link className={styles.filter_item} key={category_id} href={`/products?type_id=${type_id}&category_id=${category_id}`}>{category_name}</Link>
                            ))}
                        </div>
                    </div> : null}
                    {attributesByAvailableProductsMarksData?.map(({attribute_id, attribute_name, attribute_items}) => {
                        if (attribute_items) return (<div key={attribute_id} className={styles.filter_column}>
                            <Headings className={styles.filter_name} heading='h5' color='white' weight='600' >{attribute_name}</Headings>
                            <div className={styles.filter_items_list}>
                                {attribute_items.map(({attribute_item_id, attribute_item_name}) => (
                                    <Link className={styles.filter_item} key={attribute_item_id} href={`/products?type_id=${hoveredType}&${attribute_name}=${attribute_item_id}`}>{attribute_item_name}</Link>
                                ))}
                            </div>
                        </div>)
                    })}
                </div>) : null}
            </div>
        </div>
    )
}