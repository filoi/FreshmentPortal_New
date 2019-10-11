const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const setting=require("../validation/settings");
const Page_cont=require("./return_msg/setting");
//const passport = require('passport-local');
var nodemailer = require('nodemailer');
var upload=require('express-fileupload')
const nodeMailer = require('nodemailer');
const config = require('../config/keys.js');
var app=express();
var multer=require('multer');
var upload=multer();
const bodyParser = require("body-parser");
const Invite = require('../models/invite');
const Vacancy = require('../models/vacancy');
const Offer = require('../models/offer');
const Other_enroll = require('../models/other_enroll');

const Vacancy_Student = require('../models/vacancy_student');
const Vacancy_Course = require('../models/vacancy_course');
const Interest = require('../models/interest');
const Vacancy_specialization = require('../models/vacancy_specializations');

//Load Input Validation
const validationEnroll = require('../validation/enrollValidation');
const otherEnroll = require('../validation/otherEnroll');
const validationStudentUpdate = require('../validation/updateStudentValidation');
let middleware = require('../validation/middleware');
const Role_authority = require('../models/role_authority');
const Role = require('../models/role');
const Course = require('../models/course');
const Employer = require('../models/employer');
const User = require('../models/user');
const Grade = require('../models/grade');
var generator = require('generate-password');
var crypto = require('crypto');
var path = require('path')
var sendMail=require("../routes/return_msg/sendMail");
const Notification = require('../models/notification');
const variables=require("./return_msg/keyvalue");
var moment = require('moment');
const loginStatus = require('../models/login_status');

const pdf = require('html-pdf')
const requestify = require('requestify')

var storage = multer.diskStorage({
    destination: './uploads/',
    filename: function (req, file, cb) {
      crypto.pseudoRandomBytes(16, function (err, raw) {
        if (err) return cb(err)
  
        cb(null, raw.toString('hex') + path.extname(file.originalname))
      })
    }
  })
  var upload = multer({ storage: storage });

const Student = require('../models/student_enrollment');
    var mobileToSave;

// const loginStatus = require('../models/login_status');


// *** POST *** /api/users/register *** Create new student enrollment ***
router.post("/enroll/new", (req, res) => {

    let student_id=" ";

    if(req.body.college_id==="other")
    {
        var validationResult = otherEnroll.checkEnrollValidation(req.body);

        if (!validationResult.status)
        {            
            return res.send(validationResult);
        }

        Other_enroll.findOne({email: req.body.email})
        .then(student =>
            { 
                if (student)
            {
                res.status(200).send(setting.status("Email Already exits", false, "Email unique", null))
            }
            else
            {

        const newStudent = new Other_enroll({
            fname: req.body.fname,
            email: req.body.email,
            contact_no: req.body.contact_no,
            college_name: req.body.college_name,
            college_email: req.body.college_email,
            college_contatc_no: req.body.college_contatc_no
          });

          newStudent.save()
          .then(student => 
            {
                let html=`<!DOCTYPE html><html><head> <meta charset="utf-8"> <meta http-equiv="x-ua-compatible" content="ie=edge"> 
                <title>Registed</title> <meta name="viewport" content="width=device-width, initial-scale=1"> <style type="text/css"> /** * Google webfonts. Recommended to include the .woff version for cross-client compatibility. */ @media screen{@font-face{font-family: 'Source Sans Pro'; font-style: normal; font-weight: 400; src: local('Source Sans Pro Regular'), local('SourceSansPro-Regular'), url(https://fonts.gstatic.com/s/sourcesanspro/v10/ODelI1aHBYDBqgeIAH2zlBM0YzuT7MdOe03otPbuUS0.woff) format('woff');}@font-face{font-family: 'Source Sans Pro'; font-style: normal; font-weight: 700; src: local('Source Sans Pro Bold'), local('SourceSansPro-Bold'), url(https://fonts.gstatic.com/s/sourcesanspro/v10/toadOcfmlt9b38dHJxOBGFkQc6VGVFSmCnC_l7QZG60.woff) format('woff');}}/** * Avoid browser level font resizing. * 1. Windows Mobile * 2. iOS / OSX */ body, table, td, a{-ms-text-size-adjust: 100%; /* 1 */ -webkit-text-size-adjust: 100%; /* 2 */}/** * Remove extra space added to tables and cells in Outlook. */ table, td{mso-table-rspace: 0pt; mso-table-lspace: 0pt;}/** * Better fluid images in Internet Explorer. */ img{-ms-interpolation-mode: bicubic;}/** * Remove blue links for iOS devices. */ a[x-apple-data-detectors]{font-family: inherit !important; font-size: inherit !important; font-weight: inherit !important; line-height: inherit !important; color: inherit !important; text-decoration: none !important;}/** * Fix centering issues in Android 4.4. */ div[style*="margin: 16px 0;"]{margin: 0 !important;}body{width: 100% !important; height: 100% !important; padding: 0 !important; margin: 0 !important;}/** * Collapse table borders to avoid space between cells. */ table{border-collapse: collapse !important;}a{color: #1a82e2;}img{height: auto; line-height: 100%; text-decoration: none; border: 0; outline: none;}</style></head><body style="background-color: #e9ecef;"> <div class="preheader" style="display: none; max-width: 0; max-height: 0; overflow: hidden; font-size: 1px; line-height: 1px; color: #fff; opacity: 0;"> 
                Registered successfully. </div><table border="0" cellpadding="0" cellspacing="0" width="100%"> <tr> <td align="center" bgcolor="#e9ecef"><!--[if (gte mso 9)|(IE)]> <table align="center" border="0" cellpadding="0" cellspacing="0" width="600"> <tr> <td align="center" valign="top" width="600"><![endif]--> <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;"> <tr> <td align="center" valign="top" style="padding: 36px 24px;"> <a href="` + variables. WEB_LINK+ `" target="_blank" style="display: inline-block;"> <img src="http://172.104.40.142:3000/img/brand/logo-white.png" alt="Logo" border="0" width="200" style="display: block; width: 200px; max-width: 200px; min-width: px;"> </a> </td></tr></table><!--[if (gte mso 9)|(IE)]> </td></tr></table><![endif]--> </td></tr><tr> <td align="center" bgcolor="#e9ecef"><!--[if (gte mso 9)|(IE)]> <table align="center" border="0" cellpadding="0" cellspacing="0" width="600"> <tr> <td align="center" valign="top" width="600"><![endif]--> <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;"> <tr> <td align="left" bgcolor="#ffffff" style="padding: 36px 24px 0; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; border-top: 3px solid #d4dadf;"> 
                <h1 style="margin: 0 0 16px 0; padding: 0 0 16px 0; font-size: 42px; font-weight: bold; letter-spacing: -2px; border-bottom: 1px solid #999" style="margin: 0; font-size: 32px; font-weight: 700; letter-spacing: -1px; line-height: 48px;">
                Offer rejected</h1 style="margin: 0 0 16px 0; padding: 0 0 16px 0; font-size: 42px; font-weight: bold; letter-spacing: -2px; border-bottom: 1px solid #999"> </td></tr></table><!--[if (gte mso 9)|(IE)]> </td></tr></table><![endif]--> </td></tr><tr> <td align="center" bgcolor="#e9ecef"><!--[if (gte mso 9)|(IE)]> <table align="center" border="0" cellpadding="0" cellspacing="0" width="600"> <tr> <td align="center" valign="top" width="600"><![endif]--> <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;"> <tr> <td align="left" bgcolor="#ffffff" style="padding: 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; line-height: 24px;"> <p style="margin: 0;">
                send mail to student
                </td></tr><tr> <td align="left" bgcolor="#ffffff"> <table border="0" cellpadding="0" cellspacing="0" width="100%"> <tr> <td align="center" bgcolor="#ffffff" style="padding: 12px;"> <table border="0" cellpadding="0" cellspacing="0"> <tr> <td align="center" bgcolor="#1a82e2" style="border-radius: 6px;"> <a href="` + variables. WEB_LINK+ `" target="_blank" style="display: inline-block; padding: 16px 36px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; color: #ffffff; text-decoration: none; border-radius: 6px;">
                GO TO APPLICATION</a> </td></tr></table> </td></tr></table> </td></tr></table><!--[if (gte mso 9)|(IE)]> </td></tr></table><![endif]--> </td></tr><tr> <td align="center" bgcolor="#e9ecef" style="padding: 24px;"><!--[if (gte mso 9)|(IE)]> <table align="center" border="0" cellpadding="0" cellspacing="0" width="600"> <tr> <td align="center" valign="top" width="600"><![endif]--> <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;"> <tr> <td align="center" bgcolor="#e9ecef" style="padding: 12px 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 14px; line-height: 20px; color: #666;"> 
                <p style="margin: 0;"><b>CAS SHRC | Bridging Talents and Opportunities</b></p></td></tr></table><!--[if (gte mso 9)|(IE)]> </td></tr></table><![endif]--> </td></tr></table> </body></html>`
            
                let html1=`<!DOCTYPE html><html><head> <meta charset="utf-8"> <meta http-equiv="x-ua-compatible" content="ie=edge"> 
                <title>Registed</title> <meta name="viewport" content="width=device-width, initial-scale=1"> <style type="text/css"> /** * Google webfonts. Recommended to include the .woff version for cross-client compatibility. */ @media screen{@font-face{font-family: 'Source Sans Pro'; font-style: normal; font-weight: 400; src: local('Source Sans Pro Regular'), local('SourceSansPro-Regular'), url(https://fonts.gstatic.com/s/sourcesanspro/v10/ODelI1aHBYDBqgeIAH2zlBM0YzuT7MdOe03otPbuUS0.woff) format('woff');}@font-face{font-family: 'Source Sans Pro'; font-style: normal; font-weight: 700; src: local('Source Sans Pro Bold'), local('SourceSansPro-Bold'), url(https://fonts.gstatic.com/s/sourcesanspro/v10/toadOcfmlt9b38dHJxOBGFkQc6VGVFSmCnC_l7QZG60.woff) format('woff');}}/** * Avoid browser level font resizing. * 1. Windows Mobile * 2. iOS / OSX */ body, table, td, a{-ms-text-size-adjust: 100%; /* 1 */ -webkit-text-size-adjust: 100%; /* 2 */}/** * Remove extra space added to tables and cells in Outlook. */ table, td{mso-table-rspace: 0pt; mso-table-lspace: 0pt;}/** * Better fluid images in Internet Explorer. */ img{-ms-interpolation-mode: bicubic;}/** * Remove blue links for iOS devices. */ a[x-apple-data-detectors]{font-family: inherit !important; font-size: inherit !important; font-weight: inherit !important; line-height: inherit !important; color: inherit !important; text-decoration: none !important;}/** * Fix centering issues in Android 4.4. */ div[style*="margin: 16px 0;"]{margin: 0 !important;}body{width: 100% !important; height: 100% !important; padding: 0 !important; margin: 0 !important;}/** * Collapse table borders to avoid space between cells. */ table{border-collapse: collapse !important;}a{color: #1a82e2;}img{height: auto; line-height: 100%; text-decoration: none; border: 0; outline: none;}</style></head><body style="background-color: #e9ecef;"> <div class="preheader" style="display: none; max-width: 0; max-height: 0; overflow: hidden; font-size: 1px; line-height: 1px; color: #fff; opacity: 0;"> 
                Registered successfully. </div><table border="0" cellpadding="0" cellspacing="0" width="100%"> <tr> <td align="center" bgcolor="#e9ecef"><!--[if (gte mso 9)|(IE)]> <table align="center" border="0" cellpadding="0" cellspacing="0" width="600"> <tr> <td align="center" valign="top" width="600"><![endif]--> <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;"> <tr> <td align="center" valign="top" style="padding: 36px 24px;"> <a href="` + variables. WEB_LINK+ `" target="_blank" style="display: inline-block;"> <img src="http://172.104.40.142:3000/img/brand/logo-white.png" alt="Logo" border="0" width="200" style="display: block; width: 200px; max-width: 200px; min-width: px;"> </a> </td></tr></table><!--[if (gte mso 9)|(IE)]> </td></tr></table><![endif]--> </td></tr><tr> <td align="center" bgcolor="#e9ecef"><!--[if (gte mso 9)|(IE)]> <table align="center" border="0" cellpadding="0" cellspacing="0" width="600"> <tr> <td align="center" valign="top" width="600"><![endif]--> <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;"> <tr> <td align="left" bgcolor="#ffffff" style="padding: 36px 24px 0; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; border-top: 3px solid #d4dadf;"> 
                <h1 style="margin: 0 0 16px 0; padding: 0 0 16px 0; font-size: 42px; font-weight: bold; letter-spacing: -2px; border-bottom: 1px solid #999" style="margin: 0; font-size: 32px; font-weight: 700; letter-spacing: -1px; line-height: 48px;">
                Offer rejected</h1 style="margin: 0 0 16px 0; padding: 0 0 16px 0; font-size: 42px; font-weight: bold; letter-spacing: -2px; border-bottom: 1px solid #999"> </td></tr></table><!--[if (gte mso 9)|(IE)]> </td></tr></table><![endif]--> </td></tr><tr> <td align="center" bgcolor="#e9ecef"><!--[if (gte mso 9)|(IE)]> <table align="center" border="0" cellpadding="0" cellspacing="0" width="600"> <tr> <td align="center" valign="top" width="600"><![endif]--> <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;"> <tr> <td align="left" bgcolor="#ffffff" style="padding: 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; line-height: 24px;"> <p style="margin: 0;">
                 send mail to admin
                </td></tr><tr> <td align="left" bgcolor="#ffffff"> <table border="0" cellpadding="0" cellspacing="0" width="100%"> <tr> <td align="center" bgcolor="#ffffff" style="padding: 12px;"> <table border="0" cellpadding="0" cellspacing="0"> <tr> <td align="center" bgcolor="#1a82e2" style="border-radius: 6px;"> <a href="` + variables. WEB_LINK+ `" target="_blank" style="display: inline-block; padding: 16px 36px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; color: #ffffff; text-decoration: none; border-radius: 6px;">
                GO TO APPLICATION</a> </td></tr></table> </td></tr></table> </td></tr></table><!--[if (gte mso 9)|(IE)]> </td></tr></table><![endif]--> </td></tr><tr> <td align="center" bgcolor="#e9ecef" style="padding: 24px;"><!--[if (gte mso 9)|(IE)]> <table align="center" border="0" cellpadding="0" cellspacing="0" width="600"> <tr> <td align="center" valign="top" width="600"><![endif]--> <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;"> <tr> <td align="center" bgcolor="#e9ecef" style="padding: 12px 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 14px; line-height: 20px; color: #666;"> 
                <p style="margin: 0;"><b>CAS SHRC | Bridging Talents and Opportunities</b></p></td></tr></table><!--[if (gte mso 9)|(IE)]> </td></tr></table><![endif]--> </td></tr></table> </body></html>`
            
                    sendMail.sendMail(req.body.email,html,'Please wait for students')
                    sendMail.sendMailToAdmin(req.body.email,html1,'Please wait for admin')

               return res.send(setting.status("Please wait", true, "other college", student))
 
            })

            .catch(err => {
                return res.send(setting.status("Student Not created", false, "error", err));
            });

        }
    })
       

    }
    
    else
    {

    var validationResult = validationEnroll.checkEnrollValidation(req.body);

    if (!validationResult.status)
    {
        console.log("validationResult",validationResult);
        
        return res.send(validationResult);
    }
    console.log("1");

    var enteredMobile = req.body.contact_no;

    mobileToSave = '91'+ enteredMobile;

    Role.findOne({name: 'Student'})
    .then(studentss =>{
    if(studentss){
    Student.findOne({email: req.body.email})
    .then(student =>
        {
          console.log("2");

            if (student)
            {
                res.status(200).send(setting.status("Email Already exits", false, "Email unique", null))
            }
            else
            {
              console.log("3");

              Student.findOne({contact_no: req.body.contact_no})
              .then(student =>
                {
                  if (student)
                  {
                    res.status(200).send(setting.status("Contact Already exits", false, "Contact unique", null))
                  }
                  else
                  {
                    const newStudent = new Student({
                      fname: req.body.fname,
                      lname: req.body.lname,
                      contact_no: enteredMobile,
                      college_id: req.body.college_id,
                      college_id: req.body.college_id,
                      specialization_id_major: req.body.specialization_id_major,
                      specialization_id_minor: req.body.specialization_id_minor,
                      course_id: req.body.course_id,
                      email: req.body.email,
                      academic_from : req.body.academic_from,
                      academic_to : req.body.academic_to,
                      password:mobileToSave,
                      role:"5c2f0e9243abb4222c581d42"
                      //status:"pending"
                    });

                    console.log("4");

                    bcrypt.genSalt(10, (err, salt) =>
                    {
                        bcrypt.hash(newStudent.password, salt, (err, hash) =>
                        {
                            if (err)
                                throw err;
                                newStudent.password = hash;

                    newStudent.save()
                    .then(student => 
                      {
                        student_id=student._id;
						
						if(student)
						{
							
                            sendMail.sendMail(req.body.email,html,'Successfully Enrolled');
                            
                            let marking;
                            let duration;
                            let marks=[];

                            Course.find({_id:req.body.course_id})
                            .then(result => {
                                if(result.length>0)
                                {
                                    console.log(result[0].academic_term);
                                    duration=parseInt(result[0].duration);

                                    if(result[0].academic_term==="semister")
                                    {
                                        let divv=duration/6;

                                        for(let x=0;x<divv;x++)
                                        {
                                            marks.push("Semister "+x+1);

                                            const newGrade = new Grade({
                                                student_id: student._id,
                                                course_type: "Semister",
                                                period_number: x+1,
                                                grades:"",
                                            
                                            });

                                            newGrade.save();

                                        }

                                        console.log(marks)
                                    }
                                    else if(result[0].academic_term==="yearly")
                                    {
                                        let divv=duration/12;

                                        for(let x=0;x<divv;x++)
                                        {
                                            marks.push("Year "+x+1);

                                            const newGrade = new Grade({
                                                student_id: student._id,
                                                course_type: "Yearly",
                                                period_number: x+1,
                                                grades:"",
                                            
                                            });

                                            newGrade.save();
                                        }

                                        console.log(marks)
                                    }
                                    else if(result[0].academic_term==="trimly")
                                    {
                                        let divv=duration/3;

                                        for(let x=0;x<divv;x++)
                                        {
                                            marks.push("Trisemister " +x+1);

                                            const newGrade = new Grade({
                                                student_id: student._id,
                                                course_type: "Tri",
                                                period_number: x+1,
                                                grades:"",
                                            
                                            });

                                            newGrade.save();
                                        }

                                        console.log(marks)
                                    }
                                }
                                else
                                {
                                    console.log("Course Not FInd")
                                }
                            });

                            res.status(200).send(setting.status("Student Enrollment Successfully, Please Check your Mail", true, "Student Enrolled", student._id))
                            console.log('Email sent: ' + info.response);						
						
						}
					
                     });

                   })
				  
                })
            }
        })
	}
})
    }

    else
    {
        return res.status(200).send(setting.status("Role cannot be found", false, "Student role doesnot found", null))

    }
        })
    }
})
 

 
// *** POST *** /api/users/userId *** Update student details ***
router.post("/:id", (req, res) => {
   
  const id = req.params.id;
  if(!id)
  {
    return res.status(200).send(setting.status("Studnet Id not found",false,"invalid id",null));
  }


  var validationResult = validationStudentUpdate.checkStudentUpdateValidation(req.body);


    if(req.body.c_pin_code==="undefined" || req.body.c_pin_code==null || req.body.c_pin_code=='')
    {

    }else
    {
        var c_pinCodeValidation = Object.keys(req.body.c_pin_code).length; // Taking length
        if(c_pinCodeValidation !== 6  )
        {
            return res.send({"msg":"Invalid current address pin code", "status":false, "description":"invalid c_pin_code", "data":null});
    
        }
    }

    if(req.body.p_pin_code==="undefined" || req.body.p_pin_code==null || req.body.p_pin_code=='')
    {

    }else
    {
        var p_pinCodeValidation = Object.keys(req.body.p_pin_code).length; // Taking length
        if(p_pinCodeValidation !== 6  )
        {
            return res.send({"msg":"Invalid permanent address pin code", "status":false, "description":"invalid p_pin_code", "data":null});
    
        }
    }

    if(req.body.overall_grade==="undefined" || req.body.overall_grade==null || req.body.overall_grade=='')
    {

    }else
    {
         Student.aggregate([
            { $match:{"_id":id}},
            { $lookup:
                {
                  from: 'courses',
                  localField: 'course_id',
                  foreignField: '_id',
                  as: 'course_doc'
                }
              }
            ])
        .then(result => {

            var marking=result[0].course_doc[0].marking_criteria;
            
            if(marking==="percentage")
            {
                console.log("wegfsljchkuweqjas")
               
                if(parseInt(overall_grade)>100)
                {
                    return res.send(

                        setting.status("Grade must be lessthan 100 percentage",false,"percentage >100",null)
        
                    );
                }
                

            }else if(marking==="cgpa")
            {
                if(parseInt(overall_grade)>10)
                {
                    return res.send(

                        setting.status("Grade must be 0 - 10",false,"cgpa >10",null)
        
                    );
                }
                

            }
            else if(marking==="grade")
            {
                if(variables.GRADES.indexOf(overall_grade)==-1)
                {
                    return res.send(

                        setting.status("Grade must be "+variables.GRADES.toString(),false,"grade a b c d e f",null)
        
                    );
                }
            }
        });
    }

    var d = new Date(req.body.age);
    var d1 = new Date();

    if(d1.getFullYear()-d.getFullYear()<18)
    {
        return res.send({"msg":"Invalid Date of birth", "status":false, "description":"18-", "data":null});

    }

  Student.findOne({_id: id})
  .then(student => {
      if(!student)
      {
        setting.status("Student not found",false,"student not found", null)
      }
      else if (student)
      {
        
          Student.findByIdAndUpdate(id, {
                age : req.body.age,
                gender :req.body.gender,
                current_address : req.body.current_address,
                c_state : req.body.c_state,
                c_city : req.body.c_city,
                c_pin_code : req.body.c_pin_code,
                permanant_address : req.body.permanant_address,
                p_state : req.body.p_state,
                p_city : req.body.p_city,
                p_pin_code : req.body.p_pin_code,
                project : req.body.project,
                specific_academic_achivement : req.body.specific_academic_achivement,
                writen_introduction: req.body.writen_introduction,
                overall_grade:req.body.overall_grade,

               
                //written_test_result : req.body.written_test_result,
                
        }, {new: true})
              .then(student => {
                  res.json(setting.status("Student Updated", true, "updated", student));
                })
                .catch(err => {
                    res.json(setting.status("Student Not Found", false, "error", err));
                });
            }
            else
            {
                res.json(setting.status("Student Not Found", false, "error", err));
            }
        })
})


