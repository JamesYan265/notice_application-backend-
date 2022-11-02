const JWT = require("jsonwebtoken");
const User = require("../models/user")

//Client JWT verify check
const tokenDecode = (req) => {
    // Token 放置係 client 的 req header 中的 authorization : bearer [JWT TOKEN]
    const bearerHeader = req.headers["authorization"];
    if(bearerHeader) {
        //利用[排列]將bearer的字串和空位排除,只取出token資料
        // bearerHeader.split(" ")[0] 的值係 bearer
        const bearer = bearerHeader.split(" ")[1];
        try {
            //將被加密的JWT解密及認證
            const decodedToken = JWT.verify(bearer, process.env.TOKEN_SECRET_KEY);
            return decodedToken;
        } catch {
            return false;
        }
    } else {
        return false;
    }

}

//JWT認證的中介(Middleware)
exports.verifyToken = async (req, res, next) => {
    //向上面token 發出request
    const tokenDecoded = tokenDecode(req);
    //如果 tokenDecode 有 req
    if(tokenDecoded) {
        const user = await User.findById(tokenDecoded.id);
        if(!user) {
            return res.status(401).json("You are no premission !");
        } 
        req.user = user;
        next();
    } else {
        return res.status(401).json("You are no premission !");
    }
};