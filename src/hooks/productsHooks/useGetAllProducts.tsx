import productsServices from "@/services/apiServices/products.service";
import { useQuery } from "@tanstack/react-query";

export const useGetAllProducts = () => {
    const {data, isLoading} = useQuery({
        queryKey: ['all products'],
        queryFn: () => productsServices.getAllProducts()
    })

    return {data, isLoading}
}