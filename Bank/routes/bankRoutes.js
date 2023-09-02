import express from "express"
import { createBankAccountController, updateBankAccountBalanceController, getBalanceOfAccountController } from "../controllers/accountController.js";

const router = express.Router();


//create bank account || POST
router.post('/create-account',createBankAccountController)

//deposite in bank account || PUT
router.put('/deposite-balance/:accountNo',updateBankAccountBalanceController)

//get balance || GET
router.get('/get-balance/:accountNo',getBalanceOfAccountController)




export default router;