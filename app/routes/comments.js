const jwt = require("koa-jwt");
const Router = require("koa-router");
const router = new Router({ prefix: "/questions/:questionId/answers/:answerId/comments" });
const {
    searchAll,
    searchById,
    create,
    update,
    checkCommentExist,
    deleteComment,
    checkCommentator,
} = require("../controllers/comments");

const { secret } = require("../config");
const auth = jwt({ secret });

router.get("/", searchAll);
router.post("/", auth, create);
router.get("/:id", checkCommentExist, searchById);
router.patch("/:id", auth, checkCommentExist, checkCommentator, update);
router.delete("/:id", auth, checkCommentExist, checkCommentator, deleteComment);

module.exports = router;
