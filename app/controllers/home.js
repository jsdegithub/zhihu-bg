const User = require("../models/users");
const path = require("path");

class HomeController {
    index(ctx) {
        ctx.body = "<h1>这是主页</h1>";
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
