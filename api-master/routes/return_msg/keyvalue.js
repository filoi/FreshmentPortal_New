const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
var assert = require('assert');
const request = require("request");
var ObjectId = require('mongodb').ObjectID;
//require("../routes/admin_event");
const Setting = require('../../models/setting');
var sendMail=require("./sendMail");

keyvalue();

//exports.SERVER_NAME="http://www.primecareers.co.in"
exports.SERVER_NAME ="http://172.104.40.142"
// exports.SERVER_NAME="http://localhost";

exports.WEB_LOGIN=this.SERVER_NAME;
exports.WEB_LINK_STUDENT=this.SERVER_NAME+":8000/#/opportunities";
exports.WEB_LINK_EMPLOYER=this.SERVER_NAME+":8000/#/dashboard";
exports.SUCCESS_URL=this.SERVER_NAME+"/api/payment";
exports.FAILURE_URL=this.SERVER_NAME+":8000?fail=1";
exports.STUDENT_ENROLL_PAYMENT_LINK=this.SERVER_NAME+":8000";
exports.GRADES=["A+","A","A-","B+","B","B-","C+","C","C-","D+","D","D-","E+","E","E-","F"];
exports.STUDENT_PAYMENT=1; 

//production
exports.Merchant_ID="uSbddQ93815302554932";
exports.Merchant_KEY="M@vqsuA0Z1Ww5InM";
exports.WEBSITE="DEFAULT";
exports.INDUSTRY_TYPE="Retail";

//testing
// exports.Merchant_ID="WorldP64425807474247";
// exports.Merchant_KEY="kbzk1DSbJiV_O3p5"
// exports.WEBSITE="worldpressplg";
// exports.INDUSTRY_TYPE="Retail";


function keyvalue()
{

Setting.find()
      .then(async result => {

          console.log(result)

        for (let x = 0; x < result.length; x++) {

          if(result[x].key==="page_limit")
          {
            exports.pagecontent=await result[x].value;
          }

          if(result[x].key==="password_length")
          {
            exports.password_length=await result[x].value;
          }

          else if(result[x].key==="send_mail_username")
          {
            exports.send_mail_username=await result[x].value;
          }

          else if(result[x].key==="send_mail_port")
          {
            exports.send_mail_port=await result[x].value;
          }

          else if(result[x].key==="send_mail_password")
          {
            exports.send_mail_password=await result[x].value;
          }

          else if(result[x].key==="send_mail_host")
          {
            exports.send_mail_host=await result[x].value;
          }

          else if(result[x].key==="question_limit")
          {
            exports.question_limit=await result[x].value;
          }
          else if(result[x].key==="remember_mail")
          {
            exports.remember_mail=await result[x].value;
          }          
        }
  });

}

module.exports.keyvalue = keyvalue;




