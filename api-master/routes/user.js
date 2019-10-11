const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const setting=require("../validation/settings");
const Invite = require('../models/invite');
const Notification = require('../models/notification');
const variables=require("./return_msg/keyvalue");

const config = require('../config/keys.js');

let middleware = require('../validation/middleware');

//Passport Middleware

// //Passport Config
// require('../config/passport')(passport);


//const passport = require('passport-local');

//Load Input Validation
const validationRegister = require('../validation/registerValidation');
const validationLogin = require('../validation/loginValidation');
const validationUserUpdate = require('../validation/updateUserValidation');

const Employer = require('../models/employer');
const User = require('../models/user');
const Other_enroll = require('../models/other_enroll');
const Role_authority = require('../models/role_authority');
const Student = require('../models/student_enrollment');
const Vacancy = require('../models/vacancy');
const loginStatus = require('../models/login_status');

// *** POST *** /api/users/login *** Sign-in with email and password ***
router.post("/login", (req, res) => 
{
  console.log(req.body);
  console.log("------------");

    var validationResult = validationLogin.checkLoginValidation(req.body);

    if (!validationResult.status)
    {
        return res.send(validationResult);
    }

    var email = req.body.email;
    var password = req.body.password;

    //Before login, the account should not be deleted (is_delete:false).
    User.findOne({email: email}, function (err, user)
    {
        if (err)
            return res.status(200).send(setting.status("Try again",false,"Error on server",err));

        //May is_delete:true. i.e : If the user's is_delete field true
        if (!user)
            return res.status(200).send(setting.status("Authentication false",false,"No user found",null));
        
        Employer.findOne({email: email}, function (err, user)
        {
            
        });

        // check if the password is valid
        var passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
        if (!passwordIsValid)
            return res.status(200).send(setting.status("Authentication false",false,"Wrong password",null));

        // While login add the details to LoginStatus table.
        var objLoginStatus = new loginStatus({
            user_id : user._id,
            in_time : Date.now()
            });

            objLoginStatus.save((err) =>{
                if (err)
                {
                    console.log("New Error : " + err);
                    return next(err);
                }});

        let authority=[];
        let role='';

        Role_authority.find({role_id:user.role}).populate('role_id')
        .then(result => {

            role=result[0].role_id.name;
            console.log(role);

            if(result.length>0)
            {
                for(var x=0;x<result.length;x++)
                {
                    authority.push(result[x].authority)
                }
            }else
            {
                return ("authority not found")
            }

        // if user is found and password is valid
        // create a token
        var token = jwt.sign({ id: user._id,name:user.fname,authority:authority,email:user.email,contact_no:user.contact_no,role:user.role,role_name:role }, config.secretOrKey, {expiresIn: 86400});
        // var token = jwt.sign({ id: user._id }, "This is my secret to create the token", {expiresIn: 86400});

            console.log(authority)

            res.send(
                
                setting.status("Login success",true,"Authentication true",{"loginToken":token})        
                //setting.status("Login success",true,"Authentication true",{"loginToken":token, "id":user._id, "name":user.fname,"role":user.role,"mobile":user.contact_no,"image":user.image,"authority":authority})        
              );
        }); 
        // return the information including token as JSON
    });    
});


