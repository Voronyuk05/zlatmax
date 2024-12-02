import { ISelectOptions } from "@/types/select.types"
import { ReadonlyURLSearchParams } from "next/navigation"

export const getSearchParamByKey = (searchParams: ReadonlyURLSearchParams, searchParamName: string, filterParamLabel: string, options: ISelectOptions[]) => {
    const currentValue = searchParams.get(searchParamName) ? searchParams.get(searchParamName) : ''
    const currentOption = getCurrentOption(filterParamLabel, options, currentValue)
    
    return {currentValue, currentOption}
}


const getCurrentOption = (filterParamLabel: string, options: ISelectOptions[], currentValue: string | null) => {
    for (const option of options) { 
        if (String(option.value) === String(currentValue)) {
            return option
        }
    }
    return {label: filterParamLabel, value: ''}
}