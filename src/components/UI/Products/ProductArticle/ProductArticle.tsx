import { useEffect, useState } from 'react';
import { IProduct } from '@/types/apiTypes/products.types'
import { ProductImgsSwiper } from '../ProductImgsSwiper/ProductImgsSwiper'
import { LikeIcon, ComparisonIcon } from '../../Icons/Icons';
import { Headings } from '../../Headings/Headings';
import { Stars } from '../../Stars/Stars';
import { useGetAttributesByTypeId } from '@/hooks/attributesHooks/useGetAttributesByTypeId';
import { AttributeSelect } from '../../AttributeSelect/AttributeSelect';
import { ISearchParametrs } from '@/types/searchParameters.types';
import styles from './ProductArticle.module.scss'

export const ProductArticle = ({productData, searchParamsObj}: {productData: IProduct, searchParamsObj: ISearchParametrs}) => {
    const {imgs, type_id, name, article, brand, series, attributes, rating} = productData
    const {data: productAttributes} = useGetAttributesByTypeId(type_id)
    const [status, setStatus] = useState<string>('available')
    
    useEffect(() => {
        const statusControl = productAttributes?.map(({attribute_name}) => {
            const productAttribute = attributes ? attributes[attribute_name] : ''
            const searchParamAttribute = searchParamsObj[attribute_name]
            if (searchParamsObj[attribute_name] && productAttribute) {
                if (typeof productAttribute === 'number') {
                    if (String(productAttribute) !== searchParamAttribute) {
                        return false              
                    } else {
                        return true
                    }
                } else if (!String(productAttribute).includes(searchParamAttribute)) {  
                    return false  
                } else {
                    return true
                }
            }
        })
        if (statusControl?.includes(false)) {
            setStatus('sold')
        } else {
            setStatus('available')
        }
    }, [searchParamsObj])

    return (
        <section className={styles.product_article}>
            <div className={styles.container}>
                <ProductImgsSwiper imgs={imgs}/>
                <div className={styles.content}>
                    <div className={styles.row}>
                        <div className={styles.title}>
                            <Headings heading='h3' color='black' weight='600'>{name}</Headings>
                            <Stars rating={rating}/>
                            {status === 'available' ? <Headings heading='h6' color='success' weight='500'>{status}</Headings> : <Headings heading='h6' color='error' weight='500'>{status}</Headings>}
                        </div>
                        <div className={styles.interactions}>
                            <ComparisonIcon/>
                            <LikeIcon/>
                        </div>
                    </div>
                    <hr />
                    <div className={styles.column}>
                        <div className={styles.info_row}>
                            <Headings heading='h5' color='black' weight='500'>Article: </Headings>
                            <Headings heading='h5' color='secondary' weight='500'>{article}</Headings>
                        </div>
                        <div className={styles.info_row}>
                            <Headings heading='h5' color='black' weight='500'>Trademark: </Headings>
                            <Headings heading='h5' color='secondary' weight='500'>{brand}</Headings>
                        </div>
                        <div className={styles.info_row}>
                            <Headings heading='h5' color='black' weight='500'>Series: </Headings>
                            <Headings heading='h5' color='secondary' weight='500'>{series}</Headings>
                        </div>
                    </div>
                    <hr />
                    <div className={styles.column}>
                        {productAttributes?.map(({attribute_id, attribute_name, attribute_items}) => {
                            if (attribute_items) {
                                return (
                                    <div className={styles.attribute} key={attribute_id}>
                                        <Headings heading='h5' color='black' weight='500'>{attribute_name}</Headings>
                                        <AttributeSelect attributeItems={attribute_items} searchParamName={attribute_name} filterParamLabel={attribute_name} />
                                    </div>
                                )
                            }
                        })}
                    </div>
                    <hr />
                    <div className={styles.row}>

                    </div>
                    <div className={styles.row}>

                    </div>
                </div>
            </div>
        </section>
    )
}