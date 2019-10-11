const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const passport = require('passport');
var session = require('express-session');
var cookieParser = require('cookie-parser');
const morgan = require("morgan");

var flash = require('connect-flash');

const dbConfig = require('./config/dBConfig.js');
// const LocalStrategy = require('passport-local');
const mongodb = require('mongodb');

const multer = require('multer');   // multer middleware is used to handle multipart form data

 const UNIVERSITY_ROUTES = require("./routes/api/university");
 const CHECKTOKEN_ROUTES = require("./routes/api/check_token");
// const USER_ROUTES = require("./api/routes/admin_event");
 const COLLEGE_ROUTES = require("./routes/api/college");
 const COURSE_ROUTES = require("./routes/api/course");
 const SPECIALIZATIONS_ROUTES = require("./routes/api/specializations");
 const CCS_ROUTES = require("./routes/api/ccs_association");
 const AUTHORITY = require("./routes/api/authority");
 const ROLE = require("./routes/api/role");
 const ROLE_AUTHORITY = require("./routes/api/role_authority");
const USER_ROUTES = require("./routes/user");
const STUDENT_ROUTES = require("./routes/student_enrollment");
const EMPLOYER_ROUTES = require("./routes/api/employer");
const GRADE_ROUTES = require("./routes/api/grade");
const QUESTION_ROUTES = require("./routes/api/question");
const WRITTEN_QUESTION_ROUTES = require("./routes/api/written_question");
const VACANCY_ROUTES = require("./routes/api/vacancy");
const INTERNSHIP = require("./routes/api/internship_details");
const CONTACT_US = require("./routes/api/contact_us");
const KEYVALUE = require("./routes/api/keyvalue");
const PAYMENT = require("./routes/api/payment");
const CALLBACK = require("./routes/api/callback");
const TESTING = require("./routes/return_msg/testing");



app.use(cookieParser('secret'));
app.use(session({cookie: { maxAge: 60000 }}));
app.use(flash());

 
//Passport Middleware
 app.use(passport.initialize());

//Passport Config
require('./config/passport')(passport);


// Connecting to the database
// DB Config
const db = require('./config/dBConfig.js').url;

// Connect to MongoDB
mongoose
  .connect(
    db,
    { useNewUrlParser: true }
  )
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

  
app.use(morgan("dev"));
app.use('/uploads', express.static('uploads'));
app.use('/download', express.static('routes/download'))

// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());

app.use(bodyParser.json({ limit: '2mb' })); 
app.use(bodyParser.urlencoded({ extended: true, limit: '2mb' }));

// app.use(bodyParser.json({ limit: '50mb' }));
// app.use(bodyParser.urlencoded({ limit: '50mb', extended: true, parameterLimit: 1000000 }));
global.__root = __dirname + '/'; 

//app.use(express.static(__dirname, 'public'));


// CORS
//app.use(cors());
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    if (req.method === "OPTIONS")
    {
      res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
      return res.status(200).json({});
    }
    next();
  });



// // test route
app.get('/', function(req, res, )
{
    res.statusCode = 200;   //send the appropriate status code
    res.json(
        {
            message:"Welcome to jobPortal New API", 
            status: false,
            data:{}
        });
});

// app.use((req, res, next) => {
//     const error = new Error("Not found");
//     error.status = 404;
//     next(error);
//   });


// Routes which should handle requests
app.use("/api/users/", USER_ROUTES);
app.use("/api/students/", STUDENT_ROUTES);
app.use("/api/check_token/", CHECKTOKEN_ROUTES);
app.use("/api/university", UNIVERSITY_ROUTES);
app.use("/api/college", COLLEGE_ROUTES);
app.use("/api/course", COURSE_ROUTES);
app.use("/api/specializations", SPECIALIZATIONS_ROUTES);
app.use("/api/ccs", CCS_ROUTES);
app.use("/api/authority", AUTHORITY);
app.use("/api/role", ROLE);
app.use("/api/role_authority", ROLE_AUTHORITY);
app.use("/api/employer", EMPLOYER_ROUTES);
app.use("/api/grade", GRADE_ROUTES);
app.use("/api/question", QUESTION_ROUTES);
app.use("/api/vacancy", VACANCY_ROUTES);
app.use("/api/internship", INTERNSHIP);
app.use("/api/main_page", CONTACT_US);
app.use("/api/keyvalue", KEYVALUE);
app.use("/api/written_question", WRITTEN_QUESTION_ROUTES);
app.use("/api/payment", PAYMENT);
app.use("/api/callback", CALLBACK);
app.use("/api/testing", TESTING);

module.exports = app;