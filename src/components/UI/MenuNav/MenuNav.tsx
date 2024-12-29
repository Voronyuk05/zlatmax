import { useRouter } from 'next/navigation';
import { useGetTypesByAvailableCategories } from '@/hooks/typesHooks/useGetTypesByAvailableCategories';
import { useGetCategoriesByAvailableProductsMarks } from '@/hooks/categoriesHooks/useGetCategoriesByAvailableProductsMarks';
import { useGetAttributesByAvailableProductsMarks } from '@/hooks/attributesHooks/useGetAttributesByAvailableProductsMarks';
import { Headings } from '../Headings/Headings';
import { useState } from 'react';
import { IoArrowBack } from "react-icons/io5";
import { IoIosArrowForward } from "react-icons/io";
import styles from './MenuNav.module.scss'

export default function MenuNav() {
    const [chosedType, setChosedType] = useState(0)
    const [chosedFilterItem, setChosedFilterItem] = useState('')
    const {typesByAvailableCategoriesData} = useGetTypesByAvailableCategories()
    const {categoriesByAvailableProductsMarksData} = useGetCategoriesByAvailableProductsMarks(chosedType)
    const {attributesByAvailableProductsMarksData} = useGetAttributesByAvailableProductsMarks({type_id: `${chosedType}`})
    const {push} = useRouter()
    
    if (typesByAvailableCategoriesData)
    return (
        <div className={styles.wrapper_nav}>
            <nav className={styles.nav}>
                {typesByAvailableCategoriesData.map(({type_id, type_name}) => (
                    <div className={styles.products_type} key={type_id}>
                        {chosedType === type_id && categoriesByAvailableProductsMarksData ? (
                            <div className={styles.type_filters}>
                                {chosedFilterItem === '' ? (
                                    <>
                                        <IoArrowBack className={styles.arrow_back} onClick={() => setChosedType(0)}/>
                                        <div className={styles.filter_column}>
                                            <div className={styles.filter_item} onClick={() => setChosedFilterItem('categories')}>
                                                <Headings heading='h4' color='white' weight='500'><>Categories <IoIosArrowForward /></></Headings>
                                            </div>
                                            {attributesByAvailableProductsMarksData ? attributesByAvailableProductsMarksData.map(({attribute_id, attribute_name, attribute_items}) => {
                                                if (attribute_items?.length) return <div key={attribute_id} className={styles.filter_item} onClick={() => setChosedFilterItem(attribute_name)}>
                                                    <Headings heading='h4' color='white' weight='500'><>{attribute_name} <IoIosArrowForward /></></Headings>                                           
                                                </div>
                                            }) : null}
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <IoArrowBack className={styles.arrow_back} onClick={() => setChosedFilterItem('')}/>
                                        <div className={styles.filter_column}>
                                            {chosedFilterItem === 'categories' ? categoriesByAvailableProductsMarksData.map(({category_id, category_name}) => (
                                                <div key={category_id} className={styles.filter_item} onClick={() => push(`/products?type_id=${type_id}&category_id=${category_id}`)}>
                                                    <Headings heading='h4' color='white' weight='500'>{category_name}</Headings>
                                                </div>
                                            )) : attributesByAvailableProductsMarksData?.map(({attribute_name, attribute_items}) => {
                                                if (attribute_name === chosedFilterItem) return attribute_items?.map(({attribute_item_id, attribute_item_name}) => (
                                                    <div key={attribute_item_id} className={styles.filter_item} onClick={() => push(`/products?type_id=${type_id}&${attribute_name}=${attribute_item_id}`)}>
                                                        <Headings heading='h4' color='white' weight='500'>{attribute_item_name}</Headings>
                                                    </div>
                                                )
                                                )
                                            })}
                                        </div>
                                    </>
                                )}
                            </div>
                        ) : chosedType === 0 ? (
                            <Headings heading='h3' color='white' weight='500' onClick={() => setChosedType(type_id)}><>{type_name} <IoIosArrowForward /></></Headings>
                        ) : null}
                    </div>
                ))}
            </nav>
        </div>
    )
}