// *** POST *** /api/users/register *** Create new local account ***
router.post("/register", (req, res) =>
{
    console.log(req.body);
    console.log("------------");

    var validationResult = validationRegister.checkRegisterValidation(req.body);

    if (!validationResult.status)
    {
        return res.send(validationResult);
    }

    User.findOne({email: req.body.email})
    .then(user =>
        {
            if (user)
            {
                res.status(200).send(setting.status("Email Already exits", false, "Email unique", null))
            }
            else
            {
                User.findOne({contact_no: req.body.contact_no})
                .then(user =>
                    {
                        if (user)
                        {
                            res.status(200).send(setting.status("Contact Already exits", false, "Contact unique", null))
                        }
                        else
                        {
                            const avatar = gravatar.url(req.body.email,
                            {
                                s: '200',
                                r: 'pg',
                                d: 'mm'
                            });

                            const newUser = new User(
                            {
                                fname: req.body.fname,
                                lname: req.body.lname,
                                contact_no: req.body.contact_no,
                                email: req.body.email,
                                password: req.body.password,
                                avatar,
                                role: "5c2f0e8d43abb4222c581d41",status:"active"
                            });
                            console.log("4");

                            //Encrypting the password 
                            bcrypt.genSalt(10, (err, salt) =>
                            {
                                bcrypt.hash(newUser.password, salt, (err, hash) =>
                                {
                                    if (err)
                                        throw err;
                                    newUser.password = hash;

                                    newUser.save()
                                        .then(user => res.status(200).send(setting.status("Account Created Successfully", true, "User created", user._id)))
                                        .catch(err => res.status(200).send(setting.status("Sorry! Try again", false, "Unable to create User", err)))
                                })
                            });
                        }
                    })
            }
        })
})
    
// *** POST *** /api/users/userId *** Update user details ***
router.post("/:id",middleware.checkToken, (req, res) => {

  const id = req.params.id;
  if(!id)
  {
    return res.status(200).send(setting.status("1User Id not found",false,"invalid id",null));
  }

  console.log(req.body);
  console.log("------------");

  var validationResult = validationUserUpdate.checkUserUpdateValidation(req.body);

  if (!validationResult.status)
  {
      return res.send(validationResult);
  }

  User.findOne({_id: id})
  .then(user => {
      if(!user)
      {
        setting.status("User not found",false,"user not found", null)
      }
      else if (user)
      {
        const avatar = gravatar.url(req.body.email,
            {
                s: '200',
                r: 'pg',
                d: 'mm'
            });

          User.findByIdAndUpdate(id, {
                fname: req.body.fname,
                lname: req.body.lname,
                contact_no: req.body.contact_no,
                email: req.body.email,
                avatar,
                role: req.body.role


        }, {new: true})
              .then(user => {
                  res.json(setting.status("User Updated", true, "updated", user));
                })
                .catch(err => {
                    res.json(setting.status("User Not Found", false, "error", err));
                });
            }
            else
            {
                res.json(setting.status("User Not Found", false, "error", err));
            }
        })
})


// Todo : Pass token to get users details
// Todo : pagination
// *** GET *** /api/users/all *** Retrieve all users' basic details ***
router.get("/", middleware.checkToken, (req, res) =>
{

  User.find()
    .select('fname lname email avatar contact_no role').sort({fname :1})
    // .where('is_deleted').equals('false')
    .exec()
    .then(docs => {
        return res.send(setting.status("User details retrieval successfully",false, "User details retrieval successfully", docs))
        //res.status(200).json(setting.status(validation.SHOW,true,"User details retrieval successfully.",docs))
    .catch(err => {
        return res.send(setting.status("Error in retrieving user details",false, "Error may token", err))
    });
    });


    // var aggregate = User.aggregate();

    // var page_no = req.param('page');
    // var search = req.param('search');

    // aggregate.sort({"createdAt" : -1});

    // if(search === null || search === undefined)
    // {
        
    // }
    // else
    // {
    //     aggregate.match({"name":{"$regex": search, "$options": "i"}});
    // }
    
    // if(page_no == 0)
    // {
    //     res.send(setting.status("Page error",false,"page No error",null));
    // }

    // var options = { page : page_no, limit : variables.pagecontent}

    // User.aggregatePaginate(aggregate, options, function(err, results, pageCount, count)
    // {
    //   if(err)
    //   {
    //     console.log(err)
    //     res.send(setting.status("Error",false,"error",err));
    //   }
    //   else
    //   {
    //     res.send(setting.status("Details'",true,"No data found",{pages:pageCount,count:count,results}));
    //   }
    // })       
})






// getToken = function (headers) {
//   if (headers && headers.authorization) {
//     var parted = headers.authorization.split(' ');
//     if (parted.length === 2) {
//       return parted[1];
//     } else {
//       return null;
//     }
//   } else {
//     return null;
//   }
// };


