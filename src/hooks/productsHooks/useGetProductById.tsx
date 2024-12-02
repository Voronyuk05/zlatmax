import productsServices from "@/services/products.service";
import { useQuery } from "@tanstack/react-query";

export const useGetProductById = (id: number) => {
    const {data, isLoading} = useQuery({
        queryKey: ['product by id', id],
        queryFn: async () => await productsServices.getProductById(id),
        select: data => data[0]
    })

    return {data, isLoading}
}