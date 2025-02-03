var ProductController = {
    lstProduct: () => {
        ProductService.ListProduct(function (responce) {

                var productContent = '';
               
            $.each(responce, function (index, value) {

                        productContent = productContent + `
                
             <div class="col">
             <div class="card h-80">
             <img src="${value.picture}" class="card-img-top" alt="...">
             <div class="card-body">
                <h5 class="card-title">Name : ${value.name}</h5>
                <h5 class=" card-title">Price : <s>${value.price}</s> ${value.price} </h5>
                <h5 class="card-title">Quantity : ${value.quantity}</h5>
                <button type="button" class="btn btn-primary">ADD TO CART</button>
                    </div>
                     </div>
                        </div>
             `;
                       
                    })
                    $('#dvProductList').html(productContent)
               
        })
    }
}