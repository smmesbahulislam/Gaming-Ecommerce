import express from "express"
import { 
    createProductController, 
    getAllProductController, 
    getSingleProductController, 
    getProductPhotoController, 
    deleteProductController, 
    updateProductController, 
    getFilteredProducts,
    productPerPage,
    productCountController 
} from "../controllers/productController.js";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js"
import formidable from 'express-formidable'

const router = express.Router();

//create product || POST
router.post('/create-product',requireSignIn, isAdmin,formidable(), createProductController)

//update product || PUT
router.put('/update-product/:pid',requireSignIn, isAdmin,formidable(), updateProductController)

//get all product || GET
router.get('/get-allProduct',getAllProductController)

//get single product || GET
router.get('/get-singleProduct/:slug',getSingleProductController)

//get product photo || GET
router.get('/get-productPhoto/:pid',getProductPhotoController)

//delete product || DELETE
router.delete('/delete-product/:pid',deleteProductController)

//filter product || POST
router.post('/get-filteredProducts',getFilteredProducts)

//product count || GET
router.get('/product-count', productCountController)

//product per page || GET
router.get('/product-list/:page', productPerPage)

export default router;