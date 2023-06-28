const express = require("express");
const routes = require("./controllers");
const app = express();

app.use(routes);

const sequelize = require("./config/connection");

const PORT = process.env.PORT || 3001;

sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log("Now listening"));
});
