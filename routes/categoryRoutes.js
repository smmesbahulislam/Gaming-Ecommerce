import express from 'express'
import { isAdmin, requireSignIn } from '../middlewares/authMiddleware.js';
import { createCategoryController, updateCategoryController, getAllCategoryController, getSingleCategoryController, deleteCategoryController } from '../controllers/categoryController.js';
const router = express.Router()

//create category || POST
router.post('/create-category', requireSignIn, isAdmin, createCategoryController);

//update category || PUT
router.put('/update-category/:id', requireSignIn, isAdmin, updateCategoryController);

// get all category || GET
router.get('/get-category', getAllCategoryController)

//get single category || GET
router.get('/single-category/:slug', getSingleCategoryController)

router.delete('/delete-category/:id',requireSignIn, isAdmin, deleteCategoryController)

export default router