// *** GET *** /api/users/{userId} *** Retrieve one user's basic details ***
router.get("/:id", middleware.checkToken, function (req, res)
{
  const id = req.params.id;
  if(!id)
  {
    return res.status(200).send(setting.status("User Id not found",false,"invalid id",null));
  }

  User.find({_id:id})
    .select('fname lname email avatar contact_no role')
    .where('is_deleted').equals('false')
    .exec()
    .then(doc => {
      if (!doc)
      {
        return res.status(200).send(setting.status("Not found",false,"id not found or is_deleted may be true",null));
      }
      else
      {
        return res.status(200).send(setting.status("Found",true,"Details found",doc));
      }
    })
    .catch(err => {
      return res.status(200).send(setting.status("Not found",false,"Error",err));
    });
});

//*******/users/:userId******DELETE******Delete an account***********
router.delete("/:id", middleware.checkToken, function(req, res)
{

    var ObjectId = require('mongodb').ObjectID;
    var id = req.params.id;
    
    if(!ObjectId.isValid(id))
        {
            return res.send(setting.status("Invalid Id",false,"incorrect id",null));
        }
        
    User.findById(req.params.id).then(user => {
            // Delete
            user.remove().then(() => { 
                res.json(setting.status("Deleted",true,"deleted",null))});
          })
          .catch(err =>{
            res.json(setting.status("User Not Found",false,"error",err));
          })
        }    
  );


  router.get("/students", middleware.checkToken, function (req, res, next)
{
  var aggregate = Student.aggregate();

  var page_no = req.param('page');
  var searchName = req.param('searchName');
  var searchEmal = req.param('searchEmal');
  var searchContact = req.param('searchContact');
  var approved=req.param('approved');

    aggregate.sort({"createdAt" : -1})
    //.match({deleted:false})
            //.match({$and:[{"is_submited":false},{"status":{"$regex": searchName, "$options": "i"}}]})
            //.match({"is_approved":false})
            .lookup({ from: "colleges", localField: "college_id", foreignField: "_id",as: "college_doc"})
            .lookup({ from: "courses", localField: "course_id", foreignField: "_id",as: "course_doc"})
            .lookup({ from: "specializations", localField: "specialization_id_major", foreignField: "_id",as: "major_doc"})
            .lookup({ from: "specializations", localField: "specialization_id_minor", foreignField: "_id",as: "minor_doc"})
            .project({password:0});


    if(searchName===null || searchName ===undefined)
    {
        
    }else
    {
        aggregate.match({"fname":{"$regex": searchName, "$options": "i"}});
    }

    if(approved===null || approved ===undefined)
    {
        
    }else
    {
        aggregate.match({"is_approved":false});
    }

  if(searchEmal===null || searchEmal ===undefined)
    {
        
    }else
    {
        aggregate.match({"email":{"$regex": searchEmal, "$options": "i"}});
    }

  if(searchContact===null || searchContact ===undefined)
    {
        
    }else
    {
        aggregate.match({"contact_no":{"$regex": searchContact, "$options": "i"}});
    }
    
    if(page_no==0)
    {
        res.send(
        
            setting.status(validation.SHOW,false,"page No error",null)

        );
    }

    var options = { page : page_no, limit : variables.pagecontent}

    Student.aggregatePaginate(aggregate, options, function(err, results, pageCount, count) {
        if(err) 
        {
            
            res.send(
    
                setting.status("Error",false,"error",err)

            );
        }
        else
        { 
        
            res.send(
        
                setting.status("Details'",true,"Data found",{pages:pageCount,count:count,pagesize:parseInt(variables.pagecontent),results})

            );
        
        }
    })    
});















//   const idToDelete = req.params.id;
//   // Validation not given id to delete
//   if(!idToDelete)
//   {
//     return res.status(200).send(setting.status("Cannot find user",false,"id is not given",null));
//   }

//   // Find the id is exist and user not deleted already
//   User.find({_id:idToDelete, is_deleted:false}).exec(function(err, results)
//   {
//     if (err)
//     res.status(200).json(setting.status("The id may not exist",false,"no id and is_delete false problem", err));

//     // var countIsDelete = results.length;
//     // console.log("the count is : " + countIsDelete);

