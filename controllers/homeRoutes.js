const router = require("express").Router();
const { User, Post, Comment } = require("../models");

router.get("/", async (req, res) => {
    try {
        const postData = await Post.findAll({
            include: [
                { model: User, attributes: { exclude: ["password"] } },
                { model: Comment },
            ],
        });

        const posts = postData.map((post) => post.get({ plain: true }));
        console.log(posts);
        res.render("all-posts", { posts });
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;
