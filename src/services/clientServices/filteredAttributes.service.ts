import { ISearchParametrs } from '@/types/searchParameters.types';
import productsMarksServices from '../apiServices/productsMarks.service';
import attributesServices from '../apiServices/attributes.service';

class FilteredAttributesServices {

    async getAttributesByAvailableProductsMarks(searchParams: ISearchParametrs) {
        const attributesData = await attributesServices.getAllAttributes()

            const availableAttributesPromise = attributesData?.map(async ({type_id, attribute_id, attribute_name, attribute_items}) => {
                const filteredPorudctsMarks = await productsMarksServices.getProductsMarksByChosenAttributes(attribute_name, searchParams)

                if (!filteredPorudctsMarks || filteredPorudctsMarks.length === 0) return undefined

                const isAttributeAvailable = filteredPorudctsMarks.some(({ attributes }) => attributes && Object.keys(attributes).includes(attribute_name))
    
                if (isAttributeAvailable) {
                    if (attribute_items) {
                            const availableValues = attribute_items.filter(({ attribute_item_id }) =>
                                filteredPorudctsMarks.some(({ attributes }) => attributes && attributes[attribute_name] === attribute_item_id)
                            );
                
                            if (availableValues && availableValues.length > 1) {
                                return {
                                    type_id: type_id,
                                    attribute_id: attribute_id,
                                    attribute_name: attribute_name,
                                    attribute_items: availableValues
                                }
                            }
                    } else { 
                        return {
                            type_id: type_id,
                            attribute_id: attribute_id,
                            attribute_name: attribute_name,
                        }
                    }
                }
            })
    
            const availableAttributes = (await Promise.all(availableAttributesPromise)).filter(item => item !== undefined);
    
            return availableAttributes
    }

    async getAttributesByProductId(product_id: number | string) {
        const productMarks = await productsMarksServices.getProductMarksByProductId(product_id)
        const attributes = await attributesServices.getAllAttributes()

        const productAttributes = attributes.map(({type_id, attribute_id, attribute_name, attribute_items}) => {
            if (attribute_items) {

                const attributeItemsByProductMarks = attribute_items.filter(({attribute_item_id}) => {
                    return productMarks.some(({attributes}) => attributes ? Object.values(attributes).includes(attribute_item_id) : false)
                })

                if (attributeItemsByProductMarks.length > 1) {
                    return {
                        type_id: type_id,
                        attribute_id: attribute_id,
                        attribute_name: attribute_name,
                        attribute_items: attributeItemsByProductMarks
                    }
                } else return
            } else return
        }).filter((attribute) => attribute !== undefined)

        return productAttributes
    }
}

const filteredAttributesServices = new FilteredAttributesServices()

export default filteredAttributesServices