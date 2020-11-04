const Topic = require("../models/topics");

class TopicController {
    async searchAll(ctx) {
        const page = Math.max((ctx.query.page || 1) * 1, 1);
        const { page_size = 5 } = ctx.query;
        const pageSize = Math.max(page_size * 1, 1);
        ctx.body = await Topic.find()
            .limit(pageSize)
            .skip((page - 1) * pageSize);
    }
    async searchById(ctx) {
        const { fields } = ctx.query;
        const selectFields = fields
            ? fields
                  .split(";")
                  .map((item) => {
                      return " +" + item;
                  })
                  .join("")
            : "";
        const topic = await Topic.findById(ctx.params.id).select(selectFields);
        if (!topic) {
            ctx.throw(404, "话题不存在");
        }
        ctx.body = topic;
    }
    async create(ctx) {
        ctx.verifyParams({
            name: { type: "string", required: true },
            avatar_url: { type: "string", required: false },
            introduction: { type: "string", required: false },
        });
        const { name } = ctx.request.body;
        const repeatedTopic = await Topic.findOne({ name });
        if (repeatedTopic) {
            ctx.throw(409, "话题已存在");
        }
        const topic = await new Topic(ctx.request.body).save();
        ctx.body = topic;
    }
    async update(ctx) {
        ctx.verifyParams({
            name: { type: "string", required: false },
            avatar_url: { type: "string", required: false },
            introduction: { type: "string", required: false },
        });
        const topic = await Topic.findByIdAndUpdate(ctx.params.id, ctx.request.body);
        if (!topic) {
            ctx.throw(404, "话题不存在");
        }
        ctx.body = topic;
    }
}

module.exports = new TopicController();
