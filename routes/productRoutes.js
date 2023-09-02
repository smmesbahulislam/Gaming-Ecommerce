import express from "express"
import { createProductController, getAllProductController, getSingleProductController, getProductPhotoController, deleteProductController, updateProductController, getFilteredProducts } from "../controllers/productController.js";
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

//filter product || GET
router.post('/get-filteredProducts',getFilteredProducts)


export default router;