// *** POST *** /api/users/userId *** Update student details ***
router.post("/skillset/:id", (req, res) => {

    const id = req.params.id;
    if(!id)
    {
      return res.status(200).send(setting.status("Studnet Id not found",false,"invalid id",null));
    }

    if(!req.body.writen_introduction_answer)
    {
      return res.status(200).send(setting.status("Answer not found",false,"empty answer",null));
    }

    if(!req.body.writen_introduction_question)
    {
      return res.status(200).send(setting.status("Question not found",false,"question answer",null));
    }
  
    console.log(req.body);
  
    
    Student.findOne({_id: id})
    .then(student => {
        if(!student)
        {
          setting.status("Student not found",false,"student not found", null)
        }
        else if (student)
        {
          
            Student.findByIdAndUpdate(id, {
                 
                  writen_introduction_question : req.body.writen_introduction_question,
                  writen_introduction_answer : req.body.writen_introduction_answer,
                 
            }, {new: true})
                .then(student => {
                    res.json(setting.status("Student Updated", true, "updated", student));
                  })
                  .catch(err => {
                      res.json(setting.status("Student Not Found", false, "error", err));
                  });
              }
              else
              {
                  res.json(setting.status("Student Not Found", false, "error", err));
              }
        })
  })


  
// *** POST *** /api/users/userId *** Update student details ***
router.post("/written/:id", (req, res) => {

    const id = req.params.id;
    if(!id)
    {
      return res.status(200).send(setting.status("Studnet Id not found",false,"invalid id",null));
    }

    if(!req.body.writen_introduction)
    {
      return res.status(200).send(setting.status("Answer not found",false,"empty answer",null));
    }

    
    Student.findOne({_id: id})
    .then(student => {
        if(!student)
        {
          setting.status("Student not found",false,"student not found", null)
        }
        else if (student)
        {
          
            Student.findByIdAndUpdate(id, {
                 
                  writen_introduction: req.body.writen_introduction,
                 
            }, {new: true})
                .then(student => {
                    res.json(setting.status("Student Updated", true, "updated", student));
                  })
                  .catch(err => {
                      res.json(setting.status("Student Not Found", false, "error", err));
                  });
              }
              else
              {
                  res.json(setting.status("Student Not Found", false, "error", err));
              }
        })
  })


  // *** POST *** /api/users/userId *** Update student details ***
router.post("/written_exam/:id", (req, res) => {

    const id = req.params.id;
    if(!id)
    {
      return res.status(200).send(setting.status("Studnet Id not found",false,"invalid id",null));
    }

    if(!req.body.written_question)
    {
      return res.status(200).send(setting.status("Question empty",false,"written_question answer",null));
    }

    if(!req.body.written_answer)
    {
      return res.status(200).send(setting.status("Answer empty",false,"written_answer answer",null));
    }

    
    Student.findOne({_id: id})
    .then(student => {
        if(!student)
        {
          setting.status("Student not found",false,"student not found", null)
        }
        else if (student)
        {
          
            Student.findByIdAndUpdate(id, {
                 
                written_question: req.body.written_question,
                written_answer: req.body.written_answer,

                 
            }, {new: true})
                .then(student => {
                    res.json(setting.status("Student Updated", true, "updated", student));
                  })
                  .catch(err => {
                      res.json(setting.status("Student Not Found", false, "error", err));
                  });
              }
              else
              {
                  res.json(setting.status("Student Not Found", false, "error", err));
              }
        })
  })


  // *** POST *** /api/users/userId *** Update student details ***
router.post("/change_status/:id", (req, res) => {

    const id = req.params.id;
    if(!id)
    {
      return res.status(200).send(setting.status("Studnet Id not found",false,"invalid id",null));
    }

    let status=req.body.status;
    
    Student.findOne({_id: id})
    .then(student => {
        if(!student)
        {
          setting.status("Student not found",false,"student not found", null)
        }
        else if (student)
        {

            let approved;
            if(status==="reject")
            {
                approved=false;
            }

            else if(status==="approved")
            {
                approved=true;
            }

          
            Student.findByIdAndUpdate(id, {
                 
                  is_approved: approved,
                 
            }, {new: true})
                .then(student => {
                    res.json(setting.status("Student Updated", true, "updated", student));
                  })
                  .catch(err => {
                      res.json(setting.status("Student Not Found", false, "error", err));
                  });
              }
              else
              {
                  res.json(setting.status("Student Not Found", false, "error", err));
              }
        })
  })


  // *** POST *** /api/users/userId *** Update student details ***
router.post("/video/:id",upload.single('video'), (req, res) => {

    const id = req.params.id;
    if(!id)
    {
      return res.status(200).send(setting.status("Studnet Id not found",false,"invalid id",null));
    }

    // console.log(req.file)
    // console.log(req.file.fieldname + '-'+id+'-' + Date.now())
    console.log(req.file.path)

    // if(!req.body.writen_introduction_answer)
    // {
    //   return res.status(200).send(setting.status("Answer not found",false,"empty answer",null));
    // }

    // if(!req.body.writen_introduction_question)
    // {
    //   return res.status(200).send(setting.status("Question not found",false,"question answer",null));
    // }
  
    console.log(req.file);

    var path;

    if(req.file.path===""||req.file.path==undefined||req.file.path==null)
    {
        path="";

    }else
    {
        //path=req.file.path ;

        var extt=req.file.mimetype;

        if(extt==="video/mp4")
        {
            path=req.file.path ;
        }else
        {
            return res.json(setting.status("Video format not support (Support only MP4)", false, "error", null));
        }
    }
  
    
    Student.findOne({_id: id})
    .then(student => {
        if(!student)
        {
          setting.status("Student not found",false,"student not found", null)
        }
        else if (student)
        {
          
            Student.findByIdAndUpdate(id, {
                 
                  video : path,
                 
          }, {new: true})
                .then(student => {
                    res.json(setting.status("Student Updated", true, "updated", student));
                  })
                  .catch(err => {
                      res.json(setting.status("Student Not Found", false, "error", err));
                  });
              }
              else
              {
                  res.json(setting.status("Student Not Found", false, "error", err));
              }
          })
  })


    // *** POST *** /api/users/userId *** Update student details ***
router.post("/profile/:id",upload.single('image'), (req, res) => {

    const id = req.params.id;
    console.log("mime",req.file.mimetype)

    if(!id)
    {
      return res.status(200).send(setting.status("Studnet Id not found",false,"invalid id",null));
    }

    var path;

    if(req.file.path===""||req.file.path==undefined||req.file.path==null)
    {
        path="";

    }else
    {
        var extt=req.file.mimetype;
        console.log(extt)

        if(extt==="image/jpeg" || extt==="image/jpg"|| extt==="image/png")
        {
            path=req.file.path ;
        }else
        {
            return res.json(setting.status("Image not support (Support only jpg and jpeg)", false, "error", null));
        }
    }
    
    Student.findOne({_id: id})
    .then(student => {
        if(!student)
        {
          setting.status("Student not found",false,"student not found", null)
        }
        else if (student)
        {
          
            Student.findByIdAndUpdate(id, {
                 
                  image : path
                 
          }, {new: true})
                .then(student => {
                    res.json(setting.status("Student Updated", true, "updated", student));
                  })
                  .catch(err => {
                      res.json(setting.status("Student Not Found", false, "error", err));
                  });
              }
              else
              {
                  res.json(setting.status("Student Not Found", false, "error", null));
              }
          })
  })



  // *** POST *** /api/users/userId *** Update student details ***
router.post("/attachment/:id",upload.single('attachment'), (req, res) => {

    const id = req.params.id;
    console.log("mime",req.file.mimetype)
    console.log("mano")
    if(!id)
    {
      return res.status(200).send(setting.status("Studnet Id not found",false,"invalid id",null));
    }

    var path;

    if(req.file.path===""||req.file.path==undefined||req.file.path==null)
    {
        path="";

    }else
    {
        var extt=req.file.mimetype;
        console.log(extt)

        if(extt==="application/pdf")
        {
            path=req.file.path ;
        }else
        {
            return res.json(setting.status("Marksheet not support (Support only PDF) ", false, "error", null));
        }
    }
    
    Student.findOne({_id: id})
    .then(student => {
        if(!student)
        {
          setting.status("Student not found",false,"student not found", null)
        }
        else if (student)
        {
          
            Student.findByIdAndUpdate(id, {
                 
                  attachment : path
                 
          }, {new: true})
                .then(student => {
                    res.json(setting.status("Student Updated", true, "updated", student));
                  })
                  .catch(err => {
                      res.json(setting.status("Student Not Found", false, "error", err));
                  });
              }
              else
              {
                  res.json(setting.status("Student Not Found", false, "error", null));
              }
          })
  })


  // *** POST *** /api/users/userId *** Update student details ***
  router.post("/submit/:id", (req, res) => {

    const id = req.params.id;
   
    if(!id)
    {
      return res.status(200).send(setting.status("Studnet Id not found",false,"invalid id",null));
    }

    Student.findOne({_id: id})
    .then(student => {
        if(!student)
        {
          setting.status("Student not found",false,"student not found", null)
        }
        else if (student)
        {
          
            Student.findByIdAndUpdate(id, {
                 
                is_submited:true
                 
          }, {new: true})
                .then(student => {
                    res.json(setting.status("Student Updated", true, "updated", student));
                  })
                  .catch(err => {
                      res.json(setting.status("Student Not Found", false, "error", err));
                  });
              }
              else
              {
                  res.json(setting.status("Student Not Found", false, "error", null));
              }
          })
  })

// *** POST *** /api/users/userId *** Update student details ***
router.post("/payment_status/:id", (req, res) => {

  const id = req.params.id;
  
  //Find student email
  Student.findById(id, 'fname email', function (err, getMailById)
  {
	  
	  var randPassword = generator.generate({
			length: 8,
			numbers: true
		  });
		  
		  console.log(randPassword);
		  
		  //Hashing password 
		  var hashedPassword = bcrypt.hashSync(randPassword, 10); //Hashing password to unreadable
		  
  Student.findOne({_id: id})
  .then(student => {
      if(!student)
      {
        setting.status("Student not found", false, "student not found", null)
      }
      else if (student)
      {
          Student.findByIdAndUpdate(id, {payment_status: req.body.status, password: hashedPassword}, {new: true})
		  .then(student => {
			  // Not send this instead of send mail
              // res.json(setting.status("Student Payment Sucessfully", true, "updated", null));
			  
			 	  
			  
			  if(student)
                {
                    
                    var html= `<!DOCTYPE html><html><head> <meta charset="utf-8"> <meta http-equiv="x-ua-compatible" content="ie=edge"> <title>Paid</title> <meta name="viewport" content="width=device-width, initial-scale=1"> <style type="text/css"> /** * Google webfonts. Recommended to include the .woff version for cross-client compatibility. */ @media screen{@font-face{font-family: 'Source Sans Pro'; font-style: normal; font-weight: 400; src: local('Source Sans Pro Regular'), local('SourceSansPro-Regular'), url(https://fonts.gstatic.com/s/sourcesanspro/v10/ODelI1aHBYDBqgeIAH2zlBM0YzuT7MdOe03otPbuUS0.woff) format('woff');}@font-face{font-family: 'Source Sans Pro'; font-style: normal; font-weight: 700; src: local('Source Sans Pro Bold'), local('SourceSansPro-Bold'), url(https://fonts.gstatic.com/s/sourcesanspro/v10/toadOcfmlt9b38dHJxOBGFkQc6VGVFSmCnC_l7QZG60.woff) format('woff');}}/** * Avoid browser level font resizing. * 1. Windows Mobile * 2. iOS / OSX */ body, table, td, a{-ms-text-size-adjust: 100%; /* 1 */ -webkit-text-size-adjust: 100%; /* 2 */}/** * Remove extra space added to tables and cells in Outlook. */ table, td{mso-table-rspace: 0pt; mso-table-lspace: 0pt;}/** * Better fluid images in Internet Explorer. */ img{-ms-interpolation-mode: bicubic;}/** * Remove blue links for iOS devices. */ a[x-apple-data-detectors]{font-family: inherit !important; font-size: inherit !important; font-weight: inherit !important; line-height: inherit !important; color: inherit !important; text-decoration: none !important;}/** * Fix centering issues in Android 4.4. */ div[style*="margin: 16px 0;"]{margin: 0 !important;}body{width: 100% !important; height: 100% !important; padding: 0 !important; margin: 0 !important;}/** * Collapse table borders to avoid space between cells. */ table{border-collapse: collapse !important;}a{color: #1a82e2;}img{height: auto; line-height: 100%; text-decoration: none; border: 0; outline: none;}</style></head><body style="background-color: #e9ecef;"> <div class="preheader" style="display: none; max-width: 0; max-height: 0; overflow: hidden; font-size: 1px; line-height: 1px; color: #fff; opacity: 0;"> Successfully paid and login ... </div><table border="0" cellpadding="0" cellspacing="0" width="100%"> <tr> <td align="center" bgcolor="#e9ecef"><!--[if (gte mso 9)|(IE)]> <table align="center" border="0" cellpadding="0" cellspacing="0" width="600"> <tr> <td align="center" valign="top" width="600"><![endif]--> <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;"> <tr> <td align="center" valign="top" style="padding: 36px 24px;"> <a href="` + variables. WEB_LINK+ `" target="_blank" style="display: inline-block;"> <img src="http://172.104.40.142:3000/img/brand/logo-white.png" alt="Logo" border="0" width="200" style="display: block; width: 200px; max-width: 200px; min-width: px;"> </a> </td></tr></table><!--[if (gte mso 9)|(IE)]> </td></tr></table><![endif]--> </td></tr><tr> <td align="center" bgcolor="#e9ecef"><!--[if (gte mso 9)|(IE)]> <table align="center" border="0" cellpadding="0" cellspacing="0" width="600"> <tr> <td align="center" valign="top" width="600"><![endif]--> <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;"> <tr> <td align="left" bgcolor="#ffffff" style="padding: 36px 24px 0; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; border-top: 3px solid #d4dadf;"> <h1 style="margin: 0 0 16px 0; padding: 0 0 16px 0; font-size: 42px; font-weight: bold; letter-spacing: -2px; border-bottom: 1px solid #999" style="margin: 0; font-size: 32px; font-weight: 700; letter-spacing: -1px; line-height: 48px;">Successfully Paid</h1 style="margin: 0 0 16px 0; padding: 0 0 16px 0; font-size: 42px; font-weight: bold; letter-spacing: -2px; border-bottom: 1px solid #999"> </td></tr></table><!--[if (gte mso 9)|(IE)]> </td></tr></table><![endif]--> </td></tr><tr> <td align="center" bgcolor="#e9ecef"><!--[if (gte mso 9)|(IE)]> <table align="center" border="0" cellpadding="0" cellspacing="0" width="600"> <tr> <td align="center" valign="top" width="600"><![endif]--> <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;"> <tr> <td align="left" bgcolor="#ffffff" style="padding: 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; line-height: 24px;"> <p style="margin: 0;">Hi ` + getMailById.fname + `, You have successfully paid for your placements. The following is your login credentials. Change your password after you login.</p><p> <code> email : ` + getMailById.email + `</code> <br/><code> password : ` + randPassword + ` </code> </p></td></tr><tr> <td align="left" bgcolor="#ffffff"> <table border="0" cellpadding="0" cellspacing="0" width="100%"> <tr> <td align="center" bgcolor="#ffffff" style="padding: 12px;"> <table border="0" cellpadding="0" cellspacing="0"> <tr> <td align="center" bgcolor="#1a82e2" style="border-radius: 6px;"> <a href="` + variables. WEB_LINK+ `" target="_blank" style="display: inline-block; padding: 16px 36px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; color: #ffffff; text-decoration: none; border-radius: 6px;">Login</a> </td></tr></table> </td></tr></table> </td></tr></table><!--[if (gte mso 9)|(IE)]> </td></tr></table><![endif]--> </td></tr><tr> <td align="center" bgcolor="#e9ecef" style="padding: 24px;"><!--[if (gte mso 9)|(IE)]> <table align="center" border="0" cellpadding="0" cellspacing="0" width="600"> <tr> <td align="center" valign="top" width="600"><![endif]--> <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;"> <tr> <td align="center" bgcolor="#e9ecef" style="padding: 12px 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 14px; line-height: 20px; color: #666;"> <p style="margin: 0;">CAS SHRC | Bridging Talents and Opportunities</p></td></tr></table><!--[if (gte mso 9)|(IE)]> </td></tr></table><![endif]--> </td></tr></table> </body></html>`
                    
                    sendMail.sendMail(getMailById.email,html,'Successfully Paid')

                    return res.status(200).send(setting.status("Your payment successful, Please Check your Mail", true, "Student Paid", student._id))

                }
               			  
          })
		  }
	  })
	  
	   .catch(err => {res.json(setting.status("Student Not Found", false, "error", err));});	   
  });					
})

// Todo : Pass token to get users details
// Todo : pagination
// *** GET *** /api/users/all *** Retrieve all users' basic details ***
router.get("/", middleware.checkToken, function (req, res, next)
{
    var ObjectId = require('mongodb').ObjectID;


//console.log(getAge(req.body.age))

    var aggregate = Student.aggregate();

    let searchCollege=[];
    let searchCourse=[];

    searchCollege=req.param('searchCollege');
    searchCourse=req.param('searchCourse');
    var approved=req.param('approved');
    var is_submit=req.param('is_submit');
    var page_no = req.param('page');
    var searchName = req.param('searchName');
    var search = req.param('search');
    var searchEmail = req.param('searchEmail');
    var searchContact = req.param('searchContact');
    var paymentStatus = req.param('paymentStatus');
    


    aggregate.sort({"createdAt" : -1})//.match({"deleted":false})
            .lookup({ from: "colleges", localField: "college_id", foreignField: "_id",as: "college_doc"})
            .lookup({ from: "courses", localField: "course_id", foreignField: "_id",as: "course_doc"})
            .lookup({ from: "specializations", localField: "specialization_id_major", foreignField: "_id",as: "major_doc"})
            .lookup({ from: "specializations", localField: "specialization_id_minor", foreignField: "_id",as: "minor_doc"})
            .lookup({ from: "internships", localField: "_id", foreignField: "student_id",as: "internship_doc"})
            .project({password:0})
    if(searchCourse===null || searchCourse ===undefined|| searchCourse ==="")
    {
        
    }else
    {
        if(searchCourse.length>0)
        {
            let y=[];

            for(let x=0;x<searchCourse.length;x++)
            {
                y.push({"course_doc._id":ObjectId(searchCourse[x])})
            }

            console.log(y)

            aggregate.match({$or:y});
        }
    }

    if(searchCollege===null || searchCollege ===undefined|| searchCollege ==="")
    {
        
    }else
    {
        if(searchCollege.length>0)
        {
            let y=[];

            for(let x=0;x<searchCollege.length;x++)
            {
                y.push({"college_doc._id":ObjectId(searchCollege[x])})
            }

            aggregate.match({$or:y});
        }
    }


    if(search===null || search ===undefined)
    {
        
    }else
    {
        aggregate.match({$or:[{"fname":{"$regex": search, "$options": "i"}},{"lname":{"$regex": search, "$options": "i"}}]});
    }

  if(searchEmail===null || searchEmail ===undefined)
    {
        
    }else
    {
        aggregate.match({"email":{"$regex": searchEmail, "$options": "i"}});
    }

  if(searchContact===null || searchContact ===undefined)
    {
        
    }else
    {
        aggregate.match({"contact_no":{"$regex": searchContact, "$options": "i"}});
    }

    if(paymentStatus===null || paymentStatus ===undefined)
    {
        
    }else
    {
        aggregate.match({"payment_status": paymentStatus});
    }

    if(approved===null || approved ===undefined)
    {
        
    }else
    {
        if(approved==="approved")
        {
            aggregate.match({"is_approved":true});
        }
        else if(approved==="not_approved")
        {
            aggregate.match({"is_approved":false});
        }
        
    }

    if(is_submit===null || is_submit ===undefined)
    {
        
    }else
    {
        if(is_submit==="submit")
        {
            aggregate.match({"is_submited":true});
        }
        else if(is_submit==="not_submit")
        {
            aggregate.match({"is_submited":false});
        }
        
    }
    
    if(page_no==0)
    {
        res.send(
        
            setting.status(validation.SHOW,false,"page No error",null)

        );
    }

    var options = { page : page_no, limit : variables.pagecontent}

    Student.aggregatePaginate(aggregate, options, function(err, results, pageCount, count) {
        if(err) 
        {
            
            res.send(
    
                setting.status("Error",false,"error",err)

            );
        }
        else
        { 
        
            res.send(
        
                setting.status("Details'",true,"Data found",{pages:pageCount,count:count,pagesize:parseInt(variables.pagecontent),results})

            );
        
        }
    })    
});


// *** GET *** /api/users/{userId} *** Retrieve one user's basic details ***
router.get("/:id", middleware.checkToken, function (req, res, next)
{
  var ObjectId = require('mongodb').ObjectID;

  const id = req.params.id;
  if(!id)
  {
    return res.status(200).send(setting.status("Student Id not found",false,"invalid id",null));
  }

  let grade;
  Grade.find({student_id:id}).sort( { period_number: 1 } )
        .then(result => {
            console.log(result)
            grade=result;
        }); 

  var aggregate = Student.aggregate();
    aggregate
            .match({_id:ObjectId(id)})
            .lookup({ from: "colleges", localField: "college_id", foreignField: "_id",as: "college_doc"})
            .lookup({ from: "courses", localField: "course_id", foreignField: "_id",as: "course_doc"})
            .lookup({ from: "specializations", localField: "specialization_id_major", foreignField: "_id",as: "major_doc"})
            .lookup({ from: "specializations", localField: "specialization_id_minor", foreignField: "_id",as: "minor_doc"})
            .lookup({ from: "grades", localField: "_id", foreignField: "student_id",as: "grade_doc"})
            .lookup({ from: "internships", localField: "_id", foreignField: "student_id",as: "internship_doc"})


    var options = { page : 1, limit : variables.pagecontent}

    Student.aggregatePaginate(aggregate, options, function(err, results, pageCount, count) {
        
        if(err) 
        {
            
            res.send(
    
                setting.status("Error",false,"error",err)

            );
        }
        else
        { 
            let percentage=100;
            if(results[0].fname==""||results[0].fname==undefined||results[0].fname==null)
            {
                percentage=percentage-5;
            }

            if(results[0].lname==""||results[0].lname==undefined||results[0].lname==null)
            {
                percentage=percentage-7;
            }

            if(results[0].gender==""||results[0].gender==undefined||results[0].gender==null)
            {
                percentage=percentage-7;
            }

            // if(results[0].age==""||results[0].age==undefined||results[0].age==null)
            // {
            //     percentage=percentage-5;
            // }

            if(results[0].contact_no==""||results[0].contact_no==undefined||results[0].contact_no==null)
            {
                percentage=percentage-8;
            }

            if(results[0].email==""||results[0].email==undefined||results[0].email==null)
            {
                percentage=percentage-7;
            }

            if(results[0].current_address==""||results[0].current_address==undefined||results[0].current_address==null)
            {
                percentage=percentage-1;
            }

            if(results[0].permanant_address==""||results[0].permanant_address==undefined||results[0].permanant_address==null)
            {
                percentage=percentage-5;
            }

            // if(results[0].project==""||results[0].project==undefined||results[0].project==null)
            // {
            //     percentage=percentage-7;
            // }

            if(results[0].written_test_result==""||results[0].written_test_result==undefined||results[0].written_test_result==null)
            {
                percentage=percentage-15;
            }

            if(results[0].video==""||results[0].video==undefined||results[0].video==null)
            {
                percentage=percentage-15;
            }

            if(results[0].college_doc.length==0)
            {
                percentage=percentage-7;
            }

            if(results[0].course_doc.length==0)
            {
                percentage=percentage-7;
            }

            if(results[0].grade_doc.length==0)
            {
                percentage=percentage-9;
            }
            //console.log(results[0].fname)
            res.send(
        
                setting.status("Details",true,"Data found",{percentage:percentage,grade_doc:grade,results})

            );
        
        }
    })  
});

