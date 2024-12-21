import filteredTypesServices from "@/services/clientServices/filteredTypes.service"
import { useQuery } from "@tanstack/react-query"

export const useGetTypesByAvailableCategories = () => {
    const {data: typesByAvailableCategoriesData, isLoading: isTypesByAvailableCategoriesLoading} = useQuery({
        queryKey: ['types by available categories'],
        queryFn: () => filteredTypesServices.getTypesByAvailableCategories()
    })

    return {typesByAvailableCategoriesData, isTypesByAvailableCategoriesLoading}
}