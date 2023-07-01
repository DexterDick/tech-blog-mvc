const express = require("express");
const path = require("path");
const expHbs = require("express-handlebars");
const hbs = expHbs.create({});
const session = require("express-session");
const SequelizeStore = require("connect-session-sequelize")(session.Store);
const routes = require("./controllers");
const app = express();

app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

const sequelize = require("./config/connection");

const PORT = process.env.PORT || 3001;

const sess = {
    secret: "Supper secret secret",
    cookie: {
        maxAge: 60 * 60 * 3000,
        httpOnly: true,
        secure: false,
        sameSite: "strict",
    },

    resave: false,
    saveUninitialized: true,

    store: new SequelizeStore({
        db: sequelize,
    }),
};

app.use(session(sess));
app.use(routes);

sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log("Now listening"));
});