//     // // To the given id, is_delete should be false

//     // if(countIsDelete > 0)
//     if(results)
//     {
//       User.findByIdAndUpdate(idToDelete, {is_deleted : true}, {new: true})
//         .then(outputs => {
//             if(!outputs)
//             {
//               return res.status(200).send(setting.status("Error in deleting user. Try anain",false,"Error in updating is_delete to true",null));
//             }
//             res.send(setting.status("User deleted successfully",true,"No problem user deleted. And is_delete changed to true",null));
//         }).catch(err => {
//             if(err.kind === 'ObjectId')
//             {
//               return res.status(200).send(setting.status("Id problem",false,"Error",err));          
//             }
//         });
//     }
//     if(!results)
//         res.status(200).json(setting.status("Sorry user is not found",false,"The user may already deleted",null));
//   }); 
// })


// *** POST *** /api/users/userId *** Update user details ***
router.post("/student/:id/marks",middleware.checkToken, (req, res) => {

    const id = req.params.id;
    if(!id)
    {
      return res.status(200).send(setting.status("User Id not found",false,"invalid id",null));
    }
    
    Student.findOne({_id: id})
    .then(user => {
        if(!user)
        {
          setting.status("User not found",false,"user not found", null)
        }
        else if (user)
        {
          const avatar = gravatar.url(req.body.email,
              {
                  s: '200',
                  r: 'pg',
                  d: 'mm'
              });
  
            User.findByIdAndUpdate(id, {
                  fname: req.body.fname,
                  lname: req.body.lname,
                  contact_no: req.body.contact_no,
                  email: req.body.email,
                  avatar,
                  role: req.body.role
  
          }, {new: true})
                .then(user => {
                    res.json(setting.status("User Updated", true, "updated", user));
                  })
                  .catch(err => {
                      res.json(setting.status("User Not Found", false, "error", err));
                  });
              }
              else
              {
                  res.json(setting.status("User Not Found", false, "error", err));
              }
          })
  })




  
router.get('/dashboard/page', middleware.checkToken,async (req, res) => {

    var ObjectId = require('mongodb').ObjectID;
   
    var aggregate = Invite.aggregate();

    let students;
    let employer;
    let pending_approvels;

    Student.find().count()
        .then(async result => {
           console.log(result);
           students=await result
       

    Employer.find().count()
    .then(async result => {
        console.log(result);
        employer=await result


    Student.find({is_approved:false,is_submited:true}).count()
    .then(async result => {
        console.log(result);
        pending_approvels=await result

    aggregate
    .group( {_id: '$status',total: {$sum: 1}})
    .project({status:"$_id",total:"$total"})
    .sort({status:1})

    let page_no=req.params.page;                

    if(page_no==0)
    {
        res.send(
        
            setting.status("page error",false,"page No error",null)

        );
    }

    var options = { page : page_no, limit : variables.pagecontent}

    Invite.aggregatePaginate(aggregate, options, function(err, results, pageCount, count) {
        if(err) 
        {
            res.send(
    
                setting.status("Error",false,"error",err)

            );
        }
        else
        { 
        
            res.send(
        
                setting.status("Details'",true,"data found",{student:students,employer:employer,pending_approvels:pending_approvels,res:results})

            );
        
        }
    })
}); 
}); 
});        
})

