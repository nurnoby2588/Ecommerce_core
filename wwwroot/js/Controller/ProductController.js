var ProductController = {
    lstProduct: () => {
        ProductService.ListProduct(function (responce) {

                var productContent = '';
               
            $.each(responce, function (index, value) {

                        productContent = productContent + `
                
             <div class="col">
             <div class="card h-80">
             <img id="pdPic_${index}" src="${value.picture}" class="card-img-top" alt="...">
             <div class="card-body">
                <h5 id="pdName_${index}" class="card-title">Name : ${value.name}</h5>
                <h5  class=" card-title">Price : <s>${value.price}</s> <span id="pdPrice_${index}">${value.price}</span> </h5>
                <h5 id="pdQty_${index}" class="card-title">Quantity : ${value.quantity}</h5>
                <button type="button" id="btnAddToCard_${index}" class="btn btn-primary" onclick="ProductController.addToCart(this)">ADD TO CART</button>
                    </div>
                     </div>
                        </div>
             `;
                       
                    })
                    $('#dvProductList').html(productContent)
               
        })
    },
    addToCart: (cntrl) => {
        var lstCartProducts = [];
        if (localStorage.getItem("cartProducts") != undefined && localStorage.getItem("cartProducts") != null )
        {
            lstCartProducts = localStorage.getItem("cartProducts");
        }
        console.log("before set local stroge", lstCartProducts);

        var targetIndex = $(cntrl).attr("id").split("_")[1];
        var image = $('#pdPic_' + targetIndex).attr('src');
        var name = $('#pdName_' + targetIndex).html();
        var price = $('#pdPrice_' + targetIndex).html();
        var qty = $('#pdQty_' + targetIndex).html();

        $('#productCart').html(parseInt($('#productCart').html()) + 1);

        var targetProduct = {
            image,
            name,
            price,
            qty

        }
        var lstCartProductNew = [];
        lstCartProductNew.push(targetProduct);
        localStorage.setItem("cartProducts", JSON.stringify(lstCartProductNew));

        console.log("After set local stroge", lstCartProductNew);
        alert("Product Added to cart")

        console.log(lstCartProductNew);
        //var index = $('#btnAddToCard_')

    }
}