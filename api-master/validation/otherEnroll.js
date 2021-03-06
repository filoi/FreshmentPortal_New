const express = require('express');
const isEmpty = require('./is-empty');
const setting = require("../validation/settings");
const Course = require("../models/course");


let result;
let duration;

function checkEnrollValidation(body)
  {
  console.log(body.fname);
    if(body.fname==="undefined" || body.fname==null || body.fname=='') 
    {
        result = {"msg":"First name cannot be empty", "status":false, "description":"name is empty", "data":null}
        return (result);
    }

    if(body.email==="undefined" || body.email==null || body.email=='') 
    {
        result = {"msg":"Email cannot be empty", "status":false, "description":"email is empty", "data":null}
        return (result);
    }

    if(!setting.CheckMail(body.email))
    {
        result = {"msg":"Invalid Email Address", "status":false, "description":"email format wrong", "data":null}
        return (result);
    }

    if(body.contact_no==="undefined" || body.contact_no==null || body.contact_no=='') 
    {
        result = {"msg":"Contact number cannot be empty", "status":false, "description":"contact_no is empty", "data":null}
        return (result);
    }

    if(!setting.CheckMobile(body.contact_no))
    {
        result = {"msg":"Invalid Contact Number", "status":false, "description":"Number only", "data":null}
        return (result);
    }

    var mobileLength = Object.keys(body.contact_no).length; // Taking length
    if(mobileLength < 10 )
    {
        result = {"msg":"Invalid Contact number", "status":false, "description":"contct_no may less than 10 in length", "data":null}
        return (result);
    }

    if(body.college_name==="undefined" || body.college_name==null || body.college_name=='') 
    {
        result = {"msg":"College Name cannot be empty", "status":false, "description":"college_name is empty", "data":null}
        return (result);
    }

    if(body.college_email==="undefined" || body.college_email==null || body.college_email=='') 
    {
        result = {"msg":"College Email cannot be empty", "status":false, "description":"college_email is empty", "data":null}
        return (result);
    }

    if(!setting.CheckMail(body.college_email))
    {
        result = {"msg":"Invalid College Email Address", "status":false, "description":"college_email format wrong", "data":null}
        return (result);
    }

    if(body.college_contatc_no==="undefined" || body.college_contatc_no==null || body.college_contatc_no=='') 
    {
        result = {"msg":"College contact number cannot be empty", "status":false, "description":"college_contatc_no is empty", "data":null}
        return (result);
    }

    if(!setting.CheckMobile(body.college_contatc_no))
    {
        result = {"msg":"Invalid College contact Number", "status":false, "description":"college_contatc_no only", "data":null}
        return (result);
    }

    var mobileLength = Object.keys(body.college_contatc_no).length; // Taking length
    if(mobileLength < 10 )
    {
        result = {"msg":"Invalid College contact number", "status":false, "description":"college_contatc_no may less than 10 in length", "data":null}
        return (result);
    }

    result = {"status":true}
    return result;
}

module.exports.checkEnrollValidation = checkEnrollValidation;