import express from 'express'
const router = express.Router()
import asyncHandler from 'express-async-handler'
import Product from '../models/productModel.js'

import {
    getProducts,
    getProductById,
} from '../controllers/productController.js'

router.route('/').get(getProducts)
router.route('/:id').get(getProductById)

// @desc    Fetch all products
// @route   GET/api/products
// @access  Public 
router.get(
    '/',
    asyncHandler(async (req, res) => {
        const products = await Product.find({})
        res.json(products)
    })
)

// @desc Fetch single product
// @route  GET/api/products/:id
// @access Public
router.get(
    '/:id',
    asyncHandler(async (req, res) => {
        const product = await Product.findById(req.params.id)

        if (product) {
            res.json(product)
        } else {
            res.status(404)
            throw new Error('Product not found')
        }
    })
)

export default router