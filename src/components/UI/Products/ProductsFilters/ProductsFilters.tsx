import { useState } from 'react';
import { useGetAttributesByAvailableProductsMarks } from '@/hooks/attributesHooks/useGetAttributesByAvailableProductsMarks';
import { useGetProducersByAvailableProducts } from '@/hooks/producersHooks/useGetProducersByAvailableProducts';
import { SearchCheckBox } from '../../SearchCheckbox/SearchCheckbox';
import { Headings } from '../../Headings/Headings';
import { AttributeItemsFilter } from '../../AttributeItemsFilter/AttributeItemsFilter';
import { RatingFilter } from '../../RatingFilter/RatingFilter';
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import LoadingCircle from '../../LoadingCircle/LoadingCircle';
import { ISearchParametrs } from '@/types/searchParameters.types';
import { AttributeValueFilter } from '../../AttributeValueFilter/AttributeValueFilter';
import { ProductMarkFilterItem } from '../ProductMarkFilterItem/ProductMarkFilterItem';
import styles from './ProductsFilters.module.scss';

export const ProductsFilters = ({searchParams}: {searchParams: ISearchParametrs}) => {
    const {availableProducers, isAvailableProducersLoading} = useGetProducersByAvailableProducts(searchParams)
    const {attributesByAvailableProductsMarksData, isAttributesByAvailableProductsMarksLoading} = useGetAttributesByAvailableProductsMarks(searchParams)
    const [producerShowed, setProducerShowed] = useState<boolean>(true)

    return (
        <div className={styles.filter_bar}>
            <div className={styles.filters_title}>
                <Headings heading="h4" color="white" weight="600">Products Filters</Headings>
            </div>
            <div className={styles.filters_list}>
                {availableProducers?.length && availableProducers?.length > 1 ? (
                    <div className={styles.filter_item}>
                        <div className={styles.filter_item_title} onClick={() => setProducerShowed(!producerShowed)}>
                            <Headings heading='h4' color='white' weight='600'>Producer</Headings>
                            <MdOutlineKeyboardArrowDown className={`${!producerShowed ? styles.turned : ''}`}/>
                        </div>
                        <div className={`${producerShowed ? '' : styles.hidden} ${styles.filter_item_body}`}>
                            {availableProducers.map(({producer_id, producer_name}) => (
                                <div key={producer_id} className={styles.attribute_option}>
                                    <SearchCheckBox key={producer_id} value={producer_id}
                                    searchParamName='producer_id' searchParamValue={producer_id}/>
                                    <Headings heading='h6' color='black' weight='600'>{producer_name}</Headings>
                                </div>
                            ))}
                        </div>
                    </div>
                ) : isAvailableProducersLoading ? <LoadingCircle/> : null}
                {attributesByAvailableProductsMarksData ? attributesByAvailableProductsMarksData.map(({type_id, attribute_id, attribute_items, attribute_name}) => {
                    if (attribute_items) {
                        return (
                            <AttributeItemsFilter
                            key={attribute_id}
                            type_id={type_id}
                            attribute_id={attribute_id}
                            attribute_items={attribute_items}
                            attribute_name={attribute_name}/>
                        )
                    } else {
                        return <AttributeValueFilter 
                        key={attribute_id}
                        type_id={type_id}
                        attribute_id={attribute_id}
                        attribute_name={attribute_name}
                        searchParams={searchParams}/>
                    }
                }) : isAttributesByAvailableProductsMarksLoading ? <LoadingCircle/> : null}
                <ProductMarkFilterItem filterName='price' searchParams={searchParams}/>
                <RatingFilter searchParams={searchParams}/>
            </div>
        </div>
    )
}