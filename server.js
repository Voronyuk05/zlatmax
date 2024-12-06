// eslint-disable-next-line @typescript-eslint/no-var-requires, @typescript-eslint/no-require-imports
const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('db.json')
const middlewares = jsonServer.defaults();

// Додаємо middleware
server.use(middlewares);
server.use(jsonServer.bodyParser)

// Кастомна логіка для точного пошуку в масиві
const filterData = (data, req) => {
  if (data.length > 0) {
    if(req.query.sortBy === 'asc') {
      return data.sort((a,b) => a.name.localeCompare(b.name))
    } else if (req.query.sortBy === 'desc') {
      return data.sort((a,b) => b.name.localeCompare(a.name))
    } else if (req.query.sortBy === 'best') {
      return data.sort((a,b) => b.rating - a.rating)
    } else if (req.query.sortBy === 'worst') {
      return data.sort((a,b) => a.rating - b.rating)
    } else if (req.query.sortBy === 'earliest') {
      return data.sort((a, b) => {
        const [yearA, monthA, dayA] = a.publishedAt.split('-').map(Number);
        const [yearB, monthB, dayB] = b.publishedAt.split('-').map(Number);
        const dateA = new Date(yearA, monthA - 1, dayA);
        const dateB = new Date(yearB, monthB - 1, dayB);
        
        return Number(dateA) - Number(dateB)
      })
    } else if (req.query.sortBy === 'latest') {
      return data.sort((a, b) => {
        const [yearA, monthA, dayA] = a.publishedAt.split('-').map(Number);
        const [yearB, monthB, dayB] = b.publishedAt.split('-').map(Number);
        const dateA = new Date(yearA, monthA - 1, dayA);
        const dateB = new Date(yearB, monthB - 1, dayB);
        
        return Number(dateB) - Number(dateA)
      })
    } else {
      return data
    }
  } else {
    return data
  }
}

