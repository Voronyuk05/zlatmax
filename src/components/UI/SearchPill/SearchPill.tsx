import { useRouter } from 'next/navigation';
import { useGetAttributeByName } from '@/hooks/attributesHooks/useGetAttributeByName';
import styles from './SearchPill.module.scss'


export const SearchPill = ({productId, attribute_name, attribute_value}: {productId: number ,attribute_name: string, attribute_value: string | number}) => {
    const {push} = useRouter()
    const {attributeByNameData} = useGetAttributeByName(attribute_name)
    const attributeItem = attributeByNameData?.attribute_items ? attributeByNameData.attribute_items.filter(({attribute_item_id}) => attribute_item_id === attribute_value)[0] : null



    if (attributeItem)
    return (
        <div className={styles.pill} onClick={() => push(`/products/${productId}?${attribute_name}=${attributeItem.attribute_item_id}`)}>
            {attributeItem.attribute_item_name}
        </div>
    )
}