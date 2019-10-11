var mongoose = require('mongoose');
var mongooseAggregatePaginate = require('mongoose-aggregate-paginate');
var uniqueValidator = require('mongoose-unique-validator');
var random=require('mongoose-simple-random')

var universitySchema = new mongoose.Schema(
{
    fname : {type:String, required: true }, 
    email : {type:String, required: true }, 
	contact_no : {type:String, required: true }, 
	college_name : {type:String, required: true }, 
    college_email : {type:String, required: true }, 
    college_contatc_no : {type:String, required: true }, 

},
{
    timestamps:true
});

universitySchema.plugin(random);
universitySchema.plugin(mongooseAggregatePaginate);
universitySchema.plugin(uniqueValidator);
mongoose.model('Other_enroll', universitySchema);

module.exports = mongoose.model('Other_enroll');