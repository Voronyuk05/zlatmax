import { useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { Stars } from '../Stars/Stars';
import { Headings } from "../Headings/Headings";
import styles from './RatingFilter.module.scss'
import { CheckboxInput } from "../CheckboxInput/CheckboxInput";

export const RatingFilter = () => {
    const searchParams = useSearchParams()
    const path = usePathname()
    const {push} = useRouter()
    const currentRating = Number(searchParams.get('rating'))
    const [isLoading, setIsLoading] = useState(false)

    const handleChangeSearchAttribute = (newRating: number) => {
        setIsLoading(true)
        const params = new URLSearchParams(searchParams.toString())
        
        if (currentRating=== newRating) {
            const searchedAttributesQuery = 0
            if (searchedAttributesQuery === 0) {
                params.delete('rating')
            } else {
                params.set('rating', String(newRating))
            }
        } else {
            params.set('rating', String(newRating))
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
            {[5,4,3,2,1].map((value, index) => (
                <div key={index} className={styles.rating_option}>
                    <CheckboxInput checked={Number(currentRating) === value} value={value} 
                    handleChange={() => handleChangeSearchAttribute(value)}/>
                    <Stars rating={value}/>
                    <Headings heading="h6" color="black" weight="600">{`${value}/5`}</Headings>
                </div>
            ))}
        </>
    )
}