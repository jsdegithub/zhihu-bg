const db = [{ name: "JinShuo" }];

class UsersCtl {
    searchAll(ctx) {
        ctx.body = db;
    }
    searchById(ctx) {
        ctx.body = db[ctx.params.id * 1];
    }
    create(ctx) {
        db.push(ctx.request.body);
        ctx.body = ctx.request.body;
    }
    update(ctx) {
        db[ctx.params.id * 1] = ctx.request.body;
        ctx.body = ctx.request.body;
    }
    del(ctx) {
        db.splice(ctx.params.id * 1, 1);
        ctx.status = 204;
    }
}

module.exports = new UsersCtl();
