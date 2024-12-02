import categoriesServices from "@/services/categories.service";
import { useQuery } from "@tanstack/react-query";

export const useGetCategoriesByTypeId = (typeId: number) => {
    const {data, isLoading} = useQuery({
        queryKey: ['categories by type id', typeId],
        queryFn: () => categoriesServices.getCategoriesByTypeId(typeId),
    })

    return {data, isLoading}
}