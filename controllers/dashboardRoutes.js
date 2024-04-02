const router = require("express").Router();
const { Post, User, Comment } = require("../models");
const withAuth = require("../utils/auth");

router.get("/", withAuth, async (req, res) => {
    try {
        const postData = await Post.findAll({
            include: [{ model: User, attributes: { exclude: ["password"] } }],
        });
        const posts = postData.map((post) => post.get({ plain: true }));
        console.log(posts);
        res.render("dashboard", {
            layout: "dashboard",
            posts,
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get("/edit/:id", async (req, res) => {
    try {
        const postData = await Post.findByPk(req.params.id);
        if (postData) {
            const post = postData.get({ plain: true });

            res.render("edit-post", {
                layout: "dashboard",
                post,
            });
        } else {
            res.status(404).end();
        }
    } catch (err) {
        res.redirect("/login");
    }
});

router.get("/new", async (req, res) => {
    try {
        res.render("new-post", {
            layout: "dashboard",
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;
