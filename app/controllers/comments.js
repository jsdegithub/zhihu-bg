const Comment = require("../models/comments");

class CommentController {
    async searchAll(ctx) {
        const page = Math.max((ctx.query.page || 1) * 1, 1);
        const { page_size = 5 } = ctx.query;
        const pageSize = Math.max(page_size * 1, 1);
        const q = new RegExp(ctx.query.q);
        ctx.body = await Comment.find({
            content: q,
            questionId: ctx.params.questionId,
            answerId: ctx.params.answerId,
            rootCommentId: ctx.query.rootCommentId,
        })
            .limit(pageSize)
            .skip((page - 1) * pageSize)
            .populate("commentator replyTo");
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
        const comment = await Comment.findById(ctx.params.id)
            .select(selectFields)
            .populate("commentator");
        if (!comment) {
            ctx.throw(404, "评论不存在");
        }
        ctx.body = comment;
    }
    async create(ctx) {
        ctx.verifyParams({
            content: { type: "string", required: true },
            rootCommentId: { type: "string", required: false },
            replyTo: { type: "string", required: false },
        });
        const { content } = ctx.request.body;
        const repeatedComment = await Comment.findOne({ content });
        if (repeatedComment) {
            ctx.throw(409, "评论已存在");
        }
        const comment = await new Comment({
            ...ctx.request.body,
            commentator: ctx.state.user._id,
            questionId: ctx.params.questionId,
            answerId: ctx.params.answerId,
        }).save();
        ctx.body = comment;
    }
    async update(ctx) {
        ctx.verifyParams({
            content: { type: "string", required: false },
        });
        const { content } = ctx.request.body;
        const comment = await ctx.state.comment.update({ content });
        if (!comment) {
            ctx.throw(404, "评论不存在");
        }
        ctx.body = ctx.state.comment;
    }
    async checkCommentExist(ctx, next) {
        const comment = await Comment.findById(ctx.params.id).select("+commentator +questionId");
        if (!comment) {
            ctx.throw(404, "评论不存在");
        }
        if (ctx.params.questionId && ctx.params.questionId !== comment.questionId) {
            ctx.throw(404, "该问题下没有此评论");
        }
        if (ctx.params.answerId && ctx.params.answerId !== comment.answerId) {
            ctx.throw(404, "该回答下没有此评论");
        }
        ctx.state.comment = comment;
        await next();
    }
    async deleteComment(ctx) {
        await Comment.findByIdAndRemove(ctx.params.id);
        ctx.status = 204;
    }
    async checkCommentator(ctx, next) {
        const { comment } = ctx.state;
        if (comment.commentator.toString() !== ctx.state.user._id) {
            ctx.throw(403, "没有操作权限");
        }
        await next();
    }
}

module.exports = new CommentController();
