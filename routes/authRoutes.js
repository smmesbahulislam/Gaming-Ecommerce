import express from "express"
import {registerController, loginController, testController, forgotPasswordController} from "../controllers/authController.js"
import { requireSignIn,isAdmin } from "../middlewares/authMiddleware.js";

//router object
const router = express.Router();

//routing
//Register || Method post
router.post('/register',registerController)

//Login || POST
router.post("/login",loginController)

//Forgot password || POST
router.post('/forgot-password',forgotPasswordController)

//test routes
router.get('/test',requireSignIn ,isAdmin, testController)

//protected user route
router.get('/user-auth',requireSignIn,(req, res) => {
    res.status(200).send({ok: true});
})

//protected admin route
router.get('/admin-auth',requireSignIn,isAdmin, (req, res) => {
    res.status(200).send({ok: true});
})

export default router