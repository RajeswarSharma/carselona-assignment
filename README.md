# carselona-assignment

## SETUP
### 1. Install make utility
```shell
sudo apt install make 
```
### 2. Install jq utility
```shell
sudo apt install -y jq
```

### 3. create the "env.json" file inside the project root using the following format.
```json
{
    "SERVER_CONF": {
        "PORT": 8000,
        "JWT": {
            "JWT_ISSUER": "carselona",
            "JWT_SIG_ALGORITHM": "RS512"
        }
    },
    "DATABASE": {
        "NAME": "server_connection",
        "TYPE": "mysql",
        "HOST": "your-database-host.com",
        "PORT": 3306,
        "USERNAME": "your-username",
        "PASSWORD": "your-password",
        "DATABASE": "server",
        "SYNCHRONIZE": false,
        "LOGGING": true,
        "MIGRATIONS": [
            "database/migrations/*.js"
        ],
        "MIGRATIONSTABLENAME": "migrations-server"
    },
    "CONSTANTS": {
        "USER_TYPES": {
            "ADMIN": 1001,
            "SERVICE_CENTER": 1002,
            "USER": 1003
        },
        "HTTP_CODE": {
            "CREATED": 201,
            "NO_CONTENT": 204,
            "BAD_REQUEST": 400,
            "UNAUTHORIZED": 401,
            "FORBIDDEN": 403,
            "NOT_FOUND": 404,
            "CONFLICT": 409,
            "UNSUPPORTED_FILE": 415,
            "INTERNAL_SERVER_ERR": 500
        },
        "ERROR_CODES": {
            "INVALID_PARAMS": -101,
            "INTERNAL_CHECK_FAILED": -102
        },
        "DEFAULT_PASSWORD_LENGTH": 8,
        "SERVICES": [
            {"ID": 4001,"NAME": "Vehicle wash"},
            {"ID": 4002,"NAME": "Oil change and filter replacement"},
            {"ID": 4003,"NAME": "Brake fluid exchange"},
            {"ID": 4004,"NAME": "Battery testing"},
            {"ID": 4004,"NAME": "Tire replacement"},
            {"ID": 4005,"NAME": "Full body service"}
        ],
        "VEHICLE_TYPES":[
            {"ID":3001,"NAME":"SUV"},
            {"ID":3002,"NAME":"Sedan"},
            {"ID":3003,"NAME":"Hatchback"},
            {"ID":3004,"NAME":"Coupe"},
            {"ID":3005,"NAME":"2 Wheeler"}
        ],
        "SERVICE_STATUS":[
            {"ID":2001,"NAME":"Pending"},
            {"ID":2002,"NAME":"Abandoned"},
            {"ID":2003,"NAME":"Cancelled"},
            {"ID":2004,"NAME":"Completed"}
        ],
        "DEFAULT_SERVICECENTER_DISTANCE":10
    }
}

```
### 4. Create .env using the following command
```shell
make create-env
```
### 5. Clean install all of the node_modeule using the following command
```shell
make clean-install
```
### 6. Generate signature keys using the following commond
```shell
make generate_keys
```

### 7. Now run the following command to start the server
```shell
npm start
```

## ENDPOINTS

#### Note: generate  "access_token" through login API and pass it into headers as per the request and role.

### 1. Sign-Up User
POST: api/user/create
#### Access:  public
```json
{
    "firstname": "Mohit",
    "lastname": "Kumar",
    "email": "email2@mail.com",
    "phone": "110000000",
    "password": "1234"
}
```
<br>

### 2. Add service center
POST:  /api/admin/service-center/add
#### Access:  Admin
```json
{
    "service_center_name": "iGarage",
    "state": "Punjab",
    "city": "Mohali",
    "zipcode": "140413",
    "addressLine_1": "Beside Post Office, Phase 10",
    "longitude": 76.695,
    "latitude": 30.698,
    "email": "igenius@autorepair.com",
    "phone": "1234123410",
    "operate_from": "08:30",
    "operate_till": "18:30",
    "services": [4001, 4003, 4004]
}
```
<br>

### 3. Logins
POST:  /api/auth/login/user

POST:  /api/auth/login/staff

POST:  /api/auth/login/servicecenter

```json
{
    "email": "email1@mail.com",
    "password": "1234"
}
```


### 4. Find service center by location and distance
GET: /api/find/service-center?latitude=30.771763&longitude=76.576339&max_distance=90

Access: User,Admin
##### Query-params
```
latitude: 30.771763
longitude: 76.576339
max_distance: 90
```

#### Assumption: Latitude and longitude will be based on user's live location and will be obtained from 3rd party APIs.

### 5. Book service
POST: /api/user/booking/add

Access: User

```json
{
    "servicecenter_uuid":"92495a6b-97f4-425a-bb7d-4e7feda7da45", 
    "vehicle_uuid":"4b51d77e-b670-41bf-a3dc-4e16527ec3b0", 
    "service_type_id":4003, 
    "service_date":"2023-12-01"
}
```

### 6. Booking History [User]
GET: /api/user/booking/all


### 7. Booking Histiry [Service Center]
GET: /api/servicecenter/booking/all

### 8. Booking Histiry [Admin]
GET: /api/admin/booking/all

### 9. Booking Cancelation

Access: User

GET: /api/user/booking/:booking_id/cancel

Path param: "booking_id"

### 10. Change Booking Status
Access: Service Center

GET: /api/servicecenter/booking/:booking_id/:status

Path param: booking_id,statu

#### Assumption: Appropriate status id will be provided by the FE 


### 11. Booking matrix
Access: Admin

GET: /api/admin/booking/matrix
