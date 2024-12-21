import { useRouter } from 'next/navigation';
import { Headings } from '../../../Headings/Headings';
import { IProductAttribute } from '@/types/reduxTypes/basket.types';
import styles from './ProductMarkCardAttributes.module.scss'
import { ISearchParametrs } from '@/types/searchParameters.types';
import { useGetAttributesByAvailableProductsMarks } from '@/hooks/attributesHooks/useGetAttributesByAvailableProductsMarks';

export default function ProductMarkCardAttributes({product_id, productMarkAttributes, productMarkArticleSearchParams}: {product_id: number, productMarkAttributes: IProductAttribute, productMarkArticleSearchParams: ISearchParametrs}) {
    const {push} = useRouter()
    
    const {attributesByAvailableProductsMarksData} = useGetAttributesByAvailableProductsMarks({...productMarkArticleSearchParams, product_id: `${product_id}`})

    const searchByParam = (paramName: string, paramValue: string | number) => {
        productMarkArticleSearchParams[paramName] = `${paramValue}`
        const productMarkArticleSearchParamsString = Object.entries(productMarkArticleSearchParams).map(([key, value]) => `${key}=${value}`).join('&')
        push(`/products/${product_id}?${productMarkArticleSearchParamsString}`, { scroll: false })
    }

    if (attributesByAvailableProductsMarksData)
    return (
        <>
            {attributesByAvailableProductsMarksData.map(({attribute_id, attribute_name, attribute_items}) => {
                if (attribute_items && attribute_items.length > 1) 
                return <div key={attribute_id} className={styles.attribute}>
                    <div className={styles.attribute_name}>
                        <Headings heading="h6" color="black" weight="600">{attribute_name}</Headings>
                    </div>
                    <div className={styles.attribute_items_list}>
                        {attribute_items && attribute_items.length > 1 && attribute_items.map(({attribute_item_id, attribute_item_name}) => {
                            const isAttributeItemActive = productMarkAttributes[attribute_name] === attribute_item_id
                            return <div key={attribute_item_id} className={`${isAttributeItemActive ? styles.active_attribute_item : ''} ${styles.attribute_item}`}
                             onClick={() => searchByParam(attribute_name, attribute_item_id)}>
                                <Headings heading='h6' color='black' weight='600'>{attribute_item_name}</Headings>
                            </div>
                        })}
                    </div>
                </div>
            })}
        </>
    )
}