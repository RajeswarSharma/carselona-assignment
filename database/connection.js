
const initializeRepositories = async (dbConnections) => {
    try {
        let dbConnection;
        if (!dbConnections.default.isInitialized) {
            dbConnection = await dbConnections.default.initialize();
            dbConnections.manager = dbConnection.manager;
            dbConnections.repos = {};
            dbConnections.tablePaths = {};
            dbConnections.entities = {};
            for (const metaData of dbConnection.entityMetadatas) {
                const repo = dbConnection.getRepository(metaData);
                dbConnections.tablePaths[metaData.tableName] = metaData.tablePath;
                dbConnections.repos[metaData.tableName] = repo;
                dbConnections.entities[metaData.tableName] = metaData;
                
            }
        }
    } catch (error) {
        console.log(error);
        throw error;
    }
};

const dbConnections = () => {
    return require("./datasource");
};

module.exports = { dbConnections, initializeRepositories };