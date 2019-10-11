var mongoose = require('mongoose');  
var mongooseAggregatePaginate = require('mongoose-aggregate-paginate');
var uniqueValidator = require('mongoose-unique-validator');
var mongoose_delete=require('mongoose-delete')


var courseSchema = new mongoose.Schema(
{
    name : {type: String, required: true, max: 25,collation:{locale:'en',strenth:2}, trim: true},
    email : {type: String, required: true, max: 25, trim: true},
    message : {type: String, required: true},
},
{
    timestamps:true
});

courseSchema.plugin(mongoose_delete)
courseSchema.plugin(mongooseAggregatePaginate);
courseSchema.plugin(uniqueValidator);
mongoose.model('Contact_us', courseSchema);

module.exports = mongoose.model('Contact_us');