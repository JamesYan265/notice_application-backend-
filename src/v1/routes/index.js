const router = require("express").Router();

//使用auth檔案時, 路徑要加/auth
router.use("/auth", require("./auth"));
router.use("/memo", require("./memo"));

module.exports = router;