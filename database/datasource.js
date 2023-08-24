const path = require("path")
require("dotenv").config({path:path.resolve(__dirname,"../.env")})
const { DataSource } = require("typeorm");
const { loadAndParseEnvVars, getEnvVars } = require("../helpers/server-helper");
const dbModels = require('./models');

let serverMainDS;
let configuration;
try {
    if (process.env.FORCE_LOAD_CONFIGURATION === 'True') {
        if (process.env.ENV_JSON) {
            loadAndParseEnvVars();
        } else {
            throw new Error('No configuration to load');
        }
    }
    configuration = getEnvVars();
} catch (error) {
    console.log('Configuration not available');
    throw error;
}

let DB_CONFIG;
if (configuration && configuration.DATABASE) {
    DB_CONFIG = {
        host: configuration.DATABASE.HOST,
        port:configuration.DATABASE.PORT,
        name: configuration.DATABASE.NAME,
        type: configuration.DATABASE.TYPE,
        username: configuration.DATABASE.USERNAME,
        password: configuration.DATABASE.PASSWORD,
        database: configuration.DATABASE.DATABASE,
        synchronize: configuration.DATABASE.SYNCHRONIZE,
        logging: configuration.DATABASE.LOGGING,
        migrations: configuration.DATABASE.MIGRATIONS,
        migrationsTableName: configuration.DATABASE.MIGRATIONSTABLENAME
    };
}
DB_CONFIG.entities = [...dbModels];

serverMainDS = new DataSource(DB_CONFIG);

exports.default = serverMainDS
