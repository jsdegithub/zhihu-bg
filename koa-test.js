const koa = require("koa");
const router = require("koa-router");

const app = new koa();

var f1 = function () {
    console.log(1);
    next();
};
var f2 = function () {
    setTimeout(function () {
        console.log(2);
    }, 1000);
    next();
};
var f3 = function () {
    console.log(3);
};

app.use(f1);
app.use(f2);
app.use(f3);
