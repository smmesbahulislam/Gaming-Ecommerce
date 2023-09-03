import slugify from "slugify";
import productModel from "../models/productModel.js"
import fs from 'fs'

export const createProductController = async (req, res) => {
    try {
        const { name, description, price, category, quantity, shipping } = req.fields;
        const { photo } = req.files;

        //validation
        switch (true) {
            case !name:
                return res.status(500).send({ error: "Name is required" });
            case !description:
                return res.status(500).send({ error: "Description is required" });
            case !price:
                return res.status(500).send({ error: "Price is required" });
            case !category:
                return res.status(500).send({ error: "Category is required" });
            case !quantity:
                return res.status(500).send({ error: "Quantity is required" });
            case photo && photo.size > 1000000:
                return res
                    .status(500)
                    .send({ error: "Photo should be less then 1Mb" });
        }

        const products = new productModel({ ...req.fields, slug: slugify(name) });
        if (photo) {
            products.photo.data = fs.readFileSync(photo.path);
            products.photo.contentType = photo.type;
        }

        await products.save();
        res.status(201).send({
            success: true,
            message: "Product Created Successfully",
            products,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: "Error in creating product",
        });

    }
};

export const getAllProductController = async (req, res) => {
    try {
        const products = await productModel.find({}).populate("category").select("-photo").limit(12).sort({ createAt: -1 });
        res.status(200).send({
            success: true,
            countTotal: products.length,
            message: 'All Products',
            products,
        });

    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Error in getting products",
            error: error.message,
        });

    }
}

export const getSingleProductController = async (req, res) => {
    try {
        const product = await productModel.findOne({ slug: req.params.slug }).select("-photo").populate('category');
        res.status(200).send({
            success: true,
            message: "Single Product Fetched",
            product,
        });
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Error while getting single product",
            error,
        });
    }
}

export const getProductPhotoController = async (req, res) => {
    try {
        const product = await productModel.findById(req.params.pid).select("photo");
        if (product.photo.data) {
            res.set("Content-type", product.photo.contentType);
            return res.status(200).send(product.photo.data);
        }

    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Error while getting photo",
            error,
        });
    }
}

export const deleteProductController = async (req, res) => {
    try {
        await productModel.findByIdAndDelete(req.params.pid).select("-photo");
        res.status(200).send({
            success: true,
            message: "Product Deleted successfully",
        });
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Error while deleting product",
            error,
        });
    }
};

export const updateProductController = async (req, res) => {
    try {
        const { name, description, price, category, quantity, shipping } = req.fields;
        const { photo } = req.files;
        //validation
        switch (true) {
            case !name:
                return res.status(500).send({ error: "Name is required" });
            case !description:
                return res.status(500).send({ error: "Description is required" });
            case !price:
                return res.status(500).send({ error: "Price is required" });
            case !category:
                return res.status(500).send({ error: "Category is required" });
            case !quantity:
                return res.status(500).send({ error: "Quantity is required" });
            case photo && photo.size > 1000000:
                return res
                    .status(500)
                    .send({ error: "Photo should be less then 1Mb" });
        }
        const products = await productModel.findByIdAndUpdate(
            req.params.pid,
            { ...req.fields, slug: slugify(name) },
            { new: true }
        );
        if (photo) {
            products.photo.data = fs.readFileSync(photo.path);
            products.photo.contentType = photo.type;
        }
        await products.save();
        res.status(201).send({
            success: true,
            message: "Product Updated Successfully",
            products,
        });

    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            error,
            message: "Error in Update Product"
        })

    }
}

export const getFilteredProducts = async (req, res) => {
    try {
        const { categoryId, priceRange, page } = req.body;
        const perPage = 6;
        
        // Define the query object based on the provided criteria
        const query = {};

        // Add the category filter if categoryId is not empty
        if (categoryId.length > 0) {
            query.category = { $in: categoryId }; // Filter by category ID
        }

        query.price = { $gte: priceRange[0], $lte: priceRange[1] }; // Filter by price range

        // Execute a count query to get the total count of filtered products
        const totalFilteredProducts = await productModel.countDocuments(query);

        // Use the totalFilteredProducts count to calculate pageCount
        const pageCount = Math.ceil(totalFilteredProducts / perPage);

        const filteredProducts = await productModel
            .find(query)
            .select("-photo")
            .skip((page - 1) * perPage)
            .limit(perPage)
            .sort({ createdAt: -1 });;


        res.status(200).send({
            success: true,
            message: "Products filtered successfully.",
            filteredProducts,
            pageCount
        });

    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Error while filtering products",
            error
        })

    }
}

export const productCountController = async (req, res) => {
    try {
        const total = await productModel.find({}).estimatedDocumentCount();
        res.status(200).send({
            success: true,
            message: "Calculated Total count successfully.",
            total
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'Error while counting the product',
        })
    }
}

export const productPerPage = async (req, res) => {
    try {
        const perPage = 6;
        const page = req.params.page ? req.params.page : 1;
        const products = await productModel
            .find({})
            .select("-photo")
            .skip((page - 1) * perPage)
            .limit(perPage)
            .sort({ createdAt: -1 });

        res.status(200).send({
            success: true,
            message: "Product fetched.",
            products
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error in per page controller'
        })

    }
}