router.post("/stu/login", (req, res) =>{

  console.log(req.body);

  if(req.body.email==undefined || req.body.email==null || req.body.email=='') 
  {
      return res.send(
      
        setting.status("Email acnnot be empty",false,"email empty",null)

    );
  }

  if(req.body.password==undefined || req.body.password==null || req.body.password=='') 
  {
    return res.send(
      
        setting.status("Password cannot be empty",false,"password empty",null)

    );
  }

    var email = req.body.email;
    var password = req.body.password;

    Student.findOne({email: email}, function (err, user)
    {
        if (err)
            return res.send(
          
              setting.status("Try Again",false,"Error on server",err)
      
          );
        if (!user)
            return res.send(
          
              setting.status("Authentication false",false,"user not found",null)
      
          );


          if (user===null)
            return res.send(
          
              setting.status("User not find",false,"user not found",null)
      
          );

          console.log(user);
          console.log(req.body.password);
          console.log(user.password)
          

          var passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
          if (!passwordIsValid)
                return res.send(
              
                  setting.status("Wrong Pasword",false,"password wrong",null)
          
              );

              var objLoginStatus = new loginStatus({
                user_id : user._id,
                in_time : Date.now()
                });
    
                objLoginStatus.save((err) =>{
                    if (err)
                    {
                        console.log("New Error : " + err);
                        return next(err);
                    }});


              let authority=[];
              let role='Student';

          Role_authority.find({role_id:user.role})//.populate('role_id')
          .then(result => {


              if(result.length>0)
              {
                //role=result[0].role_id.name;

                  for(var x=0;x<result.length;x++)
                  {
                      authority.push(result[x].authority)
                  }
              }else
              {
                  //return ("authority not found")
              }

            var token = jwt.sign({ id: user._id,name:user.fname,authority:authority,email:user.email,contact_no:user.contact_no,role:user.role,role_name:role  }, config.secretOrKey, {expiresIn: 86400});

            return res.send(
                
                  setting.status("Login success",true,"Authentication true",{"loginToken":token})        
                );
            });
    })


  });

router.post('/change_password/:id', middleware.checkToken,(req, res) => {

    
    var ObjectId = require('mongodb').ObjectID;
    var id=req.params.id;
	
	if(!ObjectId.isValid(id))
		{
			return res.send(
					
				setting.status("Invalid ID",false,"incorrect id",null)

			 );
        }
        
    if(req.body.password==undefined || req.body.password==null || req.body.password=='') 
    {
        
        return res.json(
                
            setting.status("Password cannot be empty",false,"password is empty",null)
    
          );
        
    }

    if(req.body.new_password==undefined || req.body.new_password==null || req.body.new_password=='') 
    {
        return res.json(
                
            setting.status("New Password cannot be empty",false,"new password is empty",null)
    
          );
        
    }

    if(req.body.conform_password==undefined || req.body.conform_password==null || req.body.conform_password=='') 
    {
        return res.json(
                
            setting.status("Conform Password cannot be empty",false,"conform password is empty",null)
    
          );
        
    }

    Student.findOne({
            _id: id
        })
        .then(college => {
            if (college) {


                var passwordIsValid = bcrypt.compareSync(req.body.password, college.password);
                if (!passwordIsValid)
                return res.send(
                    
                        setting.status("Wrong Pasword",false,"password wrong",null)
                
                    );

                let old_password=college.password;
                let coming_password=req.body.password;
                let new_password=req.body.new_password;
                let conform_password=req.body.conform_password;

                let hashedPassword="";


                bcrypt.genSalt(10, (err, salt) =>
                    {
                        bcrypt.hash(new_password, salt, (err, hash) =>
                        {
                            if (err)
                            {
                                throw err;
                            }else
                            {
                                hashedPassword = hash;
                           

                    console.log("pass",hashedPassword)


                    if(new_password===conform_password)
                    {
                        Student.findOneAndUpdate(
                            { _id : id },
                            {$set:{
                            password:hashedPassword}},
                            {runValidators: true, context: 'query' })
                          .then(college =>{
                            return res.json(
            
                                    setting.status("Password Changed",true,"updated",null)
                            
                                );
                          })
                          .catch(err =>{
                                
                                if(err)
                                {
                                    return res.json(
                
                                        setting.status("Error",false,"error",err)
                                
                                      );
                                }
                          });
                        
                    }else
                    {
                        return res.json(
		
                            setting.status("Password Not Match",false,"newpassword not match to conform password",null)
                    
                        );
                    }
                }
                                
                                

            })
    });
                

            } else {
                return res.json(
		
                    setting.status("Employer Not Found",false,"error",err)
            
                  );
            }
        })
})





//*******/users/:userId******DELETE******Delete an account***********
router.delete("/:id",  middleware.checkToken,function(req, res, next)
{

  var ObjectId = require('mongodb').ObjectID;
    var id = req.params.id;
    
    if(!ObjectId.isValid(id))
        {
            return res.send(setting.status("Invalid Id",false,"incorrect id",null));
        }
        
        Student.findByIdAndUpdate(id, {
            status: "deactive",
            }, {new: true})

            .then(user => {
                res.json(setting.status("Deleted", true, "deleted", null));
            })
            .catch(err => {
                res.json(setting.status("Error", false, "error", err));
            });
        }    
  );

router.get('/vacancy/:vacancy_id', middleware.checkToken,(req, res) => {

    console.log("vacancy view")

    // var result=middleware.function1("CAN_VIEW_UNIVERSITIES");
    // if(!result.status)
    // {
    //     return res.send(result);
    // }

    var ObjectId = require('mongodb').ObjectID;
    var id=middleware.get_id();
    var vacancy_id=req.params.vacancy_id;
	
	if(!ObjectId.isValid(vacancy_id))
		{
			return res.send(
					
				setting.status("Invalid id",false,"incorrect id",null)

			 );
		}
    var aggregate = Vacancy.aggregate();

    aggregate
    .match({"_id":ObjectId(vacancy_id)})
   // .match({status:"active"})
    .lookup({ from: "vacancies", localField: "_id", foreignField: "_id",as: "vacancy_doc"})
    .lookup({ from: "employers", localField: "vacancy_doc.employer_id", foreignField: "_id",as: "employer_doc"})
    .lookup({ from: "vacancy_specializations", localField: "_id", foreignField: "vacancy_id",as: "vacancy_spec_doc"})
    .lookup({ from: "specializations", localField: "vacancy_spec_doc.specialization_id", foreignField: "_id",as: "spec_doc"})
    .lookup({ from: "vacancy_courses", localField: "vacancy_spec_doc.vacancy_id", foreignField: "vacancy_id",as: "vacancy_course_doc"})
    .lookup({ from: "courses", localField: "vacancy_course_doc.course_id", foreignField: "_id",as: "course_doc"})
               
    let page_no=req.params.page;                

    if(page_no==0)
    {
        res.send(
        
            setting.status(validation.SHOW,false,"page No error",null)

        );
    }

    var options = { page : page_no, limit : 6}

    Vacancy.aggregatePaginate(aggregate, options, function(err, results, pageCount, count) {
        if(err) 
        {
            console.log(err)
            res.send(
    
                setting.status("Error",false,"error",err)

            );
        }
        else
        { 
        
            res.send(
        
                setting.status("Details'",true,"No data found",{results})

            );
        
        }
    })       
})

router.get('/:id/interview', middleware.checkToken,(req, res) => {

    // var result=middleware.function1("CAN_VIEW_UNIVERSITIES");
    // if(!result.status)
    // {
    //     return res.send(result);
    // }

    var ObjectId = require('mongodb').ObjectID;
    var id=req.params.id;
	
	if(!ObjectId.isValid(id))
		{
			return res.send(
					
				setting.status("Invalid ID",false,"incorrect id",null)

			 );
		}
    var aggregate = Vacancy_Student.aggregate();

    aggregate.match({"student_id":ObjectId(id)})
    .lookup({ from: "vacancies", localField: "vacancy_id", foreignField: "_id",as: "vacancy_doc"})
    .lookup({ from: "employers", localField: "vacancy_doc.employer_id", foreignField: "_id",as: "employer_doc"});;

    let page_no=req.params.page;                

    if(page_no==0)
    {
        res.send(
        
            setting.status(validation.SHOW,false,"page No error",null)

        );
    }

    var options = { page : page_no, limit : 6}

    Vacancy_Student.aggregatePaginate(aggregate, options, function(err, results, pageCount, count) {
        if(err) 
        {
            console.log(err)
            res.send(
    
                setting.status("Error",false,"error",err)

            );
        }
        else
        { 
        
            res.send(
        
                setting.status("Details'",true,"No data found",{results})

            );
        
        }
    })       
})


router.post('/vacancy/:vacancy_id/student/:student_id/interview', middleware.checkToken,(req, res) => {

    // var result=middleware.function1("CAN_ADD_EMPLOYER");
    // if(!result.status)
    // {
    //     return res.send(result);
    // }

    if(req.params.student_id==undefined || req.params.student_id==null || req.params.student_id=='') 
        {
            return res.json(

                setting.status("Student ID cannot be empty",false,"student_id is empty",null)
        
            );
        }

    if(req.params.vacancy_id==undefined || req.params.vacancy_id==null || req.params.vacancy_id=='') 
        {
            return res.json(

                setting.status("Vacancy ID cannot be empty",false,"vacancy_id is empty",null)
        
            );
        }

    if(req.body.accept==undefined || req.body.accept==null || req.body.accept=='') 
        {
            return res.json(

                setting.status("Status cannot be empty",false,"accept is empty",null)
        
            );
        }

    var ObjectId = require('mongodb').ObjectID;

	if(!ObjectId.isValid(req.params.vacancy_id))
        {
            return res.send(
                        
                setting.status("Vacancy ID wrong","False","object id wrong",null)

            );
        }

    if(!ObjectId.isValid(req.params.student_id))
        {
            return res.send(
                        
                setting.status("Student ID wrong","False","object id wrong",null)

            );
        }

    var student_id=req.params.student_id;
    var vacancy_id=req.params.vacancy_id;

    if(req.body.accept==="accept")
    {
        Vacancy_Student.findOneAndUpdate(
            { student_id : student_id,vacancy_id:vacancy_id },
            {$set:{
            status:"active", is_accepted:true
        }},
        {runValidators: true, context: 'query' })
            
            .then(college =>{

                    var html;

                    Student.find({_id:student_id})
                    .then(result => {

                        var email=result[0].email;
                        var name=result[0].fname;

                        Vacancy.find({_id:vacancy_id}).populate("employer_id")
                        .then(result => {
                            console.log(result)
                            var job_title=result[0].job_title;
                            var email_employer=result[0].employer_id.email;

                        
                        html=`<!DOCTYPE html><html><head> <meta charset="utf-8"> <meta http-equiv="x-ua-compatible" content="ie=edge"> 
                        <title>Registed</title> <meta name="viewport" content="width=device-width, initial-scale=1"> <style type="text/css"> /** * Google webfonts. Recommended to include the .woff version for cross-client compatibility. */ @media screen{@font-face{font-family: 'Source Sans Pro'; font-style: normal; font-weight: 400; src: local('Source Sans Pro Regular'), local('SourceSansPro-Regular'), url(https://fonts.gstatic.com/s/sourcesanspro/v10/ODelI1aHBYDBqgeIAH2zlBM0YzuT7MdOe03otPbuUS0.woff) format('woff');}@font-face{font-family: 'Source Sans Pro'; font-style: normal; font-weight: 700; src: local('Source Sans Pro Bold'), local('SourceSansPro-Bold'), url(https://fonts.gstatic.com/s/sourcesanspro/v10/toadOcfmlt9b38dHJxOBGFkQc6VGVFSmCnC_l7QZG60.woff) format('woff');}}/** * Avoid browser level font resizing. * 1. Windows Mobile * 2. iOS / OSX */ body, table, td, a{-ms-text-size-adjust: 100%; /* 1 */ -webkit-text-size-adjust: 100%; /* 2 */}/** * Remove extra space added to tables and cells in Outlook. */ table, td{mso-table-rspace: 0pt; mso-table-lspace: 0pt;}/** * Better fluid images in Internet Explorer. */ img{-ms-interpolation-mode: bicubic;}/** * Remove blue links for iOS devices. */ a[x-apple-data-detectors]{font-family: inherit !important; font-size: inherit !important; font-weight: inherit !important; line-height: inherit !important; color: inherit !important; text-decoration: none !important;}/** * Fix centering issues in Android 4.4. */ div[style*="margin: 16px 0;"]{margin: 0 !important;}body{width: 100% !important; height: 100% !important; padding: 0 !important; margin: 0 !important;}/** * Collapse table borders to avoid space between cells. */ table{border-collapse: collapse !important;}a{color: #1a82e2;}img{height: auto; line-height: 100%; text-decoration: none; border: 0; outline: none;}</style></head><body style="background-color: #e9ecef;"> <div class="preheader" style="display: none; max-width: 0; max-height: 0; overflow: hidden; font-size: 1px; line-height: 1px; color: #fff; opacity: 0;"> 
                        Registered successfully. </div><table border="0" cellpadding="0" cellspacing="0" width="100%"> <tr> <td align="center" bgcolor="#e9ecef"><!--[if (gte mso 9)|(IE)]> <table align="center" border="0" cellpadding="0" cellspacing="0" width="600"> <tr> <td align="center" valign="top" width="600"><![endif]--> <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;"> <tr> <td align="center" valign="top" style="padding: 36px 24px;"> <a href="` + variables. WEB_LINK+ `" target="_blank" style="display: inline-block;"> <img src="http://172.104.40.142:3000/img/brand/logo-white.png" alt="Logo" border="0" width="200" style="display: block; width: 200px; max-width: 200px; min-width: px;"> </a> </td></tr></table><!--[if (gte mso 9)|(IE)]> </td></tr></table><![endif]--> </td></tr><tr> <td align="center" bgcolor="#e9ecef"><!--[if (gte mso 9)|(IE)]> <table align="center" border="0" cellpadding="0" cellspacing="0" width="600"> <tr> <td align="center" valign="top" width="600"><![endif]--> <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;"> <tr> <td align="left" bgcolor="#ffffff" style="padding: 36px 24px 0; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; border-top: 3px solid #d4dadf;"> 
                        <h1 style="margin: 0 0 16px 0; padding: 0 0 16px 0; font-size: 42px; font-weight: bold; letter-spacing: -2px; border-bottom: 1px solid #999" style="margin: 0; font-size: 32px; font-weight: 700; letter-spacing: -1px; line-height: 48px;">
                        Interview accepted</h1 style="margin: 0 0 16px 0; padding: 0 0 16px 0; font-size: 42px; font-weight: bold; letter-spacing: -2px; border-bottom: 1px solid #999"> </td></tr></table><!--[if (gte mso 9)|(IE)]> </td></tr></table><![endif]--> </td></tr><tr> <td align="center" bgcolor="#e9ecef"><!--[if (gte mso 9)|(IE)]> <table align="center" border="0" cellpadding="0" cellspacing="0" width="600"> <tr> <td align="center" valign="top" width="600"><![endif]--> <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;"> <tr> <td align="left" bgcolor="#ffffff" style="padding: 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; line-height: 24px;"> <p style="margin: 0;">
                        Hi you have invite to the post of ` + job_title + `. 
                        </td></tr><tr> <td align="left" bgcolor="#ffffff"> <table border="0" cellpadding="0" cellspacing="0" width="100%"> <tr> <td align="center" bgcolor="#ffffff" style="padding: 12px;"> <table border="0" cellpadding="0" cellspacing="0"> <tr> <td align="center" bgcolor="#1a82e2" style="border-radius: 6px;"> <a href="` + variables. WEB_LINK+ `" target="_blank" style="display: inline-block; padding: 16px 36px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; color: #ffffff; text-decoration: none; border-radius: 6px;">
                        GO TO APPLICATION</a> </td></tr></table> </td></tr></table> </td></tr></table><!--[if (gte mso 9)|(IE)]> </td></tr></table><![endif]--> </td></tr><tr> <td align="center" bgcolor="#e9ecef" style="padding: 24px;"><!--[if (gte mso 9)|(IE)]> <table align="center" border="0" cellpadding="0" cellspacing="0" width="600"> <tr> <td align="center" valign="top" width="600"><![endif]--> <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;"> <tr> <td align="center" bgcolor="#e9ecef" style="padding: 12px 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 14px; line-height: 20px; color: #666;"> 
                        <p style="margin: 0;"><b>CAS SHRC | Bridging Talents and Opportunities</b></p></td></tr></table><!--[if (gte mso 9)|(IE)]> </td></tr></table><![endif]--> </td></tr></table> </body></html>`
                    
                            sendMail.sendMail(email_employer,html,'Job Interview Accepted')
                            
                        });
                    });   
                    
                res.json(

                    setting.status("Succesfully Accepted for interview",true,"invited",college)
            
                    );
            })
            .catch(err => {
                
                if(err)
                {
                    res.json(

                        setting.status("Error",false,"error",err)
                
                        );
                }
            });
    }else
    {
        Vacancy_Student.findOneAndUpdate(
            { student_id : student_id,vacancy_id:vacancy_id },
            {$set:{
            status:"deactive",is_accepted:false
        }},
        {runValidators: true, context: 'query' })
        .then(college =>{
            var html;

                    Student.find({_id:student_id})
                    .then(result => {

                        var email=result[0].email;
                        var name=result[0].fname;

                        Vacancy.find({_id:vacancy_id}).populate("employer_id")
                        .then(result => {
                            console.log(result)
                            var job_title=result[0].job_title;
                            var email_employer=result[0].employer_id.email;

                        
                        html=`<!DOCTYPE html><html><head> <meta charset="utf-8"> <meta http-equiv="x-ua-compatible" content="ie=edge"> 
                        <title>Registed</title> <meta name="viewport" content="width=device-width, initial-scale=1"> <style type="text/css"> /** * Google webfonts. Recommended to include the .woff version for cross-client compatibility. */ @media screen{@font-face{font-family: 'Source Sans Pro'; font-style: normal; font-weight: 400; src: local('Source Sans Pro Regular'), local('SourceSansPro-Regular'), url(https://fonts.gstatic.com/s/sourcesanspro/v10/ODelI1aHBYDBqgeIAH2zlBM0YzuT7MdOe03otPbuUS0.woff) format('woff');}@font-face{font-family: 'Source Sans Pro'; font-style: normal; font-weight: 700; src: local('Source Sans Pro Bold'), local('SourceSansPro-Bold'), url(https://fonts.gstatic.com/s/sourcesanspro/v10/toadOcfmlt9b38dHJxOBGFkQc6VGVFSmCnC_l7QZG60.woff) format('woff');}}/** * Avoid browser level font resizing. * 1. Windows Mobile * 2. iOS / OSX */ body, table, td, a{-ms-text-size-adjust: 100%; /* 1 */ -webkit-text-size-adjust: 100%; /* 2 */}/** * Remove extra space added to tables and cells in Outlook. */ table, td{mso-table-rspace: 0pt; mso-table-lspace: 0pt;}/** * Better fluid images in Internet Explorer. */ img{-ms-interpolation-mode: bicubic;}/** * Remove blue links for iOS devices. */ a[x-apple-data-detectors]{font-family: inherit !important; font-size: inherit !important; font-weight: inherit !important; line-height: inherit !important; color: inherit !important; text-decoration: none !important;}/** * Fix centering issues in Android 4.4. */ div[style*="margin: 16px 0;"]{margin: 0 !important;}body{width: 100% !important; height: 100% !important; padding: 0 !important; margin: 0 !important;}/** * Collapse table borders to avoid space between cells. */ table{border-collapse: collapse !important;}a{color: #1a82e2;}img{height: auto; line-height: 100%; text-decoration: none; border: 0; outline: none;}</style></head><body style="background-color: #e9ecef;"> <div class="preheader" style="display: none; max-width: 0; max-height: 0; overflow: hidden; font-size: 1px; line-height: 1px; color: #fff; opacity: 0;"> 
                        Registered successfully. </div><table border="0" cellpadding="0" cellspacing="0" width="100%"> <tr> <td align="center" bgcolor="#e9ecef"><!--[if (gte mso 9)|(IE)]> <table align="center" border="0" cellpadding="0" cellspacing="0" width="600"> <tr> <td align="center" valign="top" width="600"><![endif]--> <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;"> <tr> <td align="center" valign="top" style="padding: 36px 24px;"> <a href="` + variables. WEB_LINK+ `" target="_blank" style="display: inline-block;"> <img src="http://172.104.40.142:3000/img/brand/logo-white.png" alt="Logo" border="0" width="200" style="display: block; width: 200px; max-width: 200px; min-width: px;"> </a> </td></tr></table><!--[if (gte mso 9)|(IE)]> </td></tr></table><![endif]--> </td></tr><tr> <td align="center" bgcolor="#e9ecef"><!--[if (gte mso 9)|(IE)]> <table align="center" border="0" cellpadding="0" cellspacing="0" width="600"> <tr> <td align="center" valign="top" width="600"><![endif]--> <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;"> <tr> <td align="left" bgcolor="#ffffff" style="padding: 36px 24px 0; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; border-top: 3px solid #d4dadf;"> 
                        <h1 style="margin: 0 0 16px 0; padding: 0 0 16px 0; font-size: 42px; font-weight: bold; letter-spacing: -2px; border-bottom: 1px solid #999" style="margin: 0; font-size: 32px; font-weight: 700; letter-spacing: -1px; line-height: 48px;">
                        Interview reject</h1 style="margin: 0 0 16px 0; padding: 0 0 16px 0; font-size: 42px; font-weight: bold; letter-spacing: -2px; border-bottom: 1px solid #999"> </td></tr></table><!--[if (gte mso 9)|(IE)]> </td></tr></table><![endif]--> </td></tr><tr> <td align="center" bgcolor="#e9ecef"><!--[if (gte mso 9)|(IE)]> <table align="center" border="0" cellpadding="0" cellspacing="0" width="600"> <tr> <td align="center" valign="top" width="600"><![endif]--> <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;"> <tr> <td align="left" bgcolor="#ffffff" style="padding: 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; line-height: 24px;"> <p style="margin: 0;">
                        Hi you have invite to the post of ` + job_title + `. 
                        </td></tr><tr> <td align="left" bgcolor="#ffffff"> <table border="0" cellpadding="0" cellspacing="0" width="100%"> <tr> <td align="center" bgcolor="#ffffff" style="padding: 12px;"> <table border="0" cellpadding="0" cellspacing="0"> <tr> <td align="center" bgcolor="#1a82e2" style="border-radius: 6px;"> <a href="` + variables. WEB_LINK+ `" target="_blank" style="display: inline-block; padding: 16px 36px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; color: #ffffff; text-decoration: none; border-radius: 6px;">
                        GO TO APPLICATION</a> </td></tr></table> </td></tr></table> </td></tr></table><!--[if (gte mso 9)|(IE)]> </td></tr></table><![endif]--> </td></tr><tr> <td align="center" bgcolor="#e9ecef" style="padding: 24px;"><!--[if (gte mso 9)|(IE)]> <table align="center" border="0" cellpadding="0" cellspacing="0" width="600"> <tr> <td align="center" valign="top" width="600"><![endif]--> <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;"> <tr> <td align="center" bgcolor="#e9ecef" style="padding: 12px 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 14px; line-height: 20px; color: #666;"> 
                        <p style="margin: 0;"><b>CAS SHRC | Bridging Talents and Opportunities</b></p></td></tr></table><!--[if (gte mso 9)|(IE)]> </td></tr></table><![endif]--> </td></tr></table> </body></html>`
                    
                            sendMail.sendMail(email_employer,html,'Job Interview Reject')
                            
                        });
                    });   
                    
                res.json(

                    setting.status("Succesfully Accepted for interview",true,"invited",college)
            
                    );
        })
        .catch(err =>{
            console.log(err)
        })
    }
})


