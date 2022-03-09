const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const catSchema = new Schema({
    name: {type:String, required: true},
    age: {type:Number, required:true}
}, {timestamps: true})

const Cat = mongoose.model('Cat', catSchema);

module.exports = Cat;