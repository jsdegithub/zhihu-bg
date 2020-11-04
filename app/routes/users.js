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
} = require("../controllers/users");
const { checkTopicExist } = require("../controllers/topics");

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

module.exports = router;