function reject_interview(vacancy_id,student_id)
{
    Vacancy_Student.remove({vacancy_id:vacancy_id,student_id:student_id})
    .exec()
    .then(() => {
            console.log("reject")
        })
    .catch(err => {
        console.log(err);
        res.json(

        setting.status("Error",false,"errorr",err)

        );
    }); 
}


router.post('/vacancy/:vacancy_id/student/:student_id/', middleware.checkToken,(req, res) => {

    // var result=middleware.function1("CAN_ADD_EMPLOYER");
    // if(!result.status)
    // {
    //     return res.send(result);
    // }

    if(req.params.student_id==undefined || req.params.student_id==null || req.params.student_id=='') 
        {
            return res.json(

                setting.status("Student ID cannot be empty",false,"student_id is empty",null)
        
            );
        }

    if(req.params.vacancy_id==undefined || req.params.vacancy_id==null || req.params.vacancy_id=='') 
        {
            return res.json(

                setting.status("Vacancy ID cannot be empty",false,"vacancy_id is empty",null)
        
            );
        }

    if(req.body.accept==undefined || req.body.accept==null || req.body.accept=='') 
        {
            return res.json(

                setting.status("Status cannot be empty",false,"accept is empty",null)
        
            );
        }

    var ObjectId = require('mongodb').ObjectID;

	if(!ObjectId.isValid(req.params.vacancy_id))
        {
            return res.send(
                        
                setting.status("Vacancy ID wrong","False","object id wrong",null)

            );
        }

    if(!ObjectId.isValid(req.params.student_id))
        {
            return res.send(
                        
                setting.status("Student ID wrong","False","object id wrong",null)

            );
        }

    var student_id=req.params.student_id;
    var vacancy_id=req.params.vacancy_id;

    if(req.body.accept==="accept")
    {
        Invite.findOneAndUpdate(
            { student_id : student_id,vacancy_id:vacancy_id },
            {$set:{
            //is_accepted:true,
            status:"2"
        }},
        {runValidators: true, context: 'query' })
        .then(college =>{
            console.log("sucess")
        
                    var html;

                    Student.find({_id:student_id})
                    .then(result => {

                        var email=result[0].email;
                        var name=result[0].fname;

                        Vacancy.find({_id:vacancy_id}).populate("employer_id")
                        .then(result => {
                            console.log(result)
                            var job_title=result[0].job_title;
                            var emp_email=result[0].employer_id.email;
                            var emp_name=result[0].employer_id.name;
                        
                            html=`<!DOCTYPE html><html><head> <meta charset="utf-8"> <meta http-equiv="x-ua-compatible" content="ie=edge"> 
                            <title>Registed</title> <meta name="viewport" content="width=device-width, initial-scale=1"> <style type="text/css"> /** * Google webfonts. Recommended to include the .woff version for cross-client compatibility. */ @media screen{@font-face{font-family: 'Source Sans Pro'; font-style: normal; font-weight: 400; src: local('Source Sans Pro Regular'), local('SourceSansPro-Regular'), url(https://fonts.gstatic.com/s/sourcesanspro/v10/ODelI1aHBYDBqgeIAH2zlBM0YzuT7MdOe03otPbuUS0.woff) format('woff');}@font-face{font-family: 'Source Sans Pro'; font-style: normal; font-weight: 700; src: local('Source Sans Pro Bold'), local('SourceSansPro-Bold'), url(https://fonts.gstatic.com/s/sourcesanspro/v10/toadOcfmlt9b38dHJxOBGFkQc6VGVFSmCnC_l7QZG60.woff) format('woff');}}/** * Avoid browser level font resizing. * 1. Windows Mobile * 2. iOS / OSX */ body, table, td, a{-ms-text-size-adjust: 100%; /* 1 */ -webkit-text-size-adjust: 100%; /* 2 */}/** * Remove extra space added to tables and cells in Outlook. */ table, td{mso-table-rspace: 0pt; mso-table-lspace: 0pt;}/** * Better fluid images in Internet Explorer. */ img{-ms-interpolation-mode: bicubic;}/** * Remove blue links for iOS devices. */ a[x-apple-data-detectors]{font-family: inherit !important; font-size: inherit !important; font-weight: inherit !important; line-height: inherit !important; color: inherit !important; text-decoration: none !important;}/** * Fix centering issues in Android 4.4. */ div[style*="margin: 16px 0;"]{margin: 0 !important;}body{width: 100% !important; height: 100% !important; padding: 0 !important; margin: 0 !important;}/** * Collapse table borders to avoid space between cells. */ table{border-collapse: collapse !important;}a{color: #1a82e2;}img{height: auto; line-height: 100%; text-decoration: none; border: 0; outline: none;}</style></head><body style="background-color: #e9ecef;"> <div class="preheader" style="display: none; max-width: 0; max-height: 0; overflow: hidden; font-size: 1px; line-height: 1px; color: #fff; opacity: 0;"> 
                            CAS SHRC: Interview Invitation Accepted </div><table border="0" cellpadding="0" cellspacing="0" width="100%"> <tr> <td align="center" bgcolor="#e9ecef"><!--[if (gte mso 9)|(IE)]> <table align="center" border="0" cellpadding="0" cellspacing="0" width="600"> <tr> <td align="center" valign="top" width="600"><![endif]--> <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;"> <tr> <td align="center" valign="top" style="padding: 36px 24px;"> <a href="http://172.104.40.142:3000" target="_blank" style="display: inline-block;"> <img src="http://172.104.40.142:3000/img/brand/logo-white.png" alt="Logo" border="0" width="200" style="display: block; width: 200px; max-width: 200px; min-width: px;"> </a> </td></tr></table><!--[if (gte mso 9)|(IE)]> </td></tr></table><![endif]--> </td></tr><tr> <td align="center" bgcolor="#e9ecef"><!--[if (gte mso 9)|(IE)]> <table align="center" border="0" cellpadding="0" cellspacing="0" width="600"> <tr> <td align="center" valign="top" width="600"><![endif]--> <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;"> <tr> <td align="left" bgcolor="#ffffff" style="padding: 36px 24px 0; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; border-top: 3px solid #d4dadf;"> 
                            <h1 style="margin: 0 0 16px 0; padding: 0 0 16px 0; font-size: 42px; font-weight: bold; letter-spacing: -2px; border-bottom: 1px solid #999" style="margin: 0; font-size: 32px; font-weight: 700; letter-spacing: -1px; line-height: 48px;">
                            Invitation Accepted</h1 style="margin: 0 0 16px 0; padding: 0 0 16px 0; font-size: 42px; font-weight: bold; letter-spacing: -2px; border-bottom: 1px solid #999"> </td></tr></table><!--[if (gte mso 9)|(IE)]> </td></tr></table><![endif]--> </td></tr><tr> <td align="center" bgcolor="#e9ecef"><!--[if (gte mso 9)|(IE)]> <table align="center" border="0" cellpadding="0" cellspacing="0" width="600"> <tr> <td align="center" valign="top" width="600"><![endif]--> <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;"> <tr> <td align="left" bgcolor="#ffffff" style="padding: 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; line-height: 24px;"> <p style="margin: 0;">
                            Dear ` + emp_name + `, your interview invitation for the position of ` + job_title + ` has been accepted by `+ name +`.
                            You may contact the student via this email: `+ email +`
                            </td></tr><tr> <td align="left" bgcolor="#ffffff"> <table border="0" cellpadding="0" cellspacing="0" width="100%"> <tr> <td align="center" bgcolor="#ffffff" style="padding: 12px;"> <table border="0" cellpadding="0" cellspacing="0"> <tr> <td align="center" bgcolor="#1a82e2" style="border-radius: 6px;"> <a href="http://172.104.40.142:3000" target="_blank" style="display: inline-block; padding: 16px 36px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; color: #ffffff; text-decoration: none; border-radius: 6px;">
                            GO TO APPLICATION</a> </td></tr></table> </td></tr></table> </td></tr></table><!--[if (gte mso 9)|(IE)]> </td></tr></table><![endif]--> </td></tr><tr> <td align="center" bgcolor="#e9ecef" style="padding: 24px;"><!--[if (gte mso 9)|(IE)]> <table align="center" border="0" cellpadding="0" cellspacing="0" width="600"> <tr> <td align="center" valign="top" width="600"><![endif]--> <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;"> <tr> <td align="center" bgcolor="#e9ecef" style="padding: 12px 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 14px; line-height: 20px; color: #666;"> 
                            <p style="margin: 0;"><b>CAS SHRC | Bridging Talents and Opportunities</b></p></td></tr></table><!--[if (gte mso 9)|(IE)]> </td></tr></table><![endif]--> </td></tr></table> </body></html>`
                        
                            // sendMail.sendMail(email,html,'Job Interview','Invite to interview')
                            sendMail.sendMail(emp_email,html,'Interview rejected')
                    
                            
                        });

                        reject_invite(vacancy_id,student_id);

                   
                res.json(

                    setting.status("Succesfully Accepted for invite",true,"invited",college)
            
                    );
                })
                .catch(err =>{
                    console.log(err)
                })
        
            })
            .catch(err => {
                
                if(err)
                {
                    res.json(

                        setting.status("Error",false,"error",err)
                
                        );
                }
            });
    }else
    {
        Invite.findOneAndUpdate(
            { student_id : student_id,vacancy_id:vacancy_id },
            {$set:{
            //is_accepted:false, 
            status:"3"
        }},
        {runValidators: true, context: 'query' })
        .then(college =>{

            var html;

                    Student.find({_id:student_id})
                    .then(result => {

                        var email=result[0].email;
                        var name=result[0].fname;

                        Vacancy.find({_id:vacancy_id}).populate("employer_id")
                        .then(result => {
                            console.log(result)
                            var job_title=result[0].job_title;
                            var emp_email=result[0].employer_id.email;
                            var emp_name=result[0].employer_id.name;

                        
                            html=`<!DOCTYPE html><html><head> <meta charset="utf-8"> <meta http-equiv="x-ua-compatible" content="ie=edge"> 
                            <title>Registed</title> <meta name="viewport" content="width=device-width, initial-scale=1"> <style type="text/css"> /** * Google webfonts. Recommended to include the .woff version for cross-client compatibility. */ @media screen{@font-face{font-family: 'Source Sans Pro'; font-style: normal; font-weight: 400; src: local('Source Sans Pro Regular'), local('SourceSansPro-Regular'), url(https://fonts.gstatic.com/s/sourcesanspro/v10/ODelI1aHBYDBqgeIAH2zlBM0YzuT7MdOe03otPbuUS0.woff) format('woff');}@font-face{font-family: 'Source Sans Pro'; font-style: normal; font-weight: 700; src: local('Source Sans Pro Bold'), local('SourceSansPro-Bold'), url(https://fonts.gstatic.com/s/sourcesanspro/v10/toadOcfmlt9b38dHJxOBGFkQc6VGVFSmCnC_l7QZG60.woff) format('woff');}}/** * Avoid browser level font resizing. * 1. Windows Mobile * 2. iOS / OSX */ body, table, td, a{-ms-text-size-adjust: 100%; /* 1 */ -webkit-text-size-adjust: 100%; /* 2 */}/** * Remove extra space added to tables and cells in Outlook. */ table, td{mso-table-rspace: 0pt; mso-table-lspace: 0pt;}/** * Better fluid images in Internet Explorer. */ img{-ms-interpolation-mode: bicubic;}/** * Remove blue links for iOS devices. */ a[x-apple-data-detectors]{font-family: inherit !important; font-size: inherit !important; font-weight: inherit !important; line-height: inherit !important; color: inherit !important; text-decoration: none !important;}/** * Fix centering issues in Android 4.4. */ div[style*="margin: 16px 0;"]{margin: 0 !important;}body{width: 100% !important; height: 100% !important; padding: 0 !important; margin: 0 !important;}/** * Collapse table borders to avoid space between cells. */ table{border-collapse: collapse !important;}a{color: #1a82e2;}img{height: auto; line-height: 100%; text-decoration: none; border: 0; outline: none;}</style></head><body style="background-color: #e9ecef;"> <div class="preheader" style="display: none; max-width: 0; max-height: 0; overflow: hidden; font-size: 1px; line-height: 1px; color: #fff; opacity: 0;"> 
                            CAS SHRC: Interview Invitation Rejected </div><table border="0" cellpadding="0" cellspacing="0" width="100%"> <tr> <td align="center" bgcolor="#e9ecef"><!--[if (gte mso 9)|(IE)]> <table align="center" border="0" cellpadding="0" cellspacing="0" width="600"> <tr> <td align="center" valign="top" width="600"><![endif]--> <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;"> <tr> <td align="center" valign="top" style="padding: 36px 24px;"> <a href="http://172.104.40.142:3000" target="_blank" style="display: inline-block;"> <img src="http://172.104.40.142:3000/img/brand/logo-white.png" alt="Logo" border="0" width="200" style="display: block; width: 200px; max-width: 200px; min-width: px;"> </a> </td></tr></table><!--[if (gte mso 9)|(IE)]> </td></tr></table><![endif]--> </td></tr><tr> <td align="center" bgcolor="#e9ecef"><!--[if (gte mso 9)|(IE)]> <table align="center" border="0" cellpadding="0" cellspacing="0" width="600"> <tr> <td align="center" valign="top" width="600"><![endif]--> <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;"> <tr> <td align="left" bgcolor="#ffffff" style="padding: 36px 24px 0; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; border-top: 3px solid #d4dadf;"> 
                            <h1 style="margin: 0 0 16px 0; padding: 0 0 16px 0; font-size: 42px; font-weight: bold; letter-spacing: -2px; border-bottom: 1px solid #999" style="margin: 0; font-size: 32px; font-weight: 700; letter-spacing: -1px; line-height: 48px;">
                            Invitation Rejected</h1 style="margin: 0 0 16px 0; padding: 0 0 16px 0; font-size: 42px; font-weight: bold; letter-spacing: -2px; border-bottom: 1px solid #999"> </td></tr></table><!--[if (gte mso 9)|(IE)]> </td></tr></table><![endif]--> </td></tr><tr> <td align="center" bgcolor="#e9ecef"><!--[if (gte mso 9)|(IE)]> <table align="center" border="0" cellpadding="0" cellspacing="0" width="600"> <tr> <td align="center" valign="top" width="600"><![endif]--> <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;"> <tr> <td align="left" bgcolor="#ffffff" style="padding: 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; line-height: 24px;"> <p style="margin: 0;">
                            Dear ` + emp_name + `, your interview invitation for the position of ` + job_title + ` has been rejected by `+ name +`. 
                            You can try more potential candidates through the application.
                            </td></tr><tr> <td align="left" bgcolor="#ffffff"> <table border="0" cellpadding="0" cellspacing="0" width="100%"> <tr> <td align="center" bgcolor="#ffffff" style="padding: 12px;"> <table border="0" cellpadding="0" cellspacing="0"> <tr> <td align="center" bgcolor="#1a82e2" style="border-radius: 6px;"> <a href="http://172.104.40.142:3000" target="_blank" style="display: inline-block; padding: 16px 36px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; color: #ffffff; text-decoration: none; border-radius: 6px;">
                            GO TO APPLICATION</a> </td></tr></table> </td></tr></table> </td></tr></table><!--[if (gte mso 9)|(IE)]> </td></tr></table><![endif]--> </td></tr><tr> <td align="center" bgcolor="#e9ecef" style="padding: 24px;"><!--[if (gte mso 9)|(IE)]> <table align="center" border="0" cellpadding="0" cellspacing="0" width="600"> <tr> <td align="center" valign="top" width="600"><![endif]--> <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;"> <tr> <td align="center" bgcolor="#e9ecef" style="padding: 12px 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 14px; line-height: 20px; color: #666;"> 
                            <p style="margin: 0;"><b>CAS SHRC | Bridging Talents and Opportunities</b></p></td></tr></table><!--[if (gte mso 9)|(IE)]> </td></tr></table><![endif]--> </td></tr></table> </body></html>`
                        
                            // sendMail.sendMail(email,html,'Job Interview','Invite to interview')
                            sendMail.sendMail(emp_email,html,'Interview rejected')
                            
                        });

            reject_invite(vacancy_id,student_id);

            res.json(

                setting.status("Succesfully Reject",true,"reject",null)
    
            );
        })
        .catch(err =>{
            console.log(err)
        })

    })
    }
})

function reject_invite(vacancy_id,student_id)
{
    Invite.remove({vacancy_id:vacancy_id,student_id:student_id})
    .exec()
    .then(() => {
            console.log("reject")
        })
    .catch(err => {
        console.log(err);
        res.json(

        setting.status("Error",false,"errorr",err)

        );
    }); 
}

router.get('/:id/offer', middleware.checkToken,(req, res) => {

    // var result=middleware.function1("CAN_VIEW_UNIVERSITIES");
    // if(!result.status)
    // {
    //     return res.send(result);
    // }

    var ObjectId = require('mongodb').ObjectID;
    var id=req.params.id;
	
	if(!ObjectId.isValid(id))
		{
			return res.send(
					
				setting.status("Invalid ID",false,"incorrect id",null)

			 );
		}
    var aggregate = Offer.aggregate();

    aggregate.match({"student_id":ObjectId(id)})
    .lookup({ from: "vacancies", localField: "vacancy_id", foreignField: "_id",as: "vacancy_doc"});

    let page_no=req.params.page;                

    if(page_no==0)
    {
        res.send(
        
            setting.status(validation.SHOW,false,"page No error",null)

        );
    }

    var options = { page : page_no, limit : 6}

    Vacancy_Student.aggregatePaginate(aggregate, options, function(err, results, pageCount, count) {
        if(err) 
        {
            console.log(err)
            res.send(
    
                setting.status("Error",false,"error",err)

            );
        }
        else
        { 
        
            res.send(
        
                setting.status("Details'",true,"No data found",{results})

            );
        
        }
    })       
})