router.get('/notification/all', middleware.checkToken,(req, res) => {

    var ObjectId = require('mongodb').ObjectID;
    var employer_id=middleware.get_id();
	
    var aggregate = Notification.aggregate();

    let vacancy=req.param('vacancy');
    let status=req.param('status');

    console.log(status)


    aggregate
    .lookup({ from: "vacancies", localField: "vacancy_id", foreignField: "_id",as: "vacancy_doc"})
    .lookup({ from: "employers", localField: "employer_id", foreignField: "_id",as: "employer_doc"})
    .lookup({ from: "student_enrollments", localField: "student_id", foreignField: "_id",as: "stu_doc"})
    .lookup({ from: "internships", localField: "student_doc._id", foreignField: "student_id",as: "internship_doc"})
    //.lookup({ from: "invites", localField: "vacancy_id", foreignField: "_id",as: "stu_doc"})
    .project({"student_doc.password":0})
    .limit(150)

    if(status===null || status ===undefined ||status==="")
    {
        
    }else
    {
        aggregate.match({"status":status});

    }

    if(vacancy===null || vacancy ===undefined ||vacancy==="")
    {
        
    }else
    {
        aggregate.match({"vacancy_id":ObjectId(vacancy)});

        change_status(vacancy);

    }
    
    let page_no=req.params.page;                

    if(page_no==0)
    {
        res.send(
        
            setting.status("page error",false,"page No error",null)

        );
    }

    var options = { page : page_no, limit : variables.pagecontent}

    Notification.aggregatePaginate(aggregate, options, function(err, results, pageCount, count) {
        if(err) 
        {
            res.send(
    
                setting.status("Error",false,"error",err)

            );
        }
        else
        { 
        
            res.send(
        
                setting.status("Details'",true,"data found",{results})

            );
        
        }
    })       
})

router.post("/students/written_exam/:id", (req, res) => {

    const id = req.params.id;
   
    if(!req.body.written_marks)
    {
      return res.status(200).send(setting.status("Marks empty",false,"written_marks empty",null));
    }

       
    Student.findOne({_id: id})
    .then(student => {
        if(!student)
        {
          setting.status("Student not found",false,"student not found", null)
        }
        else if (student)
        {
          
            Student.findByIdAndUpdate(id, {
                 
                written_marks: req.body.written_marks,

                 
            }, {new: true})
                .then(student => {
                    res.json(setting.status("Student Updated", true, "updated", student));
                  })
                  .catch(err => {
                      res.json(setting.status("Student Not Found", false, "error", err));
                  });
              }
              else
              {
                  res.json(setting.status("Student Not Found", false, "error", err));
              }
        })
  })

  
