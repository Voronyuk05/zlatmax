import dynamic from "next/dynamic";
import toast from 'react-hot-toast';
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useInView } from "react-intersection-observer";
import { useAppDispatch, useAppSelector } from "@/lib/store";
import { useGetProductById } from "@/hooks/productsHooks/useGetProductById";
import { useGetReviewsByProductId } from '../../../../hooks/reviewsHooks/useGetReviewsByProductId';
import { useGetAttributesByAvailableProductsMarks } from "@/hooks/attributesHooks/useGetAttributesByAvailableProductsMarks";
import { selectBasketItems } from "@/lib/features/selectors";
import { addToBasket, deleteFromBasket } from "@/lib/features/basket/basketSlice";
import { Headings } from '../../Headings/Headings';
import { Stars } from '../../Stars/Stars';
import { PrimaryButton } from '../../Buttons/PrimaryButton';
import { LikeIcon, BasketIcon, ComparisonIcon } from "../../Icons/Icons";
import { IProductMark } from "@/types/apiTypes/productsMarks.type";
import { ISearchParametrs } from "@/types/searchParameters.types";
import styles from './ProductMarkCard.module.scss'
import LoadingCircle from "../../LoadingCircle/LoadingCircle";
const ProductMarkCardAttributes = dynamic(() => import('./ProductMarkCardAttributes/ProductMarkCardAttributes'), {ssr: false})

export default function ProductMarkCard({productMarkData}: {productMarkData: IProductMark}) {
    const {product_id, product_mark_id, article, card_img, rating, attributes, price} = productMarkData
    const {productByIdData, isProductByIdLoading} = useGetProductById(product_id)
    const {attributesByAvailableProductsMarksData} = useGetAttributesByAvailableProductsMarks({product_id: `${product_id}`})
    const {push} = useRouter()
    const dispatch = useAppDispatch()
    const basketItems = useAppSelector(selectBasketItems)
    const {reviewsByProductIdData} = useGetReviewsByProductId(product_mark_id)
    const { ref, inView } = useInView({triggerOnce: true, threshold: 0.3})
    const [isCardHovered, setIsCardHovered] = useState(false)


    if (!productByIdData) {
        return null
    }
    const {name} = productByIdData 

    const handleGetProductMarkArticleSearchParamsObj = () => {
        const productMarkArticleSearchParamsObj: ISearchParametrs = {}
        attributesByAvailableProductsMarksData?.forEach(({attribute_name, attribute_items}) => {
            if (attributes && attribute_items) {
                productMarkArticleSearchParamsObj[attribute_name] = `${attributes[attribute_name]}`
            }
        })

        return productMarkArticleSearchParamsObj
    }

    const handleGetProductMarkArticleSearchParamsString = () => {
        return Object.entries(handleGetProductMarkArticleSearchParamsObj()).map(([key, value]) => `${key}=${value}`).join('&')
    }

    const handleAddProdutsToBasket = () => {
        dispatch(addToBasket({product: productMarkData}))
        toast(`${name[0].toLocaleUpperCase()}${name.slice(1)} added to basket`,
            {
              style: {
                borderRadius: '10px',
                background: '#615959',
                color: '#fff',
              },
            }
        )
    }

    const handleDeleteProductFormBasket = () => {
        dispatch(deleteFromBasket(productMarkData))
        toast(`${name[0].toLocaleUpperCase()}${name.slice(1)} removed from basket`,
            {
              style: {
                borderRadius: '10px',
                background: '#615959',
                color: '#fff',
              },
            }
        )
    }
    
    if (isProductByIdLoading) return <LoadingCircle/>

    if (productByIdData) 
    return (
        <div ref={ref} className={`${inView ? styles.showed : ''} ${styles.product_card}`} onMouseEnter={() => setIsCardHovered(true)} onMouseLeave={() => setIsCardHovered(false)}>
            <div className={styles.card_container}>
                <div className={styles.card_head}>
                    <img src={card_img} alt={`${name} photo`} />
                </div>
                <div className={styles.card_body}>
                    <div className={styles.row}>
                        <Headings heading="h4" color="black" weight="600">{`${name} ${article}`}</Headings>
                    </div>
                    <div className={styles.row}>
                        <Stars rating={rating}/>
                        <Headings heading="h6" color="secondary" weight="600">{`${reviewsByProductIdData?.length} reviews`}</Headings>
                    </div>
                </div>
                <hr />
                <div className={styles.card_footer}>
                    <div className={styles.row}>
                        <Headings heading="h4" color="black" weight="600">{`$${price}`}</Headings>
                        <div className={styles.card_interactions}>
                            {Object.keys(basketItems).includes(String(product_mark_id)) ? (
                                <BasketIcon className={styles.in_basket} onClick={handleDeleteProductFormBasket}/>
                            ) : (
                                <BasketIcon onClick={handleAddProdutsToBasket}/>
                            )}
                            <ComparisonIcon/>
                            <LikeIcon/>
                        </div>
                    </div>
                    <PrimaryButton onClick={() => push(`/products/${product_id}?${handleGetProductMarkArticleSearchParamsString()}`)}>
                        Go To Product
                    </PrimaryButton>
                </div>
                {isCardHovered && attributes ? <div className={styles.attributes}>
                    <ProductMarkCardAttributes productMarkAttributes={attributes} product_id={product_id} productMarkArticleSearchParams={handleGetProductMarkArticleSearchParamsObj()}/>
                </div> : null} 
            </div>
        </div>
    )
}