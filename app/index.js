const Koa = require("koa");
const koaBody = require("koa-body");
const koaStatic = require("koa-static");
const router = require("./routes/index.js");
const error = require("koa-json-error");
const parameter = require("koa-parameter");
const mongoose = require("mongoose");
const { connectionStr } = require("./config");
const path = require("path");

mongoose.connect(connectionStr, { useNewUrlParser: true }, (_) => {
    console.log("mongodb连接成功");
});
mongoose.connection.on("error", console.error);

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
app.use(koaStatic(path.join(__dirname, "public")));
app.use(
    error({
        postFormat: (e, { stack, ...rest }) =>
            process.env.NODE_ENV === "production" ? rest : { stack, ...rest },
    })
);
app.use(
    koaBody({
        multipart: true,
        formidable: {
            uploadDir: path.join(__dirname, "/public/upload"),
            keepExtensions: true,
        },
    })
);
app.use(parameter(app));
router(app);

app.listen(3000, () => {
    console.log("请访问127.0.0.1:3000");
});
