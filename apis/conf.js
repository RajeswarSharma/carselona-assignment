const routes = require("./routes/index");
const router = require("express").Router();
const configureApis = (app) => {
    for (const route of routes) {
        console.log("loading api:",route.parent)
        router.use(route.parent, route.router);
    }
    app.use("/api", router);
};

module.exports = configureApis;