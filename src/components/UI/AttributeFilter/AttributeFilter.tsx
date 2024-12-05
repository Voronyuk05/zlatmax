import { useState } from 'react';
import { IAttribute } from '@/types/apiTypes/attributes.types'
import { Headings } from '../Headings/Headings'
import { SearchCheckBox } from '../SearchCheckbox/SearchCheckbox';
import { MdOutlineKeyboardArrowDown } from "react-icons/md"
import styles from './AttributeFilter.module.scss'


export const AttributeFilter = ({attribute_items, attribute_name}: IAttribute) => {
    const [isShowedFilter, setIsShowedFilter] = useState(true)

    if (attribute_items)
    return (
        <>
            <div className={styles.filter_item}>
                <div className={styles.filter_item_title} onClick={() => setIsShowedFilter(!isShowedFilter)}>
                    <Headings heading='h4' color='white' weight='600'>{attribute_name}</Headings>
                    <MdOutlineKeyboardArrowDown className={`${!isShowedFilter ? styles.turned : ''}`}/>
                </div>
                <div className={`${!isShowedFilter ? styles.hidden : ''} ${styles.filter_item_body}`}>
                    {attribute_items.map(({attribute_item_id, attribute_item_name}) => (
                        <div key={attribute_item_id} className={styles.attribute_option}>
                            <SearchCheckBox key={attribute_item_id} value={attribute_item_id} 
                            searchParamName={attribute_name} searchParamValue={attribute_item_id}/>
                            <Headings heading='h6' color='black' weight='600'>{attribute_item_name}</Headings>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}