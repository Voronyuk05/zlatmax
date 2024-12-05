import { useState } from 'react';
import { useGetAttributesByTypeId } from '@/hooks/attributesHooks/useGetAttributesByTypeId';
import { useGetProducerByTypeId } from '@/hooks/producersHooks/useGetProducersByTypeId';
import { SearchCheckBox } from '../../SearchCheckbox/SearchCheckbox';
import { InputDoubleRange } from '../../InputDoubleRange/InputDoubleRange';
import { ProductSpecialFiltersItem } from '../ProductSpecialFiltersItem/ProductSpecialFiltersItem';
import { Headings } from '../../Headings/Headings';
import { AttributeFilter } from '../../AttributeFilter/AttributeFilter';
import { RatingFilter } from '../../RatingFilter/RatingFilter';
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { IProduct } from '@/types/apiTypes/products.types';
import { IType } from '@/types/apiTypes/types.types';
import styles from './ProductsFilters.module.scss';


export const ProductsFilters = ({productsData, productsTypeId}: {productsData : IProduct[], productsTypeId: number, productsType: IType}) => {
    const {data: attributesData} = useGetAttributesByTypeId(productsTypeId)
    const {data: producersData} = useGetProducerByTypeId(productsTypeId)
    const [priceShowed, setPriceShowed] = useState<boolean>(true)
    const [ratingShowed, setRatingShowed] = useState<boolean>(true)
    const [producerShowed, setProducerShowed] = useState<boolean>(true)
    
    console.log(producersData);
    
    if (attributesData)
    return (
        <div className={styles.filter_bar}>
            <div className={styles.filters_title}>
                <Headings heading="h4" color="white" weight="600">Products Filters</Headings>
            </div>
            <div className={styles.filters_list}>
                    {producersData?.length ? (
                        <div className={styles.filter_item}>
                            <div className={styles.filter_item_title} onClick={() => setProducerShowed(!producerShowed)}>
                                    <Headings heading='h4' color='white' weight='600'>Producer</Headings>
                                    <MdOutlineKeyboardArrowDown className={`${!producerShowed ? styles.turned : ''}`}/>
                            </div>
                            <div className={`${producerShowed ? '' : styles.hidden} ${styles.filter_item_body}`}>
                                {producersData.map(({producer_id, producer_name}) => (
                                    <div key={producer_id} className={styles.attribute_option}>
                                        <SearchCheckBox key={producer_id} value={producer_id} 
                                        searchParamName='producer_id' searchParamValue={producer_id}/>
                                        <Headings heading='h6' color='black' weight='600'>{producer_name}</Headings>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ) : null}
                {attributesData.map(({type_id, attribute_id, attribute_items, attribute_name}) => {
                    if (attribute_items) {
                        return (
                            <AttributeFilter
                            key={attribute_id}
                            type_id={type_id}
                            attribute_id={attribute_id}
                            attribute_items={attribute_items}
                            attribute_name={attribute_name}/>
                        )
                    } else {
                        const productWithAttributeMax = productsData.length > 0 ? productsData.sort((a,b) => {
                            const AproductAttributeValue = a.attributes ? Number(a.attributes[attribute_name]) : 0
                            const BproductAttributeValue = b.attributes ? Number(b.attributes[attribute_name]) : 0

                            return BproductAttributeValue - AproductAttributeValue
                        }) : []
                        const attributeMax = productWithAttributeMax[0] && productWithAttributeMax[0].attributes ? productWithAttributeMax[0].attributes[attribute_name] : 9999
                        
                        
                        if (typeof attributeMax === 'number') {
                            return <ProductSpecialFiltersItem  key={attribute_id} filterName={attribute_name} productAttributeMax={attributeMax} />
                        }
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