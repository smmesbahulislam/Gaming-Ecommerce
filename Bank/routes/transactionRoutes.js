import express from 'express'
import { makeTransactionController } from '../controllers/transactionController.js';

const router = express.Router();

// transaction account to account || POST
router.post('/make-transaction',makeTransactionController)


export default router