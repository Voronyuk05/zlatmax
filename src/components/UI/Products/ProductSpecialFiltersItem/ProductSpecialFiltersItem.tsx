import { useEffect, useState } from 'react';
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { Headings } from '../../Headings/Headings'
import { InputDoubleRange } from '../../InputDoubleRange/InputDoubleRange';
import LoadingCircle from '../../LoadingCircle/LoadingCircle';
import styles from './ProductSpecialFiltersItem.module.scss'

export const ProductSpecialFiltersItem = ({filterName, productAttributeMax}: {filterName: string, productAttributeMax: number}) => {
    const [isLoading, setIsLoading] = useState(false)
    const [isShowedFilter, setIsShowedFilter] = useState(true)
    const filterTitleName = filterName.replace(/_/, ' ')

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
                    <Headings heading='h4' color='white' weight='600'>{filterTitleName}</Headings>
                    <MdOutlineKeyboardArrowDown className={`${!isShowedFilter ? styles.turned : ''}`}/>
                </div>
                <div className={`${isShowedFilter ? '' : styles.hidden} ${styles.filter_item_body}`}>
                    <InputDoubleRange searchParamName={filterName} minValue={10} maxValue={productAttributeMax} step={1}/>
                </div>
            </div>
            {isLoading && <LoadingCircle />}
        </>
    )
}