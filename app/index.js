const Koa = require("koa");
const bodyparser = require("koa-bodyparser");
const routing = require("./routes/index.js");

const app = new Koa();

app.use(bodyparser()); //这句必须放在app.use(usersRouter.routes());之前
routing(app);

app.listen(3000, () => {
    console.log("请访问127.0.0.1:3000");
});
