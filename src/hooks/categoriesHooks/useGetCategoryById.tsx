import categoriesServices from "@/services/categories.service";
import { useQuery } from "@tanstack/react-query";

export const useGetCategoriesById = (id: number) => {
    const {data, isLoading} = useQuery({
        queryKey: ['categories by id', id],
        queryFn: () => categoriesServices.getCategoryById(id),
        select: (data) => data[0]
    })

    return {data, isLoading}
}