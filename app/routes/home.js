const Router = require("koa-router");
const router = new Router();
const { index, delAllUser, upload } = require("../controllers/home");

router.get("/", index);
router.delete("/delAllUser", delAllUser);
router.post("/upload", upload);

module.exports = router;