router.post("/students/report", middleware.checkToken, function (req, res, next)
{
    var ObjectId = require('mongodb').ObjectID;

    var aggregate = Student.aggregate();

    let searchCollege=[];
    let searchCourse=[];
    let searchCity=[];
    let searchState=[];
    let searchSpecialization=[];
    let searchUni=[];
    var paymentStatus = req.body.paymentStatus
    var noOfVacancy = req.body.noOfVacancy


    searchCollege=req.body.searchCollege;
    searchCourse=req.body.searchCourse;
    searchState=req.body.searchState;
    searchSpecialization=req.body.searchSpecialization;
    searchUni=req.body.searchUni;

    var approved=req.body.approved;
    var is_submit=req.body.is_submit;
    var page_no = req.param('page');
    var search = req.body.search;
    var searchContact = req.body.searchContact;

    aggregate.sort({"createdAt" : -1})//.match({"deleted":false})
            .lookup({ from: "colleges", localField: "college_id", foreignField: "_id",as: "college_doc"})
            .lookup({ from: "universities", localField: "college_doc.university_id", foreignField: "_id",as: "uni_doc"})
            .lookup({ from: "courses", localField: "course_id", foreignField: "_id",as: "course_doc"})
            .lookup({ from: "specializations", localField: "specialization_id_major", foreignField: "_id",as: "major_doc"})
            .lookup({ from: "specializations", localField: "specialization_id_minor", foreignField: "_id",as: "minor_doc"})
            .lookup({ from: "internships", localField: "_id", foreignField: "student_id",as: "internship_doc"})
            .lookup({ from: "interests", localField: "_id", foreignField: "student_id",as: "interest_doc"})
            .lookup({ from: "login_statuses", localField: "_id", foreignField: "user_id",as: "login_status_doc"})
            .project({password:0})
            .project({"fname":"$fname","lname":"$lname","contact_no":"$contact_no","email":"$email","payment_status":"$payment_status","age":"$age","gender":"$gender","current_address":"$current_address",
            "course_id":"$course_id","specialization_id_major":"$specialization_id_major","specialization_id_minor":"$specialization_id_minor",
            "_id":"$_id","age":"age","gender":"$gender","overall_grade":"$overall_grade","academic_from":"$academic_from","academic_to":"$academic_to","c_state":"$c_state","college_id":"$college_id",
            "overall_grade":"$overall_grade","college_doc":"$college_doc","uni_doc":"$uni_doc","course_doc":"$course_doc","major_doc":"$major_doc","minor_doc":"$minor_doc","internship_doc":"$internship_doc","interest_doc":"$interest_doc",
            "login_status_doc":"$login_status_doc",
            "number_of_jobs_applied": {
                "$size": "$interest_doc"
            },
            "last_login": {
                "$cond": [
                    { "$eq": [ "$login_status_doc", [] ] },null,{$arrayElemAt: [ "$login_status_doc", 0 ]}]
            }            
        })
    if(searchCourse===null || searchCourse ===undefined|| searchCourse ==="")
    {
        
    }else
    {
        if(searchCourse.length>0)
        {
            let y=[];

            for(let x=0;x<searchCourse.length;x++)
            {
                y.push({"course_doc._id":ObjectId(searchCourse[x])})
            }

            aggregate.match({$or:y});
        }
    }

    if(searchCollege===null || searchCollege ===undefined|| searchCollege ==="")
    {
        
    }else
    {
        if(searchCollege.length>0)
        {
            let y=[];

            for(let x=0;x<searchCollege.length;x++)
            {
                y.push({"college_doc._id":ObjectId(searchCollege[x])})
            }

            aggregate.match({$or:y});
        }
    }

    if(searchUni===null || searchUni ===undefined|| searchUni ==="")
    {
        
    }else
    {
        if(searchUni.length>0)
        {
            let y=[];

            for(let x=0;x<searchUni.length;x++)
            {
                y.push({"college_doc.university_id":ObjectId(searchUni[x])})
            }

            aggregate.match({$or:y});
        }
    }

    if(searchState===null || searchState ===undefined|| searchState ==="")
    {
        
    }else
    {
        if(searchState.length>0)
        {
            let y=[];

            for(let x=0;x<searchState.length;x++)
            {
                y.push({"c_state":searchState[x]})
            }

            aggregate.match({$or:y});
        }
    }

    if(searchSpecialization===null || searchSpecialization ===undefined|| searchSpecialization ==="")
    {
        
    }else
    {
        if(searchSpecialization.length>0)
        {
            let y=[];

            for(let x=0;x<searchSpecialization.length;x++)
            {
                y.push({"major_doc._id":ObjectId(searchSpecialization[x])},{"minor_doc._id":ObjectId(searchSpecialization[x])})
            }

            aggregate.match({$or:y});

        }
    }


    if(search===null || search ===undefined)
    {
        
    }else
    {
        aggregate.match({$or:[{"fname":{"$regex": search, "$options": "i"}},{"lname":{"$regex": search, "$options": "i"}}]});
    }

  if(searchContact===null || searchContact ===undefined)
    {
        
    }else
    {
        aggregate.match({"contact_no":{"$regex": searchContact, "$options": "i"}});
    }

    if(paymentStatus===null || paymentStatus ===undefined)
    {
        
    }else
    {
        aggregate.match({"payment_status": paymentStatus});
    }

    if(noOfVacancy===null || noOfVacancy ===undefined)
    {
        
    }else
    {
        aggregate.match({"interest_job":{$gte: noOfVacancy} });
    }

    if(approved===null || approved ===undefined)
    {
        
    }else
    {
        if(approved==="approved")
        {
            aggregate.match({"is_approved":true});
        }
        else if(approved==="not_approved")
        {
            aggregate.match({"is_approved":false});
        }
        
    }

    if(is_submit===null || is_submit ===undefined)
    {
        
    }else
    {
        if(is_submit==="submit")
        {
            aggregate.match({"is_submited":true});
        }
        else if(is_submit==="not_submit")
        {
            aggregate.match({"is_submited":false});
        }
        
    }
    
    if(page_no==0)
    {
        res.send(
        
            setting.status("page no empty",false,"page No error",null)

        );
    }

    var options = { page : page_no, limit : variables.pagecontent}

    Student.aggregatePaginate(aggregate, options, function(err, results, pageCount, count) {
        if(err) 
        {
            res.send(
    
                setting.status("Error",false,"error",err)

               );
        }
        else
        { 
            res.send(
        
                setting.status("Details'",true,"Data found",{pages:pageCount,count:count,pagesize:parseInt(variables.pagecontent),results})

            );
        }
    })    
});


