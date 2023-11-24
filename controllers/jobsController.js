const { default: mongoose } = require("mongoose");
const jobsModel = require("../models/jobsModel");
const moment = require("moment/moment");

const createJobController = async (req,res,next)=>{
    const {company , position ,desc} = req.body;
    if(!company || !position || !desc){
        next("Please fill all fields")
    }else {
        try {
            req.body.createdBy = req.user.userId
            const job = await jobsModel.create(req.body)
            res.status(201).json({job})
        } catch (error) {
            next(error.message)
        }
    }
}
const getAllUserJobsController = async (req,res,next)=>{
      try {
            req.body.createdBy = req.user.userId
            const jobs = await jobsModel.find({createdBy : req.user.userId})
            res.status(201).json({jobs})
        } catch (error) {
            next(error.message)
        }

}
const getAllJobsController = async (req,res,next)=>{
    const {status , workType,search ,sort} = req.query;
    const queryObject =
    {
        createdBy : req.user.userId,
    }

    if(status && status != 'all'){
        queryObject.status = status;
    }
    if(workType && workType !='all'){
        queryObject.workType = workType;
    }
    if(search){
        console.log(search)
        queryObject.position = { $regex : search , $options: "i"}
    }
       

      try {
            let queryResult = jobsModel.find(queryObject);
             const page = Number(req.query.page) || 1 
            const limit = Number(req.query.limit) || 10
            const skip = (page - 1)*limit
            queryResult = queryResult.skip(skip).limit(limit)
            const totalJobs = await jobsModel.countDocuments(queryResult)
            const numOfPage = Math.ceil(totalJobs/limit)
            const jobs = await queryResult; 
    
            res.status(201).json({totalJobs , jobs,numOfPage})
        } catch (error) {
            next(error.message)
        }

}
const updateJobController = async (req,res,next)=>{
    const {id} = req.params;
    const {company , position} = req.body;
    if(!company || !position){
        next('Please provide all fields')
    }else{
          try {
            
            const job = await jobsModel.findOne(id)
            if(!job){
                next('no job found with id: ' + id) 
            }
            if(req.user.userId !== job.createdBy.toString()){
                next('You are not authorized to update this job')
                return 
            }else{
                const updateJob = await jobsModel.findOneAndUpdate({id : id}, req.body,{
                    new:true,
                    runValidators:true
                })
                console.log(updateJob)
                res.status(201).json({updateJob})
            }
             
            
        } catch (error) {
            next(error.message)
        }
    }
    

}

const deleteJobController = async (req, res, next) => {
    const {id} = req.params
   try {
     const job = await jobsModel.findOne({id:id})
    if(!job){
        next('No job found with this Id: '+ id)
    }else{
        await job.deleteOne({id:id});
        res.status(200).json({message:"Job deleted succefully"})
    }
   } catch (error) {
    next(error.message)
   }
    
}

const getJobsStatsController = async (req, res, next) =>{

 
        try {
            const stats = await jobsModel.aggregate([
        {
            $match: {
                createdBy: new mongoose.Types.ObjectId(req.user.userId)
            },
            
        },{
            $group:{
                    _id:"$status",
                    count:{$sum:1}
            },
        }
    ]);
    const defaultStats = {
        pending : stats.pending || 0 ,
        interview : stats.interview || 0,
        reject: stats.reject || 0
    }

    let monthlyApplications = await jobsModel.aggregate([
        {
            $match: {
                createdBy: new mongoose.Types.ObjectId(req.user.userId)
            },
            
        },{
            $group:{
                    _id:{
                        year:{$year:'$createdAt'},
                        month:{$month:'$createdAt'}
                    },
                    count:{$sum:1}
            },
        }
    ]);
    monthlyApplications = monthlyApplications.map(e =>{
        const {_id: {year , month}, count} = e;
        const date = moment().month(month-1).year(year).format("MMM y")
        return {date, count};
    }).reverse();
    res.status(200).json({totalJobs: stats.length , stats: defaultStats , monthlyApplications});

        } catch (error) {
            next(error.message)            
        }
    
}

module.exports = {createJobController, deleteJobController, updateJobController, getAllJobsController , getAllUserJobsController,getJobsStatsController}
