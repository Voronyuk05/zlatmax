import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { CheckboxInput } from '../CheckboxInput/CheckboxInput';
const LoadingCircle = dynamic(() => import('../LoadingCircle/LoadingCircle'), {ssr: false})

export const SearchCheckBox = ({value, searchParamName, searchParamValue}: {value: string | number, searchParamName: string, searchParamValue: string | number}) => {
    const searchParams = useSearchParams()
    const path = usePathname()
    const {push} = useRouter()
    const attributeSearch = searchParams.get(searchParamName)
    const currentAttributes = typeof attributeSearch === 'string' ? attributeSearch.split(',').map(Number) : []
    const [isLoading, setIsLoading] = useState(false)

    const handleChangeSearchParam = (searchParamValue: number | string) => {
        setIsLoading(true)
        const params = new URLSearchParams(searchParams.toString())
        
        if (currentAttributes.includes(Number(searchParamValue))) {
            const searchedAttributesQuery = currentAttributes.filter(attribute => Number(attribute) !== Number(searchParamValue)).join(',')
            if (searchedAttributesQuery === '') {
                params.delete(searchParamName)
            } else {
                params.set(searchParamName, searchedAttributesQuery)
            }
        } else {
            const searchedAttributesQuery = [...currentAttributes, searchParamValue].join(',')
            params.set(searchParamName, searchedAttributesQuery)
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
            <CheckboxInput checked={currentAttributes.includes(Number(searchParamValue))} value={value} 
            handleChange={() => handleChangeSearchParam(searchParamValue)}/>
            {isLoading && <LoadingCircle />}
        </>
        
    )
}