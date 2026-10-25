
import User from "../models/User.js"
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// VENDOR REGISTRATION
const vendorRegister = async (req, res) => {
    const getName = req.body.name
    const getEmail = req.body.email
    const getPassword = req.body.password

    const userExists = await User.findOne({
        email: getEmail
    })

    if (userExists) {
        return res.status(400).json({
            message: "Email already registered!"
        })
    }

    const securePassword = await bcrypt.hash(getPassword, 10)

    await User.create({
        name: getName,
        password: securePassword,
        email: getEmail,
        role: "vendor"
    })

    res.status(201).json({
        message: "Vendor registered successfully!"
    })
}


// SELLER REGISTRATION
const sellerRegistration = async (req, res) => {
    const getName = req.body.name
    const getEmail = req.body.email
    const getPassword = req.body.password

    const checkSeller = await User.findOne({
        email: getEmail
    })

    if (checkSeller) {
        return res.status(400).json({
            message: "Email already registered!"
        })
    }

    const securePassword = await bcrypt.hash(getPassword, 10)

    await User.create({
        name: getName,
        password: securePassword,
        email: getEmail,
        role: "seller"
    })

    res.status(201).json({
        message: "Seller registered successfully!"
    })
}


// VENDOR LOGIN
const vendorLogin = async (req, res) => {
    const getEmail = req.body.email
    const getPassword = req.body.password

    const findUser = await User.findOne({
        email: getEmail,
        role: "vendor"
    })

    if (!findUser) {
        return res.status(401).json({
            message: "Invalid credentials!"
        })
    }

    const comparePassword = await bcrypt.compare(
        getPassword,
        findUser.password
    )

    if (!comparePassword) {
        return res.status(401).json({
            message: "Invalid credentials!"
        })
    }

    const token = jwt.sign(
        {
            role: "vendor",
            id: findUser._id
        },
        process.env.JWT_SECRET,
        {
            expiresIn: "7d"
        }
    )

    res.json({
        message: "Authenticated!",
        token,
        user: {
            id: findUser._id,
            name: findUser.name,
            email: findUser.email,
            role: findUser.role
        }
    })
}


// SELLER LOGIN
const sellerLogin = async (req, res) => {
    const getEmail = req.body.email
    const getPassword = req.body.password

    const findUser = await User.findOne({
        email: getEmail,
        role: "seller"
    })

    if (!findUser) {
        return res.status(401).json({
            message: "Invalid credentials!"
        })
    }

    const checkPassword = await bcrypt.compare(
        getPassword,
        findUser.password
    )

    if (!checkPassword) {
        return res.status(401).json({
            message: "Invalid credentials!"
        })
    }

    const token = jwt.sign(
        {
            role: "seller",
            id: findUser._id
        },
        process.env.JWT_SECRET,
        {
            expiresIn: "7d"
        }
    )

    res.json({
        message: "Authenticated!",
        token,
        user: {
            id: findUser._id,
            name: findUser.name,
            email: findUser.email,
            role: findUser.role
        }
    })
}


// ADMIN LOGIN
const adminLogin = async (req, res) => {
    const getEmail = req.body.email
    const getPassword = req.body.password

    const findUser = await User.findOne({
        email: getEmail,
        role: "admin"
    })

    if (!findUser) {
        return res.status(401).json({
            message: "Invalid credentials!"
        })
    }

    const checkPassword = await bcrypt.compare(
        getPassword,
        findUser.password
    )

    if (!checkPassword) {
        return res.status(401).json({
            message: "Invalid credentials!"
        })
    }

    const token = jwt.sign(
        {
            role: "admin",
            id: findUser._id
        },
        process.env.JWT_SECRET,
        {
            expiresIn: "7d"
        }
    )

    res.json({
        message: "Admin logged in!",
        token,
        user: {
            id: findUser._id,
            name: findUser.name,
            email: findUser.email,
            role: findUser.role
        }
    })
}

export {
    vendorRegister,
    sellerRegistration,
    vendorLogin,
    sellerLogin,
    adminLogin
}
