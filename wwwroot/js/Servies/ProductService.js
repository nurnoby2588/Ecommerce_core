var ProductService = {
    ListProduct: (callback) => {
        $.get("https://dummyjson.com/products", function (data, status) {
            callback(data.products)
        }) 
      
    },
    singleProduct: (productId, callback) => {
        console.log("productId", productId)
        $.get("https://dummyjson.com/product/" + productId, function (data, status) {
            console.log("data", data)
            callback(data)
        }) 
      
    }
}