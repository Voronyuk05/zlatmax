import { useQuery } from "@tanstack/react-query"
import filteredCategoriesServices from "@/services/clientServices/filteredCategories.service"

export const useGetCategoriesByAvailableProductsMarks = (type_id: number | string) => {
    const {data: categoriesByAvailableProductsMarksData, isLoading: isCategoriesByAvailableProductsMarksLoading} = useQuery({
        queryKey: ['categories by available products marks', type_id],
        queryFn: () => filteredCategoriesServices.getCategoriesByAvailableProductsMarks(type_id)
    })

    return {categoriesByAvailableProductsMarksData, isCategoriesByAvailableProductsMarksLoading}
}