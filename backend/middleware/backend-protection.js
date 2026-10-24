//AUTHENTICATION
import jwt from "jsonwebtoken"

const authentication = (req, res, next) => {
    const getToken = req.headers.authorization

    if (!getToken || !getToken.startsWith("Bearer ")) {
        return res.status(401).json({
            message: "Token invalid",
        })
    }
   else {
    const token = getToken.split(" ")[1]

    try {
        const verification = jwt.verify(token, process.env.JWT_SECRET)
        req.user = verification
        next()
    } catch (error) {
        return res.status(401).json({
            message: "Invalid token"
        })
    }
}}
//AUTHORIZATION 
const authorization = (req, res, next) => {
    if (req.user.role !== "admin") {
        return res.status(403).json({
            message: "Access denied!"
        })
    }
    else {
        next()
    }

}
export { authentication, authorization }