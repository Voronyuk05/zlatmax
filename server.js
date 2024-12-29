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
    if (req.query.sortBy === 'best') {
      return data.sort((a,b) => a.rating && b.rating ? b.rating - a.rating : 0)
    } else if (req.query.sortBy === 'worst') {
      return data.sort((a,b) => a.rating && b.rating ? a.rating - b.rating : 0)
    } else if (req.query.sortBy === 'expensive') {
      return data.sort((a,b) => a.price && b.price ? b.price - a.price : 0)
    } else if (req.query.sortBy === 'cheap') {
      return data.sort((a,b) => a.price && b.price ? a.price - b.price : 0)
    } else if (req.query.sortBy === 'newest') {
      return data.sort((a, b) => {
        if (a.published_at && b.published_at) {
          const [yearA, monthA, dayA] = a.published_at.split('-').map(Number)
          const [yearB, monthB, dayB] = b.published_at.split('-').map(Number) 
          const dateA = new Date(yearA, monthA - 1, dayA);
          const dateB = new Date(yearB, monthB - 1, dayB);
          
          return Number(dateA) - Number(dateB)
        }
      })
    } else if (req.query.sortBy === 'latest') {
      return data.sort((a, b) => {
        if (a.published_at && b.published_at) {
          const [yearA, monthA, dayA] = a.published_at.split('-').map(Number);
          const [yearB, monthB, dayB] = b.published_at.split('-').map(Number);
          const dateA = new Date(yearA, monthA - 1, dayA);
          const dateB = new Date(yearB, monthB - 1, dayB);
          
          return Number(dateB) - Number(dateA)
        }
      })
    } else {
      return data
    }
  } else {
    return data
  }
}

const filterDataByRequestQuery = (data, key, value) => {
  if (key === 'sortBy') {
  } else if (data[key] === undefined) {
    return
  } else if (data[key] !== undefined && data[key] !== null && data[key] !== '') {
    if (value.includes('-')) {
      const [min, max] = value.split("-").map(Number)
      if (JSON.stringify(data[key]) > max || JSON.stringify(data[key]) < min) {
        return
      }
    } else if (typeof data[key] === 'string') {
      if (!data[key].toLocaleLowerCase().includes(String(value).toLocaleLowerCase())) {
        return
      }
    } else if (typeof data[key] === 'number') {
      const searchedValues = value.split(",").map(Number)
      if (searchedValues.length > 1) {
        for (let value of searchedValues) {           
          if (data[key] === value) {
            return  true
          }
        }
        return false
      } else {
        if (JSON.stringify(data[key]) !== value) {
          return
        }
      }
    } else  {
      const searchedValues = value.split(",").map(Number)
      for (let value of searchedValues) {
        if (!JSON.stringify(data[key]).includes(value)) {
          return
        }
      }
    }
  }
  return true
}

server.use((req, res, next) => {
  if (req.method === 'GET' && req.url.includes('/products_marks')) {
    const db = router.db; 
    let productsMarks = db.get('products_marks').filter(productMark => {
      for (let key of Object.keys(req.query)) {
        const filterResult = filterDataByRequestQuery(productMark, key, req.query[key])
        const productAttributeKey = productMark.attributes ? Object.keys(productMark.attributes).filter((attribute_name) => attribute_name === key)[0] : null
        const productAttribute = productMark.attributes
        const filterAttributeResult = productAttribute ? filterDataByRequestQuery(productAttribute, productAttributeKey, req.query[key]) : null

        if (filterResult | filterAttributeResult) {
          
        } else {
          let products = db.get('products').filter(product => {
              if (product.product_id === productMark.product_id) {
                const filterResult = filterDataByRequestQuery(product, key, req.query[key])
                if (!filterResult) {
                  return
                }
              } else {
                return
              }
            return true
          }).value()
          
          if (!products.length) {
            return
          }
        }
      }
      return true
    }).value()
    
    productsMarks = filterData(productsMarks, req)
    
    res.json(productsMarks);
  } else if (req.method === 'GET' && req.url.includes('/products')) {
    const db = router.db; 
    let products = db.get('products').filter(product => {
      for (let key of Object.keys(req.query)) {
        const filterResult = filterDataByRequestQuery(product, key, req.query[key])

        if (!filterResult) {
          if (!JSON.stringify(Object.keys(product)).includes(key)) {
            let productsMarks = db.get('products_marks').filter(productMark => {
              if (productMark.product_id === product.product_id) {
                const filterResult = filterDataByRequestQuery(productMark, key, req.query[key])
                const productAttributeKey = productMark.attributes ? Object.keys(productMark.attributes).filter((attribute_name) => attribute_name === key)[0] : null
                const productAttribute = productMark.attributes
                const filterAttributeResult = productAttribute ? filterDataByRequestQuery(productAttribute, productAttributeKey, req.query[key]) : null
                  
                if (!filterResult || !filterAttributeResult) {
                    
                } else {
                  return
                }
              } else {
                return
              }
              return true
            }).value()
            
          
            if (!productsMarks.length) {
              return
            }
          } else {
            return
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
        const filterResult = filterDataByRequestQuery(type, key, req.query[key])
        if (!filterResult) {
          return false
        }
      }
      return true
    }).value()
    
    res.json(types);
  } else if (req.method === 'GET' && req.url.includes('/categories')) {
    const db = router.db; 
    let categories = db.get('categories').filter(category => {
      for (let key of Object.keys(req.query)) {
        const filterResult = filterDataByRequestQuery(category, key, req.query[key])
        if (!filterResult) {
          return false
        }
      }
      return true
    }).value();
    
    res.json(categories);
  } else if (req.method === 'GET' && req.url.includes('/producers')) {
    const db = router.db; 
    let producers = db.get('producers').filter(producer => {
      for (let key of Object.keys(req.query)) {
        const filterResult = filterDataByRequestQuery(producer, key, req.query[key])
        if (!filterResult) {
          return false
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
        const filterResult = filterDataByRequestQuery(attributesCategory, key, req.query[key])
        if (!filterResult) {
          return false
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
        const filterResult = filterDataByRequestQuery(attribute, key, req.query[key])
        
        if (!filterResult) {
          return false
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
        const filterResult = filterDataByRequestQuery(review, key, req.query[key])
        if (!filterResult) {
          return false
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