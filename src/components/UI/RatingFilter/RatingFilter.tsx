import { useState } from "react";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { useGetProductsMarksByChosenAttributes } from "@/hooks/productsMarksHooks/useGetProductsMarksByChosenAttributes";
import { ISearchParametrs } from "@/types/searchParameters.types";
import LoadingCircle from "../LoadingCircle/LoadingCircle";
import { Stars } from '../Stars/Stars';
import { Headings } from "../Headings/Headings";
import { SearchCheckBox } from "../SearchCheckbox/SearchCheckbox";
import styles from './RatingFilter.module.scss'


export const RatingFilter = ({searchParams}: {searchParams: ISearchParametrs}) => {
    const {productsMarksByChosenAttributesData, isProductsMarksByChosenAttributesLoading} = useGetProductsMarksByChosenAttributes('rating', searchParams)
    const availableRatings = [5,4,3,2,1].filter((value) => {
        if (productsMarksByChosenAttributesData?.some(({rating: productMarkRating}) => productMarkRating === value)) {
            return value
        }
    })
    const [ratingShowed, setRatingShowed] = useState<boolean>(true)

    if (isProductsMarksByChosenAttributesLoading) <LoadingCircle/>

    if (availableRatings.length > 1)
    return (
        <div className={styles.filter_item}>
            <div className={styles.filter_item_title} onClick={() => setRatingShowed(!ratingShowed)}>
                <Headings heading='h4' color='white' weight='600'>Rating</Headings>
                <MdOutlineKeyboardArrowDown className={`${!ratingShowed ? styles.turned : ''}`}/>
            </div>
            <div className={`${ratingShowed ? '' : styles.hidden} ${styles.filter_item_body}`}>
                {availableRatings.map((value, index) => (
                    <div key={index} className={styles.rating_option}>
                        <SearchCheckBox value={value} searchParamName="rating" searchParamValue={value}/>
                        <Stars rating={value}/>
                        <Headings heading="h6" color="black" weight="600">{`${value}/5`}</Headings>
                    </div>
                ))}
            </div>
        </div>
    )
}