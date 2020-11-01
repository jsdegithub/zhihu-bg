const Router = require("koa-router");
const router = new Router({ prefix: "/users" });
const { searchAll, create, searchById, update, del } = require("../controllers/users");

const db = [{ name: "JinShuo" }];

router.get("/", searchAll);
router.post("/", create);
router.get("/:id", searchById);
router.patch("/:id", update);
router.delete("/:id", del);

module.exports = router;