router.post('/vacancy/:vacancy_id/student/:student_id/offer', middleware.checkToken,(req, res) => {

    // var result=middleware.function1("CAN_ADD_EMPLOYER");
    // if(!result.status)
    // {
    //     return res.send(result);
    // }

    if(req.params.student_id==undefined || req.params.student_id==null || req.params.student_id=='') 
        {
            return res.json(

                setting.status("Student ID cannot be empty",false,"student_id is empty",null)
        
            );
        }

    if(req.params.vacancy_id==undefined || req.params.vacancy_id==null || req.params.vacancy_id=='') 
        {
            return res.json(

                setting.status("Vacancy ID cannot be empty",false,"vacancy_id is empty",null)
        
            );
        }

    if(req.body.accept==undefined || req.body.accept==null || req.body.accept=='') 
        {
            return res.json(

                setting.status("Status cannot be empty",false,"accept is empty",null)
        
            );
        }

    var ObjectId = require('mongodb').ObjectID;

	if(!ObjectId.isValid(req.params.vacancy_id))
        {
            return res.send(
                        
                setting.status("Vacancy ID wrong","False","object id wrong",null)

            );
        }

    if(!ObjectId.isValid(req.params.student_id))
        {
            return res.send(
                        
                setting.status("Student ID wrong","False","object id wrong",null)

            );
        }

    var student_id=req.params.student_id;
    var vacancy_id=req.params.vacancy_id;

    if(req.body.accept==="accept")
    {
        Offer.findOneAndUpdate(
            { student_id : student_id,vacancy_id:vacancy_id },
            {$set:{
            status:"7"
        }},
        {runValidators: true, context: 'query' })
        .then(college =>{
            console.log("sucess")
        
                    var html;

                    Student.find({_id:student_id})
                    .then(result => {

                        var email=result[0].email;
                        var name=result[0].fname;

                        Vacancy.find({_id:vacancy_id}).populate("employer_id")
                        .then(result => {
                            console.log(result)
                            var job_title=result[0].job_title;
                            var email_employer=result[0].employer_id.email;

                        
                        html=`<!DOCTYPE html><html><head> <meta charset="utf-8"> <meta http-equiv="x-ua-compatible" content="ie=edge"> 
                        <title>Registed</title> <meta name="viewport" content="width=device-width, initial-scale=1"> <style type="text/css"> /** * Google webfonts. Recommended to include the .woff version for cross-client compatibility. */ @media screen{@font-face{font-family: 'Source Sans Pro'; font-style: normal; font-weight: 400; src: local('Source Sans Pro Regular'), local('SourceSansPro-Regular'), url(https://fonts.gstatic.com/s/sourcesanspro/v10/ODelI1aHBYDBqgeIAH2zlBM0YzuT7MdOe03otPbuUS0.woff) format('woff');}@font-face{font-family: 'Source Sans Pro'; font-style: normal; font-weight: 700; src: local('Source Sans Pro Bold'), local('SourceSansPro-Bold'), url(https://fonts.gstatic.com/s/sourcesanspro/v10/toadOcfmlt9b38dHJxOBGFkQc6VGVFSmCnC_l7QZG60.woff) format('woff');}}/** * Avoid browser level font resizing. * 1. Windows Mobile * 2. iOS / OSX */ body, table, td, a{-ms-text-size-adjust: 100%; /* 1 */ -webkit-text-size-adjust: 100%; /* 2 */}/** * Remove extra space added to tables and cells in Outlook. */ table, td{mso-table-rspace: 0pt; mso-table-lspace: 0pt;}/** * Better fluid images in Internet Explorer. */ img{-ms-interpolation-mode: bicubic;}/** * Remove blue links for iOS devices. */ a[x-apple-data-detectors]{font-family: inherit !important; font-size: inherit !important; font-weight: inherit !important; line-height: inherit !important; color: inherit !important; text-decoration: none !important;}/** * Fix centering issues in Android 4.4. */ div[style*="margin: 16px 0;"]{margin: 0 !important;}body{width: 100% !important; height: 100% !important; padding: 0 !important; margin: 0 !important;}/** * Collapse table borders to avoid space between cells. */ table{border-collapse: collapse !important;}a{color: #1a82e2;}img{height: auto; line-height: 100%; text-decoration: none; border: 0; outline: none;}</style></head><body style="background-color: #e9ecef;"> <div class="preheader" style="display: none; max-width: 0; max-height: 0; overflow: hidden; font-size: 1px; line-height: 1px; color: #fff; opacity: 0;"> 
                        Registered successfully. </div><table border="0" cellpadding="0" cellspacing="0" width="100%"> <tr> <td align="center" bgcolor="#e9ecef"><!--[if (gte mso 9)|(IE)]> <table align="center" border="0" cellpadding="0" cellspacing="0" width="600"> <tr> <td align="center" valign="top" width="600"><![endif]--> <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;"> <tr> <td align="center" valign="top" style="padding: 36px 24px;"> <a href="` + variables. WEB_LINK+ `" target="_blank" style="display: inline-block;"> <img src="http://172.104.40.142:3000/img/brand/logo-white.png" alt="Logo" border="0" width="200" style="display: block; width: 200px; max-width: 200px; min-width: px;"> </a> </td></tr></table><!--[if (gte mso 9)|(IE)]> </td></tr></table><![endif]--> </td></tr><tr> <td align="center" bgcolor="#e9ecef"><!--[if (gte mso 9)|(IE)]> <table align="center" border="0" cellpadding="0" cellspacing="0" width="600"> <tr> <td align="center" valign="top" width="600"><![endif]--> <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;"> <tr> <td align="left" bgcolor="#ffffff" style="padding: 36px 24px 0; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; border-top: 3px solid #d4dadf;"> 
                        <h1 style="margin: 0 0 16px 0; padding: 0 0 16px 0; font-size: 42px; font-weight: bold; letter-spacing: -2px; border-bottom: 1px solid #999" style="margin: 0; font-size: 32px; font-weight: 700; letter-spacing: -1px; line-height: 48px;">
                        Offer accepted</h1 style="margin: 0 0 16px 0; padding: 0 0 16px 0; font-size: 42px; font-weight: bold; letter-spacing: -2px; border-bottom: 1px solid #999"> </td></tr></table><!--[if (gte mso 9)|(IE)]> </td></tr></table><![endif]--> </td></tr><tr> <td align="center" bgcolor="#e9ecef"><!--[if (gte mso 9)|(IE)]> <table align="center" border="0" cellpadding="0" cellspacing="0" width="600"> <tr> <td align="center" valign="top" width="600"><![endif]--> <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;"> <tr> <td align="left" bgcolor="#ffffff" style="padding: 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; line-height: 24px;"> <p style="margin: 0;">
                        Hi you have invite to the post of ` + job_title + `. 
                        </td></tr><tr> <td align="left" bgcolor="#ffffff"> <table border="0" cellpadding="0" cellspacing="0" width="100%"> <tr> <td align="center" bgcolor="#ffffff" style="padding: 12px;"> <table border="0" cellpadding="0" cellspacing="0"> <tr> <td align="center" bgcolor="#1a82e2" style="border-radius: 6px;"> <a href="` + variables. WEB_LINK+ `" target="_blank" style="display: inline-block; padding: 16px 36px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; color: #ffffff; text-decoration: none; border-radius: 6px;">
                        GO TO APPLICATION</a> </td></tr></table> </td></tr></table> </td></tr></table><!--[if (gte mso 9)|(IE)]> </td></tr></table><![endif]--> </td></tr><tr> <td align="center" bgcolor="#e9ecef" style="padding: 24px;"><!--[if (gte mso 9)|(IE)]> <table align="center" border="0" cellpadding="0" cellspacing="0" width="600"> <tr> <td align="center" valign="top" width="600"><![endif]--> <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;"> <tr> <td align="center" bgcolor="#e9ecef" style="padding: 12px 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 14px; line-height: 20px; color: #666;"> 
                        <p style="margin: 0;"><b>CAS SHRC | Bridging Talents and Opportunities</b></p></td></tr></table><!--[if (gte mso 9)|(IE)]> </td></tr></table><![endif]--> </td></tr></table> </body></html>`
                    
                            sendMail.sendMail(email_employer,html,'Offer Accepted')
                            
                        });

                     
                res.json(

                    setting.status("Succesfully Accepted for invite",true,"invited",college)
            
                    );
                })
                .catch(err =>{
                    console.log(err)
                })
        
            })
            .catch(err => {
                
                if(err)
                {
                    res.json(

                        setting.status("Error",false,"error",err)
                
                        );
                }
            });
    }else
    {
        Offer.findOneAndUpdate(
            { student_id : student_id,vacancy_id:vacancy_id },
            {$set:{
            status:"6"
        }},
        {runValidators: true, context: 'query' })
        .then(college =>{

            var html;

                    Student.find({_id:student_id})
                    .then(result => {

                        var email=result[0].email;
                        var name=result[0].fname;

                        Vacancy.find({_id:vacancy_id}).populate("employer_id")
                        .then(result => {
                            console.log(result)
                            var job_title=result[0].job_title;
                            var email_employer=result[0].employer_id.email;

                        
                        html=`<!DOCTYPE html><html><head> <meta charset="utf-8"> <meta http-equiv="x-ua-compatible" content="ie=edge"> 
                        <title>Registed</title> <meta name="viewport" content="width=device-width, initial-scale=1"> <style type="text/css"> /** * Google webfonts. Recommended to include the .woff version for cross-client compatibility. */ @media screen{@font-face{font-family: 'Source Sans Pro'; font-style: normal; font-weight: 400; src: local('Source Sans Pro Regular'), local('SourceSansPro-Regular'), url(https://fonts.gstatic.com/s/sourcesanspro/v10/ODelI1aHBYDBqgeIAH2zlBM0YzuT7MdOe03otPbuUS0.woff) format('woff');}@font-face{font-family: 'Source Sans Pro'; font-style: normal; font-weight: 700; src: local('Source Sans Pro Bold'), local('SourceSansPro-Bold'), url(https://fonts.gstatic.com/s/sourcesanspro/v10/toadOcfmlt9b38dHJxOBGFkQc6VGVFSmCnC_l7QZG60.woff) format('woff');}}/** * Avoid browser level font resizing. * 1. Windows Mobile * 2. iOS / OSX */ body, table, td, a{-ms-text-size-adjust: 100%; /* 1 */ -webkit-text-size-adjust: 100%; /* 2 */}/** * Remove extra space added to tables and cells in Outlook. */ table, td{mso-table-rspace: 0pt; mso-table-lspace: 0pt;}/** * Better fluid images in Internet Explorer. */ img{-ms-interpolation-mode: bicubic;}/** * Remove blue links for iOS devices. */ a[x-apple-data-detectors]{font-family: inherit !important; font-size: inherit !important; font-weight: inherit !important; line-height: inherit !important; color: inherit !important; text-decoration: none !important;}/** * Fix centering issues in Android 4.4. */ div[style*="margin: 16px 0;"]{margin: 0 !important;}body{width: 100% !important; height: 100% !important; padding: 0 !important; margin: 0 !important;}/** * Collapse table borders to avoid space between cells. */ table{border-collapse: collapse !important;}a{color: #1a82e2;}img{height: auto; line-height: 100%; text-decoration: none; border: 0; outline: none;}</style></head><body style="background-color: #e9ecef;"> <div class="preheader" style="display: none; max-width: 0; max-height: 0; overflow: hidden; font-size: 1px; line-height: 1px; color: #fff; opacity: 0;"> 
                        Registered successfully. </div><table border="0" cellpadding="0" cellspacing="0" width="100%"> <tr> <td align="center" bgcolor="#e9ecef"><!--[if (gte mso 9)|(IE)]> <table align="center" border="0" cellpadding="0" cellspacing="0" width="600"> <tr> <td align="center" valign="top" width="600"><![endif]--> <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;"> <tr> <td align="center" valign="top" style="padding: 36px 24px;"> <a href="` + variables. WEB_LINK+ `" target="_blank" style="display: inline-block;"> <img src="http://172.104.40.142:3000/img/brand/logo-white.png" alt="Logo" border="0" width="200" style="display: block; width: 200px; max-width: 200px; min-width: px;"> </a> </td></tr></table><!--[if (gte mso 9)|(IE)]> </td></tr></table><![endif]--> </td></tr><tr> <td align="center" bgcolor="#e9ecef"><!--[if (gte mso 9)|(IE)]> <table align="center" border="0" cellpadding="0" cellspacing="0" width="600"> <tr> <td align="center" valign="top" width="600"><![endif]--> <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;"> <tr> <td align="left" bgcolor="#ffffff" style="padding: 36px 24px 0; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; border-top: 3px solid #d4dadf;"> 
                        <h1 style="margin: 0 0 16px 0; padding: 0 0 16px 0; font-size: 42px; font-weight: bold; letter-spacing: -2px; border-bottom: 1px solid #999" style="margin: 0; font-size: 32px; font-weight: 700; letter-spacing: -1px; line-height: 48px;">
                        Offer rejected</h1 style="margin: 0 0 16px 0; padding: 0 0 16px 0; font-size: 42px; font-weight: bold; letter-spacing: -2px; border-bottom: 1px solid #999"> </td></tr></table><!--[if (gte mso 9)|(IE)]> </td></tr></table><![endif]--> </td></tr><tr> <td align="center" bgcolor="#e9ecef"><!--[if (gte mso 9)|(IE)]> <table align="center" border="0" cellpadding="0" cellspacing="0" width="600"> <tr> <td align="center" valign="top" width="600"><![endif]--> <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;"> <tr> <td align="left" bgcolor="#ffffff" style="padding: 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; line-height: 24px;"> <p style="margin: 0;">
                        Hi you have invite to the post of ` + job_title + `. 
                        </td></tr><tr> <td align="left" bgcolor="#ffffff"> <table border="0" cellpadding="0" cellspacing="0" width="100%"> <tr> <td align="center" bgcolor="#ffffff" style="padding: 12px;"> <table border="0" cellpadding="0" cellspacing="0"> <tr> <td align="center" bgcolor="#1a82e2" style="border-radius: 6px;"> <a href="` + variables. WEB_LINK+ `" target="_blank" style="display: inline-block; padding: 16px 36px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; color: #ffffff; text-decoration: none; border-radius: 6px;">
                        GO TO APPLICATION</a> </td></tr></table> </td></tr></table> </td></tr></table><!--[if (gte mso 9)|(IE)]> </td></tr></table><![endif]--> </td></tr><tr> <td align="center" bgcolor="#e9ecef" style="padding: 24px;"><!--[if (gte mso 9)|(IE)]> <table align="center" border="0" cellpadding="0" cellspacing="0" width="600"> <tr> <td align="center" valign="top" width="600"><![endif]--> <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;"> <tr> <td align="center" bgcolor="#e9ecef" style="padding: 12px 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 14px; line-height: 20px; color: #666;"> 
                        <p style="margin: 0;"><b>CAS SHRC | Bridging Talents and Opportunities</b></p></td></tr></table><!--[if (gte mso 9)|(IE)]> </td></tr></table><![endif]--> </td></tr></table> </body></html>`
                    
                            sendMail.sendMail(email_employer,html,'Offer Reject')
                            
                        });

            res.json(

                setting.status("Succesfully Reject",true,"reject",null)
    
            );
        })
        .catch(err =>{
            console.log(err)
        })

    })
    }
})


//************************************************************************************************************ */

router.get('/dashboard/page', middleware.checkToken,async (req, res) => {

    var ObjectId = require('mongodb').ObjectID;
    var student_id=middleware.get_id();
        
    var aggregate = Invite.aggregate();

    aggregate.match({"student_id":ObjectId(student_id)})
    .group( {_id: '$status',total: {$sum: 1}})
    .project({status:"$_id",total:"$total"})
    .sort({status:1})
    
    let page_no=req.params.page;                

    if(page_no==0)
    {
        res.send(
        
            setting.status("page error",false,"page No error",null)

        );
    }

    var options = { page : page_no, limit : 6}

    Invite.aggregatePaginate(aggregate, options, function(err, results, pageCount, count) {
        if(err) 
        {
            res.send(
    
                setting.status("Error",false,"error",err)

            );
        }
        else
        { 
        
            res.send(
        
                setting.status("Details'",true,"data found",{results})

            );
        
        }
    })       
})













































router.get('/approvals', middleware.checkToken,(req, res) => {

    // var result=middleware.function1("CAN_VIEW_UNIVERSITIES");
    // if(!result.status)
    // {
    //     return res.send(result);
    // }

    var ObjectId = require('mongodb').ObjectID;
    var id=req.params.id;
	
	if(!ObjectId.isValid(id))
		{
			return res.send(
					
				setting.status("Invalid ID",false,"incorrect id",null)

			 );
        }
        
    var status=req.param['status'];

    var aggregate = Invite.aggregate();

    aggregate.match({"student_id":ObjectId(id)})
    .lookup({ from: "vacancies", localField: "vacancy_id", foreignField: "_id",as: "vacancy_doc"})
    
    if(status===null || status ===undefined ||status==="")
    {
        
    }else
    {
        if(status==="pending")
        {
            aggregate.match({status:"pending"})
            .match({is_approved:true})
        }

        if(status==="approved")
        {
            aggregate.match({status:"approved"})
        }
    }


    let page_no=req.params.page;                

    if(page_no==0)
    {
        res.send(
        
            setting.status(validation.SHOW,false,"page No error",null)

        );
    }

    var options = { page : page_no, limit : 6}

    Invite.aggregatePaginate(aggregate, options, function(err, results, pageCount, count) {
        if(err) 
        {
            console.log(err)
            res.send(
    
                setting.status("Error",false,"error",err)

            );
        }
        else
        { 
        
            res.send(
        
                setting.status("Details'",true,"No data found",{results})

            );
        
        }
    })       
})



router.post('/change_status/vacancy/:vacancy_id/student/:student_id/', middleware.checkToken,(req, res) => {

    // var result=middleware.function1("CAN_ADD_EMPLOYER");
    // if(!result.status)
    // {
    //     return res.send(result);
    // }

    if(req.params.student_id==undefined || req.params.student_id==null || req.params.student_id=='') 
        {
            return res.json(

                setting.status("Student ID cannot be empty",false,"student_id is empty",null)
        
            );
        }

    if(req.params.vacancy_id==undefined || req.params.vacancy_id==null || req.params.vacancy_id=='') 
        {
            return res.json(

                setting.status("Vacancy ID cannot be empty",false,"vacancy_id is empty",null)
        
            );
        }

    if(req.body.accept==undefined || req.body.accept==null || req.body.accept=='') 
        {
            return res.json(

                setting.status("Status cannot be empty",false,"accept is empty",null)
        
            );
        }

    var ObjectId = require('mongodb').ObjectID;

	if(!ObjectId.isValid(req.params.vacancy_id))
        {
            return res.send(
                        
                setting.status("Vacancy ID wrong","False","object id wrong",null)

            );
        }

    if(!ObjectId.isValid(req.params.student_id))
        {
            return res.send(
                        
                setting.status("Student ID wrong","False","object id wrong",null)

            );
        }

    var student_id=req.params.student_id;
    var vacancy_id=req.params.vacancy_id;



    if(req.body.accept==="accept")
    {
        Invite.findOneAndUpdate(
            { student_id : student_id,vacancy_id:vacancy_id },
            {$set:{
            status:"active"
        }},
        {runValidators: true, context: 'query' })
        .then(college =>{
            console.log("sucess")
        
                    var html;

                    Student.find({_id:student_id})
                    .then(result => {

                        var email=result[0].email;
                        var name=result[0].fname;

                        Vacancy.find({_id:vacancy_id}).populate("employer_id")
                        .then(result => {
                            console.log(result)
                            var job_title=result[0].job_title;
                            var email_employer=result[0].employer_id.email;

                        
                        html=`<!DOCTYPE html><html><head> <meta charset="utf-8"> <meta http-equiv="x-ua-compatible" content="ie=edge"> 
                        <title>Registed</title> <meta name="viewport" content="width=device-width, initial-scale=1"> <style type="text/css"> /** * Google webfonts. Recommended to include the .woff version for cross-client compatibility. */ @media screen{@font-face{font-family: 'Source Sans Pro'; font-style: normal; font-weight: 400; src: local('Source Sans Pro Regular'), local('SourceSansPro-Regular'), url(https://fonts.gstatic.com/s/sourcesanspro/v10/ODelI1aHBYDBqgeIAH2zlBM0YzuT7MdOe03otPbuUS0.woff) format('woff');}@font-face{font-family: 'Source Sans Pro'; font-style: normal; font-weight: 700; src: local('Source Sans Pro Bold'), local('SourceSansPro-Bold'), url(https://fonts.gstatic.com/s/sourcesanspro/v10/toadOcfmlt9b38dHJxOBGFkQc6VGVFSmCnC_l7QZG60.woff) format('woff');}}/** * Avoid browser level font resizing. * 1. Windows Mobile * 2. iOS / OSX */ body, table, td, a{-ms-text-size-adjust: 100%; /* 1 */ -webkit-text-size-adjust: 100%; /* 2 */}/** * Remove extra space added to tables and cells in Outlook. */ table, td{mso-table-rspace: 0pt; mso-table-lspace: 0pt;}/** * Better fluid images in Internet Explorer. */ img{-ms-interpolation-mode: bicubic;}/** * Remove blue links for iOS devices. */ a[x-apple-data-detectors]{font-family: inherit !important; font-size: inherit !important; font-weight: inherit !important; line-height: inherit !important; color: inherit !important; text-decoration: none !important;}/** * Fix centering issues in Android 4.4. */ div[style*="margin: 16px 0;"]{margin: 0 !important;}body{width: 100% !important; height: 100% !important; padding: 0 !important; margin: 0 !important;}/** * Collapse table borders to avoid space between cells. */ table{border-collapse: collapse !important;}a{color: #1a82e2;}img{height: auto; line-height: 100%; text-decoration: none; border: 0; outline: none;}</style></head><body style="background-color: #e9ecef;"> <div class="preheader" style="display: none; max-width: 0; max-height: 0; overflow: hidden; font-size: 1px; line-height: 1px; color: #fff; opacity: 0;"> 
                        Registered successfully. </div><table border="0" cellpadding="0" cellspacing="0" width="100%"> <tr> <td align="center" bgcolor="#e9ecef"><!--[if (gte mso 9)|(IE)]> <table align="center" border="0" cellpadding="0" cellspacing="0" width="600"> <tr> <td align="center" valign="top" width="600"><![endif]--> <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;"> <tr> <td align="center" valign="top" style="padding: 36px 24px;"> <a href="` + variables. WEB_LINK+ `" target="_blank" style="display: inline-block;"> <img src="http://172.104.40.142:3000/img/brand/logo-white.png" alt="Logo" border="0" width="200" style="display: block; width: 200px; max-width: 200px; min-width: px;"> </a> </td></tr></table><!--[if (gte mso 9)|(IE)]> </td></tr></table><![endif]--> </td></tr><tr> <td align="center" bgcolor="#e9ecef"><!--[if (gte mso 9)|(IE)]> <table align="center" border="0" cellpadding="0" cellspacing="0" width="600"> <tr> <td align="center" valign="top" width="600"><![endif]--> <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;"> <tr> <td align="left" bgcolor="#ffffff" style="padding: 36px 24px 0; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; border-top: 3px solid #d4dadf;"> 
                        <h1 style="margin: 0 0 16px 0; padding: 0 0 16px 0; font-size: 42px; font-weight: bold; letter-spacing: -2px; border-bottom: 1px solid #999" style="margin: 0; font-size: 32px; font-weight: 700; letter-spacing: -1px; line-height: 48px;">
                        Offer accepted</h1 style="margin: 0 0 16px 0; padding: 0 0 16px 0; font-size: 42px; font-weight: bold; letter-spacing: -2px; border-bottom: 1px solid #999"> </td></tr></table><!--[if (gte mso 9)|(IE)]> </td></tr></table><![endif]--> </td></tr><tr> <td align="center" bgcolor="#e9ecef"><!--[if (gte mso 9)|(IE)]> <table align="center" border="0" cellpadding="0" cellspacing="0" width="600"> <tr> <td align="center" valign="top" width="600"><![endif]--> <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;"> <tr> <td align="left" bgcolor="#ffffff" style="padding: 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; line-height: 24px;"> <p style="margin: 0;">
                        Hi you have invite to the post of ` + job_title + `. 
                        </td></tr><tr> <td align="left" bgcolor="#ffffff"> <table border="0" cellpadding="0" cellspacing="0" width="100%"> <tr> <td align="center" bgcolor="#ffffff" style="padding: 12px;"> <table border="0" cellpadding="0" cellspacing="0"> <tr> <td align="center" bgcolor="#1a82e2" style="border-radius: 6px;"> <a href="` + variables. WEB_LINK+ `" target="_blank" style="display: inline-block; padding: 16px 36px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; color: #ffffff; text-decoration: none; border-radius: 6px;">
                        GO TO APPLICATION</a> </td></tr></table> </td></tr></table> </td></tr></table><!--[if (gte mso 9)|(IE)]> </td></tr></table><![endif]--> </td></tr><tr> <td align="center" bgcolor="#e9ecef" style="padding: 24px;"><!--[if (gte mso 9)|(IE)]> <table align="center" border="0" cellpadding="0" cellspacing="0" width="600"> <tr> <td align="center" valign="top" width="600"><![endif]--> <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;"> <tr> <td align="center" bgcolor="#e9ecef" style="padding: 12px 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 14px; line-height: 20px; color: #666;"> 
                        <p style="margin: 0;"><b>CAS SHRC | Bridging Talents and Opportunities</b></p></td></tr></table><!--[if (gte mso 9)|(IE)]> </td></tr></table><![endif]--> </td></tr></table> </body></html>`
                    
                            sendMail.sendMail(email_employer,html,'Offer Accepted')
                            
                        });

                     
                res.json(

                    setting.status("Succesfully Accepted for invite",true,"invited",college)
            
                    );
                })
                .catch(err =>{
                    console.log(err)
                })
        
            })
            .catch(err => {
                
                if(err)
                {
                    res.json(

                        setting.status("Error",false,"error",err)
                
                        );
                }
            });
    }else
    {
        Offer.findOneAndUpdate(
            { student_id : student_id,vacancy_id:vacancy_id },
            {$set:{
            status:"deactive"
        }},
        {runValidators: true, context: 'query' })
        .then(college =>{

            var html;

                    Student.find({_id:student_id})
                    .then(result => {

                        var email=result[0].email;
                        var name=result[0].fname;

                        Vacancy.find({_id:vacancy_id}).populate("employer_id")
                        .then(result => {
                            console.log(result)
                            var job_title=result[0].job_title;
                            var email_employer=result[0].employer_id.email;

                        
                        html=`<!DOCTYPE html><html><head> <meta charset="utf-8"> <meta http-equiv="x-ua-compatible" content="ie=edge"> 
                        <title>Registed</title> <meta name="viewport" content="width=device-width, initial-scale=1"> <style type="text/css"> /** * Google webfonts. Recommended to include the .woff version for cross-client compatibility. */ @media screen{@font-face{font-family: 'Source Sans Pro'; font-style: normal; font-weight: 400; src: local('Source Sans Pro Regular'), local('SourceSansPro-Regular'), url(https://fonts.gstatic.com/s/sourcesanspro/v10/ODelI1aHBYDBqgeIAH2zlBM0YzuT7MdOe03otPbuUS0.woff) format('woff');}@font-face{font-family: 'Source Sans Pro'; font-style: normal; font-weight: 700; src: local('Source Sans Pro Bold'), local('SourceSansPro-Bold'), url(https://fonts.gstatic.com/s/sourcesanspro/v10/toadOcfmlt9b38dHJxOBGFkQc6VGVFSmCnC_l7QZG60.woff) format('woff');}}/** * Avoid browser level font resizing. * 1. Windows Mobile * 2. iOS / OSX */ body, table, td, a{-ms-text-size-adjust: 100%; /* 1 */ -webkit-text-size-adjust: 100%; /* 2 */}/** * Remove extra space added to tables and cells in Outlook. */ table, td{mso-table-rspace: 0pt; mso-table-lspace: 0pt;}/** * Better fluid images in Internet Explorer. */ img{-ms-interpolation-mode: bicubic;}/** * Remove blue links for iOS devices. */ a[x-apple-data-detectors]{font-family: inherit !important; font-size: inherit !important; font-weight: inherit !important; line-height: inherit !important; color: inherit !important; text-decoration: none !important;}/** * Fix centering issues in Android 4.4. */ div[style*="margin: 16px 0;"]{margin: 0 !important;}body{width: 100% !important; height: 100% !important; padding: 0 !important; margin: 0 !important;}/** * Collapse table borders to avoid space between cells. */ table{border-collapse: collapse !important;}a{color: #1a82e2;}img{height: auto; line-height: 100%; text-decoration: none; border: 0; outline: none;}</style></head><body style="background-color: #e9ecef;"> <div class="preheader" style="display: none; max-width: 0; max-height: 0; overflow: hidden; font-size: 1px; line-height: 1px; color: #fff; opacity: 0;"> 
                        Registered successfully. </div><table border="0" cellpadding="0" cellspacing="0" width="100%"> <tr> <td align="center" bgcolor="#e9ecef"><!--[if (gte mso 9)|(IE)]> <table align="center" border="0" cellpadding="0" cellspacing="0" width="600"> <tr> <td align="center" valign="top" width="600"><![endif]--> <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;"> <tr> <td align="center" valign="top" style="padding: 36px 24px;"> <a href="` + variables. WEB_LINK+ `" target="_blank" style="display: inline-block;"> <img src="http://172.104.40.142:3000/img/brand/logo-white.png" alt="Logo" border="0" width="200" style="display: block; width: 200px; max-width: 200px; min-width: px;"> </a> </td></tr></table><!--[if (gte mso 9)|(IE)]> </td></tr></table><![endif]--> </td></tr><tr> <td align="center" bgcolor="#e9ecef"><!--[if (gte mso 9)|(IE)]> <table align="center" border="0" cellpadding="0" cellspacing="0" width="600"> <tr> <td align="center" valign="top" width="600"><![endif]--> <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;"> <tr> <td align="left" bgcolor="#ffffff" style="padding: 36px 24px 0; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; border-top: 3px solid #d4dadf;"> 
                        <h1 style="margin: 0 0 16px 0; padding: 0 0 16px 0; font-size: 42px; font-weight: bold; letter-spacing: -2px; border-bottom: 1px solid #999" style="margin: 0; font-size: 32px; font-weight: 700; letter-spacing: -1px; line-height: 48px;">
                        Offer rejected</h1 style="margin: 0 0 16px 0; padding: 0 0 16px 0; font-size: 42px; font-weight: bold; letter-spacing: -2px; border-bottom: 1px solid #999"> </td></tr></table><!--[if (gte mso 9)|(IE)]> </td></tr></table><![endif]--> </td></tr><tr> <td align="center" bgcolor="#e9ecef"><!--[if (gte mso 9)|(IE)]> <table align="center" border="0" cellpadding="0" cellspacing="0" width="600"> <tr> <td align="center" valign="top" width="600"><![endif]--> <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;"> <tr> <td align="left" bgcolor="#ffffff" style="padding: 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; line-height: 24px;"> <p style="margin: 0;">
                        Hi you have invite to the post of ` + job_title + `. 
                        </td></tr><tr> <td align="left" bgcolor="#ffffff"> <table border="0" cellpadding="0" cellspacing="0" width="100%"> <tr> <td align="center" bgcolor="#ffffff" style="padding: 12px;"> <table border="0" cellpadding="0" cellspacing="0"> <tr> <td align="center" bgcolor="#1a82e2" style="border-radius: 6px;"> <a href="` + variables. WEB_LINK+ `" target="_blank" style="display: inline-block; padding: 16px 36px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; color: #ffffff; text-decoration: none; border-radius: 6px;">
                        GO TO APPLICATION</a> </td></tr></table> </td></tr></table> </td></tr></table><!--[if (gte mso 9)|(IE)]> </td></tr></table><![endif]--> </td></tr><tr> <td align="center" bgcolor="#e9ecef" style="padding: 24px;"><!--[if (gte mso 9)|(IE)]> <table align="center" border="0" cellpadding="0" cellspacing="0" width="600"> <tr> <td align="center" valign="top" width="600"><![endif]--> <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;"> <tr> <td align="center" bgcolor="#e9ecef" style="padding: 12px 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 14px; line-height: 20px; color: #666;"> 
                        <p style="margin: 0;"><b>CAS SHRC | Bridging Talents and Opportunities</b></p></td></tr></table><!--[if (gte mso 9)|(IE)]> </td></tr></table><![endif]--> </td></tr></table> </body></html>`
                    
                            sendMail.sendMail(email_employer,html,'Offer Reject')
                            
                        });

            res.json(

                setting.status("Succesfully Reject",true,"reject",null)
    
            );
        })
        .catch(err =>{
            console.log(err)
        })

    })
    }
})

