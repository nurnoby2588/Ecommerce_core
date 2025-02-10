var lstCartProducts = [];

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
                <h5  class="card-title">Name : <span id="pdName_${index}">${value.name}</span></h5>
                <h5  class=" card-title">Price : <s>${value.price}</s> <span id="pdPrice_${index}">${value.price}</span> </h5>
                <h5  class="card-title">Quantity : <span id="pdQty_${index}">${value.quantity}</span></h5>
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
       
        //if (localStorage.getItem("cartProducts") != undefined && localStorage.getItem("cartProducts") != null )
        //{
        //    lstCartProducts = localStorage.getItem("cartProducts");
        //}
        //console.log("before set local stroge", lstCartProducts);

        var targetIndex = $(cntrl).attr("id").split("_")[1];
        var image = $('#pdPic_' + targetIndex).attr('src');
        var name = $('#pdName_' + targetIndex).html();
        var price = $('#pdPrice_' + targetIndex).html();
        var qty = $('#pdQty_' + targetIndex).html();

        
        

        var targetProduct = {
            image,
            name,
            price,
            qty

        }
     
        lstCartProducts.push(targetProduct);
        //localStorage.setItem("cartProducts", JSON.stringify(lstCartProductNew));
        alert("Product Added to cart")
        if (lstCartProducts.length > 0) {
           
        }
        ProductController.checkOutBtn()
        ProductController.arrangeAddCard();
        
    },
       deleteCartProduct: (targetIndex) => {
           var lstCartProductsNew = []

        $.each(lstCartProducts, function (index, value) {
            if (targetIndex != index) {
                lstCartProductsNew.push(value);
            }
        })

        console.log(lstCartProductsNew.length)
       
           lstCartProducts = lstCartProductsNew;
           ProductController.UploadCartProduct()
           //localStorage.setItem("LstCartProducts", JSON.stringify(lstCartProducts))
           ProductController.arrangeAddCard();

           if (lstCartProductsNew.length == 0) {
               
               $("#dvCheckout").html('')
           }
     }
    ,
    viewCart: () => {
       
        ProductController.emptyCartValidation()

        if ($("#dvViewCart").css('right') == "0" || $("#dvViewCart").css('right') == "0px") {
            $("#dvViewCart").animate({
                right: "-300",
           
            }, "fast")
        }
        else {
            $("#dvViewCart").animate({
                right: "0",
               
            }, "slow")
        }
     
       

    },
    arrangeAddCard: () => {

        $("#dbViewCartContent").html('')
        ProductController.emptyCartValidation();
        $('#productCartCount').html(lstCartProducts.length);
        console.log(lstCartProducts)
        if (lstCartProducts.length > 0) {
            // clear data
            $("#dbViewCartContent").html('')
            $("#checkoutBox").html('')

            $.each(lstCartProducts, function (index, value) {
                $("#dbViewCartContent").append(`
                <div id="dvCartWrapper_${index}" style="border:1px solid #f5da95" class="mt-1">

                <div class="row p-2"  >
                   <div class="col col-sm-3">
                   <img style="width:50px" src="${value.image}" />
                 </div>

                  <div class="col col-sm-4">
                    <span>${value.name}</span>
                    </div>
                   <div class="col col-sm-3">
                      <span>${value.price}</span>
                    </div>
                    <div class="col col-sm-2">
                      <span style="cursor:pointer" onclick="ProductController.deleteCartProduct(${index})">X</span>
                    </div>

                   </div>

                </div>

                 

                `)

            });

        }

        // Checkout details update
        // check checkout page a #checkoutBox ei id ase naki
        if ($('body').find('#checkoutBox').length > 0) {
            if (lstCartProducts.length == 0) {
                alert("Empty cart")
                window.location.href = ('/Product');
                $("#dvCheckout").html('')
            }
          
            $.each(lstCartProducts, function (index, value) {
                $("#checkoutBox").append(`
                <div id="dvCheckOutCartWrapper_${index}" style="border:1px solid #f5da95" class="mt-1">

                <div class="row p-2"  >
                   <div class="col col-sm-3">
                   <img style="width:50px" src="${value.image}" />
                 </div>

                  <div class="col col-sm-4">
                    <span>${value.name}</span>
                    </div>
                   <div class="col col-sm-3">
                      <span>${value.price}</span>
                    </div>
                    <div class="col col-sm-2">
                      <span style="cursor:pointer" onclick="ProductController.deleteCartProduct(${index})">X</span>
                    </div>

                   </div>

                </div> `)
            })
        }
        
        

    },

    emptyCartValidation: () => {
        if (lstCartProducts.length == 0 || lstCartProducts == "") {
            $("#dbViewCartContent").append(`
              <p style="position: absolute;left:30%;  bottom: 50%; margin: auto">
                No item added
            </p>
            `)
        }
    },
    checkOutBtn: () => {
   
        $("#dvCheckout").append(`  <button style="width:100% ;height:40px; position:absolute; bottom:0px" class="btn btn-success" onclick="ProductController.prepareCartForCheckoutUI('/Product/Checkout')">Checkout</button>`)
        
      
    },
    prepareCartForCheckoutUI: (url) => {
        ProductController.UploadCartProduct()
        //localStorage.setItem("LstCartProducts", JSON.stringify(lstCartProducts))
        window.location.href = url;
    },
    LoadCartProductCommon: () => {
        //ProductController.arrangeAddCard();
        if (localStorage.getItem("LstCartProducts") != null && localStorage.getItem("LstCartProducts") != undefined) {
            lstCartProducts = JSON.parse(localStorage.getItem("LstCartProducts"));

            ProductController.arrangeAddCard();


        }
    },
    UploadCartProduct: () => {
        if (lstCartProducts.length > 0) {
            localStorage.setItem("LstCartProducts", JSON.stringify(lstCartProducts))
        }
    }

}