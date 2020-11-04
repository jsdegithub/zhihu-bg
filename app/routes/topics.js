const jwt = require("koa-jwt");
const Router = require("koa-router");
const router = new Router({ prefix: "/topics" });
const { searchAll, create, searchById, update } = require("../controllers/topics");

const { secret } = require("../config");
const auth = jwt({ secret });

router.get("/", searchAll);
router.post("/", auth, create);
router.get("/:id", searchById);
router.patch("/:id", auth, update);

module.exports = router;
