import reviewsServices from "@/services/apiServices/reviews.service";
import { useQuery } from "@tanstack/react-query";

export const useGetReviewsByProductId = (productId: number | string) => {
    const {data: reviewsByProductIdData, isLoading: isReviewsByProductIdLoading} = useQuery({
        queryKey: ['reviews by product id', productId],
        queryFn: () => reviewsServices.getReviewsByProductId(productId),
    })

    return {reviewsByProductIdData, isReviewsByProductIdLoading}
}