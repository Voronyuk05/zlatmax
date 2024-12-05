import { useRouter } from "next/navigation";
import { useInView } from "react-intersection-observer";
import toast from 'react-hot-toast';
import { useAppDispatch, useAppSelector } from "@/lib/store";
import { useGetAttributesByTypeId } from '../../../../hooks/attributesHooks/useGetAttributesByTypeId';
import { useGetReviewsByProductId } from '../../../../hooks/reviewsHooks/useGetReviewsByProductId';
import { selectBasketItems } from "@/lib/features/selectors";
import { addToBasket, deleteFromBasket } from "@/lib/features/basket/basketSlice";
import { IProduct } from "@/types/apiTypes/products.types";
import { Headings } from '../../Headings/Headings';
import { Stars } from '../../Stars/Stars';
import { PrimaryButton } from '../../Buttons/PrimaryButton';
import { LikeIcon, BasketIcon, ComparisonIcon } from "../../Icons/Icons";
import styles from './ProductCard.module.scss'

export const ProductCard = ({data}: {data: IProduct}) => {
    const { id, type_id, card_img, name, price, attributes, rating} = data
    const {push} = useRouter()
    const dispatch = useAppDispatch()
    const basketItems = useAppSelector(selectBasketItems)
    const {data: productAttributeData} = useGetAttributesByTypeId(type_id)
    const {data: reviewsData} = useGetReviewsByProductId(id)
    const { ref, inView } = useInView({
        triggerOnce: true,
        threshold: 0,
    });

    
    const handleAddProdutsToBasket = () => {
        dispatch(addToBasket({product: data}))
        toast(`${name[0].toLocaleUpperCase()}${name.slice(1)} added to basket`,
            {
              style: {
                borderRadius: '10px',
                background: '#615959',
                color: '#fff',
              },
            }
        );
    }

    const handleDeleteProductFormBasket = () => {
        dispatch(deleteFromBasket(data))
        toast(`${name[0].toLocaleUpperCase()}${name.slice(1)} removed from basket`,
            {
              style: {
                borderRadius: '10px',
                background: '#615959',
                color: '#fff',
              },
            }
        );
    }
    

    return (
        <div ref={ref} className={`${inView ? styles.showed : ''} ${styles.product_card}`}>
            <div className={styles.card_head}>
                <img src={card_img} alt={`${name} photo`} />
            </div>
            <div className={styles.card_body}>
                <div className={styles.row}>
                    <Headings heading="h4" color="black" weight="600">{name}</Headings>
                </div>
                {/* {productAttributeData?.length && attributes ? <div className={styles.row}>
                        {productAttributeData && productAttributeData[0] && productAttributeData[0].attribute_items.map(({attribute_item_id, attribute_item_name}) => {
                            const productAttribute = attributes.filter(({attribute_name}) => attribute_name === attribute_name)[0]
                            if (attributes[0] && productAttribute.attribute_items[0] === attribute_item_id) {
                                return  <Headings key={attribute_item_id} heading="h6" color="secondary" weight="600">{attribute_item_name}</Headings>
                            }
                        })}
                        <Headings heading="h6" color="secondary" weight="600">
                            {`${
                                attributes.length >= 2 ? [1,2].map((value) => {
                                    
                                    return ` ${productAttributeData[value].attribute_items.filter(({attribute_item_id}) => {
                                    const productAttribute = attributes.filter(({attribute_name}) => attribute_name === productAttributeData[value].attribute_name)[0]
                                        if (productAttribute && productAttribute.attribute_items[0] === attribute_item_id) {
                                            return  true
                                        }
                                    })[0]?.attribute_item_name}`
                                }) : ''
                            }`}
                        </Headings>
                </div> : <div></div>} */}
                <div className={styles.row}>
                    <Stars rating={rating}/>
                    <Headings heading="h6" color="secondary" weight="600">{`${reviewsData?.length} reviews`}</Headings>
                </div>
            </div>
            <div className={styles.card_footer}>
                <div className={styles.row}>
                    <Headings heading="h4" color="black" weight="600">{`$${price}`}</Headings>
                    <div className={styles.card_interactions}>
                        {Object.keys(basketItems).includes(String(id)) ? (
                            <BasketIcon className={styles.in_basket} onClick={handleDeleteProductFormBasket}/>
                        ) : (
                            <BasketIcon onClick={handleAddProdutsToBasket}/>
                        )}
                        <ComparisonIcon/>
                        <LikeIcon/>
                    </div>
                </div>
                <PrimaryButton onClick={() => push(`/products/${id}`)}>
                    Go To Product
                </PrimaryButton>
            </div>
        </div>
    )
}