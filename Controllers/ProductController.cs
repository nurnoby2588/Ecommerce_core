﻿using Microsoft.AspNetCore.Mvc;

namespace Ecommerce_core.Controllers
{
    public class ProductController : Controller
    {
        public IActionResult Index()
        {
           
            return View();
        }
        public IActionResult Checkout()
        {
            return View();
        }
        public IActionResult SingleProduct(string id)
        {
            ViewBag.ProductId=id;
            return View();
        }
        public IActionResult Category(string id)
        { string Name = ViewBag.CategoryName= id;
            return View();
        }

    }
}
