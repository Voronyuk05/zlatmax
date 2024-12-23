
import { IAttributeItem } from '@/types/apiTypes/attributes.types'
import { SortByFilter } from '../SortByFilter/SortByFilter'

export const AttributeSelect = ({attributeItems, searchParamName, filterParamLabel, className}: {attributeItems: IAttributeItem[], searchParamName: string, filterParamLabel: string, className?: string}) => {
    const attributeOptions = attributeItems.map(({attribute_item_id, attribute_item_name}) => {
        return {
            value: String(attribute_item_id),
            label: attribute_item_name
        }
    })

    return (
        <SortByFilter className={className} options={attributeOptions} searchParamName={searchParamName} filterParamLabel={filterParamLabel}/>
    )
}