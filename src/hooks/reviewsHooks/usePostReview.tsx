import { useMutation } from "@tanstack/react-query";
import axios from "axios"

const URL = 'http://localhost:4000/reviews'
export const usePostReview = () => {
    const {mutate, isSuccess} = useMutation({
        mutationKey: ['post review'],
        mutationFn: (newReview) => axios.post(URL, newReview)
    })

    return {mutate, isSuccess}
}