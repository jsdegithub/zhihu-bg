const Question = require("../models/questions");
const User = require("../models/users");

class QuestionController {
    async searchAll(ctx) {
        const page = Math.max((ctx.query.page || 1) * 1, 1);
        const { page_size = 5 } = ctx.query;
        const pageSize = Math.max(page_size * 1, 1);
        const q = new RegExp(ctx.query.q);
        ctx.body = await Question.find({ $or: [{ title: q }, { description: q }] })
            .limit(pageSize)
            .skip((page - 1) * pageSize);
    }
    async searchById(ctx) {
        const { fields } = ctx.query;
        const selectFields = fields
            ? fields
                  .split(";")
                  .filter((item) => item)
                  .map((item) => {
                      return " +" + item;
                  })
                  .join("")
            : "";
        const question = await Question.findById(ctx.params.id)
            .select(selectFields)
            .populate("questioner topics");
        if (!question) {
            ctx.throw(404, "提问不存在");
        }
        ctx.body = question;
    }
    async create(ctx) {
        ctx.verifyParams({
            title: { type: "string", required: true },
            description: { type: "string", required: false },
        });
        const { title } = ctx.request.body;
        const repeatedQuestion = await Question.findOne({ title });
        if (repeatedQuestion) {
            ctx.throw(409, "提问已存在");
        }
        const question = await new Question({
            ...ctx.request.body,
            questioner: ctx.state.user._id,
        }).save();
        ctx.body = question;
    }
    async update(ctx) {
        ctx.verifyParams({
            title: { type: "string", required: false },
            description: { type: "string", required: false },
        });
        const question = await ctx.state.question.update(ctx.request.body);
        if (!question) {
            ctx.throw(404, "提问不存在");
        }
        ctx.body = ctx.state.question;
    }
    async checkQuestionExist(ctx, next) {
        const question = await Question.findById(ctx.params.id).select("+questioner");
        if (!question) {
            ctx.throw(404, "提问不存在");
        }
        ctx.state.question = question;
        await next();
    }
    async deleteQuestion(ctx) {
        await Question.findByIdAndRemove(ctx.params.id);
        ctx.status = 204;
    }
    async checkQuestioner(ctx, next) {
        const { question } = ctx.state;
        if (question.questioner.toString() !== ctx.state.user._id) {
            ctx.throw(403, "当前登录的用户没有该操作权限");
        }
        await next();
    }
}

module.exports = new QuestionController();
