var lstCartProducts = [];

var ProductController = {
    lstProduct: () => {
        ProductService.ListProduct(function (responce) {

                var productContent = '';
               
            $.each(responce, function (index, value) {

                        productContent = productContent + `
                
             <div class="col" >
             <div class="card h-80">
             <img onclick="window.location.href = ('/product/singleProduct/${ value.id }')" style="cursor:pointer"  id="pdPic_${value.id}" src="${value.thumbnail}" class="card-img-top" alt="...">
             <div class="card-body">
                <h5 onclick="window.location.href = ('/product/singleProduct/${ value.id }')" style="cursor:pointer"  class="card-title">Name : <span id="pdName_${value.id}">${value.title}</span></h5>
                <h5  class=" card-title">Price : <s>${value.price}</s> <span id="pdPrice_${value.id}">${value.price}</span> </h5>
                <h5  class="card-title">Quantity : <span id="pdQty_${value.id}">${value.stock}</span></h5>
                <button type="button" id="btnAddToCard_${value.id}" class="btn btn-primary" onclick="ProductController.addToCart(this)">ADD TO CART</button>
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

        var targetID = $(cntrl).attr("id").split("_")[1];
        var image = $('#pdPic_' + targetID).attr('src');
        var name = $('#pdName_' + targetID).html();
        var price = $('#pdPrice_' + targetID).html();
        var qty = $('#pdQty_' + targetID).html();

        
        

        var targetProduct = {
            id: targetID,
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
        console.log("click", targetIndex)
        
        $.each(lstCartProducts, function (index, value) {
            if (targetIndex != value.id) {
                lstCartProductsNew.push(value);
            }
        })

           lstCartProducts = lstCartProductsNew;
           //ProductController.UploadCartProduct()
           localStorage.setItem("LstCartProducts", JSON.stringify(lstCartProducts))
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
                <div id="dvCartWrapper_${value.id}" style="border:1px solid #f5da95" class="mt-1">

                <div class="row p-2"  style="cursor:pointer" >
                   <div class="col col-sm-3">
                   <img onclick="window.location.href = ('/product/singleProduct/${ value.id }')"  style="width:50px" src="${value.image}" />
                 </div>

                  <div class="col col-sm-4"  style="cursor:pointer">
                    <span onclick="window.location.href = ('/product/singleProduct/${ value.id }')">${value.name}</span>
                    </div>
                   <div class="col col-sm-3"  style="cursor:pointer">
                      <span>${value.price}</span>
                    </div>
                    <div onclick="ProductController.deleteCartProduct(${value.id})" class="col col-sm-2">
                      <span style="cursor:pointer ;">X</span>
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
                //$("#dvCheckout").html('')
                $("#checkoutBox").html('')
            }
          
            $.each(lstCartProducts, function (index, value) {
                $("#checkoutBox").append(`
                <div id="dvCheckOutCartWrapper_${value.id}" style="border:1px solid #f5da95" class="mt-1">

                <div class="row p-2"  onclick="window.location.href = ('/product/singleProduct/${ value.id }')" style="cursor:pointer">
                   <div class="col col-sm-3">
                   <img style="width:50px" src="${value.image}" />
                 </div>

                  <div class="col col-sm-4" onclick="window.location.href = ('/product/singleProduct/${ value.id }')" style="cursor:pointer">
                    <span>${value.name}</span>
                    </div>
                   <div class="col col-sm-3" onclick="window.location.href = ('/product/singleProduct/${ value.id }')" style="cursor:pointer">
                      <span>${value.price}</span>
                    </div>
                    <div class="col col-sm-2">
                      <span style="cursor:pointer" onclick="ProductController.deleteCartProduct(${value.id})">X</span>
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
            ProductController.checkOutBtn();
            


        }
    },
    UploadCartProduct: () => {
        if (lstCartProducts.length > 0) {
            localStorage.setItem("LstCartProducts", JSON.stringify(lstCartProducts))
        }
    },
    SingleProduct: (targetProductId) => {
        console.log(targetProductId)
        var sampleImage =''
        ProductService.singleProduct(targetProductId, function (responce) {
           var colCount=''
            if (12 / parseInt(responce.images.length) >= 3) {
                colCount = 2.5;
            }
            else {
                colCount=3
            }
            console.log(colCount);
            $.each(responce.images, function (index, value) {
              

                sampleImage = sampleImage + `
                <div class="col col-${colCount}">
                 <img style="width:80%" src="${value}" />
              </div>
                `})

            $("#dvSignleProductView").append(`
            <div class="col col-5 " style="">
           <div >
                <img id="pdPic_${responce.id}" style="width:100%" src="${responce.thumbnail}" />
                </div>
            <div class="row gap-1" >
            ${
                sampleImage
              }
              </div>
      
            </div>
            
              <div class="col col-7" style="display:flex;flex-direction:column;justify-content:center;padding-left:2%">
             <p> <b> Title:</b>  <span id="pdName_${responce.id}">${responce.title}</span></p>
             <p> <b>Category:</b> ${responce.category}</p>
             <p> <b>Brand:</b> ${responce.brand}</p>
             <p> <b>Price:</b> <span id="pdPrice_${responce.id}">${responce.price}</span> ${responce.price}</p>
             <p> <b>Stock:</b> ${responce.stock}</p>
             <p> <b>Weight:</b>${responce.weight}</p>
             <p> <b>Warranty:</b> ${responce.warrantyInformation}</p>
             <p> <b>Description:</b> ${responce.description}</p>
                <div>
                <button id="btnAddToCard_${responce.id}" onclick="ProductController.addToCart(this)" class="btn btn-primary">Add to cart</button>
              </div>
       
                </div>

            `)
            
            console.log(responce)
        })
    }

}