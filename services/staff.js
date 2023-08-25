const { dbConnections } = require("../database/connection");

const getStaffByfilters = async (filtersFromUser, options = {}) => {
    const validUserFilters = ["carselona_staff_uuid", "email", "phone", "role"];
    const filterObect = {};
    for (const filterKey of validUserFilters) {
        if (filtersFromUser.hasOwnProperty(filterKey))
            filterObect[filterKey] = filtersFromUser[filterKey];
    }
    const projection = { carselona_staff_uuid: true, firstname: true, lastname: true, email: true, phone: true, role: true, created_at: true, updated_at: true };
    if (options.show_password === true) {
        projection.password = true;
    }
    if (options.get_many === true) {
        return await dbConnections().repos["carselona_staff"].find({
            where: filterObect,
            select: projection
        });
    }
    return await dbConnections().repos["carselona_staff"].findOne({
        where: filterObect,
        select: projection
    });

};

module.exports = { getStaffByfilters };