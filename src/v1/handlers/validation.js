const { validationResult } = require("express-validator");

exports.vaildate = (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next(); //完成後會運算落去,無咗就停止
};