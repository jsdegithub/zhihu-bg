const User = require("../models/users");

class HomeController {
    index(ctx) {
        ctx.body = "<h1>这是主页</h1>";
    }
    async delAllUser(ctx) {
        await User.remove();
        ctx.status = 204;
    }
}

module.exports = new HomeController();