router.get('/notification/all', middleware.checkToken,async (req, res) => {

    var ObjectId = require('mongodb').ObjectID;
    var student_id=middleware.get_id();

    console.log(student_id)

    
    let course=[];
    let specialzations=[];
    let suggestion=[];
    let vacancy1=[];
    let student_vacancy=[];
    let mano_array=[];


    var ObjectId = require('mongodb').ObjectID;

        await Student.find({"_id":student_id})
        .then(async result => {
            course.push(result[0].course_id);
            specialzations.push(result[0].specialization_id_major);

            if(result[0].specialization_id_minor== undefined || result[0].specialization_id_minor==null || result[0].specialization_id_minor=="")
            {
                
            }else
            {
                specialzations.push(result[0].specialization_id_minor);
            }

            await Invite.find({"student_id":student_id})
            .then(async result => {
                if(result.length>0)
                {
                    for (let x = 0; x < result.length; x++) {
                        student_vacancy.push(result[x].vacancy_id);                        
                    }
                }
            })

            await console.log("student_vacancy",student_vacancy[0])

            var currentDate = new Date();
            var day = currentDate.getDate();
            var month = currentDate.getMonth() + 1;
            var year = currentDate.getFullYear();
            
            var date = year + "-0" + month + "-" + day;           

            await Vacancy_Course.aggregate([
                { $match:{"course_id":{$in:course}}},
                { $lookup:
                    {
                      from: 'vacancies',
                      localField: 'vacancy_id',
                      foreignField: '_id',
                      as: 'vacancy_doc'
                    }
                  },
                  {
                      $match:{"vacancy_doc.closing_date":{$gte: new Date()}}
                  },
                  {
                    $match:{"vacancy_doc._id":{$nin:student_vacancy}}
                  },
                  
                   { $lookup:
                    {
                      from: 'interests',
                      localField: 'vacancy_id',
                      foreignField: 'vacancy_id',
                      as: 'interest_doc'
                    }
                  },
                  { $lookup:
                    {
                      from: 'student_enrollments',
                      localField: 'interest_doc.student_id',
                      foreignField: '_id',
                      as: 'stu_doc'
                    }
                  },
                  { $lookup:
                    {
                      from: 'interests',
                      localField: 'stu_doc._id',
                      foreignField: 'student_id',
                      as: 'interest_stu_doc'
                    }
                  },
                { $lookup:
                   {
                     from: 'employers',
                     localField: 'vacancy_doc.employer_id',
                     foreignField: '_id',
                     as: 'emp_doc'
                   }
                 },
                
                 {
                    $project:{"vacancy":"$vacancy_doc","employer":"$emp_doc","interest":"$interest_doc","stu_doc":"$stu_doc","interest_stu_doc":"$interest_stu_doc",
                    "is_like": {
                        "$size": {
                          $filter: {
                            input: "$interest_stu_doc",
                            as: "s",
                            cond: { $and: [
                              { $eq: [ "$$s.student_id", ObjectId(student_id) ] },
                              { $eq: [ "$$s.status", "active" ] }
                              ] }
                            
                          }
                        }
                      },
                
                }
                }
                ])
            .then(result => {

                for (let x = 0; x < result.length; x++) 
                {
                  suggestion.push(result[x])                      
                }


            });

            await Vacancy_specialization.aggregate([
                { $match:{"specialization_id":{$in:specialzations}}},
                { $lookup:
                    {
                      from: 'vacancies',
                      localField: 'vacancy_id',
                      foreignField: '_id',
                      as: 'vacancy_doc'
                    }
                  },

                  {
                    $match:{"vacancy_doc._id":{$nin:student_vacancy}}
                  },
                  
                   { $lookup:
                    {
                      from: 'interests',
                      localField: 'vacancy_id',
                      foreignField: 'vacancy_id',
                      as: 'interest_doc'
                    }
                  },

                  { $lookup:
                    {
                      from: 'student_enrollments',
                      localField: 'interest_doc.student_id',
                      foreignField: '_id',
                      as: 'stu_doc'
                    }
                  },
                  { $lookup:
                    {
                      from: 'interests',
                      localField: 'stu_doc._id',
                      foreignField: 'student_id',
                      as: 'interest_stu_doc'
                    }
                  },


                { $lookup:
                   {
                     from: 'employers',
                     localField: 'vacancy_doc.employer_id',
                     foreignField: '_id',
                     as: 'emp_doc'
                   }
                 },
                
                 {
                    $project:{"vacancy":"$vacancy_doc","employer":"$emp_doc","interest":"$interest_doc","stu_doc":"$stu_doc","interest_stu_doc":"$interest_stu_doc",
                    "is_like": {
                        "$size": {
                          $filter: {
                            input: "$interest_stu_doc",
                            as: "s",
                            cond: { $and: [
                              { $eq: [ "$$s.student_id", ObjectId(student_id) ] },
                              { $eq: [ "$$s.status", "active" ] }
                              ] }
                            
                          }
                        }
                      },
                
                }
                }
                ])
            .then(result => {

                console.log("spec",result);

                for (let x = 0; x < result.length; x++) 
                {
                  suggestion.push(result[x])                      
                }


            });

            
            for (let a = 0; a < suggestion.length; a++) {

                var d = new Date(suggestion[a].vacancy[0].closing_date);

                console.log("yestredat",d)

                var d1 = new Date();

                // var cl_date=new Date(n)
                // var noww=new Date(n1)

                console.log("today",d1)

                if(d>d1)
                {
                    mano_array.push(suggestion[a])
                }else
                {
                    console.log("no");
                    
                }
            }

            console.log("mano_array",mano_array)
        }); 


    
	
    var aggregate = Notification.aggregate();

    let vacancy=req.param('vacancy');
    let status=req.param('status');

    aggregate
    .match({"student_id":ObjectId(student_id)})
    .match({"status":{$nin:["2","3","6","8"]}})
    .lookup({ from: "vacancies", localField: "vacancy_id", foreignField: "_id",as: "vacancy_doc"})
    .lookup({ from: "employers", localField: "employer_id", foreignField: "_id",as: "employer_doc"})
    .lookup({ from: "student_enrollments", localField: "student_id", foreignField: "_id",as: "stu_doc"})
    .lookup({ from: "internships", localField: "student_doc._id", foreignField: "student_id",as: "internship_doc"})
    //.lookup({ from: "invites", localField: "vacancy_id", foreignField: "_id",as: "stu_doc"})
    .project({"student_doc.password":0})
    .limit(150)

    if(status===null || status ===undefined ||status==="")
    {
        
    }else
    {
        aggregate.match({"status":status});

    }

    if(vacancy===null || vacancy ===undefined ||vacancy==="")
    {
        
    }else
    {
        aggregate.match({"vacancy_id":ObjectId(vacancy)});

        //change_status(vacancy);

    }
    
    let page_no=req.params.page;                

    if(page_no==0)
    {
        res.send(
        
            setting.status("page error",false,"page No error",null)

        );
    }

    var options = { page : page_no, limit : 6}

    Notification.aggregatePaginate(aggregate, options, function(err, results, pageCount, count) {
        if(err) 
        {
            res.send(
    
                setting.status("Error",false,"error",err)

            );
        }
        else
        { 
        
            res.send(
        
                setting.status("Details'",true,"data found",{vacancy:mano_array,results})

            );
        
        }
    })       
})

function reset_student(email)
{
   
}

function reset_admin(email)
{
    
}




