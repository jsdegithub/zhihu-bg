const jwt = require("koa-jwt");
const Router = require("koa-router");
const router = new Router({ prefix: "/questions" });
const {
    searchAll,
    searchById,
    create,
    update,
    checkQuestionExist,
    deleteQuestion,
    checkQuestioner,
} = require("../controllers/questions");

const { secret } = require("../config");
const auth = jwt({ secret });

router.get("/", searchAll);
router.post("/", auth, create);
router.get("/:id", checkQuestionExist, searchById);
router.patch("/:id", auth, checkQuestionExist, checkQuestioner, update);
router.delete("/:id", auth, checkQuestionExist, checkQuestioner, deleteQuestion);

module.exports = router;
