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

        res.render("home", { blogs, logged_in: true });
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

router.get("/dashboard", async (req, res) => {
    console.log("test " + req.session.user_id);
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

        res.render("dashboard", { user, logged_in: true });
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

        res.render("blog", { ...blog, logged_in: true });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

module.exports = router;
