import { useState } from 'react';
import { useGetAttributesByTypeId } from '@/hooks/attributesHooks/useGetAttributesByTypeId';
import { useGetAllProducers } from '@/hooks/producersHooks/useGetAllProducers';
import { InputDoubleRange } from '../../InputDoubleRange/InputDoubleRange';
import { ProductSpecialFiltersItem } from '../ProductSpecialFiltersItem/ProductSpecialFiltersItem';
import { Headings } from '../../Headings/Headings';
import { AttributeFilter } from '../../AttributeFilter/AttributeFilter';
import { RatingFilter } from '../../RatingFilter/RatingFilter';
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { IProduct } from '@/types/apiTypes/products.types';
import { IType } from '@/types/apiTypes/types.types';
import styles from './ProductsFilters.module.scss';


export const ProductsFilters = ({productsData, productsTypeId, productsType}: {productsData : IProduct[], productsTypeId: number, productsType: IType}) => {
    const {data: attributesData} = useGetAttributesByTypeId(productsTypeId)
    const {data: producersData} = useGetAllProducers()
    const [priceShowed, setPriceShowed] = useState<boolean>(true)
    const [ratingShowed, setRatingShowed] = useState<boolean>(true)
    

    if (attributesData && producersData)
    return (
        <div className={styles.filter_bar}>
            <div className={styles.filters_title}>
                <Headings heading="h4" color="white" weight="600">Products Filters</Headings>
            </div>
            <div className={styles.filters_list}>
                {attributesData.map(({type_id, attribute_id, attribute_items, attribute_name}) => (
                    <AttributeFilter
                    key={attribute_id}
                    type_id={type_id}
                    attribute_id={attribute_id}
                    attribute_items={attribute_items}
                    attribute_name={attribute_name}/>
                ))}
                {productsType.type_special_attributes && productsType.type_special_attributes.map((key, index) => {
                    const productAttributeMax = productsData.length > 0 ? productsData.sort((a,b) => Number(b[key]) - Number(a[key]))[0][key] : 9999
                    if (typeof productAttributeMax === 'number') {
                        return <ProductSpecialFiltersItem filterName={key} productAttributeMax={productAttributeMax} key={index} />
                    }
                })}
                <div className={styles.filter_item} >
                    <div className={styles.filter_item_title} onClick={() => setPriceShowed(!priceShowed)}>
                        <Headings heading='h4' color='white' weight='600'>Price</Headings>
                        <MdOutlineKeyboardArrowDown className={`${!priceShowed ? styles.turned : ''}`}/>
                    </div>
                    <div className={`${priceShowed ? '' : styles.hidden} ${styles.filter_item_body}`}>
                        <InputDoubleRange searchParamName='price' minValue={10} maxValue={3000} step={1}/>
                    </div>
                </div>
                <div className={styles.filter_item} >
                    <div className={styles.filter_item_title} onClick={() => setRatingShowed(!ratingShowed)}>
                        <Headings heading='h4' color='white' weight='600'>Rating</Headings>
                        <MdOutlineKeyboardArrowDown className={`${!ratingShowed ? styles.turned : ''}`}/>
                    </div>
                    <div className={`${ratingShowed ? '' : styles.hidden} ${styles.filter_item_body}`}>
                        <RatingFilter />
                    </div>
                </div>
            </div>
        </div>
    )
}