import Blog from "../models/BlogSchema.js";
import express from "express";
import getAuth from "../middleware/auth.js";

const BlogRouter = express.Router()
BlogRouter.use(express.json())

const response = (res, status, result) => {
    res.status(status).json(result);
}

BlogRouter.get("/", getAuth, async (req, res) => {
    await Blog.find().populate("user", "-password").sort("-createdOn")
        .then(result => {
            response(res, 200, result)
        })
        .catch(err => {
            response(res, 400, { error: err })
        })
})

BlogRouter.post("/create", getAuth, async (req, res) => {
    try {
        const { title, content, image } = req.body;
        if (title && content) {
            const blog = new Blog({
                title, content, image, user: req.userId
            });
            await blog.save()
            // console.log(title, image, content, req.auth);
            response(res, 200, { msg: "Blog created!", blog: blog });
        }
    } catch (error) {
        response(res, 400, { error: error });
    }
});

BlogRouter.delete("/delete/:id", getAuth, async (req, res) => {
    try {
        const blog = await Blog.findOneAndDelete({ user: req.userId, _id: req.params.id });
        if (!blog) {
            response(res, 400, { error: "Blog not found" });
        }
        response(res, 200, { msg: "Blog Deleted Successfully" })
    } catch (error) {
        response(res, 400, { error: error });
    }
});

BlogRouter.put("/update/:id", getAuth, async (req, res) => {
    const { title, content, image } = req.body;
    await Blog.findOneAndUpdate({ user: req.userId, _id: req.params.id }, {
        title, content, image
    })
        .then((result) => response(res, 200, { msg: "Blog Updated", blog: result }))
        .catch(err => response(res, 400, err))
});

BlogRouter.get("/:id", getAuth, async (req, res) => {
    await Blog.findById(req.params.id).populate("user", "-password")
    .then(result => response(res, 200, result))
    .catch(err => response(res, 400, {error: err}))
})

export default BlogRouter;