// *** POST *** /api/users/userId *** Update student details ***
router.post("/role/forgetpassword/", (req, res) => {

    console.log("forget passworddldljhkdhkjhfdkj");

    if(req.body.email==undefined || req.body.email==null || req.body.email=='') 
    {
        return res.send(
        
            setting.status("Email cannot be empty'",false,"email is empty",null)

        );
    }
    
    const email = req.body.email;
    const role = req.body.role;

    if(role==="employer")
    {
        console.log("employer ",email);
    
        Employer.find({email:email}, function (err, getMailById)
        {
            
            var randPassword = generator.generate({
                  length: 8,
                  numbers: true
                });
                
                console.log(randPassword);
                
                //Hashing password 
                var hashedPassword = bcrypt.hashSync(randPassword, 10); //Hashing password to unreadable
    
                console.log(getMailById)
    
        if(getMailById.length>0){
                
        Employer.findOne({_id: getMailById[0]._id})
        .then(student => {
            if(!student)
            {
                return res.send(
            
                    setting.status("Employer not found",false,"employer not found",null)
        
                );
    
            }
            else if (student)
            {
                Employer.findByIdAndUpdate(getMailById[0]._id, {password: hashedPassword}, {new: true})
                .then(student => {
                                   
                    if(student)
                      {
                          
                          var html= `<!DOCTYPE html><html><head> <meta charset="utf-8"> <meta http-equiv="x-ua-compatible" content="ie=edge"> <title>Paid</title> <meta name="viewport" content="width=device-width, initial-scale=1"> <style type="text/css"> /** * Google webfonts. Recommended to include the .woff version for cross-client compatibility. */ @media screen{@font-face{font-family: 'Source Sans Pro'; font-style: normal; font-weight: 400; src: local('Source Sans Pro Regular'), local('SourceSansPro-Regular'), url(https://fonts.gstatic.com/s/sourcesanspro/v10/ODelI1aHBYDBqgeIAH2zlBM0YzuT7MdOe03otPbuUS0.woff) format('woff');}@font-face{font-family: 'Source Sans Pro'; font-style: normal; font-weight: 700; src: local('Source Sans Pro Bold'), local('SourceSansPro-Bold'), url(https://fonts.gstatic.com/s/sourcesanspro/v10/toadOcfmlt9b38dHJxOBGFkQc6VGVFSmCnC_l7QZG60.woff) format('woff');}}/** * Avoid browser level font resizing. * 1. Windows Mobile * 2. iOS / OSX */ body, table, td, a{-ms-text-size-adjust: 100%; /* 1 */ -webkit-text-size-adjust: 100%; /* 2 */}/** * Remove extra space added to tables and cells in Outlook. */ table, td{mso-table-rspace: 0pt; mso-table-lspace: 0pt;}/** * Better fluid images in Internet Explorer. */ img{-ms-interpolation-mode: bicubic;}/** * Remove blue links for iOS devices. */ a[x-apple-data-detectors]{font-family: inherit !important; font-size: inherit !important; font-weight: inherit !important; line-height: inherit !important; color: inherit !important; text-decoration: none !important;}/** * Fix centering issues in Android 4.4. */ div[style*="margin: 16px 0;"]{margin: 0 !important;}body{width: 100% !important; height: 100% !important; padding: 0 !important; margin: 0 !important;}/** * Collapse table borders to avoid space between cells. */ table{border-collapse: collapse !important;}a{color: #1a82e2;}img{height: auto; line-height: 100%; text-decoration: none; border: 0; outline: none;}</style></head><body style="background-color: #e9ecef;"> <div class="preheader" style="display: none; max-width: 0; max-height: 0; overflow: hidden; font-size: 1px; line-height: 1px; color: #fff; opacity: 0;"> Reset password succesfully ... </div><table border="0" cellpadding="0" cellspacing="0" width="100%"> <tr> <td align="center" bgcolor="#e9ecef"><!--[if (gte mso 9)|(IE)]> <table align="center" border="0" cellpadding="0" cellspacing="0" width="600"> <tr> <td align="center" valign="top" width="600"><![endif]--> <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;"> <tr> <td align="center" valign="top" style="padding: 36px 24px;"> <a href="` + variables. WEB_LINK+ `" target="_blank" style="display: inline-block;"> <img src="http://172.104.40.142:3000/img/brand/logo-white.png" alt="Logo" border="0" width="200" style="display: block; width: 200px; max-width: 200px; min-width: px;"> </a> </td></tr></table><!--[if (gte mso 9)|(IE)]> </td></tr></table><![endif]--> </td></tr><tr> <td align="center" bgcolor="#e9ecef"><!--[if (gte mso 9)|(IE)]> <table align="center" border="0" cellpadding="0" cellspacing="0" width="600"> <tr> <td align="center" valign="top" width="600"><![endif]--> <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;"> <tr> <td align="left" bgcolor="#ffffff" style="padding: 36px 24px 0; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; border-top: 3px solid #d4dadf;"> <h1 style="margin: 0 0 16px 0; padding: 0 0 16px 0; font-size: 42px; font-weight: bold; letter-spacing: -2px; border-bottom: 1px solid #999" style="margin: 0; font-size: 32px; font-weight: 700; letter-spacing: -1px; line-height: 48px;">Successfully Reset Password</h1 style="margin: 0 0 16px 0; padding: 0 0 16px 0; font-size: 42px; font-weight: bold; letter-spacing: -2px; border-bottom: 1px solid #999"> </td></tr></table><!--[if (gte mso 9)|(IE)]> </td></tr></table><![endif]--> </td></tr><tr> <td align="center" bgcolor="#e9ecef"><!--[if (gte mso 9)|(IE)]> <table align="center" border="0" cellpadding="0" cellspacing="0" width="600"> <tr> <td align="center" valign="top" width="600"><![endif]--> <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;"> <tr> <td align="left" bgcolor="#ffffff" style="padding: 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; line-height: 24px;"> <p style="margin: 0;">Hi ` + getMailById[0].name + `, You have successfully reset your passwod.</p><p> <code> email : ` + getMailById[0].email + `</code> <br/><code> password : ` + randPassword + ` </code> </p></td></tr><tr> <td align="left" bgcolor="#ffffff"> <table border="0" cellpadding="0" cellspacing="0" width="100%"> <tr> <td align="center" bgcolor="#ffffff" style="padding: 12px;"> <table border="0" cellpadding="0" cellspacing="0"> <tr> <td align="center" bgcolor="#1a82e2" style="border-radius: 6px;"> <a href="` + variables. WEB_LINK+ `" target="_blank" style="display: inline-block; padding: 16px 36px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; color: #ffffff; text-decoration: none; border-radius: 6px;">Login</a> </td></tr></table> </td></tr></table> </td></tr></table><!--[if (gte mso 9)|(IE)]> </td></tr></table><![endif]--> </td></tr><tr> <td align="center" bgcolor="#e9ecef" style="padding: 24px;"><!--[if (gte mso 9)|(IE)]> <table align="center" border="0" cellpadding="0" cellspacing="0" width="600"> <tr> <td align="center" valign="top" width="600"><![endif]--> <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;"> <tr> <td align="center" bgcolor="#e9ecef" style="padding: 12px 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 14px; line-height: 20px; color: #666;"> <p style="margin: 0;">CAS SHRC | Bridging Talents and Opportunities</p></td></tr></table><!--[if (gte mso 9)|(IE)]> </td></tr></table><![endif]--> </td></tr></table> </body></html>`
                          
                          sendMail.sendMail(getMailById[0].email,html,'Successfully Reset password')
      
                          return res.status(200).send(setting.status("Your password send successful, Please Check your Mail", true, "reset", null))
      
                      }                
                })
                }
            })
    
        }else
        {
            return res.send(setting.status("Employer Not Found", false, "error", err));
        }   
        });	
    }

    else if(role==="student")
    {
        Student.find({email:email}, function (err, getMailById)
        {
            
            var randPassword = generator.generate({
                  length: 8,
                  numbers: true
                });
                
                console.log(randPassword);
                
                //Hashing password 
                var hashedPassword = bcrypt.hashSync(randPassword, 10); //Hashing password to unreadable
    
        if(getMailById.length>0){
                
        Student.findOne({_id: getMailById[0]._id})
        .then(student => {
            if(!student)
            {
                return res.send(
            
                    setting.status("Student not found",false,"student not found",null)
        
                );
    
            }
            else if (student)
            {
                Student.findByIdAndUpdate(getMailById[0]._id, {password: hashedPassword}, {new: true})
                .then(student => {
                                   
                    if(student)
                      {
                          
                          var html= `<!DOCTYPE html><html><head> <meta charset="utf-8"> <meta http-equiv="x-ua-compatible" content="ie=edge"> <title>Paid</title> <meta name="viewport" content="width=device-width, initial-scale=1"> <style type="text/css"> /** * Google webfonts. Recommended to include the .woff version for cross-client compatibility. */ @media screen{@font-face{font-family: 'Source Sans Pro'; font-style: normal; font-weight: 400; src: local('Source Sans Pro Regular'), local('SourceSansPro-Regular'), url(https://fonts.gstatic.com/s/sourcesanspro/v10/ODelI1aHBYDBqgeIAH2zlBM0YzuT7MdOe03otPbuUS0.woff) format('woff');}@font-face{font-family: 'Source Sans Pro'; font-style: normal; font-weight: 700; src: local('Source Sans Pro Bold'), local('SourceSansPro-Bold'), url(https://fonts.gstatic.com/s/sourcesanspro/v10/toadOcfmlt9b38dHJxOBGFkQc6VGVFSmCnC_l7QZG60.woff) format('woff');}}/** * Avoid browser level font resizing. * 1. Windows Mobile * 2. iOS / OSX */ body, table, td, a{-ms-text-size-adjust: 100%; /* 1 */ -webkit-text-size-adjust: 100%; /* 2 */}/** * Remove extra space added to tables and cells in Outlook. */ table, td{mso-table-rspace: 0pt; mso-table-lspace: 0pt;}/** * Better fluid images in Internet Explorer. */ img{-ms-interpolation-mode: bicubic;}/** * Remove blue links for iOS devices. */ a[x-apple-data-detectors]{font-family: inherit !important; font-size: inherit !important; font-weight: inherit !important; line-height: inherit !important; color: inherit !important; text-decoration: none !important;}/** * Fix centering issues in Android 4.4. */ div[style*="margin: 16px 0;"]{margin: 0 !important;}body{width: 100% !important; height: 100% !important; padding: 0 !important; margin: 0 !important;}/** * Collapse table borders to avoid space between cells. */ table{border-collapse: collapse !important;}a{color: #1a82e2;}img{height: auto; line-height: 100%; text-decoration: none; border: 0; outline: none;}</style></head><body style="background-color: #e9ecef;"> <div class="preheader" style="display: none; max-width: 0; max-height: 0; overflow: hidden; font-size: 1px; line-height: 1px; color: #fff; opacity: 0;"> Reset password succesfully ... </div><table border="0" cellpadding="0" cellspacing="0" width="100%"> <tr> <td align="center" bgcolor="#e9ecef"><!--[if (gte mso 9)|(IE)]> <table align="center" border="0" cellpadding="0" cellspacing="0" width="600"> <tr> <td align="center" valign="top" width="600"><![endif]--> <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;"> <tr> <td align="center" valign="top" style="padding: 36px 24px;"> <a href="` + variables. WEB_LINK+ `" target="_blank" style="display: inline-block;"> <img src="http://172.104.40.142:3000/img/brand/logo-white.png" alt="Logo" border="0" width="200" style="display: block; width: 200px; max-width: 200px; min-width: px;"> </a> </td></tr></table><!--[if (gte mso 9)|(IE)]> </td></tr></table><![endif]--> </td></tr><tr> <td align="center" bgcolor="#e9ecef"><!--[if (gte mso 9)|(IE)]> <table align="center" border="0" cellpadding="0" cellspacing="0" width="600"> <tr> <td align="center" valign="top" width="600"><![endif]--> <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;"> <tr> <td align="left" bgcolor="#ffffff" style="padding: 36px 24px 0; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; border-top: 3px solid #d4dadf;"> <h1 style="margin: 0 0 16px 0; padding: 0 0 16px 0; font-size: 42px; font-weight: bold; letter-spacing: -2px; border-bottom: 1px solid #999" style="margin: 0; font-size: 32px; font-weight: 700; letter-spacing: -1px; line-height: 48px;">Successfully Reset Password</h1 style="margin: 0 0 16px 0; padding: 0 0 16px 0; font-size: 42px; font-weight: bold; letter-spacing: -2px; border-bottom: 1px solid #999"> </td></tr></table><!--[if (gte mso 9)|(IE)]> </td></tr></table><![endif]--> </td></tr><tr> <td align="center" bgcolor="#e9ecef"><!--[if (gte mso 9)|(IE)]> <table align="center" border="0" cellpadding="0" cellspacing="0" width="600"> <tr> <td align="center" valign="top" width="600"><![endif]--> <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;"> <tr> <td align="left" bgcolor="#ffffff" style="padding: 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; line-height: 24px;"> <p style="margin: 0;">Hi ` + getMailById[0].fname + `, You have successfully reset your passwod.</p><p> <code> email : ` + getMailById[0].email + `</code> <br/><code> password : ` + randPassword + ` </code> </p></td></tr><tr> <td align="left" bgcolor="#ffffff"> <table border="0" cellpadding="0" cellspacing="0" width="100%"> <tr> <td align="center" bgcolor="#ffffff" style="padding: 12px;"> <table border="0" cellpadding="0" cellspacing="0"> <tr> <td align="center" bgcolor="#1a82e2" style="border-radius: 6px;"> <a href="` + variables. WEB_LINK+ `" target="_blank" style="display: inline-block; padding: 16px 36px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; color: #ffffff; text-decoration: none; border-radius: 6px;">Login</a> </td></tr></table> </td></tr></table> </td></tr></table><!--[if (gte mso 9)|(IE)]> </td></tr></table><![endif]--> </td></tr><tr> <td align="center" bgcolor="#e9ecef" style="padding: 24px;"><!--[if (gte mso 9)|(IE)]> <table align="center" border="0" cellpadding="0" cellspacing="0" width="600"> <tr> <td align="center" valign="top" width="600"><![endif]--> <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;"> <tr> <td align="center" bgcolor="#e9ecef" style="padding: 12px 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 14px; line-height: 20px; color: #666;"> <p style="margin: 0;">CAS SHRC | Bridging Talents and Opportunities</p></td></tr></table><!--[if (gte mso 9)|(IE)]> </td></tr></table><![endif]--> </td></tr></table> </body></html>`
                          
                          sendMail.sendMail(getMailById[0].email,html,'Successfully Reset password')
      
                          return res.status(200).send(setting.status("Your password send successful, Please Check your Mail", true, "Student Paid", null))
      
                      }                
                })
                }
            })
            
        }else
        {
            return res.send(setting.status("Student Not Found", false, "error", err));
        }
        });	
    }

    else if(role==="admin")
    {
        User.find({email:email}, function (err, getMailById)
    {
        
        var randPassword = generator.generate({
              length: 8,
              numbers: true
            });
            
            console.log(randPassword);
            
            //Hashing password 
            var hashedPassword = bcrypt.hashSync(randPassword, 10); //Hashing password to unreadable

    if(getMailById.length>0){
            
    User.findOne({_id: getMailById[0]._id})
    .then(student => {
        if(!student)
        {
            return res.send(
        
                setting.status("Student not found",false,"student not found",null)
    
            );

        }
        else if (student)
        {
            User.findByIdAndUpdate(getMailById[0]._id, {password: hashedPassword}, {new: true})
            .then(student => {
                               
                if(student)
                  {
                      
                      var html= `<!DOCTYPE html><html><head> <meta charset="utf-8"> <meta http-equiv="x-ua-compatible" content="ie=edge"> <title>Paid</title> <meta name="viewport" content="width=device-width, initial-scale=1"> <style type="text/css"> /** * Google webfonts. Recommended to include the .woff version for cross-client compatibility. */ @media screen{@font-face{font-family: 'Source Sans Pro'; font-style: normal; font-weight: 400; src: local('Source Sans Pro Regular'), local('SourceSansPro-Regular'), url(https://fonts.gstatic.com/s/sourcesanspro/v10/ODelI1aHBYDBqgeIAH2zlBM0YzuT7MdOe03otPbuUS0.woff) format('woff');}@font-face{font-family: 'Source Sans Pro'; font-style: normal; font-weight: 700; src: local('Source Sans Pro Bold'), local('SourceSansPro-Bold'), url(https://fonts.gstatic.com/s/sourcesanspro/v10/toadOcfmlt9b38dHJxOBGFkQc6VGVFSmCnC_l7QZG60.woff) format('woff');}}/** * Avoid browser level font resizing. * 1. Windows Mobile * 2. iOS / OSX */ body, table, td, a{-ms-text-size-adjust: 100%; /* 1 */ -webkit-text-size-adjust: 100%; /* 2 */}/** * Remove extra space added to tables and cells in Outlook. */ table, td{mso-table-rspace: 0pt; mso-table-lspace: 0pt;}/** * Better fluid images in Internet Explorer. */ img{-ms-interpolation-mode: bicubic;}/** * Remove blue links for iOS devices. */ a[x-apple-data-detectors]{font-family: inherit !important; font-size: inherit !important; font-weight: inherit !important; line-height: inherit !important; color: inherit !important; text-decoration: none !important;}/** * Fix centering issues in Android 4.4. */ div[style*="margin: 16px 0;"]{margin: 0 !important;}body{width: 100% !important; height: 100% !important; padding: 0 !important; margin: 0 !important;}/** * Collapse table borders to avoid space between cells. */ table{border-collapse: collapse !important;}a{color: #1a82e2;}img{height: auto; line-height: 100%; text-decoration: none; border: 0; outline: none;}</style></head><body style="background-color: #e9ecef;"> <div class="preheader" style="display: none; max-width: 0; max-height: 0; overflow: hidden; font-size: 1px; line-height: 1px; color: #fff; opacity: 0;"> Reset password succesfully ... </div><table border="0" cellpadding="0" cellspacing="0" width="100%"> <tr> <td align="center" bgcolor="#e9ecef"><!--[if (gte mso 9)|(IE)]> <table align="center" border="0" cellpadding="0" cellspacing="0" width="600"> <tr> <td align="center" valign="top" width="600"><![endif]--> <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;"> <tr> <td align="center" valign="top" style="padding: 36px 24px;"> <a href="` + variables. WEB_LINK+ `" target="_blank" style="display: inline-block;"> <img src="http://172.104.40.142:3000/img/brand/logo-white.png" alt="Logo" border="0" width="200" style="display: block; width: 200px; max-width: 200px; min-width: px;"> </a> </td></tr></table><!--[if (gte mso 9)|(IE)]> </td></tr></table><![endif]--> </td></tr><tr> <td align="center" bgcolor="#e9ecef"><!--[if (gte mso 9)|(IE)]> <table align="center" border="0" cellpadding="0" cellspacing="0" width="600"> <tr> <td align="center" valign="top" width="600"><![endif]--> <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;"> <tr> <td align="left" bgcolor="#ffffff" style="padding: 36px 24px 0; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; border-top: 3px solid #d4dadf;"> <h1 style="margin: 0 0 16px 0; padding: 0 0 16px 0; font-size: 42px; font-weight: bold; letter-spacing: -2px; border-bottom: 1px solid #999" style="margin: 0; font-size: 32px; font-weight: 700; letter-spacing: -1px; line-height: 48px;">Successfully Reset Password</h1 style="margin: 0 0 16px 0; padding: 0 0 16px 0; font-size: 42px; font-weight: bold; letter-spacing: -2px; border-bottom: 1px solid #999"> </td></tr></table><!--[if (gte mso 9)|(IE)]> </td></tr></table><![endif]--> </td></tr><tr> <td align="center" bgcolor="#e9ecef"><!--[if (gte mso 9)|(IE)]> <table align="center" border="0" cellpadding="0" cellspacing="0" width="600"> <tr> <td align="center" valign="top" width="600"><![endif]--> <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;"> <tr> <td align="left" bgcolor="#ffffff" style="padding: 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; line-height: 24px;"> <p style="margin: 0;">Hi ` + getMailById[0].fname + `, You have successfully reset your passwod.</p><p> <code> email : ` + getMailById[0].email + `</code> <br/><code> password : ` + randPassword + ` </code> </p></td></tr><tr> <td align="left" bgcolor="#ffffff"> <table border="0" cellpadding="0" cellspacing="0" width="100%"> <tr> <td align="center" bgcolor="#ffffff" style="padding: 12px;"> <table border="0" cellpadding="0" cellspacing="0"> <tr> <td align="center" bgcolor="#1a82e2" style="border-radius: 6px;"> <a href="` + variables. WEB_LINK+ `" target="_blank" style="display: inline-block; padding: 16px 36px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; color: #ffffff; text-decoration: none; border-radius: 6px;">Login</a> </td></tr></table> </td></tr></table> </td></tr></table><!--[if (gte mso 9)|(IE)]> </td></tr></table><![endif]--> </td></tr><tr> <td align="center" bgcolor="#e9ecef" style="padding: 24px;"><!--[if (gte mso 9)|(IE)]> <table align="center" border="0" cellpadding="0" cellspacing="0" width="600"> <tr> <td align="center" valign="top" width="600"><![endif]--> <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;"> <tr> <td align="center" bgcolor="#e9ecef" style="padding: 12px 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 14px; line-height: 20px; color: #666;"> <p style="margin: 0;">CAS SHRC | Bridging Talents and Opportunities</p></td></tr></table><!--[if (gte mso 9)|(IE)]> </td></tr></table><![endif]--> </td></tr></table> </body></html>`
                      
                      sendMail.sendMail(getMailById[0].email,html,'Successfully Reset password')
  
                      return res.status(200).send(setting.status("Your password send successful, Please Check your Mail", true, "Student Paid", null))
  
                  }                
            })
            }
        })
    }else
    {
        return res.send(setting.status("User Not Found", false, "error", err));
    }   
    });	
    }
			
  })


router.post('/interest/:vacancy_id',middleware.checkToken, (req, res) => {

    // var result=middleware.function1("CAN_ADD_ROLE");
    // if(!result.status)
    // {
    //     return res.send(result);


    // }


    var student_id=middleware.get_id();

    var status=req.body.status;

    var vacancy_id=req.params.vacancy_id;
    console.log("ESgts",vacancy_id)

    if(vacancy_id==undefined || vacancy_id==null || vacancy_id=='') 
        {
            return res.json(

                setting.status("vacancy_id cannot be empty",false,"vacancy_id is empty",null)
        
            );
        }


    if(status==="active")
    {
        Interest.find({vacancy_id:vacancy_id,student_id:student_id})
        .then(result => {

            console.log("ajygyjgjyuh",result)
            if(result.length>0)
            {
                res.json(
            
                    setting.status("already added",true,"created",result)
            
                );
            }
            else
            {
                const newRole = new Interest({
                    vacancy_id: vacancy_id,
                    student_id: student_id,
                    status:"active"
                    
                });
            
                console.log(vacancy_id);
                
            
                newRole.save()
                    .then(role =>{
                        res.json(
            
                            setting.status("Interested",true,"created",role)
                    
                        );
                    })
                    .catch(err => {
                        if(err)
                            {
                                res.json(
            
                                    setting.status("Error",false,"error",err)
                            
                                );
                            }
                        
                    });    
            }

        });

        
    }else
    {
        Interest.remove({vacancy_id:vacancy_id,student_id:student_id})
        .exec()
        .then(() => {
                res.json(
    
                    setting.status("deleted","True","Deleted",null)
    
                );
            })
        .catch(err => {
            console.log(err);
            res.json(
    
            setting.status("Error","False","Error",err)
    
            );
        });    
    }
})


