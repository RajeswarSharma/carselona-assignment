module.exports = `

SELECT
servicecenter_uuid,
service_center_name,
longitude,
latitude,
state,
city,
zipcode,
email,
phone,
operate_from,
operate_till,
ST_Distance_Sphere(point(longitude, latitude),point( :f_longitude , :f_latitude ))/1000 AS distance

FROM server.servicecenter

WHERE 
    ST_Distance_Sphere( point(longitude, latitude), point( :f_longitude , :f_latitude ) )/1000 <= :f_max_distance
ORDER BY distance
`;