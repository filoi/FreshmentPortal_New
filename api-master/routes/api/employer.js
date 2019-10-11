const express = require('express');
const router = express.Router();
var mongoose = require('mongoose');

//const passport = require('passport');
//Load Input Validation
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Employer = require('../../models/employer');
const Invite = require('../../models/invite');
const Settings = require('../../models/setting');
const loginStatus = require('../../models/login_status');

const Vacancy_Student = require('../../models/vacancy_student');
const setting=require("../return_msg/setting");
const employerValidation=require("../validation/employer");
let middleware = require('../../validation/middleware');
const Role_authority = require('../../models/role_authority');
const config = require('../../config/keys.js');
var nodemailer = require('nodemailer');
var generator = require('generate-password');
const Vacancy = require('../../models/vacancy');
const CCS_Associations = require('../../models/ccs_association');
const Vacancy_specialization = require('../../models/vacancy_specializations');
const Student = require('../../models/student_enrollment');
var sendMail=require("../return_msg/sendMail");
var unique = require('array-unique');
const Suggestion = require('../../models/suggestion');
const Reject = require('../../models/reject');

const Notification = require('../../models/notification');
const Offer = require('../../models/offer');
const variables=require("../return_msg/keyvalue");
const Vacancy_Course = require('../../models/vacancy_course');
//const Reject = require('../../models/reject');


