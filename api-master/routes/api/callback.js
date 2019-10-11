const express = require('express');
const router = express.Router();
const passport = require('passport');
//Load Input Validation
const Question = require('../../models/written_questions');
const setting=require("../return_msg/setting");
const questionValidation=require("../validation/question");
let middleware = require('../../validation/middleware');
const delay = require('delay');
const Student = require('../../models/student_enrollment');
var unique = require('array-unique');
const variables=require("../return_msg/keyvalue");
const qs = require('querystring');
const checksum_lib = require('./checksum.js');
var generator = require('generate-password');
const bcrypt = require('bcryptjs');
var sendMail = require("../../routes/return_msg/sendMail");

router.post('/', (req, res) => {
    
    var name="";

	var PaytmConfig = {
			 mid: variables.Merchant_ID,
			 key: variables.Merchant_KEY,
			 website:variables.WEBSIT
    }
	
		var paramlist = req.body;
		var paramarray = new Array();
				
        if(checksum_lib.verifychecksum(paramlist, PaytmConfig.key,paramlist.CHECKSUMHASH))
        {
				var the_string = paramlist.ORDERID;
				var parts = the_string.split('PRIME', 2);

				var the_num  = parts[1];

				if(paramlist.STATUS=="TXN_FAILURE")
			{				
				res.writeHead(301,
					{Location: variables.SERVER_NAME+'?failure'}
				);
				res.end();

			}else if(paramlist.STATUS=="TXN_SUCCESS")
			{

				Student.findOneAndUpdate(
					{ _id : the_num },
					{$set:{
					payment_status:"paid",
					payment_id:paramlist.TXNID

					}},
					{runValidators: true, context: 'query' })

					.then(college =>{ 
         	

					name=college.fname +'_' +college.lname;

					res.writeHead(301,
						{Location: variables.SERVER_NAME+'?succes='+name}
						);
						res.end(); 

            sendPaymentStatus(the_num)
											
					})
					.catch(err => {
							
						if(err)
						{
								console.log(err)
						}
					});
						
			}
				  		 
        }else
        {
				
					res.writeHead(301,
							{Location: variables.SERVER_NAME+'?failure'}
						);
						res.end();
					};
})


function sendPaymentStatus(id)
{
	Student.findById(id, 'fname email', function (err, getMailById) {

		var randPassword = generator.generate({
			length: 8,
			numbers: true
		});

		console.log(randPassword);

		//Hashing password 
		var hashedPassword = bcrypt.hashSync(randPassword, 10); //Hashing password to unreadable

		Student.findOne({ _id: id })
			.then(student => {
				if (!student) {
					setting.status("Student not found", false, "student not found", null)
				}
				else if (student) {
					Student.findByIdAndUpdate(id, {password: hashedPassword }, { new: true })
						.then(student => {
						
							if (student) {

                var links = variables.WEB_LOGIN;

                var html = `<!DOCTYPE HTML PUBLIC "-//W3C//DTD XHTML 1.0 Transitional //EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd"><html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office"><head>
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
                      Dear ` + getMailById.fname + `,
                    </span> </strong> <br><br>
                
                           <div style="text-align: left;">  <span style="line-height: 33px; font-size: 20px;">
                            
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
                        <div style="font-size:12px;line-height:18px;color:#0D0D0D;font-family:'Montserrat', 'Trebuchet MS', 'Lucida Grande', 'Lucida Sans Unicode', 'Lucida Sans', Tahoma, sans-serif;text-align:left;"><p style="margin: 0;font-size: 14px;line-height: 21px;text-align: center">We confirm receipt of your payment of RS ` + variables.STUDENT_PAYMENT + ` towards subscription with Prime Careers. <br><br>Please find enclosed your login credentials:<br><br> 
                
                        <code> Email : ` + getMailById.email + `</code> <br/><code> Password : ` + randPassword + ` 
                
                
                        </p></div> 

					<br><br><div style="font-size:12px;line-height:18px;color:#0D0D0D;font-family:'Montserrat', 'Trebuchet MS', 'Lucida Grande', 'Lucida Sans Unicode', 'Lucida Sans', Tahoma, sans-serif;text-align:left;"><p style="margin: 0;font-size: 14px;line-height: 21px;text-align: center">You are requested to review and complete your profile, for higher visibility to employers seeking aspirational students for employment opportunities.<br><br>
                
                        </p></div> 
                    </div>
                    <!--[if mso]></td></tr></table><![endif]-->
                </div>
                                  
                                  
                                    
                <div align="center" class="button-container center " style="padding-right: 10px; padding-left: 10px; padding-top:25px; padding-bottom:10px;">
                  <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0" style="border-spacing: 0; border-collapse: collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;"><tr><td style="padding-right: 10px; padding-left: 10px; padding-top:25px; padding-bottom:10px;" align="center"><v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="" style="height:46pt; v-text-anchor:middle; width:151pt;" arcsize="7%" strokecolor="#a8bf6f" fillcolor="#a8bf6f"><w:anchorlock/><v:textbox inset="0,0,0,0"><center style="color:#ffffff; font-family:'Montserrat', 'Trebuchet MS', 'Lucida Grande', 'Lucida Sans Unicode', 'Lucida Sans', Tahoma, sans-serif; font-size:16px;"><![endif]-->
                    <div style="color: #ffffff; background-color: #a8bf6f; border-radius: 4px; -webkit-border-radius: 4px; -moz-border-radius: 4px; max-width: 202px; width: 172px;width: auto; border-top: 0px solid transparent; border-right: 0px solid transparent; border-bottom: 0px solid transparent; border-left: 0px solid transparent; padding-top: 15px; padding-right: 15px; padding-bottom: 15px; padding-left: 15px; font-family: 'Montserrat', 'Trebuchet MS', 'Lucida Grande', 'Lucida Sans Unicode', 'Lucida Sans', Tahoma, sans-serif; text-align: center; mso-border-alt: none;">
                      
                
                      <span style="font-size:16px;line-height:32px;"><a href="`+ links + `" style="text-decoration : none; color : #fff;"><strong>Login</strong></a></span>
                
                
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
																

                sendMail.sendMail(getMailById.email, html, 'Payment Confirmation')

							}

						})
				}
			})

			.catch(err => { console.log(err);
			; });
	});					
}

module.exports = router;