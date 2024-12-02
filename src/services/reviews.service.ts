import { IReview } from '../types/apiTypes/reviews.types';
import axios from "axios"

class ReviewsServices {
    private URL = "http://localhost:4000/reviews"

    async getAllReviews() {
        return await axios.get<IReview[]>(this.URL).then(
            ({data}) => data
        )
    }

    async getReviewsByProductId(productId: number) {
        return await axios.get<IReview[]>(`${this.URL}?product_id=${productId}`).then(
            ({data}) => data
        )
    }
}

const reviewsServices = new ReviewsServices()

export default reviewsServices