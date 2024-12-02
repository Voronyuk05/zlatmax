import { useEffect, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { IAttribute } from '@/types/apiTypes/attributes.types'
import { Headings } from '../Headings/Headings'
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import LoadingCircle from '../LoadingCircle/LoadingCircle';
import styles from './AttributeFilter.module.scss'
import { CheckboxInput } from '../CheckboxInput/CheckboxInput';


export const AttributeFilter = ({attribute_items, attribute_name}: IAttribute) => {
    const searchParams = useSearchParams()
    const path = usePathname()
    const {push} = useRouter()
    const attributeSearch = searchParams.get(attribute_name)
    const currentAttributes = typeof attributeSearch === 'string' ? attributeSearch.split(',').map(Number) : []
    const [isLoading, setIsLoading] = useState(false)
    const [isShowedFilter, setIsShowedFilter] = useState(true)

    const handleChangeSearchAttribute = (attribute_item_id: number) => {
        setIsLoading(true)
        const params = new URLSearchParams(searchParams.toString())
        
        
        if (currentAttributes.includes(Number(attribute_item_id))) {
            const searchedAttributesQuery = currentAttributes.filter(attribute => Number(attribute) !== Number(attribute_item_id)).join(',')
            if (searchedAttributesQuery === '') {
                params.delete(attribute_name)
            } else {
                params.set(attribute_name, searchedAttributesQuery)
            }
        } else {
            const searchedAttributesQuery = [...currentAttributes, attribute_item_id].join(',')
            params.set(attribute_name, searchedAttributesQuery)
        }
        
        push(`${path}?${params}`, { scroll: false })
    }

    useEffect(() => {
        let timer: NodeJS.Timeout
        if (isLoading) {
          timer = setTimeout(() => {
            setIsLoading(false);
          }, 500);
        }

        return () => clearTimeout(timer);
    }, [isLoading]);

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
                            <CheckboxInput key={attribute_item_id} checked={currentAttributes.includes(Number(attribute_item_id))} value={attribute_item_id} 
                            handleChange={() => handleChangeSearchAttribute(attribute_item_id)}/>
                            <Headings heading='h6' color='black' weight='600'>{attribute_item_name}</Headings>
                        </div>
                    ))}
                </div>
            </div>
            {isLoading && <LoadingCircle />}
        </>
    )
}