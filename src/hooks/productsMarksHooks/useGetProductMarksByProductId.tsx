import { useQuery } from "@tanstack/react-query";
import productsMarksServices from "@/services/apiServices/productsMarks.service";

export const useGetProductMarksByProductId = (productId: number | string) => {
    const {data, isLoading} = useQuery({
        queryKey: ['product marks by product id'],
        queryFn: () => productsMarksServices.getProductMarksByProductId(productId),
        select: (data) => data[0]
    })

    return {data, isLoading}
}