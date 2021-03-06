const jwt = require("koa-jwt");
const Router = require("koa-router");
const router = new Router({ prefix: "/users" });
const {
    searchAll,
    create,
    searchById,
    update,
    del,
    login,
    checkOwner,
    listFollowing,
    follow,
    unfollow,
    listFollower,
    checkUserExist,
    followTopic,
    unfollowTopic,
    listFollowingTopics,
    searchUserQuestion,
    likeAnswer,
    unLikeAnswer,
    listLikingAnswers,
    dislikeAnswer,
    undislikeAnswer,
    listDislikingAnswers,
    collectAnswer,
    uncollectAnswer,
    listCollectingAnswers,
} = require("../controllers/users");
const { checkTopicExist } = require("../controllers/topics");
const { checkAnswerExist } = require("../controllers/answers");

const { secret } = require("../config");
/* const auth = async (ctx, next) => {
    const { authorization = "" } = ctx.request.header;
    const token = authorization.replace("Bearer ", "");
    try {
        const user = jsonwebtoken.verify(token, secret);
        ctx.state.user = user;
    } catch (error) {
        ctx.throw(401, error.message);
    }
    await next();
}; */
const auth = jwt({ secret });

router.get("/", searchAll);
router.post("/", create);
router.get("/:id", searchById);
router.patch("/:id", auth, checkOwner, update);
router.delete("/:id", auth, checkOwner, del);
router.post("/login", login);
router.get("/:id/following", listFollowing);
router.get("/:id/followers", auth, listFollower);
router.put("/following/:id", auth, checkUserExist, follow);
router.delete("/following/:id", auth, checkUserExist, unfollow);
router.put("/followingTopics/:id", auth, checkTopicExist, followTopic);
router.delete("/followingTopics/:id", auth, checkTopicExist, unfollowTopic);
router.get("/:id/followingTopics", listFollowingTopics);
router.get("/:id/questions", searchUserQuestion);
router.get("/:id/likingAnswers", listLikingAnswers);
router.put("/likingAnswers/:id", auth, checkAnswerExist, likeAnswer, undislikeAnswer);
router.delete("/likingAnswers/:id", auth, checkAnswerExist, unLikeAnswer);
router.get("/:id/dislikingAnswers", listDislikingAnswers);
router.put("/dislikingAnswers/:id", auth, checkAnswerExist, dislikeAnswer, unLikeAnswer);
router.delete("/dislikingAnswers/:id", auth, checkAnswerExist, undislikeAnswer);
router.get("/:id/collectingAnswers", listCollectingAnswers);
router.put("/collectingAnswers/:id", auth, checkAnswerExist, collectAnswer);
router.delete("/collectingAnswers/:id", auth, checkAnswerExist, uncollectAnswer);

module.exports = router;
