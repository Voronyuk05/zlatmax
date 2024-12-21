import filteredCategoriesServices from "./filteredCategories.service"
import typesServices from "../apiServices/types.service"

class FilteredTypesServices {
    async getTypesByAvailableCategories() {
        const types = await typesServices.getAllTypes()
        const availableTypesPromise = types.map(async (type) => {
            const categoriesByTypeId = await filteredCategoriesServices.getCategoriesByAvailableProductsMarks(type.type_id)
            
            if (categoriesByTypeId.some((({type_id: category_type_id}) => category_type_id === type.type_id))) {
                return type
            }
        })
        const availableTypes = (await Promise.all(availableTypesPromise)).filter(item => item != undefined)

        return availableTypes
    }
}

const filteredTypesServices = new FilteredTypesServices()

export default filteredTypesServices