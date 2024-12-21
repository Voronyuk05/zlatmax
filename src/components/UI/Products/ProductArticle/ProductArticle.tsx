import { useAppDispatch, useAppSelector } from '@/lib/store';
import { useGetAttributesByAvailableProductsMarks } from '@/hooks/attributesHooks/useGetAttributesByAvailableProductsMarks';
import { addToBasket } from '@/lib/features/basket/basketSlice';
import { selectBasketItems } from '@/lib/features/selectors';
import { IProduct } from '@/types/apiTypes/products.types'
import { ProductImgsSwiper } from '../ProductImgsSwiper/ProductImgsSwiper'
import { LikeIcon, ComparisonIcon, BasketIcon, PlacedBasketIcon } from '../../Icons/Icons';
import { Stars } from '../../Stars/Stars';
import { AttributeSelect } from '../../AttributeSelect/AttributeSelect';
import { Headings } from '../../Headings/Headings';
import { SecondaryButton } from '../../Buttons/SecondaryButton';
import { DarkButton } from '../../Buttons/DarkButton';
import { PrimaryButton } from '../../Buttons/PrimaryButton';
import { ISearchParametrs } from '@/types/searchParameters.types';
import { IProductMark } from '@/types/apiTypes/productsMarks.type';
import styles from './ProductArticle.module.scss'
import './attributeSelectorStyles.scss'
import LoadingCircle from '../../LoadingCircle/LoadingCircle';

export const ProductArticle = ({productData, productMarkData, searchParams}: {productData: IProduct, productMarkData: IProductMark, searchParams: ISearchParametrs}) => {
    const {name, brand, series} = productData
    const {product_mark_id, status, rating, imgs, article, price} = productMarkData
    const {attributesByAvailableProductsMarksData, isAttributesByAvailableProductsMarksLoading} = useGetAttributesByAvailableProductsMarks(searchParams)
    const dispatch = useAppDispatch()
    const basketItems = useAppSelector(selectBasketItems)

    const handleAddProdutsToBasket = () => {
        dispatch(addToBasket({product: productMarkData}))
    }

    return (
        <section className={styles.product_article}>
            <div className={styles.container}>
                <ProductImgsSwiper imgs={imgs}/>
                <div className={styles.content}>
                    <div className={styles.row}>
                        <div className={styles.title}>
                            <Headings heading='h3' color='black' weight='600'>{name}</Headings>
                            <Stars rating={rating}/>
                            <div className={styles.status}>
                                {status === 'available' ? <Headings heading='h6' color='success' weight='500'>{status}</Headings> : <Headings heading='h6' color='error' weight='500'>{status}</Headings>}
                            </div>
                        </div>
                        <div className={styles.interactions}>
                            <ComparisonIcon/>
                            <LikeIcon/>
                        </div>
                    </div>
                    <hr />
                    <div className={styles.column}>
                        <div className={styles.info_row}>
                            <Headings heading='h5' color='black' weight='500'>Article: </Headings>
                            <Headings heading='h5' color='secondary' weight='500'>{article}</Headings>
                        </div>
                        <div className={styles.info_row}>
                            <Headings heading='h5' color='black' weight='500'>Trademark: </Headings>
                            <Headings heading='h5' color='secondary' weight='500'>{brand}</Headings>
                        </div>
                        <div className={styles.info_row}>
                            <Headings heading='h5' color='black' weight='500'>Series: </Headings>
                            <Headings heading='h5' color='secondary' weight='500'>{series}</Headings>
                        </div>
                    </div>
                    <hr />
                    {attributesByAvailableProductsMarksData ? (
                        <>
                            <div className={styles.column}>
                                {attributesByAvailableProductsMarksData.map(({attribute_id, attribute_name, attribute_items}) => {
                                    if (attribute_items) {
                                        return (
                                            <div className={styles.attribute} key={attribute_id}>
                                                <Headings heading='h5' color='black' weight='500'>{attribute_name}</Headings>
                                                <AttributeSelect className='react-attribute-select-container' attributeItems={attribute_items} searchParamName={attribute_name} filterParamLabel={attribute_name} />
                                            </div>
                                        )
                                    }
                                })}
                            </div>
                            <hr />
                        </>
                    ) : isAttributesByAvailableProductsMarksLoading ? <LoadingCircle /> : null}
                    <div className={styles.row}>
                        {/* <div className={styles.product_amount_switcher}>
                            <DarkButton onClick={() => handleDecreaseAmount()}>-</DarkButton>
                            <div className={styles.product_amount}>
                                <Headings heading='h5' color='black' weight='500'>{`${productAmount}`}</Headings>
                            </div>
                            <DarkButton onClick={() => handleIncreaseAmount()}>+</DarkButton>
                        </div> */}
                        <Headings heading='h2' weight='700' color='black'>{`${price} $`}</Headings>
                        <div className={styles.interactions}>
                            {!basketItems[product_mark_id] ? <PrimaryButton className={styles.add_to_cart_button} onClick={handleAddProdutsToBasket}>
                                <BasketIcon/>
                                Add to Cart
                            </PrimaryButton> : <SecondaryButton className={styles.go_to_cart_button}><PlacedBasketIcon />Go to Cart</SecondaryButton>}
                            <DarkButton>
                                Buy in 1 click
                            </DarkButton>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}