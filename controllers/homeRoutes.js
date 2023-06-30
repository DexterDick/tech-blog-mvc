const router = require("express").Router();

const { User, Blog, Comments } = require("../models");

router.get("/", async (req, res) => {
    try {
        const blogData = await Blog.findAll({
            include: [
                {
                    model: User,
                    attributes: ["username"],
                },
            ],
        });

        if (!blogData) {
            res.status(404).json({ message: "No blog data found!" });
            return;
        }

        const blogs = blogData.map((blog) => blog.get({ plain: true }));

        res.status(200).json(blogs);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

router.get("/:id", async (req, res) => {
    try {
        const blogData = await Blog.findByPk(req.params.id, {
            include: [
                {
                    model: User,
                    attributes: ["username"],
                },
            ],
        });

        if (!blogData) {
            res.status(404).json({ message: "No blog data found with ID!" });
            return;
        }

        const blog = blogData.get({ plain: true });

        res.status(200).json(blog);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

module.exports = router;
