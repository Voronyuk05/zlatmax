import { ISearchParametrs } from '@/types/searchParameters.types';
import productsMarksServices from '../apiServices/productsMarks.service';
import attributesServices from '../apiServices/attributes.service';

class FilteredAttributesServices {

    async getProductsMarksByChosenAttributes(attributeName: string, searchParams: ISearchParametrs) {
        const chosenAttributesObj: ISearchParametrs = {}
        const chosenAttributes = Object.entries(searchParams).filter((attribute) => attribute[0] !== attributeName)
        chosenAttributes.forEach((attribute) => {
            chosenAttributesObj[attribute[0]] = attribute[1]
        })
        
        return await productsMarksServices.getProductsMarksBySearchParams(chosenAttributesObj)
    }

    async getAttributesByAvailableProductsMarks(searchParams: ISearchParametrs) {
        const attributesData = await attributesServices.getAllAttributes()

        if (attributesData) {
            const availableAttributesPromise = attributesData?.map(async ({type_id, attribute_id, attribute_name, attribute_items}) => {
                const filteredPorudctsMarks = await this.getProductsMarksByChosenAttributes(attribute_name, searchParams)
    
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
        } else {
            return Promise.reject('Error')
        }
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