import { ChangeEvent, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { DarkButton } from '../Buttons/DarkButton';
import styles from './InputDoubleRange.module.scss'

export const InputDoubleRange = ({searchParamName, minValue, maxValue, step}: {searchParamName: string, minValue: number, maxValue: number, step: number}) => {
    const searchParams = useSearchParams()
    const path = usePathname()
    const {push} = useRouter()
    const attributeSearch = searchParams.get(searchParamName)
    const [min, max] = attributeSearch ? attributeSearch.split('-').map(Number) : [minValue, maxValue]
    const [minPrice, setMinPrice] = useState(min)
    const [maxPrice, setMaxPrice] = useState(max)
    

    const searchByPrice = () => {
        const params = new URLSearchParams(searchParams.toString())
        params.set(searchParamName, `${minPrice}-${maxPrice}`)
        push(`${path}?${params}`, { scroll: false })
    }

    const handleChangeMinPrice = (e: ChangeEvent<HTMLInputElement>) => {
        const rangeInputValue = Number(e.currentTarget.value)
        setMinPrice(rangeInputValue)
        if( rangeInputValue > maxPrice ){ 
            setMaxPrice(rangeInputValue)
            setMinPrice(rangeInputValue) 
        }
    }

    const handleChangeMaxPrice = (e: ChangeEvent<HTMLInputElement>) => {
        const rangeInputValue = Number(e.currentTarget.value)
        setMaxPrice(rangeInputValue)
        if( minPrice > rangeInputValue ){ 
            setMaxPrice(rangeInputValue)
            setMinPrice(rangeInputValue) 
        }
    }
    
    return (
        <div className={styles.attribute_option}>
            <div className={styles.value_control}>
                <div className={styles.value_inputs}>
                    <input value={minPrice} min={minValue} max={maxValue} onChange={handleChangeMinPrice}/>
                    <input value={maxPrice} min={minValue} max={maxValue} onChange={handleChangeMaxPrice} />
                </div>
                <DarkButton onClick={searchByPrice}>
                    Ok
                </DarkButton>
            </div>
            <div className={styles.range_control}>
                <input value={minPrice} min={minValue} max={maxValue} step={step} type="range" onChange={handleChangeMinPrice}/>
                <input value={maxPrice} min={minValue} max={maxValue} step={step} type="range" onChange={handleChangeMaxPrice} />
            </div>
        </div>
    )
}