import { IReview } from '../../types/apiTypes/reviews.types';
import axios from "axios"

class ReviewsServices {
    private URL = "http://localhost:4000/reviews"

    async getAllReviews() {
        try {
            return await axios.get<IReview[]>(this.URL).then(
                ({data}) => data
            )
        } catch (error: unknown) {
            if (error instanceof Error) {
                console.error(error.message);
            }
            throw new Error('Server is not available')
        }
    }

    async getReviewsByProductId(productId: number | string) {
        try {
            return await axios.get<IReview[]>(`${this.URL}?product_id=${productId}`).then(
                ({data}) => data
            )
        } catch (error: unknown) {
            if (error instanceof Error) {
                console.error(error.message);
            }
            throw new Error('Server is not available')
        }
    }
}

const reviewsServices = new ReviewsServices()

export default reviewsServices