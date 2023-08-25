module.exports = `
    SELECT 
    servicecenter.servicecenter_uuid ,
    servicecenter.service_center_name,
    servicecenter.email,
    servicecenter.phone,
    matrix.service_type_id,
    CASE 
        WHEN matrix.service_type_id IS NULL 
            THEN 0
        ELSE matrix.booking_num
    END as booking_count
    from server.servicecenter
    LEFT JOIN 
    (
    SELECT 
    booking.servicecenter_uuid,
    booking.service_type_id,
    count(*) AS booking_num
    FROM
        server.booking
        GROUP BY booking.servicecenter_uuid,booking.service_type_id
        ) as matrix
    ON matrix.servicecenter_uuid = servicecenter.servicecenter_uuid
	`;