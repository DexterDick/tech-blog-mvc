const router = require("express").Router();
const { Post, User, Comment } = require("../models");
const withAuth = require("../utils/auth");

router.get("/", withAuth, async (req, res) => {
    try {
        res.render("dashboard");
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;
