
import { ISelectOptions } from "@/types/select.types"
import { SelectEl } from "../Select/Select"
import { useEffect, useState } from "react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { getSearchParamByKey } from "./getSearchParamByKey"


export const SortByFilter = ({searchParamName, filterParamLabel, options, className}: {searchParamName: string, filterParamLabel: string, options: ISelectOptions[], className?: string}) => {
    const searchParams = useSearchParams()
    const path = usePathname()
    const {replace} = useRouter()
    const {currentOption, currentValue} = getSearchParamByKey(searchParams, searchParamName, filterParamLabel, options)
    const [selectedOption, setSelectedOption] = useState<ISelectOptions>(currentOption)
    
    
    
    useEffect(() => {
        setSelectedOption(currentOption)   
    }, [path, searchParams, currentValue])
    
    const changeOption = (e: ISelectOptions) => {
        setSelectedOption(e)
        const params = new URLSearchParams(searchParams.toString())
        if (e.value) {
            params.set(searchParamName, e.value)
        } else {
            params.delete(searchParamName)
        }
        replace(`${path}?${params}`, { scroll: false })
    }

    return (
        <SelectEl className={className} options={options} selectedOption={selectedOption} setSelectedOption={(e: ISelectOptions) => changeOption(e)} data-testid={searchParamName}/>
    )
}