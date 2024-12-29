import categoriesServices from "@/services/apiServices/categories.service";
import { useQuery } from "@tanstack/react-query";

export const useGetCategoriesById = (id: number | string) => {
    const {data: categoriesByIdData, isLoading: isCategoriesByIdLoading} = useQuery({
        queryKey: ['categories by id', id],
        queryFn: () => categoriesServices.getCategoriesById(id),
        select: (data) => data[0] 
    })

    return {categoriesByIdData, isCategoriesByIdLoading}
}