const express = require('express');
const router = express.Router();
//const passport = require('passport');
//Load Input Validation
const setting=require("../return_msg/setting");
var validurl=require('valid-url');


let result;
function CheckValidation(body)
  {
    
    if(body.name==undefined || body.name==null || body.name=='') 
		{
            result = {"msg":"Name cannot be empty", "status":false, "description":"name is empty", "data":null}
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
    
    if(body.contact_no==undefined || body.contact_no==null || body.contact_no=='') 
		{
            result = {"msg":"Contact cannot be empty", "status":false, "description":"contact_no is empty", "data":null}
			return (result);
			
        }
        
    if(!setting.CheckMobile(body.contact_no))
        {
            result = {"msg":"Invalid Contact Number", "status":false, "description":"Number only", "data":null}
			return (result);
           
        }

    if(body.fax==undefined || body.fax==null || body.fax=='') 
        {
            
        }
        else
        {
            if(!setting.CheckMobile(body.fax))
                {
                    result = {"msg":"Invalid Fax Number", "status":false, "description":"Number only", "data":null}
                    return (result);
                
                }

            var mobileLength2 = Object.keys(body.fax).length; // Taking length
            if(mobileLength2 < 13 )
                {
                    result = {"msg":"Invalid Fax Number ", "status":false, "description":"invalid fax number 13", "data":null}
                    return (result);
                    
                }
        }

    if(body.website==undefined || body.website==null || body.website=='') 
        {
            
        }else
        {
            let num=body.website;

            function validateIsNum(num)
            {
                var pattern = /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g;
                return pattern.test(num);
            }
        
            if (!validateIsNum(num))
            {
                result = {"msg":"Invalid URL", "status":false, "description":"website url wrong", "data":null}
                return (result);
            }else
            {
                result={"status":true}
                return result;
            }
        }

    if(body.description==undefined || body.description==null || body.description=='') 
        {
            result = {"msg":"Nature of Business cannot be empty", "status":false, "description":"description empty", "data":null}
            return (result);
        }
        else
        {
            var mobileLength2 = Object.keys(body.description).length; // Taking length
            if(mobileLength2 < 50 )
                {
                    result = {"msg":"Nature of Business Length minimum 50", "status":false, "description":"invalid description", "data":null}
                    return (result);
                    
                }
        }

    if(body.address==undefined || body.address==null || body.address=='') 
		{
            result = {"msg":"Address cannot be empty", "status":false, "description":"address is empty", "data":null}
			return (result);
			
        }

    if(body.state==undefined || body.state==null || body.state=='') 
		{
            result = {"msg":"State cannot be empty", "status":false, "description":"state is empty", "data":null}
			return (result);
			
        }

    if(body.city==undefined || body.city==null || body.city=='') 
		{
            result = {"msg":"City cannot be empty", "status":false, "description":"city is empty", "data":null}
			return (result);
			
        }

    if(body.pin_code==undefined || body.pin_code==null || body.pin_code=='') 
        {
            result = {"msg":"Pincode cannot be empty", "status":false, "description":"pin_code is empty", "data":null}
			return (result);
    
        }else
        {
            var c_pinCodeValidation = Object.keys(body.pin_code).length; // Taking length
            if(c_pinCodeValidation !== 6  )
            {
                result = {"msg":"Invalid Pincode", "status":false, "description":"invalid pin_code", "data":null}
                return (result);
            
            }
        }

    if(body.industry==undefined || body.industry==null || body.industry=='') 
		{
            result = {"msg":"Industry cannot be empty", "status":false, "description":"industry is empty", "data":null}
			return (result);
			
        }


    if(body.hr_name==undefined || body.hr_name==null || body.hr_name=='') 
		{
            result = {"msg":"HR name cannot be empty", "status":false, "description":"hr_name is empty", "data":null}
			return (result);
			
        }

    if(body.hr_email==undefined || body.hr_email==null || body.hr_email=='') 
		{
            result = {"msg":"HR cannot be empty", "status":false, "description":"hr_email is empty", "data":null}
			return (result);
			
        }

    if(!setting.CheckMail(body.hr_email))
        {
            result = {"msg":"Invalid HR Email Address", "status":false, "description":"wrong email", "data":null}
			return (result);
           
        }

        

    if(body.hr_contact_no==undefined || body.hr_contact_no==null || body.hr_contact_no=='') 
		{
            result = {"msg":"HR contact no cannot be empty", "status":false, "description":"hr_contact_no is empty", "data":null}
			return (result);
			
        }

    if(!setting.CheckMobile(body.hr_contact_no))
        {
            result = {"msg":"Invalid HR Contact Number", "status":false, "description":"Number only", "data":null}
			return (result);
           
        }

    // var mobileLength1 = Object.keys(body.hr_contact_no).length; // Taking length
    // if(mobileLength1 < 6 )
    //     {
    //         result = {"msg":"Invalid Human Resource Contact Number Length minimum 6", "status":false, "description":"invalid Contact number", "data":null}
	// 		return (result);
            
    //     }

    result ={"status":true}
    return result;

    

    
    
}

module.exports.CheckValidation = CheckValidation;