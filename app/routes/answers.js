const jwt = require("koa-jwt");
const Router = require("koa-router");
const router = new Router({ prefix: "/questions/:questionId/answers" });
const {
    searchAll,
    searchById,
    create,
    update,
    checkAnswerExist,
    deleteAnswer,
    checkAnswerer,
} = require("../controllers/answers");

const { secret } = require("../config");
const auth = jwt({ secret });

router.get("/", searchAll);
router.post("/", auth, create);
router.get("/:id", checkAnswerExist, searchById);
router.patch("/:id", auth, checkAnswerExist, checkAnswerer, update);
router.delete("/:id", auth, checkAnswerExist, checkAnswerer, deleteAnswer);

module.exports = router;
