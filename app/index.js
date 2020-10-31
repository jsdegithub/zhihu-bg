const Koa = require("koa");
const bodyparser = require("koa-bodyparser");
const router = require("./routes/index.js");
const error = require("koa-json-error");
const parameter = require("koa-parameter");

const app = new Koa();

app.use(async (ctx, next) => {
    try {
        await next();
    } catch (err) {
        ctx.status = err.status;
        ctx.body = {
            message: err.message,
        };
    }
});
app.use(
    error({
        postFormat: (e, { stack, ...rest }) =>
            process.env.NODE_ENV === "production" ? rest : { stack, ...rest },
    })
);
app.use(bodyparser()); //这句必须放在app.use(usersRouter.routes());之前
app.use(parameter(app));
router(app);

app.listen(3000, () => {
    console.log("请访问127.0.0.1:3000");
});
