const Router = require("koa-router");
const router = new Router();
const { index, delAllUser } = require("../controllers/home");

router.get("/", index);
router.delete("/delAllUser", delAllUser);

module.exports = router;
