const jwt = require("koa-jwt");
const Router = require("koa-router");
const router = new Router({ prefix: "/topics" });
const {
    searchAll,
    create,
    searchById,
    update,
    listTopicFollowers,
    checkTopicExist,
} = require("../controllers/topics");

const { secret } = require("../config");
const auth = jwt({ secret });

router.get("/", searchAll);
router.post("/", auth, create);
router.get("/:id", checkTopicExist, searchById);
router.patch("/:id", auth, checkTopicExist, update);
router.get("/:id/followers", checkTopicExist, listTopicFollowers);

module.exports = router;
