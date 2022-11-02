const router = require("express").Router();

const memoController = require("../controllers/memo");
const tokenHandler = require("../handlers/tokenHandler");

//Memo創做
router.post("/", tokenHandler.verifyToken, memoController.create);

//取得登入後User的全Memo
router.get("/", tokenHandler.verifyToken, memoController.getAll);

//取得特定的1個Memo
router.get("/:memoId", tokenHandler.verifyToken, memoController.getOne);

//更新Memo內容
router.put("/:memoId", tokenHandler.verifyToken, memoController.update);

//刪除Memo內容
router.delete("/:memoId", tokenHandler.verifyToken, memoController.delete);

module.exports = router;