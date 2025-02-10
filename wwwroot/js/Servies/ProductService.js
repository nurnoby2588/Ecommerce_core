var ProductService = {
    ListProduct: (callback) => {
        $.get("https://dummyjson.com/products", function (data, status) {
            callback(data.products)
        }) 
      
    }
}