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
var ObjectId = require('mongoose').Types.ObjectId;

router.get('/', (req, res) => {

    var stu_id="cust001";
    stu_id=req.param('stu_id');

    if(ObjectId.isValid(stu_id))
    {

    }else
    {
        return res.send(
  
            setting.status("Student not found",false,"id wrong",null)
    
          );
    }

    if(stu_id==null || stu_id == undefined || stu_id ==="")
    {
        return res.send(
  
            setting.status("Student not found",false,"id not come",null)
    
          );
    }

    Student.find({_id:stu_id})
        .then(result => {
            if(result.length>0)
            {
                
            }else
            {
                return res.send(
  
                    setting.status("Student not found",false,"details",null)
            
                  );
            }
            
        }); 


    var PaytmConfig = {
            mid: variables.Merchant_ID,
			 key: variables.Merchant_KEY,
			 website:variables.WEBSITE

    }

    console.log("payment");
    var params 					= {};
    params['MID'] 				= PaytmConfig.mid;
    params['ORDER_ID']			= new Date().getTime()+"PRIME"+stu_id;
    params['CUST_ID'] 			= new Date().getTime();
    params['TXN_AMOUNT']	    = '1.00';
    params['CHANNEL_ID']		= 'WEB';
    params['WEBSITE']			= PaytmConfig.website;
    params['MOBILE_NO']			= '7777777777';
    params['EMAIL']				= 'abc@mailinator.com';
    params['INDUSTRY_TYPE_ID']	= 'Retail';
    params['CALLBACK_URL']		= variables.SERVER_NAME+':5000/api/callback';

    checksum_lib.genchecksum(params, PaytmConfig.key, function (err, checksum) {


        //  var txn_url = "https://securegw-stage.paytm.in/theia/processTransaction"; // for staging
        var txn_url = "https://securegw.paytm.in/theia/processTransaction"; // for production
        
        var form_fields = "";

        for(var x in params){

            form_fields += "<input type='hidden' name='"+x+"' value='"+params[x]+"' >";
        }
        
        form_fields += "<input type='hidden' name='CHECKSUMHASH' value='"+checksum+"' >";

        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write('<html><head><title>Merchant Checkout Page</title></head><body><center><h1>Please do not refresh this page...</h1></center><form method="post" action="'+txn_url+'" name="f1">'+form_fields+'</form><script type="text/javascript">document.f1.submit();</script></body></html>');
        res.end();
    });
		
})

router.get('/student', (req, res) => {

    var stu_id="";
    stu_id=req.param('stu_id');

    if(ObjectId.isValid(stu_id))
    {

    }else
    {
        return res.send(
  
            setting.status("Student not found",false,"id wrong",null)
    
          );
    }

    if(stu_id==null || stu_id == undefined || stu_id ==="")
    {
        return res.send(
  
            setting.status("Student not found",false,"id not come",null)
    
          );
    }

    Student.find({_id:stu_id})
        .then(result => {
            if(result.length>0)
            {
                var full_name=result[0].fname + " " + result[0].lname
                res.send(
  
                    setting.status("Show all",true,"details",{name:full_name,email:result[0].email,contact_no:result[0].contact_no,payment:variables.STUDENT_PAYMENT})
            
                  );
            }else
            {
                res.send(
  
                    setting.status("student not found",false,"details",null)
            
                  );
            }
            
        }); 

		
})



module.exports = router;