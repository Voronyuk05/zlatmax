import categoriesServices from "@/services/apiServices/categories.service";
import { useQuery } from "@tanstack/react-query";

export const useGetCategoriesById = (id: number | string) => {
    const {data, isLoading} = useQuery({
        queryKey: ['categories by id', id],
        queryFn: () => categoriesServices.getCategoriesById(id),
        select: (data) => data[0]
    })

    return {data, isLoading}
}