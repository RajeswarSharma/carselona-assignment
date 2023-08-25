module.exports = `
SELECT 
booking.booking_uuid,
user.user_uuid,
servicecenter.servicecenter_uuid,
vehicle.vehicle_uuid,
servicecenter.service_center_name,
servicecenter.phone as servicecenter_phone,
servicecenter.email as servicecenter_email,
vehicle.vehicle_model,
vehicle.vehicle_type,
vehicle.number_plate,
vehicle.brand,
booking.service_date,
booking.service_type_id,
booking.service_status
FROM server.booking as booking
JOIN server.user as user
ON user.user_uuid = booking.user_uuid
JOIN server.servicecenter as servicecenter
ON servicecenter.servicecenter_uuid = booking.servicecenter_uuid
JOIN server.vehicle as vehicle
ON vehicle.vehicle_uuid = booking.vehicle_uuid
order by booking.service_date
`;