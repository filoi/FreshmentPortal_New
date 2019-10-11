const express = require('express');
const router = express.Router();
const passport = require('passport');
//Load Input Validation
const Vacancy = require('../../models/vacancy');
const Suggestion = require('../../models/suggestion');
const Vacancy_specialization = require('../../models/vacancy_specializations');
const Vacancy_Course = require('../../models/vacancy_course');
const variables=require("../return_msg/keyvalue");

const Student = require('../../models/student_enrollment');
const Reject = require('../../models/reject');

const setting=require("../return_msg/setting");
const vacancyValidation=require("../validation/vacancy");
let middleware = require('../../validation/middleware');
const CCS_Associations = require('../../models/ccs_association');
const arrayUniq = require('array-uniq');

var sendMail=require("../return_msg/sendMail");
const Offer = require('../../models/offer');

const Employer = require('../../models/employer');
const Invite = require('../../models/invite');


//@route GET api/university/register
//@desc Register route
//@access Public
router.post('/', middleware.checkToken, (req, res) => {

    // var result=middleware.function1("CAN_ADD_UNIVERSITIES");
    // if(!result.status)
    // {
    //     return res.send(result);
    // }

    var resultVali=vacancyValidation.CheckValidation(req.body);
    if(!resultVali.status)
    {
        return res.send(resultVali);
    }

    var idd=middleware.get_id();

    const newVacancy = new Vacancy({
        job_title: req.body.job_title,
        number: req.body.number,
        description:req.body.description,
        closing_date:req.body.closing_date,
        status:"active",
        date_from : req.body.date_from,
        date_to : req.body.date_to,
        venue : req.body.venue,
        job_location: req.body.job_location,
        job_start_date: req.body.job_start_date,
        desired_skills: req.body.desired_skills,
        desired_educational_qualification: req.body.desired_educational_qualification,
        minimum_percentage: req.body.minimum_percentage,
        minimum_grade: req.body.minimum_grade,
        minimum_cgpa: req.body.minimum_cgpa,
        min_ctc: req.body.min_ctc,
        max_ctc: req.body.max_ctc,
        employer_id:idd,
        
    });

    newVacancy.save()
        .then(async university =>{

            let list=[];
            let courseList=[];
            list=req.body.list;
            courseList=req.body.courseList;

            await save_vacancySpecialization(list,university._id);
            if(courseList.length>0)
            {
                await save_vacancyCourse(courseList,university._id);

            }

            if(courseList.length>0)
            {
            } 
            await suggestion(list,university._id);

             res.json(

                    setting.status("Vacancy created",true,"created",await university)
        
            );
        })
        .catch(err => {
           
            return res.json(

                setting.status("Error",false,"error",err)
        
            );
            
        }); 
})

async function save_vacancyCourse (list,id)
{
    for(let x=0;x<list.length;x++)
        {
            const newRole = new Vacancy_Course({
                vacancy_id:id,
                course_id: list[x],
                
            });
        
            await newRole.save()
        }
}

async function save_vacancySpecialization(list,id)
{
    for(let x=0;x<list.length;x++)
        {
            const newRole = new Vacancy_specialization({
                vacancy_id:id,
                specialization_id: list[x],
                
            });
        
            await newRole.save()
        }
}


async function suggestion(list,vacancy_id)
{
    // var result=middleware.function1("CAN_VIEW_UNIVERSITIES");
    // if(!result.status)
    // {
    //     return res.send(result);
    // }  

    var ObjectId = require('mongodb').ObjectID;
	
	if(!ObjectId.isValid(vacancy_id))
		{
			return res.send(
					
				setting.status("Incorrect ID",false,"incorrect id",null)

			 );
		}
   // var aggregate = Vacancy.aggregate();
   //var aggregate = Student.aggregate();

  // aggregate.match({"_id":ObjectId(id)})

//    aggregate.match({"_id":ObjectId(id)})
//    .lookup({ from: "vacancy_specializations", localField: "_id", foreignField: "vacancy_id",as: "vacancy_spec_doc"})
//    .lookup({ from: "ccs_associations", localField: "vacancy_spec_doc.specialization_id", foreignField: "specialisation_id",as: "spec_doc"})
//    .lookup({ from: "student_enrollments", localField: "spec_doc.course_id", foreignField: "course_id",as: "student_doc"})
//    .project({vacancy_spec_doc:0})
//    .project({spec_doc:0})
  // .project({students:"$student_doc"});

//finalllllllll
    //  aggregate//.match({"_id":ObjectId(id)})
    //  .lookup({ from: "ccs_associations", localField: "course_id", foreignField: "course_id",as: "ccs_doc"})
    //  .lookup({ from: "vacancy_specializations", localField: "ccs_doc.specialisation_id", foreignField: "specialization_id",as: "vacancy_spec_doc"})
    // //  .filter({
    //     input: "$ccs_doc",
    //     as: "s",
    //     cond: {
    //         $eq: ["$$s.specialisation_id", "$vacancy_spec_doc.specialization_id"]
    //     },
        
    // })

     //.lookup({ from: "vacancies", localField: "vacancy_spec_doc.vacancy_id", foreignField: "_id",as: "vacancy_doc"})
    //  .project({ccs_doc:0})
    // .project({vacancy_spec_doc:0})
    // .project({vacancy_doc:0})
    //.match({"vacancy_spec_doc.specialization_id":ObjectId("5c2468b6ef69ab1c809488a9")})

    //.match({"vacancy_spec_doc.specialization_id":"ccs_doc.specialisation_id"})
 
    // let specialization=[];
    // let course=[];
    // let student=[];


    // await Vacancy_specialization.find({vacancy_id:vacancy_id})
    // .then(async result => {

    //     for(let x=0;x<result.length;x++)
    //     {
    //         specialization.push(result[x].specialization_id)
    //         console.log("Specu",specialization)
    //     }


    //     for(let x=0;x<specialization.length;x++)
    //     {
    //         await CCS_Associations.find({specialisation_id:specialization[x]})
    //         .then(async result => {

    //             for(let x=0;x<result.length;x++)
    //             {
    //                 await course.push({"id":result[x].course_id})
    //                 //console.log("course",course)
    //             }
    //         });
    //     }

    //     let test = removeDuplicates(course, "fake");
    //     console.log(test);

    //     function removeDuplicates(myArr, prop) {
    //     return myArr.filter((obj, pos, arr) => {
    //     return arr.map(mapObj =>
    //     mapObj[prop]).indexOf(obj[prop]) === pos;
    //     });
    //     }
        
    //     for(let x=0;x<test.length;x++)
    //     {
    //         await Student.find({course_id:test[x].id}).populate("college_id")
    //         .then(async result => {

    //             for(let x=0;x<result.length;x++)
    //             {
    //                 await student.push(result[x])
    //                 //console.log(student)
    //             }

    //         });
    //     }

    //     for(let x=0;x<student.length;x++)
    //         {
    //             const newRole = new Suggestion({
    //                 vacancy_id:vacancy_id,
    //                 student_id: student[x]._id,
                    
    //             });
            
    //             newRole.save();

    //             console.log("suggestion save");
                
    //         }
    // })


//User.find( { $or:[ {'_id':objId}, {'name':param}, {'nickname':param} ]},


let student=[];
let temp_student=[];

    for(let x=0;x<list.length;x++)
    {
        await Student.find({ $or:[ {'specialization_id_major':list[x]}, {'specialization_id_minor':list[x]}],status:"active"})
        .then(async result => {

            // await student.push(result[0]._id)

            for (let y = 0; y < result.length; y++) {

                temp_student[result[y]._id] = result[y]._id;
                //student.push({"id":result[y]._id})   
            }
        });
    }

    for(var k in temp_student){
        student.push({"id":temp_student[k]})   

    }

    await console.log("student",student);


        // let result = [];
        // for (let index = 0; index < student.length; index++) {
        // let el = student[index];
        // if (result.indexOf(el) === -1) result.push(el);
        // }


        // await console.log("result",result)

        // var filteredArray = student.filter(function(item, pos){
        // return student.indexOf(item)== pos; 
        // });

       // console.log( "unique",filteredArray );

        // let test = await removeDuplicates(student, "fake");
        //     console.log("test",test);

        // function removeDuplicates(myArr, prop) {
        //     return myArr.filter((obj, pos, arr) => {
        //     return arr.map(mapObj =>
        //     mapObj[prop]).indexOf(obj[prop]) === pos;
        //     });
        // }


        for(let x=0;x<student.length;x++)
            {
                const newRole = new Suggestion({
                    vacancy_id:vacancy_id,
                    student_id: student[x].id,
                    
                });
            
                newRole.save();
                
            }

        // const newRole = new Vacancy_specialization({
        //     vacancy_id:id,
        //     specialization_id: list[x],
            
        // });

        // await newRole.save()

  //***********************************new**************** */

    // var aggregate = Student.aggregate();

    // aggregate.match({"vacancy_id":ObjectId(vacancy_id)})
    // .lookup({ from: "student_enrollments", localField: "student_id", foreignField: "_id",as: "student_doc"})
    // .lookup({ from: "internships", localField: "student_doc._id", foreignField: "student_id",as: "internship_doc"})
    // .match({"student_doc.is_approved":true})
    // .lookup({ from: "colleges", localField: "student_doc.college_id", foreignField: "_id",as: "college_doc"})
    // .lookup({ from: "courses", localField: "student_doc.course_id", foreignField: "_id",as: "course_doc"})
    // .lookup({ from: "specializations", localField: "student_doc.specialization_id_major", foreignField: "_id",as: "major_doc"})
    // .lookup({ from: "specializations", localField: "student_doc.specialization_id_minor", foreignField: "_id",as: "minor_doc"})
    // .lookup({ from: "universities", localField: "college_doc.university_id", foreignField: "_id",as: "university_doc"})


    // if(searchCollege===null || searchCollege ===undefined|| searchCollege ==="")
    // {
        
    // }else
    // {
    //     if(searchCollege.length>0)
    //     {
    //         let y=[];

    //         for(let x=0;x<searchCollege.length;x++)
    //         {
    //             y.push({"student_doc.college_id":ObjectId(searchCollege[x])})
    //         }

    //         aggregate.match({$or:y});
    //     }
    // }

    // Suggestion.aggregatePaginate(aggregate, options, function(err, results, pageCount, count) {
    //     if(err) 
    //     {
    //         console.log(err)
    //         res.send(
    
    //             setting.status("Error",false,"error",err)

    //         );
    //     }
    //     else
    //     { 
        
    //         res.send(
        
    //             setting.status("Details'",true,"No data found",{pageCount:pageCount,results})

    //         );
        
    //     }
    // })
    
}


//@route  GET api/university/all
//@desc  Get all  university
//@access Public

