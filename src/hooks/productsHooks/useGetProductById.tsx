import productsServices from "@/services/apiServices/products.service";
import { useQuery } from "@tanstack/react-query";

export const useGetProductById = (productId: number | string) => {
    const {data, isLoading} = useQuery({
        queryKey: ['product by id', productId],
        queryFn: async () => await productsServices.getProductById(productId),
        select: data => data[0]
    })

    return {data, isLoading}
}