//@route GET api/employer/
//@desc Register route
//@access Public
router.post('/', middleware.checkToken,(req, res) => {

    // var result=middleware.function1("CAN_ADD_EMPLOYER");
    // if(!result.status)
    // {
    //     return res.send(result);
    // }
    console.log(req.body);

    var result=employerValidation.CheckValidation(req.body);
    if(!result.status)
    {
        return res.send(result);
    }

        Employer.findOne({
            email: req.body.email
        })
        .then(college => {
            if (college) {
                res.json(
		
                    setting.status("Employer Email Already Exits",false,"email already exits",null)
            
                  );
            } else {

                var randPassword = generator.generate({
                    length: 8,
                    numbers: true
                  });
                  
                                 
                  //Hashing password 
                  var hashedPassword = bcrypt.hashSync(randPassword, 10); //Hashing password to unreadable

                const newCollege = new Employer({
                    name: req.body.name,
                    email: req.body.email,
                    contact_no:req.body.contact_no,
                    website:req.body.website,
                    address:req.body.address,
                    state: req.body.state,
                    city: req.body.city,
                    pin_code:req.body.pin_code,
                    hr_name:req.body.hr_name,
                    hr_email: req.body.hr_email,
                    hr_contact_no: req.body.hr_contact_no,
                    status:req.body.status,
                    description: req.body.description,
                    industry: req.body.industry,
                    fax:req.body.fax,
                    //role:"5c45399c6b72f02628eb8c5b",
                    role:"5c45399c6b72f02628eb8c5b",
                    password:hashedPassword
                });

                            newCollege.save()
                            .then(college =>{

                                
                                    var html= `<!DOCTYPE HTML PUBLIC "-//W3C//DTD XHTML 1.0 Transitional //EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd"><html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office"><head>
                                    <!--[if gte mso 9]><xml>
                                     <o:OfficeDocumentSettings>
                                      <o:AllowPNG/>
                                      <o:PixelsPerInch>96</o:PixelsPerInch>
                                     </o:OfficeDocumentSettings>
                                    </xml><![endif]-->
                                    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
                                    <meta name="viewport" content="width=device-width">
                                    <!--[if !mso]><!--><meta http-equiv="X-UA-Compatible" content="IE=edge"><!--<![endif]-->
                                    <title></title>
                                    <!--[if !mso]><!-- -->
                                    <link href="https://fonts.googleapis.com/css?family=Montserrat" rel="stylesheet" type="text/css">
                                    <!--<![endif]-->
                                    
                                    <style type="text/css" id="media-query">
                                      body {
                                  margin: 0;
                                  padding: 0; }
                                
                                table, tr, td {
                                  vertical-align: top;
                                  border-collapse: collapse; }
                                
                                .ie-browser table, .mso-container table {
                                  table-layout: fixed; }
                                
                                * {
                                  line-height: inherit; }
                                
                                a[x-apple-data-detectors=true] {
                                  color: inherit !important;
                                  text-decoration: none !important; }
                                
                                [owa] .img-container div, [owa] .img-container button {
                                  display: block !important; }
                                
                                [owa] .fullwidth button {
                                  width: 100% !important; }
                                
                                [owa] .block-grid .col {
                                  display: table-cell;
                                  float: none !important;
                                  vertical-align: top; }
                                
                                .ie-browser .num12, .ie-browser .block-grid, [owa] .num12, [owa] .block-grid {
                                  width: 600px !important; }
                                
                                .ExternalClass, .ExternalClass p, .ExternalClass span, .ExternalClass font, .ExternalClass td, .ExternalClass div {
                                  line-height: 100%; }
                                
                                .ie-browser .mixed-two-up .num4, [owa] .mixed-two-up .num4 {
                                  width: 200px !important; }
                                
                                .ie-browser .mixed-two-up .num8, [owa] .mixed-two-up .num8 {
                                  width: 400px !important; }
                                
                                .ie-browser .block-grid.two-up .col, [owa] .block-grid.two-up .col {
                                  width: 300px !important; }
                                
                                .ie-browser .block-grid.three-up .col, [owa] .block-grid.three-up .col {
                                  width: 200px !important; }
                                
                                .ie-browser .block-grid.four-up .col, [owa] .block-grid.four-up .col {
                                  width: 150px !important; }
                                
                                .ie-browser .block-grid.five-up .col, [owa] .block-grid.five-up .col {
                                  width: 120px !important; }
                                
                                .ie-browser .block-grid.six-up .col, [owa] .block-grid.six-up .col {
                                  width: 100px !important; }
                                
                                .ie-browser .block-grid.seven-up .col, [owa] .block-grid.seven-up .col {
                                  width: 85px !important; }
                                
                                .ie-browser .block-grid.eight-up .col, [owa] .block-grid.eight-up .col {
                                  width: 75px !important; }
                                
                                .ie-browser .block-grid.nine-up .col, [owa] .block-grid.nine-up .col {
                                  width: 66px !important; }
                                
                                .ie-browser .block-grid.ten-up .col, [owa] .block-grid.ten-up .col {
                                  width: 60px !important; }
                                
                                .ie-browser .block-grid.eleven-up .col, [owa] .block-grid.eleven-up .col {
                                  width: 54px !important; }
                                
                                .ie-browser .block-grid.twelve-up .col, [owa] .block-grid.twelve-up .col {
                                  width: 50px !important; }
                                
                                @media only screen and (min-width: 620px) {
                                  .block-grid {
                                    width: 600px !important; }
                                  .block-grid .col {
                                    vertical-align: top; }
                                    .block-grid .col.num12 {
                                      width: 600px !important; }
                                  .block-grid.mixed-two-up .col.num4 {
                                    width: 200px !important; }
                                  .block-grid.mixed-two-up .col.num8 {
                                    width: 400px !important; }
                                  .block-grid.two-up .col {
                                    width: 300px !important; }
                                  .block-grid.three-up .col {
                                    width: 200px !important; }
                                  .block-grid.four-up .col {
                                    width: 150px !important; }
                                  .block-grid.five-up .col {
                                    width: 120px !important; }
                                  .block-grid.six-up .col {
                                    width: 100px !important; }
                                  .block-grid.seven-up .col {
                                    width: 85px !important; }
                                  .block-grid.eight-up .col {
                                    width: 75px !important; }
                                  .block-grid.nine-up .col {
                                    width: 66px !important; }
                                  .block-grid.ten-up .col {
                                    width: 60px !important; }
                                  .block-grid.eleven-up .col {
                                    width: 54px !important; }
                                  .block-grid.twelve-up .col {
                                    width: 50px !important; } }
                                
                                @media (max-width: 620px) {
                                  .block-grid, .col {
                                    min-width: 320px !important;
                                    max-width: 100% !important;
                                    display: block !important; }
                                  .block-grid {
                                    width: calc(100% - 40px) !important; }
                                  .col {
                                    width: 100% !important; }
                                    .col > div {
                                      margin: 0 auto; }
                                  img.fullwidth, img.fullwidthOnMobile {
                                    max-width: 100% !important; }
                                  .no-stack .col {
                                    min-width: 0 !important;
                                    display: table-cell !important; }
                                  .no-stack.two-up .col {
                                    width: 50% !important; }
                                  .no-stack.mixed-two-up .col.num4 {
                                    width: 33% !important; }
                                  .no-stack.mixed-two-up .col.num8 {
                                    width: 66% !important; }
                                  .no-stack.three-up .col.num4 {
                                    width: 33% !important; }
                                  .no-stack.four-up .col.num3 {
                                    width: 25% !important; }
                                  .mobile_hide {
                                    min-height: 0px;
                                    max-height: 0px;
                                    max-width: 0px;
                                    display: none;
                                    overflow: hidden;
                                    font-size: 0px; } }
                                
                                    </style>
                                </head>
                                <body class="clean-body" style="margin: 0;padding: 0;-webkit-text-size-adjust: 100%;background-color: #e2eace">
                                  <style type="text/css" id="media-query-bodytag">
                                    @media (max-width: 520px) {
                                      .block-grid {
                                        min-width: 320px!important;
                                        max-width: 100%!important;
                                        width: 100%!important;
                                        display: block!important;
                                      }
                                
                                      .col {
                                        min-width: 320px!important;
                                        max-width: 100%!important;
                                        width: 100%!important;
                                        display: block!important;
                                      }
                                
                                        .col > div {
                                          margin: 0 auto;
                                        }
                                
                                      img.fullwidth {
                                        max-width: 100%!important;
                                      }
                                            img.fullwidthOnMobile {
                                        max-width: 100%!important;
                                      }
                                      .no-stack .col {
                                                min-width: 0!important;
                                                display: table-cell!important;
                                            }
                                            .no-stack.two-up .col {
                                                width: 50%!important;
                                            }
                                            .no-stack.mixed-two-up .col.num4 {
                                                width: 33%!important;
                                            }
                                            .no-stack.mixed-two-up .col.num8 {
                                                width: 66%!important;
                                            }
                                            .no-stack.three-up .col.num4 {
                                                width: 33%!important;
                                            }
                                            .no-stack.four-up .col.num3 {
                                                width: 25%!important;
                                            }
                                      .mobile_hide {
                                        min-height: 0px!important;
                                        max-height: 0px!important;
                                        max-width: 0px!important;
                                        display: none!important;
                                        overflow: hidden!important;
                                        font-size: 0px!important;
                                      }
                                    }
                                  </style>
                                  <!--[if IE]><div class="ie-browser"><![endif]-->
                                  <!--[if mso]><div class="mso-container"><![endif]-->
                                  <table class="nl-container" style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;min-width: 320px;Margin: 0 auto;background-color: #e2eace;width: 100%" cellpadding="0" cellspacing="0">
                                    <tbody>
                                    <tr style="vertical-align: top">
                                        <td style="word-break: break-word;border-collapse: collapse !important;vertical-align: top">
                                    <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td align="center" style="background-color: #e2eace;"><![endif]-->
                                
                                    <div style="background-color:transparent;">
                                      <div style="Margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: transparent;" class="block-grid ">
                                        <div style="border-collapse: collapse;display: table;width: 100%;background-color:transparent;">
                                          <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="background-color:transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width: 600px;"><tr class="layout-full-width" style="background-color:transparent;"><![endif]-->
                                
                                              <!--[if (mso)|(IE)]><td align="center" width="600" style=" width:600px; padding-right: 0px; padding-left: 0px; padding-top:5px; padding-bottom:0px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;" valign="top"><![endif]-->
                                            <div class="col num12" style="min-width: 320px;max-width: 600px;display: table-cell;vertical-align: top;">
                                              <div style="background-color: transparent; width: 100% !important;">
                                              <!--[if (!mso)&(!IE)]><!--><div style="border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent; padding-top:5px; padding-bottom:0px; padding-right: 0px; padding-left: 0px;"><!--<![endif]-->
                                
                                                  
                                                    <div align="center" class="img-container center  autowidth  fullwidth " style="padding-right: 0px;  padding-left: 0px;">
                                <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr style="line-height:0px;line-height:0px;"><td style="padding-right: 0px; padding-left: 0px;" align="center"><![endif]-->
                                <div style="line-height:25px;font-size:1px">&#160;</div>  <img class="center  autowidth  fullwidth" align="center" border="0" src="https://d1oco4z2z1fhwp.cloudfront.net/templates/default/20/rounder-up.png" alt="Image" title="Image" style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: block !important;border: 0;height: auto;float: none;width: 100%;max-width: 600px" width="600">
                                <!--[if mso]></td></tr></table><![endif]-->
                                </div>
                                
                                                  
                                              <!--[if (!mso)&(!IE)]><!--></div><!--<![endif]-->
                                              </div>
                                            </div>
                                          <!--[if (mso)|(IE)]></td></tr></table></td></tr></table><![endif]-->
                                        </div>
                                      </div>
                                    </div>
                                    <div style="background-color:transparent;">
                                      <div style="Margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: #FFFFFF;" class="block-grid ">
                                        <div style="border-collapse: collapse;display: table;width: 100%;background-color:#FFFFFF;">
                                          <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="background-color:transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width: 600px;"><tr class="layout-full-width" style="background-color:#FFFFFF;"><![endif]-->
                                
                                              <!--[if (mso)|(IE)]><td align="center" width="600" style=" width:600px; padding-right: 0px; padding-left: 0px; padding-top:5px; padding-bottom:5px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;" valign="top"><![endif]-->
                                            <div class="col num12" style="min-width: 320px;max-width: 600px;display: table-cell;vertical-align: top;">
                                              <div style="background-color: transparent; width: 100% !important;">
                                              <!--[if (!mso)&(!IE)]><!--><div style="border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent; padding-top:5px; padding-bottom:5px; padding-right: 0px; padding-left: 0px;"><!--<![endif]-->
                                
                                                  
                                                    <div align="center" class="img-container center  autowidth  " style="padding-right: 0px;  padding-left: 0px;">
                                <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr style="line-height:0px;line-height:0px;"><td style="padding-right: 0px; padding-left: 0px;" align="center"><![endif]-->
                                  <img class="center  autowidth " align="center" border="0" src="https://i.imgur.com/FrVRrnL.png" alt="Image" title="Image" style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: block !important;border: 0;height: auto;float: none;width: 100%;max-width: 250px" width="250">
                                <!--[if mso]></td></tr></table><![endif]-->
                                </div>
                                
                                                  
                                                  
                                                    <div class="">
                                    <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 10px; padding-left: 10px; padding-top: 10px; padding-bottom: 10px;"><![endif]-->
                                    <div style="color:#555555;font-family:'Montserrat', 'Trebuchet MS', 'Lucida Grande', 'Lucida Sans Unicode', 'Lucida Sans', Tahoma, sans-serif;line-height:150%; padding-right: 10px; padding-left: 10px; padding-top: 10px; padding-bottom: 10px;"> 
                                        <div style="font-size:12px;line-height:18px;color:#555555;font-family:'Montserrat', 'Trebuchet MS', 'Lucida Grande', 'Lucida Sans Unicode', 'Lucida Sans', Tahoma, sans-serif;text-align:left;"><p style="margin: 0;font-size: 14px;line-height: 21px;text-align: center"></p></div>    
                                    </div>
                                    <!--[if mso]></td></tr></table><![endif]-->
                                </div>
                                                  
                                              <!--[if (!mso)&(!IE)]><!--></div><!--<![endif]-->
                                              </div>
                                            </div>
                                          <!--[if (mso)|(IE)]></td></tr></table></td></tr></table><![endif]-->
                                        </div>
                                      </div>
                                    </div>
                                    <div style="background-color:transparent;">
                                      <div style="Margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: #FFFFFF;" class="block-grid ">
                                        <div style="border-collapse: collapse;display: table;width: 100%;background-color:#FFFFFF;">
                                          <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="background-color:transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width: 600px;"><tr class="layout-full-width" style="background-color:#FFFFFF;"><![endif]-->
                                
                                              <!--[if (mso)|(IE)]><td align="center" width="600" style=" width:600px; padding-right: 0px; padding-left: 0px; padding-top:0px; padding-bottom:5px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;" valign="top"><![endif]-->
                                            <div class="col num12" style="min-width: 320px;max-width: 600px;display: table-cell;vertical-align: top;">
                                              <div style="background-color: transparent; width: 100% !important;">
                                              <!--[if (!mso)&(!IE)]><!--><div style="border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent; padding-top:0px; padding-bottom:5px; padding-right: 0px; padding-left: 0px;"><!--<![endif]-->
                                
                                                  
                                                    <div class="">
                                    <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 10px; padding-left: 10px; padding-top: 10px; padding-bottom: 10px;"><![endif]-->
                                    <div style="color:#0D0D0D;font-family:'Montserrat', 'Trebuchet MS', 'Lucida Grande', 'Lucida Sans Unicode', 'Lucida Sans', Tahoma, sans-serif;line-height:120%; padding-right: 10px; padding-left: 10px; padding-top: 10px; padding-bottom: 10px;"> 
                                        <div style="font-size:12px;line-height:14px;color:#0D0D0D;font-family:'Montserrat', 'Trebuchet MS', 'Lucida Grande', 'Lucida Sans Unicode', 'Lucida Sans', Tahoma, sans-serif;text-align:left;">
                                      <p style="margin: 0;font-size: 14px;line-height: 17px;text-align: center">
                                       <strong> 
                                      <span style="font-size: 28px; line-height: 33px;">
                                      Registration Successful
                                    </span> </strong> <br><br>
                                
                                           <div style="text-align: left;">  <span style="line-height: 33px; font-size: 20px;">
                                            Hello ` + req.body.name + `,
                                      </span></div>
                                  </p></div>    
                                    </div>
                                    <!--[if mso]></td></tr></table><![endif]-->
                                </div>
                                                  
                                                  
                                                    <div align="center" class="img-container center  autowidth  " style="padding-right: 0px;  padding-left: 0px;">
                                <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr style="line-height:0px;line-height:0px;"><td style="padding-right: 0px; padding-left: 0px;" align="center"><![endif]-->
                                  <img class="center  autowidth " align="center" border="0" src="https://d1oco4z2z1fhwp.cloudfront.net/templates/default/20/divider.png" alt="Image" title="Image" style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: block !important;border: 0;height: auto;float: none;width: 100%;max-width: 316px" width="316">
                                <!--[if mso]></td></tr></table><![endif]-->
                                </div>
                                
                                                  
                                                  
                                                    <div class="">
                                    <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 10px; padding-left: 10px; padding-top: 10px; padding-bottom: 10px;"><![endif]-->
                                    <div style="color:#555555;font-family:'Montserrat', 'Trebuchet MS', 'Lucida Grande', 'Lucida Sans Unicode', 'Lucida Sans', Tahoma, sans-serif;line-height:150%; padding-right: 10px; padding-left: 10px; padding-top: 10px; padding-bottom: 10px;"> 
                                        
                                    </div>
                                    <!--[if mso]></td></tr></table><![endif]-->
                                </div>
                                                  
                                                  
                                                    <div class="">
                                    <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 10px; padding-left: 10px; padding-top: 20px; padding-bottom: 10px;"><![endif]-->
                                    <div style="color:#0D0D0D;font-family:'Montserrat', 'Trebuchet MS', 'Lucida Grande', 'Lucida Sans Unicode', 'Lucida Sans', Tahoma, sans-serif;line-height:150%; padding-right: 10px; padding-left: 10px; padding-top: 20px; padding-bottom: 10px;"> 
                                        <div style="font-size:12px;line-height:18px;color:#0D0D0D;font-family:'Montserrat', 'Trebuchet MS', 'Lucida Grande', 'Lucida Sans Unicode', 'Lucida Sans', Tahoma, sans-serif;text-align:left;"><p style="margin: 0;font-size: 14px;line-height: 21px;text-align: center">You have been successfully registered to the CAS Job Placements. <br><br> 
                                
                                
                                        <code> Username : ` + req.body.email + `</code> <br/><code> Password : ` + randPassword + ` 
                                
                                
                                        </p></div>  
                                    </div>
                                    <!--[if mso]></td></tr></table><![endif]-->
                                </div>
                                                  
                                                  
                                                    
                                <div align="center" class="button-container center " style="padding-right: 10px; padding-left: 10px; padding-top:25px; padding-bottom:10px;">
                                  <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0" style="border-spacing: 0; border-collapse: collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;"><tr><td style="padding-right: 10px; padding-left: 10px; padding-top:25px; padding-bottom:10px;" align="center"><v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="" style="height:46pt; v-text-anchor:middle; width:151pt;" arcsize="7%" strokecolor="#a8bf6f" fillcolor="#a8bf6f"><w:anchorlock/><v:textbox inset="0,0,0,0"><center style="color:#ffffff; font-family:'Montserrat', 'Trebuchet MS', 'Lucida Grande', 'Lucida Sans Unicode', 'Lucida Sans', Tahoma, sans-serif; font-size:16px;"><![endif]-->
                                    <div style="color: #ffffff; background-color: #a8bf6f; border-radius: 4px; -webkit-border-radius: 4px; -moz-border-radius: 4px; max-width: 202px; width: 172px;width: auto; border-top: 0px solid transparent; border-right: 0px solid transparent; border-bottom: 0px solid transparent; border-left: 0px solid transparent; padding-top: 15px; padding-right: 15px; padding-bottom: 15px; padding-left: 15px; font-family: 'Montserrat', 'Trebuchet MS', 'Lucida Grande', 'Lucida Sans Unicode', 'Lucida Sans', Tahoma, sans-serif; text-align: center; mso-border-alt: none;">
                                      <span style="font-size:16px;line-height:32px;"><a href="`+ variables.WEB_LINK_EMPLOYER +`" style="text-decoration : none; color : #fff;"><strong>GoTo Application</strong></a></span>
                                    </div>
                                  <!--[if mso]></center></v:textbox></v:roundrect></td></tr></table><![endif]-->
                                </div>
                                
                                                  
                                                  
                                                    
                                <table border="0" cellpadding="0" cellspacing="0" width="100%" class="divider " style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;min-width: 100%;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%">
                                    <tbody>
                                        <tr style="vertical-align: top">
                                            <td class="divider_inner" style="word-break: break-word;border-collapse: collapse !important;vertical-align: top;padding-right: 10px;padding-left: 10px;padding-top: 30px;padding-bottom: 10px;min-width: 100%;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%">
                                                <table class="divider_content" align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;border-top: 0px solid transparent;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%">
                                                    <tbody>
                                                        <tr style="vertical-align: top">
                                                            <td style="word-break: break-word;border-collapse: collapse !important;vertical-align: top;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%">
                                                                <span></span>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                                                  
                                              <!--[if (!mso)&(!IE)]><!--></div><!--<![endif]-->
                                              </div>
                                            </div>
                                          <!--[if (mso)|(IE)]></td></tr></table></td></tr></table><![endif]-->
                                        </div>
                                      </div>
                                    </div>
                                    <div style="background-color:transparent;">
                                      <div style="Margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: #525252;" class="block-grid three-up ">
                                        <div style="border-collapse: collapse;display: table;width: 100%;background-color:#525252;">
                                          <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="background-color:transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width: 600px;"><tr class="layout-full-width" style="background-color:#525252;"><![endif]-->
                                
                                              <!--[if (mso)|(IE)]><td align="center" width="200" style=" width:200px; padding-right: 0px; padding-left: 0px; padding-top:0px; padding-bottom:0px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;" valign="top"><![endif]-->
                                            <div class="col num4" style="max-width: 320px;min-width: 200px;display: table-cell;vertical-align: top;">
                                              <div style="background-color: transparent; width: 100% !important;">
                                              <!--[if (!mso)&(!IE)]><!--><div style="border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent; padding-top:0px; padding-bottom:0px; padding-right: 0px; padding-left: 0px;"><!--<![endif]-->
                                
                                                  
                                                    
                                <div align="center" style="padding-right: 0px; padding-left: 0px; padding-bottom: 0px;" class="">
                                  <div style="line-height:15px;font-size:1px">&#160;</div>
                                  <div style="display: table; max-width:131px;">
                                  <!--[if (mso)|(IE)]><table width="131" cellpadding="0" cellspacing="0" border="0"><tr><td style="border-collapse:collapse; padding-right: 0px; padding-left: 0px; padding-bottom: 0px;"  align="center"><table width="100%" cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse; mso-table-lspace: 0pt;mso-table-rspace: 0pt; width:131px;"><tr><td width="32" style="width:32px; padding-right: 5px;" valign="top"><![endif]-->
                                    <table align="left" border="0" cellspacing="0" cellpadding="0" width="32" height="32" style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;Margin-right: 5px">
                                      <tbody><tr style="vertical-align: top"><td align="left" valign="middle" style="word-break: break-word;border-collapse: collapse !important;vertical-align: top">
                                        
                                      <div style="line-height:5px;font-size:1px">&#160;</div>
                                      </td></tr>
                                    </tbody></table>
                                      <!--[if (mso)|(IE)]></td><td width="32" style="width:32px; padding-right: 5px;" valign="top"><![endif]-->
                                    <table align="left" border="0" cellspacing="0" cellpadding="0" width="32" height="32" style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;Margin-right: 5px">
                                      <tbody><tr style="vertical-align: top"><td align="left" valign="middle" style="word-break: break-word;border-collapse: collapse !important;vertical-align: top">
                                        
                                      <div style="line-height:5px;font-size:1px">&#160;</div>
                                      </td></tr>
                                    </tbody></table>
                                      <!--[if (mso)|(IE)]></td><td width="32" style="width:32px; padding-right: 0;" valign="top"><![endif]-->
                                    <table align="left" border="0" cellspacing="0" cellpadding="0" width="32" height="32" style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;Margin-right: 0">
                                      <tbody><tr style="vertical-align: top"><td align="left" valign="middle" style="word-break: break-word;border-collapse: collapse !important;vertical-align: top">
                                        
                                      <div style="line-height:5px;font-size:1px">&#160;</div>
                                      </td></tr>
                                    </tbody></table>
                                    <!--[if (mso)|(IE)]></td></tr></table></td></tr></table><![endif]-->
                                  </div>
                                </div>
                                                  
                                              <!--[if (!mso)&(!IE)]><!--></div><!--<![endif]-->
                                              </div>
                                            </div>
                                              <!--[if (mso)|(IE)]></td><td align="center" width="200" style=" width:200px; padding-right: 0px; padding-left: 0px; padding-top:5px; padding-bottom:5px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;" valign="top"><![endif]-->
                                            <div class="col num4" style="max-width: 320px;min-width: 200px;display: table-cell;vertical-align: top;">
                                              <div style="background-color: transparent; width: 100% !important;">
                                              <!--[if (!mso)&(!IE)]><!--><div style="border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent; padding-top:5px; padding-bottom:5px; padding-right: 0px; padding-left: 0px;"><!--<![endif]-->
                                
                                                  
                                                    <div class="">
                                    <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 0px; padding-left: 0px; padding-top: 20px; padding-bottom: 0px;"><![endif]-->
                                    <div style="color:#a8bf6f;font-family:'Montserrat', 'Trebuchet MS', 'Lucida Grande', 'Lucida Sans Unicode', 'Lucida Sans', Tahoma, sans-serif;line-height:120%; padding-right: 0px; padding-left: 0px; padding-top: 20px; padding-bottom: 0px;">    
                                        <div style="font-size:12px;line-height:14px;color:#a8bf6f;font-family:'Montserrat', 'Trebuchet MS', 'Lucida Grande', 'Lucida Sans Unicode', 'Lucida Sans', Tahoma, sans-serif;text-align:left;"><p style="margin: 0;font-size: 12px;line-height: 14px;text-align: center"><span style="color: rgb(255, 255, 255); font-size: 12px; line-height: 14px;"><span style="font-size: 12px; line-height: 14px; color: rgb(168, 191, 111);">CAS SHRC | Bridging Talents and Opportunities</div> 
                                    </div>
                                    <!--[if mso]></td></tr></table><![endif]-->
                                </div>
                                                  
                                              <!--[if (!mso)&(!IE)]><!--></div><!--<![endif]-->
                                              </div>
                                            </div>
                                              <!--[if (mso)|(IE)]></td><td align="center" width="200" style=" width:200px; padding-right: 0px; padding-left: 0px; padding-top:5px; padding-bottom:5px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;" valign="top"><![endif]-->
                                            <div class="col num4" style="max-width: 320px;min-width: 200px;display: table-cell;vertical-align: top;">
                                              <div style="background-color: transparent; width: 100% !important;">
                                              <!--[if (!mso)&(!IE)]><!--><div style="border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent; padding-top:5px; padding-bottom:5px; padding-right: 0px; padding-left: 0px;"><!--<![endif]-->
                                
                                                  
                                                    <div class="">
                                    <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 0px; padding-left: 0px; padding-top: 20px; padding-bottom: 0px;"><![endif]-->
                                    
                                    <!--[if mso]></td></tr></table><![endif]-->
                                </div>
                                                  
                                              <!--[if (!mso)&(!IE)]><!--></div><!--<![endif]-->
                                              </div>
                                            </div>
                                          <!--[if (mso)|(IE)]></td></tr></table></td></tr></table><![endif]-->
                                        </div>
                                      </div>
                                    </div>
                                    <div style="background-color:transparent;">
                                      <div style="Margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: transparent;" class="block-grid ">
                                        <div style="border-collapse: collapse;display: table;width: 100%;background-color:transparent;">
                                          <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="background-color:transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width: 600px;"><tr class="layout-full-width" style="background-color:transparent;"><![endif]-->
                                
                                              <!--[if (mso)|(IE)]><td align="center" width="600" style=" width:600px; padding-right: 0px; padding-left: 0px; padding-top:0px; padding-bottom:5px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;" valign="top"><![endif]-->
                                            <div class="col num12" style="min-width: 320px;max-width: 600px;display: table-cell;vertical-align: top;">
                                              <div style="background-color: transparent; width: 100% !important;">
                                              <!--[if (!mso)&(!IE)]><!--><div style="border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent; padding-top:0px; padding-bottom:5px; padding-right: 0px; padding-left: 0px;"><!--<![endif]-->
                                
                                                  
                                                    <div align="center" class="img-container center  autowidth  fullwidth " style="padding-right: 0px;  padding-left: 0px;">
                                <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr style="line-height:0px;line-height:0px;"><td style="padding-right: 0px; padding-left: 0px;" align="center"><![endif]-->
                                  <img class="center  autowidth  fullwidth" align="center" border="0" src="https://d1oco4z2z1fhwp.cloudfront.net/templates/default/20/rounder-dwn.png" alt="Image" title="Image" style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: block !important;border: 0;height: auto;float: none;width: 100%;max-width: 600px" width="600">
                                <!--[if mso]></td></tr></table><![endif]-->
                                </div>
                                
                                                  
                                                  
                                                    
                                <table border="0" cellpadding="0" cellspacing="0" width="100%" class="divider " style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;min-width: 100%;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%">
                                    <tbody>
                                        <tr style="vertical-align: top">
                                            <td class="divider_inner" style="word-break: break-word;border-collapse: collapse !important;vertical-align: top;padding-right: 30px;padding-left: 30px;padding-top: 30px;padding-bottom: 30px;min-width: 100%;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%">
                                                <table class="divider_content" align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;border-top: 0px solid transparent;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%">
                                                    <tbody>
                                                        <tr style="vertical-align: top">
                                                            <td style="word-break: break-word;border-collapse: collapse !important;vertical-align: top;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%">
                                                                <span></span>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                                                  
                                              <!--[if (!mso)&(!IE)]><!--></div><!--<![endif]-->
                                              </div>
                                            </div>
                                          <!--[if (mso)|(IE)]></td></tr></table></td></tr></table><![endif]-->
                                        </div>
                                      </div>
                                    </div>
                                   <!--[if (mso)|(IE)]></td></tr></table><![endif]-->
                                        </td>
                                  </tr>
                                  </tbody>
                                  </table>
                                  <!--[if (mso)|(IE)]></div><![endif]-->
                                
                                
                                </body></html>`
                                 
                  
                                  sendMail.sendMail(req.body.email,html,'Successfully Registered')

                                res.json(
                
                                    setting.status("Employer created",true,"created",college)
                            
                                  );
                            })
                            .catch(err => {
                                console.log(err)
                                if(err.errors.email)
                                {
                                    res.json(
                
                                        setting.status("Employer Email Already Exits",false,"email unique",null)
                                
                                      );
                                }
        
                                if(err.errors.contact_no)
                                {
                                    res.json(
                
                                        setting.status("Employer Contact Number Already Exits",false,"contact_no unique",null)
                                
                                      );
                                }
        
                                if(err.errors.hr_contact_no)
                                {
                                    res.json(
                
                                        setting.status("HR Contact Number Already Exits",false,"hr_contact_no unique",null)
                                
                                      );
                                }

                                if(err.errors)
                                {
                                    res.json(
                
                                        setting.status("Error",false,"error",err)
                                
                                      );
                                }
        
                                
                            });
                      
                
            }
        })
})

