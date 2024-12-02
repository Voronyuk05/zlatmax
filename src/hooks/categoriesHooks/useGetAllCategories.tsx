import categoriesServices from "@/services/categories.service";
import { useQuery } from "@tanstack/react-query";

export const useGetAllCategories = () => {
    const {data, isLoading} = useQuery({
        queryKey: ['all categories'],
        queryFn: () => categoriesServices.getAllCategories()
    })

    return {data, isLoading}
}