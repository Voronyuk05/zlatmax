import reviewsServices from "@/services/reviews.service";
import { useQuery } from "@tanstack/react-query";

export const useGetAllReviews = () => {
    const {data, isLoading} = useQuery({
        queryKey: ['all reviews'],
        queryFn: () => reviewsServices.getAllReviews()
    })

    return {data, isLoading}
}