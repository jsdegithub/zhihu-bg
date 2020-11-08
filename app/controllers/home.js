const User = require("../models/users");
const path = require("path");
const homePage = require("../page/index");

class HomeController {
    index(ctx) {
        ctx.type = "text/html;charset=utf-8";
        ctx.body = homePage;
    }
    async delAllUser(ctx) {
        await User.remove();
        ctx.status = 204;
    }
    async delAllTopic(ctx) {
        await Topic.remove();
        ctx.status = 204;
    }
    upload(ctx) {
        const file = ctx.request.files.file;
        const basename = path.basename(file.path);
        ctx.body = {
            url: `${ctx.origin}/upload/${basename}`,
        };
    }
}

module.exports = new HomeController();