router.get('/cv/full',middleware.checkToken, async (req, res) => {
    var ObjectId = require('mongodb').ObjectID;

   
    var student_id=middleware.get_id();

    console.log(student_id)

    let htmlBody ;
    
    let head = `
    <!DOCTYPE html>
    <html>
    <head>
    <title>Joe Bloggs - Curriculum Vitae</title>
    
    <meta name="viewport" content="width=device-width"/>
    <meta name="description" content="The Curriculum Vitae of Joe Bloggs."/>
    <meta charset="UTF-8"> 
    
    
    
    <!--[if lt IE 9]>
    <script src="//html5shiv.googlecode.com/svn/trunk/html5.js"></script>
    <![endif]-->
    </head>`

    await Student.aggregate([
        {$match:{_id:ObjectId(student_id)}},
        {$lookup:{ from: "colleges", localField: "college_id", foreignField: "_id",as: "college_doc"}},
        {$lookup:{from: "courses", localField: "course_id", foreignField: "_id",as: "course_doc"}},
        {$lookup:{from: "specializations", localField: "specialization_id_major", foreignField: "_id",as: "major_doc"}},
        {$lookup:{ from: "specializations", localField: "specialization_id_minor", foreignField: "_id",as: "minor_doc"}},
        {$lookup:{ from: "grades", localField: "_id", foreignField: "student_id",as: "grade_doc"}},
        {$lookup:{from: "internships", localField: "_id", foreignField: "student_id",as: "internship_doc"}}

    ])
        .then(async result => {

            await console.log(result);

            console.log("result[0].contact_no",result[0].contact_no);
            

            htmlBody = `<body>
            <div>
                <div style="border-width:0;font-style:normal;font-variant:normal;font-weight:normal;font-size:100%;font-family:inherit;line-height:normal;margin-top:0;margin-bottom:0;margin-right:0;margin-left:0;vertical-align:baseline;padding-top:25px;padding-bottom:25px;padding-right:35px;padding-left:35px;border-bottom-width:2px;border-bottom-style:solid;border-bottom-color:#cf8a05;background-color:#ededed;background-image:none;background-repeat:repeat;background-position:top left;background-attachment:scroll;" >
                    <div id="headshot" class="quickFade" style="border-width:0;font-style:normal;font-variant:normal;font-weight:normal;font-size:100%;font-family:inherit;line-height:normal;margin-top:0;margin-bottom:0;margin-left:0;padding-top:0;padding-bottom:0;padding-right:0;padding-left:0;vertical-align:baseline;-webkit-animation-name:reset, fade-in;-webkit-animation-duration:2.5s;-webkit-animation-timing-function:ease-in;-moz-animation-name:reset, fade-in;-moz-animation-duration:2.5s;-moz-animation-timing-function:ease-in;animation-name:reset, fade-in;animation-duration:2.5s;animation-timing-function:ease-in;width:12.5%;float:left;margin-right:30px;" >
                        <img src="http://172.104.40.142:5000/uploads/be0f687468757fc9cd9d074eff0e7664.jpg" alt="Alan Smith" style="border-width:0;font-style:normal;font-variant:normal;font-weight:normal;font-size:100%;font-family:inherit;line-height:normal;margin-top:0;margin-bottom:0;margin-right:0;margin-left:0;padding-top:0;padding-bottom:0;padding-right:0;padding-left:0;vertical-align:baseline;width:100%;height:auto;-webkit-border-radius:50px;border-radius:50%;" />
                    </div>
                    
                    <div id="name" style="border-width:0;font-style:normal;font-variant:normal;font-weight:normal;font-size:100%;font-family:inherit;line-height:normal;margin-top:0;margin-bottom:0;margin-right:0;margin-left:0;padding-top:0;padding-bottom:0;padding-right:0;padding-left:0;vertical-align:baseline;float:left;" >
                        <h1  style="border-width:0;font-style:normal;font-variant:normal;line-height:normal;margin-top:0;margin-right:0;margin-left:0;padding-top:0;padding-bottom:0;padding-right:0;padding-left:0;vertical-align:baseline;-webkit-animation-name:reset, fade-in;-webkit-animation-duration:2.5s;-webkit-animation-timing-function:ease-in;-moz-animation-name:reset, fade-in;-moz-animation-duration:2.5s;-moz-animation-timing-function:ease-in;animation-name:reset, fade-in;animation-duration:2.5s;animation-timing-function:ease-in;-webkit-animation-delay:0, 1s;-moz-animation-delay:0, 1s;animation-delay:0, 1s;font-size:1.8em;font-weight:700;font-family:'Rokkitt', Helvetica, Arial, sans-serif;margin-bottom:-6px;" >GOWTHAMAN GOWTHAMAN</h1>
                        <h2  style="border-width:0;font-style:normal;font-variant:normal;font-weight:normal;line-height:normal;margin-top:0;margin-bottom:0;margin-right:0;padding-top:0;padding-bottom:0;padding-right:0;padding-left:0;vertical-align:baseline;-webkit-animation-name:reset, fade-in;-webkit-animation-duration:2.5s;-webkit-animation-timing-function:ease-in;-moz-animation-name:reset, fade-in;-moz-animation-duration:2.5s;-moz-animation-timing-function:ease-in;animation-name:reset, fade-in;animation-duration:2.5s;animation-timing-function:ease-in;-webkit-animation-delay:0, 1.5s;-moz-animation-delay:0, 1.5s;animation-delay:0, 1.5s;font-size:1.2em;margin-left:2px;font-family:'Rokkitt', Helvetica, Arial, sans-serif;" >gowthamangtm@gmail.com</h2>
                    </div>
                    
                    <div id="contactDetails" class="quickFade delayFour" style="border-width:0;font-style:normal;font-variant:normal;font-weight:normal;font-size:100%;font-family:inherit;line-height:normal;margin-top:0;margin-bottom:0;margin-right:0;margin-left:0;padding-top:0;padding-bottom:0;padding-right:0;padding-left:0;vertical-align:baseline;-webkit-animation-name:reset, fade-in;-webkit-animation-duration:2.5s;-webkit-animation-timing-function:ease-in;-moz-animation-name:reset, fade-in;-moz-animation-duration:2.5s;-moz-animation-timing-function:ease-in;animation-name:reset, fade-in;animation-duration:2.5s;animation-timing-function:ease-in;-webkit-animation-delay:0, 2s;-moz-animation-delay:0, 2s;animation-delay:0, 2s;float:right;" >
                        // <ul style="border-width:0;font-style:normal;font-variant:normal;font-weight:normal;font-family:inherit;line-height:normal;margin-bottom:0;margin-right:0;margin-left:0;padding-top:0;padding-bottom:0;padding-right:0;padding-left:0;vertical-align:baseline;list-style-type:none;font-size:0.9em;margin-top:2px;" >
                        //     <li style="border-width:0;font-style:normal;font-variant:normal;font-weight:normal;font-size:100%;font-family:inherit;line-height:normal;margin-top:0;margin-right:0;margin-left:0;padding-top:0;padding-bottom:0;padding-right:0;padding-left:0;vertical-align:baseline;margin-bottom:3px;color:#444;" >e: <a href="mailto:joe@bloggs.com" target="_blank" style="color:#444;text-decoration:none;-webkit-transition:all .3s ease-in;-moz-transition:all .3s ease-in;-o-transition:all .3s ease-in;-ms-transition:all .3s ease-in;transition:all .3s ease-in;" >joe@bloggs.com</a></li>
                        //     <li style="border-width:0;font-style:normal;font-variant:normal;font-weight:normal;font-size:100%;font-family:inherit;line-height:normal;margin-top:0;margin-right:0;margin-left:0;padding-top:0;padding-bottom:0;padding-right:0;padding-left:0;vertical-align:baseline;margin-bottom:3px;color:#444;" >w: <a href="http://www.bloggs.com" style="color:#444;text-decoration:none;-webkit-transition:all .3s ease-in;-moz-transition:all .3s ease-in;-o-transition:all .3s ease-in;-ms-transition:all .3s ease-in;transition:all .3s ease-in;" >www.bloggs.com</a></li>
                        //     <li style="border-width:0;font-style:normal;font-variant:normal;font-weight:normal;font-size:100%;font-family:inherit;line-height:normal;margin-top:0;margin-right:0;margin-left:0;padding-top:0;padding-bottom:0;padding-right:0;padding-left:0;vertical-align:baseline;margin-bottom:3px;color:#444;" >m: 01234567890</li>
                        // </ul>
                    </div>
                    <div class="clear" style="border-width:0;font-style:normal;font-variant:normal;font-weight:normal;font-size:100%;font-family:inherit;line-height:normal;margin-top:0;margin-bottom:0;margin-right:0;margin-left:0;padding-top:0;padding-bottom:0;padding-right:0;padding-left:0;vertical-align:baseline;clear:both;" ></div>
                </div>
                
                <div id="mainArea" class="quickFade delayFive" style="border-width:0;font-style:normal;font-variant:normal;font-weight:normal;font-size:100%;font-family:inherit;line-height:normal;margin-top:0;margin-bottom:0;margin-right:0;margin-left:0;vertical-align:baseline;-webkit-animation-name:reset, fade-in;-webkit-animation-duration:2.5s;-webkit-animation-timing-function:ease-in;-moz-animation-name:reset, fade-in;-moz-animation-duration:2.5s;-moz-animation-timing-function:ease-in;animation-name:reset, fade-in;animation-duration:2.5s;animation-timing-function:ease-in;-webkit-animation-delay:0, 2.5s;-moz-animation-delay:0, 2.5s;animation-delay:0, 2.5s;padding-top:0;padding-bottom:0;padding-right:40px;padding-left:40px;" >
                    <section style="border-width:0;font-style:normal;font-variant:normal;font-weight:normal;font-size:100%;font-family:inherit;line-height:normal;margin-top:0;margin-bottom:0;margin-right:0;margin-left:0;vertical-align:baseline;display:block;border-top-width:1px;border-top-style:solid;border-top-color:#dedede;padding-top:20px;padding-bottom:0;padding-right:0;padding-left:0;" >
                        <article style="border-width:0;font-style:normal;font-variant:normal;font-weight:normal;font-size:100%;font-family:inherit;line-height:normal;margin-top:0;margin-bottom:0;margin-right:0;margin-left:0;padding-top:0;padding-bottom:0;padding-right:0;padding-left:0;vertical-align:baseline;display:block;" >
                            <div class="sectionTitle" style="border-width:0;font-style:normal;font-variant:normal;font-weight:normal;font-size:100%;font-family:inherit;line-height:normal;margin-top:0;margin-bottom:0;margin-right:0;margin-left:0;padding-top:0;padding-bottom:0;padding-right:0;padding-left:0;vertical-align:baseline;float:left;width:25%;" >
                                <h1 style="border-width:0;font-variant:normal;font-weight:normal;line-height:normal;margin-top:0;margin-bottom:0;margin-right:0;margin-left:0;padding-top:0;padding-bottom:0;padding-right:0;padding-left:0;vertical-align:baseline;font-family:'Rokkitt', Helvetica, Arial, sans-serif;font-size:1.5em;color:#cf8a05;" >Personal Info</h1>
                            </div>
                            
                            <div class="sectionContent" style="border-width:0;font-style:normal;font-variant:normal;font-weight:normal;font-size:100%;font-family:inherit;line-height:normal;margin-top:3px;margin-bottom:0;margin-right:0;margin-left:0;padding-top:0;padding-bottom:0;padding-right:0;padding-left:0;vertical-align:baseline;float:right;width:72.5%;" >
                            <div style="display: flow-root;border-width:0;font-style:normal;font-variant:normal;font-weight:normal;font-family:inherit;margin-top:0;margin-right:0;margin-left:0;padding-top:0;padding-bottom:7px;padding-right:0;padding-left:0;vertical-align:baseline;font-size:1em;line-height:1.4em;margin-bottom:20px;color:#444;">
                            <div style="font-weight: 600;float:left;width:35%;" >Date of Birth:</div>
                            <div style="float:right;width:64%;" >10 Mar 1992</div>
                            </div>
                            <div style="display: flow-root;border-width:0;font-style:normal;font-variant:normal;font-weight:normal;font-family:inherit;margin-top:0;margin-right:0;margin-left:0;padding-top:0;padding-bottom:7px;padding-right:0;padding-left:0;vertical-align:baseline;font-size:1em;line-height:1.4em;margin-bottom:20px;color:#444;">
                            <div style="font-weight: 600;float:left;width:35%;" >Gender:</div>
                            <div style="float:right;width:64%;" >Male</div>
                            </div>
                            <div style="display: flow-root;border-width:0;font-style:normal;font-variant:normal;font-weight:normal;font-family:inherit;margin-top:0;margin-right:0;margin-left:0;padding-top:0;padding-bottom:7px;padding-right:0;padding-left:0;vertical-align:baseline;font-size:1em;line-height:1.4em;margin-bottom:20px;color:#444;">
                            <div style="font-weight: 600;float:left;width:35%;" >Current Address:</div>
                            <div style="float:right;width:64%;" >temple road, kokuvil east, kokuvil,<br/>Arunachal Pradesh,<br/>jaffna,<br/>400000.</div>
                            </div>
                            <div style="display: flow-root;border-width:0;font-style:normal;font-variant:normal;font-weight:normal;font-family:inherit;margin-top:0;margin-right:0;margin-left:0;padding-top:0;padding-bottom:7px;padding-right:0;padding-left:0;vertical-align:baseline;font-size:1em;line-height:1.4em;margin-bottom:20px;color:#444;">
                            <div style="font-weight: 600;float:left;width:35%;" >Permanant Address:</div>
                            <div style="float:right;width:64%;" >temple road, kokuvil east, kokuvil,<br/>Arunachal Pradesh,<br/>jaffna,<br/>400000.</div>
                            </div>
                            </div>
                        </article>
                        <div class="clear" style="border-width:0;font-style:normal;font-variant:normal;font-weight:normal;font-size:100%;font-family:inherit;line-height:normal;margin-top:0;margin-bottom:0;margin-right:0;margin-left:0;padding-top:0;padding-bottom:0;padding-right:0;padding-left:0;vertical-align:baseline;clear:both;" ></div>
                    </section>
                    
                    <section style="border-width:0;font-style:normal;font-variant:normal;font-weight:normal;font-size:100%;font-family:inherit;line-height:normal;margin-top:0;margin-bottom:0;margin-right:0;margin-left:0;vertical-align:baseline;display:block;border-top-width:1px;border-top-style:solid;border-top-color:#dedede;padding-top:20px;padding-bottom:0;padding-right:0;padding-left:0;" >
                        <article style="border-width:0;font-style:normal;font-variant:normal;font-weight:normal;font-size:100%;font-family:inherit;line-height:normal;margin-top:0;margin-bottom:0;margin-right:0;margin-left:0;padding-top:0;padding-bottom:0;padding-right:0;padding-left:0;vertical-align:baseline;display:block;" >
                            <div class="sectionTitle" style="border-width:0;font-style:normal;font-variant:normal;font-weight:normal;font-size:100%;font-family:inherit;line-height:normal;margin-top:0;margin-bottom:0;margin-right:0;margin-left:0;padding-top:0;padding-bottom:0;padding-right:0;padding-left:0;vertical-align:baseline;float:left;width:25%;" >
                                <h1 style="border-width:0;font-variant:normal;font-weight:normal;line-height:normal;margin-top:0;margin-bottom:0;margin-right:0;margin-left:0;padding-top:0;padding-bottom:0;padding-right:0;padding-left:0;vertical-align:baseline;font-family:'Rokkitt', Helvetica, Arial, sans-serif;font-size:1.5em;color:#cf8a05;" >Education</h1>
                            </div>
                            
                            <div class="sectionContent" style="border-width:0;font-style:normal;font-variant:normal;font-weight:normal;font-size:100%;font-family:inherit;line-height:normal;margin-top:3px;margin-bottom:0;margin-right:0;margin-left:0;padding-top:0;padding-bottom:0;padding-right:0;padding-left:0;vertical-align:baseline;float:right;width:72.5%;" >
                            <div style="display: flow-root;border-width:0;font-style:normal;font-variant:normal;font-weight:normal;font-family:inherit;margin-top:0;margin-right:0;margin-left:0;padding-top:0;padding-bottom:7px;padding-right:0;padding-left:0;vertical-align:baseline;font-size:1em;line-height:1.4em;margin-bottom:20px;color:#444;">
                            <div style="font-weight: 600;float:left;width:35%;" >College:</div>
                            <div style="float:right;width:64%;" >sample college</div>
                            </div>
                            <div style="display: flow-root;border-width:0;font-style:normal;font-variant:normal;font-weight:normal;font-family:inherit;margin-top:0;margin-right:0;margin-left:0;padding-top:0;padding-bottom:7px;padding-right:0;padding-left:0;vertical-align:baseline;font-size:1em;line-height:1.4em;margin-bottom:20px;color:#444;">
                            <div style="font-weight: 600;float:left;width:35%;" >Course:</div>
                            <div style="float:right;width:64%;" >Test Course002</div>
                            </div>
                            <div style="display: flow-root;border-width:0;font-style:normal;font-variant:normal;font-weight:normal;font-family:inherit;margin-top:0;margin-right:0;margin-left:0;padding-top:0;padding-bottom:7px;padding-right:0;padding-left:0;vertical-align:baseline;font-size:1em;line-height:1.4em;margin-bottom:20px;color:#444;">
                            <div style="font-weight: 600;float:left;width:35%;" >Specialization(Major):</div>
                            <div style="float:right;width:64%;" >Test Specialisation3</div>
                            </div>
                            <div style="display: flow-root;border-width:0;font-style:normal;font-variant:normal;font-weight:normal;font-family:inherit;margin-top:0;margin-right:0;margin-left:0;padding-top:0;padding-bottom:7px;padding-right:0;padding-left:0;vertical-align:baseline;font-size:1em;line-height:1.4em;margin-bottom:20px;color:#444;">
                            <div style="font-weight: 600;float:left;width:35%;" >Specialization(Minor):</div>
                            <div style="float:right;width:64%;" >Test Specialisation2</div>
                            </div>
                            <div style="display: flow-root;border-width:0;font-style:normal;font-variant:normal;font-weight:normal;font-family:inherit;margin-top:0;margin-right:0;margin-left:0;padding-top:0;padding-bottom:7px;padding-right:0;padding-left:0;vertical-align:baseline;font-size:1em;line-height:1.4em;margin-bottom:20px;color:#444;">
                            <div style="font-weight: 600;float:left;width:35%;" >Academic Duration:</div>
                            <div style="float:right;width:64%;" >2017 - 2018</div>
                            </div>
                            
                            <div style="display: flow-root;border-width:0;font-style:normal;font-variant:normal;font-weight:normal;font-family:inherit;margin-top:0;margin-right:0;margin-left:0;padding-top:0;padding-bottom:7px;padding-right:0;padding-left:0;vertical-align:baseline;font-size:1em;line-height:1.4em;margin-bottom:20px;color:#444;">
                            <div style="font-weight: 600;float:left;width:35%;" >Grades:</div>
                            <div style="float:right;width:64%;" >
                            <div class="divTable" style="width: 100%;display: table;" >
                                <div class="divTableBody" style="display: table-row-group;" >
                                <div style="display: table-row;">
                                <div class="divTableCell" style="border: 1px solid #999999;display: table-cell;padding: 3px 10px;">Semister 1:</div>
                                <div class="divTableCell" style="border: 1px solid #999999;display: table-cell;padding: 3px 10px;">5.6</div>
                                </div>
                                <div style="display: table-row;">
                                <div class="divTableCell" style="border: 1px solid #999999;display: table-cell;padding: 3px 10px;">Semister 1:</div>
                                <div class="divTableCell" style="border: 1px solid #999999;display: table-cell;padding: 3px 10px;">5.6</div>
                                </div>
                                <div style="display: table-row;">
                                <div class="divTableCell" style="border: 1px solid #999999;display: table-cell;padding: 3px 10px;">Semister 1:</div>
                                <div class="divTableCell" style="border: 1px solid #999999;display: table-cell;padding: 3px 10px;">5.6</div>
                                </div>
                                <div style="display: table-row;">
                                <div class="divTableCell" style="border: 1px solid #999999;display: table-cell;padding: 3px 10px;">Semister 1:</div>
                                <div class="divTableCell" style="border: 1px solid #999999;display: table-cell;padding: 3px 10px;">5.6</div>
                                </div>
                                </div>
                            </div>
                            
                            </div>
                            </div>
                            <div style="display: flow-root;border-width:0;font-style:normal;font-variant:normal;font-weight:normal;font-family:inherit;margin-top:0;margin-right:0;margin-left:0;padding-top:0;padding-bottom:7px;padding-right:0;padding-left:0;vertical-align:baseline;font-size:1em;line-height:1.4em;margin-bottom:20px;color:#444;">
                            <div style="font-weight: 600;float:left;width:35%;" >Overall Grade:</div>
                            <div style="float:right;width:64%;" >5.6</div>
                            </div>
                            
                            </div>
                        </article>
                        <div class="clear" style="border-width:0;font-style:normal;font-variant:normal;font-weight:normal;font-size:100%;font-family:inherit;line-height:normal;margin-top:0;margin-bottom:0;margin-right:0;margin-left:0;padding-top:0;padding-bottom:0;padding-right:0;padding-left:0;vertical-align:baseline;clear:both;" ></div>
                    </section>
                </div>
            </div>
            </body>
            </html> `
          
        }); 

    let htmlOptions = {
      format: 'A4',
      border: '1cm'
    }

    let downloadPath = `${__dirname.split('controllers')[0]}/download/`+student_id+`.pdf`;

    Student.findOne({_id: student_id})
    .then(student => {

        Student.findByIdAndUpdate(student_id, {
                
                pdf : "download/"+student_id+".pdf",
                
        }, {new: true})
            .then(student => {
                console.log("updated")
                })
                .catch(err => {
                console.log("error");
                });
            
        })

    await pdf.create(htmlBody, htmlOptions).toFile(downloadPath, (error, success) => {

      if (error)
        res.json({ data: error })
      else
        res.json({ data: "download/"+student_id+".pdf" })

    })

})

router.get('/enroll/pending', middleware.checkToken,(req, res) => {

    var aggregate = Other_enroll.aggregate();

    var page_no = req.param('page');
    var search = req.param('search');
   

    aggregate.sort({"createdAt" : -1})
    
    if(search===null || search ===undefined)
    {
        
    }else
    {
        aggregate.match({"name":{"$regex": search, "$options": "i"}});
    }

    if(page_no==0)
    {
        res.send(
        
            setting.status(validation.SHOW,false,"page No error",null)

        );
    }

    var options = { page : page_no, limit : parseInt(variables.pagecontent)}

    Other_enroll.aggregatePaginate(aggregate, options, function(err, results, pageCount, count) {
        if(err) 
        {
            
            res.send(
    
                setting.status("Error",false,"error",err)

            );
        }
        else
        { 
        
            res.send(
        
                setting.status("Details'",true,"No data found",{pages:pageCount,count:count,pagesize:parseInt(variables.pagecontent),results})

            );
        
        }
    })       
})


router.post('/enroll/approve/:stu_id', middleware.checkToken,(req, res) => {

    const stu_id = req.params.stu_id;

    Other_enroll.findOne({_id: stu_id})
        .then(student =>{
            if(student)
            {
                let html=`<!DOCTYPE html><html><head> <meta charset="utf-8"> <meta http-equiv="x-ua-compatible" content="ie=edge"> 
                <title>Registed</title> <meta name="viewport" content="width=device-width, initial-scale=1"> <style type="text/css"> /** * Google webfonts. Recommended to include the .woff version for cross-client compatibility. */ @media screen{@font-face{font-family: 'Source Sans Pro'; font-style: normal; font-weight: 400; src: local('Source Sans Pro Regular'), local('SourceSansPro-Regular'), url(https://fonts.gstatic.com/s/sourcesanspro/v10/ODelI1aHBYDBqgeIAH2zlBM0YzuT7MdOe03otPbuUS0.woff) format('woff');}@font-face{font-family: 'Source Sans Pro'; font-style: normal; font-weight: 700; src: local('Source Sans Pro Bold'), local('SourceSansPro-Bold'), url(https://fonts.gstatic.com/s/sourcesanspro/v10/toadOcfmlt9b38dHJxOBGFkQc6VGVFSmCnC_l7QZG60.woff) format('woff');}}/** * Avoid browser level font resizing. * 1. Windows Mobile * 2. iOS / OSX */ body, table, td, a{-ms-text-size-adjust: 100%; /* 1 */ -webkit-text-size-adjust: 100%; /* 2 */}/** * Remove extra space added to tables and cells in Outlook. */ table, td{mso-table-rspace: 0pt; mso-table-lspace: 0pt;}/** * Better fluid images in Internet Explorer. */ img{-ms-interpolation-mode: bicubic;}/** * Remove blue links for iOS devices. */ a[x-apple-data-detectors]{font-family: inherit !important; font-size: inherit !important; font-weight: inherit !important; line-height: inherit !important; color: inherit !important; text-decoration: none !important;}/** * Fix centering issues in Android 4.4. */ div[style*="margin: 16px 0;"]{margin: 0 !important;}body{width: 100% !important; height: 100% !important; padding: 0 !important; margin: 0 !important;}/** * Collapse table borders to avoid space between cells. */ table{border-collapse: collapse !important;}a{color: #1a82e2;}img{height: auto; line-height: 100%; text-decoration: none; border: 0; outline: none;}</style></head><body style="background-color: #e9ecef;"> <div class="preheader" style="display: none; max-width: 0; max-height: 0; overflow: hidden; font-size: 1px; line-height: 1px; color: #fff; opacity: 0;"> 
                Registered successfully. </div><table border="0" cellpadding="0" cellspacing="0" width="100%"> <tr> <td align="center" bgcolor="#e9ecef"><!--[if (gte mso 9)|(IE)]> <table align="center" border="0" cellpadding="0" cellspacing="0" width="600"> <tr> <td align="center" valign="top" width="600"><![endif]--> <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;"> <tr> <td align="center" valign="top" style="padding: 36px 24px;"> <a href="` + variables. WEB_LINK+ `" target="_blank" style="display: inline-block;"> <img src="http://172.104.40.142:3000/img/brand/logo-white.png" alt="Logo" border="0" width="200" style="display: block; width: 200px; max-width: 200px; min-width: px;"> </a> </td></tr></table><!--[if (gte mso 9)|(IE)]> </td></tr></table><![endif]--> </td></tr><tr> <td align="center" bgcolor="#e9ecef"><!--[if (gte mso 9)|(IE)]> <table align="center" border="0" cellpadding="0" cellspacing="0" width="600"> <tr> <td align="center" valign="top" width="600"><![endif]--> <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;"> <tr> <td align="left" bgcolor="#ffffff" style="padding: 36px 24px 0; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; border-top: 3px solid #d4dadf;"> 
                <h1 style="margin: 0 0 16px 0; padding: 0 0 16px 0; font-size: 42px; font-weight: bold; letter-spacing: -2px; border-bottom: 1px solid #999" style="margin: 0; font-size: 32px; font-weight: 700; letter-spacing: -1px; line-height: 48px;">
                Offer rejected</h1 style="margin: 0 0 16px 0; padding: 0 0 16px 0; font-size: 42px; font-weight: bold; letter-spacing: -2px; border-bottom: 1px solid #999"> </td></tr></table><!--[if (gte mso 9)|(IE)]> </td></tr></table><![endif]--> </td></tr><tr> <td align="center" bgcolor="#e9ecef"><!--[if (gte mso 9)|(IE)]> <table align="center" border="0" cellpadding="0" cellspacing="0" width="600"> <tr> <td align="center" valign="top" width="600"><![endif]--> <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;"> <tr> <td align="left" bgcolor="#ffffff" style="padding: 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; line-height: 24px;"> <p style="margin: 0;">
                your college approved
                </td></tr><tr> <td align="left" bgcolor="#ffffff"> <table border="0" cellpadding="0" cellspacing="0" width="100%"> <tr> <td align="center" bgcolor="#ffffff" style="padding: 12px;"> <table border="0" cellpadding="0" cellspacing="0"> <tr> <td align="center" bgcolor="#1a82e2" style="border-radius: 6px;"> <a href="` + variables. WEB_LINK+ `" target="_blank" style="display: inline-block; padding: 16px 36px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; color: #ffffff; text-decoration: none; border-radius: 6px;">
                GO TO APPLICATION</a> </td></tr></table> </td></tr></table> </td></tr></table><!--[if (gte mso 9)|(IE)]> </td></tr></table><![endif]--> </td></tr><tr> <td align="center" bgcolor="#e9ecef" style="padding: 24px;"><!--[if (gte mso 9)|(IE)]> <table align="center" border="0" cellpadding="0" cellspacing="0" width="600"> <tr> <td align="center" valign="top" width="600"><![endif]--> <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;"> <tr> <td align="center" bgcolor="#e9ecef" style="padding: 12px 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 14px; line-height: 20px; color: #666;"> 
                <p style="margin: 0;"><b>CAS SHRC | Bridging Talents and Opportunities</b></p></td></tr></table><!--[if (gte mso 9)|(IE)]> </td></tr></table><![endif]--> </td></tr></table> </body></html>`
            
                sendMail.sendMail(req.body.email,html,'Please wait for students')

                var myquery = { _id: stu_id };

                Other_enroll.remove(myquery, function(err, obj) {
                    if (err)
                    {
                        res.send(
        
                            setting.status("User not deleted'",true,"No data found",null)
            
                        );
                    }
                    else
                    {
                        res.send(
        
                            setting.status("Approved'",true,"data found",null)
            
                        );
                    } 
                })
            }
            else
            {
                res.send(
        
                    setting.status("User not found'",true,"No data found",null)
    
                );
            
            }

        })
    
})





module.exports = router;
