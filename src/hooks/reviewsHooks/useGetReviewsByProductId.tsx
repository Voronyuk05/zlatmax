import reviewsServices from "@/services/reviews.service";
import { useQuery } from "@tanstack/react-query";

export const useGetReviewsByProductId = (productId: number) => {
    const {data, isLoading} = useQuery({
        queryKey: ['reviews by product id', productId],
        queryFn: () => reviewsServices.getReviewsByProductId(productId),
    })

    return {data, isLoading}
}