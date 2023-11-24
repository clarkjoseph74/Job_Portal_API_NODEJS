const mongoose = require('mongoose')
const jobSchema = mongoose.Schema({
    company:{
        type : String,
        required: [true,'Company Name is required'],
    },
    position:{
        type : String,
        required: [true,'Position is required'],
    },
    desc:{
        type : String,
        required: [true,'Description is required'],
    },
    status:{
        type : String,
        enum: ['pending', 'reject', 'interview'],
        default:'pending'
    },
    workType:{
        type: String,
        enum : ['full-time', 'part-time', 'internship'],
        default:'full-time'
    },
    workLocation: {
        type: String,
        default:'Egypt , Cairo',
        required: [true,'Location is required'],

    },
    createdBy : {
        type: mongoose.Types.ObjectId,
        ref:'User'
    }
},{timestamps:true})

module.exports = mongoose.model('Job' ,jobSchema)