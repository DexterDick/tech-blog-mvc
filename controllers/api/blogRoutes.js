const router = require("express").Router();
const { Blog, User } = require("../../models");

router.post("/", async (req, res) => {
    try {
        const blogData = await Blog.create({
            ...req.body,
            user_id: req.session.user_id,
        });
        res.status(200).json(blogData);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

router.put("/edit/:blogid", async (req, res) => {
    try {
        const editBlog = await Blog.update(
            { title: req.body.title, contents: req.body.contents },
            {
                where: { id: req.params.blogid },
            }
        );

        if (!editBlog) {
            res.status(404).json({ message: "Could not update blog" });
            return;
        }

        res.status(200).json(editBlog);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

router.delete("/delete/:id", async (req, res) => {
    try {
        const deleteBlog = await Blog.destroy({
            where: { id: req.params.id, user_id: req.session.user_id },
        });

        if (!deleteBlog) {
            res.status(404).json({ message: "No blog id found with id" });
            return;
        }

        res.status(200).json(deleteBlog);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

module.exports = router;
