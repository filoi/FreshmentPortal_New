const express = require('express');
const router = express.Router();
//const passport = require('passport');
//Load Input Validation
const setting=require("../return_msg/setting");
var validurl=require('valid-url');
const variables=require("../return_msg/keyvalue");

let result;
function CheckValidation(body)
  {
    
    if(body.job_title==undefined || body.job_title==null || body.job_title=='') 
		{
        result = {"msg":"Job title cannot be empty", "status":false, "description":"job_title is empty", "data":null}
			  return (result);
			
    }
    
    if(body.number==undefined || body.number==null || body.number=='') 
		{
        result = {"msg":"Number cannot be empty", "status":false, "description":"number is empty", "data":null}
			  return (result);
			
    }

    if(!setting.CheckMobile(body.number))
    {
        result = {"msg":"Invalid Number", "status":false, "description":"Number only", "data":null}
        return (result);  
    }

    if(body.description==undefined || body.description==null || body.description=='') 
		{
       
			
    }else
    {
      var desLength = Object.keys(body.description).length; 
      console.log("--------")
      console.log(desLength);
      if(desLength < 100 )
          {
              result = {"msg":"Invalid description Length minimum 100", "status":false, "description":"description Length minimum 100", "data":null}
              return (result);
              
          }
    }

    if(body.min_ctc==undefined || body.min_ctc==null || body.min_ctc=='') 
		{
        result = {"msg":"Minumum CTC cannot be empty", "status":false, "description":"min_ctc is empty", "data":null}
			  return (result);
			
    }

    if(!setting.CheckMobile(body.min_ctc))
    {
        result = {"msg":"Minimum CTC invalid", "status":false, "description":"Number only", "data":null}
        return (result);  
    }

    if(body.max_ctc==undefined || body.max_ctc==null || body.max_ctc=='') 
		{
        result = {"msg":"Maximum CTC cannot be empty", "status":false, "description":"max_ctc is empty", "data":null}
			  return (result);
			
    }

    if(!setting.CheckMobile(body.max_ctc))
    {
        result = {"msg":"Maximum CTC invalid", "status":false, "description":"Number only", "data":null}
        return (result);  
    }

    if(parseInt(body.max_ctc)<parseInt(body.min_ctc))
    {
        result = {"msg":"Please check the ctc range", "status":false, "description":"min ctc>max ctc", "data":null}
        return (result);  
    }

    if(body.minimum_percentage==undefined || body.minimum_percentage==null || body.minimum_percentage=='') 
		{
       
    }else
    {
      if(parseInt(body.minimum_percentage)>100)
          {
            result = {"msg":"Grade must be lessthan 100 percentage", "status":false, "description":"percentage >100", "data":null}
            return (result);  
          }
    }

    if(body.minimum_cgpa==undefined || body.minimum_cgpa==null || body.minimum_cgpa=='') 
		{
       
    }else
    {
      if(parseInt(body.minimum_cgpa)>10)
          {
            result = {"msg":"Grade must be 0 - 10", "status":false, "description":"cgpa >10", "data":null}
            return (result);  
          }
    }

    if(body.minimum_grade==undefined || body.minimum_grade==null || body.minimum_grade=='') 
		{
      result = {"msg":"Grades cannot be empty", "status":false, "description":"grades is empty", "data":null}
      return (result);
    }else
    {
      result={"status":true}
        return result;
    
    }
}

module.exports.CheckValidation = CheckValidation;