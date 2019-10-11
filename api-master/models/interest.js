var mongoose = require('mongoose');
var mongooseAggregatePaginate = require('mongoose-aggregate-paginate');
var uniqueValidator = require('mongoose-unique-validator');
var mongoose_delete=require('mongoose-delete')


var collegeSchema = new mongoose.Schema(
{
    student_id : {type:mongoose.Schema.Types.ObjectId, ref : 'University', required: true }, 
    vacancy_id : {type:mongoose.Schema.Types.ObjectId, ref : 'Vacancy', required: true }, 
	status:{type:String,default:"active"}
},
{
    timestamps:true
});

collegeSchema.plugin(mongoose_delete)
collegeSchema.plugin(mongooseAggregatePaginate);
collegeSchema.plugin(uniqueValidator);
mongoose.model('Interest', collegeSchema);

module.exports = mongoose.model('Interest');