server.use((req, res, next) => {
  if (req.method === 'GET' && req.url.includes('/products')) {
    const db = router.db; 
    let products = db.get('products').filter(product => {
      for (let key of Object.keys(req.query)) {
        const productAttributeKey = product.attributes ? Object.keys(product.attributes).filter((attribute_id) => attribute_id === key)[0] : null
        const productAttribute = product.attributes[productAttributeKey]
        if (productAttribute) {
          if (req.query[key].includes('-')) {
            const [min, max] = req.query[key].split("-").map(Number)
            if (JSON.stringify(productAttribute) > max || JSON.stringify(product[key]) < min) {
              return
            }
          } else if (typeof productAttribute === 'string') {
            if (!productAttribute.toLocaleLowerCase().includes(String(req.query[key]).toLocaleLowerCase())) {
              return
            }
          } else if (typeof product[key] === 'number') {
            const searchedValues = req.query[key].split(",").map(Number)
            if (searchedValues.length > 1) {
              for (let value of searchedValues) {         
                if (product[key] === value) {
                  return true
                }
              }
              return
            } else {
              if (JSON.stringify(product[key]) !== req.query[key]) {
                return
              }
            }
          } else  {
            const searchedValues = req.query[key].split(",").map(Number)
            for (let value of searchedValues) {
              if (!JSON.stringify(productAttribute).includes(value)) {
                return
              }
            }
          }
        } else if (key === 'sortBy') {
        } else if (product[key] === undefined) {
          return
        } else if (product[key] !== undefined && product[key] !== null && product[key] !== '') {
          if (req.query[key].includes('-')) {
            const [min, max] = req.query[key].split("-").map(Number)
            if (JSON.stringify(product[key]) > max || JSON.stringify(product[key]) < min) {
              return
            }
          } else if (typeof product[key] === 'string') {
            if (!product[key].toLocaleLowerCase().includes(String(req.query[key]).toLocaleLowerCase())) {
              return
            }
          } else if (typeof product[key] === 'number') {
            const searchedValues = req.query[key].split(",").map(Number)
            if (searchedValues.length > 1) {
              for (let value of searchedValues) {         
                if (product[key] === value) {
                  return true
                }
              }
              return
            } else {
              if (JSON.stringify(product[key]) !== req.query[key]) {
                return
              }
            }
          } else  {
            for (let value of searchedValues) {
              if (!JSON.stringify(product[key]).includes(value)) {
                return
              }
            }
          }
        }
      }
      return true
    }).value();

    products = filterData(products, req)
    
    res.json(products);
  } else if (req.method === 'GET' && req.url.includes('/types')) {
    const db = router.db; 
    let types = db.get('types').filter(type => {
      for (let key of Object.keys(req.query)) {
        if (type[key] !== undefined && type[key] !== null && type[key] !== '') {
          if (typeof type[key] === 'string') {
            if (!type[key].toLocaleLowerCase().includes(String(req.query[key]).toLocaleLowerCase())) {
              return
            }
          } else if (typeof type[key] === 'number') {
            const searchedValues = req.query[key].split(",").map(Number)
            if (searchedValues.length > 1) {
              for (let value of searchedValues) {         
                if (type[key] === value) {
                  return true
                }
              }
              return
            } else {
              if (JSON.stringify(type[key]) !== req.query[key]) {
                return
              }
            }
          } else if (!type[key].includes(req.query[key])) {
            return
          }
          
        }
      }
      return true
    }).value()
    
    res.json(types);
  } else if (req.method === 'GET' && req.url.includes('/categories')) {
    const db = router.db; 
    let categories = db.get('categories').filter(category => {
      for (let key of Object.keys(req.query)) {
        if (category[key] !== undefined && category[key] !== null && category[key] !== '') {
          if (typeof category[key] === 'string') {
            if (!category[key].toLocaleLowerCase().includes(String(req.query[key]).toLocaleLowerCase())) {
              return
            }
          } else if (typeof category[key] === 'number') {
            const searchedValues = req.query[key].split(",").map(Number)
            if (searchedValues.length > 1) {
              for (let value of searchedValues) {         
                if (category[key] === value) {
                  return true
                }
              }
              return
            } else {
              if (JSON.stringify(category[key]) !== req.query[key]) {
                return
              }
            }
          } else if (!category[key].includes(req.query[key])) {
            return
          }
        }
      }
      return true
    }).value();
    
    res.json(categories);
  } else if (req.method === 'GET' && req.url.includes('/producers')) {
    const db = router.db; 
    let producers = db.get('producers').filter(producer => {
      for (let key of Object.keys(req.query)) {
        if (producer[key] !== undefined && producer[key] !== null && producer[key] !== '') {
          if (typeof producer[key] === 'string') {
            if (!producer[key].toLocaleLowerCase().includes(String(req.query[key]).toLocaleLowerCase())) {
              return
            }
          } else if (typeof producer[key] === 'number') {
            const searchedValues = req.query[key].split(",").map(Number)
            if (searchedValues.length > 1) {
              for (let value of searchedValues) {         
                if (producer[key] === value) {
                  return true
                }
              }
              return
            } else {
              if (JSON.stringify(producer[key]) !== req.query[key]) {
                return
              }
            }
          } else  {
            const searchedValues = req.query[key].split(",").map(Number)
            for (let value of searchedValues) {
              if (!JSON.stringify(producer[key]).includes(value)) {
                return
              }
            }
          }
        }
      }
      return true
    }).value();
    producers = filterData(producers, req)
    
    res.json(producers);
  } else if (req.method === 'GET' && req.url.includes('/attributes_categories')) {
    const db = router.db; 
    let attributesCategories = db.get('attributes_categories').filter(attributesCategory => {
      for (let key of Object.keys(req.query)) {
        if (attributesCategory[key] !== undefined && attributesCategory[key] !== null && attributesCategory[key] !== '') {
          if (typeof attribute[key] === 'string') {
            if (!attributesCategory[key].toLocaleLowerCase().includes(String(req.query[key]).toLocaleLowerCase())) {
              return
            }
          } else if (typeof product[key] === 'number') {
            const attributesCategory = req.query[key].split(",").map(Number)
            if (searchedValues.length > 1) {
              for (let value of searchedValues) {         
                if (attributesCategory[key] === value) {
                  return true
                }
              }
              return
            } else {
              if (JSON.stringify(attributesCategory[key]) !== req.query[key]) {
                return
              }
            }
          } else  {
            const searchedValues = req.query[key].split(",").map(Number)
            for (let value of searchedValues) {
              if (!JSON.stringify(attributesCategory[key]).includes(value)) {
                return
              }
            }
          }
        }
      }
      return true
    }).value();
    
    attributesCategories = filterData(attributesCategories, req)

    res.json(attributesCategories);
  } else if (req.method === 'GET' && req.url.includes('/attributes')) {
    const db = router.db; 
    let attributes = db.get('attributes').filter(attribute => {
      for (let key of Object.keys(req.query)) {
        if (attribute[key] !== undefined && attribute[key] !== null && attribute[key] !== '') {
          if (typeof attribute[key] === 'string') {
            if (!attribute[key].toLocaleLowerCase().includes(String(req.query[key]).toLocaleLowerCase())) {
              return
            }
          } else if (typeof attribute[key] === 'number') {
            const searchedValues = req.query[key].split(",").map(Number)
            if (searchedValues.length > 1) {
              for (let value of searchedValues) {         
                if (attribute[key] === value) {
                  return true
                }
              }
              return
            } else {
              if (JSON.stringify(attribute[key]) !== req.query[key]) {
                return
              }
            }
          } else  {
            const searchedValues = req.query[key].split(",").map(Number)
            for (let value of searchedValues) {
              if (!JSON.stringify(attribute[key]).includes(value)) {
                return
              }
            }
          }
        }
      }
      return true
    }).value();
    
    attributes = filterData(attributes, req)

    res.json(attributes);
  } else if (req.method === 'GET' && req.url.includes('/reviews')) {
    const db = router.db; 
    let reviews = db.get('reviews').filter(review => {
      for (let key of Object.keys(req.query)) {
        if (review[key] !== undefined && review[key] !== null && review[key] !== '') {
          if (key === 'user_rate') {
            if (JSON.stringify(review[key]) !== req.query[key]) {
              return
            }
          } else if (typeof review[key] === 'string') {
            if (!review[key].toLocaleLowerCase().includes(String(req.query[key]).toLocaleLowerCase())) {
              return
            }
          } else if (typeof review[key] === 'number') {
            const searchedValues = req.query[key].split(",").map(Number)
            if (searchedValues.length > 1) {
              for (let value of searchedValues) {         
                if (review[key] === value) {
                  return true
                }
              }
              return
            } else {
              if (JSON.stringify(review[key]) !== req.query[key]) {
                return
              }
            }
          } else if (!review[key].includes(req.query[key])) {
            return
          }
        }
      }
      return true
    }).value();
    
    reviews = filterData(reviews, req)

    res.json(reviews);
  } else {
    next(); // Якщо це не запит з тегами, передаємо далі
  }
});


// Використовуємо стандартний роутер JSON Server
server.use(router);

// Запускаємо сервер
server.listen(4000, () => {
  console.log('JSON Server is running');
});