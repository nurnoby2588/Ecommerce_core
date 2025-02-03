var ProductService = {
    ListProduct: (callback) => {
        $.get("http://localhost:55617/ProductApi/ListProduct", function (data, status) {
            callback(data)
        })
    }
}