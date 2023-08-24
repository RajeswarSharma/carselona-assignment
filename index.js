require("dotenv").config();
const express = require("express");
const app = express();
const { loadAndParseEnvVars, getEnvVars } = require("./helpers/server-helper");
const configureApis = require("./apis/conf");
const { initializeRepositories, dbConnections } = require("./database/connection");
loadAndParseEnvVars();

const PORT = getEnvVars().SERVER_CONF.PORT || 8000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
configureApis(app);

initializeRepositories(dbConnections()).then(() => {
    app.listen(PORT, async () => {
        console.log("✅ Connected to database");
        console.log("✅ Server is listening at", PORT);
    });
}).catch((error) => {
    console.log("❌ cannot connect to database");
    console.log(error);
});