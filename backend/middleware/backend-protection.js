//AUTHENTICATION
import jwt from "jsonwebtoken"

const authentication = (req, res, next) => {
    const getToken = req.header.authorization

    if (!getToken || !getToken.startsWith("Bearer ")) {
        return res.json({
            message: "Token invalid",
        })
    }
    else {
        const token = getToken.split(" ")[1]
        const verification = jwt.verify(token, process.env.JWT_SECRET)
        req.user = verification
        next()
    }
}
export default authentication

//AUTHORIZATION 
const authorization=(req,res,next)=>{
    if(!req.user.role != )
}