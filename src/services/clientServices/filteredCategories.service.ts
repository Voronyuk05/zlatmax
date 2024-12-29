import productsMarksServices from "../apiServices/productsMarks.service"
import categoriesServices from "../apiServices/categories.service";
import productsServices from "../apiServices/products.service";

class FilteredCategoriesService {

    async getCategoriesByAvailableProductsMarks(type_id: number | string) {
        const productsMarks = await productsMarksServices.getProductsMarksBySearchParams({type_id: `${type_id}`})
        const products_ids = [...new Set(productsMarks.map(productMark => productMark.product_id))].join(',')
        const products = await productsServices.getProductsBySearchParams({product_id: products_ids})
        const productsCategories = [...new Set(products.map(product => product.category_id))].join(',')

        const categoriesByAvailableProductsMarks = await categoriesServices.getCategoriesById(productsCategories)

        return categoriesByAvailableProductsMarks
        
    }
}

export const filteredCategoriesServices = new FilteredCategoriesService()

export default filteredCategoriesServices