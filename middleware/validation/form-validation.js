const { body, param, query } = require("express-validator");
const { getEnvVars } = require("../../helpers/server-helper");

const validServices = new Set(getEnvVars().CONSTANTS.SERVICES.map(elem => elem.ID));
const validStatus = new Set(getEnvVars().CONSTANTS.SERVICE_STATUS.map(elem => elem.ID));
const validVehicles = new Set(getEnvVars().CONSTANTS.VEHICLE_TYPES.map(elem => elem.ID));

exports.regServiceCenter = [
    body("service_center_name").trim().notEmpty().withMessage("Missing: Service center name"),
    body("state").trim().notEmpty().withMessage("Missing: Service center state"),
    body("city").trim().notEmpty().withMessage("Missing: Service center city"),
    body("zipcode").trim().notEmpty().withMessage("Missing: Service center zipcode"),
    body("addressLine_1").trim().notEmpty().withMessage("Missing: Service center addressLine_1"),
    body("longitude").notEmpty().withMessage("Missing: longitude").isFloat({ min: -180, max: 180 }).withMessage('Invalid longitude value'),
    body("latitude").notEmpty().withMessage("Missing: latitude").isFloat({ min: -90, max: 90 }).withMessage('Invalid latitude value'),
    body("email").notEmpty().withMessage("Missing: email address").isEmail().withMessage("Not a valid email address"),
    body("phone").notEmpty().withMessage("Missing: Phone number"),
    body("operate_from").notEmpty().withMessage("Missing: Operation time").matches(/^([01]\d|2[0-3]):([0-5]\d)$/).withMessage('Invalid time format'),
    body("operate_till").notEmpty().withMessage("Missing: Operation time").matches(/^([01]\d|2[0-3]):([0-5]\d)$/).withMessage('Invalid time format'),
    body("services").notEmpty().withMessage("Missing: services")
        .isArray().withMessage('services must be provided as an array').custom(checkValidServices).withMessage("Invalid service type found"),
];

exports.login = [
    body("email").notEmpty().withMessage("Missing: email address").isEmail().withMessage("Not a valid email address"),
    body("password").notEmpty().withMessage("Missing: password")
];

exports.findService = [
    query("longitude").notEmpty().withMessage("Missing: longitude").isFloat({ min: -180, max: 180 }).withMessage('Invalid longitude value'),
    query("latitude").notEmpty().withMessage("Missing: latitude").isFloat({ min: -90, max: 90 }).withMessage('Invalid latitude value'),
    query("max_distance").notEmpty().withMessage("Missing: maximum distance").isInt({ min: 10, max: 100 }).withMessage('Invalid maximum distance range'),
];

exports.servBookingStatus = [
    param("booking_id").trim().notEmpty().withMessage("Missing: Booking id").isUUID().withMessage("Invalid booking ID"),
    param("status").trim().notEmpty().withMessage("Missing: status").custom(checkValidStatus).withMessage("Invalid status id")
];

exports.regUser = [
    body("firstname").trim().notEmpty().withMessage("Missing: First name"),
    body("lastname").trim().notEmpty().withMessage("Missing: Last name"),
    body("email").trim().notEmpty().withMessage("Missing: email").isEmail().withMessage("Invalid email address"),
    body("password").trim().notEmpty().withMessage("Missing: password")
];

exports.regVehicle = [
    body("vehicle_type").trim().notEmpty().withMessage("Missing: Vehicle type").custom(checkValidVehicle).withMessage("Invalid vehicle type found"),
    body("vehicle_model").trim().notEmpty().withMessage("Missing: Vehicle Model"),
    body("brand").trim().notEmpty().withMessage("Missing: Vehicle brand"),
    body("number_plate").trim().notEmpty().withMessage("Missing: Vehicle number plated"),

];

exports.addBooking = [
    body("servicecenter_uuid").trim().notEmpty().withMessage("Missing: Service center ID").isUUID().withMessage("Not a valid ID"),
    body("vehicle_uuid").trim().notEmpty().withMessage("Missing: Vehicle ID").isUUID().withMessage("Not a valid ID"),
    body("service_type_id").trim().notEmpty().withMessage("Missing: Service type ID").custom(checkValidServices).withMessage("Not a valid ID"),
    body("service_date").trim().notEmpty().withMessage("Missing: Service Date").isDate({format:"YYYY-MM-DD"}).withMessage("Invalid date format")
];

exports.cancleBooking = [
    param("booking_id").trim().notEmpty().isUUID().withMessage("Not a valid id")
]
function checkValidServices(items) {
    items = Array.isArray(items) ? items : [items];
    for (const item of items) {
        if (!validServices.has(parseInt(item)))
            return false;
    }
    return true;
};

function checkValidStatus(items) {
    items = Array.isArray(items) ? items : [items];
    for (const item of items) {
        if (!validStatus.has(parseInt(item)))
            return false;
    }
    return true;
};

function checkValidVehicle(items) {
    items = Array.isArray(items) ? items : [items];
    for (const item of items) {
        if (!validVehicles.has(parseInt(item)))
            return false;
    }
    return true;
}