router.get("/employer/:id", middleware.checkToken, function (req, res, next)
{
   
    var ObjectId = require('mongodb').ObjectID;

    var id=req.params.id;

    var aggregate = Vacancy.aggregate();

    var page_no = req.param('page');
    var searchName = req.body.searchName;
    var search = req.body.search;
    
    aggregate.match({"employer_id" : ObjectId(id)})
            .match({"status":"active"})
            .lookup({ from: "invites", localField: "_id", foreignField: "vacancy_id",as: "invite_doc"})
            .project({_id:"$_id",job_title:"$job_title",number:"$job_title",description:"$description","job_location":"$job_location",
            "min_ctc":{ $ifNull: [ "$min_ctc", "null" ] },
            "max_ctc":{ $ifNull: [ "$max_ctc", "null" ] },
            "invited": {"$size": {
                    $filter: {
                    input: "$invite_doc",
                    as: "s",
                    cond: { $and: [
                        { $eq: [ "$$s.status", "1" ] },
                        ]}
                    }
                }},
            "invite_accept": {"$size": {
                $filter: {
                input: "$invite_doc",
                as: "s",
                cond: { $and: [
                    { $eq: [ "$$s.status", "2" ] },
                    ]}
                }
            }},
            "offered": {"$size": {
                $filter: {
                input: "$invite_doc",
                as: "s",
                cond: { $and: [
                    { $eq: [ "$$s.status", "7" ] },
                    ]}
                }
            }}

            })
           
    if(search===null || search ===undefined)
    {
        
    }else
    {
        aggregate.match({$or:[{"fname":{"$regex": search, "$options": "i"}},{"lname":{"$regex": search, "$options": "i"}}]});
    }

    if(page_no==0)
    {
        res.send(
        
            setting.status("page no empty",false,"page No error",null)

        );
    }

    var options = { page : page_no, limit : variables.pagecontent}

    Vacancy.aggregatePaginate(aggregate, options, function(err, results, pageCount, count) {
        if(err) 
        {
            
            res.send(
    
                setting.status("Error",false,"error",err)

            );
        }
        else
        { 
        
            res.send(
        
                setting.status("Details'",true,"Data found",{pages:pageCount,count:count,pagesize:parseInt(variables.pagecontent),results})

            );
        
        }
    })    
});

router.get("/vacancy/:id/offer", middleware.checkToken, function (req, res, next)
{
      
    var ObjectId = require('mongodb').ObjectID;

    var id = req.params.id;

    var aggregate = Student.aggregate();

    var page_no = req.param('page');
    var search = req.body.search;
        
    aggregate//.match({"_id" :ObjectId(id)})
            .lookup({ from: "invites", localField: "_id", foreignField: "student_id",as: "invite_doc"})
            .lookup({ from: "vacancies", localField: "invite_doc.vacancy_id", foreignField: "_id",as: "vacancy_doc"})
            .match({"vacancy_doc._id" :ObjectId(id)})
            .match({"invite_doc.status":"7"})
            .project({"_id":"$_id","payment_status":"$payment_status","fname":"$fname","lname":"$lname","contact_no":"$contact_no","email":"$email"})
              

    // if(search===null || search ===undefined)
    // {
        
    // }else
    // {
    //     aggregate.match({$or:[{"fname":{"$regex": search, "$options": "i"}},{"lname":{"$regex": search, "$options": "i"}}]});
    // }

    if(page_no==0)
    {
        res.send(
        
            setting.status("page no empty",false,"page No error",null)

        );
    }

    var options = { page : page_no, limit : variables.pagecontent}

    Student.aggregatePaginate(aggregate, options, function(err, results, pageCount, count) {
        if(err) 
        {
            
            res.send(
    
                setting.status("Error",false,"error",err)

            );
        }
        else
        { 
        
            res.send(
        
                setting.status("Details'",true,"Data found",{pages:pageCount,count:count,pagesize:parseInt(variables.pagecontent),results})

            );
        
        }
    })    
});

