require("dotenv").config();
const { loadAndParseEnvVars, getEnvVars } = require("./helpers/server-helper");
loadAndParseEnvVars();

const express = require("express");
const app = express();
const configureApis = require("./apis/conf");
const { initializeRepositories, dbConnections } = require("./database/connection");

const PORT = getEnvVars().SERVER_CONF.PORT || 8000;
if (getEnvVars().CONSTANTS.DISABLE_CONSOLE === true) {
    console.log = () => { };
}

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