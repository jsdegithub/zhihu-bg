const answers = require("../models/answers");
const Answer = require("../models/answers");
const User = require("../models/users");

class AnswerController {
    async searchAll(ctx) {
        const page = Math.max((ctx.query.page || 1) * 1, 1);
        const { page_size = 5 } = ctx.query;
        const pageSize = Math.max(page_size * 1, 1);
        const q = new RegExp(ctx.query.q);
        ctx.body = await Answer.find({ content: q, questionId: ctx.params.questionId })
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
        const answer = await Answer.findById(ctx.params.id)
            .select(selectFields)
            .populate("answerer");
        if (!answer) {
            ctx.throw(404, "回答不存在");
        }
        ctx.body = answer;
    }
    async create(ctx) {
        ctx.verifyParams({
            content: { type: "string", required: true },
        });
        const { content } = ctx.request.body;
        const repeatedAnswer = await Answer.findOne({ content });
        if (repeatedAnswer) {
            ctx.throw(409, "回答已存在");
        }
        const answer = await new Answer({
            ...ctx.request.body,
            answerer: ctx.state.user._id,
            questionId: ctx.params.questionId,
        }).save();
        ctx.body = answer;
    }
    async update(ctx) {
        ctx.verifyParams({
            content: { type: "string", required: false },
        });
        const answer = await ctx.state.answer.update(ctx.request.body);
        if (!answer) {
            ctx.throw(404, "回答不存在");
        }
        ctx.body = ctx.state.answer;
    }
    async checkAnswerExist(ctx, next) {
        const answer = await Answer.findById(ctx.params.id).select("+answerer +questionId");
        if (!answer) {
            ctx.throw(404, "回答不存在");
        }
        if (answer.questionId !== ctx.params.questionId) {
            ctx.throw(404, "这个回答不属于此提问");
        }
        ctx.state.answer = answer;
        await next();
    }
    async deleteAnswer(ctx) {
        await Answer.findByIdAndRemove(ctx.params.id);
        ctx.status = 204;
    }
    async checkAnswerer(ctx, next) {
        const { answer } = ctx.state;
        if (answer.answerer.toString() !== ctx.state.user._id) {
            ctx.throw(403, "没有操作权限");
        }
        await next();
    }
}

module.exports = new AnswerController();
