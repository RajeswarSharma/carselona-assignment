let ENV_VARS = null;
const loadAndParseEnvVars = () => {
    if (ENV_VARS !== null) return;
    try {
        ENV_VARS = JSON.parse(process.env.ENV_JSON);
        console.log("✅ ENV is loaded");
    } catch (error) {
        console.error(error);
        console.log("❌ Cannot parse the server env-json");
        process.exit();
    }
};

const getEnvVars = () => {
    if (ENV_VARS === null) throw new Error("Please load the evn-json first");
    return ENV_VARS;
};

module.exports = { loadAndParseEnvVars, getEnvVars };