router.get('/', middleware.checkToken, (req, res) => {

    //req.headers['authorization'];

    // var result=middleware.function1("CAN_VIEW_UNIVERSITIES");
    // if(!result.status)
    // {
    //     return res.send(result);
    // }
    var ObjectId = require('mongodb').ObjectID;

    var idd=middleware.get_id();
    var aggregate = Vacancy.aggregate();

    var page_no = req.param('page');
    var search = req.param('search');
    var searchContact = req.param('searchContact');
    var searchEmail = req.param('searchEmail');

    console.log(search)

    aggregate.sort({"job_title" : 1})
    .match({status:"active"})
    .match({employer_id:ObjectId(idd)})
    .lookup({ from: "vacancy_specializations", localField: "_id", foreignField: "vacancy_id",as: "vacancy_spec_doc"})
    .lookup({ from: "specializations", localField: "vacancy_spec_doc.specialization_id", foreignField: "_id",as: "spec_doc"})
    .project({vacancy_spec_doc:0});
    
    if(search===null || search ===undefined)
    {
        
    }else
    {
        aggregate.match({"job_title":{"$regex": search, "$options": "i"}});
    }
    
    // if(page_no==0)
    // {
    //     res.send(
        
    //         setting.status(validation.SHOW,false,"page No error",null)

    //     );
    // }

    var options = { page : page_no, limit : parseInt(variables.pagecontent)}

    Vacancy.aggregatePaginate(aggregate, options, function(err, results, pageCount, count) {
        if(err) 
        {
            console.log(err)
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

//@route  GET api/university/id
//@desc  Get one  university
//@access Public
router.get('/:id', middleware.checkToken,(req, res) => {

    // var result=middleware.function1("CAN_VIEW_UNIVERSITIES");
    // if(!result.status)
    // {
    //     return res.send(result);
    // }

    var ObjectId = require('mongodb').ObjectID;
    var id=req.params.id;

    var idd=middleware.get_id();
	
	if(!ObjectId.isValid(id))
		{
			return res.send(
					
				setting.status("incorrect id",false,"incorrect id",null)

			 );
        }
        
    var aggregate = Vacancy.aggregate();

    aggregate.match({"_id":ObjectId(id)})
    //.match({employer_id:ObjectId(idd)})
                .lookup({ from: "vacancy_specializations", localField: "_id", foreignField: "vacancy_id",as: "vacancy_spec_doc"})
                .lookup({ from: "specializations", localField: "vacancy_spec_doc.specialization_id", foreignField: "_id",as: "spec_doc"})
                .lookup({ from: "vacancy_courses", localField: "vacancy_spec_doc.vacancy_id", foreignField: "vacancy_id",as: "vacancy_course_doc"})
                .lookup({ from: "courses", localField: "vacancy_course_doc.course_id", foreignField: "_id",as: "course_doc"})
                .project({vacancy_spec_doc:0})
                .project({vacancy_course_doc:0});

    let page_no=req.params.page;                

    if(page_no==0)
    {
        res.send(
        
            setting.status("page numer wrong",false,"page No error",null)

        );
    }

    var options = { page : page_no, limit : parseInt(variables.pagecontent)}

    Vacancy.aggregatePaginate(aggregate, options, function(err, results, pageCount, count) {
        if(err) 
        {
            console.log(err)
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


//@route  GET api/university/id
//@desc  Get one  university
//@access Public

// @route   DELETE api/university/:id
// @desc    Delete university
// @access  Private
router.delete('/:id', middleware.checkToken, (req, res) => {

    // var result=middleware.function1("CAN_DELETE_UNIVERSITIES");
    // if(!result.status)
    // {
    //     return res.send(result);
    // }
    
    var ObjectId = require('mongodb').ObjectID;
    var id=req.params.id;
    
    if(!ObjectId.isValid(id))
        {
            return res.send(
                    
                setting.status("incorrect id",false,"incorrect id",null)

                );
        }
        
        Vacancy.findByIdAndUpdate(id, {
            status: "deactive",
            }, {new: true})

            .then(user => {
                res.json(setting.status("Deleted", true, "deleted", null));
            })
            .catch(err => {
                res.json(setting.status("Error", false, "error", err));
            });
        }    
  );

//@route GET api/university/universityupdate
//@desc Register route
//@access Public
router.post('/:id',middleware.checkToken,(req, res) => {

    // var result=middleware.function1("CAN_EDIT_UNIVERSITIES");
    // if(!result.status)
    // {
    //     return res.send(result);
    // }

    var result=vacancyValidation.CheckValidation(req.body);
    if(!result.status)
    {
        return res.send(result);
    }

    var ObjectId = require('mongodb').ObjectID;

	if(!ObjectId.isValid(req.params.id))
        {
            return res.send(
                        
                setting.status("ID wrong",false,"object id wrong",null)

            );
        }
        
    const id = req.params.id;

    Vacancy_specialization.remove({vacancy_id:id})
    .exec()
    .then(() => {

        let list=[ ];
        list=req.body.list;

        for(let x=0;x<list.length;x++)
            {
                const newRole = new Vacancy_specialization({
                    vacancy_id:id,
                    specialization_id: list[x],
                    
                });
            
                newRole.save()
            } 
        })
    .catch(err => {
        console.log(err);
       
    });


    //let courseList=[];

    let courseList=[];
    courseList=req.body.courseList;
console.log(courseList)

    Vacancy_Course.remove({vacancy_id:id})
    .exec()
    .then(() => {

        for(let x=0;x<courseList.length;x++)
            {
                const newRole = new Vacancy_Course({
                    vacancy_id:id,
                    course_id: courseList[x],
                    
                });
                newRole.save()
            } 
        })
    .catch(err => {
        console.log(err);
       
    });
    
    Vacancy.findOne({
            _id: id
        })
        .then(university => {
            if (university) {
                
                Vacancy.findOneAndUpdate(
                    { _id : id },
                    {$set:{
                        job_title: req.body.job_title,
                        number: req.body.number,
                        description:req.body.description,
                        closing_date:req.body.closing_date,
                        status:req.body.status, 
                        job_location: req.body.job_location,
                        job_start_date: req.body.job_start_date,
                        desired_skills: req.body.desired_skills,
                        desired_educational_qualification: req.body.desired_educational_qualification,
                        minimum_percentage: req.body.minimum_percentage,
                        minimum_grade: req.body.minimum_grade,
                        minimum_cgpa: req.body.minimum_cgpa,
                        min_ctc: req.body.min_ctc,
                        max_ctc: req.body.max_ctc,
                       }},
                    {runValidators: true, context: 'query' })
                   // {_id:id}}
                  .then(university =>{
                    res.json(
		
                        setting.status("Vacancy Updated",true,"updated",university)
                
                      );
                  })
                  .catch(err =>{
                   
                    res.json(

                        setting.status("Error",false,"error",err)
                
                    );
                       
                  });
            } else {
                res.json(
		
                    setting.status("University Not Found",false,"error",err)
            
                  );
            }
        })
})


//@route GET api/university/universityupdate
//@desc Register route
//@access Public
router.post('/:id/interview',middleware.checkToken,(req, res) => {

    // var result=middleware.function1("CAN_EDIT_UNIVERSITIES");
    // if(!result.status)
    // {
    //     return res.send(result);
    // }

    // var result=vacancyValidation.CheckValidation(req.body);
    // if(!result.status)
    // {
    //     return res.send(result);
    // }

    var ObjectId = require('mongodb').ObjectID;

	if(!ObjectId.isValid(req.params.id))
        {
            return res.send(
                        
                setting.status("ID wrong",false,"object id wrong",null)

            );
        }
        
    const id = req.params.id;
    
    Vacancy.findOne({
            _id: id
        })
        .then(university => {
            if (university) {
                
                Vacancy.findOneAndUpdate(
                    { _id : id },
                    {$set:{
                        date_from : req.body.date_from,
                        date_to : req.body.date_to,
                        venue : req.body.venue,}},
                    {runValidators: true, context: 'query' })
                   // {_id:id}}
                  .then(university =>{
                    res.json(
		
                        setting.status("Vacancy Updated",true,"updated",university)
                
                      );
                  })
                  .catch(err =>{
                   
                    res.json(

                        setting.status("Error",false,"error",err)
                
                    );
                       
                  });
            } else {
                res.json(
		
                    setting.status("University Not Found",false,"error",err)
            
                  );
            }
        })
})



//************************************************************************************************************ */
//*********************************View candidates for an vacancy********************************************* */
//************************************************************************************************************ */

router.get('/:vacancy_id/candidates', middleware.checkToken,(req, res) => {

    var ObjectId = require('mongodb').ObjectID;
    var vacancy_id=req.params.vacancy_id;
	
	if(!ObjectId.isValid(vacancy_id))
		{
			return res.send(
					
				setting.status("Incorrect Id",false,"incorrect id",null)

			 );
        }
        
    var aggregate = Invite.aggregate();

    
    // 1=interview invitation pending
    // 2=interview invitation is_accepted
    // 3=interview invitation rejected
    // 4=interview rejected
    // 5=offer request pending
    // 6=offer rejected
    // 7=offer given

    var status=req.param('status');

    console.log("status" +status)

    aggregate.match({"vacancy_id":ObjectId(vacancy_id)})
    //.match({status:status})
    .lookup({ from: "student_enrollments", localField: "student_id", foreignField: "_id",as: "student_doc"})
    .lookup({ from: "internships", localField: "student_doc._id", foreignField: "student_id",as: "internship_doc"})
    .lookup({ from: "colleges", localField: "student_doc.college_id", foreignField: "_id",as: "college_doc"})
    .lookup({ from: "courses", localField: "student_doc.course_id", foreignField: "_id",as: "course_doc"})
    .lookup({ from: "specializations", localField: "student_doc.specialization_id_major", foreignField: "_id",as: "major_doc"})
    .lookup({ from: "specializations", localField: "student_doc.specialization_id_minor", foreignField: "_id",as: "minor_doc"})
    .project({"student_doc.password":0})


    if(status===null || status ===undefined ||status==="")
        {
            
        }else
        {
            aggregate.match({status:status})

        }


    let page_no=req.params.page;                

    if(page_no==0)
    {
        res.send(
        
            setting.status("page error",false,"page No error",null)

        );
    }

    var options = { page : page_no, limit : parseInt(variables.pagecontent)}

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
        
                setting.status("Details'",true,"No data found",{results})

            );
        
        }
    })       
})

//************************************************************************************************************ */
//*************************************View Students Status*************************************************** */
//************************************************************************************************************ */

router.get('/students/:id/', middleware.checkToken,(req, res) => {

    var ObjectId = require('mongodb').ObjectID;
    var student_id=req.params.id;
	
	if(!ObjectId.isValid(student_id))
		{
			return res.send(
					
				setting.status("Incorrect Id",false,"incorrect id",null)

			 );
        }
        
    var aggregate = Invite.aggregate();
    
    // 1=interview invitation pending
    // 2=interview invitation is_accepted
    // 3=interview invitation rejected
    // 4=interview rejected
    // 5=offer request pending
    // 6=offer rejected
    // 7=offer given

    var status=req.param('status');

    console.log("status" +status)

    aggregate.match({"student_id":ObjectId(student_id)})
    .lookup({ from: "student_enrollments", localField: "student_id", foreignField: "_id",as: "student_doc"})
    .lookup({ from: "internships", localField: "student_doc._id", foreignField: "student_id",as: "internship_doc"})
    .lookup({ from: "vacancies", localField: "vacancy_id", foreignField: "_id",as: "vacancy_doc"})
    .lookup({ from: "employers", localField: "vacancy_doc.employer_id", foreignField: "_id",as: "employer_doc"})
    .project({"student_doc.password":0})


    if(status===null || status ===undefined ||status==="")
        {
            
        }else
        {
            aggregate.match({status:status})

        }


    let page_no=req.params.page;                

    if(page_no==0)
    {
        res.send(
        
            setting.status("page error",false,"page No error",null)

        );
    }

    var options = { page : page_no, limit : parseInt(variables.pagecontent)}

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
        
                setting.status("Details'",true,"No data found",{pages:pageCount,count:count,pagesize:parseInt(variables.pagecontent),results})

            );
        
        }
    })       
})

//************************************************************************************************************* */
//*********************************Change status */

router.post('/candidates/change_status', middleware.checkToken,async (req, res) => {

    // var result=middleware.function1("CAN_ADD_EMPLOYER");
    // if(!result.status)
    // {
    //     return res.send(result);
    // }

    if(req.body.student_id==undefined || req.body.student_id==null || req.body.student_id=='') 
        {
            return res.json(

                setting.status("Student ID cannot be empty",false,"student_id is empty",null)
        
            );
        }

    if(req.body.vacancy_id==undefined || req.body.vacancy_id==null || req.body.vacancy_id=='') 
        {
            return res.json(

                setting.status("Vacancy ID cannot be empty",false,"vacancy_id is empty",null)
        
            );
        }

    if(req.body.status==undefined || req.body.status==null || req.body.status=='') 
        {
            return res.json(

                setting.status("Status cannot be empty",false,"accept is empty",null)
        
            );
        }

   
    var ObjectId = require('mongodb').ObjectID;

	if(!ObjectId.isValid(req.body.vacancy_id))
        {
            return res.send(
                        
                setting.status("Vacancy ID wrong","False","object id wrong",null)

            );
        }

    if(!ObjectId.isValid(req.body.student_id))
        {
            return res.send(
                        
                setting.status("Student ID wrong","False","object id wrong",null)

            );
        }

    // 1=interview invitation pending              emp         interst 
    // 2=interview invitation is_accepted          stu         invitation accept
    // 3=interview invitation rejected             stu         invitation reject
    // 4=interview rejected                        emp          interview reject
    // 5=offer request pending                     emp          interview accept
    // 6=offer rejected                            stu          
    // 7=offer Acceptd                             emp
    // 8=offer accept   student                    stu
    // 9=offer reject employer                     emp

    var student_id=req.body.student_id;
    var vacancy_id=req.body.vacancy_id;
    var status=req.body.status;

    console.log("status",status)

    if(status==="1")  //1=Interview invitation pending  Employer
    {
        
        const newInvite = new Invite({
                student_id: student_id,
                vacancy_id: vacancy_id,
                status:status,
            });
        
            newInvite.save()
            .then(college =>{ 
                                   
                res.json(
        
                    setting.status("Succesfully Invite for interview",true,"invited",college)
            
                    );
            })
            .catch(err => {
                
                if(err)
                {
                    res.json(
        
                        setting.status("Error",false,"error",err)
                
                        );
                }
            });
    }
    
    else if(status===0)
    {
        reject(vacancy_id,student_id)

    }

    else if(status==="5")  //7=offer given
    {

        if(req.body.ctc==undefined || req.body.ctc==null || req.body.ctc=='') 
        {
            return res.json(

                setting.status("CTC cannot be empty",false,"ctc is empty",null)
        
            );
        }

        if(req.body.hr_name==undefined || req.body.hr_name==null || req.body.hr_name=='') 
        {
            return res.json(

                setting.status("HR Name cannot be empty",false,"hr_name is empty",null)
        
            );
        }

        if(req.body.hr_email==undefined || req.body.hr_email==null || req.body.hr_email=='') 
        {
            return res.json(

                setting.status("HR Email cannot be empty",false,"hr_email is empty",null)
        
            );
        }

        if(!setting.CheckMail(req.body.hr_email))
        {
            result = {"msg":"Invalid HR Email Address", "status":false, "description":"wrong hr_email", "data":null}
			      return (result);
           
        }

        if(req.body.hr_contact_no==undefined || req.body.hr_contact_no==null || req.body.hr_contact_no=='') 
        {
            return res.json(

                setting.status("HR Contact Number cannot be empty",false,"hr_contact_no is empty",null)
        
            );
        }

        if(!setting.CheckMobile(req.body.hr_contact_no))
        {
            result = {"msg":"Invalid HR Contact Number", "status":false, "description":"hr_contact_no Number only", "data":null}
			      return (result);
           
        }

        var mobileLength = Object.keys(req.body.hr_contact_no).length; // Taking length

        if(mobileLength < 10 )
        {
            result = {"msg":"Invalid HR Contact Number Length minimum 10", "status":false, "description":"invalid Contact number", "data":null}
			      return (result);
            
        }

        if(req.body.join_date==undefined || req.body.join_date==null || req.body.join_date=='') 
        {
            return res.json(

                setting.status("Join Date cannot be empty",false,"join_date is empty",null)
        
            );
        }

        if(req.body.location==undefined || req.body.location==null || req.body.location=='') 
        {
            return res.json(

                setting.status("Location cannot be empty",false,"location is empty",null)
        
            );
        }


        Invite.findOneAndUpdate(
            { student_id : student_id,vacancy_id:vacancy_id },
            {$set:{
            status:status,
            ctc:req.body.ctc,
            hr_name:req.body.hr_name,
            hr_email:req.body.hr_email,
            hr_contact_no:req.body.hr_contact_no,
            join_date:req.body.join_date,
            location:req.body.location,

        }},
        {runValidators: true, context: 'query' })
    
        .then(college =>{  
                    
            return res.json(
    
                setting.status("Succesfully Invite",true,"invited",college)
        
                );
        })
        .catch(err => {
            
            if(err)
            {
                return res.json(
    
                    setting.status("Error",false,"error",err)
            
                    );
            }
        });


        // const newInvite = new Student({
        //     is_worked: true,
           
        //     });
        
        //     newInvite.save()
        //     .then(college =>{ 
                
        //    console.log("success")
        //     })
        //     .catch(err => {
                
        //         if(err)
        //         {
        //            console.log("error");
                   
        //         }
        //     });
    }

    else if(status==="7")  //7=offer given
    {
        Student.findOneAndUpdate(
            { _id : student_id },
            {$set:{
            is_worked:true,

        }},
        {runValidators: true, context: 'query' })
    
        .then(college =>{  
                    
            console.log("student updated")
        })
        .catch(err => {
            
            if(err)
            {
                console.log(err)
            }
        });

        Invite.findOneAndUpdate(
            { student_id : student_id,vacancy_id:vacancy_id },
            {$set:{
            status:status,

        }},
        {runValidators: true, context: 'query' })
    
        .then(college =>{  
                    
            return res.json(
    
                setting.status("Succesfully Invite",true,"invited",college)
        
                );
        })
        .catch(err => {
            
            if(err)
            {
                return res.json(
    
                    setting.status("Error",false,"error",err)
            
                    );
            }
        });


        // const newInvite = new Student({
        //     is_worked: true,
           
        //     });
        
        //     newInvite.save()
        //     .then(college =>{ 
                
        //    console.log("success")
        //     })
        //     .catch(err => {
                
        //         if(err)
        //         {
        //            console.log("error");
                   
        //         }
        //     });
    }

    else
    {
        Invite.findOneAndUpdate(
            { student_id : student_id,vacancy_id:vacancy_id },
            {$set:{
            status:status,
            
        }},
        {runValidators: true, context: 'query' })
    
        .then(college =>{  
                    
            res.json(
    
                setting.status("Succesfully Invite",true,"invited",college)
        
                );
        })
        .catch(err => {
            
            if(err)
            {
                res.json(
    
                    setting.status("Error",false,"error",err)
            
                    );
            }
        });

    }

 

    var employer_id=middleware.get_id();
    var email="";
    var name="";
    var job_title="";
    var emp_name="";
    var emp_email="";
    var emp_id="";

    Student.find({_id:student_id})
        .then(async result => {

         email=await result[0].email;
         name=await result[0].fname;
    

    Vacancy.find({_id:vacancy_id}).populate("employer_id")
        .then(async result => {

         job_title=await result[0].job_title;
         emp_name=await result[0].employer_id.name;
         emp_email=await result[0].employer_id.email;
         emp_id=await result[0].employer_id._id;

    var html;

   // </br>Date : `+req.body.date+` </br> Venue : `+req.body.venue+ `.</br>
    
    if(status==="1")  //1=Interview invitation pending  Employer
    {
        

      html = `<!DOCTYPE HTML PUBLIC "-//W3C//DTD XHTML 1.0 Transitional //EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd"><html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office"><head>
        <!--[if gte mso 9]><xml>
         <o:OfficeDocumentSettings>
          <o:AllowPNG/>
          <o:PixelsPerInch>96</o:PixelsPerInch>
         </o:OfficeDocumentSettings>
        </xml><![endif]-->
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
        <meta name="viewport" content="width=device-width">
        <!--[if !mso]><!--><meta http-equiv="X-UA-Compatible" content="IE=edge"><!--<![endif]-->
        <title></title>
        <!--[if !mso]><!-- -->
        <link href="https://fonts.googleapis.com/css?family=Montserrat" rel="stylesheet" type="text/css">
        <!--<![endif]-->
        
        <style type="text/css" id="media-query">
          body {
      margin: 0;
      padding: 0; }
    
    table, tr, td {
      vertical-align: top;
      border-collapse: collapse; }
    
    .ie-browser table, .mso-container table {
      table-layout: fixed; }
    
    * {
      line-height: inherit; }
    
    a[x-apple-data-detectors=true] {
      color: inherit !important;
      text-decoration: none !important; }
    
    [owa] .img-container div, [owa] .img-container button {
      display: block !important; }
    
    [owa] .fullwidth button {
      width: 100% !important; }
    
    [owa] .block-grid .col {
      display: table-cell;
      float: none !important;
      vertical-align: top; }
    
    .ie-browser .num12, .ie-browser .block-grid, [owa] .num12, [owa] .block-grid {
      width: 600px !important; }
    
    .ExternalClass, .ExternalClass p, .ExternalClass span, .ExternalClass font, .ExternalClass td, .ExternalClass div {
      line-height: 100%; }
    
    .ie-browser .mixed-two-up .num4, [owa] .mixed-two-up .num4 {
      width: 200px !important; }
    
    .ie-browser .mixed-two-up .num8, [owa] .mixed-two-up .num8 {
      width: 400px !important; }
    
    .ie-browser .block-grid.two-up .col, [owa] .block-grid.two-up .col {
      width: 300px !important; }
    
    .ie-browser .block-grid.three-up .col, [owa] .block-grid.three-up .col {
      width: 200px !important; }
    
    .ie-browser .block-grid.four-up .col, [owa] .block-grid.four-up .col {
      width: 150px !important; }
    
    .ie-browser .block-grid.five-up .col, [owa] .block-grid.five-up .col {
      width: 120px !important; }
    
    .ie-browser .block-grid.six-up .col, [owa] .block-grid.six-up .col {
      width: 100px !important; }
    
    .ie-browser .block-grid.seven-up .col, [owa] .block-grid.seven-up .col {
      width: 85px !important; }
    
    .ie-browser .block-grid.eight-up .col, [owa] .block-grid.eight-up .col {
      width: 75px !important; }
    
    .ie-browser .block-grid.nine-up .col, [owa] .block-grid.nine-up .col {
      width: 66px !important; }
    
    .ie-browser .block-grid.ten-up .col, [owa] .block-grid.ten-up .col {
      width: 60px !important; }
    
    .ie-browser .block-grid.eleven-up .col, [owa] .block-grid.eleven-up .col {
      width: 54px !important; }
    
    .ie-browser .block-grid.twelve-up .col, [owa] .block-grid.twelve-up .col {
      width: 50px !important; }
    
    @media only screen and (min-width: 620px) {
      .block-grid {
        width: 600px !important; }
      .block-grid .col {
        vertical-align: top; }
        .block-grid .col.num12 {
          width: 600px !important; }
      .block-grid.mixed-two-up .col.num4 {
        width: 200px !important; }
      .block-grid.mixed-two-up .col.num8 {
        width: 400px !important; }
      .block-grid.two-up .col {
        width: 300px !important; }
      .block-grid.three-up .col {
        width: 200px !important; }
      .block-grid.four-up .col {
        width: 150px !important; }
      .block-grid.five-up .col {
        width: 120px !important; }
      .block-grid.six-up .col {
        width: 100px !important; }
      .block-grid.seven-up .col {
        width: 85px !important; }
      .block-grid.eight-up .col {
        width: 75px !important; }
      .block-grid.nine-up .col {
        width: 66px !important; }
      .block-grid.ten-up .col {
        width: 60px !important; }
      .block-grid.eleven-up .col {
        width: 54px !important; }
      .block-grid.twelve-up .col {
        width: 50px !important; } }
    
    @media (max-width: 620px) {
      .block-grid, .col {
        min-width: 320px !important;
        max-width: 100% !important;
        display: block !important; }
      .block-grid {
        width: calc(100% - 40px) !important; }
      .col {
        width: 100% !important; }
        .col > div {
          margin: 0 auto; }
      img.fullwidth, img.fullwidthOnMobile {
        max-width: 100% !important; }
      .no-stack .col {
        min-width: 0 !important;
        display: table-cell !important; }
      .no-stack.two-up .col {
        width: 50% !important; }
      .no-stack.mixed-two-up .col.num4 {
        width: 33% !important; }
      .no-stack.mixed-two-up .col.num8 {
        width: 66% !important; }
      .no-stack.three-up .col.num4 {
        width: 33% !important; }
      .no-stack.four-up .col.num3 {
        width: 25% !important; }
      .mobile_hide {
        min-height: 0px;
        max-height: 0px;
        max-width: 0px;
        display: none;
        overflow: hidden;
        font-size: 0px; } }
    
        </style>
    </head>
    <body class="clean-body" style="margin: 0;padding: 0;-webkit-text-size-adjust: 100%;background-color: #e2eace">
      <style type="text/css" id="media-query-bodytag">
        @media (max-width: 520px) {
          .block-grid {
            min-width: 320px!important;
            max-width: 100%!important;
            width: 100%!important;
            display: block!important;
          }
    
          .col {
            min-width: 320px!important;
            max-width: 100%!important;
            width: 100%!important;
            display: block!important;
          }
    
            .col > div {
              margin: 0 auto;
            }
    
          img.fullwidth {
            max-width: 100%!important;
          }
                img.fullwidthOnMobile {
            max-width: 100%!important;
          }
          .no-stack .col {
                    min-width: 0!important;
                    display: table-cell!important;
                }
                .no-stack.two-up .col {
                    width: 50%!important;
                }
                .no-stack.mixed-two-up .col.num4 {
                    width: 33%!important;
                }
                .no-stack.mixed-two-up .col.num8 {
                    width: 66%!important;
                }
                .no-stack.three-up .col.num4 {
                    width: 33%!important;
                }
                .no-stack.four-up .col.num3 {
                    width: 25%!important;
                }
          .mobile_hide {
            min-height: 0px!important;
            max-height: 0px!important;
            max-width: 0px!important;
            display: none!important;
            overflow: hidden!important;
            font-size: 0px!important;
          }
        }
      </style>
      <!--[if IE]><div class="ie-browser"><![endif]-->
      <!--[if mso]><div class="mso-container"><![endif]-->
      <table class="nl-container" style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;min-width: 320px;Margin: 0 auto;background-color: #e2eace;width: 100%" cellpadding="0" cellspacing="0">
        <tbody>
        <tr style="vertical-align: top">
            <td style="word-break: break-word;border-collapse: collapse !important;vertical-align: top">
        <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td align="center" style="background-color: #e2eace;"><![endif]-->
    
        <div style="background-color:transparent;">
          <div style="Margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: transparent;" class="block-grid ">
            <div style="border-collapse: collapse;display: table;width: 100%;background-color:transparent;">
              <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="background-color:transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width: 600px;"><tr class="layout-full-width" style="background-color:transparent;"><![endif]-->
    
                  <!--[if (mso)|(IE)]><td align="center" width="600" style=" width:600px; padding-right: 0px; padding-left: 0px; padding-top:5px; padding-bottom:0px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;" valign="top"><![endif]-->
                <div class="col num12" style="min-width: 320px;max-width: 600px;display: table-cell;vertical-align: top;">
                  <div style="background-color: transparent; width: 100% !important;">
                  <!--[if (!mso)&(!IE)]><!--><div style="border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent; padding-top:5px; padding-bottom:0px; padding-right: 0px; padding-left: 0px;"><!--<![endif]-->
    
                      
                        <div align="center" class="img-container center  autowidth  fullwidth " style="padding-right: 0px;  padding-left: 0px;">
    <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr style="line-height:0px;line-height:0px;"><td style="padding-right: 0px; padding-left: 0px;" align="center"><![endif]-->
    <div style="line-height:25px;font-size:1px">&#160;</div>  <img class="center  autowidth  fullwidth" align="center" border="0" src="https://d1oco4z2z1fhwp.cloudfront.net/templates/default/20/rounder-up.png" alt="Image" title="Image" style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: block !important;border: 0;height: auto;float: none;width: 100%;max-width: 600px" width="600">
    <!--[if mso]></td></tr></table><![endif]-->
    </div>
    
                      
                  <!--[if (!mso)&(!IE)]><!--></div><!--<![endif]-->
                  </div>
                </div>
              <!--[if (mso)|(IE)]></td></tr></table></td></tr></table><![endif]-->
            </div>
          </div>
        </div>
        <div style="background-color:transparent;">
          <div style="Margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: #FFFFFF;" class="block-grid ">
            <div style="border-collapse: collapse;display: table;width: 100%;background-color:#FFFFFF;">
              <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="background-color:transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width: 600px;"><tr class="layout-full-width" style="background-color:#FFFFFF;"><![endif]-->
    
                  <!--[if (mso)|(IE)]><td align="center" width="600" style=" width:600px; padding-right: 0px; padding-left: 0px; padding-top:5px; padding-bottom:5px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;" valign="top"><![endif]-->
                <div class="col num12" style="min-width: 320px;max-width: 600px;display: table-cell;vertical-align: top;">
                  <div style="background-color: transparent; width: 100% !important;">
                  <!--[if (!mso)&(!IE)]><!--><div style="border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent; padding-top:5px; padding-bottom:5px; padding-right: 0px; padding-left: 0px;"><!--<![endif]-->
    
                      
                        <div align="center" class="img-container center  autowidth  " style="padding-right: 0px;  padding-left: 0px;">
    <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr style="line-height:0px;line-height:0px;"><td style="padding-right: 0px; padding-left: 0px;" align="center"><![endif]-->
      <img class="center  autowidth " align="center" border="0" src="https://i.imgur.com/FrVRrnL.png" alt="Image" title="Image" style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: block !important;border: 0;height: auto;float: none;width: 100%;max-width: 250px" width="250">
    <!--[if mso]></td></tr></table><![endif]-->
    </div>
    
                      
                      
                        <div class="">
        <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 10px; padding-left: 10px; padding-top: 10px; padding-bottom: 10px;"><![endif]-->
        <div style="color:#555555;font-family:'Montserrat', 'Trebuchet MS', 'Lucida Grande', 'Lucida Sans Unicode', 'Lucida Sans', Tahoma, sans-serif;line-height:150%; padding-right: 10px; padding-left: 10px; padding-top: 10px; padding-bottom: 10px;"> 
            <div style="font-size:12px;line-height:18px;color:#555555;font-family:'Montserrat', 'Trebuchet MS', 'Lucida Grande', 'Lucida Sans Unicode', 'Lucida Sans', Tahoma, sans-serif;text-align:left;"><p style="margin: 0;font-size: 14px;line-height: 21px;text-align: center"></p></div>    
        </div>
        <!--[if mso]></td></tr></table><![endif]-->
    </div>
                      
                  <!--[if (!mso)&(!IE)]><!--></div><!--<![endif]-->
                  </div>
                </div>
              <!--[if (mso)|(IE)]></td></tr></table></td></tr></table><![endif]-->
            </div>
          </div>
        </div>
        <div style="background-color:transparent;">
          <div style="Margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: #FFFFFF;" class="block-grid ">
            <div style="border-collapse: collapse;display: table;width: 100%;background-color:#FFFFFF;">
              <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="background-color:transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width: 600px;"><tr class="layout-full-width" style="background-color:#FFFFFF;"><![endif]-->
    
                  <!--[if (mso)|(IE)]><td align="center" width="600" style=" width:600px; padding-right: 0px; padding-left: 0px; padding-top:0px; padding-bottom:5px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;" valign="top"><![endif]-->
                <div class="col num12" style="min-width: 320px;max-width: 600px;display: table-cell;vertical-align: top;">
                  <div style="background-color: transparent; width: 100% !important;">
                  <!--[if (!mso)&(!IE)]><!--><div style="border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent; padding-top:0px; padding-bottom:5px; padding-right: 0px; padding-left: 0px;"><!--<![endif]-->
    
                      
                        <div class="">
        <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 10px; padding-left: 10px; padding-top: 10px; padding-bottom: 10px;"><![endif]-->
        <div style="color:#0D0D0D;font-family:'Montserrat', 'Trebuchet MS', 'Lucida Grande', 'Lucida Sans Unicode', 'Lucida Sans', Tahoma, sans-serif;line-height:120%; padding-right: 10px; padding-left: 10px; padding-top: 10px; padding-bottom: 10px;"> 
            <div style="font-size:12px;line-height:14px;color:#0D0D0D;font-family:'Montserrat', 'Trebuchet MS', 'Lucida Grande', 'Lucida Sans Unicode', 'Lucida Sans', Tahoma, sans-serif;text-align:left;">
          <p style="margin: 0;font-size: 14px;line-height: 17px;text-align: center">
           <strong> 
          <span style="font-size: 28px; line-height: 33px;">
          Dear ` + name + `,
        </span> </strong> <br><br>
    
               <div style="text-align: left;">  <span style="line-height: 33px; font-size: 20px;">
                
          </span></div>
      </p></div>    
        </div>
        <!--[if mso]></td></tr></table><![endif]-->
    </div>
                      
                      
                        <div align="center" class="img-container center  autowidth  " style="padding-right: 0px;  padding-left: 0px;">
    <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr style="line-height:0px;line-height:0px;"><td style="padding-right: 0px; padding-left: 0px;" align="center"><![endif]-->
      <img class="center  autowidth " align="center" border="0" src="https://d1oco4z2z1fhwp.cloudfront.net/templates/default/20/divider.png" alt="Image" title="Image" style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: block !important;border: 0;height: auto;float: none;width: 100%;max-width: 316px" width="316">
    <!--[if mso]></td></tr></table><![endif]-->
    </div>
    
                      
                      
                        <div class="">
        <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 10px; padding-left: 10px; padding-top: 10px; padding-bottom: 10px;"><![endif]-->
        <div style="color:#555555;font-family:'Montserrat', 'Trebuchet MS', 'Lucida Grande', 'Lucida Sans Unicode', 'Lucida Sans', Tahoma, sans-serif;line-height:150%; padding-right: 10px; padding-left: 10px; padding-top: 10px; padding-bottom: 10px;"> 
            
        </div>
        <!--[if mso]></td></tr></table><![endif]-->
    </div>
                      
                      
                        <div class="">
        <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 10px; padding-left: 10px; padding-top: 20px; padding-bottom: 10px;"><![endif]-->
        <div style="color:#0D0D0D;font-family:'Montserrat', 'Trebuchet MS', 'Lucida Grande', 'Lucida Sans Unicode', 'Lucida Sans', Tahoma, sans-serif;line-height:150%; padding-right: 10px; padding-left: 10px; padding-top: 20px; padding-bottom: 10px;"> 
            <div style="font-size:12px;line-height:18px;color:#0D0D0D;font-family:'Montserrat', 'Trebuchet MS', 'Lucida Grande', 'Lucida Sans Unicode', 'Lucida Sans', Tahoma, sans-serif;text-align:left;"><p style="margin: 0;font-size: 14px;line-height: 21px;text-align: center">Congratulations! Your profile has been shortlisted for  ` + job_title + ` at ` + emp_name + ` based on your profile and job requirements ` + job_title + ` in ` + emp_name + `. 
            
			<br><br>Details for Face to Face interview are as follows:
			<br><code> Name : ` + emp_name + `</code>
			<br><code> Email : ` + emp_email + `</code>
			<br><code> Designation : ` + job_title + `</code>
			<br><code> Documents Required: Resume</code>
			</p>
      </div>

      <div class="">
        <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 10px; padding-left: 10px; padding-top: 20px; padding-bottom: 10px;"><![endif]-->
        <div style="color:#0D0D0D;font-family:'Montserrat', 'Trebuchet MS', 'Lucida Grande', 'Lucida Sans Unicode', 'Lucida Sans', Tahoma, sans-serif;line-height:150%; padding-right: 10px; padding-left: 10px; padding-top: 20px; padding-bottom: 10px;">
            <div style="font-size:12px;line-height:18px;color:#0D0D0D;font-family:'Montserrat', 'Trebuchet MS', 'Lucida Grande', 'Lucida Sans Unicode', 'Lucida Sans', Tahoma, sans-serif;text-align:left;"><p style="margin: 0;font-size: 14px;line-height: 21px;text-align: center"> Please click on 'Accept Invite'/ 'Reject Invite' link to confirm your slot for the interview.  
			</p>
      </div>

      <br>

      <div class="">
        <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 10px; padding-left: 10px; padding-top: 20px; padding-bottom: 10px;"><![endif]-->
        <div style="color:#0D0D0D;font-family:'Montserrat', 'Trebuchet MS', 'Lucida Grande', 'Lucida Sans Unicode', 'Lucida Sans', Tahoma, sans-serif;line-height:150%; padding-right: 10px; padding-left: 10px; padding-top: 20px; padding-bottom: 10px;">
            <div style="font-size:12px;line-height:18px;color:#0D0D0D;font-family:'Montserrat', 'Trebuchet MS', 'Lucida Grande', 'Lucida Sans Unicode', 'Lucida Sans', Tahoma, sans-serif;text-align:left;"><p style="margin: 0;font-size: 14px;line-height: 21px;text-align: center"> Please feel free to coordinate with your Campus Placement Officer for any details/ more clarity. 
			</p>
			</div>    
			
			
        </div>
        <!--[if mso]></td></tr></table><![endif]-->
    </div>
                      
                      
                        
    <div align="center" class="button-container center " style="padding-right: 10px; padding-left: 10px; padding-top:25px; padding-bottom:10px;">
      <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0" style="border-spacing: 0; border-collapse: collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;"><tr><td style="padding-right: 10px; padding-left: 10px; padding-top:25px; padding-bottom:10px;" align="center"><v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="" style="height:46pt; v-text-anchor:middle; width:151pt;" arcsize="7%" strokecolor="#a8bf6f" fillcolor="#a8bf6f"><w:anchorlock/><v:textbox inset="0,0,0,0"><center style="color:#ffffff; font-family:'Montserrat', 'Trebuchet MS', 'Lucida Grande', 'Lucida Sans Unicode', 'Lucida Sans', Tahoma, sans-serif; font-size:16px;"><![endif]-->
        <div style="color: #ffffff; background-color: #a8bf6f; border-radius: 4px; -webkit-border-radius: 4px; -moz-border-radius: 4px; max-width: 202px; width: 172px;width: auto; border-top: 0px solid transparent; border-right: 0px solid transparent; border-bottom: 0px solid transparent; border-left: 0px solid transparent; padding-top: 15px; padding-right: 15px; padding-bottom: 15px; padding-left: 15px; font-family: 'Montserrat', 'Trebuchet MS', 'Lucida Grande', 'Lucida Sans Unicode', 'Lucida Sans', Tahoma, sans-serif; text-align: center; mso-border-alt: none;">
          <span style="font-size:16px;line-height:32px;"><a href="`+ variables.WEB_LINK_STUDENT +`" style="text-decoration : none; color : #fff;"><strong>GoTo Application</strong></a></span>
        </div>
      <!--[if mso]></center></v:textbox></v:roundrect></td></tr></table><![endif]-->
    </div>
    
                      
                      
                        
    <table border="0" cellpadding="0" cellspacing="0" width="100%" class="divider " style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;min-width: 100%;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%">
        <tbody>
            <tr style="vertical-align: top">
                <td class="divider_inner" style="word-break: break-word;border-collapse: collapse !important;vertical-align: top;padding-right: 10px;padding-left: 10px;padding-top: 30px;padding-bottom: 10px;min-width: 100%;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%">
                    <table class="divider_content" align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;border-top: 0px solid transparent;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%">
                        <tbody>
                            <tr style="vertical-align: top">
                                <td style="word-break: break-word;border-collapse: collapse !important;vertical-align: top;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%">
                                    <span></span>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </td>
            </tr>
        </tbody>
    </table>
                      
                  <!--[if (!mso)&(!IE)]><!--></div><!--<![endif]-->
                  </div>
                </div>
              <!--[if (mso)|(IE)]></td></tr></table></td></tr></table><![endif]-->
            </div>
          </div>
        </div>
        <div style="background-color:transparent;">
          <div style="Margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: #525252;" class="block-grid three-up ">
            <div style="border-collapse: collapse;display: table;width: 100%;background-color:#525252;">
              <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="background-color:transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width: 600px;"><tr class="layout-full-width" style="background-color:#525252;"><![endif]-->
    
                  <!--[if (mso)|(IE)]><td align="center" width="200" style=" width:200px; padding-right: 0px; padding-left: 0px; padding-top:0px; padding-bottom:0px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;" valign="top"><![endif]-->
                <div class="col num4" style="max-width: 320px;min-width: 200px;display: table-cell;vertical-align: top;">
                  <div style="background-color: transparent; width: 100% !important;">
                  <!--[if (!mso)&(!IE)]><!--><div style="border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent; padding-top:0px; padding-bottom:0px; padding-right: 0px; padding-left: 0px;"><!--<![endif]-->
    
                      
                        
    <div align="center" style="padding-right: 0px; padding-left: 0px; padding-bottom: 0px;" class="">
      <div style="line-height:15px;font-size:1px">&#160;</div>
      <div style="display: table; max-width:131px;">
      <!--[if (mso)|(IE)]><table width="131" cellpadding="0" cellspacing="0" border="0"><tr><td style="border-collapse:collapse; padding-right: 0px; padding-left: 0px; padding-bottom: 0px;"  align="center"><table width="100%" cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse; mso-table-lspace: 0pt;mso-table-rspace: 0pt; width:131px;"><tr><td width="32" style="width:32px; padding-right: 5px;" valign="top"><![endif]-->
        <table align="left" border="0" cellspacing="0" cellpadding="0" width="32" height="32" style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;Margin-right: 5px">
          <tbody><tr style="vertical-align: top"><td align="left" valign="middle" style="word-break: break-word;border-collapse: collapse !important;vertical-align: top">
            
          <div style="line-height:5px;font-size:1px">&#160;</div>
          </td></tr>
        </tbody></table>
          <!--[if (mso)|(IE)]></td><td width="32" style="width:32px; padding-right: 5px;" valign="top"><![endif]-->
        <table align="left" border="0" cellspacing="0" cellpadding="0" width="32" height="32" style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;Margin-right: 5px">
          <tbody><tr style="vertical-align: top"><td align="left" valign="middle" style="word-break: break-word;border-collapse: collapse !important;vertical-align: top">
            
          <div style="line-height:5px;font-size:1px">&#160;</div>
          </td></tr>
        </tbody></table>
          <!--[if (mso)|(IE)]></td><td width="32" style="width:32px; padding-right: 0;" valign="top"><![endif]-->
        <table align="left" border="0" cellspacing="0" cellpadding="0" width="32" height="32" style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;Margin-right: 0">
          <tbody><tr style="vertical-align: top"><td align="left" valign="middle" style="word-break: break-word;border-collapse: collapse !important;vertical-align: top">
            
          <div style="line-height:5px;font-size:1px">&#160;</div>
          </td></tr>
        </tbody></table>
        <!--[if (mso)|(IE)]></td></tr></table></td></tr></table><![endif]-->
      </div>
    </div>
                      
                  <!--[if (!mso)&(!IE)]><!--></div><!--<![endif]-->
                  </div>
                </div>
                  <!--[if (mso)|(IE)]></td><td align="center" width="200" style=" width:200px; padding-right: 0px; padding-left: 0px; padding-top:5px; padding-bottom:5px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;" valign="top"><![endif]-->
                <div class="col num4" style="max-width: 320px;min-width: 200px;display: table-cell;vertical-align: top;">
                  <div style="background-color: transparent; width: 100% !important;">
                  <!--[if (!mso)&(!IE)]><!--><div style="border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent; padding-top:5px; padding-bottom:5px; padding-right: 0px; padding-left: 0px;"><!--<![endif]-->
    
                      
                        <div class="">
        <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 0px; padding-left: 0px; padding-top: 20px; padding-bottom: 0px;"><![endif]-->
        <div style="color:#a8bf6f;font-family:'Montserrat', 'Trebuchet MS', 'Lucida Grande', 'Lucida Sans Unicode', 'Lucida Sans', Tahoma, sans-serif;line-height:120%; padding-right: 0px; padding-left: 0px; padding-top: 20px; padding-bottom: 0px;">    
            <div style="font-size:12px;line-height:14px;color:#a8bf6f;font-family:'Montserrat', 'Trebuchet MS', 'Lucida Grande', 'Lucida Sans Unicode', 'Lucida Sans', Tahoma, sans-serif;text-align:left;"><p style="margin: 0;font-size: 12px;line-height: 14px;text-align: center"><span style="color: rgb(255, 255, 255); font-size: 12px; line-height: 14px;"><span style="font-size: 12px; line-height: 14px; color: rgb(168, 191, 111);">CAS SHRC | Bridging Talents and Opportunities</div> 
        </div>
        <!--[if mso]></td></tr></table><![endif]-->
    </div>
                      
                  <!--[if (!mso)&(!IE)]><!--></div><!--<![endif]-->
                  </div>
                </div>
                  <!--[if (mso)|(IE)]></td><td align="center" width="200" style=" width:200px; padding-right: 0px; padding-left: 0px; padding-top:5px; padding-bottom:5px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;" valign="top"><![endif]-->
                <div class="col num4" style="max-width: 320px;min-width: 200px;display: table-cell;vertical-align: top;">
                  <div style="background-color: transparent; width: 100% !important;">
                  <!--[if (!mso)&(!IE)]><!--><div style="border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent; padding-top:5px; padding-bottom:5px; padding-right: 0px; padding-left: 0px;"><!--<![endif]-->
    
                      
                        <div class="">
        <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 0px; padding-left: 0px; padding-top: 20px; padding-bottom: 0px;"><![endif]-->
        
        <!--[if mso]></td></tr></table><![endif]-->
    </div>
                      
                  <!--[if (!mso)&(!IE)]><!--></div><!--<![endif]-->
                  </div>
                </div>
              <!--[if (mso)|(IE)]></td></tr></table></td></tr></table><![endif]-->
            </div>
          </div>
        </div>
        <div style="background-color:transparent;">
          <div style="Margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: transparent;" class="block-grid ">
            <div style="border-collapse: collapse;display: table;width: 100%;background-color:transparent;">
              <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="background-color:transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width: 600px;"><tr class="layout-full-width" style="background-color:transparent;"><![endif]-->
    
                  <!--[if (mso)|(IE)]><td align="center" width="600" style=" width:600px; padding-right: 0px; padding-left: 0px; padding-top:0px; padding-bottom:5px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;" valign="top"><![endif]-->
                <div class="col num12" style="min-width: 320px;max-width: 600px;display: table-cell;vertical-align: top;">
                  <div style="background-color: transparent; width: 100% !important;">
                  <!--[if (!mso)&(!IE)]><!--><div style="border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent; padding-top:0px; padding-bottom:5px; padding-right: 0px; padding-left: 0px;"><!--<![endif]-->
    
                      
                        <div align="center" class="img-container center  autowidth  fullwidth " style="padding-right: 0px;  padding-left: 0px;">
    <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr style="line-height:0px;line-height:0px;"><td style="padding-right: 0px; padding-left: 0px;" align="center"><![endif]-->
      <img class="center  autowidth  fullwidth" align="center" border="0" src="https://d1oco4z2z1fhwp.cloudfront.net/templates/default/20/rounder-dwn.png" alt="Image" title="Image" style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: block !important;border: 0;height: auto;float: none;width: 100%;max-width: 600px" width="600">
    <!--[if mso]></td></tr></table><![endif]-->
    </div>
    
                      
                      
                        
    <table border="0" cellpadding="0" cellspacing="0" width="100%" class="divider " style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;min-width: 100%;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%">
        <tbody>
            <tr style="vertical-align: top">
                <td class="divider_inner" style="word-break: break-word;border-collapse: collapse !important;vertical-align: top;padding-right: 30px;padding-left: 30px;padding-top: 30px;padding-bottom: 30px;min-width: 100%;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%">
                    <table class="divider_content" align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;border-top: 0px solid transparent;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%">
                        <tbody>
                            <tr style="vertical-align: top">
                                <td style="word-break: break-word;border-collapse: collapse !important;vertical-align: top;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%">
                                    <span></span>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </td>
            </tr>
        </tbody>
    </table>
                      
                  <!--[if (!mso)&(!IE)]><!--></div><!--<![endif]-->
                  </div>
                </div>
              <!--[if (mso)|(IE)]></td></tr></table></td></tr></table><![endif]-->
            </div>
          </div>
        </div>
       <!--[if (mso)|(IE)]></td></tr></table><![endif]-->
            </td>
      </tr>
      </tbody>
      </table>
      <!--[if (mso)|(IE)]></div><![endif]-->
    
    
    </body></html>`
    
        sendMail.sendMail(email, html, 'Intimation of interview invite for ' + job_title + ' at ' + emp_name)
        setting.save_notification(student_id,emp_id,vacancy_id,"Invited for an Interview","1")
        setting.status_history(student_id,vacancy_id,"1")

    }

    else if(status==="2") //interview invitation accepted  Student
    {

      html = `<!DOCTYPE HTML PUBLIC "-//W3C//DTD XHTML 1.0 Transitional //EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd"><html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office"><head>
        <!--[if gte mso 9]><xml>
         <o:OfficeDocumentSettings>
          <o:AllowPNG/>
          <o:PixelsPerInch>96</o:PixelsPerInch>
         </o:OfficeDocumentSettings>
        </xml><![endif]-->
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
        <meta name="viewport" content="width=device-width">
        <!--[if !mso]><!--><meta http-equiv="X-UA-Compatible" content="IE=edge"><!--<![endif]-->
        <title></title>
        <!--[if !mso]><!-- -->
        <link href="https://fonts.googleapis.com/css?family=Montserrat" rel="stylesheet" type="text/css">
        <!--<![endif]-->
        
        <style type="text/css" id="media-query">
          body {
      margin: 0;
      padding: 0; }
    
    table, tr, td {
      vertical-align: top;
      border-collapse: collapse; }
    
    .ie-browser table, .mso-container table {
      table-layout: fixed; }
    
    * {
      line-height: inherit; }
    
    a[x-apple-data-detectors=true] {
      color: inherit !important;
      text-decoration: none !important; }
    
    [owa] .img-container div, [owa] .img-container button {
      display: block !important; }
    
    [owa] .fullwidth button {
      width: 100% !important; }
    
    [owa] .block-grid .col {
      display: table-cell;
      float: none !important;
      vertical-align: top; }
    
    .ie-browser .num12, .ie-browser .block-grid, [owa] .num12, [owa] .block-grid {
      width: 600px !important; }
    
    .ExternalClass, .ExternalClass p, .ExternalClass span, .ExternalClass font, .ExternalClass td, .ExternalClass div {
      line-height: 100%; }
    
    .ie-browser .mixed-two-up .num4, [owa] .mixed-two-up .num4 {
      width: 200px !important; }
    
    .ie-browser .mixed-two-up .num8, [owa] .mixed-two-up .num8 {
      width: 400px !important; }
    
    .ie-browser .block-grid.two-up .col, [owa] .block-grid.two-up .col {
      width: 300px !important; }
    
    .ie-browser .block-grid.three-up .col, [owa] .block-grid.three-up .col {
      width: 200px !important; }
    
    .ie-browser .block-grid.four-up .col, [owa] .block-grid.four-up .col {
      width: 150px !important; }
    
    .ie-browser .block-grid.five-up .col, [owa] .block-grid.five-up .col {
      width: 120px !important; }
    
    .ie-browser .block-grid.six-up .col, [owa] .block-grid.six-up .col {
      width: 100px !important; }
    
    .ie-browser .block-grid.seven-up .col, [owa] .block-grid.seven-up .col {
      width: 85px !important; }
    
    .ie-browser .block-grid.eight-up .col, [owa] .block-grid.eight-up .col {
      width: 75px !important; }
    
    .ie-browser .block-grid.nine-up .col, [owa] .block-grid.nine-up .col {
      width: 66px !important; }
    
    .ie-browser .block-grid.ten-up .col, [owa] .block-grid.ten-up .col {
      width: 60px !important; }
    
    .ie-browser .block-grid.eleven-up .col, [owa] .block-grid.eleven-up .col {
      width: 54px !important; }
    
    .ie-browser .block-grid.twelve-up .col, [owa] .block-grid.twelve-up .col {
      width: 50px !important; }
    
    @media only screen and (min-width: 620px) {
      .block-grid {
        width: 600px !important; }
      .block-grid .col {
        vertical-align: top; }
        .block-grid .col.num12 {
          width: 600px !important; }
      .block-grid.mixed-two-up .col.num4 {
        width: 200px !important; }
      .block-grid.mixed-two-up .col.num8 {
        width: 400px !important; }
      .block-grid.two-up .col {
        width: 300px !important; }
      .block-grid.three-up .col {
        width: 200px !important; }
      .block-grid.four-up .col {
        width: 150px !important; }
      .block-grid.five-up .col {
        width: 120px !important; }
      .block-grid.six-up .col {
        width: 100px !important; }
      .block-grid.seven-up .col {
        width: 85px !important; }
      .block-grid.eight-up .col {
        width: 75px !important; }
      .block-grid.nine-up .col {
        width: 66px !important; }
      .block-grid.ten-up .col {
        width: 60px !important; }
      .block-grid.eleven-up .col {
        width: 54px !important; }
      .block-grid.twelve-up .col {
        width: 50px !important; } }
    
    @media (max-width: 620px) {
      .block-grid, .col {
        min-width: 320px !important;
        max-width: 100% !important;
        display: block !important; }
      .block-grid {
        width: calc(100% - 40px) !important; }
      .col {
        width: 100% !important; }
        .col > div {
          margin: 0 auto; }
      img.fullwidth, img.fullwidthOnMobile {
        max-width: 100% !important; }
      .no-stack .col {
        min-width: 0 !important;
        display: table-cell !important; }
      .no-stack.two-up .col {
        width: 50% !important; }
      .no-stack.mixed-two-up .col.num4 {
        width: 33% !important; }
      .no-stack.mixed-two-up .col.num8 {
        width: 66% !important; }
      .no-stack.three-up .col.num4 {
        width: 33% !important; }
      .no-stack.four-up .col.num3 {
        width: 25% !important; }
      .mobile_hide {
        min-height: 0px;
        max-height: 0px;
        max-width: 0px;
        display: none;
        overflow: hidden;
        font-size: 0px; } }
    
        </style>
    </head>
    <body class="clean-body" style="margin: 0;padding: 0;-webkit-text-size-adjust: 100%;background-color: #e2eace">
      <style type="text/css" id="media-query-bodytag">
        @media (max-width: 520px) {
          .block-grid {
            min-width: 320px!important;
            max-width: 100%!important;
            width: 100%!important;
            display: block!important;
          }
    
          .col {
            min-width: 320px!important;
            max-width: 100%!important;
            width: 100%!important;
            display: block!important;
          }
    
            .col > div {
              margin: 0 auto;
            }
    
          img.fullwidth {
            max-width: 100%!important;
          }
                img.fullwidthOnMobile {
            max-width: 100%!important;
          }
          .no-stack .col {
                    min-width: 0!important;
                    display: table-cell!important;
                }
                .no-stack.two-up .col {
                    width: 50%!important;
                }
                .no-stack.mixed-two-up .col.num4 {
                    width: 33%!important;
                }
                .no-stack.mixed-two-up .col.num8 {
                    width: 66%!important;
                }
                .no-stack.three-up .col.num4 {
                    width: 33%!important;
                }
                .no-stack.four-up .col.num3 {
                    width: 25%!important;
                }
          .mobile_hide {
            min-height: 0px!important;
            max-height: 0px!important;
            max-width: 0px!important;
            display: none!important;
            overflow: hidden!important;
            font-size: 0px!important;
          }
        }
      </style>
      <!--[if IE]><div class="ie-browser"><![endif]-->
      <!--[if mso]><div class="mso-container"><![endif]-->
      <table class="nl-container" style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;min-width: 320px;Margin: 0 auto;background-color: #e2eace;width: 100%" cellpadding="0" cellspacing="0">
        <tbody>
        <tr style="vertical-align: top">
            <td style="word-break: break-word;border-collapse: collapse !important;vertical-align: top">
        <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td align="center" style="background-color: #e2eace;"><![endif]-->
    
        <div style="background-color:transparent;">
          <div style="Margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: transparent;" class="block-grid ">
            <div style="border-collapse: collapse;display: table;width: 100%;background-color:transparent;">
              <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="background-color:transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width: 600px;"><tr class="layout-full-width" style="background-color:transparent;"><![endif]-->
    
                  <!--[if (mso)|(IE)]><td align="center" width="600" style=" width:600px; padding-right: 0px; padding-left: 0px; padding-top:5px; padding-bottom:0px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;" valign="top"><![endif]-->
                <div class="col num12" style="min-width: 320px;max-width: 600px;display: table-cell;vertical-align: top;">
                  <div style="background-color: transparent; width: 100% !important;">
                  <!--[if (!mso)&(!IE)]><!--><div style="border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent; padding-top:5px; padding-bottom:0px; padding-right: 0px; padding-left: 0px;"><!--<![endif]-->
    
                      
                        <div align="center" class="img-container center  autowidth  fullwidth " style="padding-right: 0px;  padding-left: 0px;">
    <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr style="line-height:0px;line-height:0px;"><td style="padding-right: 0px; padding-left: 0px;" align="center"><![endif]-->
    <div style="line-height:25px;font-size:1px">&#160;</div>  <img class="center  autowidth  fullwidth" align="center" border="0" src="https://d1oco4z2z1fhwp.cloudfront.net/templates/default/20/rounder-up.png" alt="Image" title="Image" style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: block !important;border: 0;height: auto;float: none;width: 100%;max-width: 600px" width="600">
    <!--[if mso]></td></tr></table><![endif]-->
    </div>
    
                      
                  <!--[if (!mso)&(!IE)]><!--></div><!--<![endif]-->
                  </div>
                </div>
              <!--[if (mso)|(IE)]></td></tr></table></td></tr></table><![endif]-->
            </div>
          </div>
        </div>
        <div style="background-color:transparent;">
          <div style="Margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: #FFFFFF;" class="block-grid ">
            <div style="border-collapse: collapse;display: table;width: 100%;background-color:#FFFFFF;">
              <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="background-color:transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width: 600px;"><tr class="layout-full-width" style="background-color:#FFFFFF;"><![endif]-->
    
                  <!--[if (mso)|(IE)]><td align="center" width="600" style=" width:600px; padding-right: 0px; padding-left: 0px; padding-top:5px; padding-bottom:5px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;" valign="top"><![endif]-->
                <div class="col num12" style="min-width: 320px;max-width: 600px;display: table-cell;vertical-align: top;">
                  <div style="background-color: transparent; width: 100% !important;">
                  <!--[if (!mso)&(!IE)]><!--><div style="border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent; padding-top:5px; padding-bottom:5px; padding-right: 0px; padding-left: 0px;"><!--<![endif]-->
    
                      
                        <div align="center" class="img-container center  autowidth  " style="padding-right: 0px;  padding-left: 0px;">
    <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr style="line-height:0px;line-height:0px;"><td style="padding-right: 0px; padding-left: 0px;" align="center"><![endif]-->
      <img class="center  autowidth " align="center" border="0" src="https://i.imgur.com/FrVRrnL.png" alt="Image" title="Image" style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: block !important;border: 0;height: auto;float: none;width: 100%;max-width: 250px" width="250">
    <!--[if mso]></td></tr></table><![endif]-->
    </div>
    
                      
                      
                        <div class="">
        <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 10px; padding-left: 10px; padding-top: 10px; padding-bottom: 10px;"><![endif]-->
        <div style="color:#555555;font-family:'Montserrat', 'Trebuchet MS', 'Lucida Grande', 'Lucida Sans Unicode', 'Lucida Sans', Tahoma, sans-serif;line-height:150%; padding-right: 10px; padding-left: 10px; padding-top: 10px; padding-bottom: 10px;"> 
            <div style="font-size:12px;line-height:18px;color:#555555;font-family:'Montserrat', 'Trebuchet MS', 'Lucida Grande', 'Lucida Sans Unicode', 'Lucida Sans', Tahoma, sans-serif;text-align:left;"><p style="margin: 0;font-size: 14px;line-height: 21px;text-align: center"></p></div>    
        </div>
        <!--[if mso]></td></tr></table><![endif]-->
    </div>
                      
                  <!--[if (!mso)&(!IE)]><!--></div><!--<![endif]-->
                  </div>
                </div>
              <!--[if (mso)|(IE)]></td></tr></table></td></tr></table><![endif]-->
            </div>
          </div>
        </div>
        <div style="background-color:transparent;">
          <div style="Margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: #FFFFFF;" class="block-grid ">
            <div style="border-collapse: collapse;display: table;width: 100%;background-color:#FFFFFF;">
              <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="background-color:transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width: 600px;"><tr class="layout-full-width" style="background-color:#FFFFFF;"><![endif]-->
    
                  <!--[if (mso)|(IE)]><td align="center" width="600" style=" width:600px; padding-right: 0px; padding-left: 0px; padding-top:0px; padding-bottom:5px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;" valign="top"><![endif]-->
                <div class="col num12" style="min-width: 320px;max-width: 600px;display: table-cell;vertical-align: top;">
                  <div style="background-color: transparent; width: 100% !important;">
                  <!--[if (!mso)&(!IE)]><!--><div style="border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent; padding-top:0px; padding-bottom:5px; padding-right: 0px; padding-left: 0px;"><!--<![endif]-->
    
                      
                        <div class="">
        <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 10px; padding-left: 10px; padding-top: 10px; padding-bottom: 10px;"><![endif]-->
        <div style="color:#0D0D0D;font-family:'Montserrat', 'Trebuchet MS', 'Lucida Grande', 'Lucida Sans Unicode', 'Lucida Sans', Tahoma, sans-serif;line-height:120%; padding-right: 10px; padding-left: 10px; padding-top: 10px; padding-bottom: 10px;"> 
            <div style="font-size:12px;line-height:14px;color:#0D0D0D;font-family:'Montserrat', 'Trebuchet MS', 'Lucida Grande', 'Lucida Sans Unicode', 'Lucida Sans', Tahoma, sans-serif;text-align:left;">
          <p style="margin: 0;font-size: 14px;line-height: 17px;text-align: center">
           <strong> 
          <span style="font-size: 28px; line-height: 33px;">
          Dear ` + emp_name + `,
        </span> </strong> <br><br>
    
               <div style="text-align: left;">  <span style="line-height: 33px; font-size: 20px;">
          </span></div>
      </p></div>    
        </div>
        <!--[if mso]></td></tr></table><![endif]-->
    </div>
                      
                      
                        <div align="center" class="img-container center  autowidth  " style="padding-right: 0px;  padding-left: 0px;">
    <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr style="line-height:0px;line-height:0px;"><td style="padding-right: 0px; padding-left: 0px;" align="center"><![endif]-->
      <img class="center  autowidth " align="center" border="0" src="https://d1oco4z2z1fhwp.cloudfront.net/templates/default/20/divider.png" alt="Image" title="Image" style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: block !important;border: 0;height: auto;float: none;width: 100%;max-width: 316px" width="316">
    <!--[if mso]></td></tr></table><![endif]-->
    </div>
    
                      
                      
                        <div class="">
        <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 10px; padding-left: 10px; padding-top: 10px; padding-bottom: 10px;"><![endif]-->
        <div style="color:#555555;font-family:'Montserrat', 'Trebuchet MS', 'Lucida Grande', 'Lucida Sans Unicode', 'Lucida Sans', Tahoma, sans-serif;line-height:150%; padding-right: 10px; padding-left: 10px; padding-top: 10px; padding-bottom: 10px;"> 
            
        </div>
        <!--[if mso]></td></tr></table><![endif]-->
    </div>
                      
                      
                        <div class="">
        <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 10px; padding-left: 10px; padding-top: 20px; padding-bottom: 10px;"><![endif]-->
        <div style="color:#0D0D0D;font-family:'Montserrat', 'Trebuchet MS', 'Lucida Grande', 'Lucida Sans Unicode', 'Lucida Sans', Tahoma, sans-serif;line-height:150%; padding-right: 10px; padding-left: 10px; padding-top: 20px; padding-bottom: 10px;"> 
            <div style="font-size:12px;line-height:18px;color:#0D0D0D;font-family:'Montserrat', 'Trebuchet MS', 'Lucida Grande', 'Lucida Sans Unicode', 'Lucida Sans', Tahoma, sans-serif;text-align:left;"><p style="margin: 0;font-size: 14px;line-height: 21px;text-align: center">Your interview invitation for the position of ` + job_title + ` has been accepted by ` + name + `. You may contact the student via this email: ` + email + `
    
    
            </p></div>  
        </div>
        <!--[if mso]></td></tr></table><![endif]-->
    </div>
                      
                      
                        
    <div align="center" class="button-container center " style="padding-right: 10px; padding-left: 10px; padding-top:25px; padding-bottom:10px;">
      <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0" style="border-spacing: 0; border-collapse: collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;"><tr><td style="padding-right: 10px; padding-left: 10px; padding-top:25px; padding-bottom:10px;" align="center"><v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="" style="height:46pt; v-text-anchor:middle; width:151pt;" arcsize="7%" strokecolor="#a8bf6f" fillcolor="#a8bf6f"><w:anchorlock/><v:textbox inset="0,0,0,0"><center style="color:#ffffff; font-family:'Montserrat', 'Trebuchet MS', 'Lucida Grande', 'Lucida Sans Unicode', 'Lucida Sans', Tahoma, sans-serif; font-size:16px;"><![endif]-->
        <div style="color: #ffffff; background-color: #a8bf6f; border-radius: 4px; -webkit-border-radius: 4px; -moz-border-radius: 4px; max-width: 202px; width: 172px;width: auto; border-top: 0px solid transparent; border-right: 0px solid transparent; border-bottom: 0px solid transparent; border-left: 0px solid transparent; padding-top: 15px; padding-right: 15px; padding-bottom: 15px; padding-left: 15px; font-family: 'Montserrat', 'Trebuchet MS', 'Lucida Grande', 'Lucida Sans Unicode', 'Lucida Sans', Tahoma, sans-serif; text-align: center; mso-border-alt: none;">
          <span style="font-size:16px;line-height:32px;"><a href="`+ variables.WEB_LINK_EMPLOYER +`" style="text-decoration : none; color : #fff;"><strong>GoTo Application</strong></a></span>
        </div>
      <!--[if mso]></center></v:textbox></v:roundrect></td></tr></table><![endif]-->
    </div>
    
                      
                      
                        
    <table border="0" cellpadding="0" cellspacing="0" width="100%" class="divider " style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;min-width: 100%;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%">
        <tbody>
            <tr style="vertical-align: top">
                <td class="divider_inner" style="word-break: break-word;border-collapse: collapse !important;vertical-align: top;padding-right: 10px;padding-left: 10px;padding-top: 30px;padding-bottom: 10px;min-width: 100%;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%">
                    <table class="divider_content" align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;border-top: 0px solid transparent;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%">
                        <tbody>
                            <tr style="vertical-align: top">
                                <td style="word-break: break-word;border-collapse: collapse !important;vertical-align: top;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%">
                                    <span></span>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </td>
            </tr>
        </tbody>
    </table>
                      
                  <!--[if (!mso)&(!IE)]><!--></div><!--<![endif]-->
                  </div>
                </div>
              <!--[if (mso)|(IE)]></td></tr></table></td></tr></table><![endif]-->
            </div>
          </div>
        </div>
        <div style="background-color:transparent;">
          <div style="Margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: #525252;" class="block-grid three-up ">
            <div style="border-collapse: collapse;display: table;width: 100%;background-color:#525252;">
              <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="background-color:transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width: 600px;"><tr class="layout-full-width" style="background-color:#525252;"><![endif]-->
    
                  <!--[if (mso)|(IE)]><td align="center" width="200" style=" width:200px; padding-right: 0px; padding-left: 0px; padding-top:0px; padding-bottom:0px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;" valign="top"><![endif]-->
                <div class="col num4" style="max-width: 320px;min-width: 200px;display: table-cell;vertical-align: top;">
                  <div style="background-color: transparent; width: 100% !important;">
                  <!--[if (!mso)&(!IE)]><!--><div style="border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent; padding-top:0px; padding-bottom:0px; padding-right: 0px; padding-left: 0px;"><!--<![endif]-->
    
                      
                        
    <div align="center" style="padding-right: 0px; padding-left: 0px; padding-bottom: 0px;" class="">
      <div style="line-height:15px;font-size:1px">&#160;</div>
      <div style="display: table; max-width:131px;">
      <!--[if (mso)|(IE)]><table width="131" cellpadding="0" cellspacing="0" border="0"><tr><td style="border-collapse:collapse; padding-right: 0px; padding-left: 0px; padding-bottom: 0px;"  align="center"><table width="100%" cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse; mso-table-lspace: 0pt;mso-table-rspace: 0pt; width:131px;"><tr><td width="32" style="width:32px; padding-right: 5px;" valign="top"><![endif]-->
        <table align="left" border="0" cellspacing="0" cellpadding="0" width="32" height="32" style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;Margin-right: 5px">
          <tbody><tr style="vertical-align: top"><td align="left" valign="middle" style="word-break: break-word;border-collapse: collapse !important;vertical-align: top">
            
          <div style="line-height:5px;font-size:1px">&#160;</div>
          </td></tr>
        </tbody></table>
          <!--[if (mso)|(IE)]></td><td width="32" style="width:32px; padding-right: 5px;" valign="top"><![endif]-->
        <table align="left" border="0" cellspacing="0" cellpadding="0" width="32" height="32" style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;Margin-right: 5px">
          <tbody><tr style="vertical-align: top"><td align="left" valign="middle" style="word-break: break-word;border-collapse: collapse !important;vertical-align: top">
            
          <div style="line-height:5px;font-size:1px">&#160;</div>
          </td></tr>
        </tbody></table>
          <!--[if (mso)|(IE)]></td><td width="32" style="width:32px; padding-right: 0;" valign="top"><![endif]-->
        <table align="left" border="0" cellspacing="0" cellpadding="0" width="32" height="32" style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;Margin-right: 0">
          <tbody><tr style="vertical-align: top"><td align="left" valign="middle" style="word-break: break-word;border-collapse: collapse !important;vertical-align: top">
            
          <div style="line-height:5px;font-size:1px">&#160;</div>
          </td></tr>
        </tbody></table>
        <!--[if (mso)|(IE)]></td></tr></table></td></tr></table><![endif]-->
      </div>
    </div>
                      
                  <!--[if (!mso)&(!IE)]><!--></div><!--<![endif]-->
                  </div>
                </div>
                  <!--[if (mso)|(IE)]></td><td align="center" width="200" style=" width:200px; padding-right: 0px; padding-left: 0px; padding-top:5px; padding-bottom:5px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;" valign="top"><![endif]-->
                <div class="col num4" style="max-width: 320px;min-width: 200px;display: table-cell;vertical-align: top;">
                  <div style="background-color: transparent; width: 100% !important;">
                  <!--[if (!mso)&(!IE)]><!--><div style="border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent; padding-top:5px; padding-bottom:5px; padding-right: 0px; padding-left: 0px;"><!--<![endif]-->
    
                      
                        <div class="">
        <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 0px; padding-left: 0px; padding-top: 20px; padding-bottom: 0px;"><![endif]-->
        <div style="color:#a8bf6f;font-family:'Montserrat', 'Trebuchet MS', 'Lucida Grande', 'Lucida Sans Unicode', 'Lucida Sans', Tahoma, sans-serif;line-height:120%; padding-right: 0px; padding-left: 0px; padding-top: 20px; padding-bottom: 0px;">    
            <div style="font-size:12px;line-height:14px;color:#a8bf6f;font-family:'Montserrat', 'Trebuchet MS', 'Lucida Grande', 'Lucida Sans Unicode', 'Lucida Sans', Tahoma, sans-serif;text-align:left;"><p style="margin: 0;font-size: 12px;line-height: 14px;text-align: center"><span style="color: rgb(255, 255, 255); font-size: 12px; line-height: 14px;"><span style="font-size: 12px; line-height: 14px; color: rgb(168, 191, 111);">CAS SHRC | Bridging Talents and Opportunities</div> 
        </div>
        <!--[if mso]></td></tr></table><![endif]-->
    </div>
                      
                  <!--[if (!mso)&(!IE)]><!--></div><!--<![endif]-->
                  </div>
                </div>
                  <!--[if (mso)|(IE)]></td><td align="center" width="200" style=" width:200px; padding-right: 0px; padding-left: 0px; padding-top:5px; padding-bottom:5px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;" valign="top"><![endif]-->
                <div class="col num4" style="max-width: 320px;min-width: 200px;display: table-cell;vertical-align: top;">
                  <div style="background-color: transparent; width: 100% !important;">
                  <!--[if (!mso)&(!IE)]><!--><div style="border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent; padding-top:5px; padding-bottom:5px; padding-right: 0px; padding-left: 0px;"><!--<![endif]-->
    
                      
                        <div class="">
        <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 0px; padding-left: 0px; padding-top: 20px; padding-bottom: 0px;"><![endif]-->
        
        <!--[if mso]></td></tr></table><![endif]-->
    </div>
                      
                  <!--[if (!mso)&(!IE)]><!--></div><!--<![endif]-->
                  </div>
                </div>
              <!--[if (mso)|(IE)]></td></tr></table></td></tr></table><![endif]-->
            </div>
          </div>
        </div>
        <div style="background-color:transparent;">
          <div style="Margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: transparent;" class="block-grid ">
            <div style="border-collapse: collapse;display: table;width: 100%;background-color:transparent;">
              <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="background-color:transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width: 600px;"><tr class="layout-full-width" style="background-color:transparent;"><![endif]-->
    
                  <!--[if (mso)|(IE)]><td align="center" width="600" style=" width:600px; padding-right: 0px; padding-left: 0px; padding-top:0px; padding-bottom:5px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;" valign="top"><![endif]-->
                <div class="col num12" style="min-width: 320px;max-width: 600px;display: table-cell;vertical-align: top;">
                  <div style="background-color: transparent; width: 100% !important;">
                  <!--[if (!mso)&(!IE)]><!--><div style="border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent; padding-top:0px; padding-bottom:5px; padding-right: 0px; padding-left: 0px;"><!--<![endif]-->
    
                      
                        <div align="center" class="img-container center  autowidth  fullwidth " style="padding-right: 0px;  padding-left: 0px;">
    <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr style="line-height:0px;line-height:0px;"><td style="padding-right: 0px; padding-left: 0px;" align="center"><![endif]-->
      <img class="center  autowidth  fullwidth" align="center" border="0" src="https://d1oco4z2z1fhwp.cloudfront.net/templates/default/20/rounder-dwn.png" alt="Image" title="Image" style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: block !important;border: 0;height: auto;float: none;width: 100%;max-width: 600px" width="600">
    <!--[if mso]></td></tr></table><![endif]-->
    </div>
    
                      
                      
                        
    <table border="0" cellpadding="0" cellspacing="0" width="100%" class="divider " style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;min-width: 100%;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%">
        <tbody>
            <tr style="vertical-align: top">
                <td class="divider_inner" style="word-break: break-word;border-collapse: collapse !important;vertical-align: top;padding-right: 30px;padding-left: 30px;padding-top: 30px;padding-bottom: 30px;min-width: 100%;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%">
                    <table class="divider_content" align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;border-top: 0px solid transparent;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%">
                        <tbody>
                            <tr style="vertical-align: top">
                                <td style="word-break: break-word;border-collapse: collapse !important;vertical-align: top;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%">
                                    <span></span>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </td>
            </tr>
        </tbody>
    </table>
                      
                  <!--[if (!mso)&(!IE)]><!--></div><!--<![endif]-->
                  </div>
                </div>
              <!--[if (mso)|(IE)]></td></tr></table></td></tr></table><![endif]-->
            </div>
          </div>
        </div>
       <!--[if (mso)|(IE)]></td></tr></table><![endif]-->
            </td>
      </tr>
      </tbody>
      </table>
      <!--[if (mso)|(IE)]></div><![endif]-->
    
    
    </body></html>`
    
        // sendMail.sendMail(email,html,'Job Interview','Invite to interview')
        sendMail.sendMail(emp_email,html,'CAS SHRC: Interview Invitation Accepted')
        setting.save_notification(student_id,emp_id,vacancy_id,"Interview invitation accepted","2")
        setting.status_history(student_id,vacancy_id,"2")

    }

    else if(status==="3") //interview invitation rejected  Student
    {

        html=`<!DOCTYPE HTML PUBLIC "-//W3C//DTD XHTML 1.0 Transitional //EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd"><html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office"><head>
        <!--[if gte mso 9]><xml>
         <o:OfficeDocumentSettings>
          <o:AllowPNG/>
          <o:PixelsPerInch>96</o:PixelsPerInch>
         </o:OfficeDocumentSettings>
        </xml><![endif]-->
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
        <meta name="viewport" content="width=device-width">
        <!--[if !mso]><!--><meta http-equiv="X-UA-Compatible" content="IE=edge"><!--<![endif]-->
        <title></title>
        <!--[if !mso]><!-- -->
        <link href="https://fonts.googleapis.com/css?family=Montserrat" rel="stylesheet" type="text/css">
        <!--<![endif]-->
        
        <style type="text/css" id="media-query">
          body {
      margin: 0;
      padding: 0; }
    
    table, tr, td {
      vertical-align: top;
      border-collapse: collapse; }
    
    .ie-browser table, .mso-container table {
      table-layout: fixed; }
    
    * {
      line-height: inherit; }
    
    a[x-apple-data-detectors=true] {
      color: inherit !important;
      text-decoration: none !important; }
    
    [owa] .img-container div, [owa] .img-container button {
      display: block !important; }
    
    [owa] .fullwidth button {
      width: 100% !important; }
    
    [owa] .block-grid .col {
      display: table-cell;
      float: none !important;
      vertical-align: top; }
    
    .ie-browser .num12, .ie-browser .block-grid, [owa] .num12, [owa] .block-grid {
      width: 600px !important; }
    
    .ExternalClass, .ExternalClass p, .ExternalClass span, .ExternalClass font, .ExternalClass td, .ExternalClass div {
      line-height: 100%; }
    
    .ie-browser .mixed-two-up .num4, [owa] .mixed-two-up .num4 {
      width: 200px !important; }
    
    .ie-browser .mixed-two-up .num8, [owa] .mixed-two-up .num8 {
      width: 400px !important; }
    
    .ie-browser .block-grid.two-up .col, [owa] .block-grid.two-up .col {
      width: 300px !important; }
    
    .ie-browser .block-grid.three-up .col, [owa] .block-grid.three-up .col {
      width: 200px !important; }
    
    .ie-browser .block-grid.four-up .col, [owa] .block-grid.four-up .col {
      width: 150px !important; }
    
    .ie-browser .block-grid.five-up .col, [owa] .block-grid.five-up .col {
      width: 120px !important; }
    
    .ie-browser .block-grid.six-up .col, [owa] .block-grid.six-up .col {
      width: 100px !important; }
    
    .ie-browser .block-grid.seven-up .col, [owa] .block-grid.seven-up .col {
      width: 85px !important; }
    
    .ie-browser .block-grid.eight-up .col, [owa] .block-grid.eight-up .col {
      width: 75px !important; }
    
    .ie-browser .block-grid.nine-up .col, [owa] .block-grid.nine-up .col {
      width: 66px !important; }
    
    .ie-browser .block-grid.ten-up .col, [owa] .block-grid.ten-up .col {
      width: 60px !important; }
    
    .ie-browser .block-grid.eleven-up .col, [owa] .block-grid.eleven-up .col {
      width: 54px !important; }
    
    .ie-browser .block-grid.twelve-up .col, [owa] .block-grid.twelve-up .col {
      width: 50px !important; }
    
    @media only screen and (min-width: 620px) {
      .block-grid {
        width: 600px !important; }
      .block-grid .col {
        vertical-align: top; }
        .block-grid .col.num12 {
          width: 600px !important; }
      .block-grid.mixed-two-up .col.num4 {
        width: 200px !important; }
      .block-grid.mixed-two-up .col.num8 {
        width: 400px !important; }
      .block-grid.two-up .col {
        width: 300px !important; }
      .block-grid.three-up .col {
        width: 200px !important; }
      .block-grid.four-up .col {
        width: 150px !important; }
      .block-grid.five-up .col {
        width: 120px !important; }
      .block-grid.six-up .col {
        width: 100px !important; }
      .block-grid.seven-up .col {
        width: 85px !important; }
      .block-grid.eight-up .col {
        width: 75px !important; }
      .block-grid.nine-up .col {
        width: 66px !important; }
      .block-grid.ten-up .col {
        width: 60px !important; }
      .block-grid.eleven-up .col {
        width: 54px !important; }
      .block-grid.twelve-up .col {
        width: 50px !important; } }
    
    @media (max-width: 620px) {
      .block-grid, .col {
        min-width: 320px !important;
        max-width: 100% !important;
        display: block !important; }
      .block-grid {
        width: calc(100% - 40px) !important; }
      .col {
        width: 100% !important; }
        .col > div {
          margin: 0 auto; }
      img.fullwidth, img.fullwidthOnMobile {
        max-width: 100% !important; }
      .no-stack .col {
        min-width: 0 !important;
        display: table-cell !important; }
      .no-stack.two-up .col {
        width: 50% !important; }
      .no-stack.mixed-two-up .col.num4 {
        width: 33% !important; }
      .no-stack.mixed-two-up .col.num8 {
        width: 66% !important; }
      .no-stack.three-up .col.num4 {
        width: 33% !important; }
      .no-stack.four-up .col.num3 {
        width: 25% !important; }
      .mobile_hide {
        min-height: 0px;
        max-height: 0px;
        max-width: 0px;
        display: none;
        overflow: hidden;
        font-size: 0px; } }
    
        </style>
    </head>
    <body class="clean-body" style="margin: 0;padding: 0;-webkit-text-size-adjust: 100%;background-color: #e2eace">
      <style type="text/css" id="media-query-bodytag">
        @media (max-width: 520px) {
          .block-grid {
            min-width: 320px!important;
            max-width: 100%!important;
            width: 100%!important;
            display: block!important;
          }
    
          .col {
            min-width: 320px!important;
            max-width: 100%!important;
            width: 100%!important;
            display: block!important;
          }
    
            .col > div {
              margin: 0 auto;
            }
    
          img.fullwidth {
            max-width: 100%!important;
          }
                img.fullwidthOnMobile {
            max-width: 100%!important;
          }
          .no-stack .col {
                    min-width: 0!important;
                    display: table-cell!important;
                }
                .no-stack.two-up .col {
                    width: 50%!important;
                }
                .no-stack.mixed-two-up .col.num4 {
                    width: 33%!important;
                }
                .no-stack.mixed-two-up .col.num8 {
                    width: 66%!important;
                }
                .no-stack.three-up .col.num4 {
                    width: 33%!important;
                }
                .no-stack.four-up .col.num3 {
                    width: 25%!important;
                }
          .mobile_hide {
            min-height: 0px!important;
            max-height: 0px!important;
            max-width: 0px!important;
            display: none!important;
            overflow: hidden!important;
            font-size: 0px!important;
          }
        }
      </style>
      <!--[if IE]><div class="ie-browser"><![endif]-->
      <!--[if mso]><div class="mso-container"><![endif]-->
      <table class="nl-container" style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;min-width: 320px;Margin: 0 auto;background-color: #e2eace;width: 100%" cellpadding="0" cellspacing="0">
        <tbody>
        <tr style="vertical-align: top">
            <td style="word-break: break-word;border-collapse: collapse !important;vertical-align: top">
        <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td align="center" style="background-color: #e2eace;"><![endif]-->
    
        <div style="background-color:transparent;">
          <div style="Margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: transparent;" class="block-grid ">
            <div style="border-collapse: collapse;display: table;width: 100%;background-color:transparent;">
              <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="background-color:transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width: 600px;"><tr class="layout-full-width" style="background-color:transparent;"><![endif]-->
    
                  <!--[if (mso)|(IE)]><td align="center" width="600" style=" width:600px; padding-right: 0px; padding-left: 0px; padding-top:5px; padding-bottom:0px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;" valign="top"><![endif]-->
                <div class="col num12" style="min-width: 320px;max-width: 600px;display: table-cell;vertical-align: top;">
                  <div style="background-color: transparent; width: 100% !important;">
                  <!--[if (!mso)&(!IE)]><!--><div style="border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent; padding-top:5px; padding-bottom:0px; padding-right: 0px; padding-left: 0px;"><!--<![endif]-->
    
                      
                        <div align="center" class="img-container center  autowidth  fullwidth " style="padding-right: 0px;  padding-left: 0px;">
    <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr style="line-height:0px;line-height:0px;"><td style="padding-right: 0px; padding-left: 0px;" align="center"><![endif]-->
    <div style="line-height:25px;font-size:1px">&#160;</div>  <img class="center  autowidth  fullwidth" align="center" border="0" src="https://d1oco4z2z1fhwp.cloudfront.net/templates/default/20/rounder-up.png" alt="Image" title="Image" style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: block !important;border: 0;height: auto;float: none;width: 100%;max-width: 600px" width="600">
    <!--[if mso]></td></tr></table><![endif]-->
    </div>
    
                      
                  <!--[if (!mso)&(!IE)]><!--></div><!--<![endif]-->
                  </div>
                </div>
              <!--[if (mso)|(IE)]></td></tr></table></td></tr></table><![endif]-->
            </div>
          </div>
        </div>
        <div style="background-color:transparent;">
          <div style="Margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: #FFFFFF;" class="block-grid ">
            <div style="border-collapse: collapse;display: table;width: 100%;background-color:#FFFFFF;">
              <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="background-color:transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width: 600px;"><tr class="layout-full-width" style="background-color:#FFFFFF;"><![endif]-->
    
                  <!--[if (mso)|(IE)]><td align="center" width="600" style=" width:600px; padding-right: 0px; padding-left: 0px; padding-top:5px; padding-bottom:5px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;" valign="top"><![endif]-->
                <div class="col num12" style="min-width: 320px;max-width: 600px;display: table-cell;vertical-align: top;">
                  <div style="background-color: transparent; width: 100% !important;">
                  <!--[if (!mso)&(!IE)]><!--><div style="border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent; padding-top:5px; padding-bottom:5px; padding-right: 0px; padding-left: 0px;"><!--<![endif]-->
    
                      
                        <div align="center" class="img-container center  autowidth  " style="padding-right: 0px;  padding-left: 0px;">
    <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr style="line-height:0px;line-height:0px;"><td style="padding-right: 0px; padding-left: 0px;" align="center"><![endif]-->
      <img class="center  autowidth " align="center" border="0" src="https://i.imgur.com/FrVRrnL.png" alt="Image" title="Image" style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: block !important;border: 0;height: auto;float: none;width: 100%;max-width: 250px" width="250">
    <!--[if mso]></td></tr></table><![endif]-->
    </div>
    
                      
                      
                        <div class="">
        <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 10px; padding-left: 10px; padding-top: 10px; padding-bottom: 10px;"><![endif]-->
        <div style="color:#555555;font-family:'Montserrat', 'Trebuchet MS', 'Lucida Grande', 'Lucida Sans Unicode', 'Lucida Sans', Tahoma, sans-serif;line-height:150%; padding-right: 10px; padding-left: 10px; padding-top: 10px; padding-bottom: 10px;"> 
            <div style="font-size:12px;line-height:18px;color:#555555;font-family:'Montserrat', 'Trebuchet MS', 'Lucida Grande', 'Lucida Sans Unicode', 'Lucida Sans', Tahoma, sans-serif;text-align:left;"><p style="margin: 0;font-size: 14px;line-height: 21px;text-align: center"></p></div>    
        </div>
        <!--[if mso]></td></tr></table><![endif]-->
    </div>
                      
                  <!--[if (!mso)&(!IE)]><!--></div><!--<![endif]-->
                  </div>
                </div>
              <!--[if (mso)|(IE)]></td></tr></table></td></tr></table><![endif]-->
            </div>
          </div>
        </div>
        <div style="background-color:transparent;">
          <div style="Margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: #FFFFFF;" class="block-grid ">
            <div style="border-collapse: collapse;display: table;width: 100%;background-color:#FFFFFF;">
              <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="background-color:transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width: 600px;"><tr class="layout-full-width" style="background-color:#FFFFFF;"><![endif]-->
    
                  <!--[if (mso)|(IE)]><td align="center" width="600" style=" width:600px; padding-right: 0px; padding-left: 0px; padding-top:0px; padding-bottom:5px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;" valign="top"><![endif]-->
                <div class="col num12" style="min-width: 320px;max-width: 600px;display: table-cell;vertical-align: top;">
                  <div style="background-color: transparent; width: 100% !important;">
                  <!--[if (!mso)&(!IE)]><!--><div style="border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent; padding-top:0px; padding-bottom:5px; padding-right: 0px; padding-left: 0px;"><!--<![endif]-->
    
                      
                        <div class="">
        <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 10px; padding-left: 10px; padding-top: 10px; padding-bottom: 10px;"><![endif]-->
        <div style="color:#0D0D0D;font-family:'Montserrat', 'Trebuchet MS', 'Lucida Grande', 'Lucida Sans Unicode', 'Lucida Sans', Tahoma, sans-serif;line-height:120%; padding-right: 10px; padding-left: 10px; padding-top: 10px; padding-bottom: 10px;"> 
            <div style="font-size:12px;line-height:14px;color:#0D0D0D;font-family:'Montserrat', 'Trebuchet MS', 'Lucida Grande', 'Lucida Sans Unicode', 'Lucida Sans', Tahoma, sans-serif;text-align:left;">
          <p style="margin: 0;font-size: 14px;line-height: 17px;text-align: center">
           <strong> 
          <span style="font-size: 28px; line-height: 33px;">
          Dear ` + emp_name + `,
        </span> </strong> <br><br>
    
               <div style="text-align: left;">  <span style="line-height: 33px; font-size: 20px;">
                
          </span></div>
      </p></div>    
        </div>
        <!--[if mso]></td></tr></table><![endif]-->
    </div>
                      
                      
                        <div align="center" class="img-container center  autowidth  " style="padding-right: 0px;  padding-left: 0px;">
    <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr style="line-height:0px;line-height:0px;"><td style="padding-right: 0px; padding-left: 0px;" align="center"><![endif]-->
      <img class="center  autowidth " align="center" border="0" src="https://d1oco4z2z1fhwp.cloudfront.net/templates/default/20/divider.png" alt="Image" title="Image" style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: block !important;border: 0;height: auto;float: none;width: 100%;max-width: 316px" width="316">
    <!--[if mso]></td></tr></table><![endif]-->
    </div>
    
                      
                      
                        <div class="">
        <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 10px; padding-left: 10px; padding-top: 10px; padding-bottom: 10px;"><![endif]-->
        <div style="color:#555555;font-family:'Montserrat', 'Trebuchet MS', 'Lucida Grande', 'Lucida Sans Unicode', 'Lucida Sans', Tahoma, sans-serif;line-height:150%; padding-right: 10px; padding-left: 10px; padding-top: 10px; padding-bottom: 10px;"> 
            
        </div>
        <!--[if mso]></td></tr></table><![endif]-->
    </div>
                      
                      
                        <div class="">
        <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 10px; padding-left: 10px; padding-top: 20px; padding-bottom: 10px;"><![endif]-->
        <div style="color:#0D0D0D;font-family:'Montserrat', 'Trebuchet MS', 'Lucida Grande', 'Lucida Sans Unicode', 'Lucida Sans', Tahoma, sans-serif;line-height:150%; padding-right: 10px; padding-left: 10px; padding-top: 20px; padding-bottom: 10px;"> 
            <div style="font-size:12px;line-height:18px;color:#0D0D0D;font-family:'Montserrat', 'Trebuchet MS', 'Lucida Grande', 'Lucida Sans Unicode', 'Lucida Sans', Tahoma, sans-serif;text-align:left;"><p style="margin: 0;font-size: 14px;line-height: 21px;text-align: center">Your interview invitation for the position of ` + job_title + ` has been rejected by `+ name +`. You can try more potential candidates through the application.
    
    
            </p></div>  
        </div>
        <!--[if mso]></td></tr></table><![endif]-->
    </div>
                      
                      
                        
    <div align="center" class="button-container center " style="padding-right: 10px; padding-left: 10px; padding-top:25px; padding-bottom:10px;">
      <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0" style="border-spacing: 0; border-collapse: collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;"><tr><td style="padding-right: 10px; padding-left: 10px; padding-top:25px; padding-bottom:10px;" align="center"><v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="" style="height:46pt; v-text-anchor:middle; width:151pt;" arcsize="7%" strokecolor="#a8bf6f" fillcolor="#a8bf6f"><w:anchorlock/><v:textbox inset="0,0,0,0"><center style="color:#ffffff; font-family:'Montserrat', 'Trebuchet MS', 'Lucida Grande', 'Lucida Sans Unicode', 'Lucida Sans', Tahoma, sans-serif; font-size:16px;"><![endif]-->
        <div style="color: #ffffff; background-color: #a8bf6f; border-radius: 4px; -webkit-border-radius: 4px; -moz-border-radius: 4px; max-width: 202px; width: 172px;width: auto; border-top: 0px solid transparent; border-right: 0px solid transparent; border-bottom: 0px solid transparent; border-left: 0px solid transparent; padding-top: 15px; padding-right: 15px; padding-bottom: 15px; padding-left: 15px; font-family: 'Montserrat', 'Trebuchet MS', 'Lucida Grande', 'Lucida Sans Unicode', 'Lucida Sans', Tahoma, sans-serif; text-align: center; mso-border-alt: none;">
          <span style="font-size:16px;line-height:32px;"><a href="`+ variables.WEB_LINK_EMPLOYER +`" style="text-decoration : none; color : #fff;"><strong>GoTo Application</strong></a></span>
        </div>
      <!--[if mso]></center></v:textbox></v:roundrect></td></tr></table><![endif]-->
    </div>
    
                      
                      
                        
    <table border="0" cellpadding="0" cellspacing="0" width="100%" class="divider " style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;min-width: 100%;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%">
        <tbody>
            <tr style="vertical-align: top">
                <td class="divider_inner" style="word-break: break-word;border-collapse: collapse !important;vertical-align: top;padding-right: 10px;padding-left: 10px;padding-top: 30px;padding-bottom: 10px;min-width: 100%;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%">
                    <table class="divider_content" align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;border-top: 0px solid transparent;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%">
                        <tbody>
                            <tr style="vertical-align: top">
                                <td style="word-break: break-word;border-collapse: collapse !important;vertical-align: top;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%">
                                    <span></span>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </td>
            </tr>
        </tbody>
    </table>
                      
                  <!--[if (!mso)&(!IE)]><!--></div><!--<![endif]-->
                  </div>
                </div>
              <!--[if (mso)|(IE)]></td></tr></table></td></tr></table><![endif]-->
            </div>
          </div>
        </div>
        <div style="background-color:transparent;">
          <div style="Margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: #525252;" class="block-grid three-up ">
            <div style="border-collapse: collapse;display: table;width: 100%;background-color:#525252;">
              <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="background-color:transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width: 600px;"><tr class="layout-full-width" style="background-color:#525252;"><![endif]-->
    
                  <!--[if (mso)|(IE)]><td align="center" width="200" style=" width:200px; padding-right: 0px; padding-left: 0px; padding-top:0px; padding-bottom:0px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;" valign="top"><![endif]-->
                <div class="col num4" style="max-width: 320px;min-width: 200px;display: table-cell;vertical-align: top;">
                  <div style="background-color: transparent; width: 100% !important;">
                  <!--[if (!mso)&(!IE)]><!--><div style="border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent; padding-top:0px; padding-bottom:0px; padding-right: 0px; padding-left: 0px;"><!--<![endif]-->
    
                      
                        
    <div align="center" style="padding-right: 0px; padding-left: 0px; padding-bottom: 0px;" class="">
      <div style="line-height:15px;font-size:1px">&#160;</div>
      <div style="display: table; max-width:131px;">
      <!--[if (mso)|(IE)]><table width="131" cellpadding="0" cellspacing="0" border="0"><tr><td style="border-collapse:collapse; padding-right: 0px; padding-left: 0px; padding-bottom: 0px;"  align="center"><table width="100%" cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse; mso-table-lspace: 0pt;mso-table-rspace: 0pt; width:131px;"><tr><td width="32" style="width:32px; padding-right: 5px;" valign="top"><![endif]-->
        <table align="left" border="0" cellspacing="0" cellpadding="0" width="32" height="32" style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;Margin-right: 5px">
          <tbody><tr style="vertical-align: top"><td align="left" valign="middle" style="word-break: break-word;border-collapse: collapse !important;vertical-align: top">
            
          <div style="line-height:5px;font-size:1px">&#160;</div>
          </td></tr>
        </tbody></table>
          <!--[if (mso)|(IE)]></td><td width="32" style="width:32px; padding-right: 5px;" valign="top"><![endif]-->
        <table align="left" border="0" cellspacing="0" cellpadding="0" width="32" height="32" style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;Margin-right: 5px">
          <tbody><tr style="vertical-align: top"><td align="left" valign="middle" style="word-break: break-word;border-collapse: collapse !important;vertical-align: top">
            
          <div style="line-height:5px;font-size:1px">&#160;</div>
          </td></tr>
        </tbody></table>
          <!--[if (mso)|(IE)]></td><td width="32" style="width:32px; padding-right: 0;" valign="top"><![endif]-->
        <table align="left" border="0" cellspacing="0" cellpadding="0" width="32" height="32" style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;Margin-right: 0">
          <tbody><tr style="vertical-align: top"><td align="left" valign="middle" style="word-break: break-word;border-collapse: collapse !important;vertical-align: top">
            
          <div style="line-height:5px;font-size:1px">&#160;</div>
          </td></tr>
        </tbody></table>
        <!--[if (mso)|(IE)]></td></tr></table></td></tr></table><![endif]-->
      </div>
    </div>
                      
                  <!--[if (!mso)&(!IE)]><!--></div><!--<![endif]-->
                  </div>
                </div>
                  <!--[if (mso)|(IE)]></td><td align="center" width="200" style=" width:200px; padding-right: 0px; padding-left: 0px; padding-top:5px; padding-bottom:5px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;" valign="top"><![endif]-->
                <div class="col num4" style="max-width: 320px;min-width: 200px;display: table-cell;vertical-align: top;">
                  <div style="background-color: transparent; width: 100% !important;">
                  <!--[if (!mso)&(!IE)]><!--><div style="border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent; padding-top:5px; padding-bottom:5px; padding-right: 0px; padding-left: 0px;"><!--<![endif]-->
    
                      
                        <div class="">
        <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 0px; padding-left: 0px; padding-top: 20px; padding-bottom: 0px;"><![endif]-->
        <div style="color:#a8bf6f;font-family:'Montserrat', 'Trebuchet MS', 'Lucida Grande', 'Lucida Sans Unicode', 'Lucida Sans', Tahoma, sans-serif;line-height:120%; padding-right: 0px; padding-left: 0px; padding-top: 20px; padding-bottom: 0px;">    
            <div style="font-size:12px;line-height:14px;color:#a8bf6f;font-family:'Montserrat', 'Trebuchet MS', 'Lucida Grande', 'Lucida Sans Unicode', 'Lucida Sans', Tahoma, sans-serif;text-align:left;"><p style="margin: 0;font-size: 12px;line-height: 14px;text-align: center"><span style="color: rgb(255, 255, 255); font-size: 12px; line-height: 14px;"><span style="font-size: 12px; line-height: 14px; color: rgb(168, 191, 111);">CAS SHRC | Bridging Talents and Opportunities</div> 
        </div>
        <!--[if mso]></td></tr></table><![endif]-->
    </div>
                      
                  <!--[if (!mso)&(!IE)]><!--></div><!--<![endif]-->
                  </div>
                </div>
                  <!--[if (mso)|(IE)]></td><td align="center" width="200" style=" width:200px; padding-right: 0px; padding-left: 0px; padding-top:5px; padding-bottom:5px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;" valign="top"><![endif]-->
                <div class="col num4" style="max-width: 320px;min-width: 200px;display: table-cell;vertical-align: top;">
                  <div style="background-color: transparent; width: 100% !important;">
                  <!--[if (!mso)&(!IE)]><!--><div style="border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent; padding-top:5px; padding-bottom:5px; padding-right: 0px; padding-left: 0px;"><!--<![endif]-->
    
                      
                        <div class="">
        <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 0px; padding-left: 0px; padding-top: 20px; padding-bottom: 0px;"><![endif]-->
        
        <!--[if mso]></td></tr></table><![endif]-->
    </div>
                      
                  <!--[if (!mso)&(!IE)]><!--></div><!--<![endif]-->
                  </div>
                </div>
              <!--[if (mso)|(IE)]></td></tr></table></td></tr></table><![endif]-->
            </div>
          </div>
        </div>
        <div style="background-color:transparent;">
          <div style="Margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: transparent;" class="block-grid ">
            <div style="border-collapse: collapse;display: table;width: 100%;background-color:transparent;">
              <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="background-color:transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width: 600px;"><tr class="layout-full-width" style="background-color:transparent;"><![endif]-->
    
                  <!--[if (mso)|(IE)]><td align="center" width="600" style=" width:600px; padding-right: 0px; padding-left: 0px; padding-top:0px; padding-bottom:5px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;" valign="top"><![endif]-->
                <div class="col num12" style="min-width: 320px;max-width: 600px;display: table-cell;vertical-align: top;">
                  <div style="background-color: transparent; width: 100% !important;">
                  <!--[if (!mso)&(!IE)]><!--><div style="border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent; padding-top:0px; padding-bottom:5px; padding-right: 0px; padding-left: 0px;"><!--<![endif]-->
    
                      
                        <div align="center" class="img-container center  autowidth  fullwidth " style="padding-right: 0px;  padding-left: 0px;">
    <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr style="line-height:0px;line-height:0px;"><td style="padding-right: 0px; padding-left: 0px;" align="center"><![endif]-->
      <img class="center  autowidth  fullwidth" align="center" border="0" src="https://d1oco4z2z1fhwp.cloudfront.net/templates/default/20/rounder-dwn.png" alt="Image" title="Image" style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: block !important;border: 0;height: auto;float: none;width: 100%;max-width: 600px" width="600">
    <!--[if mso]></td></tr></table><![endif]-->
    </div>
    
                      
                      
                        
    <table border="0" cellpadding="0" cellspacing="0" width="100%" class="divider " style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;min-width: 100%;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%">
        <tbody>
            <tr style="vertical-align: top">
                <td class="divider_inner" style="word-break: break-word;border-collapse: collapse !important;vertical-align: top;padding-right: 30px;padding-left: 30px;padding-top: 30px;padding-bottom: 30px;min-width: 100%;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%">
                    <table class="divider_content" align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;border-top: 0px solid transparent;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%">
                        <tbody>
                            <tr style="vertical-align: top">
                                <td style="word-break: break-word;border-collapse: collapse !important;vertical-align: top;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%">
                                    <span></span>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </td>
            </tr>
        </tbody>
    </table>
                      
                  <!--[if (!mso)&(!IE)]><!--></div><!--<![endif]-->
                  </div>
                </div>
              <!--[if (mso)|(IE)]></td></tr></table></td></tr></table><![endif]-->
            </div>
          </div>
        </div>
       <!--[if (mso)|(IE)]></td></tr></table><![endif]-->
            </td>
      </tr>
      </tbody>
      </table>
      <!--[if (mso)|(IE)]></div><![endif]-->
    
    
    </body></html>`
    
        // sendMail.sendMail(email,html,'Job Interview','Invite to interview')
        sendMail.sendMail(emp_email,html,'CAS SHRC: Interview Invitation Rejected')
        setting.save_notification(student_id,emp_id,vacancy_id,"Interview invitation Rejected","3")
        setting.status_history(student_id,vacancy_id,"3")

    }

    else if(status==="4") //interview rejected  EMployer
    {

        html=`<!DOCTYPE HTML PUBLIC "-//W3C//DTD XHTML 1.0 Transitional //EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd"><html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office"><head>
        <!--[if gte mso 9]><xml>
         <o:OfficeDocumentSettings>
          <o:AllowPNG/>
          <o:PixelsPerInch>96</o:PixelsPerInch>
         </o:OfficeDocumentSettings>
        </xml><![endif]-->
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
        <meta name="viewport" content="width=device-width">
        <!--[if !mso]><!--><meta http-equiv="X-UA-Compatible" content="IE=edge"><!--<![endif]-->
        <title></title>
        <!--[if !mso]><!-- -->
        <link href="https://fonts.googleapis.com/css?family=Montserrat" rel="stylesheet" type="text/css">
        <!--<![endif]-->
        
        <style type="text/css" id="media-query">
          body {
      margin: 0;
      padding: 0; }
    
    table, tr, td {
      vertical-align: top;
      border-collapse: collapse; }
    
    .ie-browser table, .mso-container table {
      table-layout: fixed; }
    
    * {
      line-height: inherit; }
    
    a[x-apple-data-detectors=true] {
      color: inherit !important;
      text-decoration: none !important; }
    
    [owa] .img-container div, [owa] .img-container button {
      display: block !important; }
    
    [owa] .fullwidth button {
      width: 100% !important; }
    
    [owa] .block-grid .col {
      display: table-cell;
      float: none !important;
      vertical-align: top; }
    
    .ie-browser .num12, .ie-browser .block-grid, [owa] .num12, [owa] .block-grid {
      width: 600px !important; }
    
    .ExternalClass, .ExternalClass p, .ExternalClass span, .ExternalClass font, .ExternalClass td, .ExternalClass div {
      line-height: 100%; }
    
    .ie-browser .mixed-two-up .num4, [owa] .mixed-two-up .num4 {
      width: 200px !important; }
    
    .ie-browser .mixed-two-up .num8, [owa] .mixed-two-up .num8 {
      width: 400px !important; }
    
    .ie-browser .block-grid.two-up .col, [owa] .block-grid.two-up .col {
      width: 300px !important; }
    
    .ie-browser .block-grid.three-up .col, [owa] .block-grid.three-up .col {
      width: 200px !important; }
    
    .ie-browser .block-grid.four-up .col, [owa] .block-grid.four-up .col {
      width: 150px !important; }
    
    .ie-browser .block-grid.five-up .col, [owa] .block-grid.five-up .col {
      width: 120px !important; }
    
    .ie-browser .block-grid.six-up .col, [owa] .block-grid.six-up .col {
      width: 100px !important; }
    
    .ie-browser .block-grid.seven-up .col, [owa] .block-grid.seven-up .col {
      width: 85px !important; }
    
    .ie-browser .block-grid.eight-up .col, [owa] .block-grid.eight-up .col {
      width: 75px !important; }
    
    .ie-browser .block-grid.nine-up .col, [owa] .block-grid.nine-up .col {
      width: 66px !important; }
    
    .ie-browser .block-grid.ten-up .col, [owa] .block-grid.ten-up .col {
      width: 60px !important; }
    
    .ie-browser .block-grid.eleven-up .col, [owa] .block-grid.eleven-up .col {
      width: 54px !important; }
    
    .ie-browser .block-grid.twelve-up .col, [owa] .block-grid.twelve-up .col {
      width: 50px !important; }
    
    @media only screen and (min-width: 620px) {
      .block-grid {
        width: 600px !important; }
      .block-grid .col {
        vertical-align: top; }
        .block-grid .col.num12 {
          width: 600px !important; }
      .block-grid.mixed-two-up .col.num4 {
        width: 200px !important; }
      .block-grid.mixed-two-up .col.num8 {
        width: 400px !important; }
      .block-grid.two-up .col {
        width: 300px !important; }
      .block-grid.three-up .col {
        width: 200px !important; }
      .block-grid.four-up .col {
        width: 150px !important; }
      .block-grid.five-up .col {
        width: 120px !important; }
      .block-grid.six-up .col {
        width: 100px !important; }
      .block-grid.seven-up .col {
        width: 85px !important; }
      .block-grid.eight-up .col {
        width: 75px !important; }
      .block-grid.nine-up .col {
        width: 66px !important; }
      .block-grid.ten-up .col {
        width: 60px !important; }
      .block-grid.eleven-up .col {
        width: 54px !important; }
      .block-grid.twelve-up .col {
        width: 50px !important; } }
    
    @media (max-width: 620px) {
      .block-grid, .col {
        min-width: 320px !important;
        max-width: 100% !important;
        display: block !important; }
      .block-grid {
        width: calc(100% - 40px) !important; }
      .col {
        width: 100% !important; }
        .col > div {
          margin: 0 auto; }
      img.fullwidth, img.fullwidthOnMobile {
        max-width: 100% !important; }
      .no-stack .col {
        min-width: 0 !important;
        display: table-cell !important; }
      .no-stack.two-up .col {
        width: 50% !important; }
      .no-stack.mixed-two-up .col.num4 {
        width: 33% !important; }
      .no-stack.mixed-two-up .col.num8 {
        width: 66% !important; }
      .no-stack.three-up .col.num4 {
        width: 33% !important; }
      .no-stack.four-up .col.num3 {
        width: 25% !important; }
      .mobile_hide {
        min-height: 0px;
        max-height: 0px;
        max-width: 0px;
        display: none;
        overflow: hidden;
        font-size: 0px; } }
    
        </style>
    </head>
    <body class="clean-body" style="margin: 0;padding: 0;-webkit-text-size-adjust: 100%;background-color: #e2eace">
      <style type="text/css" id="media-query-bodytag">
        @media (max-width: 520px) {
          .block-grid {
            min-width: 320px!important;
            max-width: 100%!important;
            width: 100%!important;
            display: block!important;
          }
    
          .col {
            min-width: 320px!important;
            max-width: 100%!important;
            width: 100%!important;
            display: block!important;
          }
    
            .col > div {
              margin: 0 auto;
            }
    
          img.fullwidth {
            max-width: 100%!important;
          }
                img.fullwidthOnMobile {
            max-width: 100%!important;
          }
          .no-stack .col {
                    min-width: 0!important;
                    display: table-cell!important;
                }
                .no-stack.two-up .col {
                    width: 50%!important;
                }
                .no-stack.mixed-two-up .col.num4 {
                    width: 33%!important;
                }
                .no-stack.mixed-two-up .col.num8 {
                    width: 66%!important;
                }
                .no-stack.three-up .col.num4 {
                    width: 33%!important;
                }
                .no-stack.four-up .col.num3 {
                    width: 25%!important;
                }
          .mobile_hide {
            min-height: 0px!important;
            max-height: 0px!important;
            max-width: 0px!important;
            display: none!important;
            overflow: hidden!important;
            font-size: 0px!important;
          }
        }
      </style>
      <!--[if IE]><div class="ie-browser"><![endif]-->
      <!--[if mso]><div class="mso-container"><![endif]-->
      <table class="nl-container" style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;min-width: 320px;Margin: 0 auto;background-color: #e2eace;width: 100%" cellpadding="0" cellspacing="0">
        <tbody>
        <tr style="vertical-align: top">
            <td style="word-break: break-word;border-collapse: collapse !important;vertical-align: top">
        <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td align="center" style="background-color: #e2eace;"><![endif]-->
    
        <div style="background-color:transparent;">
          <div style="Margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: transparent;" class="block-grid ">
            <div style="border-collapse: collapse;display: table;width: 100%;background-color:transparent;">
              <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="background-color:transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width: 600px;"><tr class="layout-full-width" style="background-color:transparent;"><![endif]-->
    
                  <!--[if (mso)|(IE)]><td align="center" width="600" style=" width:600px; padding-right: 0px; padding-left: 0px; padding-top:5px; padding-bottom:0px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;" valign="top"><![endif]-->
                <div class="col num12" style="min-width: 320px;max-width: 600px;display: table-cell;vertical-align: top;">
                  <div style="background-color: transparent; width: 100% !important;">
                  <!--[if (!mso)&(!IE)]><!--><div style="border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent; padding-top:5px; padding-bottom:0px; padding-right: 0px; padding-left: 0px;"><!--<![endif]-->
    
                      
                        <div align="center" class="img-container center  autowidth  fullwidth " style="padding-right: 0px;  padding-left: 0px;">
    <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr style="line-height:0px;line-height:0px;"><td style="padding-right: 0px; padding-left: 0px;" align="center"><![endif]-->
    <div style="line-height:25px;font-size:1px">&#160;</div>  <img class="center  autowidth  fullwidth" align="center" border="0" src="https://d1oco4z2z1fhwp.cloudfront.net/templates/default/20/rounder-up.png" alt="Image" title="Image" style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: block !important;border: 0;height: auto;float: none;width: 100%;max-width: 600px" width="600">
    <!--[if mso]></td></tr></table><![endif]-->
    </div>
    
                      
                  <!--[if (!mso)&(!IE)]><!--></div><!--<![endif]-->
                  </div>
                </div>
              <!--[if (mso)|(IE)]></td></tr></table></td></tr></table><![endif]-->
            </div>
          </div>
        </div>
        <div style="background-color:transparent;">
          <div style="Margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: #FFFFFF;" class="block-grid ">
            <div style="border-collapse: collapse;display: table;width: 100%;background-color:#FFFFFF;">
              <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="background-color:transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width: 600px;"><tr class="layout-full-width" style="background-color:#FFFFFF;"><![endif]-->
    
                  <!--[if (mso)|(IE)]><td align="center" width="600" style=" width:600px; padding-right: 0px; padding-left: 0px; padding-top:5px; padding-bottom:5px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;" valign="top"><![endif]-->
                <div class="col num12" style="min-width: 320px;max-width: 600px;display: table-cell;vertical-align: top;">
                  <div style="background-color: transparent; width: 100% !important;">
                  <!--[if (!mso)&(!IE)]><!--><div style="border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent; padding-top:5px; padding-bottom:5px; padding-right: 0px; padding-left: 0px;"><!--<![endif]-->
    
                      
                        <div align="center" class="img-container center  autowidth  " style="padding-right: 0px;  padding-left: 0px;">
    <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr style="line-height:0px;line-height:0px;"><td style="padding-right: 0px; padding-left: 0px;" align="center"><![endif]-->
      <img class="center  autowidth " align="center" border="0" src="https://i.imgur.com/FrVRrnL.png" alt="Image" title="Image" style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: block !important;border: 0;height: auto;float: none;width: 100%;max-width: 250px" width="250">
    <!--[if mso]></td></tr></table><![endif]-->
    </div>
    
                      
                      
                        <div class="">
        <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 10px; padding-left: 10px; padding-top: 10px; padding-bottom: 10px;"><![endif]-->
        <div style="color:#555555;font-family:'Montserrat', 'Trebuchet MS', 'Lucida Grande', 'Lucida Sans Unicode', 'Lucida Sans', Tahoma, sans-serif;line-height:150%; padding-right: 10px; padding-left: 10px; padding-top: 10px; padding-bottom: 10px;"> 
            <div style="font-size:12px;line-height:18px;color:#555555;font-family:'Montserrat', 'Trebuchet MS', 'Lucida Grande', 'Lucida Sans Unicode', 'Lucida Sans', Tahoma, sans-serif;text-align:left;"><p style="margin: 0;font-size: 14px;line-height: 21px;text-align: center"></p></div>    
        </div>
        <!--[if mso]></td></tr></table><![endif]-->
    </div>
                      
                  <!--[if (!mso)&(!IE)]><!--></div><!--<![endif]-->
                  </div>
                </div>
              <!--[if (mso)|(IE)]></td></tr></table></td></tr></table><![endif]-->
            </div>
          </div>
        </div>
        <div style="background-color:transparent;">
          <div style="Margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: #FFFFFF;" class="block-grid ">
            <div style="border-collapse: collapse;display: table;width: 100%;background-color:#FFFFFF;">
              <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="background-color:transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width: 600px;"><tr class="layout-full-width" style="background-color:#FFFFFF;"><![endif]-->
    
                  <!--[if (mso)|(IE)]><td align="center" width="600" style=" width:600px; padding-right: 0px; padding-left: 0px; padding-top:0px; padding-bottom:5px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;" valign="top"><![endif]-->
                <div class="col num12" style="min-width: 320px;max-width: 600px;display: table-cell;vertical-align: top;">
                  <div style="background-color: transparent; width: 100% !important;">
                  <!--[if (!mso)&(!IE)]><!--><div style="border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent; padding-top:0px; padding-bottom:5px; padding-right: 0px; padding-left: 0px;"><!--<![endif]-->
    
                      
                        <div class="">
        <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 10px; padding-left: 10px; padding-top: 10px; padding-bottom: 10px;"><![endif]-->
        <div style="color:#0D0D0D;font-family:'Montserrat', 'Trebuchet MS', 'Lucida Grande', 'Lucida Sans Unicode', 'Lucida Sans', Tahoma, sans-serif;line-height:120%; padding-right: 10px; padding-left: 10px; padding-top: 10px; padding-bottom: 10px;"> 
            <div style="font-size:12px;line-height:14px;color:#0D0D0D;font-family:'Montserrat', 'Trebuchet MS', 'Lucida Grande', 'Lucida Sans Unicode', 'Lucida Sans', Tahoma, sans-serif;text-align:left;">
          <p style="margin: 0;font-size: 14px;line-height: 17px;text-align: center">
           <strong> 
          <span style="font-size: 28px; line-height: 33px;">
          Dear ` + name + `,
        </span> </strong> <br><br>
    
               <div style="text-align: left;">  <span style="line-height: 33px; font-size: 20px;">
                
          </span></div>
      </p></div>    
        </div>
        <!--[if mso]></td></tr></table><![endif]-->
    </div>
                      
                      
                        <div align="center" class="img-container center  autowidth  " style="padding-right: 0px;  padding-left: 0px;">
    <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr style="line-height:0px;line-height:0px;"><td style="padding-right: 0px; padding-left: 0px;" align="center"><![endif]-->
      <img class="center  autowidth " align="center" border="0" src="https://d1oco4z2z1fhwp.cloudfront.net/templates/default/20/divider.png" alt="Image" title="Image" style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: block !important;border: 0;height: auto;float: none;width: 100%;max-width: 316px" width="316">
    <!--[if mso]></td></tr></table><![endif]-->
    </div>
    
                      
                      
                        <div class="">
        <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 10px; padding-left: 10px; padding-top: 10px; padding-bottom: 10px;"><![endif]-->
        <div style="color:#555555;font-family:'Montserrat', 'Trebuchet MS', 'Lucida Grande', 'Lucida Sans Unicode', 'Lucida Sans', Tahoma, sans-serif;line-height:150%; padding-right: 10px; padding-left: 10px; padding-top: 10px; padding-bottom: 10px;"> 
            
        </div>
        <!--[if mso]></td></tr></table><![endif]-->
    </div>
                      
                      
                        <div class="">
        <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 10px; padding-left: 10px; padding-top: 20px; padding-bottom: 10px;"><![endif]-->
        <div style="color:#0D0D0D;font-family:'Montserrat', 'Trebuchet MS', 'Lucida Grande', 'Lucida Sans Unicode', 'Lucida Sans', Tahoma, sans-serif;line-height:150%; padding-right: 10px; padding-left: 10px; padding-top: 20px; padding-bottom: 10px;"> 
            <div style="font-size:12px;line-height:18px;color:#0D0D0D;font-family:'Montserrat', 'Trebuchet MS', 'Lucida Grande', 'Lucida Sans Unicode', 'Lucida Sans', Tahoma, sans-serif;text-align:left;"><p style="margin: 0;font-size: 14px;line-height: 21px;text-align: center">You have not been selected in the interview for the position of ` + job_title + ` in `+ emp_name+`.  <br> Tough luck this time; We wish you all the very best in your future endeavors. Keep checking the application for more opportunities.
            </p></div>  
        </div>
        <!--[if mso]></td></tr></table><![endif]-->
    </div>
                      
                      
                        
    <div align="center" class="button-container center " style="padding-right: 10px; padding-left: 10px; padding-top:25px; padding-bottom:10px;">
      <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0" style="border-spacing: 0; border-collapse: collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;"><tr><td style="padding-right: 10px; padding-left: 10px; padding-top:25px; padding-bottom:10px;" align="center"><v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="" style="height:46pt; v-text-anchor:middle; width:151pt;" arcsize="7%" strokecolor="#a8bf6f" fillcolor="#a8bf6f"><w:anchorlock/><v:textbox inset="0,0,0,0"><center style="color:#ffffff; font-family:'Montserrat', 'Trebuchet MS', 'Lucida Grande', 'Lucida Sans Unicode', 'Lucida Sans', Tahoma, sans-serif; font-size:16px;"><![endif]-->
        <div style="color: #ffffff; background-color: #a8bf6f; border-radius: 4px; -webkit-border-radius: 4px; -moz-border-radius: 4px; max-width: 202px; width: 172px;width: auto; border-top: 0px solid transparent; border-right: 0px solid transparent; border-bottom: 0px solid transparent; border-left: 0px solid transparent; padding-top: 15px; padding-right: 15px; padding-bottom: 15px; padding-left: 15px; font-family: 'Montserrat', 'Trebuchet MS', 'Lucida Grande', 'Lucida Sans Unicode', 'Lucida Sans', Tahoma, sans-serif; text-align: center; mso-border-alt: none;">
          <span style="font-size:16px;line-height:32px;"><a href="`+ variables.WEB_LINK_STUDENT +`" style="text-decoration : none; color : #fff;"><strong>GoTo Application</strong></a></span>
        </div>
      <!--[if mso]></center></v:textbox></v:roundrect></td></tr></table><![endif]-->
    </div>
    
                      
                      
                        
    <table border="0" cellpadding="0" cellspacing="0" width="100%" class="divider " style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;min-width: 100%;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%">
        <tbody>
            <tr style="vertical-align: top">
                <td class="divider_inner" style="word-break: break-word;border-collapse: collapse !important;vertical-align: top;padding-right: 10px;padding-left: 10px;padding-top: 30px;padding-bottom: 10px;min-width: 100%;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%">
                    <table class="divider_content" align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;border-top: 0px solid transparent;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%">
                        <tbody>
                            <tr style="vertical-align: top">
                                <td style="word-break: break-word;border-collapse: collapse !important;vertical-align: top;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%">
                                    <span></span>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </td>
            </tr>
        </tbody>
    </table>
                      
                  <!--[if (!mso)&(!IE)]><!--></div><!--<![endif]-->
                  </div>
                </div>
              <!--[if (mso)|(IE)]></td></tr></table></td></tr></table><![endif]-->
            </div>
          </div>
        </div>
        <div style="background-color:transparent;">
          <div style="Margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: #525252;" class="block-grid three-up ">
            <div style="border-collapse: collapse;display: table;width: 100%;background-color:#525252;">
              <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="background-color:transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width: 600px;"><tr class="layout-full-width" style="background-color:#525252;"><![endif]-->
    
                  <!--[if (mso)|(IE)]><td align="center" width="200" style=" width:200px; padding-right: 0px; padding-left: 0px; padding-top:0px; padding-bottom:0px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;" valign="top"><![endif]-->
                <div class="col num4" style="max-width: 320px;min-width: 200px;display: table-cell;vertical-align: top;">
                  <div style="background-color: transparent; width: 100% !important;">
                  <!--[if (!mso)&(!IE)]><!--><div style="border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent; padding-top:0px; padding-bottom:0px; padding-right: 0px; padding-left: 0px;"><!--<![endif]-->
    
                      
                        
    <div align="center" style="padding-right: 0px; padding-left: 0px; padding-bottom: 0px;" class="">
      <div style="line-height:15px;font-size:1px">&#160;</div>
      <div style="display: table; max-width:131px;">
      <!--[if (mso)|(IE)]><table width="131" cellpadding="0" cellspacing="0" border="0"><tr><td style="border-collapse:collapse; padding-right: 0px; padding-left: 0px; padding-bottom: 0px;"  align="center"><table width="100%" cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse; mso-table-lspace: 0pt;mso-table-rspace: 0pt; width:131px;"><tr><td width="32" style="width:32px; padding-right: 5px;" valign="top"><![endif]-->
        <table align="left" border="0" cellspacing="0" cellpadding="0" width="32" height="32" style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;Margin-right: 5px">
          <tbody><tr style="vertical-align: top"><td align="left" valign="middle" style="word-break: break-word;border-collapse: collapse !important;vertical-align: top">
            
          <div style="line-height:5px;font-size:1px">&#160;</div>
          </td></tr>
        </tbody></table>
          <!--[if (mso)|(IE)]></td><td width="32" style="width:32px; padding-right: 5px;" valign="top"><![endif]-->
        <table align="left" border="0" cellspacing="0" cellpadding="0" width="32" height="32" style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;Margin-right: 5px">
          <tbody><tr style="vertical-align: top"><td align="left" valign="middle" style="word-break: break-word;border-collapse: collapse !important;vertical-align: top">
            
          <div style="line-height:5px;font-size:1px">&#160;</div>
          </td></tr>
        </tbody></table>
          <!--[if (mso)|(IE)]></td><td width="32" style="width:32px; padding-right: 0;" valign="top"><![endif]-->
        <table align="left" border="0" cellspacing="0" cellpadding="0" width="32" height="32" style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;Margin-right: 0">
          <tbody><tr style="vertical-align: top"><td align="left" valign="middle" style="word-break: break-word;border-collapse: collapse !important;vertical-align: top">
            
          <div style="line-height:5px;font-size:1px">&#160;</div>
          </td></tr>
        </tbody></table>
        <!--[if (mso)|(IE)]></td></tr></table></td></tr></table><![endif]-->
      </div>
    </div>
                      
                  <!--[if (!mso)&(!IE)]><!--></div><!--<![endif]-->
                  </div>
                </div>
                  <!--[if (mso)|(IE)]></td><td align="center" width="200" style=" width:200px; padding-right: 0px; padding-left: 0px; padding-top:5px; padding-bottom:5px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;" valign="top"><![endif]-->
                <div class="col num4" style="max-width: 320px;min-width: 200px;display: table-cell;vertical-align: top;">
                  <div style="background-color: transparent; width: 100% !important;">
                  <!--[if (!mso)&(!IE)]><!--><div style="border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent; padding-top:5px; padding-bottom:5px; padding-right: 0px; padding-left: 0px;"><!--<![endif]-->
    
                      
                        <div class="">
        <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 0px; padding-left: 0px; padding-top: 20px; padding-bottom: 0px;"><![endif]-->
        <div style="color:#a8bf6f;font-family:'Montserrat', 'Trebuchet MS', 'Lucida Grande', 'Lucida Sans Unicode', 'Lucida Sans', Tahoma, sans-serif;line-height:120%; padding-right: 0px; padding-left: 0px; padding-top: 20px; padding-bottom: 0px;">    
            <div style="font-size:12px;line-height:14px;color:#a8bf6f;font-family:'Montserrat', 'Trebuchet MS', 'Lucida Grande', 'Lucida Sans Unicode', 'Lucida Sans', Tahoma, sans-serif;text-align:left;"><p style="margin: 0;font-size: 12px;line-height: 14px;text-align: center"><span style="color: rgb(255, 255, 255); font-size: 12px; line-height: 14px;"><span style="font-size: 12px; line-height: 14px; color: rgb(168, 191, 111);">CAS SHRC | Bridging Talents and Opportunities</div> 
        </div>
        <!--[if mso]></td></tr></table><![endif]-->
    </div>
                      
                  <!--[if (!mso)&(!IE)]><!--></div><!--<![endif]-->
                  </div>
                </div>
                  <!--[if (mso)|(IE)]></td><td align="center" width="200" style=" width:200px; padding-right: 0px; padding-left: 0px; padding-top:5px; padding-bottom:5px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;" valign="top"><![endif]-->
                <div class="col num4" style="max-width: 320px;min-width: 200px;display: table-cell;vertical-align: top;">
                  <div style="background-color: transparent; width: 100% !important;">
                  <!--[if (!mso)&(!IE)]><!--><div style="border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent; padding-top:5px; padding-bottom:5px; padding-right: 0px; padding-left: 0px;"><!--<![endif]-->
    
                      
                        <div class="">
        <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 0px; padding-left: 0px; padding-top: 20px; padding-bottom: 0px;"><![endif]-->
        
        <!--[if mso]></td></tr></table><![endif]-->
    </div>
                      
                  <!--[if (!mso)&(!IE)]><!--></div><!--<![endif]-->
                  </div>
                </div>
              <!--[if (mso)|(IE)]></td></tr></table></td></tr></table><![endif]-->
            </div>
          </div>
        </div>
        <div style="background-color:transparent;">
          <div style="Margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: transparent;" class="block-grid ">
            <div style="border-collapse: collapse;display: table;width: 100%;background-color:transparent;">
              <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="background-color:transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width: 600px;"><tr class="layout-full-width" style="background-color:transparent;"><![endif]-->
    
                  <!--[if (mso)|(IE)]><td align="center" width="600" style=" width:600px; padding-right: 0px; padding-left: 0px; padding-top:0px; padding-bottom:5px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;" valign="top"><![endif]-->
                <div class="col num12" style="min-width: 320px;max-width: 600px;display: table-cell;vertical-align: top;">
                  <div style="background-color: transparent; width: 100% !important;">
                  <!--[if (!mso)&(!IE)]><!--><div style="border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent; padding-top:0px; padding-bottom:5px; padding-right: 0px; padding-left: 0px;"><!--<![endif]-->
    
                      
                        <div align="center" class="img-container center  autowidth  fullwidth " style="padding-right: 0px;  padding-left: 0px;">
    <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr style="line-height:0px;line-height:0px;"><td style="padding-right: 0px; padding-left: 0px;" align="center"><![endif]-->
      <img class="center  autowidth  fullwidth" align="center" border="0" src="https://d1oco4z2z1fhwp.cloudfront.net/templates/default/20/rounder-dwn.png" alt="Image" title="Image" style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: block !important;border: 0;height: auto;float: none;width: 100%;max-width: 600px" width="600">
    <!--[if mso]></td></tr></table><![endif]-->
    </div>
    
                      
                      
                        
    <table border="0" cellpadding="0" cellspacing="0" width="100%" class="divider " style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;min-width: 100%;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%">
        <tbody>
            <tr style="vertical-align: top">
                <td class="divider_inner" style="word-break: break-word;border-collapse: collapse !important;vertical-align: top;padding-right: 30px;padding-left: 30px;padding-top: 30px;padding-bottom: 30px;min-width: 100%;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%">
                    <table class="divider_content" align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;border-top: 0px solid transparent;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%">
                        <tbody>
                            <tr style="vertical-align: top">
                                <td style="word-break: break-word;border-collapse: collapse !important;vertical-align: top;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%">
                                    <span></span>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </td>
            </tr>
        </tbody>
    </table>
                      
                  <!--[if (!mso)&(!IE)]><!--></div><!--<![endif]-->
                  </div>
                </div>
              <!--[if (mso)|(IE)]></td></tr></table></td></tr></table><![endif]-->
            </div>
          </div>
        </div>
       <!--[if (mso)|(IE)]></td></tr></table><![endif]-->
            </td>
      </tr>
      </tbody>
      </table>
      <!--[if (mso)|(IE)]></div><![endif]-->
    
    
    </body></html>`
    
        // sendMail.sendMail(email,html,'Job Interview','Invite to interview')
        sendMail.sendMail(email,html,'CAS SHRC: Interview Result')
        setting.save_notification(student_id,emp_id,vacancy_id,"Interview was not successful","4")
        setting.status_history(student_id,vacancy_id,"4")

    }

    else if(status==="5") //offer request pending  EMployer
    {

      html = `<!DOCTYPE HTML PUBLIC "-//W3C//DTD XHTML 1.0 Transitional //EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd"><html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office"><head>
        <!--[if gte mso 9]><xml>
         <o:OfficeDocumentSettings>
          <o:AllowPNG/>
          <o:PixelsPerInch>96</o:PixelsPerInch>
         </o:OfficeDocumentSettings>
        </xml><![endif]-->
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
        <meta name="viewport" content="width=device-width">
        <!--[if !mso]><!--><meta http-equiv="X-UA-Compatible" content="IE=edge"><!--<![endif]-->
        <title></title>
        <!--[if !mso]><!-- -->
        <link href="https://fonts.googleapis.com/css?family=Montserrat" rel="stylesheet" type="text/css">
        <!--<![endif]-->
        
        <style type="text/css" id="media-query">
          body {
      margin: 0;
      padding: 0; }
    
    table, tr, td {
      vertical-align: top;
      border-collapse: collapse; }
    
    .ie-browser table, .mso-container table {
      table-layout: fixed; }
    
    * {
      line-height: inherit; }
    
    a[x-apple-data-detectors=true] {
      color: inherit !important;
      text-decoration: none !important; }
    
    [owa] .img-container div, [owa] .img-container button {
      display: block !important; }
    
    [owa] .fullwidth button {
      width: 100% !important; }
    
    [owa] .block-grid .col {
      display: table-cell;
      float: none !important;
      vertical-align: top; }
    
    .ie-browser .num12, .ie-browser .block-grid, [owa] .num12, [owa] .block-grid {
      width: 600px !important; }
    
    .ExternalClass, .ExternalClass p, .ExternalClass span, .ExternalClass font, .ExternalClass td, .ExternalClass div {
      line-height: 100%; }
    
    .ie-browser .mixed-two-up .num4, [owa] .mixed-two-up .num4 {
      width: 200px !important; }
    
    .ie-browser .mixed-two-up .num8, [owa] .mixed-two-up .num8 {
      width: 400px !important; }
    
    .ie-browser .block-grid.two-up .col, [owa] .block-grid.two-up .col {
      width: 300px !important; }
    
    .ie-browser .block-grid.three-up .col, [owa] .block-grid.three-up .col {
      width: 200px !important; }
    
    .ie-browser .block-grid.four-up .col, [owa] .block-grid.four-up .col {
      width: 150px !important; }
    
    .ie-browser .block-grid.five-up .col, [owa] .block-grid.five-up .col {
      width: 120px !important; }
    
    .ie-browser .block-grid.six-up .col, [owa] .block-grid.six-up .col {
      width: 100px !important; }
    
    .ie-browser .block-grid.seven-up .col, [owa] .block-grid.seven-up .col {
      width: 85px !important; }
    
    .ie-browser .block-grid.eight-up .col, [owa] .block-grid.eight-up .col {
      width: 75px !important; }
    
    .ie-browser .block-grid.nine-up .col, [owa] .block-grid.nine-up .col {
      width: 66px !important; }
    
    .ie-browser .block-grid.ten-up .col, [owa] .block-grid.ten-up .col {
      width: 60px !important; }
    
    .ie-browser .block-grid.eleven-up .col, [owa] .block-grid.eleven-up .col {
      width: 54px !important; }
    
    .ie-browser .block-grid.twelve-up .col, [owa] .block-grid.twelve-up .col {
      width: 50px !important; }
    
    @media only screen and (min-width: 620px) {
      .block-grid {
        width: 600px !important; }
      .block-grid .col {
        vertical-align: top; }
        .block-grid .col.num12 {
          width: 600px !important; }
      .block-grid.mixed-two-up .col.num4 {
        width: 200px !important; }
      .block-grid.mixed-two-up .col.num8 {
        width: 400px !important; }
      .block-grid.two-up .col {
        width: 300px !important; }
      .block-grid.three-up .col {
        width: 200px !important; }
      .block-grid.four-up .col {
        width: 150px !important; }
      .block-grid.five-up .col {
        width: 120px !important; }
      .block-grid.six-up .col {
        width: 100px !important; }
      .block-grid.seven-up .col {
        width: 85px !important; }
      .block-grid.eight-up .col {
        width: 75px !important; }
      .block-grid.nine-up .col {
        width: 66px !important; }
      .block-grid.ten-up .col {
        width: 60px !important; }
      .block-grid.eleven-up .col {
        width: 54px !important; }
      .block-grid.twelve-up .col {
        width: 50px !important; } }
    
    @media (max-width: 620px) {
      .block-grid, .col {
        min-width: 320px !important;
        max-width: 100% !important;
        display: block !important; }
      .block-grid {
        width: calc(100% - 40px) !important; }
      .col {
        width: 100% !important; }
        .col > div {
          margin: 0 auto; }
      img.fullwidth, img.fullwidthOnMobile {
        max-width: 100% !important; }
      .no-stack .col {
        min-width: 0 !important;
        display: table-cell !important; }
      .no-stack.two-up .col {
        width: 50% !important; }
      .no-stack.mixed-two-up .col.num4 {
        width: 33% !important; }
      .no-stack.mixed-two-up .col.num8 {
        width: 66% !important; }
      .no-stack.three-up .col.num4 {
        width: 33% !important; }
      .no-stack.four-up .col.num3 {
        width: 25% !important; }
      .mobile_hide {
        min-height: 0px;
        max-height: 0px;
        max-width: 0px;
        display: none;
        overflow: hidden;
        font-size: 0px; } }
    
        </style>
    </head>
    <body class="clean-body" style="margin: 0;padding: 0;-webkit-text-size-adjust: 100%;background-color: #e2eace">
      <style type="text/css" id="media-query-bodytag">
        @media (max-width: 520px) {
          .block-grid {
            min-width: 320px!important;
            max-width: 100%!important;
            width: 100%!important;
            display: block!important;
          }
    
          .col {
            min-width: 320px!important;
            max-width: 100%!important;
            width: 100%!important;
            display: block!important;
          }
    
            .col > div {
              margin: 0 auto;
            }
    
          img.fullwidth {
            max-width: 100%!important;
          }
                img.fullwidthOnMobile {
            max-width: 100%!important;
          }
          .no-stack .col {
                    min-width: 0!important;
                    display: table-cell!important;
                }
                .no-stack.two-up .col {
                    width: 50%!important;
                }
                .no-stack.mixed-two-up .col.num4 {
                    width: 33%!important;
                }
                .no-stack.mixed-two-up .col.num8 {
                    width: 66%!important;
                }
                .no-stack.three-up .col.num4 {
                    width: 33%!important;
                }
                .no-stack.four-up .col.num3 {
                    width: 25%!important;
                }
          .mobile_hide {
            min-height: 0px!important;
            max-height: 0px!important;
            max-width: 0px!important;
            display: none!important;
            overflow: hidden!important;
            font-size: 0px!important;
          }
        }
      </style>
      <!--[if IE]><div class="ie-browser"><![endif]-->
      <!--[if mso]><div class="mso-container"><![endif]-->
      <table class="nl-container" style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;min-width: 320px;Margin: 0 auto;background-color: #e2eace;width: 100%" cellpadding="0" cellspacing="0">
        <tbody>
        <tr style="vertical-align: top">
            <td style="word-break: break-word;border-collapse: collapse !important;vertical-align: top">
        <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td align="center" style="background-color: #e2eace;"><![endif]-->
    
        <div style="background-color:transparent;">
          <div style="Margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: transparent;" class="block-grid ">
            <div style="border-collapse: collapse;display: table;width: 100%;background-color:transparent;">
              <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="background-color:transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width: 600px;"><tr class="layout-full-width" style="background-color:transparent;"><![endif]-->
    
                  <!--[if (mso)|(IE)]><td align="center" width="600" style=" width:600px; padding-right: 0px; padding-left: 0px; padding-top:5px; padding-bottom:0px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;" valign="top"><![endif]-->
                <div class="col num12" style="min-width: 320px;max-width: 600px;display: table-cell;vertical-align: top;">
                  <div style="background-color: transparent; width: 100% !important;">
                  <!--[if (!mso)&(!IE)]><!--><div style="border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent; padding-top:5px; padding-bottom:0px; padding-right: 0px; padding-left: 0px;"><!--<![endif]-->
    
                      
                        <div align="center" class="img-container center  autowidth  fullwidth " style="padding-right: 0px;  padding-left: 0px;">
    <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr style="line-height:0px;line-height:0px;"><td style="padding-right: 0px; padding-left: 0px;" align="center"><![endif]-->
    <div style="line-height:25px;font-size:1px">&#160;</div>  <img class="center  autowidth  fullwidth" align="center" border="0" src="https://d1oco4z2z1fhwp.cloudfront.net/templates/default/20/rounder-up.png" alt="Image" title="Image" style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: block !important;border: 0;height: auto;float: none;width: 100%;max-width: 600px" width="600">
    <!--[if mso]></td></tr></table><![endif]-->
    </div>
    
                      
                  <!--[if (!mso)&(!IE)]><!--></div><!--<![endif]-->
                  </div>
                </div>
              <!--[if (mso)|(IE)]></td></tr></table></td></tr></table><![endif]-->
            </div>
          </div>
        </div>
        <div style="background-color:transparent;">
          <div style="Margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: #FFFFFF;" class="block-grid ">
            <div style="border-collapse: collapse;display: table;width: 100%;background-color:#FFFFFF;">
              <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="background-color:transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width: 600px;"><tr class="layout-full-width" style="background-color:#FFFFFF;"><![endif]-->
    
                  <!--[if (mso)|(IE)]><td align="center" width="600" style=" width:600px; padding-right: 0px; padding-left: 0px; padding-top:5px; padding-bottom:5px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;" valign="top"><![endif]-->
                <div class="col num12" style="min-width: 320px;max-width: 600px;display: table-cell;vertical-align: top;">
                  <div style="background-color: transparent; width: 100% !important;">
                  <!--[if (!mso)&(!IE)]><!--><div style="border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent; padding-top:5px; padding-bottom:5px; padding-right: 0px; padding-left: 0px;"><!--<![endif]-->
    
                      
                        <div align="center" class="img-container center  autowidth  " style="padding-right: 0px;  padding-left: 0px;">
    <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr style="line-height:0px;line-height:0px;"><td style="padding-right: 0px; padding-left: 0px;" align="center"><![endif]-->
      <img class="center  autowidth " align="center" border="0" src="https://i.imgur.com/FrVRrnL.png" alt="Image" title="Image" style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: block !important;border: 0;height: auto;float: none;width: 100%;max-width: 250px" width="250">
    <!--[if mso]></td></tr></table><![endif]-->
    </div>
    
                      
                      
                        <div class="">
        <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 10px; padding-left: 10px; padding-top: 10px; padding-bottom: 10px;"><![endif]-->
        <div style="color:#555555;font-family:'Montserrat', 'Trebuchet MS', 'Lucida Grande', 'Lucida Sans Unicode', 'Lucida Sans', Tahoma, sans-serif;line-height:150%; padding-right: 10px; padding-left: 10px; padding-top: 10px; padding-bottom: 10px;"> 
            <div style="font-size:12px;line-height:18px;color:#555555;font-family:'Montserrat', 'Trebuchet MS', 'Lucida Grande', 'Lucida Sans Unicode', 'Lucida Sans', Tahoma, sans-serif;text-align:left;"><p style="margin: 0;font-size: 14px;line-height: 21px;text-align: center"></p></div>    
        </div>
        <!--[if mso]></td></tr></table><![endif]-->
    </div>
                      
                  <!--[if (!mso)&(!IE)]><!--></div><!--<![endif]-->
                  </div>
                </div>
              <!--[if (mso)|(IE)]></td></tr></table></td></tr></table><![endif]-->
            </div>
          </div>
        </div>
        <div style="background-color:transparent;">
          <div style="Margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: #FFFFFF;" class="block-grid ">
            <div style="border-collapse: collapse;display: table;width: 100%;background-color:#FFFFFF;">
              <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="background-color:transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width: 600px;"><tr class="layout-full-width" style="background-color:#FFFFFF;"><![endif]-->
    
                  <!--[if (mso)|(IE)]><td align="center" width="600" style=" width:600px; padding-right: 0px; padding-left: 0px; padding-top:0px; padding-bottom:5px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;" valign="top"><![endif]-->
                <div class="col num12" style="min-width: 320px;max-width: 600px;display: table-cell;vertical-align: top;">
                  <div style="background-color: transparent; width: 100% !important;">
                  <!--[if (!mso)&(!IE)]><!--><div style="border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent; padding-top:0px; padding-bottom:5px; padding-right: 0px; padding-left: 0px;"><!--<![endif]-->
    
                      
                        <div class="">
        <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 10px; padding-left: 10px; padding-top: 10px; padding-bottom: 10px;"><![endif]-->
        <div style="color:#0D0D0D;font-family:'Montserrat', 'Trebuchet MS', 'Lucida Grande', 'Lucida Sans Unicode', 'Lucida Sans', Tahoma, sans-serif;line-height:120%; padding-right: 10px; padding-left: 10px; padding-top: 10px; padding-bottom: 10px;"> 
            <div style="font-size:12px;line-height:14px;color:#0D0D0D;font-family:'Montserrat', 'Trebuchet MS', 'Lucida Grande', 'Lucida Sans Unicode', 'Lucida Sans', Tahoma, sans-serif;text-align:left;">
          <p style="margin: 0;font-size: 14px;line-height: 17px;text-align: center">
           <strong> 
          <span style="font-size: 28px; line-height: 33px;">
          Dear ` + name + `,
        </span> </strong> <br><br>
    
               <div style="text-align: left;">  <span style="line-height: 33px; font-size: 20px;">
                
          </span></div>
      </p></div>    
        </div>
        <!--[if mso]></td></tr></table><![endif]-->
    </div>
                      
                      
                        <div align="center" class="img-container center  autowidth  " style="padding-right: 0px;  padding-left: 0px;">
    <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr style="line-height:0px;line-height:0px;"><td style="padding-right: 0px; padding-left: 0px;" align="center"><![endif]-->
      <img class="center  autowidth " align="center" border="0" src="https://d1oco4z2z1fhwp.cloudfront.net/templates/default/20/divider.png" alt="Image" title="Image" style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: block !important;border: 0;height: auto;float: none;width: 100%;max-width: 316px" width="316">
    <!--[if mso]></td></tr></table><![endif]-->
    </div>
    
                      
                      
                        <div class="">
        <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 10px; padding-left: 10px; padding-top: 10px; padding-bottom: 10px;"><![endif]-->
        <div style="color:#555555;font-family:'Montserrat', 'Trebuchet MS', 'Lucida Grande', 'Lucida Sans Unicode', 'Lucida Sans', Tahoma, sans-serif;line-height:150%; padding-right: 10px; padding-left: 10px; padding-top: 10px; padding-bottom: 10px;"> 
            
        </div>
        <!--[if mso]></td></tr></table><![endif]-->
    </div>
                      
                      
                        <div class="">
        <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 10px; padding-left: 10px; padding-top: 20px; padding-bottom: 10px;"><![endif]-->
        <div style="color:#0D0D0D;font-family:'Montserrat', 'Trebuchet MS', 'Lucida Grande', 'Lucida Sans Unicode', 'Lucida Sans', Tahoma, sans-serif;line-height:150%; padding-right: 10px; padding-left: 10px; padding-top: 20px; padding-bottom: 10px;"> 
            <div style="font-size:12px;line-height:18px;color:#0D0D0D;font-family:'Montserrat', 'Trebuchet MS', 'Lucida Grande', 'Lucida Sans Unicode', 'Lucida Sans', Tahoma, sans-serif;text-align:left;"><p style="margin: 0;font-size: 14px;line-height: 21px;text-align: center">Congratulations! You have been selected for the position of ` + job_title + ` with ` + emp_name + ` based on your performance during the interview assessment process.  <br>
    <br>Your offer details are following : <br>
	 <code>Joining Date :`+ req.body.join_date + `</code> <br>
	  <code>Location :`+ req.body.location + `</code> <br>
    <code>Anual CTC :`+ req.body.ctc + ` </code><br>
    <code>HR Name :`+ req.body.hr_name + `</code> <br>
    <code>HR Email :`+ req.body.hr_email + `</code> <br>
    <code>HR Contact Number :`+ req.body.hr_contact_no + ` </code></br>
	<code>Employer Name:`+ emp_name + `</code> <br>
	<code>Employer Email :`+ emp_email + `</code> <br><br>
    
            </p></div>  
        </div>
        <!--[if mso]></td></tr></table><![endif]-->
    </div>
                   
					<div class="">
        <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 10px; padding-left: 10px; padding-top: 20px; padding-bottom: 10px;"><![endif]-->
        <div style="color:#0D0D0D;font-family:'Montserrat', 'Trebuchet MS', 'Lucida Grande', 'Lucida Sans Unicode', 'Lucida Sans', Tahoma, sans-serif;line-height:150%; padding-right: 10px; padding-left: 10px; padding-top: 20px; padding-bottom: 10px;"> 
            <div style="font-size:12px;line-height:18px;color:#0D0D0D;font-family:'Montserrat', 'Trebuchet MS', 'Lucida Grande', 'Lucida Sans Unicode', 'Lucida Sans', Tahoma, sans-serif;text-align:left;"><p style="margin: 0;font-size: 14px;line-height: 21px;text-align: center">Please note that this is an intimation to your selection with the Organization, and it is not the formal 'Offer of Intent'. Please click on 'Accept Offer'/ 'Reject Offer' link for the Organization to send you a formal 'Offer of Intent'.  <br>
            </p></div>  
        </div>
        <!--[if mso]></td></tr></table><![endif]-->
    </div>
	
	<div class="">
        <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 10px; padding-left: 10px; padding-top: 20px; padding-bottom: 10px;"><![endif]-->
        <div style="color:#0D0D0D;font-family:'Montserrat', 'Trebuchet MS', 'Lucida Grande', 'Lucida Sans Unicode', 'Lucida Sans', Tahoma, sans-serif;line-height:150%; padding-right: 10px; padding-left: 10px; padding-top: 20px; padding-bottom: 10px;"> 
            <div style="font-size:12px;line-height:18px;color:#0D0D0D;font-family:'Montserrat', 'Trebuchet MS', 'Lucida Grande', 'Lucida Sans Unicode', 'Lucida Sans', Tahoma, sans-serif;text-align:left;"><p style="margin: 0;font-size: 14px;line-height: 21px;text-align: center">Please feel free to call `+ req.body.hr_name + `  at ` + req.body.hr_email + `/ ` + req.body.hr_contact_no + ` for further clarification that you may require.  <br>
            </p></div>  
        </div>
        <!--[if mso]></td></tr></table><![endif]-->
    </div>
                   
                      
                        
    <div align="center" class="button-container center " style="padding-right: 10px; padding-left: 10px; padding-top:25px; padding-bottom:10px;">
      <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0" style="border-spacing: 0; border-collapse: collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;"><tr><td style="padding-right: 10px; padding-left: 10px; padding-top:25px; padding-bottom:10px;" align="center"><v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="" style="height:46pt; v-text-anchor:middle; width:151pt;" arcsize="7%" strokecolor="#a8bf6f" fillcolor="#a8bf6f"><w:anchorlock/><v:textbox inset="0,0,0,0"><center style="color:#ffffff; font-family:'Montserrat', 'Trebuchet MS', 'Lucida Grande', 'Lucida Sans Unicode', 'Lucida Sans', Tahoma, sans-serif; font-size:16px;"><![endif]-->
        <div style="color: #ffffff; background-color: #a8bf6f; border-radius: 4px; -webkit-border-radius: 4px; -moz-border-radius: 4px; max-width: 202px; width: 172px;width: auto; border-top: 0px solid transparent; border-right: 0px solid transparent; border-bottom: 0px solid transparent; border-left: 0px solid transparent; padding-top: 15px; padding-right: 15px; padding-bottom: 15px; padding-left: 15px; font-family: 'Montserrat', 'Trebuchet MS', 'Lucida Grande', 'Lucida Sans Unicode', 'Lucida Sans', Tahoma, sans-serif; text-align: center; mso-border-alt: none;">
          <span style="font-size:16px;line-height:32px;"><a href="`+ variables.WEB_LINK_STUDENT +`" style="text-decoration : none; color : #fff;"><strong>GoTo Application</strong></a></span>
        </div>
      <!--[if mso]></center></v:textbox></v:roundrect></td></tr></table><![endif]-->
    </div>
    
                      
                      
                        
    <table border="0" cellpadding="0" cellspacing="0" width="100%" class="divider " style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;min-width: 100%;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%">
        <tbody>
            <tr style="vertical-align: top">
                <td class="divider_inner" style="word-break: break-word;border-collapse: collapse !important;vertical-align: top;padding-right: 10px;padding-left: 10px;padding-top: 30px;padding-bottom: 10px;min-width: 100%;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%">
                    <table class="divider_content" align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;border-top: 0px solid transparent;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%">
                        <tbody>
                            <tr style="vertical-align: top">
                                <td style="word-break: break-word;border-collapse: collapse !important;vertical-align: top;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%">
                                    <span></span>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </td>
            </tr>
        </tbody>
    </table>
                      
                  <!--[if (!mso)&(!IE)]><!--></div><!--<![endif]-->
                  </div>
                </div>
              <!--[if (mso)|(IE)]></td></tr></table></td></tr></table><![endif]-->
            </div>
          </div>
        </div>
        <div style="background-color:transparent;">
          <div style="Margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: #525252;" class="block-grid three-up ">
            <div style="border-collapse: collapse;display: table;width: 100%;background-color:#525252;">
              <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="background-color:transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width: 600px;"><tr class="layout-full-width" style="background-color:#525252;"><![endif]-->
    
                  <!--[if (mso)|(IE)]><td align="center" width="200" style=" width:200px; padding-right: 0px; padding-left: 0px; padding-top:0px; padding-bottom:0px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;" valign="top"><![endif]-->
                <div class="col num4" style="max-width: 320px;min-width: 200px;display: table-cell;vertical-align: top;">
                  <div style="background-color: transparent; width: 100% !important;">
                  <!--[if (!mso)&(!IE)]><!--><div style="border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent; padding-top:0px; padding-bottom:0px; padding-right: 0px; padding-left: 0px;"><!--<![endif]-->
    
                      
                        
    <div align="center" style="padding-right: 0px; padding-left: 0px; padding-bottom: 0px;" class="">
      <div style="line-height:15px;font-size:1px">&#160;</div>
      <div style="display: table; max-width:131px;">
      <!--[if (mso)|(IE)]><table width="131" cellpadding="0" cellspacing="0" border="0"><tr><td style="border-collapse:collapse; padding-right: 0px; padding-left: 0px; padding-bottom: 0px;"  align="center"><table width="100%" cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse; mso-table-lspace: 0pt;mso-table-rspace: 0pt; width:131px;"><tr><td width="32" style="width:32px; padding-right: 5px;" valign="top"><![endif]-->
        <table align="left" border="0" cellspacing="0" cellpadding="0" width="32" height="32" style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;Margin-right: 5px">
          <tbody><tr style="vertical-align: top"><td align="left" valign="middle" style="word-break: break-word;border-collapse: collapse !important;vertical-align: top">
            
          <div style="line-height:5px;font-size:1px">&#160;</div>
          </td></tr>
        </tbody></table>
          <!--[if (mso)|(IE)]></td><td width="32" style="width:32px; padding-right: 5px;" valign="top"><![endif]-->
        <table align="left" border="0" cellspacing="0" cellpadding="0" width="32" height="32" style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;Margin-right: 5px">
          <tbody><tr style="vertical-align: top"><td align="left" valign="middle" style="word-break: break-word;border-collapse: collapse !important;vertical-align: top">
            
          <div style="line-height:5px;font-size:1px">&#160;</div>
          </td></tr>
        </tbody></table>
          <!--[if (mso)|(IE)]></td><td width="32" style="width:32px; padding-right: 0;" valign="top"><![endif]-->
        <table align="left" border="0" cellspacing="0" cellpadding="0" width="32" height="32" style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;Margin-right: 0">
          <tbody><tr style="vertical-align: top"><td align="left" valign="middle" style="word-break: break-word;border-collapse: collapse !important;vertical-align: top">
            
          <div style="line-height:5px;font-size:1px">&#160;</div>
          </td></tr>
        </tbody></table>
        <!--[if (mso)|(IE)]></td></tr></table></td></tr></table><![endif]-->
      </div>
    </div>
                      
                  <!--[if (!mso)&(!IE)]><!--></div><!--<![endif]-->
                  </div>
                </div>
                  <!--[if (mso)|(IE)]></td><td align="center" width="200" style=" width:200px; padding-right: 0px; padding-left: 0px; padding-top:5px; padding-bottom:5px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;" valign="top"><![endif]-->
                <div class="col num4" style="max-width: 320px;min-width: 200px;display: table-cell;vertical-align: top;">
                  <div style="background-color: transparent; width: 100% !important;">
                  <!--[if (!mso)&(!IE)]><!--><div style="border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent; padding-top:5px; padding-bottom:5px; padding-right: 0px; padding-left: 0px;"><!--<![endif]-->
    
                      
                        <div class="">
        <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 0px; padding-left: 0px; padding-top: 20px; padding-bottom: 0px;"><![endif]-->
        <div style="color:#a8bf6f;font-family:'Montserrat', 'Trebuchet MS', 'Lucida Grande', 'Lucida Sans Unicode', 'Lucida Sans', Tahoma, sans-serif;line-height:120%; padding-right: 0px; padding-left: 0px; padding-top: 20px; padding-bottom: 0px;">    
            <div style="font-size:12px;line-height:14px;color:#a8bf6f;font-family:'Montserrat', 'Trebuchet MS', 'Lucida Grande', 'Lucida Sans Unicode', 'Lucida Sans', Tahoma, sans-serif;text-align:left;"><p style="margin: 0;font-size: 12px;line-height: 14px;text-align: center"><span style="color: rgb(255, 255, 255); font-size: 12px; line-height: 14px;"><span style="font-size: 12px; line-height: 14px; color: rgb(168, 191, 111);">CAS SHRC | Bridging Talents and Opportunities</div> 
        </div>
        <!--[if mso]></td></tr></table><![endif]-->
    </div>
                      
                  <!--[if (!mso)&(!IE)]><!--></div><!--<![endif]-->
                  </div>
                </div>
                  <!--[if (mso)|(IE)]></td><td align="center" width="200" style=" width:200px; padding-right: 0px; padding-left: 0px; padding-top:5px; padding-bottom:5px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;" valign="top"><![endif]-->
                <div class="col num4" style="max-width: 320px;min-width: 200px;display: table-cell;vertical-align: top;">
                  <div style="background-color: transparent; width: 100% !important;">
                  <!--[if (!mso)&(!IE)]><!--><div style="border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent; padding-top:5px; padding-bottom:5px; padding-right: 0px; padding-left: 0px;"><!--<![endif]-->
    
                      
                        <div class="">
        <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 0px; padding-left: 0px; padding-top: 20px; padding-bottom: 0px;"><![endif]-->
        
        <!--[if mso]></td></tr></table><![endif]-->
    </div>
                      
                  <!--[if (!mso)&(!IE)]><!--></div><!--<![endif]-->
                  </div>
                </div>
              <!--[if (mso)|(IE)]></td></tr></table></td></tr></table><![endif]-->
            </div>
          </div>
        </div>
        <div style="background-color:transparent;">
          <div style="Margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: transparent;" class="block-grid ">
            <div style="border-collapse: collapse;display: table;width: 100%;background-color:transparent;">
              <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="background-color:transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width: 600px;"><tr class="layout-full-width" style="background-color:transparent;"><![endif]-->
    
                  <!--[if (mso)|(IE)]><td align="center" width="600" style=" width:600px; padding-right: 0px; padding-left: 0px; padding-top:0px; padding-bottom:5px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;" valign="top"><![endif]-->
                <div class="col num12" style="min-width: 320px;max-width: 600px;display: table-cell;vertical-align: top;">
                  <div style="background-color: transparent; width: 100% !important;">
                  <!--[if (!mso)&(!IE)]><!--><div style="border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent; padding-top:0px; padding-bottom:5px; padding-right: 0px; padding-left: 0px;"><!--<![endif]-->
    
                      
                        <div align="center" class="img-container center  autowidth  fullwidth " style="padding-right: 0px;  padding-left: 0px;">
    <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr style="line-height:0px;line-height:0px;"><td style="padding-right: 0px; padding-left: 0px;" align="center"><![endif]-->
      <img class="center  autowidth  fullwidth" align="center" border="0" src="https://d1oco4z2z1fhwp.cloudfront.net/templates/default/20/rounder-dwn.png" alt="Image" title="Image" style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: block !important;border: 0;height: auto;float: none;width: 100%;max-width: 600px" width="600">
    <!--[if mso]></td></tr></table><![endif]-->
    </div>
    
                      
                      
                        
    <table border="0" cellpadding="0" cellspacing="0" width="100%" class="divider " style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;min-width: 100%;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%">
        <tbody>
            <tr style="vertical-align: top">
                <td class="divider_inner" style="word-break: break-word;border-collapse: collapse !important;vertical-align: top;padding-right: 30px;padding-left: 30px;padding-top: 30px;padding-bottom: 30px;min-width: 100%;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%">
                    <table class="divider_content" align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;border-top: 0px solid transparent;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%">
                        <tbody>
                            <tr style="vertical-align: top">
                                <td style="word-break: break-word;border-collapse: collapse !important;vertical-align: top;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%">
                                    <span></span>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </td>
            </tr>
        </tbody>
    </table>
                      
                  <!--[if (!mso)&(!IE)]><!--></div><!--<![endif]-->
                  </div>
                </div>
              <!--[if (mso)|(IE)]></td></tr></table></td></tr></table><![endif]-->
            </div>
          </div>
        </div>
       <!--[if (mso)|(IE)]></td></tr></table><![endif]-->
            </td>
      </tr>
      </tbody>
      </table>
      <!--[if (mso)|(IE)]></div><![endif]-->
    
    
    </body></html>`
    
        // sendMail.sendMail(email,html,'Job Interview','Invite to interview')
      sendMail.sendMail(email, html, 'Intimation of selection at ' + job_title + ' at ' + emp_name)
        setting.save_notification(student_id,emp_id,vacancy_id,"Interview was successfully completed","5")
        setting.status_history(student_id,vacancy_id,"5")

    }

    else if(status==="6") //offer rejected   student
    {

        html=`<!DOCTYPE HTML PUBLIC "-//W3C//DTD XHTML 1.0 Transitional //EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd"><html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office"><head>
        <!--[if gte mso 9]><xml>
         <o:OfficeDocumentSettings>
          <o:AllowPNG/>
          <o:PixelsPerInch>96</o:PixelsPerInch>
         </o:OfficeDocumentSettings>
        </xml><![endif]-->
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
        <meta name="viewport" content="width=device-width">
        <!--[if !mso]><!--><meta http-equiv="X-UA-Compatible" content="IE=edge"><!--<![endif]-->
        <title></title>
        <!--[if !mso]><!-- -->
        <link href="https://fonts.googleapis.com/css?family=Montserrat" rel="stylesheet" type="text/css">
        <!--<![endif]-->
        
        <style type="text/css" id="media-query">
          body {
      margin: 0;
      padding: 0; }
    
    table, tr, td {
      vertical-align: top;
      border-collapse: collapse; }
    
    .ie-browser table, .mso-container table {
      table-layout: fixed; }
    
    * {
      line-height: inherit; }
    
    a[x-apple-data-detectors=true] {
      color: inherit !important;
      text-decoration: none !important; }
    
    [owa] .img-container div, [owa] .img-container button {
      display: block !important; }
    
    [owa] .fullwidth button {
      width: 100% !important; }
    
    [owa] .block-grid .col {
      display: table-cell;
      float: none !important;
      vertical-align: top; }
    
    .ie-browser .num12, .ie-browser .block-grid, [owa] .num12, [owa] .block-grid {
      width: 600px !important; }
    
    .ExternalClass, .ExternalClass p, .ExternalClass span, .ExternalClass font, .ExternalClass td, .ExternalClass div {
      line-height: 100%; }
    
    .ie-browser .mixed-two-up .num4, [owa] .mixed-two-up .num4 {
      width: 200px !important; }
    
    .ie-browser .mixed-two-up .num8, [owa] .mixed-two-up .num8 {
      width: 400px !important; }
    
    .ie-browser .block-grid.two-up .col, [owa] .block-grid.two-up .col {
      width: 300px !important; }
    
    .ie-browser .block-grid.three-up .col, [owa] .block-grid.three-up .col {
      width: 200px !important; }
    
    .ie-browser .block-grid.four-up .col, [owa] .block-grid.four-up .col {
      width: 150px !important; }
    
    .ie-browser .block-grid.five-up .col, [owa] .block-grid.five-up .col {
      width: 120px !important; }
    
    .ie-browser .block-grid.six-up .col, [owa] .block-grid.six-up .col {
      width: 100px !important; }
    
    .ie-browser .block-grid.seven-up .col, [owa] .block-grid.seven-up .col {
      width: 85px !important; }
    
    .ie-browser .block-grid.eight-up .col, [owa] .block-grid.eight-up .col {
      width: 75px !important; }
    
    .ie-browser .block-grid.nine-up .col, [owa] .block-grid.nine-up .col {
      width: 66px !important; }
    
    .ie-browser .block-grid.ten-up .col, [owa] .block-grid.ten-up .col {
      width: 60px !important; }
    
    .ie-browser .block-grid.eleven-up .col, [owa] .block-grid.eleven-up .col {
      width: 54px !important; }
    
    .ie-browser .block-grid.twelve-up .col, [owa] .block-grid.twelve-up .col {
      width: 50px !important; }
    
    @media only screen and (min-width: 620px) {
      .block-grid {
        width: 600px !important; }
      .block-grid .col {
        vertical-align: top; }
        .block-grid .col.num12 {
          width: 600px !important; }
      .block-grid.mixed-two-up .col.num4 {
        width: 200px !important; }
      .block-grid.mixed-two-up .col.num8 {
        width: 400px !important; }
      .block-grid.two-up .col {
        width: 300px !important; }
      .block-grid.three-up .col {
        width: 200px !important; }
      .block-grid.four-up .col {
        width: 150px !important; }
      .block-grid.five-up .col {
        width: 120px !important; }
      .block-grid.six-up .col {
        width: 100px !important; }
      .block-grid.seven-up .col {
        width: 85px !important; }
      .block-grid.eight-up .col {
        width: 75px !important; }
      .block-grid.nine-up .col {
        width: 66px !important; }
      .block-grid.ten-up .col {
        width: 60px !important; }
      .block-grid.eleven-up .col {
        width: 54px !important; }
      .block-grid.twelve-up .col {
        width: 50px !important; } }
    
    @media (max-width: 620px) {
      .block-grid, .col {
        min-width: 320px !important;
        max-width: 100% !important;
        display: block !important; }
      .block-grid {
        width: calc(100% - 40px) !important; }
      .col {
        width: 100% !important; }
        .col > div {
          margin: 0 auto; }
      img.fullwidth, img.fullwidthOnMobile {
        max-width: 100% !important; }
      .no-stack .col {
        min-width: 0 !important;
        display: table-cell !important; }
      .no-stack.two-up .col {
        width: 50% !important; }
      .no-stack.mixed-two-up .col.num4 {
        width: 33% !important; }
      .no-stack.mixed-two-up .col.num8 {
        width: 66% !important; }
      .no-stack.three-up .col.num4 {
        width: 33% !important; }
      .no-stack.four-up .col.num3 {
        width: 25% !important; }
      .mobile_hide {
        min-height: 0px;
        max-height: 0px;
        max-width: 0px;
        display: none;
        overflow: hidden;
        font-size: 0px; } }
    
        </style>
    </head>
    <body class="clean-body" style="margin: 0;padding: 0;-webkit-text-size-adjust: 100%;background-color: #e2eace">
      <style type="text/css" id="media-query-bodytag">
        @media (max-width: 520px) {
          .block-grid {
            min-width: 320px!important;
            max-width: 100%!important;
            width: 100%!important;
            display: block!important;
          }
    
          .col {
            min-width: 320px!important;
            max-width: 100%!important;
            width: 100%!important;
            display: block!important;
          }
    
            .col > div {
              margin: 0 auto;
            }
    
          img.fullwidth {
            max-width: 100%!important;
          }
                img.fullwidthOnMobile {
            max-width: 100%!important;
          }
          .no-stack .col {
                    min-width: 0!important;
                    display: table-cell!important;
                }
                .no-stack.two-up .col {
                    width: 50%!important;
                }
                .no-stack.mixed-two-up .col.num4 {
                    width: 33%!important;
                }
                .no-stack.mixed-two-up .col.num8 {
                    width: 66%!important;
                }
                .no-stack.three-up .col.num4 {
                    width: 33%!important;
                }
                .no-stack.four-up .col.num3 {
                    width: 25%!important;
                }
          .mobile_hide {
            min-height: 0px!important;
            max-height: 0px!important;
            max-width: 0px!important;
            display: none!important;
            overflow: hidden!important;
            font-size: 0px!important;
          }
        }
      </style>
      <!--[if IE]><div class="ie-browser"><![endif]-->
      <!--[if mso]><div class="mso-container"><![endif]-->
      <table class="nl-container" style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;min-width: 320px;Margin: 0 auto;background-color: #e2eace;width: 100%" cellpadding="0" cellspacing="0">
        <tbody>
        <tr style="vertical-align: top">
            <td style="word-break: break-word;border-collapse: collapse !important;vertical-align: top">
        <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td align="center" style="background-color: #e2eace;"><![endif]-->
    
        <div style="background-color:transparent;">
          <div style="Margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: transparent;" class="block-grid ">
            <div style="border-collapse: collapse;display: table;width: 100%;background-color:transparent;">
              <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="background-color:transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width: 600px;"><tr class="layout-full-width" style="background-color:transparent;"><![endif]-->
    
                  <!--[if (mso)|(IE)]><td align="center" width="600" style=" width:600px; padding-right: 0px; padding-left: 0px; padding-top:5px; padding-bottom:0px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;" valign="top"><![endif]-->
                <div class="col num12" style="min-width: 320px;max-width: 600px;display: table-cell;vertical-align: top;">
                  <div style="background-color: transparent; width: 100% !important;">
                  <!--[if (!mso)&(!IE)]><!--><div style="border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent; padding-top:5px; padding-bottom:0px; padding-right: 0px; padding-left: 0px;"><!--<![endif]-->
    
                      
                        <div align="center" class="img-container center  autowidth  fullwidth " style="padding-right: 0px;  padding-left: 0px;">
    <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr style="line-height:0px;line-height:0px;"><td style="padding-right: 0px; padding-left: 0px;" align="center"><![endif]-->
    <div style="line-height:25px;font-size:1px">&#160;</div>  <img class="center  autowidth  fullwidth" align="center" border="0" src="https://d1oco4z2z1fhwp.cloudfront.net/templates/default/20/rounder-up.png" alt="Image" title="Image" style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: block !important;border: 0;height: auto;float: none;width: 100%;max-width: 600px" width="600">
    <!--[if mso]></td></tr></table><![endif]-->
    </div>
    
                      
                  <!--[if (!mso)&(!IE)]><!--></div><!--<![endif]-->
                  </div>
                </div>
              <!--[if (mso)|(IE)]></td></tr></table></td></tr></table><![endif]-->
            </div>
          </div>
        </div>
        <div style="background-color:transparent;">
          <div style="Margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: #FFFFFF;" class="block-grid ">
            <div style="border-collapse: collapse;display: table;width: 100%;background-color:#FFFFFF;">
              <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="background-color:transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width: 600px;"><tr class="layout-full-width" style="background-color:#FFFFFF;"><![endif]-->
    
                  <!--[if (mso)|(IE)]><td align="center" width="600" style=" width:600px; padding-right: 0px; padding-left: 0px; padding-top:5px; padding-bottom:5px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;" valign="top"><![endif]-->
                <div class="col num12" style="min-width: 320px;max-width: 600px;display: table-cell;vertical-align: top;">
                  <div style="background-color: transparent; width: 100% !important;">
                  <!--[if (!mso)&(!IE)]><!--><div style="border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent; padding-top:5px; padding-bottom:5px; padding-right: 0px; padding-left: 0px;"><!--<![endif]-->
    
                      
                        <div align="center" class="img-container center  autowidth  " style="padding-right: 0px;  padding-left: 0px;">
    <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr style="line-height:0px;line-height:0px;"><td style="padding-right: 0px; padding-left: 0px;" align="center"><![endif]-->
      <img class="center  autowidth " align="center" border="0" src="https://i.imgur.com/FrVRrnL.png" alt="Image" title="Image" style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: block !important;border: 0;height: auto;float: none;width: 100%;max-width: 250px" width="250">
    <!--[if mso]></td></tr></table><![endif]-->
    </div>
    
                      
                      
                        <div class="">
        <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 10px; padding-left: 10px; padding-top: 10px; padding-bottom: 10px;"><![endif]-->
        <div style="color:#555555;font-family:'Montserrat', 'Trebuchet MS', 'Lucida Grande', 'Lucida Sans Unicode', 'Lucida Sans', Tahoma, sans-serif;line-height:150%; padding-right: 10px; padding-left: 10px; padding-top: 10px; padding-bottom: 10px;"> 
            <div style="font-size:12px;line-height:18px;color:#555555;font-family:'Montserrat', 'Trebuchet MS', 'Lucida Grande', 'Lucida Sans Unicode', 'Lucida Sans', Tahoma, sans-serif;text-align:left;"><p style="margin: 0;font-size: 14px;line-height: 21px;text-align: center"></p></div>    
        </div>
        <!--[if mso]></td></tr></table><![endif]-->
    </div>
                      
                  <!--[if (!mso)&(!IE)]><!--></div><!--<![endif]-->
                  </div>
                </div>
              <!--[if (mso)|(IE)]></td></tr></table></td></tr></table><![endif]-->
            </div>
          </div>
        </div>
        <div style="background-color:transparent;">
          <div style="Margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: #FFFFFF;" class="block-grid ">
            <div style="border-collapse: collapse;display: table;width: 100%;background-color:#FFFFFF;">
              <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="background-color:transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width: 600px;"><tr class="layout-full-width" style="background-color:#FFFFFF;"><![endif]-->
    
                  <!--[if (mso)|(IE)]><td align="center" width="600" style=" width:600px; padding-right: 0px; padding-left: 0px; padding-top:0px; padding-bottom:5px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;" valign="top"><![endif]-->
                <div class="col num12" style="min-width: 320px;max-width: 600px;display: table-cell;vertical-align: top;">
                  <div style="background-color: transparent; width: 100% !important;">
                  <!--[if (!mso)&(!IE)]><!--><div style="border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent; padding-top:0px; padding-bottom:5px; padding-right: 0px; padding-left: 0px;"><!--<![endif]-->
    
                      
                        <div class="">
        <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 10px; padding-left: 10px; padding-top: 10px; padding-bottom: 10px;"><![endif]-->
        <div style="color:#0D0D0D;font-family:'Montserrat', 'Trebuchet MS', 'Lucida Grande', 'Lucida Sans Unicode', 'Lucida Sans', Tahoma, sans-serif;line-height:120%; padding-right: 10px; padding-left: 10px; padding-top: 10px; padding-bottom: 10px;"> 
            <div style="font-size:12px;line-height:14px;color:#0D0D0D;font-family:'Montserrat', 'Trebuchet MS', 'Lucida Grande', 'Lucida Sans Unicode', 'Lucida Sans', Tahoma, sans-serif;text-align:left;">
          <p style="margin: 0;font-size: 14px;line-height: 17px;text-align: center">
           <strong> 
          <span style="font-size: 28px; line-height: 33px;">
          Dear ` + emp_name + `,
        </span> </strong> <br><br>
    
               <div style="text-align: left;">  <span style="line-height: 33px; font-size: 20px;">
                
          </span></div>
      </p></div>    
        </div>
        <!--[if mso]></td></tr></table><![endif]-->
    </div>
                      
                      
                        <div align="center" class="img-container center  autowidth  " style="padding-right: 0px;  padding-left: 0px;">
    <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr style="line-height:0px;line-height:0px;"><td style="padding-right: 0px; padding-left: 0px;" align="center"><![endif]-->
      <img class="center  autowidth " align="center" border="0" src="https://d1oco4z2z1fhwp.cloudfront.net/templates/default/20/divider.png" alt="Image" title="Image" style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: block !important;border: 0;height: auto;float: none;width: 100%;max-width: 316px" width="316">
    <!--[if mso]></td></tr></table><![endif]-->
    </div>
    
                      
                      
                        <div class="">
        <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 10px; padding-left: 10px; padding-top: 10px; padding-bottom: 10px;"><![endif]-->
        <div style="color:#555555;font-family:'Montserrat', 'Trebuchet MS', 'Lucida Grande', 'Lucida Sans Unicode', 'Lucida Sans', Tahoma, sans-serif;line-height:150%; padding-right: 10px; padding-left: 10px; padding-top: 10px; padding-bottom: 10px;"> 
            
        </div>
        <!--[if mso]></td></tr></table><![endif]-->
    </div>
                      
                      
                        <div class="">
        <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 10px; padding-left: 10px; padding-top: 20px; padding-bottom: 10px;"><![endif]-->
        <div style="color:#0D0D0D;font-family:'Montserrat', 'Trebuchet MS', 'Lucida Grande', 'Lucida Sans Unicode', 'Lucida Sans', Tahoma, sans-serif;line-height:150%; padding-right: 10px; padding-left: 10px; padding-top: 20px; padding-bottom: 10px;"> 
            <div style="font-size:12px;line-height:18px;color:#0D0D0D;font-family:'Montserrat', 'Trebuchet MS', 'Lucida Grande', 'Lucida Sans Unicode', 'Lucida Sans', Tahoma, sans-serif;text-align:left;"><p style="margin: 0;font-size: 14px;line-height: 21px;text-align: center">Your offer invitation for the position of ` + job_title + ` has been rejected by `+ name +`. You can try more potential candidates through the application.
            </p></div>  
        </div>
        <!--[if mso]></td></tr></table><![endif]-->
    </div>
                      
                      
                        
    <div align="center" class="button-container center " style="padding-right: 10px; padding-left: 10px; padding-top:25px; padding-bottom:10px;">
      <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0" style="border-spacing: 0; border-collapse: collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;"><tr><td style="padding-right: 10px; padding-left: 10px; padding-top:25px; padding-bottom:10px;" align="center"><v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="" style="height:46pt; v-text-anchor:middle; width:151pt;" arcsize="7%" strokecolor="#a8bf6f" fillcolor="#a8bf6f"><w:anchorlock/><v:textbox inset="0,0,0,0"><center style="color:#ffffff; font-family:'Montserrat', 'Trebuchet MS', 'Lucida Grande', 'Lucida Sans Unicode', 'Lucida Sans', Tahoma, sans-serif; font-size:16px;"><![endif]-->
        <div style="color: #ffffff; background-color: #a8bf6f; border-radius: 4px; -webkit-border-radius: 4px; -moz-border-radius: 4px; max-width: 202px; width: 172px;width: auto; border-top: 0px solid transparent; border-right: 0px solid transparent; border-bottom: 0px solid transparent; border-left: 0px solid transparent; padding-top: 15px; padding-right: 15px; padding-bottom: 15px; padding-left: 15px; font-family: 'Montserrat', 'Trebuchet MS', 'Lucida Grande', 'Lucida Sans Unicode', 'Lucida Sans', Tahoma, sans-serif; text-align: center; mso-border-alt: none;">
          <span style="font-size:16px;line-height:32px;"><a href="`+ variables.WEB_LINK_EMPLOYER +`" style="text-decoration : none; color : #fff;"><strong>GoTo Application</strong></a></span>
        </div>
      <!--[if mso]></center></v:textbox></v:roundrect></td></tr></table><![endif]-->
    </div>
    
                      
                      
                        
    <table border="0" cellpadding="0" cellspacing="0" width="100%" class="divider " style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;min-width: 100%;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%">
        <tbody>
            <tr style="vertical-align: top">
                <td class="divider_inner" style="word-break: break-word;border-collapse: collapse !important;vertical-align: top;padding-right: 10px;padding-left: 10px;padding-top: 30px;padding-bottom: 10px;min-width: 100%;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%">
                    <table class="divider_content" align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;border-top: 0px solid transparent;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%">
                        <tbody>
                            <tr style="vertical-align: top">
                                <td style="word-break: break-word;border-collapse: collapse !important;vertical-align: top;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%">
                                    <span></span>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </td>
            </tr>
        </tbody>
    </table>
                      
                  <!--[if (!mso)&(!IE)]><!--></div><!--<![endif]-->
                  </div>
                </div>
              <!--[if (mso)|(IE)]></td></tr></table></td></tr></table><![endif]-->
            </div>
          </div>
        </div>
        <div style="background-color:transparent;">
          <div style="Margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: #525252;" class="block-grid three-up ">
            <div style="border-collapse: collapse;display: table;width: 100%;background-color:#525252;">
              <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="background-color:transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width: 600px;"><tr class="layout-full-width" style="background-color:#525252;"><![endif]-->
    
                  <!--[if (mso)|(IE)]><td align="center" width="200" style=" width:200px; padding-right: 0px; padding-left: 0px; padding-top:0px; padding-bottom:0px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;" valign="top"><![endif]-->
                <div class="col num4" style="max-width: 320px;min-width: 200px;display: table-cell;vertical-align: top;">
                  <div style="background-color: transparent; width: 100% !important;">
                  <!--[if (!mso)&(!IE)]><!--><div style="border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent; padding-top:0px; padding-bottom:0px; padding-right: 0px; padding-left: 0px;"><!--<![endif]-->
    
                      
                        
    <div align="center" style="padding-right: 0px; padding-left: 0px; padding-bottom: 0px;" class="">
      <div style="line-height:15px;font-size:1px">&#160;</div>
      <div style="display: table; max-width:131px;">
      <!--[if (mso)|(IE)]><table width="131" cellpadding="0" cellspacing="0" border="0"><tr><td style="border-collapse:collapse; padding-right: 0px; padding-left: 0px; padding-bottom: 0px;"  align="center"><table width="100%" cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse; mso-table-lspace: 0pt;mso-table-rspace: 0pt; width:131px;"><tr><td width="32" style="width:32px; padding-right: 5px;" valign="top"><![endif]-->
        <table align="left" border="0" cellspacing="0" cellpadding="0" width="32" height="32" style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;Margin-right: 5px">
          <tbody><tr style="vertical-align: top"><td align="left" valign="middle" style="word-break: break-word;border-collapse: collapse !important;vertical-align: top">
            
          <div style="line-height:5px;font-size:1px">&#160;</div>
          </td></tr>
        </tbody></table>
          <!--[if (mso)|(IE)]></td><td width="32" style="width:32px; padding-right: 5px;" valign="top"><![endif]-->
        <table align="left" border="0" cellspacing="0" cellpadding="0" width="32" height="32" style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;Margin-right: 5px">
          <tbody><tr style="vertical-align: top"><td align="left" valign="middle" style="word-break: break-word;border-collapse: collapse !important;vertical-align: top">
            
          <div style="line-height:5px;font-size:1px">&#160;</div>
          </td></tr>
        </tbody></table>
          <!--[if (mso)|(IE)]></td><td width="32" style="width:32px; padding-right: 0;" valign="top"><![endif]-->
        <table align="left" border="0" cellspacing="0" cellpadding="0" width="32" height="32" style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;Margin-right: 0">
          <tbody><tr style="vertical-align: top"><td align="left" valign="middle" style="word-break: break-word;border-collapse: collapse !important;vertical-align: top">
            
          <div style="line-height:5px;font-size:1px">&#160;</div>
          </td></tr>
        </tbody></table>
        <!--[if (mso)|(IE)]></td></tr></table></td></tr></table><![endif]-->
      </div>
    </div>
                      
                  <!--[if (!mso)&(!IE)]><!--></div><!--<![endif]-->
                  </div>
                </div>
                  <!--[if (mso)|(IE)]></td><td align="center" width="200" style=" width:200px; padding-right: 0px; padding-left: 0px; padding-top:5px; padding-bottom:5px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;" valign="top"><![endif]-->
                <div class="col num4" style="max-width: 320px;min-width: 200px;display: table-cell;vertical-align: top;">
                  <div style="background-color: transparent; width: 100% !important;">
                  <!--[if (!mso)&(!IE)]><!--><div style="border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent; padding-top:5px; padding-bottom:5px; padding-right: 0px; padding-left: 0px;"><!--<![endif]-->
    
                      
                        <div class="">
        <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 0px; padding-left: 0px; padding-top: 20px; padding-bottom: 0px;"><![endif]-->
        <div style="color:#a8bf6f;font-family:'Montserrat', 'Trebuchet MS', 'Lucida Grande', 'Lucida Sans Unicode', 'Lucida Sans', Tahoma, sans-serif;line-height:120%; padding-right: 0px; padding-left: 0px; padding-top: 20px; padding-bottom: 0px;">    
            <div style="font-size:12px;line-height:14px;color:#a8bf6f;font-family:'Montserrat', 'Trebuchet MS', 'Lucida Grande', 'Lucida Sans Unicode', 'Lucida Sans', Tahoma, sans-serif;text-align:left;"><p style="margin: 0;font-size: 12px;line-height: 14px;text-align: center"><span style="color: rgb(255, 255, 255); font-size: 12px; line-height: 14px;"><span style="font-size: 12px; line-height: 14px; color: rgb(168, 191, 111);">CAS SHRC | Bridging Talents and Opportunities</div> 
        </div>
        <!--[if mso]></td></tr></table><![endif]-->
    </div>
                      
                  <!--[if (!mso)&(!IE)]><!--></div><!--<![endif]-->
                  </div>
                </div>
                  <!--[if (mso)|(IE)]></td><td align="center" width="200" style=" width:200px; padding-right: 0px; padding-left: 0px; padding-top:5px; padding-bottom:5px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;" valign="top"><![endif]-->
                <div class="col num4" style="max-width: 320px;min-width: 200px;display: table-cell;vertical-align: top;">
                  <div style="background-color: transparent; width: 100% !important;">
                  <!--[if (!mso)&(!IE)]><!--><div style="border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent; padding-top:5px; padding-bottom:5px; padding-right: 0px; padding-left: 0px;"><!--<![endif]-->
    
                      
                        <div class="">
        <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 0px; padding-left: 0px; padding-top: 20px; padding-bottom: 0px;"><![endif]-->
        
        <!--[if mso]></td></tr></table><![endif]-->
    </div>
                      
                  <!--[if (!mso)&(!IE)]><!--></div><!--<![endif]-->
                  </div>
                </div>
              <!--[if (mso)|(IE)]></td></tr></table></td></tr></table><![endif]-->
            </div>
          </div>
        </div>
        <div style="background-color:transparent;">
          <div style="Margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: transparent;" class="block-grid ">
            <div style="border-collapse: collapse;display: table;width: 100%;background-color:transparent;">
              <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="background-color:transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width: 600px;"><tr class="layout-full-width" style="background-color:transparent;"><![endif]-->
    
                  <!--[if (mso)|(IE)]><td align="center" width="600" style=" width:600px; padding-right: 0px; padding-left: 0px; padding-top:0px; padding-bottom:5px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;" valign="top"><![endif]-->
                <div class="col num12" style="min-width: 320px;max-width: 600px;display: table-cell;vertical-align: top;">
                  <div style="background-color: transparent; width: 100% !important;">
                  <!--[if (!mso)&(!IE)]><!--><div style="border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent; padding-top:0px; padding-bottom:5px; padding-right: 0px; padding-left: 0px;"><!--<![endif]-->
    
                      
                        <div align="center" class="img-container center  autowidth  fullwidth " style="padding-right: 0px;  padding-left: 0px;">
    <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr style="line-height:0px;line-height:0px;"><td style="padding-right: 0px; padding-left: 0px;" align="center"><![endif]-->
      <img class="center  autowidth  fullwidth" align="center" border="0" src="https://d1oco4z2z1fhwp.cloudfront.net/templates/default/20/rounder-dwn.png" alt="Image" title="Image" style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: block !important;border: 0;height: auto;float: none;width: 100%;max-width: 600px" width="600">
    <!--[if mso]></td></tr></table><![endif]-->
    </div>
    
                      
                      
                        
    <table border="0" cellpadding="0" cellspacing="0" width="100%" class="divider " style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;min-width: 100%;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%">
        <tbody>
            <tr style="vertical-align: top">
                <td class="divider_inner" style="word-break: break-word;border-collapse: collapse !important;vertical-align: top;padding-right: 30px;padding-left: 30px;padding-top: 30px;padding-bottom: 30px;min-width: 100%;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%">
                    <table class="divider_content" align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;border-top: 0px solid transparent;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%">
                        <tbody>
                            <tr style="vertical-align: top">
                                <td style="word-break: break-word;border-collapse: collapse !important;vertical-align: top;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%">
                                    <span></span>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </td>
            </tr>
        </tbody>
    </table>
                      
                  <!--[if (!mso)&(!IE)]><!--></div><!--<![endif]-->
                  </div>
                </div>
              <!--[if (mso)|(IE)]></td></tr></table></td></tr></table><![endif]-->
            </div>
          </div>
        </div>
       <!--[if (mso)|(IE)]></td></tr></table><![endif]-->
            </td>
      </tr>
      </tbody>
      </table>
      <!--[if (mso)|(IE)]></div><![endif]-->
    
    
    </body></html>`
    
        // sendMail.sendMail(email,html,'Job Interview','Invite to interview')
        sendMail.sendMail(emp_email,html,'CAS SHRC: Offer Request Rejected')
        setting.save_notification(student_id,emp_id,vacancy_id,"Job offer was rejected","6")
        setting.status_history(student_id,vacancy_id,"6")

    }

    else if(status==="7") //offer given   student
    {

        html=`<!DOCTYPE HTML PUBLIC "-//W3C//DTD XHTML 1.0 Transitional //EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd"><html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office"><head>
        <!--[if gte mso 9]><xml>
         <o:OfficeDocumentSettings>
          <o:AllowPNG/>
          <o:PixelsPerInch>96</o:PixelsPerInch>
         </o:OfficeDocumentSettings>
        </xml><![endif]-->
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
        <meta name="viewport" content="width=device-width">
        <!--[if !mso]><!--><meta http-equiv="X-UA-Compatible" content="IE=edge"><!--<![endif]-->
        <title></title>
        <!--[if !mso]><!-- -->
        <link href="https://fonts.googleapis.com/css?family=Montserrat" rel="stylesheet" type="text/css">
        <!--<![endif]-->
        
        <style type="text/css" id="media-query">
          body {
      margin: 0;
      padding: 0; }
    
    table, tr, td {
      vertical-align: top;
      border-collapse: collapse; }
    
    .ie-browser table, .mso-container table {
      table-layout: fixed; }
    
    * {
      line-height: inherit; }
    
    a[x-apple-data-detectors=true] {
      color: inherit !important;
      text-decoration: none !important; }
    
    [owa] .img-container div, [owa] .img-container button {
      display: block !important; }
    
    [owa] .fullwidth button {
      width: 100% !important; }
    
    [owa] .block-grid .col {
      display: table-cell;
      float: none !important;
      vertical-align: top; }
    
    .ie-browser .num12, .ie-browser .block-grid, [owa] .num12, [owa] .block-grid {
      width: 600px !important; }
    
    .ExternalClass, .ExternalClass p, .ExternalClass span, .ExternalClass font, .ExternalClass td, .ExternalClass div {
      line-height: 100%; }
    
    .ie-browser .mixed-two-up .num4, [owa] .mixed-two-up .num4 {
      width: 200px !important; }
    
    .ie-browser .mixed-two-up .num8, [owa] .mixed-two-up .num8 {
      width: 400px !important; }
    
    .ie-browser .block-grid.two-up .col, [owa] .block-grid.two-up .col {
      width: 300px !important; }
    
    .ie-browser .block-grid.three-up .col, [owa] .block-grid.three-up .col {
      width: 200px !important; }
    
    .ie-browser .block-grid.four-up .col, [owa] .block-grid.four-up .col {
      width: 150px !important; }
    
    .ie-browser .block-grid.five-up .col, [owa] .block-grid.five-up .col {
      width: 120px !important; }
    
    .ie-browser .block-grid.six-up .col, [owa] .block-grid.six-up .col {
      width: 100px !important; }
    
    .ie-browser .block-grid.seven-up .col, [owa] .block-grid.seven-up .col {
      width: 85px !important; }
    
    .ie-browser .block-grid.eight-up .col, [owa] .block-grid.eight-up .col {
      width: 75px !important; }
    
    .ie-browser .block-grid.nine-up .col, [owa] .block-grid.nine-up .col {
      width: 66px !important; }
    
    .ie-browser .block-grid.ten-up .col, [owa] .block-grid.ten-up .col {
      width: 60px !important; }
    
    .ie-browser .block-grid.eleven-up .col, [owa] .block-grid.eleven-up .col {
      width: 54px !important; }
    
    .ie-browser .block-grid.twelve-up .col, [owa] .block-grid.twelve-up .col {
      width: 50px !important; }
    
    @media only screen and (min-width: 620px) {
      .block-grid {
        width: 600px !important; }
      .block-grid .col {
        vertical-align: top; }
        .block-grid .col.num12 {
          width: 600px !important; }
      .block-grid.mixed-two-up .col.num4 {
        width: 200px !important; }
      .block-grid.mixed-two-up .col.num8 {
        width: 400px !important; }
      .block-grid.two-up .col {
        width: 300px !important; }
      .block-grid.three-up .col {
        width: 200px !important; }
      .block-grid.four-up .col {
        width: 150px !important; }
      .block-grid.five-up .col {
        width: 120px !important; }
      .block-grid.six-up .col {
        width: 100px !important; }
      .block-grid.seven-up .col {
        width: 85px !important; }
      .block-grid.eight-up .col {
        width: 75px !important; }
      .block-grid.nine-up .col {
        width: 66px !important; }
      .block-grid.ten-up .col {
        width: 60px !important; }
      .block-grid.eleven-up .col {
        width: 54px !important; }
      .block-grid.twelve-up .col {
        width: 50px !important; } }
    
    @media (max-width: 620px) {
      .block-grid, .col {
        min-width: 320px !important;
        max-width: 100% !important;
        display: block !important; }
      .block-grid {
        width: calc(100% - 40px) !important; }
      .col {
        width: 100% !important; }
        .col > div {
          margin: 0 auto; }
      img.fullwidth, img.fullwidthOnMobile {
        max-width: 100% !important; }
      .no-stack .col {
        min-width: 0 !important;
        display: table-cell !important; }
      .no-stack.two-up .col {
        width: 50% !important; }
      .no-stack.mixed-two-up .col.num4 {
        width: 33% !important; }
      .no-stack.mixed-two-up .col.num8 {
        width: 66% !important; }
      .no-stack.three-up .col.num4 {
        width: 33% !important; }
      .no-stack.four-up .col.num3 {
        width: 25% !important; }
      .mobile_hide {
        min-height: 0px;
        max-height: 0px;
        max-width: 0px;
        display: none;
        overflow: hidden;
        font-size: 0px; } }
    
        </style>
    </head>
    <body class="clean-body" style="margin: 0;padding: 0;-webkit-text-size-adjust: 100%;background-color: #e2eace">
      <style type="text/css" id="media-query-bodytag">
        @media (max-width: 520px) {
          .block-grid {
            min-width: 320px!important;
            max-width: 100%!important;
            width: 100%!important;
            display: block!important;
          }
    
          .col {
            min-width: 320px!important;
            max-width: 100%!important;
            width: 100%!important;
            display: block!important;
          }
    
            .col > div {
              margin: 0 auto;
            }
    
          img.fullwidth {
            max-width: 100%!important;
          }
                img.fullwidthOnMobile {
            max-width: 100%!important;
          }
          .no-stack .col {
                    min-width: 0!important;
                    display: table-cell!important;
                }
                .no-stack.two-up .col {
                    width: 50%!important;
                }
                .no-stack.mixed-two-up .col.num4 {
                    width: 33%!important;
                }
                .no-stack.mixed-two-up .col.num8 {
                    width: 66%!important;
                }
                .no-stack.three-up .col.num4 {
                    width: 33%!important;
                }
                .no-stack.four-up .col.num3 {
                    width: 25%!important;
                }
          .mobile_hide {
            min-height: 0px!important;
            max-height: 0px!important;
            max-width: 0px!important;
            display: none!important;
            overflow: hidden!important;
            font-size: 0px!important;
          }
        }
      </style>
      <!--[if IE]><div class="ie-browser"><![endif]-->
      <!--[if mso]><div class="mso-container"><![endif]-->
      <table class="nl-container" style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;min-width: 320px;Margin: 0 auto;background-color: #e2eace;width: 100%" cellpadding="0" cellspacing="0">
        <tbody>
        <tr style="vertical-align: top">
            <td style="word-break: break-word;border-collapse: collapse !important;vertical-align: top">
        <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td align="center" style="background-color: #e2eace;"><![endif]-->
    
        <div style="background-color:transparent;">
          <div style="Margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: transparent;" class="block-grid ">
            <div style="border-collapse: collapse;display: table;width: 100%;background-color:transparent;">
              <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="background-color:transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width: 600px;"><tr class="layout-full-width" style="background-color:transparent;"><![endif]-->
    
                  <!--[if (mso)|(IE)]><td align="center" width="600" style=" width:600px; padding-right: 0px; padding-left: 0px; padding-top:5px; padding-bottom:0px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;" valign="top"><![endif]-->
                <div class="col num12" style="min-width: 320px;max-width: 600px;display: table-cell;vertical-align: top;">
                  <div style="background-color: transparent; width: 100% !important;">
                  <!--[if (!mso)&(!IE)]><!--><div style="border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent; padding-top:5px; padding-bottom:0px; padding-right: 0px; padding-left: 0px;"><!--<![endif]-->
    
                      
                        <div align="center" class="img-container center  autowidth  fullwidth " style="padding-right: 0px;  padding-left: 0px;">
    <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr style="line-height:0px;line-height:0px;"><td style="padding-right: 0px; padding-left: 0px;" align="center"><![endif]-->
    <div style="line-height:25px;font-size:1px">&#160;</div>  <img class="center  autowidth  fullwidth" align="center" border="0" src="https://d1oco4z2z1fhwp.cloudfront.net/templates/default/20/rounder-up.png" alt="Image" title="Image" style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: block !important;border: 0;height: auto;float: none;width: 100%;max-width: 600px" width="600">
    <!--[if mso]></td></tr></table><![endif]-->
    </div>
    
                      
                  <!--[if (!mso)&(!IE)]><!--></div><!--<![endif]-->
                  </div>
                </div>
              <!--[if (mso)|(IE)]></td></tr></table></td></tr></table><![endif]-->
            </div>
          </div>
        </div>
        <div style="background-color:transparent;">
          <div style="Margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: #FFFFFF;" class="block-grid ">
            <div style="border-collapse: collapse;display: table;width: 100%;background-color:#FFFFFF;">
              <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="background-color:transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width: 600px;"><tr class="layout-full-width" style="background-color:#FFFFFF;"><![endif]-->
    
                  <!--[if (mso)|(IE)]><td align="center" width="600" style=" width:600px; padding-right: 0px; padding-left: 0px; padding-top:5px; padding-bottom:5px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;" valign="top"><![endif]-->
                <div class="col num12" style="min-width: 320px;max-width: 600px;display: table-cell;vertical-align: top;">
                  <div style="background-color: transparent; width: 100% !important;">
                  <!--[if (!mso)&(!IE)]><!--><div style="border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent; padding-top:5px; padding-bottom:5px; padding-right: 0px; padding-left: 0px;"><!--<![endif]-->
    
                      
                        <div align="center" class="img-container center  autowidth  " style="padding-right: 0px;  padding-left: 0px;">
    <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr style="line-height:0px;line-height:0px;"><td style="padding-right: 0px; padding-left: 0px;" align="center"><![endif]-->
      <img class="center  autowidth " align="center" border="0" src="https://i.imgur.com/FrVRrnL.png" alt="Image" title="Image" style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: block !important;border: 0;height: auto;float: none;width: 100%;max-width: 250px" width="250">
    <!--[if mso]></td></tr></table><![endif]-->
    </div>
    
                      
                      
                        <div class="">
        <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 10px; padding-left: 10px; padding-top: 10px; padding-bottom: 10px;"><![endif]-->
        <div style="color:#555555;font-family:'Montserrat', 'Trebuchet MS', 'Lucida Grande', 'Lucida Sans Unicode', 'Lucida Sans', Tahoma, sans-serif;line-height:150%; padding-right: 10px; padding-left: 10px; padding-top: 10px; padding-bottom: 10px;"> 
            <div style="font-size:12px;line-height:18px;color:#555555;font-family:'Montserrat', 'Trebuchet MS', 'Lucida Grande', 'Lucida Sans Unicode', 'Lucida Sans', Tahoma, sans-serif;text-align:left;"><p style="margin: 0;font-size: 14px;line-height: 21px;text-align: center"></p></div>    
        </div>
        <!--[if mso]></td></tr></table><![endif]-->
    </div>
                      
                  <!--[if (!mso)&(!IE)]><!--></div><!--<![endif]-->
                  </div>
                </div>
              <!--[if (mso)|(IE)]></td></tr></table></td></tr></table><![endif]-->
            </div>
          </div>
        </div>
        <div style="background-color:transparent;">
          <div style="Margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: #FFFFFF;" class="block-grid ">
            <div style="border-collapse: collapse;display: table;width: 100%;background-color:#FFFFFF;">
              <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="background-color:transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width: 600px;"><tr class="layout-full-width" style="background-color:#FFFFFF;"><![endif]-->
    
                  <!--[if (mso)|(IE)]><td align="center" width="600" style=" width:600px; padding-right: 0px; padding-left: 0px; padding-top:0px; padding-bottom:5px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;" valign="top"><![endif]-->
                <div class="col num12" style="min-width: 320px;max-width: 600px;display: table-cell;vertical-align: top;">
                  <div style="background-color: transparent; width: 100% !important;">
                  <!--[if (!mso)&(!IE)]><!--><div style="border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent; padding-top:0px; padding-bottom:5px; padding-right: 0px; padding-left: 0px;"><!--<![endif]-->
    
                      
                        <div class="">
        <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 10px; padding-left: 10px; padding-top: 10px; padding-bottom: 10px;"><![endif]-->
        <div style="color:#0D0D0D;font-family:'Montserrat', 'Trebuchet MS', 'Lucida Grande', 'Lucida Sans Unicode', 'Lucida Sans', Tahoma, sans-serif;line-height:120%; padding-right: 10px; padding-left: 10px; padding-top: 10px; padding-bottom: 10px;"> 
            <div style="font-size:12px;line-height:14px;color:#0D0D0D;font-family:'Montserrat', 'Trebuchet MS', 'Lucida Grande', 'Lucida Sans Unicode', 'Lucida Sans', Tahoma, sans-serif;text-align:left;">
          <p style="margin: 0;font-size: 14px;line-height: 17px;text-align: center">
           <strong> 
          <span style="font-size: 28px; line-height: 33px;">
          Dear ` + emp_name + `,
        </span> </strong> <br><br>
    
               <div style="text-align: left;">  <span style="line-height: 33px; font-size: 20px;">
                
          </span></div>
      </p></div>    
        </div>
        <!--[if mso]></td></tr></table><![endif]-->
    </div>
                      
                      
                        <div align="center" class="img-container center  autowidth  " style="padding-right: 0px;  padding-left: 0px;">
    <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr style="line-height:0px;line-height:0px;"><td style="padding-right: 0px; padding-left: 0px;" align="center"><![endif]-->
      <img class="center  autowidth " align="center" border="0" src="https://d1oco4z2z1fhwp.cloudfront.net/templates/default/20/divider.png" alt="Image" title="Image" style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: block !important;border: 0;height: auto;float: none;width: 100%;max-width: 316px" width="316">
    <!--[if mso]></td></tr></table><![endif]-->
    </div>
    
                      
                      
                        <div class="">
        <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 10px; padding-left: 10px; padding-top: 10px; padding-bottom: 10px;"><![endif]-->
        <div style="color:#555555;font-family:'Montserrat', 'Trebuchet MS', 'Lucida Grande', 'Lucida Sans Unicode', 'Lucida Sans', Tahoma, sans-serif;line-height:150%; padding-right: 10px; padding-left: 10px; padding-top: 10px; padding-bottom: 10px;"> 
            
        </div>
        <!--[if mso]></td></tr></table><![endif]-->
    </div>
                      
                      
                        <div class="">
        <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 10px; padding-left: 10px; padding-top: 20px; padding-bottom: 10px;"><![endif]-->
        <div style="color:#0D0D0D;font-family:'Montserrat', 'Trebuchet MS', 'Lucida Grande', 'Lucida Sans Unicode', 'Lucida Sans', Tahoma, sans-serif;line-height:150%; padding-right: 10px; padding-left: 10px; padding-top: 20px; padding-bottom: 10px;"> 
            <div style="font-size:12px;line-height:18px;color:#0D0D0D;font-family:'Montserrat', 'Trebuchet MS', 'Lucida Grande', 'Lucida Sans Unicode', 'Lucida Sans', Tahoma, sans-serif;text-align:left;"><p style="margin: 0;font-size: 14px;line-height: 21px;text-align: center">Your offer for the position of ` + job_title + ` has been accepted by `+ name +`. You may contact the student via this email: `+ email +`
            </p></div>  
        </div>
        <!--[if mso]></td></tr></table><![endif]-->
    </div>
                      
                      
                        
    <div align="center" class="button-container center " style="padding-right: 10px; padding-left: 10px; padding-top:25px; padding-bottom:10px;">
      <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0" style="border-spacing: 0; border-collapse: collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;"><tr><td style="padding-right: 10px; padding-left: 10px; padding-top:25px; padding-bottom:10px;" align="center"><v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="" style="height:46pt; v-text-anchor:middle; width:151pt;" arcsize="7%" strokecolor="#a8bf6f" fillcolor="#a8bf6f"><w:anchorlock/><v:textbox inset="0,0,0,0"><center style="color:#ffffff; font-family:'Montserrat', 'Trebuchet MS', 'Lucida Grande', 'Lucida Sans Unicode', 'Lucida Sans', Tahoma, sans-serif; font-size:16px;"><![endif]-->
        <div style="color: #ffffff; background-color: #a8bf6f; border-radius: 4px; -webkit-border-radius: 4px; -moz-border-radius: 4px; max-width: 202px; width: 172px;width: auto; border-top: 0px solid transparent; border-right: 0px solid transparent; border-bottom: 0px solid transparent; border-left: 0px solid transparent; padding-top: 15px; padding-right: 15px; padding-bottom: 15px; padding-left: 15px; font-family: 'Montserrat', 'Trebuchet MS', 'Lucida Grande', 'Lucida Sans Unicode', 'Lucida Sans', Tahoma, sans-serif; text-align: center; mso-border-alt: none;">
          <span style="font-size:16px;line-height:32px;"><a href="`+ variables.WEB_LINK_EMPLOYER +`" style="text-decoration : none; color : #fff;"><strong>GoTo Application</strong></a></span>
        </div>
      <!--[if mso]></center></v:textbox></v:roundrect></td></tr></table><![endif]-->
    </div>
    
                      
                      
                        
    <table border="0" cellpadding="0" cellspacing="0" width="100%" class="divider " style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;min-width: 100%;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%">
        <tbody>
            <tr style="vertical-align: top">
                <td class="divider_inner" style="word-break: break-word;border-collapse: collapse !important;vertical-align: top;padding-right: 10px;padding-left: 10px;padding-top: 30px;padding-bottom: 10px;min-width: 100%;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%">
                    <table class="divider_content" align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;border-top: 0px solid transparent;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%">
                        <tbody>
                            <tr style="vertical-align: top">
                                <td style="word-break: break-word;border-collapse: collapse !important;vertical-align: top;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%">
                                    <span></span>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </td>
            </tr>
        </tbody>
    </table>
                      
                  <!--[if (!mso)&(!IE)]><!--></div><!--<![endif]-->
                  </div>
                </div>
              <!--[if (mso)|(IE)]></td></tr></table></td></tr></table><![endif]-->
            </div>
          </div>
        </div>
        <div style="background-color:transparent;">
          <div style="Margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: #525252;" class="block-grid three-up ">
            <div style="border-collapse: collapse;display: table;width: 100%;background-color:#525252;">
              <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="background-color:transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width: 600px;"><tr class="layout-full-width" style="background-color:#525252;"><![endif]-->
    
                  <!--[if (mso)|(IE)]><td align="center" width="200" style=" width:200px; padding-right: 0px; padding-left: 0px; padding-top:0px; padding-bottom:0px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;" valign="top"><![endif]-->
                <div class="col num4" style="max-width: 320px;min-width: 200px;display: table-cell;vertical-align: top;">
                  <div style="background-color: transparent; width: 100% !important;">
                  <!--[if (!mso)&(!IE)]><!--><div style="border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent; padding-top:0px; padding-bottom:0px; padding-right: 0px; padding-left: 0px;"><!--<![endif]-->
    
                      
                        
    <div align="center" style="padding-right: 0px; padding-left: 0px; padding-bottom: 0px;" class="">
      <div style="line-height:15px;font-size:1px">&#160;</div>
      <div style="display: table; max-width:131px;">
      <!--[if (mso)|(IE)]><table width="131" cellpadding="0" cellspacing="0" border="0"><tr><td style="border-collapse:collapse; padding-right: 0px; padding-left: 0px; padding-bottom: 0px;"  align="center"><table width="100%" cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse; mso-table-lspace: 0pt;mso-table-rspace: 0pt; width:131px;"><tr><td width="32" style="width:32px; padding-right: 5px;" valign="top"><![endif]-->
        <table align="left" border="0" cellspacing="0" cellpadding="0" width="32" height="32" style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;Margin-right: 5px">
          <tbody><tr style="vertical-align: top"><td align="left" valign="middle" style="word-break: break-word;border-collapse: collapse !important;vertical-align: top">
            
          <div style="line-height:5px;font-size:1px">&#160;</div>
          </td></tr>
        </tbody></table>
          <!--[if (mso)|(IE)]></td><td width="32" style="width:32px; padding-right: 5px;" valign="top"><![endif]-->
        <table align="left" border="0" cellspacing="0" cellpadding="0" width="32" height="32" style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;Margin-right: 5px">
          <tbody><tr style="vertical-align: top"><td align="left" valign="middle" style="word-break: break-word;border-collapse: collapse !important;vertical-align: top">
            
          <div style="line-height:5px;font-size:1px">&#160;</div>
          </td></tr>
        </tbody></table>
          <!--[if (mso)|(IE)]></td><td width="32" style="width:32px; padding-right: 0;" valign="top"><![endif]-->
        <table align="left" border="0" cellspacing="0" cellpadding="0" width="32" height="32" style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;Margin-right: 0">
          <tbody><tr style="vertical-align: top"><td align="left" valign="middle" style="word-break: break-word;border-collapse: collapse !important;vertical-align: top">
            
          <div style="line-height:5px;font-size:1px">&#160;</div>
          </td></tr>
        </tbody></table>
        <!--[if (mso)|(IE)]></td></tr></table></td></tr></table><![endif]-->
      </div>
    </div>
                      
                  <!--[if (!mso)&(!IE)]><!--></div><!--<![endif]-->
                  </div>
                </div>
                  <!--[if (mso)|(IE)]></td><td align="center" width="200" style=" width:200px; padding-right: 0px; padding-left: 0px; padding-top:5px; padding-bottom:5px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;" valign="top"><![endif]-->
                <div class="col num4" style="max-width: 320px;min-width: 200px;display: table-cell;vertical-align: top;">
                  <div style="background-color: transparent; width: 100% !important;">
                  <!--[if (!mso)&(!IE)]><!--><div style="border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent; padding-top:5px; padding-bottom:5px; padding-right: 0px; padding-left: 0px;"><!--<![endif]-->
    
                      
                        <div class="">
        <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 0px; padding-left: 0px; padding-top: 20px; padding-bottom: 0px;"><![endif]-->
        <div style="color:#a8bf6f;font-family:'Montserrat', 'Trebuchet MS', 'Lucida Grande', 'Lucida Sans Unicode', 'Lucida Sans', Tahoma, sans-serif;line-height:120%; padding-right: 0px; padding-left: 0px; padding-top: 20px; padding-bottom: 0px;">    
            <div style="font-size:12px;line-height:14px;color:#a8bf6f;font-family:'Montserrat', 'Trebuchet MS', 'Lucida Grande', 'Lucida Sans Unicode', 'Lucida Sans', Tahoma, sans-serif;text-align:left;"><p style="margin: 0;font-size: 12px;line-height: 14px;text-align: center"><span style="color: rgb(255, 255, 255); font-size: 12px; line-height: 14px;"><span style="font-size: 12px; line-height: 14px; color: rgb(168, 191, 111);">CAS SHRC | Bridging Talents and Opportunities</div> 
        </div>
        <!--[if mso]></td></tr></table><![endif]-->
    </div>
                      
                  <!--[if (!mso)&(!IE)]><!--></div><!--<![endif]-->
                  </div>
                </div>
                  <!--[if (mso)|(IE)]></td><td align="center" width="200" style=" width:200px; padding-right: 0px; padding-left: 0px; padding-top:5px; padding-bottom:5px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;" valign="top"><![endif]-->
                <div class="col num4" style="max-width: 320px;min-width: 200px;display: table-cell;vertical-align: top;">
                  <div style="background-color: transparent; width: 100% !important;">
                  <!--[if (!mso)&(!IE)]><!--><div style="border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent; padding-top:5px; padding-bottom:5px; padding-right: 0px; padding-left: 0px;"><!--<![endif]-->
    
                      
                        <div class="">
        <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 0px; padding-left: 0px; padding-top: 20px; padding-bottom: 0px;"><![endif]-->
        
        <!--[if mso]></td></tr></table><![endif]-->
    </div>
                      
                  <!--[if (!mso)&(!IE)]><!--></div><!--<![endif]-->
                  </div>
                </div>
              <!--[if (mso)|(IE)]></td></tr></table></td></tr></table><![endif]-->
            </div>
          </div>
        </div>
        <div style="background-color:transparent;">
          <div style="Margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: transparent;" class="block-grid ">
            <div style="border-collapse: collapse;display: table;width: 100%;background-color:transparent;">
              <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="background-color:transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width: 600px;"><tr class="layout-full-width" style="background-color:transparent;"><![endif]-->
    
                  <!--[if (mso)|(IE)]><td align="center" width="600" style=" width:600px; padding-right: 0px; padding-left: 0px; padding-top:0px; padding-bottom:5px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;" valign="top"><![endif]-->
                <div class="col num12" style="min-width: 320px;max-width: 600px;display: table-cell;vertical-align: top;">
                  <div style="background-color: transparent; width: 100% !important;">
                  <!--[if (!mso)&(!IE)]><!--><div style="border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent; padding-top:0px; padding-bottom:5px; padding-right: 0px; padding-left: 0px;"><!--<![endif]-->
    
                      
                        <div align="center" class="img-container center  autowidth  fullwidth " style="padding-right: 0px;  padding-left: 0px;">
    <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr style="line-height:0px;line-height:0px;"><td style="padding-right: 0px; padding-left: 0px;" align="center"><![endif]-->
      <img class="center  autowidth  fullwidth" align="center" border="0" src="https://d1oco4z2z1fhwp.cloudfront.net/templates/default/20/rounder-dwn.png" alt="Image" title="Image" style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: block !important;border: 0;height: auto;float: none;width: 100%;max-width: 600px" width="600">
    <!--[if mso]></td></tr></table><![endif]-->
    </div>
    
                      
                      
                        
    <table border="0" cellpadding="0" cellspacing="0" width="100%" class="divider " style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;min-width: 100%;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%">
        <tbody>
            <tr style="vertical-align: top">
                <td class="divider_inner" style="word-break: break-word;border-collapse: collapse !important;vertical-align: top;padding-right: 30px;padding-left: 30px;padding-top: 30px;padding-bottom: 30px;min-width: 100%;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%">
                    <table class="divider_content" align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;border-top: 0px solid transparent;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%">
                        <tbody>
                            <tr style="vertical-align: top">
                                <td style="word-break: break-word;border-collapse: collapse !important;vertical-align: top;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%">
                                    <span></span>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </td>
            </tr>
        </tbody>
    </table>
                      
                  <!--[if (!mso)&(!IE)]><!--></div><!--<![endif]-->
                  </div>
                </div>
              <!--[if (mso)|(IE)]></td></tr></table></td></tr></table><![endif]-->
            </div>
          </div>
        </div>
       <!--[if (mso)|(IE)]></td></tr></table><![endif]-->
            </td>
      </tr>
      </tbody>
      </table>
      <!--[if (mso)|(IE)]></div><![endif]-->
    
    
    </body></html>`
    
        // sendMail.sendMail(email,html,'Job Interview','Invite to interview')
        sendMail.sendMail(emp_email,html,'CAS SHRC: Job Offer ')
        setting.save_notification(student_id,emp_id,vacancy_id,"Job offer","7")
        setting.status_history(student_id,vacancy_id,"7")

    }

    else if(status==="8") //offer accept   student
    {

        html=`<!DOCTYPE HTML PUBLIC "-//W3C//DTD XHTML 1.0 Transitional //EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd"><html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office"><head>
        <!--[if gte mso 9]><xml>
         <o:OfficeDocumentSettings>
          <o:AllowPNG/>
          <o:PixelsPerInch>96</o:PixelsPerInch>
         </o:OfficeDocumentSettings>
        </xml><![endif]-->
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
        <meta name="viewport" content="width=device-width">
        <!--[if !mso]><!--><meta http-equiv="X-UA-Compatible" content="IE=edge"><!--<![endif]-->
        <title></title>
        <!--[if !mso]><!-- -->
        <link href="https://fonts.googleapis.com/css?family=Montserrat" rel="stylesheet" type="text/css">
        <!--<![endif]-->
        
        <style type="text/css" id="media-query">
          body {
      margin: 0;
      padding: 0; }
    
    table, tr, td {
      vertical-align: top;
      border-collapse: collapse; }
    
    .ie-browser table, .mso-container table {
      table-layout: fixed; }
    
    * {
      line-height: inherit; }
    
    a[x-apple-data-detectors=true] {
      color: inherit !important;
      text-decoration: none !important; }
    
    [owa] .img-container div, [owa] .img-container button {
      display: block !important; }
    
    [owa] .fullwidth button {
      width: 100% !important; }
    
    [owa] .block-grid .col {
      display: table-cell;
      float: none !important;
      vertical-align: top; }
    
    .ie-browser .num12, .ie-browser .block-grid, [owa] .num12, [owa] .block-grid {
      width: 600px !important; }
    
    .ExternalClass, .ExternalClass p, .ExternalClass span, .ExternalClass font, .ExternalClass td, .ExternalClass div {
      line-height: 100%; }
    
    .ie-browser .mixed-two-up .num4, [owa] .mixed-two-up .num4 {
      width: 200px !important; }
    
    .ie-browser .mixed-two-up .num8, [owa] .mixed-two-up .num8 {
      width: 400px !important; }
    
    .ie-browser .block-grid.two-up .col, [owa] .block-grid.two-up .col {
      width: 300px !important; }
    
    .ie-browser .block-grid.three-up .col, [owa] .block-grid.three-up .col {
      width: 200px !important; }
    
    .ie-browser .block-grid.four-up .col, [owa] .block-grid.four-up .col {
      width: 150px !important; }
    
    .ie-browser .block-grid.five-up .col, [owa] .block-grid.five-up .col {
      width: 120px !important; }
    
    .ie-browser .block-grid.six-up .col, [owa] .block-grid.six-up .col {
      width: 100px !important; }
    
    .ie-browser .block-grid.seven-up .col, [owa] .block-grid.seven-up .col {
      width: 85px !important; }
    
    .ie-browser .block-grid.eight-up .col, [owa] .block-grid.eight-up .col {
      width: 75px !important; }
    
    .ie-browser .block-grid.nine-up .col, [owa] .block-grid.nine-up .col {
      width: 66px !important; }
    
    .ie-browser .block-grid.ten-up .col, [owa] .block-grid.ten-up .col {
      width: 60px !important; }
    
    .ie-browser .block-grid.eleven-up .col, [owa] .block-grid.eleven-up .col {
      width: 54px !important; }
    
    .ie-browser .block-grid.twelve-up .col, [owa] .block-grid.twelve-up .col {
      width: 50px !important; }
    
    @media only screen and (min-width: 620px) {
      .block-grid {
        width: 600px !important; }
      .block-grid .col {
        vertical-align: top; }
        .block-grid .col.num12 {
          width: 600px !important; }
      .block-grid.mixed-two-up .col.num4 {
        width: 200px !important; }
      .block-grid.mixed-two-up .col.num8 {
        width: 400px !important; }
      .block-grid.two-up .col {
        width: 300px !important; }
      .block-grid.three-up .col {
        width: 200px !important; }
      .block-grid.four-up .col {
        width: 150px !important; }
      .block-grid.five-up .col {
        width: 120px !important; }
      .block-grid.six-up .col {
        width: 100px !important; }
      .block-grid.seven-up .col {
        width: 85px !important; }
      .block-grid.eight-up .col {
        width: 75px !important; }
      .block-grid.nine-up .col {
        width: 66px !important; }
      .block-grid.ten-up .col {
        width: 60px !important; }
      .block-grid.eleven-up .col {
        width: 54px !important; }
      .block-grid.twelve-up .col {
        width: 50px !important; } }
    
    @media (max-width: 620px) {
      .block-grid, .col {
        min-width: 320px !important;
        max-width: 100% !important;
        display: block !important; }
      .block-grid {
        width: calc(100% - 40px) !important; }
      .col {
        width: 100% !important; }
        .col > div {
          margin: 0 auto; }
      img.fullwidth, img.fullwidthOnMobile {
        max-width: 100% !important; }
      .no-stack .col {
        min-width: 0 !important;
        display: table-cell !important; }
      .no-stack.two-up .col {
        width: 50% !important; }
      .no-stack.mixed-two-up .col.num4 {
        width: 33% !important; }
      .no-stack.mixed-two-up .col.num8 {
        width: 66% !important; }
      .no-stack.three-up .col.num4 {
        width: 33% !important; }
      .no-stack.four-up .col.num3 {
        width: 25% !important; }
      .mobile_hide {
        min-height: 0px;
        max-height: 0px;
        max-width: 0px;
        display: none;
        overflow: hidden;
        font-size: 0px; } }
    
        </style>
    </head>
    <body class="clean-body" style="margin: 0;padding: 0;-webkit-text-size-adjust: 100%;background-color: #e2eace">
      <style type="text/css" id="media-query-bodytag">
        @media (max-width: 520px) {
          .block-grid {
            min-width: 320px!important;
            max-width: 100%!important;
            width: 100%!important;
            display: block!important;
          }
    
          .col {
            min-width: 320px!important;
            max-width: 100%!important;
            width: 100%!important;
            display: block!important;
          }
    
            .col > div {
              margin: 0 auto;
            }
    
          img.fullwidth {
            max-width: 100%!important;
          }
                img.fullwidthOnMobile {
            max-width: 100%!important;
          }
          .no-stack .col {
                    min-width: 0!important;
                    display: table-cell!important;
                }
                .no-stack.two-up .col {
                    width: 50%!important;
                }
                .no-stack.mixed-two-up .col.num4 {
                    width: 33%!important;
                }
                .no-stack.mixed-two-up .col.num8 {
                    width: 66%!important;
                }
                .no-stack.three-up .col.num4 {
                    width: 33%!important;
                }
                .no-stack.four-up .col.num3 {
                    width: 25%!important;
                }
          .mobile_hide {
            min-height: 0px!important;
            max-height: 0px!important;
            max-width: 0px!important;
            display: none!important;
            overflow: hidden!important;
            font-size: 0px!important;
          }
        }
      </style>
      <!--[if IE]><div class="ie-browser"><![endif]-->
      <!--[if mso]><div class="mso-container"><![endif]-->
      <table class="nl-container" style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;min-width: 320px;Margin: 0 auto;background-color: #e2eace;width: 100%" cellpadding="0" cellspacing="0">
        <tbody>
        <tr style="vertical-align: top">
            <td style="word-break: break-word;border-collapse: collapse !important;vertical-align: top">
        <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td align="center" style="background-color: #e2eace;"><![endif]-->
    
        <div style="background-color:transparent;">
          <div style="Margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: transparent;" class="block-grid ">
            <div style="border-collapse: collapse;display: table;width: 100%;background-color:transparent;">
              <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="background-color:transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width: 600px;"><tr class="layout-full-width" style="background-color:transparent;"><![endif]-->
    
                  <!--[if (mso)|(IE)]><td align="center" width="600" style=" width:600px; padding-right: 0px; padding-left: 0px; padding-top:5px; padding-bottom:0px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;" valign="top"><![endif]-->
                <div class="col num12" style="min-width: 320px;max-width: 600px;display: table-cell;vertical-align: top;">
                  <div style="background-color: transparent; width: 100% !important;">
                  <!--[if (!mso)&(!IE)]><!--><div style="border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent; padding-top:5px; padding-bottom:0px; padding-right: 0px; padding-left: 0px;"><!--<![endif]-->
    
                      
                        <div align="center" class="img-container center  autowidth  fullwidth " style="padding-right: 0px;  padding-left: 0px;">
    <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr style="line-height:0px;line-height:0px;"><td style="padding-right: 0px; padding-left: 0px;" align="center"><![endif]-->
    <div style="line-height:25px;font-size:1px">&#160;</div>  <img class="center  autowidth  fullwidth" align="center" border="0" src="https://d1oco4z2z1fhwp.cloudfront.net/templates/default/20/rounder-up.png" alt="Image" title="Image" style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: block !important;border: 0;height: auto;float: none;width: 100%;max-width: 600px" width="600">
    <!--[if mso]></td></tr></table><![endif]-->
    </div>
    
                      
                  <!--[if (!mso)&(!IE)]><!--></div><!--<![endif]-->
                  </div>
                </div>
              <!--[if (mso)|(IE)]></td></tr></table></td></tr></table><![endif]-->
            </div>
          </div>
        </div>
        <div style="background-color:transparent;">
          <div style="Margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: #FFFFFF;" class="block-grid ">
            <div style="border-collapse: collapse;display: table;width: 100%;background-color:#FFFFFF;">
              <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="background-color:transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width: 600px;"><tr class="layout-full-width" style="background-color:#FFFFFF;"><![endif]-->
    
                  <!--[if (mso)|(IE)]><td align="center" width="600" style=" width:600px; padding-right: 0px; padding-left: 0px; padding-top:5px; padding-bottom:5px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;" valign="top"><![endif]-->
                <div class="col num12" style="min-width: 320px;max-width: 600px;display: table-cell;vertical-align: top;">
                  <div style="background-color: transparent; width: 100% !important;">
                  <!--[if (!mso)&(!IE)]><!--><div style="border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent; padding-top:5px; padding-bottom:5px; padding-right: 0px; padding-left: 0px;"><!--<![endif]-->
    
                      
                        <div align="center" class="img-container center  autowidth  " style="padding-right: 0px;  padding-left: 0px;">
    <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr style="line-height:0px;line-height:0px;"><td style="padding-right: 0px; padding-left: 0px;" align="center"><![endif]-->
      <img class="center  autowidth " align="center" border="0" src="https://i.imgur.com/FrVRrnL.png" alt="Image" title="Image" style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: block !important;border: 0;height: auto;float: none;width: 100%;max-width: 250px" width="250">
    <!--[if mso]></td></tr></table><![endif]-->
    </div>
    
                      
                      
                        <div class="">
        <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 10px; padding-left: 10px; padding-top: 10px; padding-bottom: 10px;"><![endif]-->
        <div style="color:#555555;font-family:'Montserrat', 'Trebuchet MS', 'Lucida Grande', 'Lucida Sans Unicode', 'Lucida Sans', Tahoma, sans-serif;line-height:150%; padding-right: 10px; padding-left: 10px; padding-top: 10px; padding-bottom: 10px;"> 
            <div style="font-size:12px;line-height:18px;color:#555555;font-family:'Montserrat', 'Trebuchet MS', 'Lucida Grande', 'Lucida Sans Unicode', 'Lucida Sans', Tahoma, sans-serif;text-align:left;"><p style="margin: 0;font-size: 14px;line-height: 21px;text-align: center"></p></div>    
        </div>
        <!--[if mso]></td></tr></table><![endif]-->
    </div>
                      
                  <!--[if (!mso)&(!IE)]><!--></div><!--<![endif]-->
                  </div>
                </div>
              <!--[if (mso)|(IE)]></td></tr></table></td></tr></table><![endif]-->
            </div>
          </div>
        </div>
        <div style="background-color:transparent;">
          <div style="Margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: #FFFFFF;" class="block-grid ">
            <div style="border-collapse: collapse;display: table;width: 100%;background-color:#FFFFFF;">
              <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="background-color:transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width: 600px;"><tr class="layout-full-width" style="background-color:#FFFFFF;"><![endif]-->
    
                  <!--[if (mso)|(IE)]><td align="center" width="600" style=" width:600px; padding-right: 0px; padding-left: 0px; padding-top:0px; padding-bottom:5px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;" valign="top"><![endif]-->
                <div class="col num12" style="min-width: 320px;max-width: 600px;display: table-cell;vertical-align: top;">
                  <div style="background-color: transparent; width: 100% !important;">
                  <!--[if (!mso)&(!IE)]><!--><div style="border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent; padding-top:0px; padding-bottom:5px; padding-right: 0px; padding-left: 0px;"><!--<![endif]-->
    
                      
                        <div class="">
        <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 10px; padding-left: 10px; padding-top: 10px; padding-bottom: 10px;"><![endif]-->
        <div style="color:#0D0D0D;font-family:'Montserrat', 'Trebuchet MS', 'Lucida Grande', 'Lucida Sans Unicode', 'Lucida Sans', Tahoma, sans-serif;line-height:120%; padding-right: 10px; padding-left: 10px; padding-top: 10px; padding-bottom: 10px;"> 
            <div style="font-size:12px;line-height:14px;color:#0D0D0D;font-family:'Montserrat', 'Trebuchet MS', 'Lucida Grande', 'Lucida Sans Unicode', 'Lucida Sans', Tahoma, sans-serif;text-align:left;">
          <p style="margin: 0;font-size: 14px;line-height: 17px;text-align: center">
           <strong> 
          <span style="font-size: 28px; line-height: 33px;">
          Dear ` + emp_name + `,
        </span> </strong> <br><br>
    
               <div style="text-align: left;">  <span style="line-height: 33px; font-size: 20px;">
                
          </span></div>
      </p></div>    
        </div>
        <!--[if mso]></td></tr></table><![endif]-->
    </div>
                      
                      
                        <div align="center" class="img-container center  autowidth  " style="padding-right: 0px;  padding-left: 0px;">
    <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr style="line-height:0px;line-height:0px;"><td style="padding-right: 0px; padding-left: 0px;" align="center"><![endif]-->
      <img class="center  autowidth " align="center" border="0" src="https://d1oco4z2z1fhwp.cloudfront.net/templates/default/20/divider.png" alt="Image" title="Image" style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: block !important;border: 0;height: auto;float: none;width: 100%;max-width: 316px" width="316">
    <!--[if mso]></td></tr></table><![endif]-->
    </div>
    
                      
                      
                        <div class="">
        <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 10px; padding-left: 10px; padding-top: 10px; padding-bottom: 10px;"><![endif]-->
        <div style="color:#555555;font-family:'Montserrat', 'Trebuchet MS', 'Lucida Grande', 'Lucida Sans Unicode', 'Lucida Sans', Tahoma, sans-serif;line-height:150%; padding-right: 10px; padding-left: 10px; padding-top: 10px; padding-bottom: 10px;"> 
            
        </div>
        <!--[if mso]></td></tr></table><![endif]-->
    </div>
                      
                      
                        <div class="">
        <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 10px; padding-left: 10px; padding-top: 20px; padding-bottom: 10px;"><![endif]-->
        <div style="color:#0D0D0D;font-family:'Montserrat', 'Trebuchet MS', 'Lucida Grande', 'Lucida Sans Unicode', 'Lucida Sans', Tahoma, sans-serif;line-height:150%; padding-right: 10px; padding-left: 10px; padding-top: 20px; padding-bottom: 10px;"> 
            <div style="font-size:12px;line-height:18px;color:#0D0D0D;font-family:'Montserrat', 'Trebuchet MS', 'Lucida Grande', 'Lucida Sans Unicode', 'Lucida Sans', Tahoma, sans-serif;text-align:left;"><p style="margin: 0;font-size: 14px;line-height: 21px;text-align: center">Your offer invitation for the position of ` + job_title + ` has been accepted by `+ name +`. You can try more potential candidates through the application.
    
    
            </p></div>  
        </div>
        <!--[if mso]></td></tr></table><![endif]-->
    </div>
                      
                      
                        
    <div align="center" class="button-container center " style="padding-right: 10px; padding-left: 10px; padding-top:25px; padding-bottom:10px;">
      <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0" style="border-spacing: 0; border-collapse: collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;"><tr><td style="padding-right: 10px; padding-left: 10px; padding-top:25px; padding-bottom:10px;" align="center"><v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="" style="height:46pt; v-text-anchor:middle; width:151pt;" arcsize="7%" strokecolor="#a8bf6f" fillcolor="#a8bf6f"><w:anchorlock/><v:textbox inset="0,0,0,0"><center style="color:#ffffff; font-family:'Montserrat', 'Trebuchet MS', 'Lucida Grande', 'Lucida Sans Unicode', 'Lucida Sans', Tahoma, sans-serif; font-size:16px;"><![endif]-->
        <div style="color: #ffffff; background-color: #a8bf6f; border-radius: 4px; -webkit-border-radius: 4px; -moz-border-radius: 4px; max-width: 202px; width: 172px;width: auto; border-top: 0px solid transparent; border-right: 0px solid transparent; border-bottom: 0px solid transparent; border-left: 0px solid transparent; padding-top: 15px; padding-right: 15px; padding-bottom: 15px; padding-left: 15px; font-family: 'Montserrat', 'Trebuchet MS', 'Lucida Grande', 'Lucida Sans Unicode', 'Lucida Sans', Tahoma, sans-serif; text-align: center; mso-border-alt: none;">
          <span style="font-size:16px;line-height:32px;"><a href="`+ variables.WEB_LINK_EMPLOYER +`" style="text-decoration : none; color : #fff;"><strong>GoTo Application</strong></a></span>
        </div>
      <!--[if mso]></center></v:textbox></v:roundrect></td></tr></table><![endif]-->
    </div>
    
                      
                      
                        
    <table border="0" cellpadding="0" cellspacing="0" width="100%" class="divider " style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;min-width: 100%;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%">
        <tbody>
            <tr style="vertical-align: top">
                <td class="divider_inner" style="word-break: break-word;border-collapse: collapse !important;vertical-align: top;padding-right: 10px;padding-left: 10px;padding-top: 30px;padding-bottom: 10px;min-width: 100%;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%">
                    <table class="divider_content" align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;border-top: 0px solid transparent;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%">
                        <tbody>
                            <tr style="vertical-align: top">
                                <td style="word-break: break-word;border-collapse: collapse !important;vertical-align: top;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%">
                                    <span></span>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </td>
            </tr>
        </tbody>
    </table>
                      
                  <!--[if (!mso)&(!IE)]><!--></div><!--<![endif]-->
                  </div>
                </div>
              <!--[if (mso)|(IE)]></td></tr></table></td></tr></table><![endif]-->
            </div>
          </div>
        </div>
        <div style="background-color:transparent;">
          <div style="Margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: #525252;" class="block-grid three-up ">
            <div style="border-collapse: collapse;display: table;width: 100%;background-color:#525252;">
              <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="background-color:transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width: 600px;"><tr class="layout-full-width" style="background-color:#525252;"><![endif]-->
    
                  <!--[if (mso)|(IE)]><td align="center" width="200" style=" width:200px; padding-right: 0px; padding-left: 0px; padding-top:0px; padding-bottom:0px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;" valign="top"><![endif]-->
                <div class="col num4" style="max-width: 320px;min-width: 200px;display: table-cell;vertical-align: top;">
                  <div style="background-color: transparent; width: 100% !important;">
                  <!--[if (!mso)&(!IE)]><!--><div style="border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent; padding-top:0px; padding-bottom:0px; padding-right: 0px; padding-left: 0px;"><!--<![endif]-->
    
                      
                        
    <div align="center" style="padding-right: 0px; padding-left: 0px; padding-bottom: 0px;" class="">
      <div style="line-height:15px;font-size:1px">&#160;</div>
      <div style="display: table; max-width:131px;">
      <!--[if (mso)|(IE)]><table width="131" cellpadding="0" cellspacing="0" border="0"><tr><td style="border-collapse:collapse; padding-right: 0px; padding-left: 0px; padding-bottom: 0px;"  align="center"><table width="100%" cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse; mso-table-lspace: 0pt;mso-table-rspace: 0pt; width:131px;"><tr><td width="32" style="width:32px; padding-right: 5px;" valign="top"><![endif]-->
        <table align="left" border="0" cellspacing="0" cellpadding="0" width="32" height="32" style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;Margin-right: 5px">
          <tbody><tr style="vertical-align: top"><td align="left" valign="middle" style="word-break: break-word;border-collapse: collapse !important;vertical-align: top">
            
          <div style="line-height:5px;font-size:1px">&#160;</div>
          </td></tr>
        </tbody></table>
          <!--[if (mso)|(IE)]></td><td width="32" style="width:32px; padding-right: 5px;" valign="top"><![endif]-->
        <table align="left" border="0" cellspacing="0" cellpadding="0" width="32" height="32" style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;Margin-right: 5px">
          <tbody><tr style="vertical-align: top"><td align="left" valign="middle" style="word-break: break-word;border-collapse: collapse !important;vertical-align: top">
            
          <div style="line-height:5px;font-size:1px">&#160;</div>
          </td></tr>
        </tbody></table>
          <!--[if (mso)|(IE)]></td><td width="32" style="width:32px; padding-right: 0;" valign="top"><![endif]-->
        <table align="left" border="0" cellspacing="0" cellpadding="0" width="32" height="32" style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;Margin-right: 0">
          <tbody><tr style="vertical-align: top"><td align="left" valign="middle" style="word-break: break-word;border-collapse: collapse !important;vertical-align: top">
            
          <div style="line-height:5px;font-size:1px">&#160;</div>
          </td></tr>
        </tbody></table>
        <!--[if (mso)|(IE)]></td></tr></table></td></tr></table><![endif]-->
      </div>
    </div>
                      
                  <!--[if (!mso)&(!IE)]><!--></div><!--<![endif]-->
                  </div>
                </div>
                  <!--[if (mso)|(IE)]></td><td align="center" width="200" style=" width:200px; padding-right: 0px; padding-left: 0px; padding-top:5px; padding-bottom:5px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;" valign="top"><![endif]-->
                <div class="col num4" style="max-width: 320px;min-width: 200px;display: table-cell;vertical-align: top;">
                  <div style="background-color: transparent; width: 100% !important;">
                  <!--[if (!mso)&(!IE)]><!--><div style="border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent; padding-top:5px; padding-bottom:5px; padding-right: 0px; padding-left: 0px;"><!--<![endif]-->
    
                      
                        <div class="">
        <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 0px; padding-left: 0px; padding-top: 20px; padding-bottom: 0px;"><![endif]-->
        <div style="color:#a8bf6f;font-family:'Montserrat', 'Trebuchet MS', 'Lucida Grande', 'Lucida Sans Unicode', 'Lucida Sans', Tahoma, sans-serif;line-height:120%; padding-right: 0px; padding-left: 0px; padding-top: 20px; padding-bottom: 0px;">    
            <div style="font-size:12px;line-height:14px;color:#a8bf6f;font-family:'Montserrat', 'Trebuchet MS', 'Lucida Grande', 'Lucida Sans Unicode', 'Lucida Sans', Tahoma, sans-serif;text-align:left;"><p style="margin: 0;font-size: 12px;line-height: 14px;text-align: center"><span style="color: rgb(255, 255, 255); font-size: 12px; line-height: 14px;"><span style="font-size: 12px; line-height: 14px; color: rgb(168, 191, 111);">CAS SHRC | Bridging Talents and Opportunities</div> 
        </div>
        <!--[if mso]></td></tr></table><![endif]-->
    </div>
                      
                  <!--[if (!mso)&(!IE)]><!--></div><!--<![endif]-->
                  </div>
                </div>
                  <!--[if (mso)|(IE)]></td><td align="center" width="200" style=" width:200px; padding-right: 0px; padding-left: 0px; padding-top:5px; padding-bottom:5px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;" valign="top"><![endif]-->
                <div class="col num4" style="max-width: 320px;min-width: 200px;display: table-cell;vertical-align: top;">
                  <div style="background-color: transparent; width: 100% !important;">
                  <!--[if (!mso)&(!IE)]><!--><div style="border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent; padding-top:5px; padding-bottom:5px; padding-right: 0px; padding-left: 0px;"><!--<![endif]-->
    
                      
                        <div class="">
        <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 0px; padding-left: 0px; padding-top: 20px; padding-bottom: 0px;"><![endif]-->
        
        <!--[if mso]></td></tr></table><![endif]-->
    </div>
                      
                  <!--[if (!mso)&(!IE)]><!--></div><!--<![endif]-->
                  </div>
                </div>
              <!--[if (mso)|(IE)]></td></tr></table></td></tr></table><![endif]-->
            </div>
          </div>
        </div>
        <div style="background-color:transparent;">
          <div style="Margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: transparent;" class="block-grid ">
            <div style="border-collapse: collapse;display: table;width: 100%;background-color:transparent;">
              <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="background-color:transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width: 600px;"><tr class="layout-full-width" style="background-color:transparent;"><![endif]-->
    
                  <!--[if (mso)|(IE)]><td align="center" width="600" style=" width:600px; padding-right: 0px; padding-left: 0px; padding-top:0px; padding-bottom:5px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;" valign="top"><![endif]-->
                <div class="col num12" style="min-width: 320px;max-width: 600px;display: table-cell;vertical-align: top;">
                  <div style="background-color: transparent; width: 100% !important;">
                  <!--[if (!mso)&(!IE)]><!--><div style="border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent; padding-top:0px; padding-bottom:5px; padding-right: 0px; padding-left: 0px;"><!--<![endif]-->
    
                      
                        <div align="center" class="img-container center  autowidth  fullwidth " style="padding-right: 0px;  padding-left: 0px;">
    <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr style="line-height:0px;line-height:0px;"><td style="padding-right: 0px; padding-left: 0px;" align="center"><![endif]-->
      <img class="center  autowidth  fullwidth" align="center" border="0" src="https://d1oco4z2z1fhwp.cloudfront.net/templates/default/20/rounder-dwn.png" alt="Image" title="Image" style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: block !important;border: 0;height: auto;float: none;width: 100%;max-width: 600px" width="600">
    <!--[if mso]></td></tr></table><![endif]-->
    </div>
    
                      
                      
                        
    <table border="0" cellpadding="0" cellspacing="0" width="100%" class="divider " style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;min-width: 100%;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%">
        <tbody>
            <tr style="vertical-align: top">
                <td class="divider_inner" style="word-break: break-word;border-collapse: collapse !important;vertical-align: top;padding-right: 30px;padding-left: 30px;padding-top: 30px;padding-bottom: 30px;min-width: 100%;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%">
                    <table class="divider_content" align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;border-top: 0px solid transparent;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%">
                        <tbody>
                            <tr style="vertical-align: top">
                                <td style="word-break: break-word;border-collapse: collapse !important;vertical-align: top;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%">
                                    <span></span>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </td>
            </tr>
        </tbody>
    </table>
                      
                  <!--[if (!mso)&(!IE)]><!--></div><!--<![endif]-->
                  </div>
                </div>
              <!--[if (mso)|(IE)]></td></tr></table></td></tr></table><![endif]-->
            </div>
          </div>
        </div>
       <!--[if (mso)|(IE)]></td></tr></table><![endif]-->
            </td>
      </tr>
      </tbody>
      </table>
      <!--[if (mso)|(IE)]></div><![endif]-->
    
    
    </body></html>`
    
        // sendMail.sendMail(email,html,'Job Interview','Invite to interview')
        sendMail.sendMail(emp_email,html,'CAS SHRC: Offer Request Accept')
        setting.save_notification(student_id,emp_id,vacancy_id,"Job offer was accepted","8")
        setting.status_history(student_id,vacancy_id,"8")

    }

    else if(status==="9") //offer reject employer
    {

      

        html=`<!DOCTYPE HTML PUBLIC "-//W3C//DTD XHTML 1.0 Transitional //EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd"><html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office"><head>
        <!--[if gte mso 9]><xml>
         <o:OfficeDocumentSettings>
          <o:AllowPNG/>
          <o:PixelsPerInch>96</o:PixelsPerInch>
         </o:OfficeDocumentSettings>
        </xml><![endif]-->
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
        <meta name="viewport" content="width=device-width">
        <!--[if !mso]><!--><meta http-equiv="X-UA-Compatible" content="IE=edge"><!--<![endif]-->
        <title></title>
        <!--[if !mso]><!-- -->
        <link href="https://fonts.googleapis.com/css?family=Montserrat" rel="stylesheet" type="text/css">
        <!--<![endif]-->
        
        <style type="text/css" id="media-query">
          body {
      margin: 0;
      padding: 0; }
    
    table, tr, td {
      vertical-align: top;
      border-collapse: collapse; }
    
    .ie-browser table, .mso-container table {
      table-layout: fixed; }
    
    * {
      line-height: inherit; }
    
    a[x-apple-data-detectors=true] {
      color: inherit !important;
      text-decoration: none !important; }
    
    [owa] .img-container div, [owa] .img-container button {
      display: block !important; }
    
    [owa] .fullwidth button {
      width: 100% !important; }
    
    [owa] .block-grid .col {
      display: table-cell;
      float: none !important;
      vertical-align: top; }
    
    .ie-browser .num12, .ie-browser .block-grid, [owa] .num12, [owa] .block-grid {
      width: 600px !important; }
    
    .ExternalClass, .ExternalClass p, .ExternalClass span, .ExternalClass font, .ExternalClass td, .ExternalClass div {
      line-height: 100%; }
    
    .ie-browser .mixed-two-up .num4, [owa] .mixed-two-up .num4 {
      width: 200px !important; }
    
    .ie-browser .mixed-two-up .num8, [owa] .mixed-two-up .num8 {
      width: 400px !important; }
    
    .ie-browser .block-grid.two-up .col, [owa] .block-grid.two-up .col {
      width: 300px !important; }
    
    .ie-browser .block-grid.three-up .col, [owa] .block-grid.three-up .col {
      width: 200px !important; }
    
    .ie-browser .block-grid.four-up .col, [owa] .block-grid.four-up .col {
      width: 150px !important; }
    
    .ie-browser .block-grid.five-up .col, [owa] .block-grid.five-up .col {
      width: 120px !important; }
    
    .ie-browser .block-grid.six-up .col, [owa] .block-grid.six-up .col {
      width: 100px !important; }
    
    .ie-browser .block-grid.seven-up .col, [owa] .block-grid.seven-up .col {
      width: 85px !important; }
    
    .ie-browser .block-grid.eight-up .col, [owa] .block-grid.eight-up .col {
      width: 75px !important; }
    
    .ie-browser .block-grid.nine-up .col, [owa] .block-grid.nine-up .col {
      width: 66px !important; }
    
    .ie-browser .block-grid.ten-up .col, [owa] .block-grid.ten-up .col {
      width: 60px !important; }
    
    .ie-browser .block-grid.eleven-up .col, [owa] .block-grid.eleven-up .col {
      width: 54px !important; }
    
    .ie-browser .block-grid.twelve-up .col, [owa] .block-grid.twelve-up .col {
      width: 50px !important; }
    
    @media only screen and (min-width: 620px) {
      .block-grid {
        width: 600px !important; }
      .block-grid .col {
        vertical-align: top; }
        .block-grid .col.num12 {
          width: 600px !important; }
      .block-grid.mixed-two-up .col.num4 {
        width: 200px !important; }
      .block-grid.mixed-two-up .col.num8 {
        width: 400px !important; }
      .block-grid.two-up .col {
        width: 300px !important; }
      .block-grid.three-up .col {
        width: 200px !important; }
      .block-grid.four-up .col {
        width: 150px !important; }
      .block-grid.five-up .col {
        width: 120px !important; }
      .block-grid.six-up .col {
        width: 100px !important; }
      .block-grid.seven-up .col {
        width: 85px !important; }
      .block-grid.eight-up .col {
        width: 75px !important; }
      .block-grid.nine-up .col {
        width: 66px !important; }
      .block-grid.ten-up .col {
        width: 60px !important; }
      .block-grid.eleven-up .col {
        width: 54px !important; }
      .block-grid.twelve-up .col {
        width: 50px !important; } }
    
    @media (max-width: 620px) {
      .block-grid, .col {
        min-width: 320px !important;
        max-width: 100% !important;
        display: block !important; }
      .block-grid {
        width: calc(100% - 40px) !important; }
      .col {
        width: 100% !important; }
        .col > div {
          margin: 0 auto; }
      img.fullwidth, img.fullwidthOnMobile {
        max-width: 100% !important; }
      .no-stack .col {
        min-width: 0 !important;
        display: table-cell !important; }
      .no-stack.two-up .col {
        width: 50% !important; }
      .no-stack.mixed-two-up .col.num4 {
        width: 33% !important; }
      .no-stack.mixed-two-up .col.num8 {
        width: 66% !important; }
      .no-stack.three-up .col.num4 {
        width: 33% !important; }
      .no-stack.four-up .col.num3 {
        width: 25% !important; }
      .mobile_hide {
        min-height: 0px;
        max-height: 0px;
        max-width: 0px;
        display: none;
        overflow: hidden;
        font-size: 0px; } }
    
        </style>
    </head>
    <body class="clean-body" style="margin: 0;padding: 0;-webkit-text-size-adjust: 100%;background-color: #e2eace">
      <style type="text/css" id="media-query-bodytag">
        @media (max-width: 520px) {
          .block-grid {
            min-width: 320px!important;
            max-width: 100%!important;
            width: 100%!important;
            display: block!important;
          }
    
          .col {
            min-width: 320px!important;
            max-width: 100%!important;
            width: 100%!important;
            display: block!important;
          }
    
            .col > div {
              margin: 0 auto;
            }
    
          img.fullwidth {
            max-width: 100%!important;
          }
                img.fullwidthOnMobile {
            max-width: 100%!important;
          }
          .no-stack .col {
                    min-width: 0!important;
                    display: table-cell!important;
                }
                .no-stack.two-up .col {
                    width: 50%!important;
                }
                .no-stack.mixed-two-up .col.num4 {
                    width: 33%!important;
                }
                .no-stack.mixed-two-up .col.num8 {
                    width: 66%!important;
                }
                .no-stack.three-up .col.num4 {
                    width: 33%!important;
                }
                .no-stack.four-up .col.num3 {
                    width: 25%!important;
                }
          .mobile_hide {
            min-height: 0px!important;
            max-height: 0px!important;
            max-width: 0px!important;
            display: none!important;
            overflow: hidden!important;
            font-size: 0px!important;
          }
        }
      </style>
      <!--[if IE]><div class="ie-browser"><![endif]-->
      <!--[if mso]><div class="mso-container"><![endif]-->
      <table class="nl-container" style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;min-width: 320px;Margin: 0 auto;background-color: #e2eace;width: 100%" cellpadding="0" cellspacing="0">
        <tbody>
        <tr style="vertical-align: top">
            <td style="word-break: break-word;border-collapse: collapse !important;vertical-align: top">
        <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td align="center" style="background-color: #e2eace;"><![endif]-->
    
        <div style="background-color:transparent;">
          <div style="Margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: transparent;" class="block-grid ">
            <div style="border-collapse: collapse;display: table;width: 100%;background-color:transparent;">
              <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="background-color:transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width: 600px;"><tr class="layout-full-width" style="background-color:transparent;"><![endif]-->
    
                  <!--[if (mso)|(IE)]><td align="center" width="600" style=" width:600px; padding-right: 0px; padding-left: 0px; padding-top:5px; padding-bottom:0px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;" valign="top"><![endif]-->
                <div class="col num12" style="min-width: 320px;max-width: 600px;display: table-cell;vertical-align: top;">
                  <div style="background-color: transparent; width: 100% !important;">
                  <!--[if (!mso)&(!IE)]><!--><div style="border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent; padding-top:5px; padding-bottom:0px; padding-right: 0px; padding-left: 0px;"><!--<![endif]-->
    
                      
                        <div align="center" class="img-container center  autowidth  fullwidth " style="padding-right: 0px;  padding-left: 0px;">
    <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr style="line-height:0px;line-height:0px;"><td style="padding-right: 0px; padding-left: 0px;" align="center"><![endif]-->
    <div style="line-height:25px;font-size:1px">&#160;</div>  <img class="center  autowidth  fullwidth" align="center" border="0" src="https://d1oco4z2z1fhwp.cloudfront.net/templates/default/20/rounder-up.png" alt="Image" title="Image" style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: block !important;border: 0;height: auto;float: none;width: 100%;max-width: 600px" width="600">
    <!--[if mso]></td></tr></table><![endif]-->
    </div>
    
                      
                  <!--[if (!mso)&(!IE)]><!--></div><!--<![endif]-->
                  </div>
                </div>
              <!--[if (mso)|(IE)]></td></tr></table></td></tr></table><![endif]-->
            </div>
          </div>
        </div>
        <div style="background-color:transparent;">
          <div style="Margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: #FFFFFF;" class="block-grid ">
            <div style="border-collapse: collapse;display: table;width: 100%;background-color:#FFFFFF;">
              <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="background-color:transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width: 600px;"><tr class="layout-full-width" style="background-color:#FFFFFF;"><![endif]-->
    
                  <!--[if (mso)|(IE)]><td align="center" width="600" style=" width:600px; padding-right: 0px; padding-left: 0px; padding-top:5px; padding-bottom:5px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;" valign="top"><![endif]-->
                <div class="col num12" style="min-width: 320px;max-width: 600px;display: table-cell;vertical-align: top;">
                  <div style="background-color: transparent; width: 100% !important;">
                  <!--[if (!mso)&(!IE)]><!--><div style="border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent; padding-top:5px; padding-bottom:5px; padding-right: 0px; padding-left: 0px;"><!--<![endif]-->
    
                      
                        <div align="center" class="img-container center  autowidth  " style="padding-right: 0px;  padding-left: 0px;">
    <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr style="line-height:0px;line-height:0px;"><td style="padding-right: 0px; padding-left: 0px;" align="center"><![endif]-->
      <img class="center  autowidth " align="center" border="0" src="https://i.imgur.com/FrVRrnL.png" alt="Image" title="Image" style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: block !important;border: 0;height: auto;float: none;width: 100%;max-width: 250px" width="250">
    <!--[if mso]></td></tr></table><![endif]-->
    </div>
    
                      
                      
                        <div class="">
        <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 10px; padding-left: 10px; padding-top: 10px; padding-bottom: 10px;"><![endif]-->
        <div style="color:#555555;font-family:'Montserrat', 'Trebuchet MS', 'Lucida Grande', 'Lucida Sans Unicode', 'Lucida Sans', Tahoma, sans-serif;line-height:150%; padding-right: 10px; padding-left: 10px; padding-top: 10px; padding-bottom: 10px;"> 
            <div style="font-size:12px;line-height:18px;color:#555555;font-family:'Montserrat', 'Trebuchet MS', 'Lucida Grande', 'Lucida Sans Unicode', 'Lucida Sans', Tahoma, sans-serif;text-align:left;"><p style="margin: 0;font-size: 14px;line-height: 21px;text-align: center"></p></div>    
        </div>
        <!--[if mso]></td></tr></table><![endif]-->
    </div>
                      
                  <!--[if (!mso)&(!IE)]><!--></div><!--<![endif]-->
                  </div>
                </div>
              <!--[if (mso)|(IE)]></td></tr></table></td></tr></table><![endif]-->
            </div>
          </div>
        </div>
        <div style="background-color:transparent;">
          <div style="Margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: #FFFFFF;" class="block-grid ">
            <div style="border-collapse: collapse;display: table;width: 100%;background-color:#FFFFFF;">
              <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="background-color:transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width: 600px;"><tr class="layout-full-width" style="background-color:#FFFFFF;"><![endif]-->
    
                  <!--[if (mso)|(IE)]><td align="center" width="600" style=" width:600px; padding-right: 0px; padding-left: 0px; padding-top:0px; padding-bottom:5px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;" valign="top"><![endif]-->
                <div class="col num12" style="min-width: 320px;max-width: 600px;display: table-cell;vertical-align: top;">
                  <div style="background-color: transparent; width: 100% !important;">
                  <!--[if (!mso)&(!IE)]><!--><div style="border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent; padding-top:0px; padding-bottom:5px; padding-right: 0px; padding-left: 0px;"><!--<![endif]-->
    
                      
                        <div class="">
        <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 10px; padding-left: 10px; padding-top: 10px; padding-bottom: 10px;"><![endif]-->
        <div style="color:#0D0D0D;font-family:'Montserrat', 'Trebuchet MS', 'Lucida Grande', 'Lucida Sans Unicode', 'Lucida Sans', Tahoma, sans-serif;line-height:120%; padding-right: 10px; padding-left: 10px; padding-top: 10px; padding-bottom: 10px;"> 
            <div style="font-size:12px;line-height:14px;color:#0D0D0D;font-family:'Montserrat', 'Trebuchet MS', 'Lucida Grande', 'Lucida Sans Unicode', 'Lucida Sans', Tahoma, sans-serif;text-align:left;">
          <p style="margin: 0;font-size: 14px;line-height: 17px;text-align: center">
           <strong> 
          <span style="font-size: 28px; line-height: 33px;">
          Dear ` + name + `,
        </span> </strong> <br><br>
    
               <div style="text-align: left;">  <span style="line-height: 33px; font-size: 20px;">
                
          </span></div>
      </p></div>    
        </div>
        <!--[if mso]></td></tr></table><![endif]-->
    </div>
                      
                      
                        <div align="center" class="img-container center  autowidth  " style="padding-right: 0px;  padding-left: 0px;">
    <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr style="line-height:0px;line-height:0px;"><td style="padding-right: 0px; padding-left: 0px;" align="center"><![endif]-->
      <img class="center  autowidth " align="center" border="0" src="https://d1oco4z2z1fhwp.cloudfront.net/templates/default/20/divider.png" alt="Image" title="Image" style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: block !important;border: 0;height: auto;float: none;width: 100%;max-width: 316px" width="316">
    <!--[if mso]></td></tr></table><![endif]-->
    </div>
    
                      
                      
                        <div class="">
        <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 10px; padding-left: 10px; padding-top: 10px; padding-bottom: 10px;"><![endif]-->
        <div style="color:#555555;font-family:'Montserrat', 'Trebuchet MS', 'Lucida Grande', 'Lucida Sans Unicode', 'Lucida Sans', Tahoma, sans-serif;line-height:150%; padding-right: 10px; padding-left: 10px; padding-top: 10px; padding-bottom: 10px;"> 
            
        </div>
        <!--[if mso]></td></tr></table><![endif]-->
    </div>
                      
                      
                        <div class="">
        <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 10px; padding-left: 10px; padding-top: 20px; padding-bottom: 10px;"><![endif]-->
        <div style="color:#0D0D0D;font-family:'Montserrat', 'Trebuchet MS', 'Lucida Grande', 'Lucida Sans Unicode', 'Lucida Sans', Tahoma, sans-serif;line-height:150%; padding-right: 10px; padding-left: 10px; padding-top: 20px; padding-bottom: 10px;"> 
            <div style="font-size:12px;line-height:18px;color:#0D0D0D;font-family:'Montserrat', 'Trebuchet MS', 'Lucida Grande', 'Lucida Sans Unicode', 'Lucida Sans', Tahoma, sans-serif;text-align:left;"><p style="margin: 0;font-size: 14px;line-height: 21px;text-align: center">You have been rejected in the interview for the position of ` + job_title + ` in `+ emp_name+`. You may contact the student via this email: `+ email +` and confirm them your willingness as soon as possible.
    
    
            </p></div>  
        </div>
        <!--[if mso]></td></tr></table><![endif]-->
    </div>
                      
                      
                        
    <div align="center" class="button-container center " style="padding-right: 10px; padding-left: 10px; padding-top:25px; padding-bottom:10px;">
      <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0" style="border-spacing: 0; border-collapse: collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;"><tr><td style="padding-right: 10px; padding-left: 10px; padding-top:25px; padding-bottom:10px;" align="center"><v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="" style="height:46pt; v-text-anchor:middle; width:151pt;" arcsize="7%" strokecolor="#a8bf6f" fillcolor="#a8bf6f"><w:anchorlock/><v:textbox inset="0,0,0,0"><center style="color:#ffffff; font-family:'Montserrat', 'Trebuchet MS', 'Lucida Grande', 'Lucida Sans Unicode', 'Lucida Sans', Tahoma, sans-serif; font-size:16px;"><![endif]-->
        <div style="color: #ffffff; background-color: #a8bf6f; border-radius: 4px; -webkit-border-radius: 4px; -moz-border-radius: 4px; max-width: 202px; width: 172px;width: auto; border-top: 0px solid transparent; border-right: 0px solid transparent; border-bottom: 0px solid transparent; border-left: 0px solid transparent; padding-top: 15px; padding-right: 15px; padding-bottom: 15px; padding-left: 15px; font-family: 'Montserrat', 'Trebuchet MS', 'Lucida Grande', 'Lucida Sans Unicode', 'Lucida Sans', Tahoma, sans-serif; text-align: center; mso-border-alt: none;">
          <span style="font-size:16px;line-height:32px;"><a style="text-decoration : none; color : #fff;" href="`+variables.WEB_LINK_STUDENT+`"><strong>GoTo Application</strong></a></span>
        </div>
      <!--[if mso]></center></v:textbox></v:roundrect></td></tr></table><![endif]-->
    </div>
    
                      
                      
                        
    <table border="0" cellpadding="0" cellspacing="0" width="100%" class="divider " style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;min-width: 100%;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%">
        <tbody>
            <tr style="vertical-align: top">
                <td class="divider_inner" style="word-break: break-word;border-collapse: collapse !important;vertical-align: top;padding-right: 10px;padding-left: 10px;padding-top: 30px;padding-bottom: 10px;min-width: 100%;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%">
                    <table class="divider_content" align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;border-top: 0px solid transparent;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%">
                        <tbody>
                            <tr style="vertical-align: top">
                                <td style="word-break: break-word;border-collapse: collapse !important;vertical-align: top;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%">
                                    <span></span>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </td>
            </tr>
        </tbody>
    </table>
                      
                  <!--[if (!mso)&(!IE)]><!--></div><!--<![endif]-->
                  </div>
                </div>
              <!--[if (mso)|(IE)]></td></tr></table></td></tr></table><![endif]-->
            </div>
          </div>
        </div>
        <div style="background-color:transparent;">
          <div style="Margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: #525252;" class="block-grid three-up ">
            <div style="border-collapse: collapse;display: table;width: 100%;background-color:#525252;">
              <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="background-color:transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width: 600px;"><tr class="layout-full-width" style="background-color:#525252;"><![endif]-->
    
                  <!--[if (mso)|(IE)]><td align="center" width="200" style=" width:200px; padding-right: 0px; padding-left: 0px; padding-top:0px; padding-bottom:0px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;" valign="top"><![endif]-->
                <div class="col num4" style="max-width: 320px;min-width: 200px;display: table-cell;vertical-align: top;">
                  <div style="background-color: transparent; width: 100% !important;">
                  <!--[if (!mso)&(!IE)]><!--><div style="border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent; padding-top:0px; padding-bottom:0px; padding-right: 0px; padding-left: 0px;"><!--<![endif]-->
    
                      
                        
    <div align="center" style="padding-right: 0px; padding-left: 0px; padding-bottom: 0px;" class="">
      <div style="line-height:15px;font-size:1px">&#160;</div>
      <div style="display: table; max-width:131px;">
      <!--[if (mso)|(IE)]><table width="131" cellpadding="0" cellspacing="0" border="0"><tr><td style="border-collapse:collapse; padding-right: 0px; padding-left: 0px; padding-bottom: 0px;"  align="center"><table width="100%" cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse; mso-table-lspace: 0pt;mso-table-rspace: 0pt; width:131px;"><tr><td width="32" style="width:32px; padding-right: 5px;" valign="top"><![endif]-->
        <table align="left" border="0" cellspacing="0" cellpadding="0" width="32" height="32" style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;Margin-right: 5px">
          <tbody><tr style="vertical-align: top"><td align="left" valign="middle" style="word-break: break-word;border-collapse: collapse !important;vertical-align: top">
            
          <div style="line-height:5px;font-size:1px">&#160;</div>
          </td></tr>
        </tbody></table>
          <!--[if (mso)|(IE)]></td><td width="32" style="width:32px; padding-right: 5px;" valign="top"><![endif]-->
        <table align="left" border="0" cellspacing="0" cellpadding="0" width="32" height="32" style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;Margin-right: 5px">
          <tbody><tr style="vertical-align: top"><td align="left" valign="middle" style="word-break: break-word;border-collapse: collapse !important;vertical-align: top">
            
          <div style="line-height:5px;font-size:1px">&#160;</div>
          </td></tr>
        </tbody></table>
          <!--[if (mso)|(IE)]></td><td width="32" style="width:32px; padding-right: 0;" valign="top"><![endif]-->
        <table align="left" border="0" cellspacing="0" cellpadding="0" width="32" height="32" style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;Margin-right: 0">
          <tbody><tr style="vertical-align: top"><td align="left" valign="middle" style="word-break: break-word;border-collapse: collapse !important;vertical-align: top">
            
          <div style="line-height:5px;font-size:1px">&#160;</div>
          </td></tr>
        </tbody></table>
        <!--[if (mso)|(IE)]></td></tr></table></td></tr></table><![endif]-->
      </div>
    </div>
                      
                  <!--[if (!mso)&(!IE)]><!--></div><!--<![endif]-->
                  </div>
                </div>
                  <!--[if (mso)|(IE)]></td><td align="center" width="200" style=" width:200px; padding-right: 0px; padding-left: 0px; padding-top:5px; padding-bottom:5px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;" valign="top"><![endif]-->
                <div class="col num4" style="max-width: 320px;min-width: 200px;display: table-cell;vertical-align: top;">
                  <div style="background-color: transparent; width: 100% !important;">
                  <!--[if (!mso)&(!IE)]><!--><div style="border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent; padding-top:5px; padding-bottom:5px; padding-right: 0px; padding-left: 0px;"><!--<![endif]-->
    
                      
                        <div class="">
        <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 0px; padding-left: 0px; padding-top: 20px; padding-bottom: 0px;"><![endif]-->
        <div style="color:#a8bf6f;font-family:'Montserrat', 'Trebuchet MS', 'Lucida Grande', 'Lucida Sans Unicode', 'Lucida Sans', Tahoma, sans-serif;line-height:120%; padding-right: 0px; padding-left: 0px; padding-top: 20px; padding-bottom: 0px;">    
            <div style="font-size:12px;line-height:14px;color:#a8bf6f;font-family:'Montserrat', 'Trebuchet MS', 'Lucida Grande', 'Lucida Sans Unicode', 'Lucida Sans', Tahoma, sans-serif;text-align:left;"><p style="margin: 0;font-size: 12px;line-height: 14px;text-align: center"><span style="color: rgb(255, 255, 255); font-size: 12px; line-height: 14px;"><span style="font-size: 12px; line-height: 14px; color: rgb(168, 191, 111);">CAS SHRC | Bridging Talents and Opportunities</div> 
        </div>
        <!--[if mso]></td></tr></table><![endif]-->
    </div>
                      
                  <!--[if (!mso)&(!IE)]><!--></div><!--<![endif]-->
                  </div>
                </div>
                  <!--[if (mso)|(IE)]></td><td align="center" width="200" style=" width:200px; padding-right: 0px; padding-left: 0px; padding-top:5px; padding-bottom:5px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;" valign="top"><![endif]-->
                <div class="col num4" style="max-width: 320px;min-width: 200px;display: table-cell;vertical-align: top;">
                  <div style="background-color: transparent; width: 100% !important;">
                  <!--[if (!mso)&(!IE)]><!--><div style="border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent; padding-top:5px; padding-bottom:5px; padding-right: 0px; padding-left: 0px;"><!--<![endif]-->
    
                      
                        <div class="">
        <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 0px; padding-left: 0px; padding-top: 20px; padding-bottom: 0px;"><![endif]-->
        
        <!--[if mso]></td></tr></table><![endif]-->
    </div>
                      
                  <!--[if (!mso)&(!IE)]><!--></div><!--<![endif]-->
                  </div>
                </div>
              <!--[if (mso)|(IE)]></td></tr></table></td></tr></table><![endif]-->
            </div>
          </div>
        </div>
        <div style="background-color:transparent;">
          <div style="Margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: transparent;" class="block-grid ">
            <div style="border-collapse: collapse;display: table;width: 100%;background-color:transparent;">
              <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="background-color:transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width: 600px;"><tr class="layout-full-width" style="background-color:transparent;"><![endif]-->
    
                  <!--[if (mso)|(IE)]><td align="center" width="600" style=" width:600px; padding-right: 0px; padding-left: 0px; padding-top:0px; padding-bottom:5px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;" valign="top"><![endif]-->
                <div class="col num12" style="min-width: 320px;max-width: 600px;display: table-cell;vertical-align: top;">
                  <div style="background-color: transparent; width: 100% !important;">
                  <!--[if (!mso)&(!IE)]><!--><div style="border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent; padding-top:0px; padding-bottom:5px; padding-right: 0px; padding-left: 0px;"><!--<![endif]-->
    
                      
                        <div align="center" class="img-container center  autowidth  fullwidth " style="padding-right: 0px;  padding-left: 0px;">
    <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr style="line-height:0px;line-height:0px;"><td style="padding-right: 0px; padding-left: 0px;" align="center"><![endif]-->
      <img class="center  autowidth  fullwidth" align="center" border="0" src="https://d1oco4z2z1fhwp.cloudfront.net/templates/default/20/rounder-dwn.png" alt="Image" title="Image" style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: block !important;border: 0;height: auto;float: none;width: 100%;max-width: 600px" width="600">
    <!--[if mso]></td></tr></table><![endif]-->
    </div>
    
                      
                      
                        
    <table border="0" cellpadding="0" cellspacing="0" width="100%" class="divider " style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;min-width: 100%;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%">
        <tbody>
            <tr style="vertical-align: top">
                <td class="divider_inner" style="word-break: break-word;border-collapse: collapse !important;vertical-align: top;padding-right: 30px;padding-left: 30px;padding-top: 30px;padding-bottom: 30px;min-width: 100%;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%">
                    <table class="divider_content" align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;border-top: 0px solid transparent;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%">
                        <tbody>
                            <tr style="vertical-align: top">
                                <td style="word-break: break-word;border-collapse: collapse !important;vertical-align: top;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%">
                                    <span></span>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </td>
            </tr>
        </tbody>
    </table>
                      
                  <!--[if (!mso)&(!IE)]><!--></div><!--<![endif]-->
                  </div>
                </div>
              <!--[if (mso)|(IE)]></td></tr></table></td></tr></table><![endif]-->
            </div>
          </div>
        </div>
       <!--[if (mso)|(IE)]></td></tr></table><![endif]-->
            </td>
      </tr>
      </tbody>
      </table>
      <!--[if (mso)|(IE)]></div><![endif]-->
    
    
    </body></html>`
    
        sendMail.sendMail(email,html,'CAS SHRC: Interview Reject ')
        setting.save_notification(student_id,emp_id,vacancy_id,"Interview rejected","9")
        setting.status_history(student_id,vacancy_id,"9")

    }
});
});
})

function reject(vacancy_id,student_id)
{
    const newInvite = new Reject({
        student_id: student_id,
        vacancy_id: vacancy_id,
        });
    
        newInvite.save()
        .then(college =>{ 
            
            console.log("success")
        })
        .catch(err => {
            
           console.log(err)
        });
}

function updateInvitation(student_id,vacancy_id,status)
{
    Invite.findOneAndUpdate(
        { student_id : student_id,vacancy_id:vacancy_id },
        {$set:{
        status:status,
    }},
    {runValidators: true, context: 'query' })

    .then(college =>{  
                
        res.json(

            setting.status("Succesfully Invite",true,"invited",college)
    
            );
    })
    .catch(err => {
        
        if(err)
        {
            res.json(

                setting.status("Error",false,"error",err)
        
                );
        }
    });
}

// **************************update information to where the student interview and date**************************

//************************************************************************************************************* */
router.post("/student/:student_id/vacancy/:vacancy_id/update",middleware.checkToken, (req, res) => {

    var student_id=req.params.student_id;
    var vacancy_id=req.params.vacancy_id;
  
    Invite.findOneAndUpdate(
        { student_id : student_id,vacancy_id:vacancy_id },
        {$set:{
        date:req.body.date,venue:req.body.venue,
    }},
    {runValidators: true, context: 'query' })

    .then(college =>{  
                
        res.json(

            setting.status("Succesfully Invite",true,"invited",college)
    
            );
    })
    .catch(err => {
        
        if(err)
        {
            res.json(

                setting.status("Error",false,"error",err)
        
                );
        }
    });
  })


  
//************************************************************************************************************ */
//*************************************View Students Status*************************************************** */
//************************************************************************************************************ */

router.post('/send_interview/student/:student_id/vacancy/:vacancy_id', middleware.checkToken,async (req, res) => {

    var student_id=req.params.student_id;
    var vacancy_id=req.params.vacancy_id;

    if(req.body.date==undefined || req.body.date==null || req.body.date=='') 
        {
            return res.json(

                setting.status("Date cannot be empty",false,"date is empty",null)
        
            );
        }

        if(req.body.venue==undefined || req.body.venue==null || req.body.venue=='') 
        {
            return res.json(

                setting.status("Venue cannot be empty",false,"venue is empty",null)
        
            );
        }   
        
        
      var linkk = variables.WEB_LINK_STUDENT;        

        Invite.findOneAndUpdate(
            { student_id : student_id,vacancy_id:vacancy_id },
            {$set:{
            date:req.body.date,
            venue:req.body.venue,
        }},
        {runValidators: true, context: 'query' })
    
        .then(college =>{ 

            var email="";
            var name="";
            var job_title="";
            var emp_name="";
            var emp_email="";
            
            Student.find({_id:student_id})
            .then(async result => {
    
             email=await result[0].email;
             name=await result[0].fname;

             Vacancy.find({_id:vacancy_id}).populate("employer_id")
                .then(async result => {

                job_title=await result[0].job_title;
                emp_email=await result[0].employer_id.email;

            html=`<!DOCTYPE HTML PUBLIC "-//W3C//DTD XHTML 1.0 Transitional //EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd"><html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office"><head>
            <!--[if gte mso 9]><xml>
             <o:OfficeDocumentSettings>
              <o:AllowPNG/>
              <o:PixelsPerInch>96</o:PixelsPerInch>
             </o:OfficeDocumentSettings>
            </xml><![endif]-->
            <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
            <meta name="viewport" content="width=device-width">
            <!--[if !mso]><!--><meta http-equiv="X-UA-Compatible" content="IE=edge"><!--<![endif]-->
            <title></title>
            <!--[if !mso]><!-- -->
            <link href="https://fonts.googleapis.com/css?family=Montserrat" rel="stylesheet" type="text/css">
            <!--<![endif]-->
            
            <style type="text/css" id="media-query">
              body {
          margin: 0;
          padding: 0; }
        
        table, tr, td {
          vertical-align: top;
          border-collapse: collapse; }
        
        .ie-browser table, .mso-container table {
          table-layout: fixed; }
        
        * {
          line-height: inherit; }
        
        a[x-apple-data-detectors=true] {
          color: inherit !important;
          text-decoration: none !important; }
        
        [owa] .img-container div, [owa] .img-container button {
          display: block !important; }
        
        [owa] .fullwidth button {
          width: 100% !important; }
        
        [owa] .block-grid .col {
          display: table-cell;
          float: none !important;
          vertical-align: top; }
        
        .ie-browser .num12, .ie-browser .block-grid, [owa] .num12, [owa] .block-grid {
          width: 600px !important; }
        
        .ExternalClass, .ExternalClass p, .ExternalClass span, .ExternalClass font, .ExternalClass td, .ExternalClass div {
          line-height: 100%; }
        
        .ie-browser .mixed-two-up .num4, [owa] .mixed-two-up .num4 {
          width: 200px !important; }
        
        .ie-browser .mixed-two-up .num8, [owa] .mixed-two-up .num8 {
          width: 400px !important; }
        
        .ie-browser .block-grid.two-up .col, [owa] .block-grid.two-up .col {
          width: 300px !important; }
        
        .ie-browser .block-grid.three-up .col, [owa] .block-grid.three-up .col {
          width: 200px !important; }
        
        .ie-browser .block-grid.four-up .col, [owa] .block-grid.four-up .col {
          width: 150px !important; }
        
        .ie-browser .block-grid.five-up .col, [owa] .block-grid.five-up .col {
          width: 120px !important; }
        
        .ie-browser .block-grid.six-up .col, [owa] .block-grid.six-up .col {
          width: 100px !important; }
        
        .ie-browser .block-grid.seven-up .col, [owa] .block-grid.seven-up .col {
          width: 85px !important; }
        
        .ie-browser .block-grid.eight-up .col, [owa] .block-grid.eight-up .col {
          width: 75px !important; }
        
        .ie-browser .block-grid.nine-up .col, [owa] .block-grid.nine-up .col {
          width: 66px !important; }
        
        .ie-browser .block-grid.ten-up .col, [owa] .block-grid.ten-up .col {
          width: 60px !important; }
        
        .ie-browser .block-grid.eleven-up .col, [owa] .block-grid.eleven-up .col {
          width: 54px !important; }
        
        .ie-browser .block-grid.twelve-up .col, [owa] .block-grid.twelve-up .col {
          width: 50px !important; }
        
        @media only screen and (min-width: 620px) {
          .block-grid {
            width: 600px !important; }
          .block-grid .col {
            vertical-align: top; }
            .block-grid .col.num12 {
              width: 600px !important; }
          .block-grid.mixed-two-up .col.num4 {
            width: 200px !important; }
          .block-grid.mixed-two-up .col.num8 {
            width: 400px !important; }
          .block-grid.two-up .col {
            width: 300px !important; }
          .block-grid.three-up .col {
            width: 200px !important; }
          .block-grid.four-up .col {
            width: 150px !important; }
          .block-grid.five-up .col {
            width: 120px !important; }
          .block-grid.six-up .col {
            width: 100px !important; }
          .block-grid.seven-up .col {
            width: 85px !important; }
          .block-grid.eight-up .col {
            width: 75px !important; }
          .block-grid.nine-up .col {
            width: 66px !important; }
          .block-grid.ten-up .col {
            width: 60px !important; }
          .block-grid.eleven-up .col {
            width: 54px !important; }
          .block-grid.twelve-up .col {
            width: 50px !important; } }
        
        @media (max-width: 620px) {
          .block-grid, .col {
            min-width: 320px !important;
            max-width: 100% !important;
            display: block !important; }
          .block-grid {
            width: calc(100% - 40px) !important; }
          .col {
            width: 100% !important; }
            .col > div {
              margin: 0 auto; }
          img.fullwidth, img.fullwidthOnMobile {
            max-width: 100% !important; }
          .no-stack .col {
            min-width: 0 !important;
            display: table-cell !important; }
          .no-stack.two-up .col {
            width: 50% !important; }
          .no-stack.mixed-two-up .col.num4 {
            width: 33% !important; }
          .no-stack.mixed-two-up .col.num8 {
            width: 66% !important; }
          .no-stack.three-up .col.num4 {
            width: 33% !important; }
          .no-stack.four-up .col.num3 {
            width: 25% !important; }
          .mobile_hide {
            min-height: 0px;
            max-height: 0px;
            max-width: 0px;
            display: none;
            overflow: hidden;
            font-size: 0px; } }
        
            </style>
        </head>
        <body class="clean-body" style="margin: 0;padding: 0;-webkit-text-size-adjust: 100%;background-color: #e2eace">
          <style type="text/css" id="media-query-bodytag">
            @media (max-width: 520px) {
              .block-grid {
                min-width: 320px!important;
                max-width: 100%!important;
                width: 100%!important;
                display: block!important;
              }
        
              .col {
                min-width: 320px!important;
                max-width: 100%!important;
                width: 100%!important;
                display: block!important;
              }
        
                .col > div {
                  margin: 0 auto;
                }
        
              img.fullwidth {
                max-width: 100%!important;
              }
                    img.fullwidthOnMobile {
                max-width: 100%!important;
              }
              .no-stack .col {
                        min-width: 0!important;
                        display: table-cell!important;
                    }
                    .no-stack.two-up .col {
                        width: 50%!important;
                    }
                    .no-stack.mixed-two-up .col.num4 {
                        width: 33%!important;
                    }
                    .no-stack.mixed-two-up .col.num8 {
                        width: 66%!important;
                    }
                    .no-stack.three-up .col.num4 {
                        width: 33%!important;
                    }
                    .no-stack.four-up .col.num3 {
                        width: 25%!important;
                    }
              .mobile_hide {
                min-height: 0px!important;
                max-height: 0px!important;
                max-width: 0px!important;
                display: none!important;
                overflow: hidden!important;
                font-size: 0px!important;
              }
            }
          </style>
          <!--[if IE]><div class="ie-browser"><![endif]-->
          <!--[if mso]><div class="mso-container"><![endif]-->
          <table class="nl-container" style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;min-width: 320px;Margin: 0 auto;background-color: #e2eace;width: 100%" cellpadding="0" cellspacing="0">
            <tbody>
            <tr style="vertical-align: top">
                <td style="word-break: break-word;border-collapse: collapse !important;vertical-align: top">
            <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td align="center" style="background-color: #e2eace;"><![endif]-->
        
            <div style="background-color:transparent;">
              <div style="Margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: transparent;" class="block-grid ">
                <div style="border-collapse: collapse;display: table;width: 100%;background-color:transparent;">
                  <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="background-color:transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width: 600px;"><tr class="layout-full-width" style="background-color:transparent;"><![endif]-->
        
                      <!--[if (mso)|(IE)]><td align="center" width="600" style=" width:600px; padding-right: 0px; padding-left: 0px; padding-top:5px; padding-bottom:0px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;" valign="top"><![endif]-->
                    <div class="col num12" style="min-width: 320px;max-width: 600px;display: table-cell;vertical-align: top;">
                      <div style="background-color: transparent; width: 100% !important;">
                      <!--[if (!mso)&(!IE)]><!--><div style="border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent; padding-top:5px; padding-bottom:0px; padding-right: 0px; padding-left: 0px;"><!--<![endif]-->
        
                          
                            <div align="center" class="img-container center  autowidth  fullwidth " style="padding-right: 0px;  padding-left: 0px;">
        <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr style="line-height:0px;line-height:0px;"><td style="padding-right: 0px; padding-left: 0px;" align="center"><![endif]-->
        <div style="line-height:25px;font-size:1px">&#160;</div>  <img class="center  autowidth  fullwidth" align="center" border="0" src="https://d1oco4z2z1fhwp.cloudfront.net/templates/default/20/rounder-up.png" alt="Image" title="Image" style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: block !important;border: 0;height: auto;float: none;width: 100%;max-width: 600px" width="600">
        <!--[if mso]></td></tr></table><![endif]-->
        </div>
        
                          
                      <!--[if (!mso)&(!IE)]><!--></div><!--<![endif]-->
                      </div>
                    </div>
                  <!--[if (mso)|(IE)]></td></tr></table></td></tr></table><![endif]-->
                </div>
              </div>
            </div>
            <div style="background-color:transparent;">
              <div style="Margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: #FFFFFF;" class="block-grid ">
                <div style="border-collapse: collapse;display: table;width: 100%;background-color:#FFFFFF;">
                  <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="background-color:transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width: 600px;"><tr class="layout-full-width" style="background-color:#FFFFFF;"><![endif]-->
        
                      <!--[if (mso)|(IE)]><td align="center" width="600" style=" width:600px; padding-right: 0px; padding-left: 0px; padding-top:5px; padding-bottom:5px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;" valign="top"><![endif]-->
                    <div class="col num12" style="min-width: 320px;max-width: 600px;display: table-cell;vertical-align: top;">
                      <div style="background-color: transparent; width: 100% !important;">
                      <!--[if (!mso)&(!IE)]><!--><div style="border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent; padding-top:5px; padding-bottom:5px; padding-right: 0px; padding-left: 0px;"><!--<![endif]-->
        
                          
                            <div align="center" class="img-container center  autowidth  " style="padding-right: 0px;  padding-left: 0px;">
        <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr style="line-height:0px;line-height:0px;"><td style="padding-right: 0px; padding-left: 0px;" align="center"><![endif]-->
          <img class="center  autowidth " align="center" border="0" src="https://i.imgur.com/FrVRrnL.png" alt="Image" title="Image" style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: block !important;border: 0;height: auto;float: none;width: 100%;max-width: 250px" width="250">
        <!--[if mso]></td></tr></table><![endif]-->
        </div>
        
                          
                          
                            <div class="">
            <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 10px; padding-left: 10px; padding-top: 10px; padding-bottom: 10px;"><![endif]-->
            <div style="color:#555555;font-family:'Montserrat', 'Trebuchet MS', 'Lucida Grande', 'Lucida Sans Unicode', 'Lucida Sans', Tahoma, sans-serif;line-height:150%; padding-right: 10px; padding-left: 10px; padding-top: 10px; padding-bottom: 10px;"> 
                <div style="font-size:12px;line-height:18px;color:#555555;font-family:'Montserrat', 'Trebuchet MS', 'Lucida Grande', 'Lucida Sans Unicode', 'Lucida Sans', Tahoma, sans-serif;text-align:left;"><p style="margin: 0;font-size: 14px;line-height: 21px;text-align: center"></p></div>    
            </div>
            <!--[if mso]></td></tr></table><![endif]-->
        </div>
                          
                      <!--[if (!mso)&(!IE)]><!--></div><!--<![endif]-->
                      </div>
                    </div>
                  <!--[if (mso)|(IE)]></td></tr></table></td></tr></table><![endif]-->
                </div>
              </div>
            </div>
            <div style="background-color:transparent;">
              <div style="Margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: #FFFFFF;" class="block-grid ">
                <div style="border-collapse: collapse;display: table;width: 100%;background-color:#FFFFFF;">
                  <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="background-color:transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width: 600px;"><tr class="layout-full-width" style="background-color:#FFFFFF;"><![endif]-->
        
                      <!--[if (mso)|(IE)]><td align="center" width="600" style=" width:600px; padding-right: 0px; padding-left: 0px; padding-top:0px; padding-bottom:5px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;" valign="top"><![endif]-->
                    <div class="col num12" style="min-width: 320px;max-width: 600px;display: table-cell;vertical-align: top;">
                      <div style="background-color: transparent; width: 100% !important;">
                      <!--[if (!mso)&(!IE)]><!--><div style="border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent; padding-top:0px; padding-bottom:5px; padding-right: 0px; padding-left: 0px;"><!--<![endif]-->
        
                          
                            <div class="">
            <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 10px; padding-left: 10px; padding-top: 10px; padding-bottom: 10px;"><![endif]-->
            <div style="color:#0D0D0D;font-family:'Montserrat', 'Trebuchet MS', 'Lucida Grande', 'Lucida Sans Unicode', 'Lucida Sans', Tahoma, sans-serif;line-height:120%; padding-right: 10px; padding-left: 10px; padding-top: 10px; padding-bottom: 10px;"> 
                <div style="font-size:12px;line-height:14px;color:#0D0D0D;font-family:'Montserrat', 'Trebuchet MS', 'Lucida Grande', 'Lucida Sans Unicode', 'Lucida Sans', Tahoma, sans-serif;text-align:left;">
              <p style="margin: 0;font-size: 14px;line-height: 17px;text-align: center">
               <strong> 
              <span style="font-size: 28px; line-height: 33px;">
              Interview Invitation
            </span> </strong> <br><br>
        
          </p></div>    
            </div>
            <!--[if mso]></td></tr></table><![endif]-->
        </div>
                          
                          
                            <div align="center" class="img-container center  autowidth  " style="padding-right: 0px;  padding-left: 0px;">
        <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr style="line-height:0px;line-height:0px;"><td style="padding-right: 0px; padding-left: 0px;" align="center"><![endif]-->
          <img class="center  autowidth " align="center" border="0" src="https://d1oco4z2z1fhwp.cloudfront.net/templates/default/20/divider.png" alt="Image" title="Image" style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: block !important;border: 0;height: auto;float: none;width: 100%;max-width: 316px" width="316">
        <!--[if mso]></td></tr></table><![endif]-->
        </div>
        
                          
                          
                            <div class="">
            <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 10px; padding-left: 10px; padding-top: 10px; padding-bottom: 10px;"><![endif]-->
            <div style="color:#555555;font-family:'Montserrat', 'Trebuchet MS', 'Lucida Grande', 'Lucida Sans Unicode', 'Lucida Sans', Tahoma, sans-serif;line-height:150%; padding-right: 10px; padding-left: 10px; padding-top: 10px; padding-bottom: 10px;"> 
                
            </div>
            <!--[if mso]></td></tr></table><![endif]-->
        </div>
                          
                          
                            <div class="">
            <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 10px; padding-left: 10px; padding-top: 20px; padding-bottom: 10px;"><![endif]-->
            <div style="color:#0D0D0D;font-family:'Montserrat', 'Trebuchet MS', 'Lucida Grande', 'Lucida Sans Unicode', 'Lucida Sans', Tahoma, sans-serif;line-height:150%; padding-right: 10px; padding-left: 10px; padding-top: 20px; padding-bottom: 10px;"> 
                <div style="font-size:12px;line-height:18px;color:#0D0D0D;font-family:'Montserrat', 'Trebuchet MS', 'Lucida Grande', 'Lucida Sans Unicode', 'Lucida Sans', Tahoma, sans-serif;text-align:left;"><p style="margin: 0;font-size: 14px;line-height: 21px;text-align: center"> Dear ` + name + `, youe interview details for the position of ` + job_title + `. <br> <br></b>Date : `+req.body.date+` <br> <br> Venue : `+req.body.venue+` <br><br>
                    You may contact the employer via this email: `+ emp_email +`
        
        
        
        
             </div>  
            </div>
            <!--[if mso]></td></tr></table><![endif]-->
        </div>
                          
                          
                            
        <div align="center" class="button-container center " style="padding-right: 10px; padding-left: 10px; padding-top:25px; padding-bottom:10px;">
          <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0" style="border-spacing: 0; border-collapse: collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;"><tr><td style="padding-right: 10px; padding-left: 10px; padding-top:25px; padding-bottom:10px;" align="center"><v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="" style="height:46pt; v-text-anchor:middle; width:151pt;" arcsize="7%" strokecolor="#a8bf6f" fillcolor="#a8bf6f"><w:anchorlock/><v:textbox inset="0,0,0,0"><center style="color:#ffffff; font-family:'Montserrat', 'Trebuchet MS', 'Lucida Grande', 'Lucida Sans Unicode', 'Lucida Sans', Tahoma, sans-serif; font-size:16px;"><![endif]-->
            <div style="color: #ffffff; background-color: #a8bf6f; border-radius: 4px; -webkit-border-radius: 4px; -moz-border-radius: 4px; max-width: 202px; width: 172px;width: auto; border-top: 0px solid transparent; border-right: 0px solid transparent; border-bottom: 0px solid transparent; border-left: 0px solid transparent; padding-top: 15px; padding-right: 15px; padding-bottom: 15px; padding-left: 15px; font-family: 'Montserrat', 'Trebuchet MS', 'Lucida Grande', 'Lucida Sans Unicode', 'Lucida Sans', Tahoma, sans-serif; text-align: center; mso-border-alt: none;">
              <span style="font-size:16px;line-height:32px;"><a href="`+ linkk +`" style="text-decoration : none; color : #fff;"><strong>GoTo Application</strong></a></span>
            </div>
          <!--[if mso]></center></v:textbox></v:roundrect></td></tr></table><![endif]-->
        </div>
        
                          
                          
                            
        <table border="0" cellpadding="0" cellspacing="0" width="100%" class="divider " style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;min-width: 100%;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%">
            <tbody>
                <tr style="vertical-align: top">
                    <td class="divider_inner" style="word-break: break-word;border-collapse: collapse !important;vertical-align: top;padding-right: 10px;padding-left: 10px;padding-top: 30px;padding-bottom: 10px;min-width: 100%;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%">
                        <table class="divider_content" align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;border-top: 0px solid transparent;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%">
                            <tbody>
                                <tr style="vertical-align: top">
                                    <td style="word-break: break-word;border-collapse: collapse !important;vertical-align: top;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%">
                                        <span></span>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </td>
                </tr>
            </tbody>
        </table>
                          
                      <!--[if (!mso)&(!IE)]><!--></div><!--<![endif]-->
                      </div>
                    </div>
                  <!--[if (mso)|(IE)]></td></tr></table></td></tr></table><![endif]-->
                </div>
              </div>
            </div>
            <div style="background-color:transparent;">
              <div style="Margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: #525252;" class="block-grid three-up ">
                <div style="border-collapse: collapse;display: table;width: 100%;background-color:#525252;">
                  <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="background-color:transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width: 600px;"><tr class="layout-full-width" style="background-color:#525252;"><![endif]-->
        
                      <!--[if (mso)|(IE)]><td align="center" width="200" style=" width:200px; padding-right: 0px; padding-left: 0px; padding-top:0px; padding-bottom:0px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;" valign="top"><![endif]-->
                    <div class="col num4" style="max-width: 320px;min-width: 200px;display: table-cell;vertical-align: top;">
                      <div style="background-color: transparent; width: 100% !important;">
                      <!--[if (!mso)&(!IE)]><!--><div style="border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent; padding-top:0px; padding-bottom:0px; padding-right: 0px; padding-left: 0px;"><!--<![endif]-->
        
                          
                            
        <div align="center" style="padding-right: 0px; padding-left: 0px; padding-bottom: 0px;" class="">
          <div style="line-height:15px;font-size:1px">&#160;</div>
          <div style="display: table; max-width:131px;">
          <!--[if (mso)|(IE)]><table width="131" cellpadding="0" cellspacing="0" border="0"><tr><td style="border-collapse:collapse; padding-right: 0px; padding-left: 0px; padding-bottom: 0px;"  align="center"><table width="100%" cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse; mso-table-lspace: 0pt;mso-table-rspace: 0pt; width:131px;"><tr><td width="32" style="width:32px; padding-right: 5px;" valign="top"><![endif]-->
            <table align="left" border="0" cellspacing="0" cellpadding="0" width="32" height="32" style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;Margin-right: 5px">
              <tbody><tr style="vertical-align: top"><td align="left" valign="middle" style="word-break: break-word;border-collapse: collapse !important;vertical-align: top">
                
              <div style="line-height:5px;font-size:1px">&#160;</div>
              </td></tr>
            </tbody></table>
              <!--[if (mso)|(IE)]></td><td width="32" style="width:32px; padding-right: 5px;" valign="top"><![endif]-->
            <table align="left" border="0" cellspacing="0" cellpadding="0" width="32" height="32" style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;Margin-right: 5px">
              <tbody><tr style="vertical-align: top"><td align="left" valign="middle" style="word-break: break-word;border-collapse: collapse !important;vertical-align: top">
                
              <div style="line-height:5px;font-size:1px">&#160;</div>
              </td></tr>
            </tbody></table>
              <!--[if (mso)|(IE)]></td><td width="32" style="width:32px; padding-right: 0;" valign="top"><![endif]-->
            <table align="left" border="0" cellspacing="0" cellpadding="0" width="32" height="32" style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;Margin-right: 0">
              <tbody><tr style="vertical-align: top"><td align="left" valign="middle" style="word-break: break-word;border-collapse: collapse !important;vertical-align: top">
                
              <div style="line-height:5px;font-size:1px">&#160;</div>
              </td></tr>
            </tbody></table>
            <!--[if (mso)|(IE)]></td></tr></table></td></tr></table><![endif]-->
          </div>
        </div>
                          
                      <!--[if (!mso)&(!IE)]><!--></div><!--<![endif]-->
                      </div>
                    </div>
                      <!--[if (mso)|(IE)]></td><td align="center" width="200" style=" width:200px; padding-right: 0px; padding-left: 0px; padding-top:5px; padding-bottom:5px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;" valign="top"><![endif]-->
                    <div class="col num4" style="max-width: 320px;min-width: 200px;display: table-cell;vertical-align: top;">
                      <div style="background-color: transparent; width: 100% !important;">
                      <!--[if (!mso)&(!IE)]><!--><div style="border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent; padding-top:5px; padding-bottom:5px; padding-right: 0px; padding-left: 0px;"><!--<![endif]-->
        
                          
                            <div class="">
            <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 0px; padding-left: 0px; padding-top: 20px; padding-bottom: 0px;"><![endif]-->
            <div style="color:#a8bf6f;font-family:'Montserrat', 'Trebuchet MS', 'Lucida Grande', 'Lucida Sans Unicode', 'Lucida Sans', Tahoma, sans-serif;line-height:120%; padding-right: 0px; padding-left: 0px; padding-top: 20px; padding-bottom: 0px;">    
                <div style="font-size:12px;line-height:14px;color:#a8bf6f;font-family:'Montserrat', 'Trebuchet MS', 'Lucida Grande', 'Lucida Sans Unicode', 'Lucida Sans', Tahoma, sans-serif;text-align:left;"><p style="margin: 0;font-size: 12px;line-height: 14px;text-align: center"><span style="color: rgb(255, 255, 255); font-size: 12px; line-height: 14px;"><span style="font-size: 12px; line-height: 14px; color: rgb(168, 191, 111);">CAS SHRC | Bridging Talents and Opportunities</div> 
            </div>
            <!--[if mso]></td></tr></table><![endif]-->
        </div>
                          
                      <!--[if (!mso)&(!IE)]><!--></div><!--<![endif]-->
                      </div>
                    </div>
                      <!--[if (mso)|(IE)]></td><td align="center" width="200" style=" width:200px; padding-right: 0px; padding-left: 0px; padding-top:5px; padding-bottom:5px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;" valign="top"><![endif]-->
                    <div class="col num4" style="max-width: 320px;min-width: 200px;display: table-cell;vertical-align: top;">
                      <div style="background-color: transparent; width: 100% !important;">
                      <!--[if (!mso)&(!IE)]><!--><div style="border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent; padding-top:5px; padding-bottom:5px; padding-right: 0px; padding-left: 0px;"><!--<![endif]-->
        
                          
                            <div class="">
            <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 0px; padding-left: 0px; padding-top: 20px; padding-bottom: 0px;"><![endif]-->
            
            <!--[if mso]></td></tr></table><![endif]-->
        </div>
                          
                      <!--[if (!mso)&(!IE)]><!--></div><!--<![endif]-->
                      </div>
                    </div>
                  <!--[if (mso)|(IE)]></td></tr></table></td></tr></table><![endif]-->
                </div>
              </div>
            </div>
            <div style="background-color:transparent;">
              <div style="Margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: transparent;" class="block-grid ">
                <div style="border-collapse: collapse;display: table;width: 100%;background-color:transparent;">
                  <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="background-color:transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width: 600px;"><tr class="layout-full-width" style="background-color:transparent;"><![endif]-->
        
                      <!--[if (mso)|(IE)]><td align="center" width="600" style=" width:600px; padding-right: 0px; padding-left: 0px; padding-top:0px; padding-bottom:5px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;" valign="top"><![endif]-->
                    <div class="col num12" style="min-width: 320px;max-width: 600px;display: table-cell;vertical-align: top;">
                      <div style="background-color: transparent; width: 100% !important;">
                      <!--[if (!mso)&(!IE)]><!--><div style="border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent; padding-top:0px; padding-bottom:5px; padding-right: 0px; padding-left: 0px;"><!--<![endif]-->
        
                          
                            <div align="center" class="img-container center  autowidth  fullwidth " style="padding-right: 0px;  padding-left: 0px;">
        <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr style="line-height:0px;line-height:0px;"><td style="padding-right: 0px; padding-left: 0px;" align="center"><![endif]-->
          <img class="center  autowidth  fullwidth" align="center" border="0" src="https://d1oco4z2z1fhwp.cloudfront.net/templates/default/20/rounder-dwn.png" alt="Image" title="Image" style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: block !important;border: 0;height: auto;float: none;width: 100%;max-width: 600px" width="600">
        <!--[if mso]></td></tr></table><![endif]-->
        </div>
        
                          
                          
                            
        <table border="0" cellpadding="0" cellspacing="0" width="100%" class="divider " style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;min-width: 100%;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%">
            <tbody>
                <tr style="vertical-align: top">
                    <td class="divider_inner" style="word-break: break-word;border-collapse: collapse !important;vertical-align: top;padding-right: 30px;padding-left: 30px;padding-top: 30px;padding-bottom: 30px;min-width: 100%;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%">
                        <table class="divider_content" align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;border-top: 0px solid transparent;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%">
                            <tbody>
                                <tr style="vertical-align: top">
                                    <td style="word-break: break-word;border-collapse: collapse !important;vertical-align: top;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%">
                                        <span></span>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </td>
                </tr>
            </tbody>
        </table>
                          
                      <!--[if (!mso)&(!IE)]><!--></div><!--<![endif]-->
                      </div>
                    </div>
                  <!--[if (mso)|(IE)]></td></tr></table></td></tr></table><![endif]-->
                </div>
              </div>
            </div>
           <!--[if (mso)|(IE)]></td></tr></table><![endif]-->
                </td>
          </tr>
          </tbody>
          </table>
          <!--[if (mso)|(IE)]></div><![endif]-->
        
        
        </body></html>`
        
            sendMail.sendMail(email,html,'CAS SHRC: Interview Details')
            });

        });

            return res.json(
    
                setting.status("Succesfully send interview details",true,"invited",college)
        
                );
        })
        .catch(err => {
            
            if(err)
            {
                return res.json(
    
                    setting.status("Error",false,"error",err)
            
                    );
            }
        });

       
})

//************************************************************************************************************ */
//*************************************View Students Status*************************************************** */
//************************************************************************************************************ */

router.get('/interview/student/:student_id/vacancy/:vacancy_id', middleware.checkToken,async (req, res) => {

    var student_id=req.params.student_id;
    var vacancy_id=req.params.vacancy_id;

    Invite.find({student_id:student_id,vacancy_id:vacancy_id})
        .then(result => {
            res.send(
  
                setting.status("Show all",true,"details",result)
        
              );
        }); 
})

module.exports = router;