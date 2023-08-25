const { dbConnections } = require("../database/connection");
const bookingListRawQuery = require("../database/raw-query/booking-list");
const bookingMatrixRaqQuery = require("../database/raw-query/booking-matrix");
const { getEnvVars } = require("../helpers/server-helper");
const addBooking = async (bookingData) => {
    const { servicecenter_uuid, vehicle_uuid, service_type_id, service_date, user_uuid } = bookingData;
    const newBooking = await dbConnections().repos["booking"].insert({ servicecenter_uuid, vehicle_uuid, service_type_id, service_date, user_uuid });
    return newBooking;
};

const getBookingByFilter = async (filter = {}) => {

    const queryBuilder = dbConnections().manager.createQueryBuilder().from(`(${bookingListRawQuery})`);
    if (filter.user_uuid) {
        queryBuilder.andWhere("user_uuid = :user_uuid", { user_uuid: filter.user_uuid });
    }
    else if (filter.servicecenter_uuid) {
        queryBuilder.andWhere("servicecenter_uuid = :servicecenter_uuid", { servicecenter_uuid: filter.servicecenter_uuid });
    }
    return await queryBuilder.getRawMany();
};

const changeBookingStatus = async (filter, status) => {
    const allowedFilters = new Set(["booking_uuid", "user_uuid", "servicecenter_uuid"]);
    for (const key of Object.keys(filter)) {
        if (!allowedFilters.has(key)) {
            delete filter[key];
        }
    }
    await dbConnections().repos["booking"].update(filter, { service_status: status });
};

const getBookingMatrix = async () => {
    const servicesArray = getEnvVars().CONSTANTS.SERVICES;
    console.log(servicesArray)
    const serviceMap = servicesArray.reduce((acc, curr) => (acc[curr.ID] = curr.NAME, acc), {});
    console.log(serviceMap);
    const queryBuilder = dbConnections().manager.createQueryBuilder().from(`(${bookingMatrixRaqQuery})`);
    const matrixData = await queryBuilder.getRawMany();
    const formatedMatrixData = {};
    for (const data of matrixData) {
        if (!formatedMatrixData[data.servicecenter_uuid]) {
            formatedMatrixData[data.servicecenter_uuid] = {
                servicecenter_uuid: data.servicecenter_uuid,
                service_center_name: data.service_center_name,
                service_center_email: data.email,
                service_center_phone: data.phone,
                service_matrix: []
            };
        }
        formatedMatrixData[data.servicecenter_uuid].service_matrix.push({
            service_name: serviceMap[data.service_type_id],
            booking_count: data.booking_count
        });
    }
    return Object.values(formatedMatrixData);
};
module.exports = { addBooking, getBookingByFilter, changeBookingStatus, getBookingMatrix };