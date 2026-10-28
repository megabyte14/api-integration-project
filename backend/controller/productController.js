import mongoose from "mongoose";
import Product from "../models/Product.js";

export const getProducts = async (req, res) => {
    try {
        const filter = req.user.role === "admin"
            ? {}
            : { vendor: req.user.id };

        const products = await Product.find(filter)
            .populate("vendor", "name email")
            .sort({ _id: -1 });

        res.json(products);
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch products" });
    }
};

export const createProduct = async (req, res) => {
    try {
        const { name, price, image, description, stock } = req.body;

        if (!name?.trim() || price === undefined || price === "" ||
            !description?.trim()) {
            return res.status(400).json({
                message: "Name, price, and description are required"
            });
        }

        const parsedPrice = Number(price);
        const parsedStock = stock === undefined || stock === ""
            ? 0
            : Number(stock);

        if (!Number.isFinite(parsedPrice) || parsedPrice < 0 ||
            !Number.isInteger(parsedStock) || parsedStock < 0) {
            return res.status(400).json({
                message: "Price must be non-negative and stock must be a non-negative integer"
            });
        }

        const product = await Product.create({
            name: name.trim(),
            price: parsedPrice,
            image,
            description: description.trim(),
            stock: parsedStock,
            vendor: req.user.id
        });

        res.status(201).json({
            message: "Product created successfully",
            product
        });
    } catch (error) {
        res.status(500).json({ message: "Failed to create product" });
    }
};

export const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.isValidObjectId(id)) {
            return res.status(400).json({ message: "Invalid product ID" });
        }

        const product = await Product.findById(id);

        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        if (
            req.user.role !== "admin" &&
            product.vendor.toString() !== req.user.id
        ) {
            return res.status(403).json({ message: "Access denied!" });
        }

        const { name, price, image, description, stock } = req.body;

        if (name !== undefined) {
            if (typeof name !== "string" || !name.trim()) {
                return res.status(400).json({ message: "Name cannot be empty" });
            }
            product.name = name.trim();
        }

        if (description !== undefined) {
            if (typeof description !== "string" || !description.trim()) {
                return res.status(400).json({
                    message: "Description cannot be empty"
                });
            }
            product.description = description.trim();
        }

        if (price !== undefined) {
            if (price === "" || !Number.isFinite(Number(price)) ||
                Number(price) < 0) {
                return res.status(400).json({
                    message: "Price must be a non-negative number"
                });
            }
            product.price = Number(price);
        }

        if (stock !== undefined) {
            if (stock === "" || !Number.isInteger(Number(stock)) ||
                Number(stock) < 0) {
                return res.status(400).json({
                    message: "Stock must be a non-negative integer"
                });
            }
            product.stock = Number(stock);
        }

        if (image !== undefined) {
            product.image = image;
        }

        await product.save();

        res.json({
            message: "Product updated successfully",
            product
        });
    } catch (error) {
        res.status(500).json({ message: "Failed to update product" });
    }
};

export const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.isValidObjectId(id)) {
            return res.status(400).json({ message: "Invalid product ID" });
        }

        const product = await Product.findById(id);

        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        if (
            req.user.role !== "admin" &&
            product.vendor.toString() !== req.user.id
        ) {
            return res.status(403).json({ message: "Access denied!" });
        }

        await product.deleteOne();

        res.json({ message: "Product deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Failed to delete product" });
    }
};