//@route  GET api/college/
//@desc  Get all  college
//@access Public
router.get('/', middleware.checkToken, (req, res) => {

    // var result=middleware.function1("CAN_VIEW_EMPLOYER");
    // if(!result.status)
    // {
    //     return res.send(result);
    // }


    var aggregate = Employer.aggregate();

    var page_no = req.param('page');
    var search = req.param('search');
	var searchEmail = req.param('searchEmail');
	var searchContact = req.param('searchContact');
    var searchIndustry = req.param('searchIndustry');
    var searchHrname = req.param('searchHrname');
    var searchState = req.param('searchState');

    aggregate.sort({"name" : 1})         
    //.match({status:"active"})


    if(search===null || search ===undefined)
    {
        
    }else
    {
        aggregate.match({"name":{"$regex": search, "$options": "i"}});
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

    if(searchIndustry===null || searchIndustry ===undefined)
    {
        
    }else
    {
        aggregate.match({"industry":{"$regex": searchIndustry, "$options": "i"}});
    }

    if(searchHrname===null || searchHrname ===undefined)
    {
        
    }else
    {
        aggregate.match({"hr_name":{"$regex": searchHrname, "$options": "i"}});
    }

    if(searchState===null || searchState ===undefined)
    {
        
    }else
    {
        aggregate.match({"state":{"$regex": searchState, "$options": "i"}});
    }

    
    if(page_no==0)
    {
        res.send(
        
            setting.status("page no error",false,"page No error",null)

        );
    }

    var options = { page : page_no, limit : parseInt(variables.pagecontent)}

    Employer.aggregatePaginate(aggregate, options, function(err, results, pageCount, count) {
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

//@route  GET api/college/id
//@desc  Get one  college
//@access Public
router.get('/:id', middleware.checkToken,(req, res) => {

    // var result=middleware.function1("CAN_VIEW_EMPLOYER");
    // if(!result.status)
    // {
    //     return res.send(result);
    // }


    var ObjectId = require('mongodb').ObjectID;
    var id=req.params.id;
	
	if(!ObjectId.isValid(id))
		{
			return res.send(
					
				setting.status("incorrect id",false,"incorrect id",null)

			 );
        }
        
    var aggregate = Employer.aggregate();

    aggregate.match({"_id":ObjectId(id)})
    //.match({status:"active"})


    let page_no=req.params.page;                

    if(page_no==0)
    {
        res.send(
        
            setting.status("page no error",false,"page No error",null)

        );
    }

    var options = { page : page_no, limit : parseInt(variables.pagecontent)}

    Employer.aggregatePaginate(aggregate, options, function(err, results, pageCount, count) {
        if(err) 
        {
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

// @route   DELETE api/college/:id
// @desc    Delete college
// @access  Private
router.delete(
    '/:id',
middleware.checkToken,    (req, res) => {

    // var result=middleware.function1("CAN_DELETE_EMPLOYER");
    // if(!result.status)
    // {
    //     return res.send(result);
    // }

    var ObjectId = require('mongodb').ObjectID;
    var id=req.params.id;
	
	if(!ObjectId.isValid(id))
		{
			return res.send(
					
				setting.status("incorrect id",false,"incorrect id",null)

			 );
        }
        
        Employer.findByIdAndUpdate(id, {
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

//@route GET api/college/:id
//@desc Register route
//@access Public
router.post('/:id', middleware.checkToken,(req, res) => {

    // var result=middleware.function1("CAN_EDIT_EMPLOYER");
    // if(!result.status)
    // {
    //     return res.send(result);
    // }


    var resultVali=employerValidation.CheckValidation(req.body);
    if(!resultVali.status)
    {
        return res.send(resultVali);
    }
    
    var ObjectId = require('mongodb').ObjectID;
    var id=req.params.id;
	
	if(!ObjectId.isValid(id))
		{
			return res.send(
					
				setting.status("incorrect id",false,"incorrect id",null)

			 );
		}

    Employer.findOne({
            _id: id
        })
        .then(college => {
            if (college) {
                Employer.findOneAndUpdate(
                    { _id : id },
                    {$set:{
                    name: req.body.name,
                    email: req.body.email,
                    contact_no:req.body.contact_no,
                    website:req.body.website,
                    address:req.body.address,
                    state: req.body.state,
                    city: req.body.city,
                    pin_code:req.body.pin_code,
                    hr_name:req.body.hr_name,
                    hr_email: req.body.hr_email,
                    hr_contact_no: req.body.hr_contact_no,
                    status:req.body.status,
                    description: req.body.description,
                    industry: req.body.industry,
                    fax:"+91"+req.body.fax,}},
                    {runValidators: true, context: 'query' })
                  .then(college =>{
                    res.json(
		
                        setting.status("Employer Updated",true,"updated",college)
                
                      );
                  })
                  .catch(err =>{
                        if(err.errors.email)
                        {
                            res.json(
		
                                setting.status("Employer Email Already Exits",false,"email unique",null)
                        
                              );
                        }

                        if(err.errors.contact_no)
                        {
                            res.json(
		
                                setting.status("Employer Contact Number Already Exits",false,"contact_no unique",null)
                        
                              );
                        }

                       

                        if(err.errors.hr_contact_no)
                        {
                            res.json(
		
                                setting.status("HR Contact Number Already Exits",false,"hr_contact_no unique",null)
                        
                              );
                        }
                  });
            } else {
                res.json(
		
                    setting.status("Employer Not Found",false,"error",err)
            
                  );
            }
        })
})


router.post('/change_password/:id', middleware.checkToken,(req, res) => {

    
    var ObjectId = require('mongodb').ObjectID;
    var id=req.params.id;
	
	if(!ObjectId.isValid(id))
		{
			return res.send(
					
				setting.status("incorrect id",false,"incorrect id",null)

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
    
    var mobileLength1 = Object.keys(req.body.new_password).length; // Taking length
    if(mobileLength1 < parseInt(variables.password_length) )
            {
                return res.json(
                    
                    setting.status("New Password length greter than "+variables.password_length,false,"new_password is empty",null)
            
                  );
                
            }
    
    if(req.body.conform_password==undefined || req.body.conform_password==null || req.body.conform_password=='') 
        {
            return res.json(
                    
                setting.status("Conform Password cannot be empty",false,"conform password is empty",null)
        
              );
            
        }

    Employer.findOne({ _id: id})
        .then(college => {
            if (college) {

                let old_password=college.password;
                let coming_password=req.body.password;
                let new_password=req.body.new_password;
                let conform_password=req.body.conform_password;

                var passwordIsValid = bcrypt.compareSync(req.body.password, college.password);
                if (!passwordIsValid)
                return res.send(
                    
                        setting.status("Wrong Pasword",false,"password wrong",null)
                
                    );

                let hashPassword="";

                    if(new_password===conform_password)
                    {
                        bcrypt.genSalt(10, (err, salt) =>
                            {
                                bcrypt.hash(new_password, salt, (err, hash) =>
                                {
                                    if (err)
                                        throw err;
                                        hashPassword = hash;

                                        Employer.findOneAndUpdate(
                                            { _id : id },
                                            {$set:{
                                            password:hashPassword,
                                            is_password_defalut:0
                                            }},
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

                                })
                            });
                       
                        
                    }else
                    {
                        return res.json(
		
                            setting.status("Password Not Match",false,"newpassword not match to conform password",null)
                    
                        );
                    }

                
            } else {
                return res.json(
		
                    setting.status("Employer Not Found",false,"error",err)
            
                  );
            }
        })
})


router.post('/change_status/:id', middleware.checkToken,(req, res) => {

    // var result=middleware.function1("CAN_EDIT_EMPLOYER");
    // if(!result.status)
    // {
    //     return res.send(result);
    // }

    console.log("mano");

    
    var ObjectId = require('mongodb').ObjectID;
    var id=req.params.id;
	
	if(!ObjectId.isValid(id))
		{
			return res.send(
					
				setting.status("incorrect id",false,"incorrect id",null)

			 );
		}

    Employer.findOne({
            _id: id
        })
        .then(college => {
            if (college) {
                Employer.findOneAndUpdate(
                    { _id : id },
                    {$set:{
                    status:req.body.status}},
                    {runValidators: true, context: 'query' })
                  .then(college =>{
                    res.json(
		
                        setting.status("Employer Status Updated",true,"updated",college.status)
                
                      );
                  })
                  .catch(err =>{
                        
                        if(err)
                        {
                            res.json(
		
                                setting.status("Error",false,"error",err)
                        
                              );
                        }
                  });
            } else {
                res.json(
		
                    setting.status("Employer Not Found",false,"error",err)
            
                  );
            }
        })
})

router.post("/emp/login", (req, res) =>{

    console.log(req.body);
  
    if(req.body.email==undefined || req.body.email==null || req.body.email=='') 
    {
        res.send(
        
          setting.status("Email acnnot be empty",false,"email empty",null)
  
      );
    }

  
    if(req.body.password==undefined || req.body.password==null || req.body.password=='') 
    {
        res.send(
        
          setting.status("Password cannot be empty",false,"password empty",null)
  
      );
    }
  
      var email = req.body.email;
      var password = req.body.password;
  
      Employer.findOne({email: email}, function (err, user)
      {
          if (err)
              return res.send(
            
                setting.status("Try Again",false,"Error on server",err)
        
            );
  
          if (!user)
              return res.send(
            
                setting.status("Authentication false",false,"user not found",null)
        
            );
  
            if (!user)
               returnres.send(
            
                setting.status("Authentication false",false,"user not found",null)
        
            );

            console.log(user)
  
            var passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
            if (!passwordIsValid)
                  res.send(
                
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
                let role='Employer';
  
            Role_authority.find({role_id:user.role})//.populate('role_id')
            .then(result => {
               // role=result[0].role_id.name;
                if(result.length>0)
                {
                    for(var x=0;x<result.length;x++)
                    {
                        authority.push(result[x].authority)
                    }
                }else
                {
                    //return ("authority not found")
                }
  
              var token = jwt.sign({ id: user._id,name:user.name,authority:authority,email:user.email,contact_no:user.contact_no,role:user.role,role_name:role,default_password:user.is_password_defalut }, config.secretOrKey, {expiresIn: 86400});
  
              res.send(
                  
                  setting.status("Login success",true,"Authentication true",{"loginToken":token,"defalut":user.is_password_defalut})        
                  );
              });
      })
    })




//********************************************************* */ Vacancy/********************************************** */

//********************************************************************************************************************** */



router.post('/suggestion/:vacancy_id',middleware.checkToken,async (req, res) => { //middleware.checkToken,

    // var ObjectId = require('mongodb').ObjectID;
    // var vacancy_id=req.params.vacancy_id;
	// console.log(vacancy_id)
	// if(!ObjectId.isValid(vacancy_id))
	// 	{
	// 		return res.send(
					
	// 			setting.status("Incorrect ID",false,"incorrect id",null)

	// 		 );
    //     }

//     let searchUni=[];
//     let searchCollege=[];
//     let searchCourse=[];
//     let searchSpecialization=[];
//     searchUni=req.body.searchUni;
//     searchCollege=req.body.searchCollege;
//     searchCourse=req.body.searchCourse;
//     searchSpecialization=req.body.searchSpecialization;

//     var searchageFrom = req.body.searchageFrom;
//     var searchageTo = req.body.searchageTo;
//     var searchGender = req.body.searchGender;
//     var searchMarks = req.body.searchMarks;
//     var searchAcadamicFrom = req.body.searchAcadamicFrom;
//     var searchAcadamicTo = req.body.searchAcadamicTo;
//     var searchCGPA=req.body.searchCGPA;
//     var searchPercentage=req.body.searchPercentage;
//     var searchGrade=req.body.searchGrade;
   
//    var aggregate = Suggestion.aggregate();

//      aggregate.match({"vacancy_id":ObjectId(vacancy_id)})
//      .lookup({ from: "student_enrollments", localField: "student_id", foreignField: "_id",as: "student_doc"})
//      .unwind("$student_doc")
//      .lookup({ from: "internships", localField: "student_doc._id", foreignField: "student_id",as: "internship_doc"})
//      .match({"student_doc.is_approved":true})
//      .lookup({ from: "colleges", localField: "student_doc.college_id", foreignField: "_id",as: "college_doc"})
//      .lookup({ from: "courses", localField: "student_doc.course_id", foreignField: "_id",as: "course_doc"})
//      .lookup({ from: "specializations", localField: "student_doc.specialization_id_major", foreignField: "_id",as: "major_doc"})
//      .lookup({ from: "specializations", localField: "student_doc.specialization_id_minor", foreignField: "_id",as: "minor_doc"})
//      .lookup({ from: "universities", localField: "college_doc.university_id", foreignField: "_id",as: "university_doc"})
//      .lookup({ from: "interests", localField: "student_doc._id", foreignField: "student_id",as: "interest_doc"})
//      .project({"student_doc":"$student_doc","internship_doc":"$internship_doc","college_doc":"$college_doc",
//         "course_doc":"$course_doc","major_doc":"$major_doc","minor_doc":"$minor_doc","university_doc":"$university_doc","interest_doc":"$interest_doc",
//         "is_like": {
//             "$size": {
//               $filter: {
//                 input: "$interest_doc",
//                 as: "s",
//                 cond: { $and: [
//                   { $eq: [ "$$s.vacancy_id", ObjectId(vacancy_id) ] },
//                   { $eq: [ "$$s.status", "active" ] }
//                   ] }
//               }
//             }
//           }
//         })

   
//     if(searchPercentage===null || searchPercentage ===undefined ||searchPercentage==="")
//         {
            
//         }else
//         {
//             aggregate.match({"course_doc.marking_criteria":"percentage"});
//             aggregate.match({"student_doc.overall_grade":{$gte: parseInt(searchPercentage)}});

//         }

//     if(searchCGPA===null || searchCGPA ===undefined ||searchCGPA==="")
//         {
            
//         }else
//         {
//             aggregate.match({"course_doc.marking_criteria":"cgpa"});
//             aggregate.match({"student_doc.overall_grade":{$gte: parseInt(searchCGPA)}});

//         }

//     if(searchGrade===null || searchGrade ===undefined ||searchGrade==="")
//         {
            
//         }else
//         {
//             aggregate.match({"course_doc.marking_criteria":"grade"});
//             aggregate.match({"student_doc.overall_grade":searchGrade});

//         }

//     if(searchCollege===null || searchCollege ===undefined|| searchCollege ==="")
//     {
        
//     }else
//     {
//         if(searchCollege.length>0)
//         {
//             let y=[];

//             for(let x=0;x<searchCollege.length;x++)
//             {
//                 y.push({"student_doc.college_id":ObjectId(searchCollege[x])})
//             }

//             aggregate.match({$or:y});
//         }
//     }

//     if(searchCourse===null || searchCourse ===undefined|| searchCourse ==="")
//     {
        
//     }else
//     {
//         if(searchCourse.length>0)
//         {
//             let y=[];

//             for(let x=0;x<searchCourse.length;x++)
//             {
//                 y.push({"student_doc.course_id":ObjectId(searchCourse[x])})
//             }

//             aggregate.match({$or:y});
//         }
//     }

//     if(searchSpecialization===null || searchSpecialization ===undefined|| searchSpecialization ==="")
//     {
        
//     }else
//     {
//         if(searchSpecialization.length>0)
//         {
//             let y=[];

//             for(let x=0;x<searchSpecialization.length;x++)
//             {
//                 y.push({"student_doc.specialization_id_major":ObjectId(searchSpecialization[x])})
//             }

//             aggregate.match({$or:y});
//         }
//     }

//     if(searchageFrom===null || searchageFrom ===undefined|| searchageFrom ==="" ||searchageTo===null || searchageTo ===undefined||searchageTo ==="")
//         {
            
//         }else
//         {
//             aggregate.match ({"student_doc.age": {$gte: searchageFrom ,$lt: searchageTo}});
//         }

//     if(searchGender===null || searchGender ===undefined ||searchGender==="")
//         {
            
//         }else
//         {
//             aggregate.match({"student_doc.gender":{"$regex": searchGender, "$options": "i"}});

//         }

//     if(searchMarks===null || searchMarks ===undefined||searchMarks==="")
//         {
            
//         }else
//         {
//             aggregate.match({"student_doc.overall_grade":{$gte: parseInt(searchMarks)}});

//         }
        
//     if(searchAcadamicFrom===null || searchAcadamicFrom ===undefined|| searchAcadamicFrom ==="" ||searchAcadamicTo===null || searchAcadamicTo ===undefined||searchAcadamicTo ==="")
//         {
            
//         }else
//         {
//             aggregate.match ({"student_doc.academic_to": {$gte: searchAcadamicFrom ,$lt: searchAcadamicTo}});
//         }

//     let page_no=req.params.page;                

//     if(page_no==0)
//     {
//         res.send(
        
//             setting.status("Error",false,"page No error",null)

//         );
//     }

//     var options = { page : page_no, limit :parseInt(variables.pagecontent) }

//     Suggestion.aggregatePaginate(aggregate, options, function(err, results, pageCount, count) {
//         if(err) 
//         {
//             console.log(err)
//             res.send(
    
//                 setting.status("Error",false,"error",err)

//             );
//         }
//         else
//         { 
        
//             res.send(
        
//                 setting.status("Details'",true,"No data found",{pageCount:pageCount,results})

//             );
        
//         }
//     })       
// })

//*************************************Suggestionss****************************************** */

var ObjectId = require('mongodb').ObjectID;
var id=req.params.vacancy_id;
console.log(id)
if(!ObjectId.isValid(id))
    {
        return res.send(
                
            setting.status("Incorrect ID",false,"incorrect id",null)

         );
    }


let course=[];
let specialzations=[];
let invite_student=[];
let reject_student=[];
let vacancy_details=[];
let vacancy_course=[];
var overall_grade_cgpa="";
var overall_grade_percentage="";
var overall_grade_grade="";


var ObjectId = require('mongodb').ObjectID;


    await Invite.find({vacancy_id:id})
    .then(result => {

        invite_student=result
    });

    await Reject.find({vacancy_id:id})
    .then(result => {

        reject_student=result
    });

    await Vacancy_Course.find({vacancy_id:id}).populate('course_id')
    .then(result => {

        course=result
        console.log(course)
    }); 

     await Vacancy_specialization.find({vacancy_id:id})
    .then(result => {

        specialzations=result
    }); 

    await Vacancy.find({_id:id})
    .then(result => {

        vacancy_details=result;
        overall_grade_cgpa=result[0].minimum_cgpa;
        overall_grade_percentage=result[0].minimum_percentage;
        overall_grade_grade=result[0].minimum_grade;
    }); 

var aggregate = Student.aggregate();

var page_no = req.param('page');

let searchUni=[];
let searchCollege=[];
let searchCourse=[];
let searchSpecialization=[];
searchUni=req.body.searchUni;
searchCollege=req.body.searchCollege;
searchCourse=req.body.searchCourse;
searchSpecialization=req.body.searchSpecialization;

var searchageFrom = req.body.searchageFrom;
var searchageTo = req.body.searchageTo;
var searchGender = req.body.searchGender;
var searchMarks = req.body.searchMarks;
var searchAcadamicFrom = req.body.searchAcadamicFrom;
var searchYear = req.body.searchYear;

var searchAcadamicTo = req.body.searchAcadamicTo;
var searchCGPA=req.body.searchCGPA;
var searchPercentage=req.body.searchPercentage;
var searchGrade=req.body.searchGrade;
var searchInterest=req.body.searchInterest;


aggregate.sort({"createdAt" : -1}) 
.lookup({ from: "internships", localField: "_id", foreignField: "student_id",as: "internship_doc"})
.match({"is_approved":true})
.match({"is_worked":false})
.lookup({ from: "student_enrollments", localField: "_id", foreignField: "_id",as: "student_doc"})
.lookup({ from: "colleges", localField: "college_id", foreignField: "_id",as: "college_doc"})
.lookup({ from: "courses", localField: "course_id", foreignField: "_id",as: "course_doc"})
.lookup({ from: "specializations", localField: "specialization_id_major", foreignField: "_id",as: "major_doc"})
.lookup({ from: "specializations", localField: "specialization_id_minor", foreignField: "_id",as: "minor_doc"})
.lookup({ from: "universities", localField: "college_doc.university_id", foreignField: "_id",as: "university_doc"})
.lookup({ from: "interests", localField: "student_doc._id", foreignField: "student_id",as: "interest_doc"})
.project({"fname":"$fname","lname":"$lname","course_id":"$course_id","specialization_id_major":"$specialization_id_major","specialization_id_minor":"$specialization_id_minor",
"_id":"$_id","age":"age","gender":"$gender","overall_grade":"$overall_grade","academic_from":"$academic_from","academic_to":"$academic_to","college_id":"$college_id",
"overall_grade":"$overall_grade",
"student_doc":"$student_doc","internship_doc":"$internship_doc","college_doc":"$college_doc",
"course_doc":"$course_doc","major_doc":"$major_doc","minor_doc":"$minor_doc","university_doc":"$university_doc","interest_doc":"$interest_doc",
"is_like": {
    "$size": {
        $filter: {
        input: "$interest_doc",
        as: "s",
        cond: { $and: [
            { $eq: [ "$$s.vacancy_id", ObjectId(id) ] },
            { $eq: [ "$$s.status", "active" ] }
            ] }
        }
    }
    }
})

if(searchUni===null || searchUni ===undefined|| searchUni ==="")
{
    
}else
{
    if(searchUni.length>0)
    {
        for(let x=0;x<searchUni.length;x++)
        {
            aggregate.match({"university_doc._id":ObjectId(searchUni[x])});
        }
    }
}


if(specialzations===null || specialzations ===undefined|| specialzations ==="")
{
    
}else
{
    if(specialzations.length>0)
    {
        let y=[];

        for(let x=0;x<specialzations.length;x++)
        {
            y.push({"specialization_id_major":ObjectId(specialzations[x].specialization_id)},{"specialization_id_minor":ObjectId(specialzations[x].specialization_id)})
        }

        aggregate.match({$or:y});

    }
}

if(course===null || course ===undefined|| course ==="")
{
    
}else
{
    if(course.length>0)
    {
        let y=[];

        for(let x=0;x<course.length;x++)
        {
            y.push({"course_id":ObjectId(course[x].course_id._id)})
        }

        aggregate.match({$or:y});
        
    }
}


if(overall_grade_cgpa===null || overall_grade_cgpa ===undefined|| overall_grade_cgpa ==="")
{
    
}else
{ 
    aggregate.match({$or:[{"overall_grade":{$gte:overall_grade_cgpa}},{"overall_grade":{$gte:overall_grade_percentage}}]})   
}

if(overall_grade_grade===null || overall_grade_grade ===undefined ||overall_grade_grade==="")
    {
        
    }else
    {

        var word = "100";
        console.log( /^[A-Z]/.test( word),"tyrtyur76yu" );

        if(/^[A-Z]/.test(overall_grade_grade))
        {
            let array = variables.GRADES;

            let key  = array.indexOf(overall_grade_grade);
            let select_array = [];
            if(key === -1){
                console.log("error")
            }else{
                for(i=key;i >=0; i--){
                    select_array.push(array[i]);
                }
                
            }

            aggregate.match({"overall_grade":{$in:select_array}});
        }
    }

if(invite_student===null || invite_student ===undefined|| invite_student ==="")
{
    
}else
{
    if(invite_student.length>0)
    {
        let y=[];

        for(let x=0;x<invite_student.length;x++)
        {
            y.push(invite_student[x].student_id)
        }

        aggregate.match({"_id":{$nin:y}});
        
    }
}

if(reject_student===null || reject_student ===undefined|| reject_student ==="")
{
    
}else
{
    if(reject_student.length>0)
    {
        let y=[];

        for(let x=0;x<reject_student.length;x++)
        {
            y.push(reject_student[x].student_id)
        }

        aggregate.match({"_id":{$nin:y}});
        
    }
}

if(searchPercentage===null || searchPercentage ===undefined ||searchPercentage==="")
    {
        
    }else
    {

        aggregate.match({"course_doc.marking_criteria":"percentage"});
        aggregate.match({overall_grade:{$gte:searchPercentage}});

    }

if(searchCGPA===null || searchCGPA ===undefined ||searchCGPA==="")
    {
        
    }else
    {
        aggregate.match({"course_doc.marking_criteria":"cgpa"});
        aggregate.match({"overall_grade":{$gte: searchCGPA}});

    }

if(searchGrade===null || searchGrade ===undefined ||searchGrade==="")
    {
        
    }else
    {
        let array = variables.GRADES;

        let key  = array.indexOf(searchGrade);
        let select_array = [];
        if(key === -1){
            console.log("error")
        }else{
            for(i=key;i >=0; i--){
                select_array.push(array[i]);
            }
            
        }

        aggregate.match({"overall_grade":{$in:select_array}});

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
            y.push({"college_id":ObjectId(searchCollege[x])})
        }

        aggregate.match({$or:y});
    }
}

if(searchCourse===null || searchCourse ===undefined|| searchCourse ==="")
{
    
}else
{
    if(searchCourse.length>0)
    {
        let y=[];

        for(let x=0;x<searchCourse.length;x++)
        {
            y.push({"course_id":ObjectId(searchCourse[x])})
        }

        aggregate.match({$or:y});
    }
}

if(searchSpecialization===null || searchSpecialization ===undefined|| searchSpecialization ==="")
{
    
}else
{
    if(searchSpecialization.length>0)
    {
        let y=[];

        for(let x=0;x<searchSpecialization.length;x++)
        {
            y.push({"specialization_id_major":ObjectId(searchSpecialization[x])})
        }

        aggregate.match({$or:y});
    }
}

if(searchageFrom===null || searchageFrom ===undefined|| searchageFrom ==="" ||searchageTo===null || searchageTo ===undefined||searchageTo ==="")
    {
        
    }else
    {
        aggregate.match ({"age": {$gte: searchageFrom ,$lte: searchageTo}});
    }

if(searchGender===null || searchGender ===undefined ||searchGender==="")
    {
        
    }else
    {
        aggregate.match({"gender":searchGender});

    }

// if(searchMarks===null || searchMarks ===undefined||searchMarks==="")
//     {
        
//     }else
//     {
//         aggregate.match({"overall_grade":{$gte: parseInt(searchMarks)}});

//     }
    
if(searchYear===null || searchYear ===undefined|| searchYear ==="")
    {
        
    }else
    {
        
        aggregate.match ({"academic_from":parseInt(searchYear)});
        aggregate.match ({"academic_to": {$lte: parseInt(searchYear)}});

    }

if(searchInterest===null || searchInterest ===undefined|| searchInterest ==="" )
    {
        console.log("not int");
        
    }else  
    {
        aggregate.match ({"interest_doc.vacancy_id":ObjectId(id)});

    }




var options = { page : page_no, limit :setting.pagecontent }

Student.aggregatePaginate(aggregate, options, function(err, results, pageCount, count) {
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
    
            setting.status("Details'",true,"data found",{pageCount:pageCount,count:count,vacancy_course:course,
                vacancy_specialization:specialzations,results})

        );
    
    }
})  
})


router.post('/vacancy/:vacancy_id/student/:student_id/invite', middleware.checkToken,(req, res) => {

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
    console.log(req.body.accept)

    if(req.body.accept==="accept")
    {

        const newInvite = new Invite({
        student_id: student_id,
        vacancy_id: vacancy_id,
        status:'1',
        //is_accepted:false,
        });

            newInvite.save()
            .then(college =>{
            
                var html;
                
                Student.find({_id:student_id})
                .then(result => {

                    var email=result[0].email;
                    var name=result[0].fname;

                Vacancy.find({_id:vacancy_id}).populate("employer_id")
                .then(async result => {

                    var job_title=await result[0].job_title;
                    var emp_name=await result[0].employer_id.name;
                    var emp_email=await result[0].employer_id.email;


                    
                    html=`<!DOCTYPE html><html><head> <meta charset="utf-8"> <meta http-equiv="x-ua-compatible" content="ie=edge"> 
                    <title>Registed</title> <meta name="viewport" content="width=device-width, initial-scale=1"> <style type="text/css"> /** * Google webfonts. Recommended to include the .woff version for cross-client compatibility. */ @media screen{@font-face{font-family: 'Source Sans Pro'; font-style: normal; font-weight: 400; src: local('Source Sans Pro Regular'), local('SourceSansPro-Regular'), url(https://fonts.gstatic.com/s/sourcesanspro/v10/ODelI1aHBYDBqgeIAH2zlBM0YzuT7MdOe03otPbuUS0.woff) format('woff');}@font-face{font-family: 'Source Sans Pro'; font-style: normal; font-weight: 700; src: local('Source Sans Pro Bold'), local('SourceSansPro-Bold'), url(https://fonts.gstatic.com/s/sourcesanspro/v10/toadOcfmlt9b38dHJxOBGFkQc6VGVFSmCnC_l7QZG60.woff) format('woff');}}/** * Avoid browser level font resizing. * 1. Windows Mobile * 2. iOS / OSX */ body, table, td, a{-ms-text-size-adjust: 100%; /* 1 */ -webkit-text-size-adjust: 100%; /* 2 */}/** * Remove extra space added to tables and cells in Outlook. */ table, td{mso-table-rspace: 0pt; mso-table-lspace: 0pt;}/** * Better fluid images in Internet Explorer. */ img{-ms-interpolation-mode: bicubic;}/** * Remove blue links for iOS devices. */ a[x-apple-data-detectors]{font-family: inherit !important; font-size: inherit !important; font-weight: inherit !important; line-height: inherit !important; color: inherit !important; text-decoration: none !important;}/** * Fix centering issues in Android 4.4. */ div[style*="margin: 16px 0;"]{margin: 0 !important;}body{width: 100% !important; height: 100% !important; padding: 0 !important; margin: 0 !important;}/** * Collapse table borders to avoid space between cells. */ table{border-collapse: collapse !important;}a{color: #1a82e2;}img{height: auto; line-height: 100%; text-decoration: none; border: 0; outline: none;}</style></head><body style="background-color: #e9ecef;"> <div class="preheader" style="display: none; max-width: 0; max-height: 0; overflow: hidden; font-size: 1px; line-height: 1px; color: #fff; opacity: 0;"> 
                    CAS SHRC: Invitation for an Interview </div><table border="0" cellpadding="0" cellspacing="0" width="100%"> <tr> <td align="center" bgcolor="#e9ecef"><!--[if (gte mso 9)|(IE)]> <table align="center" border="0" cellpadding="0" cellspacing="0" width="600"> <tr> <td align="center" valign="top" width="600"><![endif]--> <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;"> <tr> <td align="center" valign="top" style="padding: 36px 24px;"> <a href="http://172.104.40.142:3000" target="_blank" style="display: inline-block;"> <img src="http://172.104.40.142:3000/img/brand/logo-white.png" alt="Logo" border="0" width="200" style="display: block; width: 200px; max-width: 200px; min-width: px;"> </a> </td></tr></table><!--[if (gte mso 9)|(IE)]> </td></tr></table><![endif]--> </td></tr><tr> <td align="center" bgcolor="#e9ecef"><!--[if (gte mso 9)|(IE)]> <table align="center" border="0" cellpadding="0" cellspacing="0" width="600"> <tr> <td align="center" valign="top" width="600"><![endif]--> <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;"> <tr> <td align="left" bgcolor="#ffffff" style="padding: 36px 24px 0; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; border-top: 3px solid #d4dadf;"> 
                    <h1 style="margin: 0; font-size: 32px; font-weight: 700; letter-spacing: -1px; line-height: 48px;">
                    Interview Invitation</h1> </td></tr></table><!--[if (gte mso 9)|(IE)]> </td></tr></table><![endif]--> </td></tr><tr> <td align="center" bgcolor="#e9ecef"><!--[if (gte mso 9)|(IE)]> <table align="center" border="0" cellpadding="0" cellspacing="0" width="600"> <tr> <td align="center" valign="top" width="600"><![endif]--> <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;"> <tr> <td align="left" bgcolor="#ffffff" style="padding: 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; line-height: 24px;"> <p style="margin: 0;">
                    Dear ` + name + `, you have been invited for an interview for the position of ` + job_title + ` in `+ emp_name +`.
                    You may contact the employer via this email: `+ emp_email +`
                    </td></tr><tr> <td align="left" bgcolor="#ffffff"> <table border="0" cellpadding="0" cellspacing="0" width="100%"> <tr> <td align="center" bgcolor="#ffffff" style="padding: 12px;"> <table border="0" cellpadding="0" cellspacing="0"> <tr> <td align="center" bgcolor="#1a82e2" style="border-radius: 6px;"> <a href="http://172.104.40.142:3000" target="_blank" style="display: inline-block; padding: 16px 36px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; color: #ffffff; text-decoration: none; border-radius: 6px;">
                    GO TO APPLICATION</a> </td></tr></table> </td></tr></table> </td></tr></table><!--[if (gte mso 9)|(IE)]> </td></tr></table><![endif]--> </td></tr><tr> <td align="center" bgcolor="#e9ecef" style="padding: 24px;"><!--[if (gte mso 9)|(IE)]> <table align="center" border="0" cellpadding="0" cellspacing="0" width="600"> <tr> <td align="center" valign="top" width="600"><![endif]--> <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;"> <tr> <td align="center" bgcolor="#e9ecef" style="padding: 12px 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 14px; line-height: 20px; color: #666;"> 
                    <p style="margin: 0;"><b>CAS SHRC | Bridging Talents and Opportunities</b></p></td></tr></table><!--[if (gte mso 9)|(IE)]> </td></tr></table><![endif]--> </td></tr></table> </body></html>`
                
                    sendMail.sendMail(email,html,'Job Invitation')
                        
                    });
                });  
                
                
            reject(vacancy_id,student_id)
                
            res.json(

                setting.status("Succesfully Invited",true,"invited",college)
        
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
    
    else if(req.body.accept==="reject")
    {
        reject(vacancy_id,student_id);
        res.json(

            setting.status("Rejected",true,"rejected",null)

        );
    }
})

function reject(vacancy_id,student_id)
{
    Suggestion.remove({vacancy_id:vacancy_id,student_id:student_id})
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


router.get('/vacancy/:vacancy_id/invite', middleware.checkToken,(req, res) => {

    // var result=middleware.function1("CAN_VIEW_EMPLOYER");
    // if(!result.status)
    // {
    //     return res.send(result);
    // }


    var ObjectId = require('mongodb').ObjectID;
    var vacancy_id=req.params.vacancy_id;
	
	if(!ObjectId.isValid(vacancy_id))
		{
			return res.send(
					
				setting.status("Incorrect Id",false,"incorrect id",null)

			 );
        }
        
    var aggregate = Invite.aggregate();

    aggregate.match({"vacancy_id":ObjectId(vacancy_id)})
    //.match({status:"active"})    
    .lookup({ from: "student_enrollments", localField: "student_id", foreignField: "_id",as: "student_doc"})
    .lookup({ from: "internships", localField: "student_doc._id", foreignField: "student_id",as: "internship_doc"})
    .lookup({ from: "colleges", localField: "student_doc.college_id", foreignField: "_id",as: "college_doc"})
    .lookup({ from: "courses", localField: "student_doc.course_id", foreignField: "_id",as: "course_doc"})
    .lookup({ from: "specializations", localField: "student_doc.specialization_id_major", foreignField: "_id",as: "major_doc"})
    .lookup({ from: "specializations", localField: "student_doc.specialization_id_minor", foreignField: "_id",as: "minor_doc"})
    .project({"student_doc.password":0})

    let page_no=req.params.page;                

    if(page_no==0)
    {
        res.send(
        
            setting.status("page no error",false,"page No error",null)

        );
    }

    var options = { page : page_no, limit : parseInt(variables.pagecontent)}

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
        
                setting.status("Details'",true,"No data found",{results})

            );
        
        }
    })       
})


router.get('/vacancy/:vacancy_id/accepted', middleware.checkToken,(req, res) => {

    // var result=middleware.function1("CAN_VIEW_EMPLOYER");
    // if(!result.status)
    // {
    //     return res.send(result);
    // }


    var ObjectId = require('mongodb').ObjectID;
    var vacancy_id=req.params.vacancy_id;
	
	if(!ObjectId.isValid(vacancy_id))
		{
			return res.send(
					
				setting.status("Incorrect Id",false,"incorrect id",null)

			 );
        }
        
    var aggregate = Invite.aggregate();

    aggregate.match({"vacancy_id":ObjectId(vacancy_id)})
    .match({is_accepted:true})
    //.match({status:"active"})
    .lookup({ from: "student_enrollments", localField: "student_id", foreignField: "_id",as: "student_doc"})
    .lookup({ from: "internships", localField: "student_doc._id", foreignField: "student_id",as: "internship_doc"})
    .lookup({ from: "colleges", localField: "student_doc.college_id", foreignField: "_id",as: "college_doc"})
    .lookup({ from: "courses", localField: "student_doc.course_id", foreignField: "_id",as: "course_doc"})
    .lookup({ from: "specializations", localField: "student_doc.specialization_id_major", foreignField: "_id",as: "major_doc"})
    .lookup({ from: "specializations", localField: "student_doc.specialization_id_minor", foreignField: "_id",as: "minor_doc"})
    .project({"student_doc.password":0})

    let page_no=req.params.page;                

    if(page_no==0)
    {
        res.send(
        
            setting.status("incorrect page number",false,"page No error",null)

        );
    }

    var options = { page : page_no, limit : parseInt(variables.pagecontent)}

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

    if(req.body.date==undefined || req.body.date==null || req.body.date=='') 
        {
            return res.json(

                setting.status("Date cannot be empty",false,"date is empty",null)
        
            );
        }

    if(req.body.venue==undefined || req.body.venue==null || req.body.venue=='') 
        {
            return res.json(

                setting.status("venue cannot be empty",false,"venue is empty",null)
        
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

        Invite.findOneAndUpdate(
            { student_id : student_id,vacancy_id:vacancy_id },
            {$set:{
            date:req.body.date,venue:req.body.venue,
        }},
        {runValidators: true, context: 'query' })
            .then(college =>{

                    var html;

                    Student.find({_id:student_id})
                    .then(result => {

                        var email=result[0].email;
                        var name=result[0].fname;

                    Vacancy.find({_id:vacancy_id}).populate("employer_id")
                    .then(async result => {

                        var job_title=await result[0].job_title;
                        var emp_name=await result[0].employer_id.name;
                        var emp_email=await result[0].employer_id.email;
                        
                        html=`<!DOCTYPE html><html><head> <meta charset="utf-8"> <meta http-equiv="x-ua-compatible" content="ie=edge"> 
                        <title>Interview</title> <meta name="viewport" content="width=device-width, initial-scale=1"> <style type="text/css"> /** * Google webfonts. Recommended to include the .woff version for cross-client compatibility. */ @media screen{@font-face{font-family: 'Source Sans Pro'; font-style: normal; font-weight: 400; src: local('Source Sans Pro Regular'), local('SourceSansPro-Regular'), url(https://fonts.gstatic.com/s/sourcesanspro/v10/ODelI1aHBYDBqgeIAH2zlBM0YzuT7MdOe03otPbuUS0.woff) format('woff');}@font-face{font-family: 'Source Sans Pro'; font-style: normal; font-weight: 700; src: local('Source Sans Pro Bold'), local('SourceSansPro-Bold'), url(https://fonts.gstatic.com/s/sourcesanspro/v10/toadOcfmlt9b38dHJxOBGFkQc6VGVFSmCnC_l7QZG60.woff) format('woff');}}/** * Avoid browser level font resizing. * 1. Windows Mobile * 2. iOS / OSX */ body, table, td, a{-ms-text-size-adjust: 100%; /* 1 */ -webkit-text-size-adjust: 100%; /* 2 */}/** * Remove extra space added to tables and cells in Outlook. */ table, td{mso-table-rspace: 0pt; mso-table-lspace: 0pt;}/** * Better fluid images in Internet Explorer. */ img{-ms-interpolation-mode: bicubic;}/** * Remove blue links for iOS devices. */ a[x-apple-data-detectors]{font-family: inherit !important; font-size: inherit !important; font-weight: inherit !important; line-height: inherit !important; color: inherit !important; text-decoration: none !important;}/** * Fix centering issues in Android 4.4. */ div[style*="margin: 16px 0;"]{margin: 0 !important;}body{width: 100% !important; height: 100% !important; padding: 0 !important; margin: 0 !important;}/** * Collapse table borders to avoid space between cells. */ table{border-collapse: collapse !important;}a{color: #1a82e2;}img{height: auto; line-height: 100%; text-decoration: none; border: 0; outline: none;}</style></head><body style="background-color: #e9ecef;"> <div class="preheader" style="display: none; max-width: 0; max-height: 0; overflow: hidden; font-size: 1px; line-height: 1px; color: #fff; opacity: 0;"> 
                        CAS SHRC: Interview Result </div><table border="0" cellpadding="0" cellspacing="0" width="100%"> <tr> <td align="center" bgcolor="#e9ecef"><!--[if (gte mso 9)|(IE)]> <table align="center" border="0" cellpadding="0" cellspacing="0" width="600"> <tr> <td align="center" valign="top" width="600"><![endif]--> <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;"> <tr> <td align="center" valign="top" style="padding: 36px 24px;"> <a href="http://172.104.40.142:3000" target="_blank" style="display: inline-block;"> <img src="http://172.104.40.142:3000/img/brand/logo-white.png" alt="Logo" border="0" width="200" style="display: block; width: 200px; max-width: 200px; min-width: px;"> </a> </td></tr></table><!--[if (gte mso 9)|(IE)]> </td></tr></table><![endif]--> </td></tr><tr> <td align="center" bgcolor="#e9ecef"><!--[if (gte mso 9)|(IE)]> <table align="center" border="0" cellpadding="0" cellspacing="0" width="600"> <tr> <td align="center" valign="top" width="600"><![endif]--> <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;"> <tr> <td align="left" bgcolor="#ffffff" style="padding: 36px 24px 0; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; border-top: 3px solid #d4dadf;"> 
                        <h1 style="margin: 0; font-size: 32px; font-weight: 700; letter-spacing: -1px; line-height: 48px;">
                        Interview Details</h1> </td></tr></table><!--[if (gte mso 9)|(IE)]> </td></tr></table><![endif]--> </td></tr><tr> <td align="center" bgcolor="#e9ecef"><!--[if (gte mso 9)|(IE)]> <table align="center" border="0" cellpadding="0" cellspacing="0" width="600"> <tr> <td align="center" valign="top" width="600"><![endif]--> <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;"> <tr> <td align="left" bgcolor="#ffffff" style="padding: 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; line-height: 24px;"> <p style="margin: 0;">
                        your interview date ` + req.body.date + `</br> venue :`+ req.body.venue +`
                        </td></tr><tr> <td align="left" bgcolor="#ffffff"> <table border="0" cellpadding="0" cellspacing="0" width="100%"> <tr> <td align="center" bgcolor="#ffffff" style="padding: 12px;"> <table border="0" cellpadding="0" cellspacing="0"> <tr> <td align="center" bgcolor="#1a82e2" style="border-radius: 6px;"> <a href="http://172.104.40.142:3000" target="_blank" style="display: inline-block; padding: 16px 36px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; color: #ffffff; text-decoration: none; border-radius: 6px;">
                        GO TO APPLICATION</a> </td></tr></table> </td></tr></table> </td></tr></table><!--[if (gte mso 9)|(IE)]> </td></tr></table><![endif]--> </td></tr><tr> <td align="center" bgcolor="#e9ecef" style="padding: 24px;"><!--[if (gte mso 9)|(IE)]> <table align="center" border="0" cellpadding="0" cellspacing="0" width="600"> <tr> <td align="center" valign="top" width="600"><![endif]--> <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;"> <tr> <td align="center" bgcolor="#e9ecef" style="padding: 12px 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 14px; line-height: 20px; color: #666;"> 
                        <p style="margin: 0;"><b>CAS SHRC | Bridging Talents and Opportunities</b></p></td></tr></table><!--[if (gte mso 9)|(IE)]> </td></tr></table><![endif]--> </td></tr></table> </body></html>`
                    
                        // sendMail.sendMail(email,html,'Job Interview','Invite to interview')
                        sendMail.sendMail(email,html,'Job Interview')

                        });
                    });   
                    
                res.json(

                    setting.status("Succesfully Invite for interview",true,"invited",college)
            
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
    
})


router.get('/vacancy/:vacancy_id/interview', middleware.checkToken,(req, res) => {

    // var result=middleware.function1("CAN_VIEW_EMPLOYER");
    // if(!result.status)
    // {
    //     return res.send(result);
    // }


    var ObjectId = require('mongodb').ObjectID;
    var vacancy_id=req.params.vacancy_id;
	
	if(!ObjectId.isValid(vacancy_id))
		{
			return res.send(
					
				setting.status("Incorrect Id",false,"incorrect id",null)

			 );
        }
        
    var aggregate = Vacancy_Student.aggregate();

    aggregate.match({"vacancy_id":ObjectId(vacancy_id)})
    //.match({status:"active"})
    .lookup({ from: "student_enrollments", localField: "student_id", foreignField: "_id",as: "student_doc"})
    .lookup({ from: "internships", localField: "student_doc._id", foreignField: "student_id",as: "internship_doc"})
    .lookup({ from: "colleges", localField: "student_doc.college_id", foreignField: "_id",as: "college_doc"})
    .lookup({ from: "courses", localField: "student_doc.course_id", foreignField: "_id",as: "course_doc"})
    .lookup({ from: "specializations", localField: "student_doc.specialization_id_major", foreignField: "_id",as: "major_doc"})
    .lookup({ from: "specializations", localField: "student_doc.specialization_id_minor", foreignField: "_id",as: "minor_doc"})
    .project({"student_doc.password":0})

    let page_no=req.params.page;                

    if(page_no==0)
    {
        res.send(
        
            setting.status("page no error",false,"page No error",null)

        );
    }

    var options = { page : page_no, limit : parseInt(variables.pagecontent)}

    Vacancy_Student.aggregatePaginate(aggregate, options, function(err, results, pageCount, count) {
        if(err) 
        {
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
        Invite.findOneAndUpdate(
            { student_id : student_id,vacancy_id:vacancy_id },
            {$set:{
            status:"5",
        }},
        {runValidators: true, context: 'query' })
            .then(college =>{

                    var html;

                    Student.find({_id:student_id})
                    .then(result => {

                        var email=result[0].email;
                        var name=result[0].fname;

                    Vacancy.find({_id:vacancy_id})
                    .then(result => {

                        var job_title=result[0].job_title;

                        
                        html=`<!DOCTYPE html><html><head> <meta charset="utf-8"> <meta http-equiv="x-ua-compatible" content="ie=edge"> 
                        <title>Registed</title> <meta name="viewport" content="width=device-width, initial-scale=1"> <style type="text/css"> /** * Google webfonts. Recommended to include the .woff version for cross-client compatibility. */ @media screen{@font-face{font-family: 'Source Sans Pro'; font-style: normal; font-weight: 400; src: local('Source Sans Pro Regular'), local('SourceSansPro-Regular'), url(https://fonts.gstatic.com/s/sourcesanspro/v10/ODelI1aHBYDBqgeIAH2zlBM0YzuT7MdOe03otPbuUS0.woff) format('woff');}@font-face{font-family: 'Source Sans Pro'; font-style: normal; font-weight: 700; src: local('Source Sans Pro Bold'), local('SourceSansPro-Bold'), url(https://fonts.gstatic.com/s/sourcesanspro/v10/toadOcfmlt9b38dHJxOBGFkQc6VGVFSmCnC_l7QZG60.woff) format('woff');}}/** * Avoid browser level font resizing. * 1. Windows Mobile * 2. iOS / OSX */ body, table, td, a{-ms-text-size-adjust: 100%; /* 1 */ -webkit-text-size-adjust: 100%; /* 2 */}/** * Remove extra space added to tables and cells in Outlook. */ table, td{mso-table-rspace: 0pt; mso-table-lspace: 0pt;}/** * Better fluid images in Internet Explorer. */ img{-ms-interpolation-mode: bicubic;}/** * Remove blue links for iOS devices. */ a[x-apple-data-detectors]{font-family: inherit !important; font-size: inherit !important; font-weight: inherit !important; line-height: inherit !important; color: inherit !important; text-decoration: none !important;}/** * Fix centering issues in Android 4.4. */ div[style*="margin: 16px 0;"]{margin: 0 !important;}body{width: 100% !important; height: 100% !important; padding: 0 !important; margin: 0 !important;}/** * Collapse table borders to avoid space between cells. */ table{border-collapse: collapse !important;}a{color: #1a82e2;}img{height: auto; line-height: 100%; text-decoration: none; border: 0; outline: none;}</style></head><body style="background-color: #e9ecef;"> <div class="preheader" style="display: none; max-width: 0; max-height: 0; overflow: hidden; font-size: 1px; line-height: 1px; color: #fff; opacity: 0;"> 
                        Registered successfully. </div><table border="0" cellpadding="0" cellspacing="0" width="100%"> <tr> <td align="center" bgcolor="#e9ecef"><!--[if (gte mso 9)|(IE)]> <table align="center" border="0" cellpadding="0" cellspacing="0" width="600"> <tr> <td align="center" valign="top" width="600"><![endif]--> <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;"> <tr> <td align="center" valign="top" style="padding: 36px 24px;"> <a href="` + variables. WEB_LINK+ `" target="_blank" style="display: inline-block;"> <img src="http://172.104.40.142:3000/img/brand/logo-white.png" alt="Logo" border="0" width="200" style="display: block; width: 200px; max-width: 200px; min-width: px;"> </a> </td></tr></table><!--[if (gte mso 9)|(IE)]> </td></tr></table><![endif]--> </td></tr><tr> <td align="center" bgcolor="#e9ecef"><!--[if (gte mso 9)|(IE)]> <table align="center" border="0" cellpadding="0" cellspacing="0" width="600"> <tr> <td align="center" valign="top" width="600"><![endif]--> <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;"> <tr> <td align="left" bgcolor="#ffffff" style="padding: 36px 24px 0; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; border-top: 3px solid #d4dadf;"> 
                        <h1 style="margin: 0; font-size: 32px; font-weight: 700; letter-spacing: -1px; line-height: 48px;">
                        Select to interview</h1> </td></tr></table><!--[if (gte mso 9)|(IE)]> </td></tr></table><![endif]--> </td></tr><tr> <td align="center" bgcolor="#e9ecef"><!--[if (gte mso 9)|(IE)]> <table align="center" border="0" cellpadding="0" cellspacing="0" width="600"> <tr> <td align="center" valign="top" width="600"><![endif]--> <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;"> <tr> <td align="left" bgcolor="#ffffff" style="padding: 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; line-height: 24px;"> <p style="margin: 0;">
                        Hi ` + name + `, you have invite to the post of ` + job_title + `. 
                        </td></tr><tr> <td align="left" bgcolor="#ffffff"> <table border="0" cellpadding="0" cellspacing="0" width="100%"> <tr> <td align="center" bgcolor="#ffffff" style="padding: 12px;"> <table border="0" cellpadding="0" cellspacing="0"> <tr> <td align="center" bgcolor="#1a82e2" style="border-radius: 6px;"> <a href="` + variables. WEB_LINK+ `" target="_blank" style="display: inline-block; padding: 16px 36px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; color: #ffffff; text-decoration: none; border-radius: 6px;">
                        GO TO APPLICATION</a> </td></tr></table> </td></tr></table> </td></tr></table><!--[if (gte mso 9)|(IE)]> </td></tr></table><![endif]--> </td></tr><tr> <td align="center" bgcolor="#e9ecef" style="padding: 24px;"><!--[if (gte mso 9)|(IE)]> <table align="center" border="0" cellpadding="0" cellspacing="0" width="600"> <tr> <td align="center" valign="top" width="600"><![endif]--> <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;"> <tr> <td align="center" bgcolor="#e9ecef" style="padding: 12px 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 14px; line-height: 20px; color: #666;"> 
                        <p style="margin: 0;"><b>CAS SHRC | Bridging Talents and Opportunities</b></p></td></tr></table><!--[if (gte mso 9)|(IE)]> </td></tr></table><![endif]--> </td></tr></table> </body></html>`
                    

                            sendMail.sendMail(email,html,'You are selected to interview')
                            
                        });
                    });   
                    
                res.json(

                    setting.status("Succesfully Invite for interview",true,"invited",college)
            
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
        Invite.findOneAndUpdate(
            { student_id : student_id,vacancy_id:vacancy_id },
            {$set:{
            status:"4",
        }},
        {runValidators: true, context: 'query' })
        .then(college =>{
           
            var html;

            Student.find({_id:student_id})
            .then(result => {

                var email=result[0].email;
                var name=result[0].fname;

            Vacancy.find({_id:vacancy_id})
            .then(result => {

                var job_title=result[0].job_title;

                
                html=`<!DOCTYPE html><html><head> <meta charset="utf-8"> <meta http-equiv="x-ua-compatible" content="ie=edge"> 
                <title>Registed</title> <meta name="viewport" content="width=device-width, initial-scale=1"> <style type="text/css"> /** * Google webfonts. Recommended to include the .woff version for cross-client compatibility. */ @media screen{@font-face{font-family: 'Source Sans Pro'; font-style: normal; font-weight: 400; src: local('Source Sans Pro Regular'), local('SourceSansPro-Regular'), url(https://fonts.gstatic.com/s/sourcesanspro/v10/ODelI1aHBYDBqgeIAH2zlBM0YzuT7MdOe03otPbuUS0.woff) format('woff');}@font-face{font-family: 'Source Sans Pro'; font-style: normal; font-weight: 700; src: local('Source Sans Pro Bold'), local('SourceSansPro-Bold'), url(https://fonts.gstatic.com/s/sourcesanspro/v10/toadOcfmlt9b38dHJxOBGFkQc6VGVFSmCnC_l7QZG60.woff) format('woff');}}/** * Avoid browser level font resizing. * 1. Windows Mobile * 2. iOS / OSX */ body, table, td, a{-ms-text-size-adjust: 100%; /* 1 */ -webkit-text-size-adjust: 100%; /* 2 */}/** * Remove extra space added to tables and cells in Outlook. */ table, td{mso-table-rspace: 0pt; mso-table-lspace: 0pt;}/** * Better fluid images in Internet Explorer. */ img{-ms-interpolation-mode: bicubic;}/** * Remove blue links for iOS devices. */ a[x-apple-data-detectors]{font-family: inherit !important; font-size: inherit !important; font-weight: inherit !important; line-height: inherit !important; color: inherit !important; text-decoration: none !important;}/** * Fix centering issues in Android 4.4. */ div[style*="margin: 16px 0;"]{margin: 0 !important;}body{width: 100% !important; height: 100% !important; padding: 0 !important; margin: 0 !important;}/** * Collapse table borders to avoid space between cells. */ table{border-collapse: collapse !important;}a{color: #1a82e2;}img{height: auto; line-height: 100%; text-decoration: none; border: 0; outline: none;}</style></head><body style="background-color: #e9ecef;"> <div class="preheader" style="display: none; max-width: 0; max-height: 0; overflow: hidden; font-size: 1px; line-height: 1px; color: #fff; opacity: 0;"> 
                Registered successfully. </div><table border="0" cellpadding="0" cellspacing="0" width="100%"> <tr> <td align="center" bgcolor="#e9ecef"><!--[if (gte mso 9)|(IE)]> <table align="center" border="0" cellpadding="0" cellspacing="0" width="600"> <tr> <td align="center" valign="top" width="600"><![endif]--> <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;"> <tr> <td align="center" valign="top" style="padding: 36px 24px;"> <a href="` + variables. WEB_LINK+ `" target="_blank" style="display: inline-block;"> <img src="http://172.104.40.142:3000/img/brand/logo-white.png" alt="Logo" border="0" width="200" style="display: block; width: 200px; max-width: 200px; min-width: px;"> </a> </td></tr></table><!--[if (gte mso 9)|(IE)]> </td></tr></table><![endif]--> </td></tr><tr> <td align="center" bgcolor="#e9ecef"><!--[if (gte mso 9)|(IE)]> <table align="center" border="0" cellpadding="0" cellspacing="0" width="600"> <tr> <td align="center" valign="top" width="600"><![endif]--> <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;"> <tr> <td align="left" bgcolor="#ffffff" style="padding: 36px 24px 0; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; border-top: 3px solid #d4dadf;"> 
                <h1 style="margin: 0; font-size: 32px; font-weight: 700; letter-spacing: -1px; line-height: 48px;">
                Reject Offer</h1> </td></tr></table><!--[if (gte mso 9)|(IE)]> </td></tr></table><![endif]--> </td></tr><tr> <td align="center" bgcolor="#e9ecef"><!--[if (gte mso 9)|(IE)]> <table align="center" border="0" cellpadding="0" cellspacing="0" width="600"> <tr> <td align="center" valign="top" width="600"><![endif]--> <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;"> <tr> <td align="left" bgcolor="#ffffff" style="padding: 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; line-height: 24px;"> <p style="margin: 0;">
                Hi ` + name + `, you have reject offer to the post of ` + job_title + `. 
                </td></tr><tr> <td align="left" bgcolor="#ffffff"> <table border="0" cellpadding="0" cellspacing="0" width="100%"> <tr> <td align="center" bgcolor="#ffffff" style="padding: 12px;"> <table border="0" cellpadding="0" cellspacing="0"> <tr> <td align="center" bgcolor="#1a82e2" style="border-radius: 6px;"> <a href="` + variables. WEB_LINK+ `" target="_blank" style="display: inline-block; padding: 16px 36px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; color: #ffffff; text-decoration: none; border-radius: 6px;">
                GO TO APPLICATION</a> </td></tr></table> </td></tr></table> </td></tr></table><!--[if (gte mso 9)|(IE)]> </td></tr></table><![endif]--> </td></tr><tr> <td align="center" bgcolor="#e9ecef" style="padding: 24px;"><!--[if (gte mso 9)|(IE)]> <table align="center" border="0" cellpadding="0" cellspacing="0" width="600"> <tr> <td align="center" valign="top" width="600"><![endif]--> <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;"> <tr> <td align="center" bgcolor="#e9ecef" style="padding: 12px 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 14px; line-height: 20px; color: #666;"> 
                <p style="margin: 0;"><b>CAS SHRC | Bridging Talents and Opportunities</b></p></td></tr></table><!--[if (gte mso 9)|(IE)]> </td></tr></table><![endif]--> </td></tr></table> </body></html>`
            

                    sendMail.sendMail(email,html,'Offer Rejected')
                    
                });
            });   
            
        res.json(

            setting.status("Succesfully reject offer",true,"offer rejected",college)
    
            );
        })
        .catch(err =>{
            console.log(err)
        })
    }
})


router.get('/vacancy/:vacancy_id/offer', middleware.checkToken,(req, res) => {

    // var result=middleware.function1("CAN_VIEW_EMPLOYER");
    // if(!result.status)
    // {
    //     return res.send(result);
    // }


    var ObjectId = require('mongodb').ObjectID;
    var vacancy_id=req.params.vacancy_id;
	
	if(!ObjectId.isValid(vacancy_id))
		{
			return res.send(
					
				setting.status("Incorrect Id",false,"incorrect id",null)

			 );
        }
        
    var aggregate = Offer.aggregate();

    aggregate.match({"vacancy_id":ObjectId(vacancy_id)})
    //.match({status:"active"})
    .lookup({ from: "student_enrollments", localField: "student_id", foreignField: "_id",as: "student_doc"})
    .lookup({ from: "internships", localField: "student_doc._id", foreignField: "student_id",as: "internship_doc"})
    .lookup({ from: "colleges", localField: "student_doc.college_id", foreignField: "_id",as: "college_doc"})
    .lookup({ from: "courses", localField: "student_doc.course_id", foreignField: "_id",as: "course_doc"})
    .lookup({ from: "specializations", localField: "student_doc.specialization_id_major", foreignField: "_id",as: "major_doc"})
    .lookup({ from: "specializations", localField: "student_doc.specialization_id_minor", foreignField: "_id",as: "minor_doc"})
    .project({"student_doc.password":0})

    let page_no=req.params.page;                

    if(page_no==0)
    {
        res.send(
        
            setting.status("incorrect page no",false,"page No error",null)

        );
    }

    var options = { page : page_no, limit : parseInt(variables.pagecontent)}

    Vacancy_Student.aggregatePaginate(aggregate, options, function(err, results, pageCount, count) {
        if(err) 
        {
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

//************************************************************************************************************ */

router.get('/dashboard/page', middleware.checkToken,(req, res) => {

    var ObjectId = require('mongodb').ObjectID;
    var employer_id=middleware.get_id();
	
    var aggregate = Invite.aggregate();

    console.log("employer",employer_id)

    aggregate
    .lookup({ from: "vacancies", localField: "vacancy_id", foreignField: "_id",as: "vacancy_doc"})
    .lookup({ from: "employers", localField: "vacancy_doc.employer_id", foreignField: "_id",as: "employer_doc"})
    .match({"employer_doc._id":ObjectId(employer_id)})
    .group( {_id: '$status',total: {$sum: 1}})
    .project({status:"$_id",total:"$total"})
    .sort({status:1})
    
    // .lookup({ from: "colleges", localField: "student_doc.college_id", foreignField: "_id",as: "college_doc"})
    // .lookup({ from: "courses", localField: "student_doc.course_id", foreignField: "_id",as: "course_doc"})
    // .lookup({ from: "specializations", localField: "student_doc.specialization_id_major", foreignField: "_id",as: "major_doc"})
    // .lookup({ from: "specializations", localField: "student_doc.specialization_id_minor", foreignField: "_id",as: "minor_doc"})
     //.project({"student_doc.password":0})


    let page_no=req.params.page;                

    if(page_no==0)
    {
        res.send(
        
            setting.status("page error",false,"page No error",null)

        );
    }

    var options = { page : page_no, limit : parseInt(variables.pagecontent)}

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

router.get('/notification/all', middleware.checkToken,(req, res) => {

    var ObjectId = require('mongodb').ObjectID;
    var employer_id=middleware.get_id();

    var aggregate = Notification.aggregate();

    let status=req.param('status');

    aggregate
    .match({"employer_id":ObjectId(employer_id)})
    .match({"status":{$nin:["1","4","5","7","9"]}})
    .lookup({ from: "vacancies", localField: "vacancy_id", foreignField: "_id",as: "vacancy_doc"})
    .lookup({ from: "employers", localField: "employer_id", foreignField: "_id",as: "employer_doc"})
    .lookup({ from: "student_enrollments", localField: "student_id", foreignField: "_id",as: "stu_doc"})
    .lookup({ from: "internships", localField: "student_doc._id", foreignField: "student_id",as: "internship_doc"})
    //.lookup({ from: "invites", localField: "vacancy_id", foreignField: "_id",as: "invitite_doc"})
    .project({"student_doc.password":0})
    .limit(150)

    if(status==null || status ==undefined ||status==" ")
    {
        
    }else
    {
        aggregate.match({"status":status});

    }
    
    let page_no=req.params.page;                

    if(page_no==0)
    {
        res.send(
        
            setting.status("page error",false,"page No error",null)

        );
    }

    var options = { page : page_no, limit : 150}

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
        
                setting.status("Details'",true,"data found",{results})

            );
        
        }
    })       
})

function change_status(vacancy_id)
{
    var ObjectId = require('mongodb').ObjectID;

    Notification.update(
        { vacancy_id: ObjectId(vacancy_id) }, //update doc with this id
        { $set:
           {
             "is_view":true
           }
        }
     )
    .then(college =>{  
                
        console.log("updated")
    })
    .catch(err => {
        
        if(err)
        {
           console.log("error",err)
                
        }
    });
}

let values=[];
router.get('/get/industry/', (req, res) => {

    Settings.find({key:"industry"})
        .then(result => {

            values=result[0].value.split(",");
                        
            res.send(
  
                setting.status("Show all",true,"details",{results:values})
        
              );
        });   
})
module.exports = router;