router.get('/enroll/pending', middleware.checkToken,(req, res) => {

    var aggregate = Other_enroll.aggregate();

    var page_no = req.param('page');
    var search = req.param('search');
   

    aggregate.sort({"createdAt" : -1})
    
    if(search===null || search ===undefined)
    {
        
    }else
    {
        aggregate.match({"name":{"$regex": search, "$options": "i"}});
    }

    if(page_no==0)
    {
        res.send(
        
            setting.status(validation.SHOW,false,"page No error",null)

        );
    }

    var options = { page : page_no, limit : parseInt(variables.pagecontent)}

    Other_enroll.aggregatePaginate(aggregate, options, function(err, results, pageCount, count) {
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


router.post('/change_password/:id', middleware.checkToken,(req, res) => {

    
    var ObjectId = require('mongodb').ObjectID;
    var id=req.params.id;
	
	if(!ObjectId.isValid(id))
		{
			return res.send(
					
				setting.status("Invalid ID",false,"incorrect id",null)

			 );
        }
        
    if(req.body.password==undefined || req.body.password==null || req.body.password=='') 
        {
            
            return res.json(
                    
                setting.status("Password cannot be empty",false,"password is empty",null)
        
            );
            
        }

    if(req.body.new_password==undefined || req.body.new_password==null || req.body.new_password=='') 
        {
            return res.json(
                    
                setting.status("New Password cannot be empty",false,"new password is empty",null)
        
            );
            
        }

    var mobileLength1 = Object.keys(req.body.new_password).length; // Taking length
    if(mobileLength1 < parseInt(variables.password_length) )
        {
            return res.json(
                
                setting.status("New Password length greter than "+variables.password_length,false,"new_password is empty",null)
        
              );
            
        }

    if(req.body.conform_password==undefined || req.body.conform_password==null || req.body.conform_password=='') 
        {
            return res.json(
                    
                setting.status("Conform Password cannot be empty",false,"conform password is empty",null)
        
            );
            
        }

    User.findOne({
            _id: id
        })
        .then(college => {
            if (college) {


                var passwordIsValid = bcrypt.compareSync(req.body.password, college.password);
                if (!passwordIsValid)
                return res.send(
                    
                        setting.status("Wrong Pasword",false,"password wrong",null)
                
                    );

                let old_password=college.password;
                let coming_password=req.body.password;
                let new_password=req.body.new_password;
                let conform_password=req.body.conform_password;

                let hashedPassword="";


                bcrypt.genSalt(10, (err, salt) =>
                    {
                        bcrypt.hash(new_password, salt, (err, hash) =>
                        {
                            if (err)
                            {
                                throw err;
                            }else
                            {
                                hashedPassword = hash;
                           

                    console.log("pass",hashedPassword)


                    if(new_password===conform_password)
                    {
                        User.findOneAndUpdate(
                            { _id : id },
                            {$set:{
                            password:hashedPassword}},
                            {runValidators: true, context: 'query' })
                          .then(college =>{
                            return res.json(
            
                                    setting.status("Password Changed",true,"updated",null)
                            
                                );
                          })
                          .catch(err =>{
                                
                                if(err)
                                {
                                    return res.json(
                
                                        setting.status("Error",false,"error",err)
                                
                                      );
                                }
                          });
                        
                    }else
                    {
                        return res.json(
		
                            setting.status("Password Not Match",false,"newpassword not match to conform password",null)
                    
                        );
                    }
                }
                                
                                

            })
    });
                

            } else {
                return res.json(
		
                    setting.status("Employer Not Found",false,"error",err)
            
                  );
            }
        })
})

module.exports = router;



// router.post('/login', passport.authenticate('local', { failureRedirect: '/login', failureFlash: true }), (req, res, next) => {
//     req.session.save((err) => {
//         if (err) {
//             return next(err);
//         }
//         res.redirect('/');
//     });
// });