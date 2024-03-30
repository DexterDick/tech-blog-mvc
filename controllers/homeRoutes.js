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
        res.render("all-posts", { posts, logged_in: req.session.logged_in });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get("/login", async (req, res) => {
    if (req.session.logged_in) {
        res.redirect("/");
        return;
    }

    res.render("login");
});
router.get("/signup", async (req, res) => {
    if (req.session.logged_in) {
        res.redirect("/");
        return;
    }

    res.render("signup");
});

module.exports = router;
