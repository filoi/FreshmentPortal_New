var mongoose = require('mongoose');
var mongooseAggregatePaginate = require('mongoose-aggregate-paginate');
var uniqueValidator = require('mongoose-unique-validator');
var mongoose_delete=require('mongoose-delete')

// Here we create a schema called User with the following fields.
var userSchema = new mongoose.Schema(
{
    name : {type: String, max: 25, trim: false},
    key : {type: String, max: 25, trim: false},
    value : {type: String, required: true, max: 25, trim: false},
},
{
    timestamps:true
});

userSchema.plugin(mongoose_delete)
userSchema.plugin(mongooseAggregatePaginate);
userSchema.plugin(uniqueValidator);
mongoose.model('Setting', userSchema);
module.exports = mongoose.model('Setting');