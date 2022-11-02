const CryptoJS = require("crypto-js");
const JWT = require("jsonwebtoken");
const User = require("../models/user");

//Register API
exports.register = async (req,res) => {
    //get password 
    const password = req.body.password;

    try {
        //將密碼加密
        req.body.password = CryptoJS.AES.encrypt(password, process.env.SECRET_KEY);
        //Create new user
        const user = await User.create(req.body);
        //JWT 發出, Token保持24小時
        const token = JWT.sign({ id : user._id}, process.env.TOKEN_SECRET_KEY, {
            expiresIn:"24h",
        });
        return res.status(200).json({user, token});
    } catch {err}
        return res.status(500).json(err);
}

//Login API
exports.login = async (req, res) => {
    const {username, password} = req.body;
    
    try {
        //對照MongoDB檢查User是否存在
        const user = await User.findOne({username: username})
        if (!user) {
            return res.status(401).json({
                errors: [{
                    param: "username",
                    msg: "This username or password is invalid"
                }],
            })
        }
        //對照Mongodb檢查密碼是否正確
        //解密被加密的內容
        const descryptedPassword = CryptoJS.AES.decrypt(
            user.password,
            process.env.SECRET_KEY
        ).toString(CryptoJS.enc.Utf8);
        //.toString 是因為解密後不被當成字串,所以根據crypto plugin的document 解決

        if(descryptedPassword !== password) {
            return res.status(401).json({
                errors: [{
                    param: "password",
                    msg: "This username or password is invalid"
                }],
            })
        }
        
        //JWT 發出, Token保持24小時
        //將係mongodb取出的資料中的_id簽出已加密的Token
        const token = JWT.sign({ id : user._id}, process.env.TOKEN_SECRET_KEY, {
            expiresIn:"24h",
        });

        return res.status(201).json({user, token})
    } catch (err) {  
        return res.status(500).json(err);
    }
}
