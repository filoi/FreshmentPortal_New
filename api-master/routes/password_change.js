const express = require('express');
const router = express.Router();
const variables=require("./return_msg/keyvalue");

const Password_Change = require('../models/password_change');
const setting = require("../return_msg/setting");

let middleware = require('../validation/middleware');

router.get('/', middleware.checkToken, (req, res) => {
    var aggregate = Password_Change.aggregate();

    var page_no = req.param('page');
    var search = req.param('search');

    aggregate.sort({"createdAt" : -1});

    if(search === null || search === undefined)
    {    

    }
	else
    {
        aggregate.match({"name":{"$regex": search, "$options": "i"}});
    }
    
    if(page_no == 0)
    {
        res.send(setting.status(validation.SHOW,false,"page No error",null));
    }

    var options = {page : page_no, limit : variables.pagecontent}

    Login_Status.aggregatePaginate(aggregate, options, function(err, results, pageCount, count)
	{
        if(err) 
        {
            console.log(err)
            res.send(setting.status("Error",false,"error",err));
        }
        else
        { 
            res.send(setting.status("Details'",true,"No data found",{pages:pageCount, count:count, results}));
        }
    })       
})