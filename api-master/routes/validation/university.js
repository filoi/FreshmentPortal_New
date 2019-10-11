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

    // var mobileLength = Object.keys(body.contact_no).length; // Taking length
    // if(mobileLength < 10 )
    //     {
    //         result = {"msg":"Invalid Contact Number Length minimum 10", "status":false, "description":"invalid Contact number", "data":null}
	// 		return (result);
            
    //     }

    if(body.address==undefined || body.address==null || body.address=='') 
		{
            result = {"msg":"Address cannot be empty", "status":false, "description":"address is empty", "data":null}
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

    if(body.year==undefined || body.year==null || body.year=='') 
		{
            result = {"msg":"Year cannot be empty", "status":false, "description":"year is empty", "data":null}
			return (result);
			
        }

    var year = Object.keys(body.year).length; // Taking length
        if(year < 4 || isNaN(body.year))
        {
            result = {"msg":"Invalid value for Year (`Since` field)", "status":false, "description":"invalid year", "data":null}
			return (result);
            
        }

        else if(parseInt(body.year)<1700 ||parseInt(body.year)>2100)
        {
            result = {"msg":"Invalid value for Year (`Since` field)", "status":false, "description":"year not valid", "data":null}
            return (result);
        }

    if(body.website==undefined || body.website==null || body.website=='') 
		{
            result = {"msg":"Website cannot be empty", "status":false, "description":"website is empty", "data":null}
			return (result);
			
        }


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
        }

        if(body.contact_person_name==undefined || body.contact_person_name==null || body.contact_person_name=='') 
		{
            result = {"msg":"Contact person name cannot be empty", "status":false, "description":"contact_person_name is empty", "data":null}
			return (result);
			
        }

        if(body.contact_person_designation==undefined || body.contact_person_designation==null || body.contact_person_designation=='') 
		{
            result = {"msg":"Contact person designation cannot be empty", "status":false, "description":"contact_person_designation is empty", "data":null}
			return (result);
			
        }

        if(body.contact_person_department==undefined || body.contact_person_department==null || body.contact_person_department=='') 
		{
            result = {"msg":"Contact person department cannot be empty", "status":false, "description":"contact_person_department is empty", "data":null}
			return (result);
			
        }

        if(body.contact_person_email==undefined || body.contact_person_email==null || body.contact_person_email=='') 
		{
            result = {"msg":"Contact person email cannot be empty", "status":false, "description":"contact_person_email is empty", "data":null}
			return (result);
			
        }

        if(!setting.CheckMail(body.contact_person_email))
        {
            result = {"msg":"Invalid Contact person email address", "status":false, "description":"wrong contact_person_email", "data":null}
			return (result);
           
        }

        if(body.contact_person_mobile==undefined || body.contact_person_mobile==null || body.contact_person_mobile=='') 
		{
            result = {"msg":"Contact person mobile cannot be empty", "status":false, "description":"contact_person_mobile is empty", "data":null}
			return (result);
			
        }

        if(!setting.CheckMobile(body.contact_person_mobile))
        {
            result = {"msg":"Invalid contact person mobile number", "status":false, "description":"contact_person_mobile only", "data":null}
			return (result);
           
        }

        result={"status":true}
        return result;
        
}

module.exports.CheckValidation = CheckValidation;