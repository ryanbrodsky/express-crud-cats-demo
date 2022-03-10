const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const catSchema = new Schema({
    name: {type:String, required: true},
    age: {type:Number, required:true},
    user: {type: Schema.Types.ObjectId, ref: 'User'}
}, {timestamps: true})

const Cat = mongoose.model('Cat', catSchema);

module.exports = Cat;