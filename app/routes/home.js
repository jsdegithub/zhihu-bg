const Router = require("koa-router");
const router = new Router();
const { index, delAllUser, delAllTopic, upload } = require("../controllers/home");

router.get("/", index);
router.delete("/delAllUser", delAllUser);
router.delete("/delAllTopic", delAllTopic);
router.post("/upload", upload);

module.exports = router;
