const router = require("express").Router();
const { User, Blog, Comments } = require("../models");
const withAuth = require("../utils/Auth");

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

        res.render("home", { blogs, logged_in: req.session.logged_in });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

router.get("/login", async (req, res) => {
    if (req.session.logged_in) {
        res.redirect("/dashboard");
        return;
    }

    res.render("login");
});

router.get("/signup", async (req, res) => {
    if (req.session.logged_in) {
        res.redirect("/dashboard");
        return;
    }

    res.render("signup");
});

router.get("/dashboard", withAuth, async (req, res) => {
    try {
        const userData = await User.findByPk(req.session.user_id, {
            attributes: { exclude: ["password"] },
            include: [{ model: Blog }],
        });

        if (!userData) {
            res.status(404).json({ message: "No user found with this Id" });
            return;
        }

        const user = userData.get({ plain: true });
        console.log(user);

        res.render("dashboard", { ...user, logged_in: req.session.logged_in });
    } catch (err) {
        console.log(err);

        res.status(500).json(err);
    }
});

router.get("/newblog", async (req, res) => {
    res.render("newblog", { logged_in: req.session.logged_in });
});
router.get("/blog/edit/:id", async (req, res) => {
    try {
        const blogData = await Blog.findByPk(req.params.id, {
            attributes: ["id", "title", "contents"],
        });

        const blog = blogData.get({ plain: true });
        console.log(blog);

        res.render("editblog", { blog });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});
router.get("/blog/:id", async (req, res) => {
    try {
        const blogData = await Blog.findByPk(req.params.id, {
            include: [
                {
                    model: User,
                    attributes: ["username"],
                },
                {
                    model: Comments,
                    include: [User],
                },
            ],
        });

        if (!blogData) {
            res.status(404).json({ message: "No blog data found with ID!" });
            return;
        }

        const blog = blogData.get({ plain: true });
        console.log(blog);

        res.render("blog", { ...blog, logged_in: req.session.logged_in });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

router.get("/*", (req, res) => {
    res.redirect("/");
});

module.exports = router;
