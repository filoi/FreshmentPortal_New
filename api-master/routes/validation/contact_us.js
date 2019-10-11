const express = require('express');
const router = express.Router();
//const passport = require('passport');
//Load Input Validation
const setting=require("../return_msg/setting");

let result;
function CheckValidation(body)
  {
    
    if(body.name==undefined || body.name==null || body.name=='') 
		{
        result = {"msg":"Name cannot be empty", "status":false, "description":"full_name is empty", "data":null}
        return (result); 
    }
    
    if(body.email==undefined || body.email==null || body.email=='') 
		{
        result = {"msg":"Email cannot be empty", "status":false, "description":"email is empty", "data":null}
        return (result);
			
    }

    if(!setting.CheckMail(body.email))
    {
        result = {"msg":"Invalid Email Address", "status":false, "description":"wrong email", "data":null}
        return (result);
       
    }
        
    if(body.message==undefined || body.message==null || body.message=='') 
		{
            result = {"msg":"Message cannot be empty", "status":false, "description":"message is empty", "data":null}
			return (result);
			
    }

    

        result={"status":true}
        return result;
}

module.exports.CheckValidation = CheckValidation;