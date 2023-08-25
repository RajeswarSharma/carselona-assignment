const { randomStringGenerator, stringToHash } = require("../helpers/common-helpers");
const { dbConnections } = require("../database/connection");
const { getEnvVars } = require("../helpers/server-helper");
const serviceCenterByLonglatQuery = require("../database/raw-query/find-servicecenter-bydistance");
const addServiceCenter = async (dataFromUser) => {
    const {
        service_center_name,
        state,
        city,
        zipcode,
        addressLine_1,
        longitude,
        latitude,
        email,
        phone,
        operate_from,
        operate_till,
        services
    } = dataFromUser;

    const password = randomStringGenerator(getEnvVars().CONSTANTS.DEFAULT_PASSWORD_LENGTH);
    const hashedPassword = await stringToHash(password);
    const serviceCenterUUID = await dbConnections().manager.transaction(async (transaction) => {
        const serviceCenterRepo = transaction.getRepository("servicecenter");
        const serviceRepo = transaction.getRepository("service");
        const insertedServiceCenter = await serviceCenterRepo.insert({
            service_center_name,
            state,
            city,
            zipcode,
            addressLine_1,
            longitude,
            latitude,
            email,
            phone,
            operate_from,
            operate_till,
            password: hashedPassword
        });

        const serviceCenterUUID = insertedServiceCenter.generatedMaps[0].servicecenter_uuid;

        const servicesToInsert = [];
        const servicesArray = Array.isArray(services) ? services : [services];
        for (const service of servicesArray) {
            servicesToInsert.push({
                service_center_uuid: serviceCenterUUID,
                service_id: service
            });
        }
        await serviceRepo.insert(servicesToInsert);
        return serviceCenterUUID;
    });
    console.log("service center password", password);
    return serviceCenterUUID;
};

const findServiceCenterByLongLat = async (latitude, longitude, max_distance = getEnvVars().CONSTANTS.DEFAULT_SERVICECENTER_DISTANCE) => {
    const queryBuilder = dbConnections().manager.createQueryBuilder().from(`(${serviceCenterByLonglatQuery})`,"q")
        .setParameters({ f_latitude: latitude, f_longitude: longitude, f_max_distance:max_distance });
    return await queryBuilder.execute();
};

const getServiceCenterByfilters = async (filtersFromUser, options = {}) => {
    const validUserFilters = ["servicecenter_uuid", "email", "phone"];
    const filterObect = {};
    for (const filterKey of validUserFilters) {
        if (filtersFromUser.hasOwnProperty(filterKey))
            filterObect[filterKey] = filtersFromUser[filterKey];
    }
    const projection = { servicecenter_uuid: true, service_center_name: true, email: true, phone: true, created_at: true, updated_at: true, role: true };
    if (options.show_password === true) {
        projection.password = true;
    }
    if (options.get_many === true) {
        return await dbConnections().repos["servicecenter"].find({
            where: filterObect,
            select: projection
        });
    }
    return await dbConnections().repos["servicecenter"].findOne({
        where: filterObect,
        select: projection
    });

};
module.exports = { addServiceCenter, findServiceCenterByLongLat, getServiceCenterByfilters };