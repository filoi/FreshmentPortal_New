const express = require('express');
const router = express.Router();
//const passport = require('passport');
//Load Input Validation
const Settings = require('../../models/setting');
const setting=require("../return_msg/setting");
const variables=require("../return_msg/keyvalue");
const collegeValidation=require("../validation/college");
let middleware = require('../../validation/middleware');

//@route  GET api/college/
//@desc  Get all  college
//@access Public

//@route GET api/college/:id
//@desc Register route
//@access Public
router.post('/', middleware.checkToken,(req, res) => {

    if(req.body.name==undefined || req.body.name==null || req.body.name=='') 
		{
            result = {"msg":"Name cannot be empty", "status":false, "description":"name is empty", "data":null}
			return (result);
			
        }

    if(req.body.key==undefined || req.body.key==null || req.body.key=='') 
        {
            result = {"msg":"Key cannot be empty", "status":false, "description":"key is empty", "data":null}
            return (result);
            
        }

    if(req.body.value==undefined || req.body.value==null || req.body.value=='') 
		{
            result = {"msg":"Value cannot be empty", "status":false, "description":"value is empty", "data":null}
			return (result);
			
        }
    
    var ObjectId = require('mongodb').ObjectID;

    const newCollege = new Settings({
            key: req.body.key,
            value: req.body.value,
            name:req.body.name,
            
        });

        newCollege.save()
            .then(college =>{
                res.json(

                    setting.status("settings created",true,"created",college)
            
                    );
            })
            .catch(err => {
                
                res.json(

                    setting.status("College name already exits",false,"name unique",null)
            
                    );
            })
   
})


router.get('/', middleware.checkToken, (req, res) => {

    // var result=middleware.function1("CAN_VIEW_COLLEGES");
    // if(!result.status)
    // {
    //     return res.send(result);
    // }


    var aggregate = Settings.aggregate();

    var page_no = req.param('page');
    
    aggregate.sort({"createdAt" : -1}).match({key:"password_length"})

    if(page_no==0)
    {
        res.send(
        
            setting.status("Invalid page numer",false,"page No error",null)

        );
    }

    var options = { page : page_no, limit : parseInt(variables.pagecontent)}

    Settings.aggregatePaginate(aggregate, options, function(err, results, pageCount, count) {
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

    // var result=middleware.function1("CAN_VIEW_COLLEGES");
    // if(!result.status)
    // {
    //     return res.send(result);
    // }


    var ObjectId = require('mongodb').ObjectID;
    var id=req.params.id;
	
	if(!ObjectId.isValid(id))
		{
			return res.send(
					
				setting.status("Incorrect ID",false,"incorrect id",null)

			 );
        }
        
    var aggregate = Settings.aggregate();

    aggregate.match({"_id":ObjectId(id)})

    let page_no=req.params.page;                

    if(page_no==0)
    {
        res.send(
        
            setting.status("Page error",false,"page No error",null)

        );
    }

    var options = { page : page_no, limit : 6}

    Settings.aggregatePaginate(aggregate, options, function(err, results, pageCount, count) {
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

//@route GET api/college/:id
//@desc Register route
//@access Public
router.post('/:id', middleware.checkToken,(req, res) => {

    if(req.body.value==undefined || req.body.value==null || req.body.value=='') 
		{
            result = {"msg":"Value cannot be empty", "status":false, "description":"value is empty", "data":null}
			return (result);
			
        }
    
    var ObjectId = require('mongodb').ObjectID;
    var id=req.params.id;
	
	if(!ObjectId.isValid(id))
		{
			return res.send(
					
				setting.status("Incorrect ID",false,"incorrect id",null)

			 );
		}

    Settings.findOne({
            _id: id
        })
        .then(college => {
            if (college) {
                Settings.findOneAndUpdate(
                    { _id : id },
                    {$set:{
                    value: req.body.value,
                    name: req.body.name,
                   }},
                    {runValidators: true, context: 'query' })
                  .then(college =>{

                    variables.keyvalue();

                    res.json(
		
                        setting.status("Updated",true,"updated",college)
                
                      );
                  })
                  .catch(err =>{
                   
                        res.json(

                            setting.status("Error",false,"error",err)
                    
                            );
                       
                  });
            } else {
                res.json(
		
                    setting.status("Key value not found",false,"error",err)
            
                  );
            }
        })
})

module.exports = router;