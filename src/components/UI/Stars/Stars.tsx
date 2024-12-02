import { FaStar } from "react-icons/fa";
import styles from './Stars.module.scss'

export const Stars = ({rating}: {rating: number}) => {
    const ratingArray = createRatingArray()

    function createRatingArray() {
        const result = [];
        for (let i = 1; i <= 5; i++) {
          result.push(i);
        }
        return result;
    }

    return (
        <div className={styles.stars}>
            {ratingArray.map((starRate) => {
                if (starRate > Math.round(rating)) {
                    return <FaStar key={starRate} className={styles.unactive_star}/>
                } else if (!rating) {
                    return <FaStar key={starRate} className={styles.unactive_star}/>
                }
                return <FaStar key={starRate} className={styles.active_star}/>
            })}
        </div>
    )
}