const User = require("../models/users");

class HomeController {
    index(ctx) {
        ctx.body = "<h1>这是主页</h1>";
    }
    async delAllUser(ctx) {
        await User.remove();
        ctx.status = 204;
    }
    upload(ctx) {
        const file = ctx.request.files.file;
        ctx.body = {
            path: file.path,
        };
    }
}

module.exports = new HomeController();
